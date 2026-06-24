'use client';

import { useState, useEffect } from 'react';
import { StockData, Market, SearchResult } from '@/types/stock';
import { format } from 'date-fns';
import StockSearch from './StockSearch';
import NewsPanel from './NewsPanel';

interface PPTCanvasProps {
  stocks: StockData[];
  loading: boolean;
  activeMarket: Market;
  onAddStock: (symbol: string, market: Market) => void;
  onRemoveStock: (symbol: string, market: Market) => void;
}

export default function PPTCanvas({ 
  stocks, 
  loading, 
  activeMarket, 
  onAddStock,
  onRemoveStock 
}: PPTCanvasProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(num);
  };

  const formatPercent = (num: number) => {
    const sign = num >= 0 ? '+' : '';
    return `${sign}${num.toFixed(2)}%`;
  };

  return (
    <div className="flex-1 flex bg-gray-100 overflow-hidden">
      {/* 메인 슬라이드 영역 */}
      <div className="flex-1 flex flex-col p-8 overflow-auto">
        <div className="ppt-canvas w-full max-w-7xl mx-auto shadow-2xl rounded-lg overflow-hidden">
          {loading ? (
            <div className="h-[600px] flex items-center justify-center">
              <div className="text-gray-400 text-lg">데이터 로딩 중...</div>
            </div>
          ) : (
            <div className="p-12">
              {/* 슬라이드 제목 + 검색 */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-4xl font-bold text-ppt-text mb-2">
                    📊 {activeMarket === 'kr' ? '한국' : '미국'} 주식 실시간 시세
                  </h1>
                  <p className="text-lg text-gray-500">
                    {format(new Date(), 'yyyy년 MM월 dd일 HH:mm 기준')}
                  </p>
                </div>

                {/* 종목 검색 */}
                <StockSearch
                  market={activeMarket}
                  onSelectStock={(symbol) => onAddStock(symbol, activeMarket)}
                />
              </div>

              {/* 시세 테이블 */}
              {stocks.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                  <div className="text-6xl mb-4">🔍</div>
                  <div className="text-xl">종목을 추가해주세요</div>
                  <div className="text-sm mt-2">위 검색창에서 종목을 검색하고 추가할 수 있습니다</div>
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b-2 border-ppt-accent">
                      <th className="py-3 px-4 text-base font-semibold">종목명</th>
                      <th className="py-3 px-4 text-base font-semibold text-right">현재가</th>
                      <th className="py-3 px-4 text-base font-semibold text-right">등락</th>
                      <th className="py-3 px-4 text-base font-semibold text-right">등락률</th>
                      <th className="py-3 px-4 text-base font-semibold text-right">거래량</th>
                      <th className="py-3 px-4 text-base font-semibold"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {stocks.map((stock) => {
                      const isUp = stock.change >= 0;
                      const textColor = isUp ? 'text-red-600' : 'text-blue-600';
                      
                      return (
                        <tr 
                          key={stock.symbol} 
                          className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-3 px-4 text-base font-medium">
                            {stock.name}
                            <span className="text-xs text-gray-400 ml-2">{stock.symbol}</span>
                          </td>
                          <td className={`py-3 px-4 text-base font-bold text-right ${textColor}`}>
                            {formatNumber(stock.price)}
                          </td>
                          <td className={`py-3 px-4 text-base font-semibold text-right ${textColor}`}>
                            {isUp ? '▲' : '▼'} {formatNumber(Math.abs(stock.change))}
                          </td>
                          <td className={`py-3 px-4 text-base font-semibold text-right ${textColor}`}>
                            {formatPercent(stock.changePercent)}
                          </td>
                          <td className="py-3 px-4 text-base text-right text-gray-600">
                            {stock.volume ? formatNumber(stock.volume) : '-'}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => onRemoveStock(stock.symbol, activeMarket)}
                              className="text-red-500 hover:text-red-700 text-sm"
                              title="종목 삭제"
                            >
                              ✕
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}

              {/* 하단 노트 */}
              <div className="mt-6 text-sm text-gray-400 italic">
                * 데이터는 {activeMarket === 'kr' ? '네이버 금융' : 'Yahoo Finance'}에서 제공되며, 10초마다 자동 갱신됩니다.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 오른쪽 뉴스 패널 */}
      <NewsPanel market={activeMarket} />
    </div>
  );
}
