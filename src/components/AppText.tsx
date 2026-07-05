interface IProps {
  text: string;
  className: string;
}
const AppText = ({ className, text }: IProps) => {
  return <p className={className}>{text}</p>;
};

export default AppText;
