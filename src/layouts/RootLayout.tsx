import { Outlet } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout() {
  return (
    <div className="min-h-screen">
      <Outlet />
      <Toaster />
    </div>
  );
}
