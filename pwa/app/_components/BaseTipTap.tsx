import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import './css/tiptap.css';
import IconFormatBold from './icons/IconFormatBold';
import IconFormatBulletList from './icons/IconFormatBulletList';
import IconFormatHeading2 from './icons/IconFormatHeading2';
import IconFormatHeading3 from './icons/IconFormatHeading3';
import IconFormatItalic from './icons/IconFormatItalic';
import IconFormatNumberedList from './icons/IconFormatNumberedList';
import IconFormatUnderline from './icons/IconFormatUnderline';

interface TipTapProps {
  initialContent?: string;
  onChange: (content: string) => void;
  label: string;
  placeholder: string;
  error?: string;
}

const TipTapComponent: React.FC<TipTapProps> = ({
  initialContent,
  onChange,
  label,
  placeholder,
  error,
}) => {
  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: placeholder,
        }),
        Underline,
      ],
      editorProps: {
        attributes: {
          class:
            'prose prose-sm focus:outline-none w-full min-h-[32rem] font-normal max-w-none',
        },
      },
      content: initialContent ?? '',
      onUpdate({ editor }) {
        onChange(editor.getHTML());
      },
    },
    [initialContent]
  );

  if (!editor) {
    return null;
  }

  return (
    <div className="grid gap-2">
      <div className="text-sm font-medium text-neutral-600">{label}</div>
      <div
        className={`ring-secondary-500/20 focus-within:border-secondary-300 flex w-full resize-y flex-col gap-3 overflow-hidden overflow-y-auto rounded-lg border font-normal ${
          error ? 'border-red-500' : 'border-neutral-200'
        } p-4 shadow-sm transition-all focus-within:ring-2`}
      >
        <div>
          <MenuBar editor={editor} />
        </div>
        <div className="w-full max-w-none">
          <EditorContent editor={editor} />
        </div>
      </div>
      {error && <p className="text-error-600 text-xs font-medium">{error}</p>}
    </div>
  );
};

const MenuBar = ({ editor }: { editor: ReturnType<typeof useEditor> }) => {
  if (!editor) {
    return null;
  }

  const buttonClassNames =
    'flex h-8 w-8 items-center justify-center rounded-full hover:bg-neutral-50 transition-all hover:text-neutral-900 text-neutral-400';

  const activeButtonClasses = 'text-neutral-900';

  return (
    <div className="inline-flex h-10 items-center rounded-lg border border-neutral-200 px-2 shadow-sm">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`${buttonClassNames} ${
          editor.isActive('heading', { level: 2 }) ? activeButtonClasses : ''
        }`}
      >
        <IconFormatHeading2 />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`${buttonClassNames} ${
          editor.isActive('heading', { level: 3 }) ? activeButtonClasses : ''
        }`}
      >
        <IconFormatHeading3 />
      </button>
      <i className="h-5 w-px bg-neutral-100"></i>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`${buttonClassNames} ${
          editor.isActive('bold') ? activeButtonClasses : ''
        }`}
      >
        <IconFormatBold />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`${buttonClassNames} ${
          editor.isActive('italic') ? activeButtonClasses : ''
        }`}
      >
        <IconFormatItalic />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`${buttonClassNames} ${
          editor.isActive('underline') ? activeButtonClasses : ''
        }`}
      >
        <IconFormatUnderline />
      </button>
      <i className="h-5 w-px bg-neutral-100"></i>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${buttonClassNames} ${
          editor.isActive('bulletList') ? activeButtonClasses : ''
        }`}
      >
        <IconFormatBulletList />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${buttonClassNames} ${
          editor.isActive('orderedList') ? activeButtonClasses : ''
        }`}
      >
        <IconFormatNumberedList />
      </button>
    </div>
  );
};

export default TipTapComponent;
