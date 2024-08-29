"use client";
import Link from "next/link";
import { SettingsIcon } from "../../../public/assets/icons/settingsIcon";
import { Theme } from "../theme/Theme";
import { useNavbar } from "./useNavbar";

export const Navbar = () => {
  const { theme } = useNavbar();
  return (
    <div className={` bg-${theme}Background bg-dotted-pattern bg-dotted-size `}>
      <div
        className={`flex h-fit justify-between items-center  backdrop-blur-[3px] `}
      >
        <Theme />
        <Link
          className={`text-${theme}Primary`}
          href={`/settings?theme=${theme}`}
        >
          <div className="p-[24px]">
            <SettingsIcon />
          </div>
        </Link>
      </div>
    </div>
  );
};
