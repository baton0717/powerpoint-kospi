// Stock database
import { SearchResult } from '@/types/stock';

// 시가총액 상위 + 주요 종목
export const KR_STOCKS_DB: SearchResult[] = [
  // 시가총액 Top 10
  { symbol: '005930', name: '삼성전자', market: 'kr' },
  { symbol: '000660', name: 'SK하이닉스', market: 'kr' },
  { symbol: '373220', name: 'LG에너지솔루션', market: 'kr' },
  { symbol: '207940', name: '삼성바이오로직스', market: 'kr' },
  { symbol: '005380', name: '현대차', market: 'kr' },
  { symbol: '005490', name: 'POSCO홀딩스', market: 'kr' },
  { symbol: '035420', name: 'NAVER', market: 'kr' },
  { symbol: '051910', name: 'LG화학', market: 'kr' },
  { symbol: '006400', name: '삼성SDI', market: 'kr' },
  { symbol: '000270', name: '기아', market: 'kr' },
  
  // 삼성 계열
  { symbol: '009150', name: '삼성전기', market: 'kr' },
  { symbol: '018260', name: '삼성에스디에스', market: 'kr' },
  { symbol: '028260', name: '삼성물산', market: 'kr' },
  { symbol: '032830', name: '삼성생명', market: 'kr' },
  { symbol: '010140', name: '삼성중공업', market: 'kr' },
  { symbol: '000810', name: '삼성화재', market: 'kr' },
  { symbol: '016360', name: '삼성증권', market: 'kr' },
  
  // SK 계열
  { symbol: '034730', name: 'SK', market: 'kr' },
  { symbol: '017670', name: 'SK텔레콤', market: 'kr' },
  { symbol: '096770', name: 'SK이노베이션', market: 'kr' },
  { symbol: '402340', name: 'SK스퀘어', market: 'kr' },
  { symbol: '302440', name: 'SK바이오사이언스', market: 'kr' },
  { symbol: '285130', name: 'SK케미칼', market: 'kr' },
  { symbol: '011790', name: 'SKC', market: 'kr' },
  
  // LG 계열
  { symbol: '003550', name: 'LG', market: 'kr' },
  { symbol: '066570', name: 'LG전자', market: 'kr' },
  { symbol: '032640', name: 'LG유플러스', market: 'kr' },
  { symbol: '034220', name: 'LG디스플레이', market: 'kr' },
  { symbol: '011070', name: 'LG이노텍', market: 'kr' },
  
  // 현대차 계열
  { symbol: '012330', name: '현대모비스', market: 'kr' },
  { symbol: '005387', name: '현대차2우B', market: 'kr' },
  { symbol: '000720', name: '현대건설', market: 'kr' },
  { symbol: '009540', name: '한국조선해양', market: 'kr' },
  { symbol: '267250', name: '현대중공업지주', market: 'kr' },
  { symbol: '010620', name: '현대미포조선', market: 'kr' },
  { symbol: '267270', name: '현대건설기계', market: 'kr' },
  
  // 금융
  { symbol: '105560', name: 'KB금융', market: 'kr' },
  { symbol: '055550', name: '신한지주', market: 'kr' },
  { symbol: '086790', name: '하나금융지주', market: 'kr' },
  { symbol: '024110', name: '기업은행', market: 'kr' },
  { symbol: '175330', name: 'JB금융지주', market: 'kr' },
  { symbol: '138930', name: 'BNK금융지주', market: 'kr' },
  
  // IT/게임
  { symbol: '035720', name: '카카오', market: 'kr' },
  { symbol: '036570', name: '엔씨소프트', market: 'kr' },
  { symbol: '251270', name: '넷마블', market: 'kr' },
  { symbol: '112040', name: '위메이드', market: 'kr' },
  { symbol: '259960', name: '크래프톤', market: 'kr' },
  { symbol: '293490', name: '카카오게임즈', market: 'kr' },
  
  // 통신
  { symbol: '030200', name: 'KT', market: 'kr' },
  { symbol: '033780', name: 'KT&G', market: 'kr' },
  
  // 바이오/제약
  { symbol: '068270', name: '셀트리온', market: 'kr' },
  { symbol: '091990', name: '셀트리온헬스케어', market: 'kr' },
  { symbol: '326030', name: 'SK바이오팜', market: 'kr' },
  { symbol: '196170', name: '알테오젠', market: 'kr' },
  
  // 화학
  { symbol: '011170', name: '롯데케미칼', market: 'kr' },
  { symbol: '010950', name: 'S-Oil', market: 'kr' },
  { symbol: '011780', name: '금호석유', market: 'kr' },
  
  // 유통/식품
  { symbol: '139480', name: '이마트', market: 'kr' },
  { symbol: '004170', name: '신세계', market: 'kr' },
  { symbol: '097950', name: 'CJ제일제당', market: 'kr' },
  { symbol: '001040', name: 'CJ', market: 'kr' },
  { symbol: '000120', name: 'CJ대한통운', market: 'kr' },
  { symbol: '090430', name: '아모레퍼시픽', market: 'kr' },
  { symbol: '271560', name: '오리온', market: 'kr' },
  
  // 항공/운송
  { symbol: '003490', name: '대한항공', market: 'kr' },
  { symbol: '047810', name: '한국항공우주', market: 'kr' },
  { symbol: '011200', name: 'HMM', market: 'kr' },
  
  // 기타
  { symbol: '015760', name: '한국전력', market: 'kr' },
  { symbol: '010130', name: '고려아연', market: 'kr' },
  { symbol: '161390', name: '한국타이어앤테크놀로지', market: 'kr' },
  { symbol: '012450', name: '한화에어로스페이스', market: 'kr' },
  { symbol: '018880', name: '한온시스템', market: 'kr' },
  { symbol: '078930', name: 'GS', market: 'kr' },
  { symbol: '047050', name: '포스코인터내셔널', market: 'kr' },
  { symbol: '003670', name: '포스코퓨처엠', market: 'kr' },
];

export const US_STOCKS_DB: SearchResult[] = [
  { symbol: 'AAPL', name: 'Apple', market: 'us' },
  { symbol: 'MSFT', name: 'Microsoft', market: 'us' },
  { symbol: 'GOOGL', name: 'Alphabet', market: 'us' },
  { symbol: 'AMZN', name: 'Amazon', market: 'us' },
  { symbol: 'NVDA', name: 'NVIDIA', market: 'us' },
  { symbol: 'TSLA', name: 'Tesla', market: 'us' },
  { symbol: 'META', name: 'Meta', market: 'us' },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway', market: 'us' },
  { symbol: 'JPM', name: 'JPMorgan', market: 'us' },
  { symbol: 'V', name: 'Visa', market: 'us' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', market: 'us' },
  { symbol: 'WMT', name: 'Walmart', market: 'us' },
  { symbol: 'PG', name: 'Procter & Gamble', market: 'us' },
  { symbol: 'MA', name: 'Mastercard', market: 'us' },
  { symbol: 'UNH', name: 'UnitedHealth', market: 'us' },
  { symbol: 'HD', name: 'Home Depot', market: 'us' },
  { symbol: 'DIS', name: 'Disney', market: 'us' },
  { symbol: 'BAC', name: 'Bank of America', market: 'us' },
  { symbol: 'NFLX', name: 'Netflix', market: 'us' },
  { symbol: 'ADBE', name: 'Adobe', market: 'us' },
];

export const ALL_STOCKS_DB: SearchResult[] = [...KR_STOCKS_DB, ...US_STOCKS_DB];
