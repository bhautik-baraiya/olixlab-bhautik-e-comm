import LayoutWrapper from "@/components/user/layout-wrapper";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}