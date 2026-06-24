'use client';

export default function PPTSidebar() {
  return (
    <div className="ppt-sidebar w-64 flex flex-col">
      {/* 슬라이드 썸네일 헤더 */}
      <div className="h-10 flex items-center px-3 border-b border-ppt-border text-sm font-semibold">
        슬라이드
      </div>

      {/* 슬라이드 목록 */}
      <div className="flex-1 overflow-y-auto p-2">
        {/* 슬라이드 1 - 실시간 시세 */}
        <div className="mb-3 border-2 border-ppt-accent rounded overflow-hidden shadow-sm">
          <div className="bg-white aspect-video flex items-center justify-center text-xs text-gray-500">
            <div className="text-center">
              <div className="font-bold text-sm mb-1">📊</div>
              <div>실시간 시세</div>
            </div>
          </div>
          <div className="bg-ppt-sidebar px-2 py-1 text-xs text-center">
            1
          </div>
        </div>

        {/* 슬라이드 2 - 차트 */}
        <div className="mb-3 border border-gray-300 rounded overflow-hidden shadow-sm opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
          <div className="bg-white aspect-video flex items-center justify-center text-xs text-gray-500">
            <div className="text-center">
              <div className="font-bold text-sm mb-1">📈</div>
              <div>차트 분석</div>
            </div>
          </div>
          <div className="bg-ppt-sidebar px-2 py-1 text-xs text-center">
            2
          </div>
        </div>

        {/* 슬라이드 3 - 뉴스 */}
        <div className="mb-3 border border-gray-300 rounded overflow-hidden shadow-sm opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
          <div className="bg-white aspect-video flex items-center justify-center text-xs text-gray-500">
            <div className="text-center">
              <div className="font-bold text-sm mb-1">📰</div>
              <div>시장 뉴스</div>
            </div>
          </div>
          <div className="bg-ppt-sidebar px-2 py-1 text-xs text-center">
            3
          </div>
        </div>
      </div>
    </div>
  );
}
