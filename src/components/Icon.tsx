interface IProps {
  imageUrl: string;
  className: string;
  imageAlt: string;
}
const Icon = ({ imageAlt, className, imageUrl }: IProps) => {
  return (
    <div>
      <img className={className} src={imageUrl} alt={imageAlt} />
    </div>
  );
};

export default Icon;
