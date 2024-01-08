import MyPostOrder from '@/components/MyPostOrder'
import MyProfile from '@/components/MyProfile'

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MyProfile />
      <MyPostOrder />
      {children}
    </>
  )
}