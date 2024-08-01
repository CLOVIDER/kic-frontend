import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section className="w-full h-full flex justify-center items-center gap-40">
      {children}
    </section>
  )
}
