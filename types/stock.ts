export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: number;
  marketCap?: string;
  lastUpdate: string;
}

export interface NewsItem {
  title: string;
  summary: string;
  link: string;
  time: string;
  source: string;
}
