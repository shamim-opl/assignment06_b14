import Image from "next/image";
import Link from "next/link";

export default function Logo({ className = "" }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2 font-display text-lg font-bold tracking-wide text-foreground ${className}`}
    >
      <Image src="/logo.png" alt="FitLog logo" width={24} height={24} priority />
      FITLOG
    </Link>
  );
}
