# Terms 

* 프로젝트 공유에 앞서 생소한 단어들에 대해서 먼저 소개를 하려고 합니다. (익숙하신 분은 패스 하셔도 됩니다)  
* 저도 공부하면서 배워가는 입장이라 틀린 부분이 있을 수 있으니 출처를 남기면서 작성하였으니 참고 바랍니다.

## contents
1. node
2. express
3. app
4. server
5. dependency
6. module
7. middleware
8. router
9. controller
10. service
11. data access layer
12. query
13. callback hell
14. promise
15. pipeline pattern

## 1. node?
> Node.js는 확장성 있는 네트워크 애플리케이션(특히 서버 사이드) 개발에 사용되는 소프트웨어 플랫폼이다. 작성 언어로 자바스크립트를 활용하며 Non-blocking I/O와 단일 스레드 이벤트 루프를 통한 높은 처리 성능을 가지고 있다.
  내장 HTTP 서버 라이브러리를 포함하고 있어 웹 서버에서 아파치 등의 별도의 소프트웨어 없이 동작하는 것이 가능하며 이를 통해 웹 서버의 동작에 있어 더 많은 통제를 가능케 한다.
  
출처 : [wikipedia](https://ko.wikipedia.org/wiki/Node.js)  

## 2. express?
> 익스프레스(Express.js)는 노드(NodeJS) 상에서 동작하는 웹 개발 프레임웍이다. 이외에도 Hapi.js, Koa.js 등 다양한 웹프레임웍이 있지만 현재까지 가장 많이 사용하는 것이 바로 익스프레스이다.

출처 : [webFrameworks](http://webframeworks.kr/getstarted/expressjs/)  

## 3. app?
> app 은 express module 을 실행시켰을때 반환되는 함수이다. 어플리케이션을 생성해 주는 역할을 하고있다.

```javascript
/**
 * Create an express application.
 *
 * @return {Function}
 * @api public
 */

function createApplication() {
  var app = function(req, res, next) {
    app.handle(req, res, next);
  };

  mixin(app, EventEmitter.prototype, false);
  mixin(app, proto, false);

  // expose the prototype that will get set on requests
  app.request = Object.create(req, {
    app: { configurable: true, enumerable: true, writable: true, value: app }
  })

  // expose the prototype that will get set on responses
  app.response = Object.create(res, {
    app: { configurable: true, enumerable: true, writable: true, value: app }
  })

  app.init();
  return app;
}
```
## 4. server?
> 서버는 종류가 많다. 다만 우리가 고민해보는 부분이 WAS 가 많이 포함하고 있는 것 같다.

참조 : [wikipedia](https://ko.wikipedia.org/wiki/%EC%84%9C%EB%B2%84)

* WAS( web application server )
> 웹 애플리케이션 서버의 기본 기능은 3가지이다.

> 1. 프로그램 실행 환경과 데이터베이스 접속 기능을 제공한다.
> 2. 여러 개의 트랜잭션을 관리한다.
> 3. 업무를 처리하는 비즈니스 로직을 수행한다.

> 다만, 웹 애플리케이션의 정확한 정의는 존재하지 않아서 일부 기능을 제공하지 않는 웹 애플리케이션 서버도 존재한다. 업체들은 이러한 3가지 기능 말고도 여러 기능을 추가하고 강화하고 있다.

## 5. dependency?

> 의존성이라는 뜻으로 풀이되는 dependency 를 이해하려고 할 때 커플 링에 대해서 알아보면 좋을 것 같다.
서로간에 결합도를 낮추고 재사용성을 고려하거나 교체가 가능하도록 만들려고 분리 시켜둔 일종의 부품이다.

참조 : [wikipedia](https://en.wikipedia.org/wiki/Coupling_(computer_programming))

## 6. module?
> module 의 이미는 많겠자만, 이번 express-practice 에서 말하고자 하는 module 이란 npm install 을 통해서 설치되고
> node 환경에서 require 를 이용해서 하나의 부품으로 가져다 쓸 수 있는 것들을 모듈로 칭하려고 한다.

## 7. middleware?
>미들웨어는 양 쪽을 연결하여 데이터를 주고 받을 수 있도록 중간에서 매개 역할을 하는 소프트웨어, 네트워크를 통해서 연결된 여러 개의 컴퓨터에 있는 많은 프로세스들에게 어떤 서비스를 사용할 수 있도록 연결해 주는 소프트웨어를 말한다. 3계층 클라이언트/서버 구조에서 미들웨어가 존재한다. 
>웹 브라우저에서 데이터베이스로부터 데이터를 저장하거나 읽어올 수 있게 중간에 미들웨어가 존재한다.

출처 : [wikipedia](https://ko.wikipedia.org/wiki/%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4)

* 익스프레스에서 middleware 사용 예시
>미들웨어 함수는 요청 오브젝트(req), 응답 오브젝트 (res), 그리고 애플리케이션의 요청-응답 주기 중 그 다음의 미들웨어 함수 대한 액세스 권한을 갖는 함수입니다. 그 다음의 미들웨어 함수는 일반적으로 next라는 이름의 변수로 표시됩니다.
> 미들웨어 함수는 다음과 같은 태스크를 수행할 수 있습니다.
 
> 1. 모든 코드를 실행.
> 2. 요청 및 응답 오브젝트에 대한 변경을 실행.
> 3. 요청-응답 주기를 종료.
> 4. 스택 내의 그 다음 미들웨어를 호출.

```javascript
var express = require('express');
var app = express();

var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

app.use(myLogger);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000);
```
출처 : [expressjs](http://expressjs.com/ko/guide/writing-middleware.html)

## 8. router?
>라우팅은 URI(또는 경로) 및 특정한 HTTP 요청 메소드(GET, POST 등)인 특정 엔드포인트에 대한 클라이언트 요청에 애플리케이션이 응답하는 방법을 결정하는 것을 말합니다.
 각 라우트는 하나 이상의 핸들러 함수를 가질 수 있으며, 이러한 함수는 라우트가 일치할 때 실행됩니다.
 라우트 정의에는 다음과 같은 구조가 필요합니다.
 
 * 라우트의 사용 예시
 ```javascript
app.METHOD(PATH, HANDLER)
/*
* app은 express의 인스턴스입니다.
* METHOD는 HTTP 요청 메소드입니다.
* PATH는 서버에서의 경로입니다.
* HANDLER는 라우트가 일치할 때 실행되는 함수입니다.
* */
```

* 제 코드에서느 라우트의 역할은 요청이 들어온 경로에 대한 HANDLER (controller) 를 매핑해 주는 역할을 수행합니다.

출처 : [expressjs](http://expressjs.com/ko/starter/basic-routing.html)

## 9. controller?

사실 제가 알아본 바로는 컨트롤러의 역할은 모델에서 알맞은 메서드를 찾아서 라우터에 알맞은 핸들러를 장착해 주는것이 주 목적이였던것 같아요.
이렇게 하기 위해서는 컨틀롤러에 model 객체를 집어 넣어넣야 하는 상황이 발생하게 되는데요.
간단한 데이터를 가져올때는 상관없겠지만, 두개 이상의 모댈에서 가져온 값을 정제해야 하는 경우에는 controller 가 단순한 메핑 작업 뿐만 아니라 데이터 정제작업도 같이 수행하게 됩니다.
이렇게 되면 수행해야 하는 작업의 구분이 명확하게 나뉘어 지지 않아서 관심사의 분리가 필요하다고 생각했어요.
그러기 위해서는 router 가 controller 를 가져가고 controller 는 service 를 호출하고 , service 를 통해서 데이터에 접근 하는 방식을 선택했습니다.

참조 : [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes)

## 10. service?
데이터 정제나, 웹이 아니여도 돌아 갈수 있는 부분을 따로 구분하여 계층화 합니다.
다른게는 business logic layer 라고도 부르는데요, 방식은 많으니 참고 하셨으면합니다.
저는 service 를 통해서만 데이터에 접근 하도록 구조를 잡아보았어요
이 계층에서 수행하는 작업은 데이터 정제 입니다.

참조 : [developer.mozilla.org](https://codeburst.io/structuring-business-logic-in-node-js-application-326ba4dec658)

## 11. data access layer?
> 예를 들어 삽입 , 삭제 및 업데이트 와 같은 명령을 사용하여 데이터베이스의 특정 테이블에 액세스하는 대신 클래스와 몇 가지 저장 프로 시저를 데이터베이스에 만들 수 있습니다.
> 프로시 저는 클래스 내부의 메소드에서 호출되어 요청 된 값을 포함하는 객체를 리턴합니다.
> 또는 insert, delete 및 update 명령은 데이터 액세스 계층 내에 저장된 registeruser 또는 loginuser 와 같은 간단한 함수 내에서 실행할 수 있습니다.
> 또한 응용 프로그램의 비즈니스 논리 메서드를 데이터 액세스 계층에 매핑 할 수 있습니다. 예를 들어, 여러 테이블에서 모든 사용자를 페치 (fetch)하기 위해 데이터베이스로 쿼리를 작성하는 대신, 애플리케이션은 DAL로부터 하나의 메소드를 호출하여 해당 데이터베이스 호출을 추상화 할 수 있습니다.

* 줄여서 DAL 이라고 명칭을 사용하는데, 제 서버 구조에서는 mongoose 모듈을 이용하여 몽고 디비에 쿼리를 날리는 역할과 예외처리가 담겨 있습니다.
* model : 프로젝트 상에서 모델도 설명을 해야 하는데, mongoose.Schema 를 통해서 인스턴스로 생성이 되고, 데이터의 형태 (스키마) 와 데이터 입출력시 유효성을 담당하는 메서드들로 이루어져 있습니다.
* 이렇게 생성된 mongoose.model() 을 DAL 에서 사용하게 됩니다.

출처 : [wikipedia](https://en.wikipedia.org/wiki/Data_access_layer)

## 12. query?
쿼리는 디비에게 내리는 명령어로, 질의 라고 불리죠, 이러한 질의의 문법과 조합에 따라서 원하는 정보를 수집해서 가져올 수 있습니다.

> 몽고디비 질의문 문서를 보면 Node.js 에서 어떻게 잘의문을 설정해야 하는지에 대해서 설명이 잘 나와있습니다. 참고하세요~

참고 : [docs.mongodb.com](https://docs.mongodb.com/manual/tutorial/query-documents/)

> 하지만 몽구스를 사용하시면 몽구스 사용 예제를 보셔야 겠죵?

참고 : [mongoosejs](http://mongoosejs.com/docs/queries.html)

* 몽구스는 "thenable" 입니다. 다라서 콜백핼을 생성하지 않고도 순차적 처리가 가능합니다.

참고 : [mongoosejs](http://mongoosejs.com/docs/promises.html)

* 실제 적용 예시

```javascript
const User   = require('./user-schema');
const method = {};

// 유저 생성
method.createUser = (userEmail, userPwd, userName) => {
	const newUser     = new User();
	newUser.userEmail = userEmail;
	newUser.userPwd   = userPwd;
	newUser.userName  = userName;
	const query       = newUser.save();
	return query.then(() => `created user ${userName}`)
                 .catch((err) => err);
};

// 모든 유저리스트를 가져온다
method.getUsers = () => {
	const query = User.find({}, 'userEmail userPwd userName');
	return query.select('userEmail userPwd userName')
                 .then((users) => users)
                 .catch((err) => err);
};

// userEmail 으로 유저 한명을 찾기
method.getUserByUserEmail = (userEmail, userPwd, done) => {
	const query = User.findOne({userEmail: userEmail}, 'userEmail userPwd userName');
	return query.select('userEmail userPwd userName')
	             .then((user) => !user ? done(null, false) : user)
                 .then((user) => user.comparePassword(userPwd) ? done(null, user) : done(null, false))
                 .catch((err) => done(err));
};

module.exports = method;
```

## 13-14. callback hell & promise
* 콜백헬이 생기는 이유와 해결법인 프로미스에 대해서 알아보자

참고 : [medium.com](https://medium.com/@pitzcarraldo/callback-hell-%EA%B3%BC-promise-pattern-471976ffd139)

## 15. pipeline pattern

> 파이프 함수는 n 개의 연산 순서를 취합니다. 각 연산은 인수를 취하고, 그것을 처리합니다.
> 처리 된 출력을 시퀀스의 다음 작업을위한 입력 으로 제공합니다.
> 파이프 함수의 결과는 조작 순서의 묶음 버전입니다.

* 파이프는 함수를 순서에 맞게 실행시기는 일종의 기법입니다. 참고자료를 통해서 알아가시면 좋을것 같아요.

참고 : [medium.com](https://medium.com/@venomnert/pipe-function-in-javascript-8a22097a538e)

