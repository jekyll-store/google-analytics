// Includes
var Reflux = require('reflux');
var JSE = require('jekyll-store-engine');
var listenAndMix = JSE.Mixins.listenAndMix;

var GoogleAnalyticsStore = Reflux.createStore({
  // Public
  listenables: [JSE.Actions],
  mixins: [
    listenAndMix(JSE.Stores.Basket),
    listenAndMix(JSE.Stores.Delivery),
    listenAndMix(JSE.Stores.Order)
  ],
  onSetTrackingId: function(args) {
    t.ga('create', args.id, 'auto');
    t.ga('require', 'ec');
  },
  onPageLoaded: function() {
    t.ga('send', 'pageview');
  },
  onVisit: function(args) {
    t.ga('ec:addProduct', { 'name': args.name });
    t.ga('ec:setAction', 'detail');
  },
  onSetItem: function(args) {
    t.ga('ec:addProduct', { 'name': args.name, 'quantity': args.quantity });
    t.ga('ec:setAction', 'add');
    t.ga('send', 'event', 'UX', 'click', 'add to basket');
  },
  onRemoveItem: function(args) {
    t.ga('ec:addProduct', { 'name': args.name });
    t.ga('ec:setAction', 'remove');
    t.ga('send', 'event', 'UX', 'click', 'remove from basket');
  },
  onCheckoutStep: function(args) {
    t.addBasket();
    t.ga('ec:setAction','checkout', { 'step': args.step });
  },
  onSetPaymentOptions: function(args) {
    t.ga('set', '&cu', args.currency);
  },
  onCompleted: function(args) {
    t.addBasket();
    t.ga('ec:setAction', 'purchase', {
      'id': args.number,
      'revenue': t.order.getIn(['totals', 'order']).toString(),
      'shipping': t.delivery.get('amount').toString()
    });
    t.ga('send', 'pageview');
  },

  // Private
  ga: require('ga-browser')(),
  addBasket: function() {
    t.basket.forEach(function(item, name) {
      t.ga('ec:addProduct', {
        'name': name,
        'price': item.get('price').toString(),
        'quantity': item.get('quantity').toString()
      });
    });
  }
});

var t = module.exports = GoogleAnalyticsStore;
