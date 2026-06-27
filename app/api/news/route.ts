import { NextResponse } from 'next/server';
import { NewsItem } from '@/types/stock';

// 네이버 금융 뉴스 크롤링
async function fetchNaverNews(market: 'kr' | 'us'): Promise<NewsItem[]> {
  try {
    // 네이버 금융 뉴스 페이지
    const url = market === 'kr' 
      ? 'https://finance.naver.com/news/news_list.naver?mode=LSS2D&section_id=101&section_id2=258'
      : 'https://finance.naver.com/news/news_list.naver?mode=LSS2D&section_id=101&section_id2=259';
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'text/html',
      },
      next: { revalidate: 60 } // 1분 캐시
    });

    if (!response.ok) return [];

    const html = await response.text();
    const news: NewsItem[] = [];

    // 뉴스 제목 추출
    const titleMatches = html.match(/<dd class="articleSubject">.*?<a href="(.*?)".*?>(.*?)<\/a>/g) || [];
    const summaryMatches = html.match(/<dd class="articleSummary">(.*?)<\/dd>/g) || [];
    const timeMatches = html.match(/<span class="wdate">(.*?)<\/span>/g) || [];

    const maxItems = Math.min(10, titleMatches.length, summaryMatches.length, timeMatches.length);

    for (let i = 0; i < maxItems; i++) {
      const titleMatch = titleMatches[i].match(/<a href="(.*?)".*?>(.*?)<\/a>/);
      const summaryMatch = summaryMatches[i].match(/<dd class="articleSummary">(.*?)<\/dd>/);
      const timeMatch = timeMatches[i].match(/<span class="wdate">(.*?)<\/span>/);

      if (titleMatch && summaryMatch && timeMatch) {
        const link = titleMatch[1];
        const title = titleMatch[2].replace(/<[^>]+>/g, '').trim();
        const summary = summaryMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
        const time = timeMatch[1].trim();

        news.push({
          title,
          summary,
          link: link.startsWith('http') ? link : `https://finance.naver.com${link}`,
          time,
          source: '네이버 금융',
          market: market === 'kr' ? '국장' : '미장',
        });
      }
    }

    return news;
  } catch (error) {
    console.error('Failed to fetch news:', error);
    return [];
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const market = (searchParams.get('market') || 'kr') as 'kr' | 'us';

  const news = await fetchNaverNews(market);

  return NextResponse.json({ news });
}
