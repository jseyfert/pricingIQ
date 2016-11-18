var React = require('react');
var ErrorMessage = require('./errorMessage');

var UserSignupHtml = React.createClass({

  showEmailInput: function(){
    var errorMessage = (this.props.errorMessage) ? this.props.errorMessage : null;
    if (errorMessage){
      return(
        <div className="form-group has-error">
          <label className="control-label" for="inputError1">Email ({ errorMessage })</label>
          <input type="email" className="form-control" name="email" onChange={ this.props.onEmailChange } value={ this.props.email } id="inputError1" required/>
        </div>
        )
    } else {
      return(
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" name="email" onChange={ this.props.onEmailChange } value={ this.props.email } required/>
        </div>
        )
    }
  },  

  showPasswordValidationInput: function(){
    var passwordsMatch = this.props.passwordsMatch

    if (passwordsMatch === null){
      return(
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" className="form-control" name="confirmPassword" onChange={ this.props.onConfirmPasswordChange } value={ this.props.confirmPassword } required/>
        </div>
        )
    } else if (passwordsMatch) {
      return(


        <div className="form-group has-success">
          <label className="control-label" for="inputSuccess1">Confirm Password (Passwords match)</label>
          <input type="password" className="form-control" id="inputSuccess1" aria-describedby="helpBlock2" onChange={ this.props.onConfirmPasswordChange } value={ this.props.confirmPassword } id="inputError1" required/>
        </div>
        )
    } else {
      return(
        <div className="form-group has-error">
          <label className="control-label" for="inputError1">Confirm Password (Passwords do not match)</label>
          <input type="password" className="form-control" name="confirmPassword" onChange={ this.props.onConfirmPasswordChange } value={ this.props.confirmPassword } id="inputError1" required/>
        </div>
        )
    }
  },

  render: function(){
    
    return (
      <div>
        <div className="container">
          <div className="col-sm-6 col-sm-offset-3">
          <ErrorMessage message={this.props.message} />
          <h1><span className="fa fa-sign-in"></span> Signup</h1>
            <form className="" onSubmit={ this.props.handleUserSignupSubmit }>
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" name="name" onChange={ this.props.onUserChange } value={ this.props.user } required/>
              </div>
              <div className="form-group">
                <label>Company</label>
                <input type="text" className="form-control" name="company" onChange={ this.props.onCompanyChange } value={ this.props.company } required/>
              </div>
            {this.showEmailInput()}
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" name="password" onChange={ this.props.onPasswordChange } value={ this.props.password } required/>
              </div>
            {this.showPasswordValidationInput()} 
                <button className="btn btn-warning btn-lg">Sign up</button>
            </form>
            <hr/>
            <p>Already have an account? <a onClick={ this.props.setActiveComponent.bind(null, 'login') }>Login</a></p>
          </div>    
        </div>    
      </div>
    )
  }
});

module.exports = UserSignupHtml;