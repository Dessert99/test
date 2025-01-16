// 프론트 + spring

const cors = require("cors"); // CORS 패키지 불러오기

// 허용할 도메인 리스트 (프론트엔드 & 백엔드 구분)
const whitelist = {
  frontend: ["http://localhost:3000", "https://myapp.com"], // React/Vue 프론트엔드 도메인 목록
  backend: ["http://localhost:8080", "https://api.myapp.com"], // Spring 백엔드 도메인 목록
};

// CORS 옵션을 동적으로 설정하는 함수 (요청마다 다르게 적용)
const corsOptions = (req, callback) => {
  let allowedOrigins = []; // 요청에 따라 허용할 도메인 목록을 저장할 변수

  // 요청 URL의 경로(path)에 따라 CORS 허용 도메인 결정
  if (req.path.startsWith("/api")) {
    allowedOrigins = whitelist.backend; // "/api"로 시작하는 요청이면 Spring 백엔드 허용
  } else {
    allowedOrigins = whitelist.frontend; // 그 외 요청은 프론트엔드 허용
  }

  // 최종 CORS 설정 객체 생성
  const corsConfig = {
    origin: allowedOrigins, // ✅ 허용된 도메인만 CORS 요청 가능
    methods: ["GET", "POST", "PUT", "DELETE"], // ✅ 허용할 HTTP 메서드 목록
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ 클라이언트가 보낼 수 있는 헤더 지정
    credentials: true, // ✅ 인증 정보 포함 허용 (쿠키, 세션 등)
  };

  callback(null, corsConfig); // 🎯 CORS 설정을 Express에 적용 (비동기 방식)
};

// 📌 미들웨어로 사용할 수 있도록 CORS 설정을 내보내기
module.exports = cors(corsOptions); // 다른 파일에서서 require("./corsConfig")를 하면, cors(corsOptions) 함수가 실행된 결과가 반환됨.
