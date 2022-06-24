import Image from "next/image";

const ImageByNextTag = ({ url }: { url: string }) => {
  return <Image src={url} layout="fill" objectFit="cover" />;
};

const ImageByNativeImageTag = ({ url }: { url: string }) => {
  return (
    <img
      src={url}
      style={{ objectFit: "cover", overflow: "hidden" }}
      className="w-full h-full"
    />
  );
};

const ImageProvider = ({ url }: { url: string }) => {
  const imageUrl = process.env.NEXT_PUBLIC_CONFIG_IMAGE_HOST + encodeURI(url);
  if (process.env.NEXT_PUBLIC_ALL_IMAGE_PROVIDER === "native")
    return <ImageByNativeImageTag url={imageUrl} />;
  return <ImageByNextTag url={imageUrl} />;
};

export default ImageProvider;
