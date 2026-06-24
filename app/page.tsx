'use client';

import { useState, useEffect } from 'react';
import PPTRibbon from '@/components/PPTRibbon';
import PPTSidebar from '@/components/PPTSidebar';
import PPTCanvas from '@/components/PPTCanvas';
import { StockData, Market } from '@/types/stock';

export default function Home() {
  const [activeMarket, setActiveMarket] = useState<Market>('kr');
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState<Array<{ symbol: string; market: Market }>>([
    { symbol: '005930', market: 'kr' },
    { symbol: '000660', market: 'kr' },
    { symbol: '035420', market: 'kr' },
  ]);

  // 주가 데이터 불러오기
  const fetchStocks = async () => {
    try {
      const currentWatchlist = watchlist.filter(item => item.market === activeMarket);
      
      if (currentWatchlist.length === 0) {
        setStocks([]);
        setLoading(false);
        return;
      }

      const endpoint = activeMarket === 'kr' ? '/api/stocks-naver' : '/api/stocks-yahoo';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          [activeMarket === 'kr' ? 'codes' : 'symbols']: currentWatchlist.map(item => item.symbol) 
        }),
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
    // 10초마다 자동 갱신
    const interval = setInterval(fetchStocks, 10000);
    return () => clearInterval(interval);
  }, [activeMarket, watchlist]);

  const handleAddStock = (symbol: string, market: Market) => {
    if (!watchlist.find(item => item.symbol === symbol && item.market === market)) {
      setWatchlist([...watchlist, { symbol, market }]);
    }
  };

  const handleRemoveStock = (symbol: string, market: Market) => {
    setWatchlist(watchlist.filter(item => !(item.symbol === symbol && item.market === market)));
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-100">
      {/* PowerPoint 리본 메뉴 */}
      <PPTRibbon 
        onRefresh={fetchStocks}
        activeMarket={activeMarket}
        onMarketChange={setActiveMarket}
      />
      
      <div className="flex-1 flex overflow-hidden">
        {/* 왼쪽 슬라이드 썸네일 */}
        <PPTSidebar activeMarket={activeMarket} />
        
        {/* 메인 캔버스 */}
        <PPTCanvas 
          stocks={stocks} 
          loading={loading}
          activeMarket={activeMarket}
          onAddStock={handleAddStock}
          onRemoveStock={handleRemoveStock}
        />
      </div>
    </div>
  );
}
