export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <main className="h-full w-full">{children}</main>
}
