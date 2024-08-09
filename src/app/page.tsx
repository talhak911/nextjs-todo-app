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
      className={`md:px-40 px-4  min-h-screen bg-${theme}Background bg-dotted-pattern  bg-dotted-size`}
    >

      <div className=" md:-mx-40 -mx-4">
        <Navbar />
      </div>

      <h1
        className={`w-full text-center  text-3xl md:text-4xl lg:text-6xl mb-10 text-${theme}Primary font-bold font-stint`}
      >
        Todo Lists <span className={`text-${theme}Accent -ml-2`}>.</span>
      </h1>
      <div className={`max-w-3xl w-full mx-auto text-${theme}Primary `}>
        <ViewLists theme={theme} />
        <ListCrud theme={theme} />
      </div>
    </div>
  );
}
