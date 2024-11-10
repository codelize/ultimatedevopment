import React from 'react';
import Link from 'next/link';

type ButtonHomeProps = {
  children: React.ReactNode;
  href: string;
};

export default function ButtonHome({ children, href }: ButtonHomeProps) {
  return (
    <Link href={href} className="button-home w-full h-12 flex items-center justify-center max-w-xs">
      {children}
    </Link>
  );
}
