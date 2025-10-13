import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getSession();
  if(!session){
      redirect("/");
  }
  
  return (
    <div className="Dashboard">
      Pag Dashboard
    </div>
  );
}
