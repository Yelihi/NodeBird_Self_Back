<h1 align="center">Twitter 핵심기능 구현</h1>
<h3 align="center"> React Nodebird -Back- 정리 </h3> 
<br />

<h2 id="프로젝트소개"> :dart: 개요 및 목표</h2>

<p align="justify">
SNS 서비스 중 twitter 에서 사용되고 있는 기능들을 학습하였습니다. <br />
express 와 시퀄라이즈를 활용하여 mySQL 과 연동하여, 데이터를 관리하였고, 간단한 서버를 구현하였습니다.
</p>
<br />

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="사용 기술"> :book: 학습한 기술들</h2>

> **pakage**

- Node : @16.16.0
- Express : @4.18.2
- Express-session : @1.17.3
- MySQL2 : @2.3.3
- Sequelize : @5.22.5
- cors: @2.8.5
- passport: @0.6.0
- dotenv: @16.0.3
- cookie-parser: @1.4.6
- multer: @1.4.5
- morgan: @1.10.0
  <br />

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="구현목표"> :floppy_disk: 학습 내용(진행중)</h2>

- 개략적인 <b>node.js</b>, <b>express</b> 개념.
- <b>sequelize</b>를 통한 <b>MySQL</b> 데이터베이스 관리방법.
- 비밀번호 암호화를 위한 <b>bycript</b>.
- <b>Cors</b>문제가 발생하는 이유와 해결책.
- 로그인 처리과정. (<b>passport</b>, <b>session</b>, <b>cookie</b>, <b>dotenv</b>)
- 미들웨어를 이용한 로그인 유무 파악.
- 게시글 작성 과정에서 <b>params</b> 이용하기.
- credentails 로 쿠키 공유하는 방법.
- 게시글 불러오기, 게시글 제거, 닉네임 변경 과정.
- 이미지 업로드를 위한 <b>multer</b> 이용방법.

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 align="center" id="next">:large_blue_diamond: Study</h2>
<br>

<details>
<summary><b>node.js & express</b></summary>
<div markdown="1">
<br />

> **Node.js**

<p align="justify">
Node.js 에는 웹서버가 내장되어 있기 때문에 코드를 통해 서버를 만들고 실행할 수 있습니다.
</p>
<br />

```js
// 서버를 만드는 모듈 http 를 불러옵니다.
const http = require("http");
// 서버를 만드는 메서드를 활용해서 서버를 생성합니다.
const server = http.createServer((req, res) => {
  console.log(req.url, req.method); //request, response
  res.end("hello node");
});
// 3065 포트에 연결해줍니다. 연결이 되었다면 콘솔창에 찍히게 됩니다.
server.listen(3065, () => {
  console.log("서버 실행 중");
});
```

<p align="justify">
Node.js 모듈 시스템을 구축하고 있습니다. http 모둘을 가져오면서 서버를 실행시킬 수 있습니다. <br/><br />
위 createServer 메서드의 req, res 는 각각 request, response 를 의미합니다. request 는 요청을 담당하는데, 서버는 이러한 요청에 반응을 하게 됩니다. 그리고 그 결과를 response 에 담아서 돌려줍니다.
<br />요청에 대한 응답으로 어떠한 정보를 보내고 싶다면 이 response 에 담아서 전달하면 됩니다. 위 "hello node" 역시 메세지를 응답에 담아서 보내는 것입니다. 메세지 뿐 아니라 JSON, AJAX, Image 등 이러한 정보들을 담아서 전달할 수 있습니다.<br/></br/>
요청 -> 서버처리 -> 응답 으로 이어지는 흐름이고, 또한 하나의 요청은 하나의 응답으로 대응되어야 합니다.<br /><br />request, response 에는 header 부분과 body 부분이 있는데, header 부분에는 종류나 크기,캐시 여부 등등이 담겨있으며, body 에 실제로 주고받고자 하는 내용이 담겨져 있습니다. 
</p>
<br />

> **Express**

<p align="justify">
express 는 서버 구성을 도와주는 프레임워크입니다. 범용으로 자주 사용되는 프레임워크입니다.
</p>

```
npm i express
```

<p align="justify">
http 모듈은 express 에서 내부적으로 처리하기 때문에 사용하지 않아도 되며, `const app = express()` 를 사용해서 만든 Express app 객체로 모든 서버의 일을 처리합니다. 마지막에는 `app.listen()` 을 통해서 요청을 대기중입니다.
</p>

```js
// express 를 가져옵니다.
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("hello express");
});

app.get("/api", (req, res) => {
  res.send("hello api");
});

app.get("/api/post", (req, res) => {
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

app.post("/api/post", (req, res) => {
  res.json({ id: 1, content: "hello" });
});

app.delete("/api/post", (req, res) => {
  res.json({ id: 1 });
});

app.listen(3065, () => {
  console.log("서버 실행 중");
});
```

  <br />

<p align="justify">
위 코드는 express 의 라우팅 부분에 대한 예시 입니다. 메서드에 대해 간단하게 요약하자면, 
</p>

