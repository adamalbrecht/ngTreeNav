# ngTreeNav

ngTreeNav is a very simple [Angular.js](http://angularjs.org/) directive that provides vertical tree-structured nav menu directive.

![ngTreeNav Screenshot](https://raw.github.com/adamalbrecht/ngTreeNav/master/screenshot.png)

## Download

* [Version 0.1.0](https://github.com/adamalbrecht/ngTreeNav/archive/0.1.0.zip)

You can also install the package using [Bower](http://bower.io).

```sh
bower install ngTreeNav
```

Or add it to your bower.json file:

```javascript
dependencies: {
  "ngTreeNav": "~0.1.0"
}
```

## The Basics
To use the library, add the JS file and CSS file, and then include the module in your app:

```javascript
app = angular.module("myApp", ["ngTreeNav"])
```

Then you should structure the directive like so:

```html
<tree-nav>
  <tree-nav-item href="#/dashbaord" title="Dashboard"></tree-nav-item>
  <tree-nav-group title="Profile">
    <tree-nav-item href="#/basic-info" title="Basic Info"></tree-nav-item>
    <tree-nav-item href="#/contact-addresses" title="Contact Addresses"></tree-nav-item>
  </tree-nav-group>
</tree-nav>
```

## Inline Options

Coming soon...


## Configuration Options

Coming soon...

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

To get the project running, you'll need [NPM](https://npmjs.org/) and [Bower](http://bower.io/). Run `npm install` and `bower install` to install all dependencies. Then run `grunt` in the project directory to watch and compile changes. And you can run `karma start` to watch for changes and auto-execute unit tests.


