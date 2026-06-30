import {
  IdCard, ShieldCheck, Building2, BadgeCheck, UserRound, Fingerprint,
  KeyRound, Type, QrCode, Braces, Binary, Link2, Hash, FileKey, Palette,
  Clock, Calculator, CaseSensitive, Regex, Search, Menu, X, Copy, Check,
  Github, Gitlab, Rocket, Bus, Tag, Shield, ArrowRight, ExternalLink,
  Sparkles, RefreshCw, Download, ChevronRight, Wrench, Lock, Zap,
  type LucideProps,
} from "lucide-react";

const MAP = {
  IdCard, ShieldCheck, Building2, BadgeCheck, UserRound, Fingerprint,
  KeyRound, Type, QrCode, Braces, Binary, Link2, Hash, FileKey, Palette,
  Clock, Calculator, CaseSensitive, Regex, Search, Menu, X, Copy, Check,
  Github, Gitlab, Rocket, Bus, Tag, Shield, ArrowRight, ExternalLink,
  Sparkles, RefreshCw, Download, ChevronRight, Wrench, Lock, Zap,
} as const;

export type IconName = keyof typeof MAP;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = MAP[name as IconName] ?? Wrench;
  return <Cmp {...props} />;
}
