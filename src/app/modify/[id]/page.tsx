import Write from "@/components/Write";

interface IProps {
  params: {
    id: string;
    slug: string;
  }
}


export default async function Page(props: IProps) {
  return (
    <Write modifyId={props.params.id} />
  )
}