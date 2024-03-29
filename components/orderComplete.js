
var React = require('react');
var _ = require("underscore");
var Message = require('./partialComps/message');
var Logo = require('./partialComps/logo');
var UrlItemGreen = require('./partialComps/urlDisplay/itemGreen');
var UrlItemRed = require('./partialComps/urlDisplay/itemRed');
var UrlGroupGreen = require('./partialComps/urlDisplay/groupGreen');
var UrlGroupRed = require('./partialComps/urlDisplay/groupRed');
var UrlGroupYellow = require('./partialComps/urlDisplay/groupYellow');

var OrderComplete = React.createClass({
  displayRow: function(){
    
    var rows = [];

    var allUrls = this.props.allUrls;
    var allDomains = this.props.allDomains;

    var displayListItemGreen = function(urls, urlCount, countLeftToSubmit, index){
      var listItem = [];
      urls.map(function(url, thisIndex){
        listItem.push( <UrlItemGreen url={url} index={index} key={thisIndex} /> )    
      })
      return listItem;
    }    

    var displayListItemRed = function(urls, urlCount, countLeftToSubmit, index){
      var listItem = [];
      urls.map(function(url, thisIndex){
        listItem.push(<UrlItemRed url={url} index={index} key={thisIndex} />)
      })
      return listItem;
    }

    var displayListItemYellow = function(urls, urlCount, countLeftToSubmit, index){
      var listItem = [];
      // console.log('urls',urls)
      urls.map(function(url, thisIndex){
        // console.log('homedepot.com',thisIndex)
        if(thisIndex < countLeftToSubmit ) {
          listItem.push( <UrlItemGreen url={url} index={index} key={thisIndex} /> ) 
        } else {

          listItem.push( <UrlItemRed url={url} index={index} key={thisIndex} />)
        }
      })
      return listItem;
    }

    allUrls.map(function(obj, index){
      var domain = obj.domain.toUpperCase()
      var domainActive = obj.domainActive
      var domainOffered = obj.domainOffered
      var countLeftToSubmit = obj.countLeftToSubmit
      var urlCount = obj.urlCount
      var urls = obj.urls
      // console.log('in them urls', urls)

      if(urlCount > 0){
        if(domainActive && countLeftToSubmit > 0){
          if (urlCount > 15 || urlCount > countLeftToSubmit) {
            rows.unshift( 
              <UrlGroupYellow urls={urls} urlCount={urlCount} domain={domain} index={index} key={index} displayListItem={displayListItemYellow} countLeftToSubmit={countLeftToSubmit} /> 
              )
          } else {
            rows.unshift( 
              <UrlGroupGreen urls={urls} urlCount={urlCount} domain={domain} index={index} key={index} displayListItem={displayListItemGreen} countLeftToSubmit={countLeftToSubmit}  /> 
              )
          }
        } else {
          rows.push( 
            <UrlGroupRed urls={urls} urlCount={urlCount} domain={domain} index={index} key={index} displayListItem={displayListItemRed} countLeftToSubmit={countLeftToSubmit} domainOffered={domainOffered} domainActive={domainActive} /> 
          )
        }
      }
    })
    return rows;
  },

  render: function(){
    return (
      <div>
        <Logo delay={false} /> 
        <div className="container">   
          <h3 className="text-center">Urls in green are being processed. Check your email to recieve your data.</h3>
          <div className="text-center"><Message message={this.props.message} /></div>
          <br/>
          {this.displayRow()}
        </div>
      </div>
    )
  }
});

module.exports = OrderComplete;

