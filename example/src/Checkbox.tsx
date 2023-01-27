import { Checkbox } from 'react-hook-checkbox';
import React from 'react';
import { TodoProperties } from './App';

export interface CheckboxProps {
    chckbx: Checkbox<TodoProperties>
}

export const CheckboxItem = (props: CheckboxProps): React.ReactElement<CheckboxProps> => {
    console.log(props)
    return (
        <label>
            <input
                type="checkbox"
                checked={props.chckbx.isSelected}
                onChange={() => props.chckbx.select()}
                ref={input => {
                    if (input) {
                        input.indeterminate = props.chckbx.isIndeterminate();
                    }
                }}
            />
            {props.chckbx.name}
            {props.chckbx.properties ?
                <span style={{ "marginLeft": "20px" }}>
                    Notes: {props.chckbx.properties.notes}
                </span>
                : <></>
            }
        </label>
    );
};
