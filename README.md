# React Hook Checkbox

An easy to use, all-in-one, minimal setup, React hook for checkboxes

[![npm](https://img.shields.io/npm/dt/react-hook-checkbox.svg)](https://www.npmjs.com/package/react-hook-checkbox)
[![npm](https://img.shields.io/npm/l/react-hook-checkbox)](https://github.com/nfrederick023/react-hook-checkbox/blob/main/LICENSE)
[![bundlephobia](https://img.shields.io/bundlephobia/min/react-hook-checkbox)](https://bundlephobia.com/package/react-hook-checkbox@latest)
[![standard](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![scrutinizer](https://img.shields.io/scrutinizer/quality/g/nfrederick023/react-hook-checkbox/main)](https://standardjs.com)
[![codecov](https://img.shields.io/codecov/c/github/nfrederick023/react-hook-checkbox)](https://app.codecov.io/github/nfrederick023/react-hook-checkbox/)

### Features

- [TypeScript Support](./index.d.ts ).
- [Small Size (<2kb minifed)](https://bundlephobia.com/package/react-hook-checkbox@latest) and [Zero Dependencies](./package.json).
- Select All, Indeterminate, Custom Properties, and Checkbox Nesting.
- Built-in API for State Manipulation
- Minimal Configuration and Integration necassary. 

## Table of Contents

[Quickstart](#quickstart) | 
[Demo](https://nfrederick023.github.io/react-hook-checkbox/) |
[Usage](#api) |
[API](#api) | 
[FAQ](#faq) 

### Install

    npm install react-hook-checkbox

### Quickstart

```jsx
import * as React from 'react';

import { useCheckbox } from 'react-hook-checkbox';

const config = {
  name: 'List',
  options: [{
    name: 'Option 1',
  }, {
    name: 'Option 2',
  }, {
    name: 'Option 3',
  }]
};

const MyPage = () => {

  const [list] = useCheckbox(config);

  return (
    <>
      {list.options.map((option, index) => {
        return (
          <label key={index} style={{ marginLeft: '15px' }}>
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
Checkboxes are built with a user-provided configuration object hereinafter referred to as  `checkboxConfig`. The `checkboxConfig` accepts the following parameters: 

- `name` - name of the checkbox. Accepts a `string`. Defaults to `''`.
- `options` - any nested checkboxes. Accepts a `checkboxConfig[]`. Defaults to `[]`
- `properties` - properites the user provides. Accepts an `any`. Defaults to `undefined`.
- `isSelected` - if checkbox is selected. Accepts a `boolean`. Defaults to `false`,

### `const [myList, setMyList] = useCheckbox(checkboxConfig)`
Creates all the checkboxes from the provided `checkboxConfig`. Returns the hook. 

All checkboxes (`myList`, and all it's options) share the same properties/functions as described below:

### Properties:

- `.name` - name of the checkbox
- `.options` - arrary of any nested checkboxes. `[]` if there's no nested checkboxes.
- `.properties` - the custom properties provided by the user. 
- `.isSelected` - `true` or `false` if the checkbox selected. 
- `.ref` - refrence to the parent checkbox. `undefined` if there's no parent.

Note: Follow [React's rule's of Hooks](https://reactjs.org/docs/hooks-rules.html) when working with `.properties`.

### Functions:

### `.setCheckbox(config)`
Accepts a `checkboxConfig`. Returns void.  
Replaces the checkbox with a new checkbox generated from `checkboxConfig`. 

### `.setOptions(options)`
Accepts a `checkboxConfig[]`.  
Sets the checkbox's `.options` to a checkbox array created from the `checkboxConfig[]`.    

### `.addOption(option)`
Accepts a `checkboxConfig`.   
Creates a new checkbox from the `checkboxConfig` and pushes it to `.options`.

### `.setIsSelected(isSelected)`
Accepts a `boolean`.  
Sets the checkbox's `.isSelected` to the `isSelected`.

### `.setProperties(properties)`
Accepts an `any`.  
Sets the checkbox's `.properties` to the `properties`.  

### `.setName(name)`
Accepts a `string`.   
Sets the checkbox's `.properties` to the `properties`.

### `.getSelectedOptions()`
Returns an array of checkboxes.   
Array contains all of the selected checkboxes in `.options`.

### `.isIndeterminate()`
Returns a `boolean`.  
`true` if the checkbox is indeterminate. 

### `.isAllSelected()`
Returns a `boolean`.  
`true` if all of the checkboxes in `.options` are selected.

### `.isAnySelected(): boolean;`
Returns a `boolean`.  
`true` if any of the checkboxes in `.options` are selected.

### `.removeOption()`
Removes the checkbox, and all of it's nested checkboxes, from the hook. 

### `.select()`
Selects the checkbox. Flipping `.isSelected` to the opposite of it's current value. 

# Usage
Work in progress.

# FAQ

## Q: I found a bug, have a suggestion, and/or need help!?

Please raise an issue on the [Github repository](https://github.com/nfrederick023/react-hook-checkbox/issues). 

## Q: Are you looking for contributors? 

Yes! If you'd like to contribute to the project, [please make a pull request](https://github.com/nfrederick023/react-hook-checkbox/pulls). 

## Q: How can I say thanks?

Feel free to send me an email: nfrederick023@gmail.com  
