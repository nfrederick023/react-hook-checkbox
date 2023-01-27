# React Hook Checkbox

### Table of Contents

[Get Started](#quickstart) | 
[Demo](#demo) | 
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
    options: [{
        name: 'Box Option',
    }, {
        name: 'Box Option',
    }, {
        name: 'Box Option',
    }]
};

const MyPage = () => {

    const [checkbox] = useCheckbox(config);

    return (
        <>
            <label>
                <input
                    type="checkbox"
                    checked={checkbox.isSelected}
                    onChange={() => checkbox.select()}
                />
                Select All
            </label>
            {checkbox.options.map((option, index) => {
                return (
                    <div key={index}>
                        <label style={{ marginLeft: '15px' }}>
                            <input
                                type="checkbox"
                                checked={option.isSelected}
                                onChange={() => option.select()}
                            />
                            {option.name}
                        </label>
                        <br />
                    </div>
                );
            })}
        </>
    );
};

export default MyPage;
```
### Demo
### API
### Examples
### TypeScript
### Contributors
### FAQ
