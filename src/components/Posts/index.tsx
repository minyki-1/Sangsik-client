import style from "./index.module.scss";
import Image from "next/image";
import HeartIcon from "@/assets/icons/heart.svg";
import BookmarkIcon from "@/assets/icons/bookmark.svg";

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
                src={process.env.TEST_USER_IMG || ''}
                alt="user profile"
              />
              <p>Kawan</p>
            </div>
            <div className={style.postData}>
              <HeartIcon />
              <p>2</p>
            </div>
            <div className={style.postData}>
              <BookmarkIcon />
              <p>2</p>
            </div>
          </div>
          <h1 className={style.postTitle}>대한민국의 유명한 산은?</h1>
        </div>
      </div>
    </main>
  )
}