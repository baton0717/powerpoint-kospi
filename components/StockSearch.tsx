'use client';

import { useState, useEffect, useRef } from 'react';
import { Market, SearchResult } from '@/types/stock';

interface StockSearchProps {
  market: Market;
  onSelectStock: (symbol: string) => void;
}

export default function StockSearch({ market, onSelectStock }: StockSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 검색
  useEffect(() => {
    if (query.length < 1) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchStocks = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&market=${market}`);
        const data = await response.json();
        setResults(data.results || []);
        setIsOpen(true);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(searchStocks, 300);
    return () => clearTimeout(debounce);
  }, [query, market]);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (symbol: string) => {
    console.log('[StockSearch] Selected:', symbol, 'market:', market);
    onSelectStock(symbol);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={market === 'kr' ? '종목 검색 (예: SK)' : 'Search (ex: Apple)'}
          className="px-4 py-2 border border-gray-300 rounded w-64 focus:outline-none focus:ring-2 focus:ring-ppt-accent"
        />
        {loading && (
          <div className="text-gray-400 text-sm">검색 중...</div>
        )}
      </div>

      {/* 검색 결과 드롭다운 */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-300 rounded shadow-lg max-h-64 overflow-y-auto z-50">
          {results.map((result) => (
            <button
              key={`${result.market}-${result.symbol}`}
              onClick={() => handleSelect(result.symbol)}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center justify-between"
            >
              <div>
                <div className="font-medium">{result.name}</div>
                <div className="text-xs text-gray-500">{result.symbol}</div>
              </div>
              <div className="text-xs text-gray-400">
                {result.market === 'kr' ? '🇰🇷' : '🇺🇸'}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* 검색 결과 없음 */}
      {isOpen && !loading && results.length === 0 && query.length >= 1 && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-300 rounded shadow-lg p-4 text-center text-gray-400 text-sm z-50">
          검색 결과 없음
        </div>
      )}
    </div>
  );
}
