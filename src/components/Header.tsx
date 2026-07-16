import { ToggleLeftIcon, ToggleRightIcon } from "lucide-react";
import AppText from "./AppText";
import { NavLink } from "react-router-dom";

interface IProps {
  isDark: boolean
  setIsDark: (val: boolean) => void
}
const Header = ({ isDark, setIsDark }: IProps) => {
  // const themeStatus = useContext(ThemeContext);
  return (
    <nav className="flex justify-between ">
      <NavLink to="/">

        <AppText
          className="underline text-indigo-500 text-4xl decoration-0 cursor-pointer"
          text="Bit-Todos"
        />
      </NavLink>
      <div className="flex gap-5 justify-center items-center">
        <NavLink to="/users">
          <AppText
            className="underline text-indigo-500 text-2xl decoration-0 cursor-pointer"
            text="Users"
          />
        </NavLink>
        {isDark ? (
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
    </nav>
  );
};

export default Header;
