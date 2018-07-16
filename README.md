# Veams Media Query Handler Plugin (`@veams/plugin-media-query-handler`)

The Media Query Handler Plugin provides to you the possibility to get the current media query name from your css.

TypeScript is supported. 

## Installation

### NPM

``` bash 
npm install @veams/plugin-media-query-handler --save
```

### Yarn 

``` bash 
yarn add @veams/plugin-media-query-handler
```

## Requirements

It makes sense to have the Veams Vent Plugin in place in order to work with that plugin. 
Otherwise you can not subscribe to a change of the media query handler and need to add this functionality manually.

Take a look at [@veams/plugin-vent](https://github.com/Veams/plugin-vent).

## Usage

``` js
import Veams from '@veams/core';
import VeamsMediaQueryHandler from '@veams/plugin-media-query-handler';

// Intialize core of Veams
Veams.onInitialize(() => {
   	// Add plugins to the Veams system
	Veams.use(VeamsMediaQueryHandler, {
        delay: 200
    });
});
```

### Options

You can pass a second parameter with an options object. Available options are: 

- `mediaQueryProp` {String} ['font-family'] - Define a media query property which you have added to the head element.
- `delay` {Number} [300] - Define the delay value for the throttle handling which is responsible to trigger an event and set the `currentMedia` value.

### SCSS

If you want to use the media query support then you can choose from 3 different approaches: 

#### 1. Add the following lines to a custom scss file and modify it like you want:

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

#### 2. Automate it like that: 

``` scss
head {

	@if ($min-width) {
		font-family: unquote(nth(nth($breakpoints, 1), 1));
	} @else {
		font-family: unquote(nth(nth($breakpoints, length($breakpoints)), 1));
	}

	@each $breakpoint in $breakpoints {
		$name: nth($breakpoint, 1);
		$size: nth($breakpoint, 2);

		@include bp($size) {
			font-family: unquote($name);
		}
	}
}
```

_Be sure you have the `Veams Core` imported for `variables`, `maps` and `includes`._ 

#### 3. Import the file from that library:

``` scss
@import "~@veams/plugin-media-query-handler/scss/media-query-handler";
```


### Api 

With that in place you can access the current media query breakpoint in your JavaScipt: 

``` js
console.log(Veams.currentMedia);
```
