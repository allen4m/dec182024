import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, ListOrdered, Quote } from 'lucide-react';

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  return (
    <div className="border-b border-gray-200 p-4 flex gap-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
      >
        <Bold className="w-5 h-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
      >
        <Italic className="w-5 h-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
      >
        <List className="w-5 h-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
      >
        <ListOrdered className="w-5 h-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded ${editor.isActive('blockquote') ? 'bg-gray-200' : ''}`}
      >
        <Quote className="w-5 h-5" />
      </button>
    </div>
  );
};

export default function Editor({
  content,
  onChange,
}: {
  content: string;
  onChange: (content: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="border rounded-lg overflow-hidden">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="prose max-w-none p-4" />
    </div>
  );
}