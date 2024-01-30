import style from "./style.module.scss"
import Image from "next/image";
import CrossIcon from "@/assets/icons/cross.svg"
import InterrogationIcon from "@/assets/icons/interrogation.svg";
import ArrowIcon from "@/assets/icons/arrow-right.svg"
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IProps {
  title: string,
  contents: string,
  userId: string | null | undefined,
  exit: Function,
  modifyId?: string,
}

export default function UploadPopup({ title, contents, userId, exit, modifyId }: IProps) {
  const [showNotice, setShowNotice] = useState(false);
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || ''
  const [aiResult, setAiResult] = useState<string | null>(null);
  const router = useRouter()

  const makeDetail = () => {
    const withLineBreaks = contents.replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>|<\/div>/gi, '\n')
      .replace(/<[^>]+>/g, '');
    const parser = new DOMParser();
    const doc = parser.parseFromString(withLineBreaks, 'text/html');
    const result = doc.body.textContent?.split('\n').filter(line => line.trim() !== '').join('\n')
    return result;
  }

  const getRoute = (postData: Object) => {
    if (modifyId) return axios.put(`${serverURL}/api/post/update/${modifyId}`, postData)
    else return axios.post(`${serverURL}/api/post`, postData)
  }

  const handleClickPublish = () => {
    if (!userId) return;

    const postData = {
      title,
      contents,
      previewImage: getFirstImage(),
      authorId: userId,
      description: makeDescription(),
      detail: makeDetail()
    };

    const toastId = toast.loading('AI 검사를 실행중입니다.')

    getRoute(postData).then(response => {
      if (response.data.status === "success") {
        localStorage.removeItem('editorData');
        localStorage.removeItem('titleData');
        toast.update(toastId, { render: "AI 검사를 통과했습니다!", type: "success", isLoading: false, autoClose: 3000 });
        toast.success('글이 성공적으로 게시되었습니다!');
        setTimeout(() => {
          router.push(`/knowledge/${response.data.data.id}`);
        }, 200);
      } else {
        toast.update(toastId, { render: "AI 검사에 통과하지 못했습니다.", type: "error", isLoading: false, autoClose: 3000 });
        const resultText = response.data.data.aiResult;
        
        setAiResult(resultText)
      }
    })
      .catch(error => {
        toast.update(toastId, { render: "오류가 발생했습니다.", type: "error", isLoading: false, autoClose: 3000 });
        console.error('에러:', error);
      });
  }

  const makeDescription = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(contents, 'text/html');
    const firstElement = doc.body.firstChild;
    return firstElement ? firstElement.textContent : '';
  }

  const getFirstImage = () => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = contents;

    const firstImage = tempDiv.querySelector('img');

    return firstImage?.src
  }

  return (
    <div className={style.uploadPopup}>
      <div className={style.uploadWrap}>
        <div className={style.uploadExitBtn}>
          <CrossIcon onClick={exit} />
        </div>
        <div className={style.infoWrap}>
          <div className={style.previewInfo1}>
            <h1>미리보기 이미지</h1>
            <span>
              {
                getFirstImage()
                  ? <Image
                    src={getFirstImage() || ''}
                    alt="Preview Image"
                    fill={true}
                    objectFit="cover"
                  />
                  : <>
                    <p>글에 알맞는 이미지를 추가해서</p>
                    <p>미리보기를 추가해 보세요.</p>
                  </>
              }
            </span>
          </div>
          <div className={style.previewInfo2}>
            <h1>{title}</h1>
            <span>
              <p>{makeDescription()}</p>
            </span>
          </div>
        </div>

        <div className={style.uploadBtnWrap}>
          <span className={style.aiTestWrap}>
            <InterrogationIcon
              onMouseEnter={() => setShowNotice(true)}
              onMouseLeave={() => setShowNotice(false)}
              onClick={() => setShowNotice(value => !value)}
            />
            <button onClick={handleClickPublish}>AI 검사 및 게시하기</button>
            {
              showNotice ?
                <div className={style.aiNotice}>
                  <p>AI 검사는 글의 내용이 올바른 내용인지 검사해줍니다.</p>
                  <p>더욱더 좋은 정보만을 전달하기 위해 검사 이후에 게시가 가능하므로 양해 부탁드립니다.</p>
                </div> : null
            }
          </span>
          {
            aiResult ?
              <div className={style.aiResult}>
                {aiResult}
              </div> : null
          }
          {/* <ArrowIcon className={style.leftIcon} />
          <button
            disabled={!doneTest}
            data-done={String(doneTest)}
          >게시하기</button> */}
        </div>
      </div>
    </div>
  )
}