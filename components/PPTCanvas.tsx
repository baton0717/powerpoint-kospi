'use client';

import { StockData } from '@/types/stock';
import { format } from 'date-fns';

interface PPTCanvasProps {
  stocks: StockData[];
  loading: boolean;
}

export default function PPTCanvas({ stocks, loading }: PPTCanvasProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(num);
  };

  const formatPercent = (num: number) => {
    const sign = num >= 0 ? '+' : '';
    return `${sign}${num.toFixed(2)}%`;
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-100">
      {/* 슬라이드 캔버스 */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="ppt-canvas w-full max-w-6xl aspect-video shadow-2xl rounded-lg overflow-hidden">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-gray-400 text-lg">데이터 로딩 중...</div>
            </div>
          ) : (
            <div className="h-full p-12 flex flex-col">
              {/* 슬라이드 제목 */}
              <div className="mb-8">
                <h1 className="text-5xl font-bold text-ppt-text mb-2">
                  📊 한국 주식 실시간 시세
                </h1>
                <p className="text-xl text-gray-500">
                  {format(new Date(), 'yyyy년 MM월 dd일 HH:mm 기준')}
                </p>
              </div>

              {/* 시세 테이블 */}
              <div className="flex-1 overflow-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b-2 border-ppt-accent">
                      <th className="py-3 px-4 text-lg font-semibold">종목명</th>
                      <th className="py-3 px-4 text-lg font-semibold text-right">현재가</th>
                      <th className="py-3 px-4 text-lg font-semibold text-right">등락</th>
                      <th className="py-3 px-4 text-lg font-semibold text-right">등락률</th>
                      <th className="py-3 px-4 text-lg font-semibold text-right">거래량</th>
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
                          <td className="py-4 px-4 text-lg font-medium">
                            {stock.name}
                          </td>
                          <td className={`py-4 px-4 text-lg font-bold text-right ${textColor}`}>
                            {formatNumber(stock.price)}
                          </td>
                          <td className={`py-4 px-4 text-lg font-semibold text-right ${textColor}`}>
                            {isUp ? '▲' : '▼'} {formatNumber(Math.abs(stock.change))}
                          </td>
                          <td className={`py-4 px-4 text-lg font-semibold text-right ${textColor}`}>
                            {formatPercent(stock.changePercent)}
                          </td>
                          <td className="py-4 px-4 text-lg text-right text-gray-600">
                            {stock.volume ? formatNumber(stock.volume) : '-'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* 하단 노트 */}
              <div className="mt-6 text-sm text-gray-400 italic">
                * 데이터는 네이버 금융에서 제공되며, 10초마다 자동 갱신됩니다.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 하단 노트 영역 */}
      <div className="h-32 border-t border-ppt-border bg-white px-6 py-3">
        <div className="text-xs text-gray-500 mb-1">발표자 노트</div>
        <div className="text-sm text-gray-700">
          ▪ 현재 슬라이드: 한국 주요 종목 실시간 시세<br/>
          ▪ 갱신 주기: 30초 자동<br/>
          ▪ 다음 슬라이드: 차트 분석 (개발 예정)
        </div>
      </div>
    </div>
  );
}
