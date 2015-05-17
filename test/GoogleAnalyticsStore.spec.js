var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('seamless-immutable');
var B = require('big.js');
var s = require('../src/GoogleAnalyticsStore');

describe('GoogleAnalyticsStore', function() {
  before(function() {
    s.ga = sinon.spy();
    s.delivery = I({ name: 'UPS Extra', amount: 4.50 });
    s.basket = I({
      'Laser Sight': { name: 'Laser Sight', price: 34.28, quantity: 2 },
      'Bayonet': { name: 'Bayonet', price: 8.75, quantity: 1 }
    });
    s.order = I({
      totals: { price: 77.31, order: 81.81 },
      delivery: 'UPS Extra',
      errors: [],
      adjustments: [{ label: 'UPS Extra', amount: 4.50 }]
    });
  });

  it('adds basket and purchase action on completion', function() {
    s.onSetTrackingId({ id: 'UA-62379004-1' });
    s.onCompleted({ number: 'FHRUDH458DU' });
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
    assert.deepEqual(s.ga.args, expected);
  });
});
