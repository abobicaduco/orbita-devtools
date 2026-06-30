import Link from "next/link";
import { Icon } from "@/components/Icon";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <p className="font-display text-7xl font-bold gradient-text">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold">Perdido no espaço</h1>
      <p className="mt-2 max-w-md text-muted">Esta página saiu de órbita ou nunca existiu.</p>
      <Link href="/" className="btn-primary mt-6"><Icon name="Rocket" className="h-4 w-4" /> Voltar ao início</Link>
    </div>
  );
}
