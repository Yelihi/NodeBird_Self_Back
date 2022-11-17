const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { User, Post } = require("../models");
const router = express.Router();

router.post("/login", (req, res, next) => {
  // 이러한 패턴을 미들웨어 확장이라고 한다. 원래 passport 는 res,req, next 를 쓸수 없는 미들웨어인데 사용가능하게끔 확장함.
  passport.authenticate("local", (err, user, info) => {
    // 매개변수 이름은 마음대로
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      // passport 에서 login 할 수 있도록 해줌.
      if (loginErr) {
        // 이건 passport 에서의 에러
        console.error(loginErr);
        return next(loginErr);
      }
      // res.setHeader('Cookie', '랜덤문자');
      // 서버에서는 session 을 들고있다. 다만 이것도 백엔드 서버에서 다 가진게 아니라 아이디 값만 가지고 있다. 그래야 용량에서 유리하니.
      // req.login 실행시 동시실행되는게 index.js 에 serializeUser 실행된다.
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password"], // 비밀번호는 제외한다.
        },
        include: [
          {
            model: Post,
          },
          {
            model: User,
            as: "Followings",
          },
          {
            model: User,
            as: "Followers",
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword); // 뒤 데이터가 saga 에서 action.data, reducer 에선 me 에 들어간다.
    });
  })(req, res, next);
});
// Post / user/login

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("ok");
});

router.post("/", async (req, res) => {
  try {
    const exUser = await User.findOne({
      // 조건 넣어주기
      where: {
        email: req.body.email,
      },
    });
    const exNickName = await User.findOne({
      where: {
        nickname: req.body.nickname,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디입니다."); // return 안붙이면 밑에 코드도 실행되어 버린다
    }
    if (exNickName) {
      return res.status(403).send("이미 사용중인 닉네임입니다."); // return 안붙이면 밑에 코드도 실행되어 버린다
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 13);
    await User.create({
      email: req.body.email, // req.body == data == action.data
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(200).send("ok");
  } catch (error) {
    console.log(error);
    next(error); // error 들이 express 가 브라우저에게 이런 에러 났다고 얘기해줌. status 500 에러
  }
}); // /user

module.exports = router;
