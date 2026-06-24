import { NextResponse } from 'next/server';
import { SearchResult } from '@/types/stock';

// 한국 주요 종목 목록 (실제로는 DB나 외부 API 사용)
const KR_STOCKS = [
  { symbol: '005930', name: '삼성전자', market: 'kr' as const },
  { symbol: '000660', name: 'SK하이닉스', market: 'kr' as const },
  { symbol: '035420', name: 'NAVER', market: 'kr' as const },
  { symbol: '005380', name: '현대차', market: 'kr' as const },
  { symbol: '035720', name: '카카오', market: 'kr' as const },
  { symbol: '051910', name: 'LG화학', market: 'kr' as const },
  { symbol: '006400', name: '삼성SDI', market: 'kr' as const },
  { symbol: '207940', name: '삼성바이오로직스', market: 'kr' as const },
  { symbol: '068270', name: '셀트리온', market: 'kr' as const },
  { symbol: '028260', name: '삼성물산', market: 'kr' as const },
  { symbol: '105560', name: 'KB금융', market: 'kr' as const },
  { symbol: '055550', name: '신한지주', market: 'kr' as const },
  { symbol: '012330', name: '현대모비스', market: 'kr' as const },
  { symbol: '096770', name: 'SK이노베이션', market: 'kr' as const },
  { symbol: '017670', name: 'SK텔레콤', market: 'kr' as const },
  { symbol: '034730', name: 'SK', market: 'kr' as const },
  { symbol: '402340', name: 'SK스퀘어', market: 'kr' as const },
  { symbol: '302440', name: 'SK바이오사이언스', market: 'kr' as const },
  { symbol: '018260', name: '삼성에스디에스', market: 'kr' as const },
  { symbol: '066570', name: 'LG전자', market: 'kr' as const },
];

// 미국 주요 종목 목록
const US_STOCKS = [
  { symbol: 'AAPL', name: 'Apple', market: 'us' as const },
  { symbol: 'MSFT', name: 'Microsoft', market: 'us' as const },
  { symbol: 'GOOGL', name: 'Alphabet (Google)', market: 'us' as const },
  { symbol: 'AMZN', name: 'Amazon', market: 'us' as const },
  { symbol: 'NVDA', name: 'NVIDIA', market: 'us' as const },
  { symbol: 'TSLA', name: 'Tesla', market: 'us' as const },
  { symbol: 'META', name: 'Meta (Facebook)', market: 'us' as const },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway', market: 'us' as const },
  { symbol: 'JPM', name: 'JPMorgan Chase', market: 'us' as const },
  { symbol: 'V', name: 'Visa', market: 'us' as const },
];

const ALL_STOCKS = [...KR_STOCKS, ...US_STOCKS];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  const market = searchParams.get('market') as 'kr' | 'us' | null;

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  // 검색어로 필터링
  let results = ALL_STOCKS.filter(stock => 
    stock.name.toLowerCase().includes(query) ||
    stock.symbol.toLowerCase().includes(query)
  );

  // 마켓 필터
  if (market) {
    results = results.filter(stock => stock.market === market);
  }

  // 최대 10개
  results = results.slice(0, 10);

  return NextResponse.json({ results });
}
