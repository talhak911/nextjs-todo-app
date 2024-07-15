"use client";
import Link from "next/link";
import { SettingsIcon } from "../../../public/assets/icons/settingsIcon";
import { Theme } from "../theme/Theme";
import { useNavbar } from "./useNavbar";

export const Navbar = () => {
  const { theme } = useNavbar();
  return (
    <div className={`bg-${theme}Background bg-dotted-pattern bg-dotted-size `}>
      <div
        className={`flex justify-between items-center  backdrop-blur-[2px] px-6 py-4`}
      >
        <Theme />
        <div className="w-fit">
          <Link
            className={`text-${theme}Primary `}
            href={`/settings?theme=${theme}`}
          >
            <SettingsIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};
