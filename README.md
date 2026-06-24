# 📊 파워포인트코스피 (PowerPoint-KOSPI)

**프레젠테이션 하는 척 실시간 주가 확인!**

엑셀코스피(https://excelkospi.pages.dev)의 PowerPoint 버전입니다.

## ✨ 주요 기능

- 🎨 **PowerPoint UI 완벽 재현** - 리본 메뉴, 슬라이드 썸네일, 캔버스
- 📈 **실시간 주가** - 한국 주요 종목 시세 (30초 자동 갱신)
- 🔄 **네이버 금융 API** - 실시간 한국 주식 데이터 (10초 갱신)
- 💼 **회의실 위장** - 마치 발표자료를 보는 것처럼

## 🚀 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev
```

브라우저에서 http://localhost:3000 열기

## 📦 기술 스택

- **Next.js 15** - React 프레임워크
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 스타일링
- **네이버 금융** - 한국 주식 실시간 시세 (비공식 크롤링)

## 🔮 향후 개선 계획

### 실시간성 개선
- [ ] WebSocket 전환 (실시간 스트리밍)
- [ ] 한국투자증권 HTS API 연동 검토
- [ ] Server-Sent Events (SSE) 적용

### 기능 추가
- [ ] 종목 추가/삭제 UI
- [ ] 차트 슬라이드 (Recharts)
- [ ] 뉴스 헤드라인 슬라이드
- [ ] 슬라이드 전환 애니메이션

## 📝 라이선스

MIT License

---

**Made by Baton with ❤️**
