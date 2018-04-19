# [featureswitch-js](https://github.com/hal313/featureswitch-js)

[![Build Status](http://img.shields.io/travis/hal313/featureswitch-js/master.svg?style=flat-square)](https://travis-ci.org/hal313/featureswitch-js)
[![NPM version](http://img.shields.io/npm/v/featureswitch-js.svg?style=flat-square)](https://www.npmjs.com/package/featureswitch-js)
[![Dependency Status](http://img.shields.io/david/hal313/featureswitch-js.svg?style=flat-square)](https://david-dm.org/hal313/featureswitch-js)

> JavaScript implementation of a feature switch library

## Introduction
This package provides basic featur  e switch functionality for JavaScript projects. It allows for multiple feature managers to exist at the same time, each with their own set of features and context.

Features can be configured as simple features which are either enabled or disabled. Alternatively, features may be configured to be enabled or disabled a specific number of times before being locked. As well, features may contain values in addition to an enabled state. This allows for the ability to reduce the number of features which provide some value.

For example, consider a case where there are three API endpoints available:
* the 'normal' API (https://api.company.com/v1/)
* the 'beta' API (https://beta.api.company.com/v1/)
* the 'nightly' API (https://nightly.api.company.com/v1/)

With features that only support an enabled state, code to get the API endpoint would look like:
```javascript
// Get a reference to the feature manager (which has already been configured)
var featureManager = getFeatureManager();

// The 'normal' endpoint
var apiEndpoint = 'https://api.company.com/v1/';

if (featureManager.isEnabled('betaAPI')) {
    // If the 'betaAPI' feature is enabled, use the beta URL
    apiEndpoint = 'https://beta.api.company.com/v1/';
} else if (featureManager.isEnabled('nightlyAPI')) {
    // If the 'nightlyAPI' feature is enabled, use the beta URL
    apiEndpoint = 'https://nightly.api.company.com/v1/';
}

// Do things with the API
```
While the code is fully functional, it does not read easily, and the complexity has increased. Additionally, there is a logic problem: what happens if both `betaAPI` and `nightlyAPI` are enabled? Now the if/else logic becomes a consideration and abiguity has been introduced. Lastly, this code is brittle - if a new API endpoint is created (`staging`, for example), the code needs to be updated.

Now consider this code:
```javascript
// Get a reference to the feature manager (which has already been configured)
var featureManager = getFeatureManager();

// Get the API endpoint
var apiEndpoint = featureManager.getValue('apiEndpoint');
// Do things with the apiEndpoint

// Depending on the runtime configuration of the feature manager, the apiEndpoint may point to the traditional endpoint, or some new endpoint.
```
The code is easier to read and maintain. There is no ambiguity and the addition of new API endpoints requires no code change - only a configuration change with the FeatureManager.

## Installing

```sh
$ npm install featureswitch-js
```

## Usage
Please see the # [featureswitch-js-functional-example](https://github.com/hal313/featureswitch-js-functional-example) GitHub project for examples of how to consume this code.

## Running Tests

Run one, or a combination of the following commands to lint and test your code:

```sh
$ npm test              # Run unit tests with Mocha
$ npm run test:watch    # Run unit tests with Mocha, and watch files for changes
$ npm run coverage    # Run unit tests with code coverage by Istanbul
```

## License
[MIT](https://raw.githubusercontent.com/hal313/featureswitch-js/master/LICENSE)

## Table Of Contents
- [featureswitch-js](#featureswitch-js)
    - [Introduction](#introduction)
    - [Installing](#installing)
    - [Usage](#usage)
    - [Running Tests](#running-tests)
    - [License](#license)
    - [Table Of Contents](#table-of-contents)