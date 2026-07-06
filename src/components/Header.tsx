import { ToggleLeftIcon, ToggleRightIcon } from "lucide-react";
import AppText from "./AppText";
import { useContext } from "react";
import { ThemeContext } from "../customHooks/ThemeContext";
interface IProps {
  setIsDark: (val: boolean) => void;
}

const Header = ({ setIsDark }: IProps) => {
  const themeStatus = useContext(ThemeContext);
  return (
    <div className="flex justify-between ">
      <a href="/">
        <AppText
          className="underline text-indigo-500 text-4xl decoration-0 cursor-pointer"
          text="Bit-Todos"
        />
      </a>
      {themeStatus ? (
        <ToggleRightIcon
          onClick={() => {
            setIsDark(false);
          }}
          size={40}
        />
      ) : (
        <ToggleLeftIcon
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
