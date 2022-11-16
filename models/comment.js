module.exports = (sequeliz, DataTypes) => {
  const Comment = sequeliz.define(
    // User 는 모델이름. 이게 자동으로 소문자, 복수가 되서 mysql 에 저장된다.
    "Comment", // id 는 기본적으로 들어있다.
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
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User); // belongsTo 가 생기면 실제 id 컬럼이 생긴다.
    db.Comment.belongsTo(db.Post);
  };

  return Comment;
};
