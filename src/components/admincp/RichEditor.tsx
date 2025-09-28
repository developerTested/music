import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';


type RichEditorProps = {
  content: string,
  handleEditorChange: (text: string) => void,
}

export default function RichEditor({ content, handleEditorChange }: RichEditorProps) {

  const editorRef = useRef(null);

  return (
    <Editor
      apiKey={import.meta.env.VITE_TINYMCE_KEY}
      onInit={(_evt, editor) => editorRef.current = editor}
      initialValue={content}

      init={{
        height: 250,
        menubar: false,
        directionality: "ltr",  // Ensure left-to-right text direction    
        plugins: [
          "image", "advlist", "autolink", "lists", "link", "charmap",
          "preview", "anchor", "searchreplace", "visualblocks", "code",
          "fullscreen", "insertdatetime", "media", "table", "help",
          "wordcount", "codesample", "emoticons", "autosave",
        ],
        toolbar:
          "undo redo | formatselect | bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table | codesample emoticons fullscreen",
        content_style: `
            body { font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; }
            img { max-width: 100%; height: auto; }
          `,

      }}
      onEditorChange={(_, editor) => handleEditorChange(editor.getContent())}
    />
  )
}
