pctDate [![Bower Version](https://img.shields.io/bower/v/pct-date.svg)](http://shields.io/)
=========

[![Build Status](https://travis-ci.org/percona/pctDate.svg?branch=master)](https://travis-ci.org/percona/pctDate)
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
<script src="pctMoment.js"></script>


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
Check out the [inline docs](src/timezoneSelector/timezoneSelector.directive.js) (it's easier to keep up to date this way)


It uses [jsTz](https://bitbucket.org/pellepim/jstimezonedetect) lib to 
attempt to auto detect user's timezone.



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

## [pctDateFilter](src/utils/pctDateFiler)

Check the [inline docs](src/utils/pctDateFilter/pctDate.filter.js)


## [pctDateFromFilter](src/utils/pctDateFromFiler)

Check the [inline docs](src/utils/pctDateFromFilter/pctDateFrom.filter.js)

## [fancyDateRange](src/utils/fancyDateRange)

Check the [inline docs](src/utils/fancyDateRange/fancyDateRange.service.js)

##  [Time Zone Id manipulation module](src/utils/tzId)

This module is private for now, you can use it just by including `pctDate` in your
angular app.

For documentation check it's inline docs.

# Tests

```sh
# Run unit tests
# This is the default travis task
npm test

# Protractor tests
npm run e2e-server
npm run e2e
# Please note that this will spawn 2 processes
# in the background, and for now the only way of
# killing them is by manually sending the Kill signal
```
Note: only unit tests run in Travis.ci for now.

# Contribute

This project uses Gulp, Karma and JSCS (stylechecker).
Use them and contribute!

# Licence

MIT (see LICENCE file)