- `app.get` : 가져오기
- `app.post` : 생성하기
- `app.put` : 전체 수정
- `app.delete` : 제거하기
- `app.patch` : 부분 수정
- `app.option` : 데이터를 보낼 수 있음을 암시
- `app.head` : 헤더만 가져오기

<p align="justify">
메서드의 경우 백엔드 개발자와 프론트엔드 개발자 간 협의에 의해 정하면 됩니다.<br /><br />
또한 app 상태내에서 너무 코드가 길어질 수 있으니, 라우터를 분리할 수 있습니다.
</p>

```js
const postRouter = require("./routes/post");

// 생략

app.use("/post", postRouter); // 공통된 주소를 빼줍니다.
```

```js
const express = require("express");
// router 를 설정해줍니다.
const router = express();

router.post("/", (req, res) => {
  res.json({ id: 1, content: "hello" });
});

router.delete("/", (req, res) => {
  res.json({ id: 1 });
});
// 모듈로서 export 시킵니다.
module.exports = router;
```

</div>
</details>

<details>
<summary><b>데이터베이스 설정</b></summary>
<div markdown="1">
<br />

> **Sequelize**

<p align="justify">
sequelize 는 MySQL 자바스크립트를 통해 관리할 수 있도록 도와줍니다.<br />
아래와 같이 설치 후 초기 셋팅을 하겠습니다.
</p>
<br />

```
npm i sequelize sequelize-cli mysql2
```

- mysql2 는 node 와 database 를 연결시켜주는 드라이버 같은 역할을 하게 됩니다.

```
npx sequelize init
```

- config.json

```json
{
  "development": {
    "username": "root",
    "password": "dnjsdlr1",
    "database": "react-nodebird",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "dnjsdlr1",
    "database": "react-nodebird",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "dnjsdlr1",
    "database": "react-nodebird",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

- 비밀번호를 입력해주고 데이터베이스의 이름을 정해주면 됩니다.
- 그리고 기본 폴더들이 설치되었을 텐데, 이 폴더 중 model/index.js 를 셋팅해주어야 합니다.

```js
// 시퀄라이즈를 불러오고
const Sequelize = require("sequelize");
// 기본값이 development 이며 셋팅을 했다면 앞에것으로 하겟습니다.
const env = process.env.NODE_ENV || "development";
// config.json 에서 [env] 에 따라 development, test, production 중에서 가져옵니다.
const config = require("../config/config.json")[env];
const db = {};

// 데이터를 가져옵니다.
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// 이 부분은 추후 데이터간 일대다, 다대다 관계 시 연결된 부분들을 같이 연관시켜서 가져오게 됩니다.
// 반복문을 사용해서 일괄 처리해준것입니다.
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
```

<br />

> **데이터베이스 사용자 설계**

<p align="justify">
기본적으로 셋팅이 완료되었다면, 실제로 데이터들이 들어갈 데이터베이스를 설계하여야 합니다. models 폴더 안 생성하는 파일 이름이 곧 데이터테이블의 이름이 됩니다. 트위터에서 사용될 데이터베이스를 생각하여 파일을 생성합니다. 이 중 예를 들어 `User` 데이터를 살펴보겠습니다.
</p>

```js
const DataTypes = require("sequelize");
const { Model } = DataTypes;

// User 가 모델 이름입니다.
module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          // 들어갈 데이터를 설정해줍니다.
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
        // 유저 모델에 대한 셋팅입니다.
        modelName: "User", // 이부분은 추후 프론트 엔드와의 연결 시 잘 맞춰주어야 합니다.
        tableName: "users",
        charset: "utf8", // 한글 저장이 가능하게 합니다.
        collate: "utf8_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Post); // 사람이 여러개의 게시글을 가질 수 있습니다. (hasMany)
    db.User.hasMany(db.Comment); // 사람이 여러개의 게시글을 가질 수 있습니다.
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" }); // through 는 테이블 이름을 설정, as 는 햇갈리지 않게 별칭지어주기
    // Post 와 다대다 관계가 형성이 됩니다.
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "FollowingId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "FollowerId",
    });
    // 같은 테이블에서 다대다는 foreignKey 가 필요합니다. 왜냐면 예를 들어 팔로잉한 사람을 찾고싶으면, 먼저 팔로워 쪽에서의 자신을 찾은 다음 팔로잉을 찾는것이기 때문이죠.
    // 그래서 foreignKey 로 Id 이름을 바꿔준다고 생각하면 됩니다.
  }
};
```

- 마치 표를 자바스크립트 코드로 작성한다고 생각하시면 됩니다.
  <br />

> **sequelize 관계설정**

<p align="justify">
위 코드의 주석으로 설명이 나와있지만, 정리해보자면, 위 예시에서도 알 수 있듯이, 한 사람이 여러 글을 작성할 수 있으며, 그렇다고 한 게시글을 여러명이서 작성할 수 있는 것은 아닙니다. 이러한 관계를 일대다 관계라 하는데, 이런식으로 각 데이터간 관계들을 표현해주어야 올바르게 프론트에게 데이터를 전달할 수 있습니다. <br /><br />
기본적으로 시퀄라이즈에는 일대일, 일대다, 다대다 관계를 구별해주는 메서드가 있습니다.
</p>

- `belongsTo` : 속한다는 의미로 어떤 사용자에게 속해있는것입니다.
- `hasMany` : 많이 가지고 있다는 의미입니다.
- `belongsToMany` : 다대다 관계를 나타냅니다.
- `Through` : 다대다 관계에서 테이블의 이름을 정해줍니다. 다대다 관계는 중간 테이블이 필요하기 때문입니다.
- `as` : 다대다 관계의 column 을 지어줍니다.
- `foreignKey` : 같은 테이블에 다대다 관계가 맺어지면 같은 userId 이기 때문에 이를 구별해주기 위하여 필요합니다.
  <br />

> **실제 mysql 과 연결시키기**

- index.js

```js
// 생략
// 모델들을 불러와줍니다.
const comment = require("./comment");
const hashtag = require("./hashtag");
const image = require("./image");
const post = require("./post");
const user = require("./user");

