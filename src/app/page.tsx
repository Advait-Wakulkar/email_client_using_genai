import { Link_Account_Button } from "@/components/link-account-button";
import { api } from "@/trpc/server";


export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (<>
  <Link_Account_Button></Link_Account_Button>
  </>
  );
}
