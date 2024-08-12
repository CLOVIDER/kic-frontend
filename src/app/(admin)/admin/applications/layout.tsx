import { StrictPropsWithChildren } from '@/type'

export default function Layout({ children }: StrictPropsWithChildren) {
  return (
    <section className="flex justify-center items-center">
      {children}
    </section>
  )
}
