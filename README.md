pctDate
=========

[![Build Status](https://travis-ci.org/percona/pctDate.svg?branch=master)](https://travis-ci.org/percona/pctDate)
[![Bower version](https://badge.fury.io/bo/pct-date.svg)](http://badge.fury.io/bo/pct-date)
[![Coverage Status](https://img.shields.io/coveralls/percona/pctDate.svg)](https://coveralls.io/r/percona/pctDate)


Date utilities Angular.js Module for PCT!

## Goals

- Provide several common Date operation
- Encourage Native API's use
- Encourage easy migration from third party libs to Native API's (for example the timezone section)
- Provide Multi Timezone support while [browser's Native API get there](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
- Encourage best practices
- Integrate easily 

## Installation

Download it with bower:

```sh
bower install --save pct-date
```


Include it in your site
```html
<!-- dependencies -->
<script src="angular.js"></script>
<script src="moment.js"></script>
<script src="moment-timezone.js"></script>



<!-- main include -->
<script src="pctDate.js"></script>
```




Include it in your Angular app
```javascript
angular.module('myApp', ['pctDate']);
```

**Note:** pctDate depends on [pctMoment](https://github.com/percona/pctMoment). 
Check it out for more information about what versions of Moment.js are supported
and additional docs.
 

# API and Guide

## [isDate](src/isDate.service.js)

Evaluate is a given input is a Valid JS Date object

```javascript
function controller(isDate) {

    isDate(new Date()); //=> true

    isDate('not a date'); //=> false

    isDate(new Date('not a date')); //=> false
}
```  
    

## [toUnixTs](src/toUnixTs.service.js)

Converts a Js Date object to Unix Time Stamp 
(**seconds** since Unix Epoch)
 


```javascript
function controller(toUnixTs) {
    var date = new Date();

    toUnixTs(date); //=> Unix time stamp (in seconds)
}
```  


## [pctTimezoneSelector](src/timezoneSelector/timezoneSelector.directive.js) directive!


Reusable component to select timezones.

It uses [jsTz](https://bitbucket.org/pellepim/jstimezonedetect) lib to 
attempt to auto detect user's timezone.


Check out the [inline docs](src/timezoneSelector/timezoneSelector.directive.js) (it's easier to keep up to date this way)

See it running in [example.html](example.html)





## [Js Timezone Detect](src/utils/jsTzDetect) wrapper

[jsTz](https://bitbucket.org/pellepim/jstimezonedetect) lib Angular.js wrapper.

**Important:**  you don't need to include JsTz lib files, **pctDate** already comes
with JsTz files.


```javascript
function controller(jsTzDetect) {
    //jsTzDetect is an alias for window.jstz
    jsTzDetect.determine().name(); // => "Your/Timezone"
}
```


##  [Time Zone Id manipulation module](src/utils/tzId)

This module is private for now, you can use it just by including `pctDate` in your
angular app.

For documentation check it's inline docs.


# Contribute

This project uses Gulp, Karma and JSCS (stylechecker).
Use them and contribute!

# Licence

MIT (see LICENCE file)
