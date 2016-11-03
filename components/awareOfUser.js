var React = require('react');
var LogoutUser = require('./userLogout.js');
var UserLoginData = require('./userLoginData.js');
var UserSignupData = require('./userSignupData.js');
var UploadUrlsData = require('./uploadUrlsData.js');


var checkUserLastSubmit = function (){

}

function AwareOfUser(props){
		if(/*props.user.user !== "anonymous" && timeCheck2*/ false){
			return (
				<div>
				<LogoutUser />
					you have already submitted for today - please come back tomorrow
				</div>
				)
		} else if (props.user.user !== "anonymous"){
			return (
				<div>
					<UploadUrlsData 
					submitUrlsToServer={ props.submitUrlsToServer }
					logoutUser={ props.logoutUser }
					/>
				</div>
				)
		} else if (/*props.activeComponent === "login"*/ true) {
			return (
				<div>
				  <UserLoginData 
				  loginUserFromServer={ props.loginUserFromServer }
				  loginUserFromServer2={ props.loginUserFromServer2 }
				  setActiveComponent={ props.setActiveComponent }
				  />
				</div>
				)
		} else {
			return (
				<div>
				  <UserSignupData
				  signupUserFromServer={ props.signupUserFromServer }
				  setActiveComponent={ props.setActiveComponent }
				  />
				</div>
				)
		}
};

module.exports = AwareOfUser;

//<h2> Hello { props.user.user.username } </h2>
// LogoutUser logoutUser={ props.logoutUser } />


	// var timeCheck = props.user.lastUrlSubmit
	// var timeCheck1 = now - props.user.lastUrlSubmit
	// var timeCheck2 = (now - props.user.lastUrlSubmit >= 86400000 ) ? true : false ;
	// var timeCheck3 = (now - props.user.lastUrlSubmit <= 86400000 ) ? true : false ;
	// console.log(timeCheck, timeCheck1, timeCheck2, timeCheck3, 'in time check');

//<UploadUrlsData loginUserFromServer={ props.loginUserFromServer }  />