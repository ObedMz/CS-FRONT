import Header from "@/layouts/headers";
import NavSocialBar from "@/layouts/social-bar";
import ShapesPage from "@/components/shapes";
import getItems from "@/helpers/get-items";
import { Item } from "@/types/items";
import RenderingComponent from "@/components/render-comp";

export default async function Home({searchParams}: any) {
  const {itemType} = searchParams;
  const items : Item[] = await getItems({page: 0, size: 54},itemType);
  return (
    <>
    <NavSocialBar/>
    <ShapesPage/>
    <Header/>
    <main className="relative z-2 w-full mt-[90px]">
        <RenderingComponent data={items} searchParam={itemType}/>
    </main>
    </>
  );
}