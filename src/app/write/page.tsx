'use client'
import style from "./page.module.scss"
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function Page() {
  const editorRef = useRef<Editor>(null);
  const [text, setText] = useState(localStorage.getItem('editorData') || ' ');

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
    const data = editorRef.current?.getInstance().getHTML();
    localStorage.setItem('editorData', data);
    setText(data);
    console.log(data)
  };

  const imageSetting = (editor: Editor) => {
    editor.getRootElement().querySelectorAll('img').forEach((e) => {
      e.addEventListener('click', () => {
        console.log('click!')
      })
    })
  }

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    imageSetting(editor);
    editor
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
    return () => {
      editor.getInstance().removeHook("addImageBlobHook");
    };
  }, [editorRef])

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1>새 상식 작성</h1>
        <button>업로드</button>
      </div>
      <input type="text" className={style.title} placeholder="이곳에 제목 작성" />
      <Editor
        initialValue={text}
        previewStyle="vertical"
        height="75vh"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        usageStatistics={false}
        // hideModeSwitch={true}
        plugins={[colorSyntax]}
        language="ko-KR"
        ref={editorRef}
        onChange={onChange}
      />
    </div>
  )
}