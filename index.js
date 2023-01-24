const immer = require("immer");
const useImmer = require("use-immer");

const actions = ["Select", "SetProperties", "SetItemName", "SetSelected", "SetSectionName", "SetItems", "SelectAll", "SetSections", "CreateNewUtility"];

let Action;
(Action) => {
    actions.forEach((action, index) => {
        Action[action] = index;
    })
};

exports.useCheckbox = (items) => {
    class CheckboxHook {
        [immer.immerable] = true;
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

        createNewUtility(items) {
            const type = Action.CreateNewUtility;
            setState({
                type, params: { items }
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
        [immer.immerable] = true;
        name;
        items;

        constructor(name, items) {
            this.name = name;
            this.items = items;
        }

        setSectionName(name) {
            const type = Action.SetSectionName;
            setState({
                type, params: { name, section: this }
            });
        }

        setItems(items) {
            const type = Action.SetItems;
            setState({
                type, params: { items, section: this }
            });
        }

        selectAll() {
            const type = Action.SelectAll;
            setState({
                type, params: { section: this }
            });
        }

        isIndeterminate() {
            if (this.isAllSelected())
                return false;

            return this.items.some(item => item.isSelected);
        }

        isAllSelected() {
            return !this.items.filter(item => !item.isSelected).length;
        }

        isAnySelected() {
            return this.isIndeterminate() || this.isAllSelected();
        }

        getSelectedItems() {
            return this.items.filter(item => item.isSelected);
        }
    }

    class Item {
        [immer.immerable] = true;
        name;
        isSelected;
        sectionName;
        properties;

        constructor(name, sectionName, isSelected, properties) {
            this.name = name;
            this.sectionName = sectionName;
            this.isSelected = isSelected;
            this.properties = properties;
        }

        select() {
            const type = Action.Select;
            setState({
                type, params: { item: this }
            });
        }

        setProperties(properties) {
            const type = Action.SetProperties;
            setState({
                type, params: { properties, item: this }
            });
        }

        setItemName(name) {
            const type = Action.SetItemName;
            setState({
                type, params: { name, item: this }
            });
        }

        setSelected(isSelected) {
            const type = Action.SetSelected;
            setState({
                type, params: { isSelected, item: this }
            });
        }
    }

    const checkboxHookReducer = (draft, action) => {
        const getItem = (sectionName, itemName) => getSection(sectionName)?.items.find(item => item.name === itemName);
        const getSection = (sectionName) => draft.sections.find((section) => section.name === sectionName);
        switch (action.type) {
            case Action.Select: {
                const item = getItem(action.params.item.sectionName, action.params.item.name);
                if (item) {
                    item.isSelected = !item.isSelected;
                }
                break;
            }
            case Action.SetProperties: {
                const item = getItem(action.params.item.sectionName, action.params.item.name);
                if (item)
                    item.properties = action.params.properties;
                break;
            }
            case Action.SetItemName: {
                const item = getItem(action.params.item.sectionName, action.params.item.name);
                if (item)
                    item.name = action.params.name;
                break;
            }
            case Action.SetSelected: {
                const item = getItem(action.params.item.sectionName, action.params.item.name);
                if (item)
                    item.isSelected = action.params.isSelected;
                break;
            }
            case Action.SetSectionName: {
                const section = getSection(action.params.section.name);
                if (section)
                    section.name = action.params.name;
                break;
            }
            case Action.SetItems: {
                const section = getSection(action.params.section.name);
                if (section)
                    section.items = action.params.items;
                break;
            }
            case Action.SelectAll: {
                const section = getSection(action.params.section.name);
                if (section) {
                    const isIndeterminate = section.isIndeterminate();
                    section.items.forEach((item) => {
                        if (isIndeterminate)
                            item.isSelected = true;
                        else
                            item.isSelected = !item.isSelected;
                    });
                }
                break;
            }
            case Action.SetSections: {
                draft.sections = action.params.sections;
                break;
            }
            case Action.CreateNewUtility: {
                const newUtility = intializeUtility(action.params.items);
                draft.sections = newUtility.sections;
                break;
            }
            default:
                break;
        }
    };
    const intializeUtility = (items) => {
        const sections = [];
        items.forEach((newItem) => {

            // default values
            newItem.isSelected ??= false;
            newItem.properties ??= {};
            newItem.sectionName ??= 'unnamed_section';

            const sectionInNewState = sections.find((section) => section.name === newItem.sectionName);
            let itemInOldState = undefined;
            try {
                itemInOldState = state.sections.find(section => section.name === newItem.sectionName)?.items.find(item => item.name === newItem.itemName);
            }
            catch (e) { /* empty */ }
            // add new section and new item
            if (!sectionInNewState) {
                sections.push(new Section(newItem.sectionName, [new Item(newItem.itemName, newItem.sectionName, newItem.isSelected, newItem.properties)]));
                return;
            }
            // add exsisting item to exsisting section
            if (itemInOldState) {
                sectionInNewState.items.push(itemInOldState);
                return;
            }
            // add new item to exsisting state
            if (!itemInOldState) {
                sectionInNewState.items.push(new Item(newItem.itemName, newItem.sectionName, newItem.isSelected, newItem.properties));
                return;
            }
        });
        return new CheckboxHook(sections);
    };

    // state
    const [state, setState] = useImmer.useImmerReducer((draft, action) => { checkboxHookReducer(draft, action); }, intializeUtility(items));
    return [state];
};
