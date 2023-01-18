import { useAuth } from '@/context/AuthContext';
import React, { memo, useCallback, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';

interface TextEditorProps {
  value?: string | null;
  onChange?: (
    value: string,
    delta: any,
    source: any,
    editor: ReactQuill.UnprivilegedEditor
  ) => void;
}

export default memo(function TextEditor(props: TextEditorProps) {
  const { currentUser } = useAuth();
  const { value = '', onChange } = props;

  const handleEditorChange = useCallback(
    (
      value: string,
      delta: any,
      source: any,
      editor: ReactQuill.UnprivilegedEditor
    ) => {
      onChange?.(value, delta, source, editor);
    },
    []
  );

  return (
    <ReactQuill
      className="!text-[16px] text-primaryText"
      theme="bubble"
      value={value || ''}
      onChange={handleEditorChange}
      placeholder={`${currentUser?.lastName}, bạn đang nghĩ gì thế?`}
    />
  );
});
