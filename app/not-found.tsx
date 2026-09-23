import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm text-muted-foreground">
        <span className="text-accent">{"//"}</span> this route never shipped
      </p>
      <h1 className="mt-4 font-mono text-7xl font-bold tracking-tighter text-foreground md:text-9xl">
        4<span className="text-accent">0</span>4
      </h1>
      <p className="mt-4 max-w-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist — maybe the work you want is on the{" "}
        <Link href="/#work" className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
          homepage
        </Link>
        .
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-hover"
      >
        Back home
      </Link>
    </main>
  );
}
