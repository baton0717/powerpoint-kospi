'use client';

import { Market } from '@/types/stock';

interface PPTRibbonProps {
  onRefresh: () => void;
  activeMarket: Market;
  onMarketChange: (market: Market) => void;
}

export default function PPTRibbon({ onRefresh, activeMarket, onMarketChange }: PPTRibbonProps) {
  return (
    <div className="ppt-ribbon h-28 flex flex-col">
      {/* 상단 타이틀 바 */}
      <div className="h-8 flex items-center px-4 bg-ppt-accent text-white text-sm">
        <div className="flex items-center gap-2">
          <span className="font-bold">📊</span>
          <span>파워포인트코스피 - 슬라이드1.pptx - PowerPoint</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button className="hover:bg-red-800 px-2 py-1 rounded text-xs">
            저장
          </button>
          <span className="text-xs">□ ○ ×</span>
        </div>
      </div>

      {/* 리본 탭 */}
      <div className="h-8 flex items-center px-4 border-b border-ppt-border">
        <div className="flex gap-6 text-sm">
          <button className="ppt-button-active">홈</button>
          <button className="ppt-button">삽입</button>
          <button className="ppt-button">디자인</button>
          <button className="ppt-button">전환</button>
          <button className="ppt-button">애니메이션</button>
          <button className="ppt-button">슬라이드 쇼</button>
        </div>
      </div>

      {/* 리본 툴바 */}
      <div className="flex-1 px-4 flex items-center gap-6">
        {/* 국장/미장 전환 */}
        <div className="flex items-center gap-2 bg-white border border-gray-300 rounded px-1 py-0.5">
          <button
            onClick={() => onMarketChange('kr')}
            className={`px-4 py-1 text-sm rounded transition-colors ${
              activeMarket === 'kr'
                ? 'bg-ppt-accent text-white font-semibold'
                : 'hover:bg-gray-100'
            }`}
          >
            🇰🇷 국장
          </button>
          <button
            onClick={() => onMarketChange('us')}
            className={`px-4 py-1 text-sm rounded transition-colors ${
              activeMarket === 'us'
                ? 'bg-ppt-accent text-white font-semibold'
                : 'hover:bg-gray-100'
            }`}
          >
            🇺🇸 미장
          </button>
        </div>

        <div className="h-10 w-px bg-ppt-border"></div>

        <div className="flex items-center gap-2">
          <button 
            onClick={onRefresh}
            className="ppt-button text-xs bg-green-100 hover:bg-green-200 border border-green-300"
          >
            🔄 새로고침
          </button>
        </div>

        <div className="h-10 w-px bg-ppt-border"></div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="px-2 py-1 bg-gray-100 rounded">
            자동 갱신: 10초
          </span>
          <span className="px-2 py-1 bg-blue-50 rounded text-blue-700">
            {activeMarket === 'kr' ? '한국 주식' : '미국 주식'}
          </span>
        </div>
      </div>
    </div>
  );
}
