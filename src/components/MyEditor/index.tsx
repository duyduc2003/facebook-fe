import React, { useEffect, useMemo } from 'react';
const Editor = dynamic(
  import('draft-js').then((m) => m.Editor),
  { ssr: false }
);
import { EditorState, convertToRaw } from 'draft-js';

import 'draft-js/dist/Draft.css';
import dynamic from 'next/dynamic';
import classNames from 'classnames';

interface EditorProps {
  setValue?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function MyEditor(props: EditorProps) {
  const { setValue } = props;
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
  const value = useMemo(
    () =>
      blocks
        .map((block) => (!block.text.trim() && '\n') || block.text)
        .join('\n'),
    [blocks]
  );

  useEffect(() => {
    setValue?.(value);
  }, [value]);

  return (
    <div className="text-primaryText text-[15px] font-[400] whitespace-pre-wrap break-words ">
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        placeholder="Đức, bạn đang nghĩ gì thế?"
      />
    </div>
  );
}
