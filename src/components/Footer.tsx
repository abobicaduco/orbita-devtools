import Link from "next/link";
import { Icon } from "./Icon";
import { siteConfig } from "@/site.config";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-space/60">
      <div className="container-page grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-nebula">
              <Icon name="Rocket" className="h-4 w-4 text-white" />
            </span>
            <span className="font-display text-base font-bold">{siteConfig.name}</span>
          </div>
          <p className="text-sm text-muted">{siteConfig.tagline}. Open source e sem coletar dados.</p>
        </div>

        <div className="space-y-2">
          <p className="label-hud">Navegar</p>
          <FooterLink href="/ferramentas">Ferramentas</FooterLink>
          <FooterLink href="/onibus-mogi">Ônibus de Mogi</FooterLink>
          <FooterLink href="/ofertas">Ofertas</FooterLink>
          <FooterLink href="/projetos">Projetos</FooterLink>
          <FooterLink href="/sobre">Sobre</FooterLink>
          <FooterLink href="/contato">Contato</FooterLink>
        </div>

        <div className="space-y-2">
          <p className="label-hud">Legal</p>
          <FooterLink href="/privacidade">Privacidade</FooterLink>
          <FooterLink href="/termos">Termos de uso</FooterLink>
        </div>

        <div className="space-y-2">
          <p className="label-hud">Projeto</p>
          <a href={siteConfig.repo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted hover:text-white">
            <Icon name="Github" className="h-4 w-4" /> GitHub
          </a>
          <a href={siteConfig.repo.gitlab} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted hover:text-white">
            <Icon name="Gitlab" className="h-4 w-4" /> GitLab
          </a>
          <a href={siteConfig.author.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted hover:text-white">
            <Icon name="ExternalLink" className="h-4 w-4" /> LinkedIn
          </a>
          <p className="pt-2 text-sm text-muted">
            Apoie o projeto — doações via PIX (chave aleatória):
            <span className="mt-1 block break-all font-mono text-xs text-primary">{siteConfig.pixDoacoes}</span>
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Licença MIT.</p>
          <p>Feito por {siteConfig.author.name} (caducosilva).</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="block text-sm text-muted hover:text-white">
      {children}
    </Link>
  );
}
