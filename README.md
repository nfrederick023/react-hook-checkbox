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
- Minimal Configuration. 


## Table of Contents

[Quickstart](#quickstart) | 
[Demo](https://nfrederick023.github.io/react-hook-checkbox/) |
[Usage](#api) |
[API](#api) | 
[Examples](#examples) | 
[Contributors](#contributors) | 
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
### API
### Examples
### Contributors
### FAQ
