import ListCrud from "@/components/listCrud/ListCrud";
import ViewLists from "@/components/viewLists/ViewLists";
import { Navbar } from "@/components/navbar/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todo Lists",
  description: "Organize your tasks within separate lists.",
  openGraph: {
    title: "Todo Lists",
    description: "Organize your tasks within separate lists.",
    url: `${process.env.DOMAIN}`,
  },
};

export default function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const theme = searchParams?.theme as string;
  return (
    <div
      className={` min-h-screen bg-${theme}Background bg-dotted-pattern  bg-dotted-size pb-4`}
    >
      <Navbar />

      <h1
        className={`flex justify-center w-full text-center  text-4xl md:text-6xl  xl:text-8xl xl:mt-[16px] mb-10 text-${theme}Primary font-bold font-stint`}
      >
        Todo Lists <span className={`text-${theme}Accent`}>.</span>
      </h1>
      <div className={`max-w-3xl w-full mx-auto text-${theme}Primary `}>
        <ViewLists theme={theme} />
        <ListCrud theme={theme} />
      </div>
    </div>
  );
}
