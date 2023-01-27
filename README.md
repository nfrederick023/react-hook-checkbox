# React Hook Checkbox

### Features

- [TypeScript Support](./index.d.ts ).
- [Small size (<2kb minifed)](https://bundlephobia.com/package/react-hook-checkbox@latest) and [Zero Dependencies](./package.json).
- Select All, Indeterminate, Custom Properties, and Checkbox Nesting.
- Built-in API for State Maniputlation
- Minimal Configuration. 

[![](https://img.shields.io/npm/dt/react-hook-checkbox.svg)](https://www.npmjs.com/package/react-hook-checkbox)
[![](https://img.shields.io/librariesio/dependents/npm/react-hook-checkbox)](https://libraries.io/npm/react-hook-checkbox)
[![](https://img.shields.io/npm/l/react-hook-checkbox)](https://github.com/nfrederick023/react-hook-checkbox/blob/main/LICENSE)
[![](https://img.shields.io/bundlephobia/min/react-hook-checkbox)](https://bundlephobia.com/package/react-hook-checkbox@latest)



## Table of Contents

[Quickstart](#quickstart) | 
[Demo](https://nfrederick023.github.io/react-hook-checkbox/) |
[API](#api) | 
[Examples](#examples) | 
[TypeScript](#typescript) | 
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
### TypeScript
### Contributors
### FAQ
