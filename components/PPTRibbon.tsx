'use client';

interface PPTRibbonProps {
  onRefresh: () => void;
}

export default function PPTRibbon({ onRefresh }: PPTRibbonProps) {
  return (
    <div className="ppt-ribbon h-28 flex flex-col">
      {/* 상단 탭 바 */}
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
          <button className="ppt-button">검토</button>
          <button className="ppt-button">보기</button>
        </div>
      </div>

      {/* 리본 툴바 */}
      <div className="flex-1 px-4 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <button className="ppt-button text-xs border border-gray-300 rounded">
            📋 붙여넣기
          </button>
          <button className="ppt-button text-xs">✂️ 잘라내기</button>
          <button className="ppt-button text-xs">📄 복사</button>
        </div>

        <div className="h-10 w-px bg-ppt-border"></div>

        <div className="flex items-center gap-2">
          <button className="ppt-button text-xs">➕ 새 슬라이드</button>
          <button className="ppt-button text-xs">🔄 레이아웃</button>
          <button 
            onClick={onRefresh}
            className="ppt-button text-xs bg-green-100 hover:bg-green-200"
          >
            🔄 새로고침
          </button>
        </div>

        <div className="h-10 w-px bg-ppt-border"></div>

        <div className="flex items-center gap-2 text-xs">
          <span>글꼴:</span>
          <select className="ppt-button border border-gray-300">
            <option>맑은 고딕</option>
          </select>
          <select className="ppt-button border border-gray-300">
            <option>14</option>
          </select>
        </div>
      </div>
    </div>
  );
}
