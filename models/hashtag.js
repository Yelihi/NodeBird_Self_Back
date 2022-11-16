module.exports = (sequeliz, DataTypes) => {
  const Hashtag = sequeliz.define(
    // User 는 모델이름. 이게 자동으로 소문자, 복수가 되서 mysql 에 저장된다.
    "Hashtag", // id 는 기본적으로 들어있다.
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      // 유저 모델에 대한 셋팅
      charset: "utf8mb4", // 이모티콘 저장
      collate: "utf8mb4_general_ci", // 한글 저장
    }
  );
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" });
  };

  return Hashtag;
};
