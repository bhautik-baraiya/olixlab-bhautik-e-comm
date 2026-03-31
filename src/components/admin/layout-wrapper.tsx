import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function AdminLayout({
  children,
  title = "Dashboard",
  subtitle,
}: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-[#080A0F] font-syne">
      <Sidebar />
      <div className="ml-[240px] flex flex-col min-h-screen">
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
