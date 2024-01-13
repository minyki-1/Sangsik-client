import style from "./index.module.scss"
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

interface Props {
  content?: string;
}

const TuiViewer = ({ content = '' }: Props) => {
  return (
    <>
      {
        content ? (
          <Viewer
            initialValue={content || ''}
            usageStatistics={false}
          />
        ) : null
      }
    </>
  );
};

export default TuiViewer;