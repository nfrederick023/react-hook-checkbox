import { act, renderHook } from '@testing-library/react';
import { CheckboxConfig, useCheckbox } from '.';

describe('useCheckbox', () => {

  it('selects option', () => {
    const { result } = renderHook(() => useCheckbox({}));

    act(() => {
      result.current[0].select();
    })
    expect(result.current[0].isSelected).toBe(true);
  });

  it('selects indeterminate option', () => {
    const config: CheckboxConfig = {
      options: [{
        isSelected: true
      }, {
        isSelected: false
      }]
    };

    const { result } = renderHook(() => useCheckbox(config));

    act(() => {
      result.current[0].select();
    })
    expect(result.current[0].isSelected).toBe(true);
  });

  it('unselects option', () => {
    const config: CheckboxConfig = {
      isSelected: true
    };

    const { result } = renderHook(() => useCheckbox(config));

    act(() => {
      result.current[0].select();
    })
    expect(result.current[0].isSelected).toBe(false);
  });

  it('checks isIndeterminate', () => {
    const config: CheckboxConfig = {
      options: [{
        isSelected: false
      }, {
        isSelected: true
      }]
    };

    const { result } = renderHook(() => useCheckbox(config));

    expect(result.current[0].isIndeterminate()).toBe(true);
  });

  it('checks isAllSelected', () => {
    const config: CheckboxConfig = {
      options: [{
        isSelected: true
      }, {
        isSelected: true
      }]
    };

    const { result } = renderHook(() => useCheckbox(config));

    expect(result.current[0].isAllSelected()).toBe(true);
  });

  it('checks isAnySelected indeterminate', () => {
    const config: CheckboxConfig = {
      options: [{
        isSelected: true
      }, {
        isSelected: false
      }]
    };

    const { result } = renderHook(() => useCheckbox(config));

    expect(result.current[0].isAnySelected()).toBe(true);
  });

  it('checks isAnySelected all selected', () => {
    const config: CheckboxConfig = {
      options: [{
        isSelected: true
      }, {
        isSelected: true
      }]
    };

    const { result } = renderHook(() => useCheckbox(config));

    expect(result.current[0].isAnySelected()).toBe(true);
  });

  it('gets selected options', () => {
    const config: CheckboxConfig = {
      options: [{
        isSelected: true
      }, {
        isSelected: false
      }, {
        isSelected: true
      }]
    };

    const { result } = renderHook(() => useCheckbox(config));

    expect(result.current[0].getSelectedOptions().length).toBe(2);
  });

  it('changes a name', () => {
    const { result } = renderHook(() => useCheckbox({}));

    act(() => {
      result.current[0].setName("test");
    })
    expect(result.current[0].name).toBe("test");
  });

  it('sets the properties', () => {

    const { result } = renderHook(() => useCheckbox<{ test: string }>({}));

    act(() => {
      result.current[0].setProperties({ test: "hello world" });
    })

    expect(result.current[0].properties.test).toBe("hello world");
  });

  it('sets isSelected', () => {

    const { result } = renderHook(() => useCheckbox({}));

    act(() => {
      result.current[0].setIsSelected(true);
    })

    expect(result.current[0].isSelected).toBe(true);

  });

  it('adds an option', () => {

    const { result } = renderHook(() => useCheckbox({}));

    act(() => {
      result.current[0].addOption({ name: "suboption 1" });
    })

    expect(result.current[0].options[0].name).toBe("suboption 1");
  });

  it('removes an option', () => {
    const config: CheckboxConfig = {
      options: [{}]
    }

    const { result } = renderHook(() => useCheckbox(config));

    expect(result.current[0].options.length).toBe(1);

    act(() => {
      result.current[0].options[0].removeOption();
    })

    expect(result.current[0].options.length).toBe(0);
  });

  it('removes an option with no refrence', () => {

    const { result } = renderHook(() => useCheckbox({}));
    const oldResult = { ...result };

    act(() => {
      result.current[0].removeOption();
    })

    expect(result).toBeTruthy();
  });

  it('sets the options', () => {
    const options: CheckboxConfig[] = [{
      name: "suboption 1"
    }, {
      name: "suboption 2"
    }]
    const { result } = renderHook(() => useCheckbox({}));

    act(() => {
      result.current[0].setOptions(options);
    })

    expect(result.current[0].options[0].name).toBe("suboption 1");
    expect(result.current[0].options[1].name).toBe("suboption 2");
  });

  it('sets the checkbox', () => {
    const { result } = renderHook(() => useCheckbox({}));

    act(() => {
      result.current[0].setCheckbox({ name: "new name" });
    })

    expect(result.current[0].name).toBe("new name");
  });

  it('checks child/parent isSelected/select and isIndeterminate', () => {
    const config: CheckboxConfig = {
      options: [{
        options: [{}, {}]
      }, {
        options: [{}, {}]
      }]
    }

    const { result } = renderHook(() => useCheckbox(config));

    act(() => {
      result.current[0].options[0].setIsSelected(true);
    })

    expect(result.current[0].isIndeterminate()).toBe(true);
    expect(result.current[0].options[0].isSelected).toBe(true);
    expect(result.current[0].options[0].options[0].isSelected).toBe(true);
    expect(result.current[0].options[0].options[1].isSelected).toBe(true);

    act(() => {
      result.current[0].options[0].options[0].select();
    })

    expect(result.current[0].isIndeterminate()).toBe(false);
    expect(result.current[0].options[0].isIndeterminate()).toBe(true);
    expect(result.current[0].options[0].options[0].isSelected).toBe(false);
    expect(result.current[0].options[0].options[1].isSelected).toBe(true);

  });
});