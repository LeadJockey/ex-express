/*
* model : schema container
* mongoose.model 함수를 이용하여 지정된 스키마 들을 관리합니다.
* */
const mongoose                    = require('mongoose');
const Schema                      = mongoose.Schema;
// 스키마 서식 정의
const userModel                   = {
	userEmail : {type: String, default: ''},
	userPwd   : {type: String, default: ''},
	userName  : {type: String, default: ''},
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now}
};
// 스키마 생성
const userSchema                  = new Schema(userModel);
// 비밀번호 유효성 검사 메서드 등록
userSchema.methods.comparePassword = function (userPwd) {
	return userPwd === this.userPwd;
};

module.exports = mongoose.model('user', userSchema);




