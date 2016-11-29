var React = require('react');
var ResetPasswordHtml = require('./resetPasswordHtml.js');

var ResetPasswordData = React.createClass({
	getInitialState: function(){
		return {
			password: '',
			confirmPassword: '',
			passwordsMatch: null
		}
	},

	onPasswordChange: function(e){
		this.setState({ password: e.target.value })
	},

	onConfirmPasswordChange: function(e){
		this.setState({ confirmPassword: e.target.value })

		if (this.state.password === e.target.value){
			this.setState({ passwordsMatch: true })
		} else {
			this.setState({ passwordsMatch: false })
		}
	},

	handlePasswordResetSubmit: function(e){
		e.preventDefault();
			if (this.state.passwordsMatch){
				
				var password = this.state.password;
				this.props.resetPassword(password);

				this.setState({ 
				  password: '',
				  confirmPassword: ''
				});
			}
	},

	render: function(){
		return (
			<div>
				<ResetPasswordHtml 
				message={ this.props.message }
				handlePasswordResetSubmit={ this.handlePasswordResetSubmit }
				onPasswordChange={ this.onPasswordChange }
				password={ this.state.password }
				onConfirmPasswordChange={ this.onConfirmPasswordChange }
				confirmPassword={ this.state.confirmPassword }
				passwordsMatch={ this.state.passwordsMatch }
				/>
			</div>
			)
	}
});

module.exports = ResetPasswordData;