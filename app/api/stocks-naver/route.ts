import { NextResponse } from 'next/server';
import { StockData } from '@/types/stock';

// 네이버 금융 시세 조회 API (JSON 엔드포인트)
async function fetchNaverQuote(code: string): Promise<StockData | null> {
  try {
    // 네이버 금융 시세조회 페이지의 iframe에서 사용하는 실제 API
    const response = await fetch(
      `https://polling.finance.naver.com/api/realtime?query=SERVICE_ITEM:${code}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Referer': 'https://finance.naver.com/',
        },
        next: { revalidate: 5 } // 5초 캐시
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    const result = data?.result?.areas?.[0]?.datas?.[0];
    
    if (!result) return null;

    const currentPrice = parseInt(result.nv || '0');
    const previousClose = parseInt(result.pcv || '0');
    const change = parseInt(result.cv || '0');
    const changePercent = parseFloat(result.cr || '0');
    const volume = parseInt(result.aq || '0');
    const name = result.nm || code;

    return {
      symbol: code,
      name,
      price: currentPrice,
      change,
      changePercent,
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
