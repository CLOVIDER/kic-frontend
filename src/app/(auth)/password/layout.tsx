import type { StrictPropsWithChildren } from '@/type'

export default function Layout({ children }: StrictPropsWithChildren) {
  return (
    <section className="w-full h-full flex justify-center items-center gap-40">
      {children}
    </section>
  )
}
