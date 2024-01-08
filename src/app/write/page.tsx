'use client'
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { useEffect, useRef, useState } from 'react';

export default function Page() {
  const editorRef = useRef<any>(null);
  const [text, setText] = useState('');

  const onChange = () => {
    const data = editorRef.current.getInstance().getHTML();
    setText(data);
  };

  useEffect(() => {
    // editorRef.current
    //   .getInstance()
    //   .addHook('addImageBlobHook', async (blob: File, callback: any) => {
    //     // blob 자체가 file 임,
    //     const formData = new FormData();
    //     // 아래와 같이 저장하면 formData {image:blob} 형태가 됨
    //     formData.append('image', blob);
    //     // 서버에 이미지 저장 및 저장된 이미지 url 응답 받기
    //     const url = await axios.post('/api/...', formData);
    //     // 에디터에 url과 파일 이름을 이용한 마크다운 이미지 문법 작성 콜백 함수
    //     callback('...' + url, blob.name);
    //     return false;
    //   });
  }, [])

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