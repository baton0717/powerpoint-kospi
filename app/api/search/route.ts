import { NextResponse } from 'next/server';
import { ALL_STOCKS_DB } from '@/lib/stocksDB';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  const market = searchParams.get('market') as 'kr' | 'us' | null;

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  // 검색어로 필터링
  let results = ALL_STOCKS_DB.filter(stock => 
    stock.name.toLowerCase().includes(query) ||
    stock.symbol.toLowerCase().includes(query)
  );

  // 마켓 필터
  if (market) {
    results = results.filter(stock => stock.market === market);
  }

  // 최대 20개
  results = results.slice(0, 20);

  return NextResponse.json({ results });
}
