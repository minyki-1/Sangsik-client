import style from "./index.module.scss";
import Image from "next/image";
import HeartIcon from "assets/icons/heart.svg";
import BookmarkIcon from "assets/icons/bookmark.svg";

export default function Posts() {
  return (
    <main className={style.postList}>
      <div className={style.post}>
        <Image src={''} className={style.postImg} alt="123456" />
        <div className={style.postInfoWrap}>
          <div className={style.postInfo}>
            <div className={style.postProfile}>
              <Image
                width={24}
                height={24}
                src={'https://yt3.ggpht.com/yti/AGOGRCoQygByYr5MvP4_coveyCKZUmjDWgF6XFuWfyDrqA=s88-c-k-c0x00ffffff-no-rj'}
                alt="user profile "
              />
              <p>Kawan</p>
            </div>
            <div className={style.postData}>
              <HeartIcon width={16} height={16} fill={'var(--color-1)'} />
              <p>2</p>
            </div>
            <div className={style.postData}>
              <BookmarkIcon width={16} height={16} fill={'var(--color-1)'} />
              <p>2</p>
            </div>
          </div>
          <div className={style.postTitle}>
            대한민국의 유명한 산은?
          </div>
        </div>
      </div>
    </main>
  )
}