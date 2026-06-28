import { NextResponse } from 'next/server';

// KRX 전체 상장 종목 가져오기
export async function GET() {
  try {
    const response = await fetch(
      'https://kind.krx.co.kr/corpgeneral/corpList.do?method=download&searchType=13',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0',
        },
        next: { revalidate: 86400 } // 24시간 캐시
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from KRX');
    }

    const buffer = await response.arrayBuffer();
    const decoder = new TextDecoder('euc-kr');
    const html = decoder.decode(buffer);

    const stocks = [];
    
    // HTML 테이블 파싱
    const rowPattern = /<tr>(.*?)<\/tr>/g;
    const rows = [];
    let rowMatch;
    while ((rowMatch = rowPattern.exec(html)) !== null) {
      rows.push(rowMatch[0]);
    }
    
    for (const row of rows.slice(1)) { // 첫 행은 헤더
      const colPattern = /<td[^>]*>(.*?)<\/td>/g;
      const cols = [];
      let colMatch;
      while ((colMatch = colPattern.exec(row)) !== null) {
        cols.push(colMatch[0]);
      }
      
      if (cols.length >= 3) {
        const name = cols[0].replace(/<[^>]+>/g, '').trim();
        const code = cols[2].replace(/<[^>]+>/g, '').trim();
        
        if (name && code && /^\d{6}$/.test(code)) {
          stocks.push({
            symbol: code,
            name: name,
            market: 'kr'
          });
        }
      }
    }

    return NextResponse.json({ 
      stocks: stocks.slice(0, 3000), // 최대 3000개
      count: stocks.length,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Failed to fetch stocks list:', error);
    return NextResponse.json({ error: 'Failed to fetch stocks' }, { status: 500 });
  }
}
