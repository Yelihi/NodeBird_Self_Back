const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs"); // 파일 시스템을 조작할 수 있는 fs 모듈

const { Post, Image, User } = require("../models");
const { Comment } = require("../models");

const { isLoggedIn } = require("./middlewares");

const router = express.Router();

try {
  fs.accessSync("uploads");
} catch (err) {
  console.log("upload 폴더가 없으니 생산합니다");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      // 원익.jpg
      const ext = path.extname(file.originalname); // 확장자만 추출
      const basename = path.basename(file.originalname, ext); //원익
      done(null, basename + "_" + new Date().getTime() + ext); // 원익2341.jpg
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20mb
  // 프론트에서 클라우드로 바로 올릴수 있도록 하는게 맞는데, 일단은 이렇게 처리하자
});

router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id, // 이거 로그인 할 때, deserlialize 를 통해서 아이디만 들고 있다가, router 에 접근 시 그 전에 이걸 실행해서 사용자 데이터 복구해서 req.user 에 넣어놓는다고 하였다.
    });
    if (req.body.image) {
      // req.body 안에 존재한다.
      if (Array.isArray(req.body.image)) {
        // 배열이라면 image: [123.png, dkfkd.png, ...] 이런식으로 오게된다.
        const images = await Promise.all(
          req.body.image.map((image) => Image.create({ src: image })) // 시퀄라이즈 작업은 비동기이기에 map 으로 돌린것이니 여러개. 따라서 promise.all
        ); // 직접 주소를 넣어준다. 사진 자체는 db 에 넣지는 않는다.
        await post.addImages(images);
      } else {
        // 1개라면 image: 123.png
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
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
          model: User, // 게시글 작성자
          attributes: ["id", "nickname"],
        },
        {
          model: User, // 좋아요 누른 사람
          as: "Likers",
          attributes: ["id"],
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
      PostId: parseInt(req.params.postId, 10), // req.params 는 문자열이다.
      UserId: req.user.id,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
    });
    res.status(201).json(fullComment);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post(
  "/images",
  isLoggedIn,
  upload.array("image"),
  async (req, res, next) => {
    console.log(req.files);
    res.json(req.files.map((v) => v.filename));
  }
);

router.patch("/:postId/like", isLoggedIn, async (req, res, next) => {
  // PATCH /post/1/like
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다");
    }
    await post.addLikers(req.user.id);
    res.status(200).json({ PostId: post.id, UserId: req.user.id });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete("/:postId/like", isLoggedIn, async (req, res, next) => {
  // DELETE /post/1/like
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    await post.removeLikers(req.user.id);
    res.status(200).json({ PostId: post.id, UserId: req.user.id });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete("/:postId/post", isLoggedIn, async (req, res, next) => {
  try {
    await Post.destroy({
      where: { id: req.params.postId, UserId: req.user.id }, // UserId 가 일치해야 글을 삭제할 수 있도록 하자.
    });
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
