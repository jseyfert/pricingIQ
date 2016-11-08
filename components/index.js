// index *State*
//   header/*/
//    userLogout/*/
//    showWhichComponent
//     UserLoginData *State*
//       UserLoginForm/*/
//     UserSignupData *State*
//       UserSignupForm
//     UploadUrlsData *State*
//       UploadUrlsForm
//    footer/*/

var React = require('react');
var ReactDOM = require('react-dom');
var ShowWhichComponent = require('./showWhichComponent.js');
var Header = require('./header.js');
var Footer = require('./footer.js');

var Index = React.createClass({
	getInitialState: function(){
		return {
			errorMessage: null,
			okToSubmit: false,
			submitClicked: false,
			activeSubComponent: 'login',
			user: null,
			allUrls: [],
			allDomains: 
			[
			{domain: 'amazon' , domainAvailable: true, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Amazon.com-Logo.svg/200px-Amazon.com-Logo.svg.png'},
			{domain: 'walmart', domainAvailable: true, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Wal-Mart_logo.svg/200px-Wal-Mart_logo.svg.png'},
			{domain: 'sears' ,  domainAvailable: true, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Sears_logo_2010-present.svg/170px-Sears_logo_2010-present.svg.png'}
			]
		}
	},

	setActiveSubComponent: function(componentName) {
		// console.log('in setActiveSubComponent', componentName);
    this.setState({
      activeSubComponent: componentName,
      errorMessage: null,
    })
  },

	getOneUserFromServer: function(){
		var currentTime = new Date().getTime()
		// console.log(currentTime);
		var self = this;
		$.ajax({
			method: 'GET', 
			url: '/oneUser'
		}).done(function(data){
			// console.log( 'in getOneUser', data);
			self.setState({ 
        activeSubComponent: 'login',
				errorMessage: null,
				user: data,
				okToSubmit: (currentTime > data.canSubmitAfter)
				 });
		})
	},	

	loginUserFromServer: function(user){
		var currentTime = new Date().getTime()
		// console.log(currentTime);
		var self = this;
		$.ajax({
			method: 'POST',
			url: '/login',
			data: user,
			success: function(data){
				// console.log("in loginUserFromServer1", data.user);
				// console.log("in loginUserFromServer2", currentTime, data.user.canSubmitAfter );
				self.setState({ 
          activeSubComponent: 'login',
					errorMessage: null,
					user: data.user,
					okToSubmit: (currentTime > data.user.canSubmitAfter)
					 });
			},
			error: function(xhr, status, err){
				console.error('/login', status, err)
				self.setState({ 
					errorMessage: 'Email or password incorrect'
				 });
			}
		})
	},

	signupUserFromServer: function(user){
		var self = this;	
		$.ajax({
			method: 'POST',
			url: '/signup',
			data: user, 
			success: function(data){
				self.setState({ 
          activeSubComponent: 'login',
					errorMessage: null,
					user: data.user,
					okToSubmit: true
				})
				// console.log("Signup successful.", data.user);
			},
			error: function(xhr, status, err){
				console.error('/signup', status, err)
				self.setState({ 
					errorMessage: 'That email is taken'
				});
			}
		})
	},

	logoutUser: function(user){
		// console.log('in logoutUser');
		var self = this;
		$.ajax({
			url: '/logout',
			method: 'GET', 
			success: function(data){
				$.ajax({
					method: 'GET', 
					url: '/oneUser'
				}).done(function(data){
					// console.log('in loggout', data);
					self.setState({ 
            activeSubComponent: 'login',
						errorMessage: null,
						user: data,
						submitClicked: false
						 });
				})
			}.bind(self),
			error: function(xhr, status, err){
				console.error('/logout', status, err.toString());
			}
		})
	},

	submitUrlsToServer: function(urls){
		var midnight = new Date().setHours(23,59,59,0);
		// console.log('in submitUrlsToServer', midnight);
		this.setState({ 
			allUrls: urls,
			submitClicked: true
		})

		// $.ajax({
		// 	method: 'PUT',
		// 	url: '/updateUser',
		// 	data: this.state.user,
		// 	success: function(data){
		// 		// console.log("in loginUserFromServer1", data.user);
		// 		// console.log("in loginUserFromServer2", currentTime, data.user.canSubmitAfter );
		// 		console.log("in submitUrls to server", data);
		// 		// self.setState({ 
		// 		// 	user: data.user,
		// 		// 	okToSubmit: (currentTime > data.user.canSubmitAfter)
		// 		// 	 });
		// 	},
		// 	error: function(xhr, status, err){
		// 		console.error('/updateUser', status, err.toString())
		// 	}
		// })
	},

	componentDidMount: function(){
		this.getOneUserFromServer();
	},

	render: function(){
			if (!this.state.user) {
				return null;
			} else {
			return (
				<div>
					<Header 
          user={ this.state.user } 
          logoutUser={ this.logoutUser }
          />
					<ShowWhichComponent 
          user={ this.state.user } 
          okToSubmit={ this.state.okToSubmit } 
          submitClicked={ this.state.submitClicked } 
          errorMessage={ this.state.errorMessage } 
          allUrls={ this.state.allUrls } 
          allDomains={ this.state.allDomains } 
          logoutUser={ this.logoutUser } 
          activeSubComponent={ this.state.activeSubComponent } 
          setActiveSubComponent={ this.setActiveSubComponent } 
          submitUrlsToServer={ this.submitUrlsToServer } 
          loginUserFromServer={ this.loginUserFromServer } 
          signupUserFromServer={ this.signupUserFromServer }
          />
					<Footer />
				</div>
			)
			}
	}
});

ReactDOM.render(	<Index />,	document.getElementById('app'));

