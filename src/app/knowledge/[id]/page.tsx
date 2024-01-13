import style from "./page.module.scss";
import Image from "next/image"
import HeartIcon from "@/assets/icons/heart.svg";
import BookmarkIcon from "@/assets/icons/bookmark.svg";
import '@toast-ui/editor/dist/toastui-editor.css';
import { notoSansKr } from "@/app/layout";

export default function Page() {
  const temp = `<h1>이글의 <strong>h1 내용어쩌</strong></h1><p>고 저쩌도인데</p><h2>h2 sodud인부분</h2><h1>1234567</h1><p><br></p><div contenteditable="false"><hr></div><blockquote><p>123456789'</p><blockquote><p>12345678</p></blockquote></blockquote><p><br></p><ul><li><p>12345</p></li><li><p>2222</p></li></ul><ul><li class="task-list-item" data-task="true"><p>2345</p></li></ul><ol><li><p>34565</p></li><li><p>345678</p></li><li><p>67890-2111111</p></li></ol>`

  return (
    <div className={style.container}>
      <div className={style.post}>
        <h1 className={style.title}>이글의 제목</h1>
        <div className={style.infoWrap}>
          <div className={style.info1}>
            <Image
              width={28}
              height={28}
              className={style.profileImg}
              src={'https://yt3.ggpht.com/yti/AGOGRCoQygByYr5MvP4_coveyCKZUmjDWgF6XFuWfyDrqA=s88-c-k-c0x00ffffff-no-rj'}
              alt="user profile"
            />
            <p className={style.userName}>KAWAN</p>
            <p className={style.point}>·</p>
            <p className={style.day}>12시간 전</p>
          </div>
          <div className={style.info2}>
            <span>
              <HeartIcon />
              <p>2</p>
            </span>
            <span>
              <BookmarkIcon />
              <p>저장</p>
            </span>
          </div>
        </div>
        <main className={'toastui-editor-contents'}>
          <div className={notoSansKr.className} dangerouslySetInnerHTML={{ __html: temp }} />
        </main>
      </div>
    </div>
  )
}