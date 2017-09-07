# VeamsMediaQueryHandler plugin

The VeamsMediaQueryHandler plugin provides to you a possibility to get the current media query name from your css.

If you want to use the media query support then just add the following lines to a custom scss file and modify it like you want:

``` scss
head {
	font-family: desktop;

	@include bp(1024px) {
		font-family: tablet-l;
	}

	@include bp(768px) {
		font-family: tablet-p;
	}

	@include bp(657px) {
		font-family: mobile-l;
	}

	@include bp(480px) {
		font-family: mobile-p;
	}

	@include bp(360px) {
		font-family: mobile-s;
	}
}
```

Then you only need to import and use the plugin from the Veams package: 

```js
import Veams from 'veams';
import VeamsModules from 'veams/lib/plugins/modules';

// Intialize core of Veams
Veams.initialize();

// Add plugins to the Veams system
Veams.use(VeamsMediaQueryHandler, {
    delay: 200
});
```

_Options:_

You can pass a second parameter with an options object. Available options are: 

- `mediaQueryProp` {String} ['font-family'] - Define a media query property which you have added to the head element.
- `delay` {Number} [300] - Define the delay value for the throttle handling which is responsible to trigger an event and set the `currentMedia` value.