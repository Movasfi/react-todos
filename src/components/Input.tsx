import type { InputHTMLAttributes, RefObject } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  className: string;
  label?: string;
  ref?: RefObject<HTMLInputElement | null>;
}
const Input = ({ ref, className, label, ...rest }: IProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p>{label}</p>
      <input ref={ref} {...rest} className={className} />
    </div>
  );
};

export default Input;
