module.exports = (sequeliz, DataTypes) => {
  const Post = sequeliz.define(
    // User 는 모델이름. 이게 자동으로 소문자, 복수가 되서 mysql 에 저장된다.
    "Post", // id 는 기본적으로 들어있다.
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      // 유저 모델에 대한 셋팅
      charset: "utf8mb4", // 이모티콘 저장
      collate: "utf8mb4_general_ci", // 한글 저장
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // 어떤 사용자에게 속해있다.
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image); //
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" }); // 다대다
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });
    db.Post.belongsTo(db.Post, { as: "retweet" });
  };

  return Post;
};
