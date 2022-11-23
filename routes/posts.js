const express = require("express");

const { Post, User, Image, Comment } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      // 모든 게시글을 가져온다.
      // where: { id: lastId }, // 페이지네이션 구현할 때, lastId 는 고정이기에 게시글 수정 삭제 추가 할 때도 관계없이 고정이다.
      limit: 10, // offset : 0~ 10 까지 가져와라, 즉 시작점을 말해준다. 근데 실무에서는 잘 안쓴다.
      order: [
        ["createdAt", "DESC"], // 최신 게시물
        [Comment, "createdAt", "DESC"],
      ], // 최신 댓글부터 가져온다.
      include: [
        {
          model: User, // 게시글 작성자
          attributes: ["id", "nickname"],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User, // 댓글 작성자
              attributes: ["id", "nickname"],
            },
          ],
        },
        {
          model: User, // 좋아요 누른 사람
          as: "Likers",
          attributes: ["id"],
        },
      ],
    });
    console.log(posts);
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    next(err);
  }
}); // GET / posts

module.exports = router;
