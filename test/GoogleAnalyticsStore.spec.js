var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('immutable');
var B = require('big.js');
var GoogleAnalyticsStore = require('../src/GoogleAnalyticsStore');

describe('GoogleAnalyticsStore', function() {
  GoogleAnalyticsStore.ga = sinon.spy();

  GoogleAnalyticsStore.basket = I.fromJS({
    'Laser Sight': { name: 'Laser Sight', price: B(34.28), quantity: B(2) },
    'Bayonet': { name: 'Bayonet', price: B(8.75), quantity: B(1) }
  });

  GoogleAnalyticsStore.delivery = I.fromJS({ name: 'UPS Extra', amount: B(4.50) });

  GoogleAnalyticsStore.order = I.fromJS({
    totals: { price: B(77.31), order: B(81.81) },
    delivery: 'UPS Extra',
    errors: [],
    adjustments: [{ label: 'UPS Extra', amount: B(4.50) }]
  });

  it('adds basket and purchase action on completion', function() {
    GoogleAnalyticsStore.onSetTrackingId({ id: 'UA-62379004-1' });
    GoogleAnalyticsStore.onCompleted({ number: 'FHRUDH458DU' });
    var expected = [
      ['create', 'UA-62379004-1', 'auto'],
      ['require', 'ec'],
      ['ec:addProduct', {
        'name': 'Laser Sight',
        'price': '34.28',
        'quantity': '2'
      }],
      ['ec:addProduct', {
        'name': 'Bayonet',
        'price': '8.75',
        'quantity': '1'
      }],
      ['ec:setAction', 'purchase', {
        'id': 'FHRUDH458DU',
        'revenue': '81.81',
        'shipping': '4.5'
      }],
      ['send', 'pageview' ]
    ]
    assert.deepEqual(GoogleAnalyticsStore.ga.args, expected);
  });
});
