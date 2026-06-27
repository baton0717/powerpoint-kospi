import { NextResponse } from 'next/server';
import { StockData } from '@/types/stock';

// 네이버 금융 시세 조회 (HTML 파싱 - 안정적)
async function fetchNaverQuote(code: string): Promise<StockData | null> {
  try {
    const response = await fetch(
      `https://finance.naver.com/item/main.naver?code=${code}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Accept': 'text/html',
        },
        next: { revalidate: 5 }
      }
    );

    if (!response.ok) return null;

    const html = await response.text();

    // 종목명 추출 (한글)
    const nameMatch = html.match(/<div class="wrap_company">\s*<h2>\s*<a[^>]*>([^<]+)<\/a>/);
    const name = nameMatch ? nameMatch[1].trim() : code;

    // 현재가
    const priceMatch = html.match(/class="no_today">\s*<em[^>]*>\s*<span[^>]*>[^<]*<\/span>\s*([\d,]+)/);
    if (!priceMatch) return null;
    const currentPrice = parseInt(priceMatch[1].replace(/,/g, ''));

    // 등락
    const changeMatch = html.match(/class="no_exday">\s*<em[^>]*class="no_\w+">\s*<span[^>]*>[^<]*<\/span>\s*([\d,]+)/);
    const changeValue = changeMatch ? parseInt(changeMatch[1].replace(/,/g, '')) : 0;

    // 등락률
    const changePercentMatch = html.match(/class="no_exday">\s*<em[^>]*class="no_\w+">\s*<span[^>]*>[^<]*<\/span>\s*[\d,]+\s*<\/em>\s*<span[^>]*class="no_cha">\s*<em[^>]*class="no_\w+">\s*<span[^>]*>[^<]*<\/span>\s*([\d.]+)%/);
    const changePercent = changePercentMatch ? parseFloat(changePercentMatch[1]) : 0;

    // 거래량
    const volumeMatch = html.match(/거래량<\/th>\s*<td>\s*<em[^>]*>\s*<span[^>]*>[^<]*<\/span>\s*([\d,]+)/);
    const volume = volumeMatch ? parseInt(volumeMatch[1].replace(/,/g, '')) : undefined;

    // 상승/하락 판단
    const isUp = html.includes('ico_up') || html.includes('no_up');
    const change = isUp ? changeValue : -changeValue;
    const finalChangePercent = isUp ? changePercent : -changePercent;

    return {
      symbol: code,
      name: name,
      price: currentPrice,
      change,
      changePercent: finalChangePercent,
      volume,
      market: 'kr' as const,
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
