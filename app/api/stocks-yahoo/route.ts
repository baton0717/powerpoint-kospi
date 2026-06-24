import { NextResponse } from 'next/server';
import { StockData } from '@/types/stock';

// Yahoo Finance API
async function fetchYahooQuote(symbol: string): Promise<StockData | null> {
  try {
    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`,
      { 
        headers: {
          'User-Agent': 'Mozilla/5.0',
        },
        next: { revalidate: 10 } // 10초 캐시
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    const result = data?.chart?.result?.[0];
    
    if (!result) return null;

    const meta = result.meta;
    const currentPrice = meta.regularMarketPrice || 0;
    const previousClose = meta.chartPreviousClose || meta.previousClose || 0;
    const change = currentPrice - previousClose;
    const changePercent = previousClose > 0 ? (change / previousClose) * 100 : 0;

    return {
      symbol: meta.symbol,
      name: meta.symbol,
      price: currentPrice,
      change,
      changePercent,
      volume: meta.regularMarketVolume,
      market: 'us',
      lastUpdate: new Date().toISOString(),
    };
  } catch (error) {
    console.error(`Failed to fetch ${symbol}:`, error);
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const { symbols } = await request.json();

    if (!symbols || !Array.isArray(symbols)) {
      return NextResponse.json({ error: 'Invalid symbols' }, { status: 400 });
    }

    const stocksPromises = symbols.map(symbol => fetchYahooQuote(symbol));
    const stocks = (await Promise.all(stocksPromises)).filter((stock): stock is StockData => stock !== null);

    return NextResponse.json({ stocks });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to fetch stocks' }, { status: 500 });
  }
}
