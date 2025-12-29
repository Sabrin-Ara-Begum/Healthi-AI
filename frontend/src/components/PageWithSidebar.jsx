import AppSidebar from "./AppSidebar";

export default function PageWithSidebar({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AppSidebar />
      <main className="flex-1 px-8 py-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
