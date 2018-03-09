/*
* service : business logic layer
*
* web 과 완전히 분리 되어서 사용될 수 있는 함수 ( method ) 들의 집합
* DAL 에서 가져온 데이터를 정제하는 메서드들의 집합
* */
const da     = require('./data-access');
const method = {};

// method.createUser = (req, res) => da.createUser(req, res);

// 회원리스트에 대한 요청이 있는 경우의 서비스 메서드
method.getUsers = () => da.getUsers();


module.exports = method;