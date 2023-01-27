# React Hook Checkbox

[Get Started](#quickstart) | 
[Demo](https://nfrederick023.github.io/react-hook-checkbox/) |
[API](#api) | 
[Examples](#examples) | 
[TypeScript](#typescript) | 
[Contributors](#contributors) | 
[FAQ](#faq) 

### Features

- [TypeScript Support](./package.json).
- [Small size <2kb](https://bundlephobia.com/package/react-hook-checkbox@latest) and [Zero Dependencies](./index.d.ts)
- Complete API for: Select All, Indeterminate, Custom Properties, and Checkbox Nesting.
- All-in-one Minimal Configuration. 

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
