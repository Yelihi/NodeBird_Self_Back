module.exports = (sequeliz, DataTypes) => {
  const User = sequeliz.define(
    // User 는 모델이름. 이게 자동으로 소문자, 복수가 되서 mysql 에 저장된다.
    "User", // id 는 기본적으로 들어있다.
    {
      email: {
        type: DataTypes.STRING(30), // 30글자 이하 STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: false, // 필수
        unique: true, // 중복 안되게
      },
      nickname: {
        type: DataTypes.STRING(30), // 30글자 이하
        allowNull: false, // 필수
      },
      password: {
        type: DataTypes.STRING(100), // 30글자 이하
        allowNull: false, // 필수
      },
    },
    {
      // 유저 모델에 대한 셋팅
      charset: "utf8",
      collate: "utf8_general_ci", // 한글 저장
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Post); // 사람이 여러개의 게시글을 가질 수 있다.
    db.User.hasMany(db.Comment); // 사람이 여러개의 게시글을 가질 수 있다.
  };

  return User;
};
