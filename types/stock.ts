export type Market = 'kr' | 'us';

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: number;
  marketCap?: string;
  market: Market;
  lastUpdate: string;
}

export interface NewsItem {
  title: string;
  summary: string;
  link: string;
  time: string;
  source: string;
  market: '국장' | '미장';
}

export interface SearchResult {
  symbol: string;
  name: string;
  market: Market;
}
