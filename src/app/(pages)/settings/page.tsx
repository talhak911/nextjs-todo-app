import { Profile } from "@/components/profile/Profile";
import { Metadata } from "next";
import { LogoutIcon } from "../../../../public/assets/icons/logout";
import { SignOut } from "@/components/signOut/SignOut";
import { BackButton } from "@/components/backButton/BackButton";

export const metadata: Metadata = {
  title: "Settings page",
  description: "Change your profile pic, name, email address and password.",
  openGraph: {
    title: "Settings page - Todo App",
    description: "Change your profile pic, name, email address and password.",
    url: `${process.env.DOMAIN}/settings`,
  },
};

export default async function Settings({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const theme = searchParams?.theme as string;
  return (
    <div
      className={`bg-${theme}Background bg-dotted-pattern bg-dotted-size min-h-screen  pb-10  h-fit w-full text-${theme}Primary`}
    >
      <div
        className={`absolute w-full flex justify-between px-[24px] py-2 xl:p-[24px] backdrop-blur-[3px] text-${theme}Primary`}
      >
        <BackButton />
        <SignOut>
          <LogoutIcon />
        </SignOut>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen gap-5 xl:gap-[48px] ">
        <h1 className="flex font-bold text-4xl md:text-5xl font-stint xl:text-[124px] xl:leading-[139.98px] xl:mt-[61px]">
          Settings <span className={` text-${theme}Accent`}>.</span>
        </h1>
        <Profile theme={theme} />
      </div>
    </div>
  );
}
