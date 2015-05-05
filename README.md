# Jekyll-Store/Google-Analytics

[![Build Status](https://travis-ci.org/jekyll-store/google-analytics.svg?branch=master)](https://travis-ci.org/jekyll-store/google-analytics)

Google analytics plugin for [Jekyll-Store Engine](https://github.com/jekyll-store/engine).

## Usage

Requires that the google analytics javascript file to be loaded:

```html
<script async src="//www.google-analytics.com/analytics.js"></script>
```

## Actions

### setTrackingId

Set's Google Analytics tracking ID.

Example:

```javascript
JekyllStoreEngine.Actions.setTrackingId({ id: 'UA-62379004-1' });
```

### pageLoaded

Declare the page loaded.

Example:

```javascript
JekyllStoreEngine.Actions.pageLoaded();
```

### checkoutStep

Declare the page a checkout step.

Example:

```javascript
JekyllStoreEngine.Actions.checkoutStep({ step: 2 });
```

## Contributing

1. [Fork it](https://github.com/jekyll-store/google-analytics/fork)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
