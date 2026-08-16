import Image from "next/image";
import { profile, type PersonalIpAssets } from "@/data/profile";

type PersonalIpImageVariant = Exclude<keyof PersonalIpAssets, "heroFrames">;

type PersonalIPProps = {
  variant: PersonalIpImageVariant;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function PersonalIP({
  variant,
  className,
  priority = false,
  sizes,
}: PersonalIPProps) {
  return (
    <Image
      alt={profile.assets.personalIpAlt}
      className={className}
      height={256}
      priority={priority}
      sizes={sizes}
      src={profile.assets.personalIp[variant]}
      width={256}
    />
  );
}
