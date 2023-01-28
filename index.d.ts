import { Dispatch, SetStateAction } from "react";

export declare function useCheckbox<T = undefined>(checkBoxConfig: CheckboxConfig<T>): [Checkbox<T>, Dispatch<SetStateAction<Checkbox<T>>>];

export interface Checkbox<T = undefined> {
    readonly options: Checkbox<T>[];
    readonly isSelected: boolean;
    readonly properties: T;
    readonly name: string;
    readonly ref: Checkbox<T> | undefined;
    setOptions(options: CheckboxConfig<T>[]): void;
    setCheckbox(config: CheckboxConfig<T>): void;
    addOption(option: CheckboxConfig<T>): void;
    setIsSelected(isSelected: boolean): void;
    setProperties(properties: T): void;
    setName(name: string): void;
    getSelectedOptions(): Checkbox<T>[];
    isIndeterminate(): boolean;
    isAllSelected(): boolean;
    isAnySelected(): boolean;
    removeOption(): void;
    select(): void;
}

export interface CheckboxConfig<T = undefined> {
    name?: string;
    isSelected?: boolean;
    properties?: T;
    options?: CheckboxConfig<T>[];
}
