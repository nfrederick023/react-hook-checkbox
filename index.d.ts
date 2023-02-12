import { Dispatch, SetStateAction } from "react";

/**
 * Creates the checkboxes from the provided checkboxConfig. Returns a React hook. 
 *
 * @param checkBoxConfig is the configuration for the checkbox
 * 
 * @returns a react hook containing the top-level checkbox 
 * 
 * @example
 * 
 * const config: CheckboxConfig<T> = {
 *   name: "Shopping List",
 *   options: [{
 *     name: "Eggs",
 *   }, {
 *     name: "Milk",
 *   }, {
 *     name: "Cheese",
 *   }]
 * };
 * 
 * const [myCheckbox] = useCheckbox<T>(config);
 * 
 * console.log(myCheckbox.name); // prints "Shopping List"!
 */
export declare function useCheckbox<T = undefined>(checkBoxConfig: CheckboxConfig<T>): [Checkbox<T>, Dispatch<SetStateAction<Checkbox<T>>>];

/**
 * A single checkbox item.
 */
export interface Checkbox<T = undefined> {

  /**
   * An array of all the child checkboxes.
   * 
   * Defaults to `[]`.
   * 
   * `[]` if there are no child checkboxes.
   */
  readonly options: Checkbox<T>[];

  /**
   * True/False if checkbox is selected.
   * 
   * Defaults `false`.
   */
  readonly isSelected: boolean;

  /**
   * Properties provided to the checkbox.
   * 
   * Defaults to `undefined`.
   * 
   * @note Remember to follow [React's rule's of Hooks](https://reactjs.org/docs/hooks-rules.html) when working with `.properties`.
   */
  readonly properties: T;

  /**
   * The name of the checkbox.
   * 
   * Defaults to `""`.
   */
  readonly name: string;

  /**
   * A refrence to the parent checkbox.
   * 
   * `undefined` is there's no parent.
   */
  readonly ref: Checkbox<T> | undefined;

  /**
   * Resets the `.options` to a new set of options from the provided configuration.
   *
   * @param options is the configuration for the new options
   * 
   * @example
   * 
   * const config: CheckboxConfig<T> = {
   *   options: [{
   *      name: "old option 1"
   *    }]
   * } 
   * 
   * const [myCheckbox] = useCheckbox<T>(config);
   * 
   * const newOptions: CheckboxConfig<T>[] = [{
   *  name: "new option 1"
   * }] 
   * 
   * myCheckbox.setOptions(newOptions);
   * 
   * console.log(myCheckbox.options[0].name); // prints "new option 1"!
   */
  setOptions(options: CheckboxConfig<T>[]): void;

  /**
   * Resets and creates a new checkbox on from the provided configuration.
   * 
   * @param config is the configuration for the new checkbox
   * 
   * @example
   * 
   * const config: CheckboxConfig<T> = {
   *   name: "old checkbox"
   * }
   * 
   * const [myCheckbox] = useCheckbox<T>(config);
   * 
   * const newCheckbox: CheckboxConfig<T> = {
   *  name: "new checkbox"
   * };
   * 
   * myCheckbox.setCheckbox(newCheckbox);
   * 
   * console.log(myCheckbox.name); // prints "new checkbox"!
   */
  setCheckbox(config: CheckboxConfig<T>): void;

  /**
  * Adds a child checkbox to `.options` from the provided configuration.
  * 
  * @param option is the configuration for the new checkbox
  * 
  * @example
  * 
  * const config: CheckboxConfig<T> = {
  *   options: []
  * }
  * 
  * const [myCheckbox] = useCheckbox<T>(config);
  * 
  * const newOption: CheckboxConfig<T> = {
  *  name: "option 1"
  * };
  * 
  * myCheckbox.addOption(newOption);
  * 
  * console.log(myCheckbox.options[0].name); // prints "option 1"!
  */
  addOption(option: CheckboxConfig<T>): void;

  /**
  * Sets the `.isSelected` of the checkbox. 
  * 
  * @param isSelected is the new value that's assigned to `.isSelected`
  * 
  * @example
  * 
  * const config: CheckboxConfig<T> = {
  *   isSelected: false
  * }
  * 
  * const [myCheckbox] = useCheckbox<T>(config);
  * 
  * myCheckbox.setIsSelected(true);
  * 
  * console.log(myCheckbox.isSelected); // prints true!
  */
  setIsSelected(isSelected: boolean): void;

