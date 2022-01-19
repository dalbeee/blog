import Image from "next/image";
import { FC } from "react";

const ImageByNextTag: FC<{ url: string }> = ({ url }) => {
  return (
    <Image
      src={url}
      objectFit="contain"
      layout="fill"
      className="w-full h-full"
    />
  );
};

const ImageByNativeImageTag: FC<{ url: string }> = ({ url }) => {
  return (
    <img
      src={url}
      style={{ objectFit: "cover", overflow: "hidden" }}
      className="w-full h-full"
    />
  );
};

const ImageProvider: FC<{ url: string }> = ({ url }) => {
  const host =
    process.env.NEXT_PUBLIC_ALL_IMAGE_PROVIDER === "next"
      ? process.env.NEXT_PUBLIC_ALL_HTTP_SCHEMA +
        process.env.NEXT_PUBLIC_CONFIG_IMAGE_HOST
      : "";
  const imageUrl =
    host + process.env.NEXT_PUBLIC_ALL_STATIC_URL + encodeURI(url);

  if (process.env.NEXT_PUBLIC_ALL_IMAGE_PROVIDER === "native")
    return <ImageByNativeImageTag url={imageUrl} />;
  if (process.env.NEXT_PUBLIC_ALL_IMAGE_PROVIDER === "next")
    return <ImageByNextTag url={imageUrl} />;

  throw Error("process.env.NEXT_PUBLIC_ALL_STATIC_URL is not defined");
};

export default ImageProvider;
