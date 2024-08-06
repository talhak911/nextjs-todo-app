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
      className={`bg-${theme}Background bg-dotted-pattern bg-dotted-size min-h-screen pt-10 pb-10  h-fit w-full text-${theme}Primary`}
    >
      <div
        className={`flex justify-between px-3 md:px-40 py-2 text-${theme}Primary`}
      >
        <BackButton />
        <SignOut>
          <LogoutIcon />
        </SignOut>
      </div>

      <div className="flex flex-col items-center gap-5 ">
        <h1 className="font-bold text-4xl font-stint">
          Settings <span className={`-ml-1 text-${theme}Accent`}>.</span>
        </h1>
        <Profile theme={theme} />
      </div>
    </div>
  );
}
