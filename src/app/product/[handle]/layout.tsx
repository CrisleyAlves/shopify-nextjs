export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="container p-5 md:pt-0 xl:pt-5">{children}</div>;
}
