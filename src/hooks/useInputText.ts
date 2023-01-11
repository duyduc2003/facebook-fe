import { useCallback, useState } from 'react';

export default function useInputText(initialValue: string = '') {
  const [value, setValueInput] = useState(initialValue);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value);
  }, []);

  return { value, onChange } as const;
}
