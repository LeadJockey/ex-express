/*
* model : schema container
*
* mongoose.Schema 의 정보를 관리
* */
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// 스키마 서식 정의
const userModel = {
	userEmail : {type: String, default: ''},
	userPwd   : {type: String, default: ''},
	userName  : {type: String, default: ''},
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now}
};

// 스키마 생성
const userSchema = new Schema(userModel);

// 스키마 전용 메서드 생성
userSchema.method = {};

// 유효성 검사 메서드 등록
userSchema.method.comparePassword = function (userPwd, callback) {
	if (userPwd === this.userPwd) {
		callback(null, true);
	} else {
		callback('error');
	}
};

module.exports = mongoose.model('user', userSchema);




