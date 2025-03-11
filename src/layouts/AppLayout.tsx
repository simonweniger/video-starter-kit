import { Outlet } from "@tanstack/react-router";

export default function AppLayout() {
  return (
    <div className="antialiased dark">
      <Outlet />
    </div>
  );
}
