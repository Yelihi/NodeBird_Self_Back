const express = require("express");

const { Post, Image, User } = require("../models");
const { Comment } = require("../models");

const { isLoggedIn } = require("./middlewares");

const router = express.Router();

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    console.log("req.user.id", req.user.id);
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id, // 이거 로그인 할 때, deserlialize 를 통해서 아이디만 들고 있다가, router 에 접근 시 그 전에 이걸 실행해서 사용자 데이터 복구해서 req.user 에 넣어놓는다고 하였다.
    });
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
        },
        {
          model: User,
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  // 주소 부분에서 동적으로 바뀌는 부분을 파라미터라고 한다.
  try {
    // 혹여나 게시글이 없는데 댓글을 달아버릴수도 있으니깐.
    const post = await Post.findOne({
      // 아이디로 게시글 찾기
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 게시글입니다."); // 요청 한번에 응답 한번
    }
    const comment = await Comment.create({
      content: req.body.content,
      postId: req.params.postId,
      UserId: req.body.userId,
    });
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete("/", (req, res) => {
  res.json({ id: 1 });
});

module.exports = router;
