import TopNav from "@/components/TopNav";

export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNav />

      <main className="mx-2 2xl:mx-auto max-w-[1440px] 2xl:max-w-[1600px] min-h-[1024px] py-4">
        {children}
      </main>
    </div>
  );
}
