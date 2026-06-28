import { NextResponse } from 'next/server';
import { KR_STOCKS_DB, US_STOCKS_DB } from '@/lib/stocksDB';

// 캐시된 KRX 전체 종목 (서버 메모리)
let cachedKrxStocks: Array<{ symbol: string; name: string; market: 'kr' }> = [];
let lastFetch = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24시간

async function getKrxStocks() {
  const now = Date.now();
  
  // 캐시 유효성 확인
  if (cachedKrxStocks.length > 0 && now - lastFetch < CACHE_DURATION) {
    return cachedKrxStocks;
  }

  try {
    // KRX에서 전체 종목 가져오기
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL 
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/stocks-list`, {
      next: { revalidate: 86400 }
    });

    if (response.ok) {
      const data = await response.json();
      cachedKrxStocks = data.stocks || [];
      lastFetch = now;
      return cachedKrxStocks;
    }
  } catch (error) {
    console.error('Failed to fetch KRX stocks:', error);
  }

  // 실패 시 수동 DB 사용
  return KR_STOCKS_DB;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  const market = searchParams.get('market') as 'kr' | 'us' | null;

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  let results = [];

  if (market === 'us') {
    // 미국 주식은 수동 DB 사용
    results = US_STOCKS_DB.filter(stock => 
      stock.name.toLowerCase().includes(query) ||
      stock.symbol.toLowerCase().includes(query)
    );
  } else if (market === 'kr') {
    // 한국 주식은 KRX 자동 데이터 사용
    const krStocks = await getKrxStocks();
    results = krStocks.filter(stock => 
      stock.name.includes(query) ||
      stock.symbol.includes(query)
    );
  } else {
    // 전체 검색
    const krStocks = await getKrxStocks();
    const allStocks = [...krStocks, ...US_STOCKS_DB];
    results = allStocks.filter(stock => 
      stock.name.toLowerCase().includes(query) ||
      stock.symbol.toLowerCase().includes(query)
    );
  }

  // 최대 20개
  results = results.slice(0, 20);

  return NextResponse.json({ results });
}
