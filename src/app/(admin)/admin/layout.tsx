import { PropsWithChildren } from 'react';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'notice (admin)',
  description: 'notice list page for administrator',
}

type LayoutProps = PropsWithChildren<{}>;

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="h-full flex justify-center items-center">{children}</main>
  )
}
