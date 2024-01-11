'use client'
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function Page() {
  const editorRef = useRef<any>(null);
  const [text, setText] = useState('');

  const [file, setFile] = useState(null);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const uploadImage = async (file: File) => {
    if (!file) {
      alert("파일이 선택되지 않았습니다. 다시 시도해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data.url as String;
    } catch (error) {
      // console.error('Error uploading image: ', error);
      return;
    }
  };


  const onChange = () => {
    const data = editorRef.current.getInstance().getHTML();
    setText(data);
  };

  useEffect(() => {
    if (!editorRef.current) return;
    editorRef.current.getInstance().removeHook("addImageBlobHook");
    editorRef.current
      .getInstance()
      .addHook('addImageBlobHook', async (blob: File, callback: any) => {
        const result = await uploadImage(blob);
        if (!result) {
          alert('이미지 업로드에 실패했습니다.')
          return false;
        }
        callback(result, blob.name);
        return false;
      });
    return () => { };
  }, [editorRef])

  return (
    <div>
      <Editor
        initialValue=" "
        previewStyle="vertical"
        height="70vh"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        usageStatistics={false}
        hideModeSwitch={true}
        plugins={[colorSyntax]}
        language="ko-KR"
        ref={editorRef}
        onChange={onChange}

      />
    </div>
  )
}