// 생략
// db 객체안에 넣어주며
db.Comment = comment;
db.Hashtag = hashtag;
db.Image = image;
db.Post = post;
db.User = user;

// 이들을 모두 시퀄라이즈와 연결시킵니다.
Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

// 생략
```

- app.js

```js
const db = require("./models");

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);
```

<p align="justify">
app.js 에서 설정이 끝났다면, 실제 mySQL 과 연결을 시켜주어야 합니다. 순서대로 진행합시다
</p>

- mysql server 를 실행시켜줍니다. (`mysql.server start`)
- `mysql -u root -p` 를 통해 시작합니다.
- 다음 vscode 로 돌아가 `npx sequelize db:create` 를 통해 연결시켜줍니다.
- 이제 workbench 에 들어가서 확인하면 됩니다.
- 참고로 workbench 는 추가로 설치해주면 됩니다.

<br />

</div>
</details>

<details>
<summary><b>antd</b></summary>
<div markdown="1">
<br />

> **antd**

<p align="justify">
antd를 통해서 좀 더 쉽게 페이지의 레이아웃을 설정할 수 있습니다.<br />
간단한 메뉴부터, nav, login form, layout 등등 공식 홈페이지를 참고하여 양식에 맞게 적용하면 됩니다. 전반적으로 미리 디자인이 깔끔하게 되어있지만, 수정이 필요하다면 사용자에 성향에 맞게 수정이 가능합니다. 여기선 version 4 를 사용하였습니다. 최근 버전에는 사용법이 약간 달라진 부분이 있으니 항상 공식 문서를 우선적으로 참조합시다.
<br />
</p>
<br />

```
npm i antd@4
npm i @ant-design/icons
```

<br />
<p align='justify'> `@ant-design/icons` 도 설치해두면 아이콘을 설정할 때 아주 유용합니다. 같이 설치합시다. </p>
<br />

> 예제 (AppLayout)

```js
import React, { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Link from "next/link";
// 이렇게 import 에서 사용할 수 있다.
import { Menu, Input, Row, Col } from "antd";

import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import styled from "styled-components";

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/">
            <a>노드버드</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput
            placeholder="input search text"
            enterButton
            style={{
              width: 300,
              verticalAlign: "middle",
            }}
          />
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a href="https://rock7246.tistory.com" target="_blank" rel="noreferrer noopenner">
            By Yelihi
          </a>
        </Col>
      </Row>
    </div>
  );
};
AppLayout.prototype = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;

// 기존 스타일을 변경할 때 styled-component 를 활용해도 되고, 아니면 그냥 인라인으로 수정해도 된다.
const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;
```

<br />
<p align='justify'>각 요소들의 사용법은 공식 문서를 활용하도록 합시다</p>
</br>

[공식 사이트](https://ant.design/)

</div>
</details>

<details>
<summary><b>useInput</b></summary>
<div markdown="1">
<br />

> **useInput**

<p align="justify">
Form 양식을 작업하다보면 수많은 input 창이 나오게 되고 그때마다 반복되는 함수를 사용하기에는 번거로운 점이 있습니다.<br />
그래서 이전에는 하나의 state 에 여러개의 value 를 객체 형식으로 관리하였는데, 이번에 커스텀 훅을 사용하여 좀 더 깔끔한 코드로 작성하고자 하였습니다.
<br />
</p>
<br />

- useInput.js

```js
import { useState, useCallback } from "react";

export default (initialValue = null) => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handler];
};
```

- return 부분이 중요한데, 초기 상태값과, handler 함수를 반환하게 됩니다. 이 함수를 그대로 활용할 수 있게 됩니다.
  <br />

```js
import useInput from "../hooks/useInput";

