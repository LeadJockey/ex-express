# Local Setting : Installation

1. mongodb install - 참고 : [velopert](https://velopert.com/436)
2. brew install node - (Node 는 brew 를 통해서 인스톨 하심이 나중에 경로찾을떄 편합니다.)
3. https://github.com/LeadJockey/ex-express 에서 clone - 프로젝트 생성
4. npm install - package.json 파일에 등록된 dependencies 설치를 시작합니다.
5. npm start 를 통해서 index 접근

# Directory Structure
```text
root+
    |docs--+ // practice documents 
    |      |Step1.md...
    |      |Step2.md...
    |      |Step3.md...
    |      
    |src---+
           |routes+ // app routers
           |      |user.js // router for user modules
           |
           |user--+ // user modules
           |      |controller.js
           |      |data-access.js
           |      |index.js
           |      |passport.js
           |      |service.js
           |      |user-schema.js
           |
           |views-+ // views
           |      |index.pug 
           |      |login.pug
           |      |signup.pug
           |
           |app.js // express.app settings
```
* app.js 가 server.js 의 역할을 수행합니다.
* user 모듈에는 controller / service / data-access / schema 순으로 연결되는 로직이 들어가 있습니다.
* user 는 express 를 모르도록(모듈화) 설계를 했습니다.
* 따라서 이론상으로는 서버가 koa 처럼 다른 식으로 들어온다고 하여도 req,res 객체만 맞춰준다면 충분이 부붐픙로서 교환이 가능하도록 업데이트 해볼 예정입니다.
* 뷰는 별개로 관리를 합니다. 따라서 뷰엔진이 달라진다고 하여도 크게 문제 되지 않습니다.
* user modules 를 사용하기 위해서는 라우터 디렉토리에서 라우팅 설정을 해 주어야 합니다.
* 아직 node_modules 로 부터 받는 dependencies 가 user 에 남아 약간은 의존성이 남아 있는 상태 입니다.
* 로그인은 passport 를 사용했습니다. 
* 비동기식 요청에 대한 처리에서 콜백헬의 문제를 해결하기 위해서 user 에서는 app 에서 사용할수 있는 promisify 라는 미들웨어 로직을 제공합니다.
* 임의로 만들어둔 미들웨어를 사용하기 싫은 경우, 단지 express-promise 모듈을 사용하세요.



