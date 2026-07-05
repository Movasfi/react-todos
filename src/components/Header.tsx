import { ToggleLeftIcon, ToggleRightIcon } from "lucide-react";
import AppText from "./AppText";
import { useEffect, useContext } from "react";
import { ThemeContext } from "../App";
interface IProps {
  setIsDark: (val: boolean) => void;
}

const Header = ({ setIsDark }: IProps) => {
  const themeStatus = useContext(ThemeContext);
  return (
    <div className="flex justify-between ">
      <a href="/">
        <AppText
          className="underline-0 text-indigo-500 text-4xl decoration-0 cursor-pointer"
          text="Bit-Todos"
        />
      </a>
      {themeStatus ? (
        <ToggleRightIcon
          className="cursor-pointer"
          onClick={() => {
            setIsDark(false);
          }}
          size={40}
        />
      ) : (
        <ToggleLeftIcon
          className="cursor-pointer"
          onClick={() => {
            setIsDark(true);
          }}
          size={40}
        />
      )}
    </div>
  );
};

export default Header;