const LoginForm = ({ setIsLoggedIn }) => {
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");
```

- 이런식으로 상태값과 함수를 구조분해로 마치 useState 를 사용하듯이 사용하면 됩니다.
- 만일 setState 가 필요해지는 경우가 발생한다면, 간단하게 커스텀훅으로 돌아가 return 부분에 setState 를 같이 반환하게 하면 됩니다.
  <br />

```js
import { useState, useCallback } from "react";

export default (initialValue = null) => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handler, setValue];
};
```

</div>
</details>

<details>
<summary><b>Redux</b></summary>
<div markdown="1">
<br />

> **왜 Redux를 사용해야할까**

<p align="justify">
리엑트의 장점은 화면 랜더링을 컴포넌트의 재사용을 활용하여 좀 더 효율적으로 할 수 있다는 점에 있습니다. 이 때 각 컴포넌트에는 상태값들이 존재할 수 있고, 이러한 상태값의 변화가 곧 화면 랜더링의 업데이트로 이어지곤 합니다. 그리고 이러한 상태값 중 일부는 여러 컴포넌트에서 동시에 사용되어야 하는 경우가 발생합니다.<br /><br />
예를 들자면 만약 사용자의 nickname 이 변경되었다고 할 때, 이 nickname 을 사용하는 컴포넌트가 여러개일 수 있고, 실제로 회원정보창, 장바구니창, 게시글, 댓글 등등에서 활용되곤 합니다. 만일 이러한 상태값들이 많아지게 된다면, 단순 props 로 상태값을 전달하는 방식에는 한계점이 느껴지게 되고, 이런 상태값을 저장할 수 있는 공간이 한 공간 이상은 필요하게 됩니다.
<br /><br />이러한 의미에서 Redux와 같은 상태관리 라이브러리가 필요하게 됩니다.<br />
</p>
<br />

```
npm i next-redux-wrapper
npm i redux
```

- next 에서는 추가로 next-redux-wrapper 가 필요합니다.
- store 폴더를 생성해서, configureStore 를 만듭니다.

```js
import { createWrapper } from "next-redux-wrapper";

import reducer from "../reducers";

// store 를 먼저 만들어 주어야 합니다.
const configureStore = () => {
  // store 생성하기
  const store = createStore(reducer);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development,",
}); // 자세한 설명이 나와서 이걸 설정해주자.

export default wrapper;
```

- 이후 redux 의 상태값을 사용하고자 하는 페이지(컴포넌트)에 가서 아래처럼 설정을 해주면 됩니다.

```js
import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import "antd/dist/antd.css";

import wrapper from "../store/configureStore";

const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

// 컴포넌트를 wrapper 로 감싸주면 됩니다.
export default wrapper.withRedux(NodeBird);
```

- 이렇게 `_app.js` 에 설정해주게 되면, 나머지 모든 컴포넌트에 관해서 redux store 을 활용할 수 있게 됩니다.
  <br />
  <br />

> **Redux 는 어떻게 동작하는가**

<p align="justify">
리덕스는 중앙 저장소에서 데이터를 저장하는데, 이 데이터를 수정하려면 action 을 통해서 바꿀 수 있습니다. 이 action 을 dispatch 하면 중앙저장소가 바뀌게 됩니다. <br /><br />
물론 diapatch 만 한다고 바뀌는것은 아닙니다. 특정 타입인 action 을 받았을 때, 이 타입에 따른 행동 요건을 switch 문으로 reducer 에서 관리하게 됩니다. 
<br /><br />
문제는 각각의 action 에 대한 reducer 의 코드량이 엄청 많아지게 된다는 점인데, 진행됨에 따라 action 들의 기록들이 남게 되어, 뒤로가기도 가능하고, 어떤식으로 상태가 관리되는지 보기 수월하다는 장점이 있습니다.
<br /><br /> 실제로 한번 구현해보겠습니다.
</p>

```js
// 초기 상태값입니다. 여기에 이제 데이터가 추가되거나 삭제됩니다.
const initialState = {
  user: {
    isLoggedIn: false,
    user: null,
    signUpData: {},
    loginData: {},
  },
  post: {
    mainPosts: [],
  },
};

// 이전상태, 액션 => 다음상태 를 만드는 함수
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: true,
          user: action.data,
        },
      };
    case "LOG_OUT":
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: false,
          user: null,
        },
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
```

- 위 코드는 login,logout 에 대한 reducer store 입니다.
- 불변성을 지켜주어야 하기에 스프레드 연산자를 통해 얇은 복사를 하고 있습니다.
- 해당 컴포넌트에서 action 을 건내주면 rootReducer 는 이 type 에 따른 state 값을 변화시켜줍니다.
- reducer 에 action 을 보내는 함수는 밑과 같습니다.

```js
export const loginAction = (data) => {
  return {
    type: "LOG_IN", // reducer 는 이 type 을 통해서 취할 행동을 결정합니다.
    data: data, // 필요한 data 를 같이 전달하게 됩니다.
  };
};

export const logoutAction = () => {
  return {
    type: "LOG_OUT",
  };
};
```

> 위 함수는 store 에서 정의한 함수입니다. 컴포넌트에서 직접 dispatch를 해도되지만, action 함수를 미리 만들어서 dipatch 에서 함수를 넣어 전달해도 됩니다. 사용자의 편의에 따라 합시다.

- reducer 는 상태값을 변화시키고, 이 상태값을 컴포넌트는 그대로 가져와서 사용하면 됩니다.

```js
// useSelector 를 통해서 상태값을 가져올 수 있습니다.
// 컴포넌트 어디던지 가능합니다.
import { useSelector } from "react-redux";

