
var React = require('react');
var validator = require('validator');
var parseDomain = require("parse-domain");
var _ = require("underscore");

var UploadUrlsForm = require('./uploadUrlsForm.js');


var UploadUrlsData = React.createClass({

  getInitialState: function(){
		return {
			uploadedUrls: []
		}
	},

	parseAndValidateUrls: function(text){
    var urlArray = text.split("\n");
    var domains = [];
    var domainsAndUrls = [];
    var distinctDomains = [];
    var arrOfObj = [];

    // validate urls and parse domain
    urlArray.map(function(url){
        if (validator.isURL(url) && parseDomain(url)){
          var getDomain = parseDomain(url).domain
          domains.push(getDomain)
          domainsAndUrls.push([getDomain, url])
        } else {
          return null;
        }
    })
      
    // use underscore to select only unique domains
    distinctDomains = _.uniq(domains) 

    // creat json obj
    var createObj = function(arr, domain, index) {
      var property = ''
      var array = []
      for(var i = 0; i < arr.length ; i++) {
        if(arr[i][0] === domain){
          property = domain
          array.push(arr[i][1])        
        } else {
          null;
        }
        arrOfObj[index] = {
          domain: property,
          urls: array
        }
      }
    }

    // call createOb for each distinct domain
    var runPerDomain = function(arr, domainsAndUrls){
      for(var i = 0; i < arr.length ; i++) {
        createObj(domainsAndUrls, arr[i], i)
      }
    }(distinctDomains, domainsAndUrls)

    // console.log('end of function', arrOfObj);
    return arrOfObj;
	},

	onUrlChange: function(e){
		var validatedUrlArray = this.parseAndValidateUrls(e.target.value);
		this.setState({ 
      uploadedUrls: validatedUrlArray
    })
	},

	handleUrlSubmit: function(e){
    e.preventDefault();

    var urls = [];
    urls = this.state.url;

    this.props.submitUrlsToServer(urls);
    this.setState({ 
      url: []
    });
	},

	render: function(){
		return (
			<div>
				<UploadUrlsForm 
				handleUrlSubmit={ this.handleUrlSubmit }
				onUrlChange={ this.onUrlChange }
				/>
			</div>
			)
	}
});

module.exports = UploadUrlsData;
