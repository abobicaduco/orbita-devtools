import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import { TOOLS, getTool } from "@/lib/tools-meta";
import { ToolRenderer } from "@/tools";
import { ToolCard } from "@/components/ToolCard";
import { AdSlot } from "@/components/AdSlot";
import { Icon } from "@/components/Icon";
import { buildMetadata, toolJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  return buildMetadata({
    title: tool.name,
    description: tool.description,
    path: `/ferramentas/${tool.slug}`,
    keywords: tool.keywords,
  });
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const related = TOOLS.filter((t) => t.category === tool.category && t.slug !== tool.slug).slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <Script id="ld-tool" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd(tool.name, tool.description, `/ferramentas/${tool.slug}`)) }} />
      <Script id="ld-bread" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([
        { name: "Início", path: "/" },
        { name: "Ferramentas", path: "/ferramentas" },
        { name: tool.name, path: `/ferramentas/${tool.slug}` },
      ])) }} />

      <nav className="flex items-center gap-1.5 text-sm text-muted">
        <Link href="/ferramentas" className="hover:text-white">Ferramentas</Link>
        <Icon name="ChevronRight" className="h-4 w-4" />
        <span className="text-white">{tool.name}</span>
      </nav>

      <header className="flex items-start gap-4">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-white/10 bg-base/60 text-primary-glow">
          <Icon name={tool.icon} className="h-7 w-7" />
        </span>
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">{tool.name}</h1>
          <p className="mt-1 text-muted">{tool.short}</p>
        </div>
      </header>

      <div className="card p-5 sm:p-6">
        <ToolRenderer slug={tool.slug} />
      </div>

      <AdSlot />

      <section className="prose-sm space-y-2 text-sm leading-relaxed text-muted">
        <h2 className="font-display text-lg font-semibold text-white">Sobre o {tool.name}</h2>
        <p>{tool.description}</p>
        <p>
          Esta ferramenta roda inteiramente no seu navegador: <strong className="text-white">nenhum dado é enviado
          ou armazenado</strong>. O código é aberto — você pode auditá-lo e contribuir no repositório.
        </p>
      </section>

      {related.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-display text-lg font-semibold">Relacionadas</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((t) => <ToolCard key={t.slug} tool={t} />)}
          </div>
        </section>
      )}
    </article>
  );
}
