# Mock20

[![Build Status](https://travis-ci.org/kyleady/Mock20.svg?branch=master)](https://travis-ci.org/kyleady/Mock20) [![Coverage Status](https://coveralls.io/repos/github/kyleady/Mock20/badge.svg?branch=master)](https://coveralls.io/github/kyleady/Mock20?branch=master) [![dependencies Status](https://david-dm.org/kyleady/Mock20/status.png)](https://david-dm.org/kyleady/Mock20)


A [node.js](https://nodejs.org/en/) module that mocks the [Roll20](https://roll20.net/) API environment.

For an exmple Roll20 project that uses Mock20, see [Example Mock20 Testing](https://github.com/kyleady/Example-Mock20-Testing).

## Installation

1) Get [node and npm](https://www.npmjs.com/get-npm).

2) Turn your scripts into a [node module](https://docs.npmjs.com/getting-started/creating-node-modules).

3) Add mock20 as a dependency.

    `npm install mock20`

4) Require mock20 and signal the end of your scripts.

    ```
    require('mock20');
     
    //your script here
    
    MOCK20endOfLastScript(); //triggers all of your on('ready') functions
    ```
## Mocking

Mock20 mocks all of the functions listed in the Roll20 API wiki.

See the [wiki](https://github.com/kyleady/Mock20/wiki) for more information.

* [API:Objects](https://github.com/kyleady/Mock20/wiki/API_Objects)
* [API:Events](https://github.com/kyleady/Mock20/wiki/API_Events)
* [API:Chat](https://github.com/kyleady/Mock20/wiki/API_Chat)
  * **WARNING**: The current version of Mock20 does not parse rolls like `'/r D20'`
  * **WARNING**: The current version of Mock20 does not parse inlines like  `'Rolls a [[D20]]'`
* [API:Utility](https://github.com/kyleady/Mock20/wiki/API_Utility)

## Simulating

Mock20 can simulate circumstances you may want to test.

See the [wiki](https://github.com/kyleady/Mock20/wiki) for more information.

```
var player = createObj('player', {_displayname: 'test player'}, {MOCK20override: true});
var gm = createObj('player', {_displayname: 'test gm'}, {MOCK20override: true});
gm.MOCK20gm = true;

player.MOCK20chat('!gmOnlyCMD');
gm.MOCK20chat('!gmOnlyCMD');
```

## Issues

If you have any issues with Mock20 please report them through github's [issues](https://github.com/kyleady/Mock20/issues).

## Contributing

If you would like to contribute to the project, open up a fork and work away.
