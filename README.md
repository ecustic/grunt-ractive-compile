# grunt-ractive-compile

> A grunt plugin for parsing and compiling [ractive](ractivejs.org) templates.

## Description
This plugin takes any number of [ractive](ractivejs.org) templates, runs them through the ractive parser and compiles then into a JSON-object where each parsed template is available as a property. See the examples below to see it in action.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-ractive-compile --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-ractive-compile');
```

## The "ractive_compile" task

### Overview
In your project's Gruntfile, add a section named `ractive_compile` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  ractive_compile: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.name
Type: `String`
Default value: `'templates'`

The name of the object which will contain the templates.

#### options.basePath
Type: `String`
Default value: `null`

If this string is defined it is removed from the beginning of every file path in the generated template object.

#### options.property.parent
Type: `String`
Default value: `null`

If this string is defined the generated templates object will be instantiated as a property like so: `[options.property.parent].[options.name] = ...`.

### Usage Examples

#### Compiling all files in a `templates` folder
Given the following folder structure:
```
templates
- foo
  - foo.html
- bar
  - bar.html
Gruntfile.js
```

Where the files `foo.html` and `bar.html` are respectively:

```
<p>{{foo}}</p>
```
and
```
<p>{{bar}}</p>
```

And our `Gruntfile.js` contains:
```
ractive_compile: {
  templates: {
    'templates.js': 'templates/**/*.html'
  }
},
```

Running `grunt` would give us the following output in a file `templates.js`:
```
var templates = {
    "templates/bar/bar.html":{"v":3,"t":[{"t":7,"e":"p","f":[{"t":2,"r":"bar"}]}]},
    "templates/foo/foo.html":{"v":3,"t":[{"t":7,"e":"p","f":[{"t":2,"r":"foo"}]}]}
};
```
#### Changing the name of the output variable
Adding `option.name` to the `Gruntfile.js` changes the name of the variable which is generated:
```
ractive_compile: {
  options: {
    name: 'myTemplates'
  },
  templates: {
    'templates.js': 'templates/**/*.html'
  }
},
```
The above `Gruntfile.js` would generate:

```
var myTemplates = {
    ...
};
```

#### Outputting templates-object as a property
Adding `option.property.parent` to the `Gruntfile.js` makes the template-object a property on an existing object:

```
ractive_compile: {
  options: {
    name: 'myTemplates',
    property: {
      parent: 'myApp'
    }
  },
  templates: {
    'templates.js': 'templates/**/*.html'
  }
},
```

The above `Gruntfile.js` would generate:

```
myApp.myTemplates = {
    ...
};
```