const AppLayout = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  // 이런식으로 상태값을 가져와 밑에 그대로 활용하면 됩니다.

	return (
	....


	<Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
        </Col>
```

- dispatch 보내는 방법은 역시나 간단합니다.
- useDispatch 를 통해서 dispatch를 정의하고 그대로 사용하면 됩니다.

```js
import { useDispatch } from "react-redux";
import { loginAction } from "../reducers";

const LoginForm = () => {
  const dispatch = useDispatch();

	const onSubmitForm = useCallback(() => {
    // id, password 를 데이터로 전달합니다.
    dispatch(loginAction({ id, password }));
  }, [id, password]);
```

<br />

> **Redux Devtools**

<p align='justify'>크롬에서 확장프로그램을 설치가 가능합니다. 설정할 때는 개발자 모드에서만 작동하도록 설정하는것이 좋습니다. 크롬과 npm 내 둘다 설치가 되어있어야 사용 가능합니다.</p>

```
npm i redux-devtools-extension
npm i @redux-devtools/extension
```

<p align='justify'>configureStore.js 에 아래와같이 설정을 해줍시다.</p>

```js
import { applyMiddleware, createStore, compose } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "../reducers";

const configureStore = (context) => {
  console.log(context);
  const middlewares = [];
  // 개발자 모두에 한해서 Devtools 를 사용하겠다는 것입니다.
  const enhancer = process.env.NODE_ENV === "production" ? compose(applyMiddleware(...middlewares)) : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
```

</div>
</details>

<details>
<summary><b>Generator 이해와 Redux-saga</b></summary>
<div markdown="1">
<br />

> **generator**

<p align="justify">
Generator함수는 중단점이 있는 함수라고 생각하면 됩니다.<br /><br />
자바스크립트에서 함수를 실행하게 되면 코드 전부가 실행이 되게 되는데, 제너레이터함수는 yield 라는 일정 중단점에서 멈추게 됩니다. 딱 여기까지만 실행하고 이후 코드를 실행시키고 싶으면 next()를 통해 호출하게 되면 가능합니다. 
</p>

```js
const gen = function* () {
  console.log(1);
  yield;
  console.log(2);
  yield;
  console.log(3);
  yield 4;
};

const generator = gen();

generator; // gen {<suspended>}

generator.next();
// 1
// {value: undefined, done: false}

generator.next();
// 2
// {value: undefined, done: false}

generator.next();
// 3
// {value: 4, done: false}

generator.next();
// {value: undefined, done: true}
```

- yield 부분에서 계속해서 중단이 이뤄짐을 확인할 수 있습니다.

```js
const gen = function* (){
	while(true){
		yield '무한';
	}
}

const g = gen();

g.next()
// {value: '무한' , done: false}
// 이러한 객체 형식을 yield 가 반환합니다.

g.next()
// {value: '무한' , done: false}

g.next()
// {value: '무한' , done: false}

g.next()
// {value: '무한' , done: false}

g.next()
// {value: '무한' , done: false}

g.next()
// {value: '무한' , done: false}

....
```

<p align="justify">
원래 자바스크립트에서 while(true) 의 경우 조건 후 break 를 걸어두지 않는다면, 무한 루프에 빠지게 되는데, 제너레이터는 실행 개념이 다릅니다. 왜냐하면 yield 에서 멈추기 때문에 next() 를 통해서 위 코드처럼 계속해서 호출을 할 수 있습니다. <br /><br />
이러한 특성은 마치 이벤트리스너와 비슷한데, 어떠한 특정 조건(클릭같은)에 g.next() 가 호출이 된다면 이벤트리스너와 같다고 할 수 있겠습니다.<br /><br />
제너레이터 함수의 경우 Caller 와 Calle 로 나눠서 생각해볼 수 있습니다. 앞에서 함수 호출 시 yield 에서 반환 객체가 나온다고 하였는데, 이러한 제너레이터 함수를 계속 next해주는 역할을 담당하는 것이 Caller 입니다. Caller 는 제너레이터함수가 반환한 Calle(객체, 제너레이터)를 가지고 로직을 수행하게 됩니다. 게속 함수를 호출할지 아니면 중단할지 등등을 결정할 수 있게 됩니다.
</p>

<br />

> **saga**

<p align="justify">
saga는 위에서 살펴본 제너레이터함수의 특징을 활용합니다. <b>Redux-saga 에서 saga 가 바로 제너레이터함수 입니다.</b> 그렇다면 이러한 함수를 호출하는 역할을 하는 Caller 가 필요한데, 이 역할을 미들웨어에서 수행하게 됩니다. <b>미들웨어는 Saga(제너레이터함수)를 끊임없이 동작시킵니다.</b> 따라서 우선 미들웨어 설정이 필요합니다. 
</p>

```
npm i redux-saga
```

- configStore.js 에서 미들웨어 설정을 해줍니다.

```js
import createSagaMiddleware from "redux-saga";

// saga 폴더에서 saga(제너레이터함수)가 담긴 rootSaga 를 가져옵니다.
import rootSaga from "../sagas";

const configureStore = (context) => {
  // Caller 역할을 할 미들웨어를 생성합니다.
  const sagaMiddleware = createSagaMiddleware();
  // 미들웨어 안에 넣어줍니다.
  const middlewares = [sagaMiddleware];
  const enhancer = process.env.NODE_ENV === "production" ? compose(applyMiddleware(...middlewares)) : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  // 중요한 부분인데 아까도 설명하였듯이 Caller 역할을 하기에
  // 계속해서 미들웨어는 돌아가야 합니다.
  // 그래서 sagaMiddleware.run 을 통해서 미들웨어를 돌려줍니다.
  // redux-saga 는 미들웨어에 우리의 saga(rootSaga)를 등록하고 수행합니다.
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};
```

- 이를 통해 미들웨어는 saga를 계속해서 실행시킬 것입니다.
- 그리고 saga에서 오는 제너레이터를(명령) 실행해주는 역할을 하게 됩니다.

<p align="justify">
조금의 이해를 돕기 위해, redux-thunk 와 비교를 하게 되면, redux-thunk 에서 비동기를 처리하는 과정의 예시 코드를 살펴보겠습니다.
</p>

```js
function asyncIncrement() {
  return async (dispatch) => {
    await delay(1000);
    dispatch({ type: "INCREMENT" });
  };
}
```

<p align="justify">
위 코드에서 await 를 통해 실제로 1초의 딜레이 이후 dispatch 를 실행하게 됩니다. 즉 비동기적인 처리가 함수 내부에 들어가 있습니다. 직접 함수에서 처리하는 거죠.
</p>

```js
function* asyncIncrement() {
  // Saga는 아래와 같이 간단한 형태의 명령만 yield 합니다.
  yield call(delay, 1000); // {CALL: {fn: delay, args: [1000]}}
  yield put({ type: "INCREMENT" }); //  {PUT: {type:'INCREMENT'}}
}
```

<p align="justify">
그와 달리 saga 에서 yield 는 이펙트생성자(call, put) 을 통해서 제너레이터(객체, 이펙트) 만 생성하여 이를 미들웨어에 전달합니다. <b>그러니깐 마치 '이거 1초 딜레이 하시구', '이 타입을 dispatch 하세요' 라고 미들웨어에게 명령을 하는 것입니다. 제너레이터함수 에서는 직접 비동기 처리를 하지 않는 것입니다. </b> <br /><br />
이러한 방식의 장점은 실제 위 코드를 테스트하는 과정에서 얻을 수 있습니다. 
</p>

```js
// saga 가 전달하는 명령이, 실제 의도하고자 한 명령과 일치하는지만 확인하면 됩니다. 1초를 기다릴 이유가 없습니다.

const gen = asyncIncrement();
expect(gen.next().value).toEqual(call(delay, 1000));
expect(gen.next().value).toEqual(put({ type: "INCREMENT" }));
```

<br />

> **effect**

<p align="justify">
앞에서 이펙트 생성자가 이펙트를 만든다고 하였는데, 이펙트는 제너레이터 라고 생각하면 됩니다. 이펙트는 객체일 뿐입니다. 어떤 사람이 '나는 밥을 먹을꺼야' 라고 말을 했다고 쳐도, 실제로 이 말은 그냥 말일 뿐입니다. 밥을 먹은것이 아니죠. <br /><br /> 마찮가지로 이펙트는 그저 객체일 뿐, 이 객체를 참조하여 직접 객체의 정보대로 실행하는것은 미들웨어가 하게 됩니다. 그리고 그 결과를 다시 제너레이터 함수(saga) 에 전달하는 것입니다. 그러면 다시 saga 는 미들웨어에 그 다음 명령을 전달하고, 미들웨어는 실행하고... 이렇게 계속해서 진행이 되게 됩니다.<br /><br /> saga 는 이러한 이펙트 생성자가 다양하게 존재합니다. take, call, delay, takeLatest, put 등등 다양한 명령을 전달할 수 있으니, 이는 공식 API 를 참고하면 될 것 같습니다.
</p>

[공식 API](https://redux-saga.js.org/docs/api/#effect-creators)
<br />

> **rootSaga 셋팅하기**

<p align="justify">
예시를 통해서 셋팅의 과정을 살펴보겠습니다.
</p>

```js
import { all, call, fork, put, take, takeLatest } from "redux-saga/effects";
import axios from "axios";

function logInAPI(data) {
  // 주의할 점은 여긴 일반함수입니다.
  return axios.post("/api/login", data);
}

function* logIn(action) {
  // post 해줘야 하니 action.data 를 넘깁니다.
  try {
    yield put({
      // yield를 통해 제너레이터를 미들웨어에 전달합니다.
      type: "LOG_IN_REQUEST",
    });
    const result = yield call(logInAPI, action.data); // call 은 동기고 fork 는 비동기적으로 작동합니다. 그러니깐 call 을 해야지 위 axios 결과값을 기다립니다.
    yield put({
      // put = dispatch
      type: "LOG_IN_SCCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_IN_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchLogIn() {
  // 이벤트리스너 같은느낌입니다.
  yield takeLatest("LOG_IN_REQUEST", logIn); // login action 실행될 때까지 기다리라고 명령을 미들웨어에 전달합니다.
}

function* watchLogOut() {
  yield takeLatest("LOG_OUT_REQUEST", logOut);
}

export default function* rootSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut)]); // 마치 이벤트 리스너를 등록해준다 생각합시다.
}
```

- saga 폴더에 rootSaga 를 만들어주고 재너레이터 함수를 생성합니다.
- rootSaga 가 실행되면 위 2가지 함수가 백그라운드에 이벤트리스너가 존재하듯 Type action 을 기다립니다.
- action 이 들어오게 되면, 위 login 함수가 실행이 됩니다.(logout 은 생략하였습니다..)
- 서버의 결과값에 따라 try, catch 를 통해 2가지 형식의 type을 구분하여 미들웨어에게 명령을 내립니다.

<p align="justify">
여기서 이펙트생성자에 대해 좀 더 살펴보겠습니다. watchlogin 에서 takeLeast 이펙트 생성자를 사용한것은 이유가 있습니다.<br /><br />
예를 들어서 로그인 요청을 통해 한번 로그인이 실행될 때, 만약 이펙트생성자를 take 로 하게 되면, action 을 받음과 동시에 watchlogin 은 사라지게 됩니다. 이벤트리스너처럼 계속 남아있지 않습니다. while(true) 루프를 통해서 처리해도 되지만, saga 는 여러가지 이펙트생성자를 제공하고, 이를 통해 takeLeast 를 써서 계속 남겨두도록 명령하는것이 가능합니다. 또한, takeLaest 의 경우 debounce 의 성질을 가지고 있습니다. 만일 요청버튼을 순간 연속으로 눌렀을 경우 마지막 클릭부분만 요청이 가도록 해줍니다.
</p>

</div>
</details>

<details>
<summary><b>shortId, faker</b></summary>
<div markdown="1">
<br />

> **shortId**

<p align="justify">
더미 데이터를 만들때 id 를 자동적으로 생성해주는 라이브러리 입니다.<br />
id 값은 리엑트에서 리스트 구조에 고유한 key 값이 존재해야한다는 점에서 중요한데, 이를 간단하게 고유한 id 를 만들어 주기 때문에 편리합니다.
<br />아래처럼 설치합시다<br />
</p>
<br />

```
npm i shortId
```

- 더미데이터 예시입니다.

```js
Images: [
        {
          id: shortId.generate(),
          src: "https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726",
        },
        {
          id: shortId.generate(),
          src: "https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg",
        },
        {
          id: shortId.generate(),
          src: "https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg",
        },
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: "nero",
          },
          content: "우와 개정판이 나왔군요~",
        },
        {
          id: shortId.generate(), // 이렇게 id 가 있어야 한다.
          User: {
            id: shortId.generate(),
            nickname: "hero",
          },
          content: "얼른 사고싶어요~",
        },
```

<br />

> **faker**

<p align="justify">
역시나 더미데이터를 생성하는 데 유리한 라이브러리 입니다.<br />
다만 이 라이브러리가 업데이트 부분에서 좀 문제가 있어서, 버전을 @5로 지정해서 사용하는것을 추천합니다. (혹은 @faker-js/faker 를 사용합시다)
<br />아래처럼 설치합시다<br />
</p>
<br />
```
npm i faker@5
npm i @faker-js/faker
```

- 사용법은 공식 홈페이지를 활용해서 필요한 부분들을 체워주면 됩니다.

```js
initialState.mainPosts = initialState.mainPosts.concat(
  Array(20)
    .fill()
    .map(() => ({
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: faker.internet.userName(),
      },
      content: faker.lorem.paragraph(),
      Images: [
        {
          src: faker.image.cats(),
        },
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: faker.internet.userName(),
          },
          content: faker.word.adjective(),
        },
      ],
    }))
);
```

<br />

[@faker-js/faker](https://www.npmjs.com/package/@faker-js/faker)

</div>
</details>

<details>
<summary><b>immer</b></summary>
<div markdown="1">
<br />

> **immer**

<p align="justify">
Redux 는 상태를 변경해줄 때 불변성을 지켜주었어야 했고, 스프레드 연산자를 주로 사용했습니다. (툴킷을 사용하지 않는다는 가정하에) <br />
상황에 따라선 코드가 복잡해지곤 하는데, 이를 간단하게 바꿔줄 라이브러리가 immer 입니다.
<br />아래처럼 설치합시다<br />
</p>
<br />

```
npm i immer
```

- immer 사용 예시입니다.

```js
import produce from 'immer';


