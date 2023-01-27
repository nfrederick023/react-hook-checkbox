import './App.css';

import { Checkbox, CheckboxConfig, useCheckbox } from 'react-hook-checkbox';

import { CheckboxItem } from './Checkbox';
import React from 'react';

const config: CheckboxConfig<TodoProperties> = {
  name: 'Complete All',
  options: [{
    name: 'Shopping',
    options: [{
      name: 'Milk',
      isSelected: true,
    }, {
      name: 'Eggs',
      isSelected: true,
    }, {
      name: 'Pizza',
      properties: { notes: 'Pepperoni' }
    }]
  }, {
    name: 'Chores',
    options: [{
      name: 'Sweep Kitchen'
    }, {
      name: 'Vacuum Living Room'
    }]
  }, {
    name: 'Homework',
    options: [{
      name: 'History',
      properties: { notes: 'Due by 10pm' }
    }, {
      name: 'Math',
      isSelected: true
    }, {
      name: 'English',
      options: [{
        name: 'Write Essay',
        properties: { notes: 'Due by 9pm' }
      }, {
        name: 'Read 10 Pages'
      }]
    }]
  }]
};

export interface TodoProperties {
  notes: string
}

function App() {
  const [todo] = useCheckbox(config);

  const recursivelyGetList = (chckbx: Checkbox<TodoProperties>) => {
    return (
      <div style={{ margin: '10px' }}>
        {chckbx.options.map((option, index) => {
          return (
            <div key={index} style={{ marginLeft: '15px' }}>
              <CheckboxItem chckbx={option} />
              {todo.options.length ?
                recursivelyGetList(option)
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
    <div style={{ 'marginLeft': '40px', 'marginTop': '40px' }}>
      <h1>React Hook Checkbox</h1>
      <CheckboxItem chckbx={todo} />
      {recursivelyGetList(todo)}
      <br />
      <a href="https://github.com/nfrederick023/react-hook-checkbox/tree/main/example" style={{ "color": "white" }}>Source Code</a>
    </div >
  );
}

export default App;
