import { NextResponse } from 'next/server';
import { NewsItem } from '@/types/stock';

// Mock 뉴스 (실제 크롤링은 복잡하므로 일단 작동하게)
async function fetchNews(market: 'kr' | 'us'): Promise<NewsItem[]> {
  const krNews: NewsItem[] = [
    {
      title: '코스피, 외국인 매수세에 2,800선 회복',
      summary: '외국인 투자자들의 순매수가 이어지면서 코스피 지수가 2,800선을 회복했습니다.',
      link: 'https://finance.naver.com',
      time: '10분전',
      source: '연합뉴스',
      market: '국장',
    },
    {
      title: '삼성전자, 반도체 경기 회복 기대감에 상승',
      summary: 'AI 수요 증가로 인한 반도체 시장 회복 기대감이 커지면서 삼성전자 주가가 강세를 보이고 있습니다.',
      link: 'https://finance.naver.com',
      time: '30분전',
      source: '매일경제',
      market: '국장',
    },
    {
      title: 'SK하이닉스, HBM 수주 확대 전망',
      summary: 'AI 서버용 고대역폭 메모리(HBM) 수주가 확대될 것으로 전망되면서 주가가 상승했습니다.',
      link: 'https://finance.naver.com',
      time: '1시간전',
      source: '한국경제',
      market: '국장',
    },
  ];

  const usNews: NewsItem[] = [
    {
      title: 'S&P 500, Tech Rally Drives Market Higher',
      summary: 'Major technology stocks led the S&P 500 to new highs as investors showed renewed confidence.',
      link: 'https://finance.yahoo.com',
      time: '15min ago',
      source: 'Reuters',
      market: '미장',
    },
    {
      title: 'NVIDIA Shares Surge on AI Demand',
      summary: 'NVIDIA stock jumped as demand for AI chips continues to accelerate across industries.',
      link: 'https://finance.yahoo.com',
      time: '45min ago',
      source: 'Bloomberg',
      market: '미장',
    },
    {
      title: 'Fed Holds Rates Steady, Signals Caution',
      summary: 'The Federal Reserve maintained interest rates while indicating a cautious approach to future policy.',
      link: 'https://finance.yahoo.com',
      time: '2hrs ago',
      source: 'WSJ',
      market: '미장',
    },
  ];

  return market === 'kr' ? krNews : usNews;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const market = (searchParams.get('market') || 'kr') as 'kr' | 'us';

  const news = await fetchNews(market);

  return NextResponse.json({ news });
}
