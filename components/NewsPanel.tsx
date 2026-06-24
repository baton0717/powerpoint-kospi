'use client';

import { useState, useEffect } from 'react';
import { Market, NewsItem } from '@/types/stock';

interface NewsPanelProps {
  market: Market;
}

export default function NewsPanel({ market }: NewsPanelProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: 실제 뉴스 API 연동
    // 현재는 Mock 데이터
    const mockNews: NewsItem[] = [
      {
        title: market === 'kr' ? '코스피, 외국인 매수에 상승 마감' : 'S&P 500 hits new record high',
        summary: market === 'kr' ? '외국인과 기관의 동반 매수세에 힘입어 코스피 지수가 상승 마감했습니다.' : 'Major tech stocks drive market higher as investors show renewed confidence.',
        link: '#',
        time: '21:30',
        source: market === 'kr' ? '연합뉴스' : 'Reuters',
        market: market === 'kr' ? '국장' : '미장',
      },
      {
        title: market === 'kr' ? 'IT 대형주, 일제히 상승세' : 'Tech giants lead market rally',
        summary: market === 'kr' ? '삼성전자, SK하이닉스 등 IT 대형주가 일제히 상승했습니다.' : 'Apple, Microsoft, and Google shares climb on strong earnings outlook.',
        link: '#',
        time: '20:15',
        source: market === 'kr' ? '매일경제' : 'Bloomberg',
        market: market === 'kr' ? '국장' : '미장',
      },
    ];

    setNews(mockNews);
    setLoading(false);
  }, [market]);

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      {/* 헤더 */}
      <div className="h-12 flex items-center px-4 border-b border-gray-200 bg-gray-50">
        <h3 className="font-semibold text-sm">
          📰 시장 뉴스
        </h3>
        <span className="ml-2 text-xs text-gray-500">
          ({market === 'kr' ? '국장' : '미장'})
        </span>
      </div>

      {/* 뉴스 목록 */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-4 text-center text-gray-400 text-sm">
            뉴스 로딩 중...
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {news.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs text-gray-500">{item.source}</span>
                  <span className="text-xs text-gray-400">{item.time}</span>
                </div>
                <h4 className="font-medium text-sm mb-1 line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {item.summary}
                </p>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* 하단 */}
      <div className="h-10 border-t border-gray-200 flex items-center px-4 text-xs text-gray-400">
        자동 갱신
      </div>
    </div>
  );
}