export default (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_POST_REQUEST: {
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      }

		// ....
			case default:
				break;
```

- produce 를 import 하여, return 부분을 produce로 감싸줍니다.
- draft 를 state 대신 치환해줍니다.
- 장점은 역시나 복잡한 코드를 단순하게 해준다는 점에 있습니다.

```js
case ADD_COMMENT_SUCCESS: {
        const postIndex = state.mainPosts.findIndex(
           (v) => v.id === action.data.postId
         );
         const post = { ...state.mainPosts[postIndex] };
         post.Comments = [dummyComment(action.data.content), ...post.Comments];
         const mainPosts = [...state.mainPosts];
         mainPosts[postIndex] = post;
         return {
           ...state,
           mainPosts,
           addCommentLoading: false,
           addCommentDone: true,
         };
      }
```

- 위 코드는 댓글을 생성할 때의 reducer 코드입니다.
- 불변성을 지켜주기 위해서, 특정 post 를 얕은 복사를 하고, 그 내부 댓글 들도 얕은 복사를 해줍니다.
- 이후 댓글을 추가하고, 얕은 복사된 mainPost 에 post를 치환해줍니다.
- 얼핏 간단한 과정도, 불변성을 지켜주는 과정에서 코드가 복잡해지기 시작합니다.

```js
case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Comments.unshift(dummyComment(action.data.content));
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      }
```

- 위 코드는 immer 를 활용한 코드입니다. 동일하게 댓글을 추가하는 과정입니다
- 비교 시 훨씬 간단해진 코드를 확인할 수 있습니다.
- post 를 찾아 그 내부 comment 배열에 새로생성된 댓글을 추가해주면 끝입니다.
- immer 의 특징은 오히려 불변성을 지켜주지 말아야 한다는 점에 있습니다.

<br />

</div>
</details>

<details>
<summary><b>infinite scroll</b></summary>
<div markdown="1">
<br />

> **infinite scroll**

<p align="justify">
추가적으로 react-visualized 같은 react windowing 기법을 익히면 더욱 좋지만 우선 기본 원리부터 파악해보고자 합니다.<br />
무한 스크롤을 적용하기 위해, 이벤트리스너에서 스크롤에 관련된 지식을 먼저 학습해야 합니다.
<br />원래를 생각해보면 어느정도 지점의 스크롤 위치에 도달했을 때, 데이터를 추가적으로 가져오면 됩니다. 즉, 특정 지점에서 요청을 보내도록 해야합니다. 그렇기 때문에 특정 위치를 알아야 합니다. <br />
</p>
<br />

```Js
window.addEventListener('scroll', onScroll)
```

- scroll 이벤트를 useEffect 로 생성할 수 있습니다.
- 참고로 이벤트 생성과 더불어 컴포넌트 소멸 시 이벤트를 지워주는것 까지 고려해야 합니다.
- 이제 특정 위치를 파악해봅시다

```js
console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
```

- window.scrollY : 사용자가 스크롤을 내릴 때의 순간의 위치값
- document.documentElement.clientHeight : 사용자가 사용하는 화면상의 세로폭
- document.documentElement.scrollHeight : 스크롤로 포함된 전체 총 높이

```js
window.scrollY > document.documentElement.scrollHeight - document.documentElement.clientHeight - 1200;
```

- 즉, 위처럼 표현하면 무한 스크롤을 구현하는 기본 조건을 나타낼 수 있습니다
- 뒤에 빼주는 숫자는 스크롤이 채 끝까지 내려가기 전에 로딩을 불러오고자 하여 일정 수치를 빼준것입니다.
- 전체 코드로 표현해보면 아래와 같습니다.

```js
useEffect(() => {
  // 이벤트리스너에 대응하는 함수입니다.
  function onScroll() {
    // 일정 높이까지 스크롤이 되었다면
    if (window.scrollY > document.documentElement.scrollHeight - document.documentElement.clientHeight - 1200) {
      // 요청을 보내게 됩니다.
      if (hasMorePost && !loadPostLoading) {
        dispatch({
          type: LOAD_POSTS_REQUEST,
        });
      }
    }
  }
  window.addEventListener("scroll", onScroll);
  return () => {
    // 컴포넌트가 소멸하면 이벤트 역시 소멸시켜주어야 합니다.
    window.removeEventListener("scroll", onScroll);
  };
}, [hasMorePost, loadPostLoading]);
```

- 여기서 hasMorePost 는 계속해서 데이터를 가져오긴 그러하니, 이 상태가 false 가 된다면(예를 들어 어떠한 포스트 글의 갯수가 60개가 된다면) 더이상 dispatch 를 실행하지 않겠다는 의도입니다.
- loadPostLoading 은 saga 를 통해 takeLatest 를 걸었다고 한들 요청 자체는 무수히 많이 들어가기 때문에, loadPostLoading 이 true 상태라면 더이상 요청하지 않는다는 방법입니다.
- 이러한 처리가 필요한 이유는, 스크롤 이벤트의 경우 콘솔로 scrollY 를 찍어보면 알겠지만 정말 순간적으로 무수히 많이 이벤트를 호출하기 때문입니다.

```js
      case LOAD_POSTS_SUCCESS: {
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.data);
        draft.hasMorePost = draft.mainPosts.length === 10; // 10개씩을 불러오고 만약 남은 개 8개이면 false 가 됩니다.
        break;
      }
```

- 이렇게 요청이 성공적으로 끝나면 다시 loadPostLoading 을 false 로 변경해주어 dispatch 요청이 갈 수 있도록 설정이 됩니다.

</div>
</details>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)
