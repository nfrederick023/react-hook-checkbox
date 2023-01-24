import { immerable } from "immer";

export function useCheckbox<P = Record<string, never>>(items: SelectUtilityBase<P>[]): [SelectUtility<P>];

export enum Action {
    Select = 0,
    SetProperties = 1,
    SetItemName = 2,
    SetSelected = 3,
    SetSectionName = 4,
    SetItems = 5,
    SelectAll = 6,
    SetSections = 7,
    CreateNewUtility = 8
}

export class SelectUtility<P> {
    [immerable]: boolean;
    public readonly sections: Section<P>[];

    constructor(sections: Section<P>[]);

    public setSections(sections: Section<P>[]): void;
    public createNewUtility(items: SelectUtilityBase<P>[]): void;
    public isAnyItemChecked(): boolean;
    public getSelectedSections(): Section<P>[];
}

export class Section<P> {
    [immerable]: boolean;
    public readonly name: string;
    public readonly items: Item<P>[];

    constructor(name: string, items: Item<P>[]);

    public setSectionName(name: string): void;
    public setItems(items: Item<P>[]): void;
    public selectAll(): void;
    public isIndeterminate(): boolean;
    public isAllSelected(): boolean;
    public isAnySelected(): boolean;
    public getSelectedItems(): Item<P>[];
}

export class Item<P> {
    [immerable]: boolean;
    public readonly name: string;
    public readonly sectionName: string;
    public readonly isSelected: boolean;
    public readonly properties: P;

    constructor(name: string, sectionName: string, isSelected: boolean, properties: P);

    public select(): void;

    public setProperties(properties: P): void;

    public setItemName(name: string): void;

    public setSelected(selected: boolean): void;
}

export interface SelectUtilityBase<P> {
    itemName: string;
    sectionName?: string;
    isSelected?: boolean;
    properties?: P;
}

export interface SetSectionBase<P> {
    readonly section: Section<P>;
}

export interface SetItemBase<P> {
    readonly item: Item<P>;
}

export interface SetProperties<P> extends SetItemBase<P> {
    readonly properties: P;
}

export interface SetItemName<P> extends SetItemBase<P> {
    readonly name: string;
}

export interface SetSelected<P> extends SetItemBase<P> {
    readonly isSelected: boolean;
}

export interface SetSectionName<P> extends SetSectionBase<P> {
    readonly name: string;
}

export interface SetItems<P> extends SetSectionBase<P> {
    readonly items: Item<P>[];
}

export interface SetSections<P> {
    sections: Section<P>[];
}

export interface CreateNewUtility<P> {
    items: SelectUtilityBase<P>[];
}

export interface ActionType<T extends Action, P> {
    type: T,
    params:
    T extends Action.Select ? SetItemBase<P> :
    T extends Action.SetProperties ? SetProperties<P> :
    T extends Action.SetItemName ? SetItemName<P> :
    T extends Action.SetSelected ? SetSelected<P> :
    T extends Action.SetSectionName ? SetSectionName<P> :
    T extends Action.SetItems ? SetItems<P> :
    T extends Action.SelectAll ? SetSectionBase<P> :
    T extends Action.SetSections ? SetSections<P> :
    T extends Action.CreateNewUtility ? CreateNewUtility<P> : never;
}

export type ActionStfy<T extends Action, P> = Record<keyof ActionType<T, P>, ActionType<T, P>[keyof ActionType<T, P>]>;