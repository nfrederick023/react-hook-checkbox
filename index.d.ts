export declare function useCheckbox<I, S>(items: CheckboxHookBase<I, S>[]): [CheckboxHook<I, S>];

export declare class CheckboxHook<I, S> {
    public readonly sections: Section<I, S>[];

    constructor(sections: Section<I, S>[]);

    public setSections(sections: Section<I, S>[]): void;
    public createCheckboxHook(items: CheckboxHookBase<I, S>[]): void;
    public isAnyItemChecked(): boolean;
    public addSection(section: SectionBase<I, S>): void;
    public getSelectedSections(): Section<I, S>[];
}

export declare class Section<I, S> {
    public readonly name: string;
    public readonly items: Item<I>[];
    public readonly id: number;
    public readonly properties: S;

    constructor(name: string, items: Item<I>[], id: number, properties: S);

    public setSectionName(name: string): void;
    public setItems(items: Item<I>[]): void;
    public selectAll(): void;
    public removeSection(): void;
    public addItem(item: ItemBase<I>): void;
    public setProperties(properties: S): void;
    public isIndeterminate(): boolean;
    public isAllSelected(): boolean;
    public isAnySelected(): boolean;
    public getSelectedItems(): Item<I>[];
}

export declare class Item<I> {
    public readonly name: string;
    public readonly isSelected: boolean;
    public readonly properties: I;
    public readonly id: number;

    constructor(name: string, isSelected: boolean, properties: I, id: number);

    public select(): void;
    public setProperties(properties: I): void;
    public setItemName(name: string): void;
    public setSelected(selected: boolean): void;
    public removeItem(): void;
}

export interface CheckboxHookBase<I, S> {
    itemName: string;
    sectionName?: string;
    isSelected?: boolean;
    itemProperties?: I;
    sectionProperties?: S;
}

export interface SectionBase<I, S> {
    name: string;
    items: Item<I>[];
    properties?: S;
}

export interface ItemBase<I> {
    itemName: string;
    isSelected?: boolean;
    properties?: I;
}

export declare enum Action {
    Select = 0,
    SetItemProperties = 1,
    SetItemName = 2,
    SetSelected = 3,
    SetSectionName = 4,
    SetItems = 5,
    SelectAll = 6,
    SetSections = 7,
    CreateCheckboxHook = 8,
    RemoveItem = 9,
    RemoveSection = 10,
    SetSectionProperties = 11
}

export interface SetSectionBase {
    readonly sectionID: number;
}

export interface SetItemBase {
    readonly itemID: number;
}

export interface SetItemProperties<I> extends SetItemBase {
    readonly properties: I;
}

export interface SetItemName extends SetItemBase {
    readonly name: string;
}

export interface SetSelected extends SetItemBase {
    readonly isSelected: boolean;
}

export interface SetSectionName extends SetSectionBase {
    readonly name: string;
}

export interface SetSectionProperties<S> extends SetSectionBase {
    readonly properties: S;
}

export interface SetItems<I> extends SetSectionBase {
    readonly items: Item<I>[];
}

export interface SetSections<I, S> {
    sections: Section<I, S>[];
}

export interface CreateCheckboxHook<I, S> {
    items: CheckboxHookBase<I, S>[];
}

export interface ActionType<T extends Action, I, S> {
    type: T,
    params:
    T extends Action.Select ? SetItemBase :
    T extends Action.SetItemProperties ? SetItemProperties<I> :
    T extends Action.SetItemName ? SetItemName :
    T extends Action.SetSelected ? SetSelected :
    T extends Action.SetSectionName ? SetSectionName :
    T extends Action.SetItems ? SetItems<I> :
    T extends Action.RemoveItem ? SetItemBase :
    T extends Action.SetSectionProperties ? SetSectionProperties<S> :
    T extends Action.SelectAll ? SetSectionBase :
    T extends Action.SetSections ? SetSections<I, S> :
    T extends Action.RemoveSection ? SetSectionBase :
    T extends Action.CreateCheckboxHook ? CreateCheckboxHook<I, S> : never;
}