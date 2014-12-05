pctDate
=========

[![Build Status](https://travis-ci.org/percona/pctDate.svg?branch=master)](https://travis-ci.org/percona/pctDate)
[![Bower version](https://badge.fury.io/bo/pct-date.svg)](http://badge.fury.io/bo/pct-date)
[![Coverage Status](https://img.shields.io/coveralls/percona/pctDate.svg)](https://coveralls.io/r/percona/pctDate)


Date utilities Angular.js Module for PCT!

The goals of this module are:
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
 ```html
<script src="pctDate.js"></script>
```


## How to use it

For now we only expose two function helpers:

- [isDate](src/isDate.service.js): evaluate is a given input is a Valid JS Date object
- [toUnixTs](src/toUnixTs.service.js): converts a Js Date object to Unix Time Stamp

## Contribute

This project uses Gulp, Karma and JSCS (stylechecker).
Use them and contribute!

## Licence

MIT (see LICENCE file)