  /**
  * Sets the `.properties` of the checkbox. 
  * 
  * @param properties is the new value that's assigned to `.properties`
  * 
  * @example
  * 
  * const config: CheckboxConfig<string> = {
  *   properties: "fizzbuzz"
  * }
  * 
  * const [myCheckbox] = useCheckbox<string>(config);
  * 
  * myCheckbox.setProperties("hello world!");
  * 
  * console.log(myCheckbox.properties); // prints "hello world!"!
  */
  setProperties(properties: T): void;

  /**
  * Sets the `.name` of the checkbox. 
  * 
  * @param name is the new name that's assigned to `.name`
  * 
  * @example
  * 
  * const config: CheckboxConfig<T> = {
  *   name: "name"
  * }
  * 
  * const [myCheckbox] = useCheckbox<T>(config);
  * 
  * myCheckbox.setName("new name");
  * 
  * console.log(myCheckbox.name); // prints "new name!"!
  */
  setName(name: string): void;

  /**
  * Returns an array of all child checkboxes in which `.isSelected` is `true`.
  * 
  * @returns array of checkboxes
  * 
  * @example
  * 
  * const config: CheckboxConfig<T> = {
  *   options: [{
  *     isSelected: true
  *   }, {
  *     isSelected: false
  *   }]
  * }
  * 
  * const [myCheckbox] = useCheckbox<T>(config);
  * 
  * const count = myCheckbox.getSelectedOptions().length;
  * 
  * console.log(count); //prints 1!
  */
  getSelectedOptions(): Checkbox<T>[];

  /**
  * Returns `true`/`false` if the checkbox is indeterminate.
  * 
  * @returns boolean
  * 
  * @example
  * 
  * const config: CheckboxConfig<T> = {
  *   options: [{
  *     isSelected: true
  *   }, {
  *     isSelected: false
  *   }]
  * }
  * 
  * const [myCheckbox] = useCheckbox<T>(config);
  * 
  * console.log(myCheckbox.isIndeterminate()); //prints true!
  */
  isIndeterminate(): boolean;

  /**
  * Returns `true`/false if `.isSelected` of all child checkboxes is true.
  * 
  * @returns boolean
  * 
  * @example
  * 
  * const config: CheckboxConfig<T> = {
  *   options: [{
  *     isSelected: true
  *   }, {
  *     isSelected: true
  *   }]
  * }
  * 
  * const [myCheckbox] = useCheckbox<T>(config);
  * 
  * console.log(myCheckbox.isAllSelected()); //prints true!
  */
  isAllSelected(): boolean;

  /**
  * Returns `true`/`false` if `.isSelected` of any child checkbox is true. 
  * 
  * @returns boolean
  * 
  * @example
  * 
  * const config: CheckboxConfig<T> = {
  *   options: [{
  *     isSelected: true
  *   }, {
  *     isSelected: false
  *   }]
  * }
  * 
  * const [myCheckbox] = useCheckbox<T>(config);
  * 
  * console.log(myCheckbox.isAnySelected()); //prints true!
  */
  isAnySelected(): boolean;

  /**
  * Removes a checkbox from the parent checkbox's `.options`.
  * 
  * @example
  * 
  * const config: CheckboxConfig<T> = {
  *   options: [{}, {}]
  * }
  * 
  * const [myCheckbox] = useCheckbox<T>(config);
  * 
  * myCheckbox.options[0].removeOption();
  * 
  * console.log(myCheckbox.options.length); //prints 1!
  */
  removeOption(): void;

  /**
  * Selects a single checkbox, inverting the current `.isSelected`.
  * 
  * @example
  * 
  * const config: CheckboxConfig<T> = {
  *   isSelected: false
  * }
  * 
  * const [myCheckbox] = useCheckbox<T>(config);
  * 
  * myCheckbox.select();
  * 
  * console.log(myCheckbox.isSelected); //prints true!
  */
  select(): void;
}

/**
 * The configuration for a checkbox. 
 * 
 * @param name the name of the checkbox. Defaults to `""`.
 * @param isSelected true/false if the checkbox is selected. Defaults to `false`.
 * @param properties properties provided to the checkbox. Defaults to `undefined`,
 * @param options any child checkboxes. Defaults to `[]`.
 * 
 * @note All of these parameters are optional. 
 */
export interface CheckboxConfig<T = undefined> {
  name?: string;
  isSelected?: boolean;
  properties?: T;
  options?: CheckboxConfig<T>[];
}
