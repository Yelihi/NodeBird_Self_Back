module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    // User 는 모델이름. 이게 자동으로 소문자, 복수가 되서 mysql 에 저장된다.
    "Image", // id 는 기본적으로 들어있다.
    {
      src: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      // 유저 모델에 대한 셋팅
      charset: "utf8", // 이모티콘 저장
      collate: "utf8_general_ci", // 한글 저장
    }
  );
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };

  return Image;
};
