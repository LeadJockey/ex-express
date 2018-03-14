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
15. pipe pattern

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

익스프레스에서 middleware 사용 예시
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
