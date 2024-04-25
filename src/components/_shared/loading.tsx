import React from "react";
import Image from "next/image";

interface LoadingProps {
  size?: number;
}

export default function Loading({ size = 50 }: LoadingProps) {
  return (
    <div className="flex justify-center items-center mx-auto w-full h-full ">
      <Image
        src="/loadinglogo.svg"
        alt="loading"
        width={size}
        height={size}
        className="animate-spin duration-[650ms] transition-all"
      />
    </div>
  );
}
