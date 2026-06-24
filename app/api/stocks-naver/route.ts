import { NextResponse } from 'next/server';
import { StockData } from '@/types/stock';

// 네이버 금융 API (비공식 - 웹 크롤링)
async function fetchNaverQuote(code: string): Promise<StockData | null> {
  try {
    // 네이버 금융 시세 페이지 HTML 파싱
    const response = await fetch(
      `https://finance.naver.com/item/main.naver?code=${code}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          'Accept': 'text/html',
        },
        next: { revalidate: 5 } // 5초 캐시
      }
    );

    if (!response.ok) return null;

    const html = await response.text();

    // 정규식으로 주요 데이터 추출
    const priceMatch = html.match(/<strong[^>]*class="no_today"[^>]*><span[^>]*class="blind">현재가<\/span>\s*([\d,]+)<\/strong>/);
    const changeMatch = html.match(/<p[^>]*class="no_exday">\s*<strong[^>]*>\s*<span[^>]*class="blind">.*?<\/span>\s*([\d,]+)<\/strong>/);
    const changePercentMatch = html.match(/<span[^>]*class="no_exday">\s*<em[^>]*class="no_cha">\s*<span[^>]*class="blind">.*?<\/span>\s*([\d.]+)%/);
    const volumeMatch = html.match(/<td[^>]*>거래량<\/td>\s*<td[^>]*>\s*<span[^>]*>\s*([\d,]+)<\/span>/);
    const nameMatch = html.match(/<title>(.*?)\s*:\s*Npay\s*증권<\/title>/);

    if (!priceMatch || !changeMatch || !changePercentMatch) return null;

    const currentPrice = parseInt(priceMatch[1].replace(/,/g, ''));
    const changeValue = parseInt(changeMatch[1].replace(/,/g, ''));
    const changePercent = parseFloat(changePercentMatch[1]);
    const volume = volumeMatch ? parseInt(volumeMatch[1].replace(/,/g, '')) : undefined;
    const name = nameMatch ? nameMatch[1] : code;

    // 상승/하락 판단 (HTML에서 class 확인)
    const isUp = html.includes('ico_up') || html.includes('상승');
    const change = isUp ? changeValue : -changeValue;
    const finalChangePercent = isUp ? changePercent : -changePercent;

    return {
      symbol: code,
      name,
      price: currentPrice,
      change,
      changePercent: finalChangePercent,
      volume,
      lastUpdate: new Date().toISOString(),
    };
  } catch (error) {
    console.error(`Failed to fetch Naver ${code}:`, error);
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const { codes } = await request.json();

    if (!codes || !Array.isArray(codes)) {
      return NextResponse.json({ error: 'Invalid codes' }, { status: 400 });
    }

    // 병렬로 모든 종목 조회
    const stocksPromises = codes.map(code => fetchNaverQuote(code));
    const stocks = (await Promise.all(stocksPromises)).filter((stock): stock is StockData => stock !== null);

    return NextResponse.json({ stocks });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to fetch stocks' }, { status: 500 });
  }
}
