# Pipeline.sjs

<img src="http://media0.giphy.com/media/rI6cEnQqGILIs/giphy.gif" alt="Pipeline" align="right" />

[![Master branch build status][ico-build]][travis]
[![Published version][ico-package]][package]
[![MIT Licensed][ico-license]][license]

This library provides pipelining syntax to achieve naturally expressive functional composition with a little help from
[Sweet.js][sweetjs].
It can be installed in whichever way you prefer, but I recommend [NPM][package].

The motivation was to make reading functional composition more natural by writing left to right rather than inside out.
My original choice of operator was `|>` to match a similar operator in [Elixir][elixir], but due to some limitations of
[Sweet.js][sweetjs] this wasn't possible. The examples below show usage with the default `>>` operator.

### Usage examples
```js
var foo = function(){},
    bar = function(){},
    baz = function(){};

// Basic composition
123 >> foo; // Compiles to foo(123);

// Functional composition
foo >> bar; // Compiles to bar(foo);

// Chained composition
123 >> foo >> bar; // Compiles to bar(foo(123));

// Multi-line composition
123
>> foo
>> bar
>> baz; // Compiles to baz(bar(foo(123)));

// Partially applied composition
foo >> bar >> baz(123); // Compiles to baz(123, bar(foo));

// Partially applied with many arguments
foo >> bar(1, 2, 3) >> baz; // Compiles to baz(bar(1, 2, 3, foo));

// Partially applied with backreference
foo >> bar >> baz(&, 123); // Compiles to baz(bar(foo), 123);
```

### Transpiling
Whenever you use this or any other [Sweet.js][sweetjs] macro, you need to run it through `sjs`.
```bash
$ npm install pipeline.sjs sweet.js
$ node_modules/.bin/sjs -m pipeline.sjs/macro mysweetfile.sjs
```

### Custom operators
You can change the operators used in this macro by running the build script with your own choice.
```bash
$ MACRO_OP='>>' MACRO_REF='&' npm run build
```

### Contributing
I accept contributions to the source via Pull Request, but passing unit tests
must be included before it will be considered for merge.
```bash
$ npm run build
$ npm test
```

If you have [Vagrant][vagrant] installed, you can build the dev environment to assist development.
The repository will be mounted in `/srv`.
```bash
$ curl -O https://raw.github.com/adlawson/vagrantfiles/master/nodejs/Vagrantfile
$ vagrant up
$ vagrant ssh

Welcome to Ubuntu 12.04 LTS (GNU/Linux 3.2.0-23-generic x86_64)
$ cd /srv
```

### License ###
The content of this library is released under the **MIT License** by **Andrew Lawson**.<br/>
You can find a copy of this license in [`LICENSE`][license] or at http://www.opensource.org/licenses/mit.

<!-- Links -->
[travis]: https://travis-ci.org/adlawson/sweetjs-pipeline
[package]: https://npmjs.org/package/pipeline.sjs
[ico-license]: http://img.shields.io/npm/l/pipeline.sjs.svg?style=flat
[ico-package]: http://img.shields.io/npm/v/pipeline.sjs.svg?style=flat
[ico-build]: http://img.shields.io/travis/adlawson/sweetjs-pipeline/master.svg?style=flat
[vagrant]: http://vagrantup.com
[license]: LICENSE
[sweetjs]: http://sweetjs.org
[elixir]: http://elixir-lang.org
