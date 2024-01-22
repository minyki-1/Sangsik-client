import PostList from "@/components/PostList";
import { getServerSession } from "next-auth";
import { options } from "@/utils/authOptions";
import { SessionUser } from "@/types/session";

export default async function Page() {
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || ''
  const session = await getServerSession(options)
  const user = session?.user as SessionUser;
  const resp = await fetch(`${serverURL}/api/post/user/${user.id}?order=popular`, { next: { revalidate: 60 } });
  const postList = await resp.json();

  return (
    <PostList data={postList.data} />
  )
}