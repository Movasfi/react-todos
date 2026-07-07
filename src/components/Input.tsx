import type { InputHTMLAttributes, RefObject } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  className: string;
  label?: string;
  ref?: RefObject<HTMLInputElement | null>;
}
const Input = ({ ref, className, label, ...rest }: IProps) => {
  return <input ref={ref} {...rest} className={className} />;
};

export default Input;
