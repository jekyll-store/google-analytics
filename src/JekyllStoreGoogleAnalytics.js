var Reflux = require('reflux');
var JSE = require('jekyll-store-engine');

JSE.Actions.setTrackingId = Reflux.createAction();
JSE.Actions.pageLoaded = Reflux.createAction();
JSE.Actions.visit = JSE.Actions.visit || Reflux.createAction();
JSE.Actions.checkoutStep = Reflux.createAction();
JSE.Stores.GoogleAnalytics = require('./GoogleAnalyticsStore');
