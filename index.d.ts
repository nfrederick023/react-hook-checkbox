export function useCheckbox<P = Record<string, never>>(items: CheckboxHookBase<P>[]): [CheckboxHook<P>];

declare class CheckboxHook<P> {
    public readonly sections: Section<P>[];

    constructor(sections: Section<P>[]);

    public setSections(sections: Section<P>[]): void;
    public createCheckboxHook(items: CheckboxHookBase<P>[]): void;
    public isAnyItemChecked(): boolean;
    public addSection(sectionName: string): void;
    public getSelectedSections(): Section<P>[];
}

declare class Section<P> {
    public readonly name: string;
    public readonly items: Item<P>[];
    public readonly id: number;

    constructor(name: string, items: Item<P>[], id: number);

    public setSectionName(name: string): void;
    public setItems(items: Item<P>[]): void;
    public selectAll(): void;
    public removeSection(): void;
    public addItem(item: ItemBase<P>): void;
    public isIndeterminate(): boolean;
    public isAllSelected(): boolean;
    public isAnySelected(): boolean;
    public getSelectedItems(): Item<P>[];
}

declare class Item<P> {
    public readonly name: string;
    public readonly isSelected: boolean;
    public readonly properties: P;
    public readonly id: number;

    constructor(name: string, isSelected: boolean, properties: P, id: number);

    public select(): void;
    public setProperties(properties: P): void;
    public setItemName(name: string): void;
    public setSelected(selected: boolean): void;
    public removeItem(): void;
}

declare interface CheckboxHookBase<P> {
    itemName: string;
    sectionName?: string;
    isSelected?: boolean;
    properties?: P;
}

declare interface ItemBase<P> {
    itemName: string;
    isSelected?: boolean;
    properties?: P;
}

declare enum Action {
    Select = 0,
    SetProperties = 1,
    SetItemName = 2,
    SetSelected = 3,
    SetSectionName = 4,
    SetItems = 5,
    SelectAll = 6,
    SetSections = 7,
    CreateCheckboxHook = 8,
    RemoveItem = 9,
    RemoveSection = 10

}

declare interface SetSectionBase {
    readonly sectionID: number;
}

declare interface SetItemBase {
    readonly itemID: number;
}

declare interface SetProperties<P> extends SetItemBase {
    readonly properties: P;
}

declare interface SetItemName extends SetItemBase {
    readonly name: string;
}

declare interface SetSelected extends SetItemBase {
    readonly isSelected: boolean;
}

declare interface SetSectionName extends SetSectionBase {
    readonly name: string;
}

declare interface SetItems<P> extends SetSectionBase {
    readonly items: Item<P>[];
}

declare interface SetSections<P> {
    sections: Section<P>[];
}

declare interface CreateCheckboxHook<P> {
    items: CheckboxHookBase<P>[];
}

declare interface ActionType<T extends Action, P> {
    type: T,
    params:
    T extends Action.Select ? SetItemBase :
    T extends Action.SetProperties ? SetProperties<P> :
    T extends Action.SetItemName ? SetItemName :
    T extends Action.SetSelected ? SetSelected :
    T extends Action.SetSectionName ? SetSectionName :
    T extends Action.SetItems ? SetItems<P> :
    T extends Action.RemoveItem ? SetItemBase :
    T extends Action.SelectAll ? SetSectionBase :
    T extends Action.SetSections ? SetSections<P> :
    T extends Action.RemoveSection ? SetSectionBase :
    T extends Action.CreateCheckboxHook ? CreateCheckboxHook<P> : never;
}

declare type ActionStfy<T extends Action, P> = Record<keyof ActionType<T, P>, ActionType<T, P>[keyof ActionType<T, P>]>;