import Image from "next/image";

const ImageByNextTag = ({ url }: { url: string }) => {
  return (
    <Image
      src={url}
      layout="fixed"
      objectFit="cover"
      className="w-full h-full"
    />
  );
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
  const imageUrl = "/uploads" + encodeURI(url);
  if (process.env.NEXT_PUBLIC_ALL_IMAGE_PROVIDER === "native")
    return <ImageByNativeImageTag url={imageUrl} />;
  if (process.env.NEXT_PUBLIC_ALL_IMAGE_PROVIDER === "next")
    return <ImageByNextTag url={imageUrl} />;

  throw Error("process.env.NEXT_PUBLIC_ALL_IMAGE_PROVIDER is not defined");
};

export default ImageProvider;
