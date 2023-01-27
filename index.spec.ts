import { CheckboxConfig, useCheckbox } from '.';
import { renderHook } from "@testing-library/react-hooks/server";

const config: CheckboxConfig = {
    name: 'Option 4',
};

describe('useCheckbox', () => {
    it('select option', () => {
        const { result } = renderHook(() => useCheckbox(config));
        expect(result.current[0].name).toBe('Option 4');
    });
});