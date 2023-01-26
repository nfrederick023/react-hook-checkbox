import { useReducer } from 'react';

const actions = ['Select', 'SetItemProperties', 'SetItemName', 'SetSelected', 'SetSectionName', 'SetItems', 'SelectAll', 'SetSections', 'CreateCheckboxHook', 'RemoveItem', 'RemoveSection', 'SetSectionProperties'];

const Action = {};
actions.forEach((action, index) => {
    Action[action] = index;
});

const genID = () => {
    const str = (Math.random() * 10000).toString();
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        const chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
        hash = hash < 1 ? hash * -1 : hash;
    }
    return hash;
};

export const useCheckbox = (items) => {
    class CheckboxHook {
        sections;

        constructor(sections) {
            this.sections = sections;
        }

        setSections(sections) {
            const type = Action.SetSections;
            setState({
                type, params: { sections }
            });
        }

        createCheckboxHook(items) {
            const type = Action.CreateCheckboxHook;
            setState({
                type, params: { items }
            });
        }

        addSection(section) {
            const type = Action.SetSections;
            const sections = [...this.sections, new Section(section.name, section.items, genID(), section.properties)];
            setState({
                type, params: { sections }
            });
        }

        isAnyItemChecked() {
            return !!this.sections.find(section => section.isAnySelected());
        }

        getSelectedSections() {
            return this.sections.filter(section => section.isAnySelected()) ?? [];
        }
    }

    class Section {
        name;
        items;
        id;
        properties;

        constructor(name, items, id, properties) {
            this.name = name;
            this.items = items;
            this.id = id;
            this.properties = properties;
        }

        setSectionName(name) {
            setState({
                type: Action.SetSectionName, params: { name, sectionID: this.id }
            });
        }

        setItems(items) {
            setState({
                type: Action.SetItems, params: { items, sectionID: this.id }
            });
        }

        selectAll() {
            setState({
                type: Action.SelectAll, params: { sectionID: this.id }
            });
        }

        removeSection() {
            setState({
                type: Action.RemoveSection, params: { sectionID: this.id }
            });
        }

        addItem(item) {
            item.isSelected ??= false;
            item.properties ??= {};
            const items = [...this.items, new Item(item.itemName, item.isSelected, item.properties, genID())];
            const type = Action.SetItems;
            setState({
                type, params: { items, sectionID: this.id }
            });
        }

        setProperties(properties) {
            setState({
                type: Action.SetSectionProperties, params: { properties, sectionID: this.id }
            });
        }

        isIndeterminate() {
            if (this.isAllSelected())
                return false;

            return this.items.some(item => item.isSelected);
        }

        isAllSelected() {
            if (this.items.length)
                return !this.items.filter(item => !item.isSelected).length;
            return false;
        }

        isAnySelected() {
            return this.isIndeterminate() || this.isAllSelected();
        }

        getSelectedItems() {
            return this.items.filter(item => item.isSelected);
        }
    }

    class Item {
        name;
        isSelected;
        properties;
        id;

        constructor(name, isSelected, properties, id) {
            this.name = name;
            this.isSelected = isSelected;
            this.properties = properties;
            this.id = id;
        }

        select() {
            setState({
                type: Action.Select, params: { itemID: this.id }
            });
        }

        setProperties(properties) {
            setState({
                type: Action.SetItemProperties, params: { properties, itemID: this.id }
            });
        }

        setItemName(name) {
            setState({
                type: Action.SetItemName, params: { name, itemID: this.id }
            });
        }

        setSelected(isSelected) {
            setState({
                type: Action.SetSelected, params: { isSelected, itemID: this.id }
            });
        }

        removeItem() {
            setState({
                type: Action.RemoveItem, params: { itemID: this.id }
            });
        }
    }

    const checkboxHookReducer = (state, action) => {

        const updateSection = (newSection) => {
            const oldSectionIndex = state.sections.findIndex(section => section.id === newSection.id);
            const newSections = [...state.sections];
            newSections[oldSectionIndex] = newSection;
            return new CheckboxHook(newSections);
        };

        const updateItem = (newItem) => {
            const section = getSectionWithItem(newItem.id);
            const oldItemIndex = section?.items.findIndex(item => item.id === newItem.id) ?? 0;
            const newItems = section?.items ? [...section.items] : [];
            newItems[oldItemIndex] = newItem;

            if (newItems && section)
                return updateSection(new Section(section.name, newItems, section.id));
        };

        const getSectionWithItem = (itemID) => {
            return state.sections.find(section => section.items.find(item => item.id === itemID));
        };

        const getItem = (itemID) => {
            for (let i = 0; i < state.sections.length; i++) {
                const item = state.sections[i].items.find(item => item.id === itemID);
                if (item)
                    return item;
            }
        };

        const getSection = (sectionID) => {
            return state.sections.find(section => section.id === sectionID);
        };

        switch (action.type) {
            case Action.Select: {
                const item = getItem(action.params.itemID);
                if (!item)
                    break;

                const updatedHook = updateItem(new Item(item.name, !item.isSelected, item.properties, item.id));
                if (updatedHook)
                    return updatedHook;

                break;
            }

            case Action.SetItemProperties: {
                const item = getItem(action.params.itemID);
                if (!item)
                    break;

                const updatedHook = updateItem(new Item(item.name, item.isSelected, action.params.properties, item.id));
                if (updatedHook)
                    return updatedHook;

                break;
            }

            case Action.SetItemName: {
                const item = getItem(action.params.itemID);
                if (!item)
                    break;

                const updatedHook = updateItem(new Item(action.params.name, item.isSelected, item.properties, item.id));
                if (updatedHook)
                    return updatedHook;

                break;
            }

            case Action.SetSelected: {
                const item = getItem(action.params.itemID);
                if (!item)
                    break;

                const updatedHook = updateItem(new Item(item.name, action.params.isSelected, item.properties, item.id));
                if (updatedHook)
                    return updatedHook;

                break;
            }

            case Action.RemoveItem: {
                const section = getSectionWithItem(action.params.itemID);
                if (!section)
                    break;

                const newItems = section.items.filter(item => item.id !== action.params.itemID);
                const updatedHook = updateSection(new Section(section.name, newItems, section.id, section.properties));
                if (updatedHook)
                    return updatedHook;

                break;
            }

            case Action.SetSectionName: {
                const section = getSection(action.params.sectionID);
                if (!section)
                    break;

                const updatedHook = updateSection(new Section(action.params.name, section.items, section.id, section.properties));
                if (updatedHook)
                    return updatedHook;

                break;
            }

            case Action.SetItems: {
                const section = getSection(action.params.sectionID);
                if (!section)
                    break;

                const updatedHook = updateSection(new Section(section.name, action.params.items, section.id, section.properties));
                if (updatedHook)
                    return updatedHook;

                break;
            }

            case Action.SetSectionProperties: {
                const section = getSection(action.params.sectionID);
                if (!section)
                    break;

                const updatedHook = updateSection(new Section(section.name, section.items, section.id, action.params.properties));
                if (updatedHook)
                    return updatedHook;

                break;
            }

            case Action.SelectAll: {
                const section = getSection(action.params.sectionID);

                if (!section)
                    break;

                const newItems = section.items.map(item => {
                    let selectAllState = false;
                    if (section.isIndeterminate())
                        selectAllState = true;
                    else
                        selectAllState = !item.isSelected;
                    return new Item(item.name, selectAllState, item.properties, item.id);
                });

                const updatedHook = updateSection(new Section(section.name, newItems, section.id, section.properties));
                if (updatedHook)
                    return updatedHook;

                break;
            }

            case Action.RemoveSection: {
                const newSections = state.sections.filter(section => section.id !== action.params.sectionID);
                return new CheckboxHook(newSections);
            }

            case Action.SetSections: {
                return new CheckboxHook(action.params.sections);
            }

            case Action.CreateCheckboxHook: {
                const newUtility = intializeUtility(action.params.items);
                return new CheckboxHook(newUtility.sections);
            }
        }
        throw Error('Unknown action.');
    };

    const intializeUtility = (items) => {

        const sections = [];
        items.forEach((newItem) => {

            newItem.isSelected ??= false;
            newItem.itemProperties ??= {};
            newItem.sectionProperties ??= {};
            newItem.sectionName ??= 'unnamed_section';
            const itemID = genID();

            const sectionInNewState = sections.find(section => section.name === newItem.sectionName);
            let itemInOldState = undefined;
            try {
                itemInOldState = state.sections.find(section => section.name === newItem.sectionName)?.items.find(item => item.name === newItem.itemName);
            } catch (e) { /* empty */ }

            if (!sectionInNewState) {
                const sectionID = genID();
                sections.push(new Section(newItem.sectionName, [new Item(newItem.itemName, newItem.isSelected, newItem.itemProperties, itemID)], sectionID, newItem.sectionProperties));
                return;
            }

            if (itemInOldState) {
                sectionInNewState.items.push(itemInOldState);
                return;
            }

            if (!itemInOldState) {
                sectionInNewState.items.push(new Item(newItem.itemName, newItem.isSelected, newItem.itemProperties, itemID));
                return;
            }

        });

        return new CheckboxHook(sections);
    };

    const [state, setState] = useReducer(checkboxHookReducer, intializeUtility(items));
    return [state];
};
