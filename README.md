# React Hook Checkbox

An easy to use, all-in-one, minimal setup, React Hook for checkboxes.

[![npm](https://img.shields.io/npm/dt/react-hook-checkbox.svg)](https://www.npmjs.com/package/react-hook-checkbox)
[![npm](https://img.shields.io/npm/l/react-hook-checkbox)](https://github.com/nfrederick023/react-hook-checkbox/blob/main/LICENSE)
[![bundlephobia](https://img.shields.io/bundlephobia/min/react-hook-checkbox)](https://bundlephobia.com/package/react-hook-checkbox@latest)
[![standard](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![scrutinizer](https://img.shields.io/scrutinizer/quality/g/nfrederick023/react-hook-checkbox/main)](https://standardjs.com)
[![codecov](https://img.shields.io/codecov/c/github/nfrederick023/react-hook-checkbox)](https://app.codecov.io/github/nfrederick023/react-hook-checkbox/)

### Features

- [TypeScript Support](./index.d.ts ) complete with JSDocs.
- [Small Size (<2kb minifed)](https://bundlephobia.com/package/react-hook-checkbox@latest) and [Zero Dependencies](./package.json).
- Select All, Indeterminate, Custom Properties, and Checkbox Nesting.
- Built-in API for State Manipulation.
- Minimal Configuration and Integration necassary. 

[Demo](https://nfrederick023.github.io/react-hook-checkbox/)

## Table of Contents

[Quickstart](#quickstart) | 
[API](#api) | 
[Usage](#usage) |
[FAQ](#faq) 

### Install

    npm install react-hook-checkbox

### Quickstart

```jsx
import * as React from "react";

import { useCheckbox } from "react-hook-checkbox";

const config = {
  name: "Shopping List",
  options: [{
    name: "Eggs",
  }, {
    name: "Milk",
  }, {
    name: "Cheese",
  }]
};

const MyPage = () => {

  const [myCheckbox] = useCheckbox(config);

  return (
    <>
      {myCheckbox.options.map((option, index) => {
        return (
          <label key={index} style={{ marginLeft: "15px" }}>
            <input
              type="checkbox"
              checked={option.isSelected}
              onChange={() => option.select()}
            />
            {option.name}
          </label>
        );
      })}
    </>
  );
};

export default MyPage;
```
# API

### `const checkboxConfig = {...}`
Checkboxes are built with a user-provided configuration object hereinafter referred to as `checkboxConfig`. The `checkboxConfig` accepts the following parameters: 

- `name` - the name of the checkbox. Defaults to `""`.
- `options` - any child checkboxes. Defaults to `[]`.
- `properties` - properties provided to the checkbox. Defaults to `undefined`,
- `isSelected` - true/false if the checkbox is selected. Defaults to `false`.

\* all of these paramers are optional

### `const [myList, setMyList] = useCheckbox(checkboxConfig)`
Creates the checkboxes from the provided `checkboxConfig`. Returns a React hook. 

All checkboxes (`myList` and its options) share the same properties/functions as described below:

### Properties:

- `.name` - name of the checkbox
- `.options` - arrary of any child checkboxes. `[]` if there are none.
- `.properties` - properties provided to the checkbox.
- `.isSelected` - `true`/`false` if checkbox is selected.
- `.ref` - refrence to the parent checkbox. `undefined` if there's no parent.

Note: Remember to follow [React's rule's of Hooks](https://reactjs.org/docs/hooks-rules.html) when working with `.properties`.

### Functions:

### `.setCheckbox(config)`
Resets and creates a new checkbox on from the provided configuration.  
Accepts a `checkboxConfig`.

### `.setOptions(options)`
Resets the `.options` to a new set of options from the provided configuration.    
Accepts a `checkboxConfig[]`.  

### `.addOption(option)`
Adds a child checkbox to `.options` from the provided configuration.   
Accepts a `checkboxConfig`.   

### `.setIsSelected(isSelected)`
Sets the `.isSelected` of the checkbox.   
Accepts a `boolean`.  

### `.setProperties(properties)`
Sets the `.properties` of the checkbox.   
Accepts an `any`.  

### `.setName(name)`
Sets the `.name` of the checkbox.   
Accepts a `string`.   

### `.getSelectedOptions()`
Returns an array of all child checkboxes in which `.isSelected` is `true`.

### `.isIndeterminate()`
Returns `true`/`false` if the checkbox is indeterminate.

### `.isAllSelected()`
Returns `true`/false if `.isSelected` of all child checkboxes is true.

### `.isAnySelected()`
Returns `true`/`false` if `.isSelected` of any child checkbox is true. 

### `.removeOption()`
Removes a checkbox from the parent checkbox's `.options`.

### `.select()`
Selects a single checkbox, inverting the current `.isSelected`.

# Usage

Setting the initial state:

```jsx
const config = {
  name: 'List',
  isSelected: false,
  properties: { myProperties: "hello world!"},
  options: [{
    name: 'Option 1',
    isSelected: true,
    properties: { myProperties: "fizz!"}
  }, {
    name: 'Option 2',
    isSelected: false,
    properties: { myProperties: "buzz!"}
  }, {
    name: 'Option 3',
    isSelected: true,
    properties: { myProperties: "fizzbuzz!"}
  }]
};

const MyPage = () => {

  const [myCheckbox] = useCheckbox(config);

  return (
    <>
      <p>Will say "FizzBuzz":</p>
      {myCheckbox.options[2].properties.myProperties}
    </>
  );
};
```
Utilizing default values:
```jsx
const MyPage = () => {

  // since all paramters are options `{}` is valid use of `useCheckbox()`
  const [myCheckbox] = useCheckbox({});

  return (
    <>
      <p> name is "" by default </p>
      {myCheckbox.name}

      <p> isSelected is false by default </p>
      {myCheckbox.isSelected ? "true" : "false"}
    </>
  );
};
```
Setting name, options, properties and adding/removing options:
```jsx
const MyPage = () => {

  const [myCheckbox] = useCheckbox(config);

  const option = {
    name: "new option"
  }

  const options = [{
    name: "new option 1"
  }, {
    name: "new option 2"
  }]

  const newProperties = { myProperties: "new property" };

  // display new list in console on rerender
  console.log(myCheckbox);

  return (
    <>
      <button onClick={() => myCheckbox.setName("new name")}>Set Name</button>
      <button onClick={() => myCheckbox.setProperties(newProperties)}>Set Properties</button>
      <button onClick={() => myCheckbox.addOption(option)}>Add Option</button>
      <button onClick={() => myCheckbox.setOptions(options)}>Set Option</button>
      <button onClick={() => myCheckbox.options[0].removeOption()}>Remove First Option</button>
    </>
  );
};
```
Display a single set of checkboxes: 
```jsx
const MyPage = () => {

  const [myCheckbox] = useCheckbox(config);

  return (
    <>
      {myCheckbox.options.map((option, index) => {
        return (
          <label key={index} style={{ marginLeft: "15px" }}>
            <input
              type="checkbox"
              checked={option.isSelected}
              onChange={() => option.select()}
            />
            {option.name}
          </label>
        );
      })}
    </>
  );
};
```
Display all checkboxes recursively: 

```jsx
const MyPage = () => {

  const [myCheckbox] = useCheckbox(config);

  const displayCheckboxex = (checkbox) => {
    return (
      <div style={{ margin: "10px" }}>
        <input
          type="checkbox"
          checked={checkbox.isSelected}
          onChange={() => checkbox.select()}
          ref={input => {
            if (input) {
              input.indeterminate = checkbox.isIndeterminate();
            }
          }}
        />
        {checkbox.name}
        {checkbox.options.map((option, index) => {
          return (
            <div key={index} style={{ marginLeft: "15px" }}>
              {myCheckbox.options.length ?
                displayCheckboxex(option)
                :
                <></>
              }
            </div>
          );
        })}
      </div>
    )
  }

  return (
    <>
      {displayCheckboxex(myCheckbox)}
    </>
  );
};
```
Usage with TypeScript:
```jsx
type MyType = string;

const config: CheckboxConfig<MyType> = {
  properties: "fizzbuzz"
};

const MyPage = () => {

  const [myCheckbox] = useCheckbox<MyType>(config);

  return (
    <>
      {myCheckbox.properties}
    </>
  );
};

```

# FAQ

### Q: I found a bug, have a suggestion/issue, or need help!

Please raise an issue on the [Github repository](https://github.com/nfrederick023/react-hook-checkbox/issues). 

### Q: Are you looking for contributors? 

Yes! If you'd like to contribute to the project, [please raise a pull request](https://github.com/nfrederick023/react-hook-checkbox/pulls). 

### Q: How can I say thanks?

Feel free to send me an email: nfrederick023@gmail.com  
