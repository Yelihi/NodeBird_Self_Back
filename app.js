const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const db = require("./models");
const passport = require("passport");
const passportConfig = require("./passport");

const app = express();

dotenv.config();
passportConfig();

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

// 밑 메서드 및 라우터 위에 이거 적어주자.
app.use(
  cors({
    origin: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 세션과 쿠키 설정해주기. 로그인했다 하더라도 브라우저와 백엔드 서버가 다른 포트를 사용하니, 브라우저에다가 로그인 정보를 보내준다
// 근데 비밀번호를 그대로 전달하면 보안에 취약하니, 대신 렌덤한 글자를 보내준다.
// 이걸 쿠키라고 한다.
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET, // 치환되서 들어감
    cookie: {
      httpOnly: true,
      secure: false,
      domain: "localhost:3000",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello express");
});

app.get("/api", (req, res) => {
  res.send("hello api");
});

app.get("/post", (req, res) => {
  res.json([
    {
      id: 1,
      content: "hello",
    },
    {
      id: 1,
      content: "hello",
    },
    {
      id: 1,
      content: "hello",
    },
  ]);
});

app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen(3065, () => {
  console.log("서버 실행 중!");
});
