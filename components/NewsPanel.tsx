'use client';

import { useState, useEffect } from 'react';
import { Market, NewsItem } from '@/types/stock';

interface NewsPanelProps {
  market: Market;
}

export default function NewsPanel({ market }: NewsPanelProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/news?market=${market}`);
      const data = await response.json();
      setNews(data.news || []);
    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    // 5분마다 뉴스 갱신
    const interval = setInterval(fetchNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
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
        <button
          onClick={fetchNews}
          className="ml-auto text-xs text-blue-600 hover:text-blue-800"
        >
          🔄
        </button>
      </div>

      {/* 뉴스 목록 */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-4 text-center text-gray-400 text-sm">
            뉴스 로딩 중...
          </div>
        ) : news.length === 0 ? (
          <div className="p-4 text-center text-gray-400 text-sm">
            뉴스를 불러올 수 없습니다
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
        5분마다 자동 갱신
      </div>
    </div>
  );
}
