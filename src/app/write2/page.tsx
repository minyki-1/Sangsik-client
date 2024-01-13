'use client'
// import ReactQuill from "react-quill";
// import 'react-quill/dist/quill.snow.css';

export default function Page() {
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, false] }],
        ["bold", "underline", 'strike', 'blockquote', 'code-block'],
        ["image"],
        ['link'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ],
    },
  };
  return (
    <div>
      {/* <ReactQuill
        modules={modules}
      /> */}
    </div>
  );
}