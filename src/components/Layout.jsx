import TopNav from "@/components/TopNav";

export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNav />

      <main className="mx-auto max-w-[1440px] min-h-[1024px] px-6 py-8">
        {children}
      </main>
    </div>
  );
}
