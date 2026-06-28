import { NextResponse } from 'next/server';
import { StockData } from '@/types/stock';

// Mock 데이터 (네이버 크롤링 대신 일단 작동하게)
const MOCK_PRICES: Record<string, { name: string; price: number; change: number; changePercent: number; volume: number }> = {
  '005930': { name: '삼성전자', price: 71500, change: 500, changePercent: 0.70, volume: 15234567 },
  '000660': { name: 'SK하이닉스', price: 135000, change: -2000, changePercent: -1.46, volume: 3456789 },
  '373220': { name: 'LG에너지솔루션', price: 425000, change: 5000, changePercent: 1.19, volume: 456789 },
  '207940': { name: '삼성바이오로직스', price: 850000, change: 10000, changePercent: 1.19, volume: 123456 },
  '005380': { name: '현대차', price: 245000, change: -1000, changePercent: -0.41, volume: 2345678 },
  '005490': { name: 'POSCO홀딩스', price: 390000, change: 2000, changePercent: 0.52, volume: 567890 },
  '035420': { name: 'NAVER', price: 195000, change: 1500, changePercent: 0.78, volume: 1234567 },
  '051910': { name: 'LG화학', price: 380000, change: -3000, changePercent: -0.78, volume: 678901 },
  '006400': { name: '삼성SDI', price: 425000, change: 5000, changePercent: 1.19, volume: 789012 },
  '000270': { name: '기아', price: 95000, change: 500, changePercent: 0.53, volume: 3456789 },
  '035720': { name: '카카오', price: 45000, change: -500, changePercent: -1.10, volume: 5678901 },
};

export async function POST(request: Request) {
  try {
    const { codes } = await request.json();

    if (!codes || !Array.isArray(codes)) {
      return NextResponse.json({ error: 'Invalid codes' }, { status: 400 });
    }

    const stocks: StockData[] = codes.map(code => {
      const mock = MOCK_PRICES[code] || {
        name: code,
        price: 10000,
        change: 0,
        changePercent: 0,
        volume: 0
      };

      return {
        symbol: code,
        name: mock.name,
        price: mock.price,
        change: mock.change,
        changePercent: mock.changePercent,
        volume: mock.volume,
        market: 'kr' as const,
        lastUpdate: new Date().toISOString(),
      };
    });

    return NextResponse.json({ stocks });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to fetch stocks' }, { status: 500 });
  }
}
