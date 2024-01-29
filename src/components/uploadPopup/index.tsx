import style from "./style.module.scss"
import Image from "next/image";
import CrossIcon from "@/assets/icons/cross.svg"
import InterrogationIcon from "@/assets/icons/interrogation.svg";
import ArrowIcon from "@/assets/icons/arrow-right.svg"
import { toast } from "react-toastify";
import { useState } from "react";

interface IProps {
  imageUrl?: string,
  title: string,
  description: string,
  exit: Function
}

export default function UploadPopup({ imageUrl, title, description, exit }: IProps) {
  const [showNotice, setShowNotice] = useState(false);
  const [doneTest, setDoneTest] = useState(false);

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
                imageUrl
                  ? <Image
                    src={imageUrl}
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
              <p>{description}</p>
            </span>
          </div>
        </div>

        <div className={style.uploadBtnWrap}>
          <span className={style.aiTestWrap}>
            <InterrogationIcon
              onClick={() => setShowNotice(value => !value)}
            />
            <button>AI 검사</button>
            {
              showNotice ?
                <div className={style.aiNotice}>
                  <p>AI 검사는 글의 내용이 올바른 내용인지 검사해줍니다.</p>
                  <p>더욱더 좋은 정보만을 전달하기 위해 검사 이후에 게시가 가능하므로 양해 부탁드립니다.</p>
                </div> : null
            }
          </span>
          <ArrowIcon className={style.leftIcon} />
          <button
            disabled={!doneTest}
            data-done={String(doneTest)}
          >게시하기</button>
        </div>
      </div>
    </div>
  )
}