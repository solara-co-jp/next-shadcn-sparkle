import NextImage from "next/image";
import { cn } from "@/lib/utils";

export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  aspectRatio?: string;
  rounded?: boolean;
  fill?: boolean;
  className?: string;
}

function Image({
  src,
  alt,
  width,
  height,
  aspectRatio,
  rounded = false,
  fill = false,
  className,
}: ImageProps) {
  return (
    <div
      className={cn(
        "overflow-hidden",
        rounded && "rounded-sp-modal",
        fill && "relative",
        className
      )}
      style={{
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
        aspectRatio,
      }}
    >
      {fill ? (
        <NextImage
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      ) : (
        <NextImage
          src={src}
          alt={alt}
          width={width ?? 0}
          height={height ?? 0}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}

export { Image };
