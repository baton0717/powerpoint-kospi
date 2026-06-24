'use client';

import { useState, useEffect } from 'react';
import PPTRibbon from '@/components/PPTRibbon';
import PPTSidebar from '@/components/PPTSidebar';
import PPTCanvas from '@/components/PPTCanvas';
import { StockData } from '@/types/stock';

export default function Home() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);

  // 초기 종목 리스트 (네이버 금융 종목코드)
  const defaultCodes = [
    '005930', // 삼성전자
    '000660', // SK하이닉스
    '035420', // NAVER
    '005380', // 현대차
    '035720', // 카카오
  ];

  // 주가 데이터 불러오기 (네이버 금융)
  const fetchStocks = async () => {
    try {
      const response = await fetch('/api/stocks-naver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codes: defaultCodes }),
      });
      const data = await response.json();
      setStocks(data.stocks || []);
    } catch (error) {
      console.error('Failed to fetch stocks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
    // 10초마다 자동 갱신 (네이버는 더 빠름)
    const interval = setInterval(fetchStocks, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* PowerPoint 리본 메뉴 */}
      <PPTRibbon onRefresh={fetchStocks} />
      
      <div className="flex-1 flex overflow-hidden">
        {/* 왼쪽 슬라이드 썸네일 */}
        <PPTSidebar />
        
        {/* 메인 캔버스 */}
        <PPTCanvas stocks={stocks} loading={loading} />
      </div>
    </div>
  );
}
