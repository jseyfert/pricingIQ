
var React = require('react');

var UrlGroupRed = React.createClass({
  render: function(){
    var index = this.props.index 
    var urlCount = this.props.urlCount
    var domain = this.props.domain
    var urls = this.props.urls
    var countLeftToSubmit = this.props.countLeftToSubmit
    var domainOffered = this.props.domainOffered
    var domainActive = this.props.domainActive
    // var badgeCount = null //(this.props.domainActive) ? urlCount + ' of 0'  : urlCount + ' of ' + countLeftToSubmit
    // var badgeText = (this.props.domainActive) ? 'Limit Reached' : 'Offline'

    var displayBadgeText = function(){
      if(!domainOffered){
        return 'Not Offered'
      } else if (domainActive){
        return 'Limit Reached'
      } else {
        return 'Offline'
      }
    }
            // <span className="badge redBackground">{badgeCount}</span>
    return (
      <div className="panel-group" id={"faqAccordion" + index} >
        <div className="panel panel-danger">
          <li className="list-group-item list-group-item-danger" data-toggle="collapse" data-parent={"#faqAccordion" + index} data-target={"#question" + index}>
            <span className="badge redBackground">{displayBadgeText()}</span>
            <span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
            <strong> {domain}</strong>
          </li>
          <div id={"question" + index} className="panel-collapse collapse" style={{height: '0px'}}>
            <ul className="list-group"> 
            { this.props.displayListItem(urls, urlCount, countLeftToSubmit, index) }
            </ul>
          </div>
        </div>
      </div>
      )
    }
});

module.exports = UrlGroupRed;


