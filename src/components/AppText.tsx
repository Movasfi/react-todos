import type { ButtonHTMLAttributes } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLElement> {
  text: string;
  className: string;
}
const AppText = ({ className, text, ...rest }: IProps) => {
  return (
    <p {...rest} className={className}>
      {text}
    </p>
  );
};

export default AppText;
