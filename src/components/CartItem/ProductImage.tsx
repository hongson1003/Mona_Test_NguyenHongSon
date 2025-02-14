interface IProductImageProps {
  src: string;
  alt: string;
}

const ProductImage = ({ src, alt }: IProductImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      width={60}
      height={60}
      style={{ borderRadius: 8 }}
    />
  );
};

export default ProductImage;
