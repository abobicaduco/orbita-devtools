"use client";
import { useState } from "react";
import { Result, ActionButton, Field, Status } from "./_ui";
import {
  generateCPF, isValidCPF, generateCNPJ, isValidCNPJ, generatePIS, isValidPIS,
} from "@/lib/cpf-cnpj";
import { generatePerson, type FakePerson } from "@/lib/generators";
import { CopyButton } from "@/components/CopyButton";

function GenView({ gen }: { gen: (fmt: boolean) => string }) {
  const [value, setValue] = useState("");
  const [fmt, setFmt] = useState(true);
  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 text-sm text-muted">
        <input type="checkbox" checked={fmt} onChange={(e) => setFmt(e.target.checked)} className="accent-primary" />
        Formatado (com pontuação)
      </label>
      <ActionButton onClick={() => setValue(gen(fmt))}>Gerar</ActionButton>
      {value && <Result value={value} />}
    </div>
  );
}

function ValView({ validate, format }: { validate: (v: string) => boolean; format: string }) {
  const [input, setInput] = useState("");
  const trimmed = input.trim();
  return (
    <div className="space-y-4">
      <Field label={`Digite o ${format}`}>
        <input className="input font-mono" value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Ex.: ${format}`} />
      </Field>
      {trimmed && <Status ok={validate(trimmed)}>{validate(trimmed) ? `${format} válido` : `${format} inválido`}</Status>}
    </div>
  );
}

export const CpfGen = () => <GenView gen={generateCPF} />;
export const CpfVal = () => <ValView validate={isValidCPF} format="CPF" />;
export const CnpjGen = () => <GenView gen={generateCNPJ} />;
export const CnpjVal = () => <ValView validate={isValidCNPJ} format="CNPJ" />;
export const PisGen = () => <GenView gen={generatePIS} />;

export function PessoaGen() {
  const [p, setP] = useState<FakePerson | null>(null);
  const rows: [string, keyof FakePerson][] = [
    ["Nome", "nome"], ["E-mail", "email"], ["Telefone", "telefone"],
    ["Endereço", "endereco"], ["Cidade", "cidade"], ["Nascimento", "nascimento"],
  ];
  return (
    <div className="space-y-4">
      <ActionButton onClick={() => setP(generatePerson())}>Gerar pessoa</ActionButton>
      {p && (
        <div className="card divide-y divide-white/10">
          {rows.map(([label, key]) => (
            <div key={key} className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="min-w-0">
                <p className="label-hud">{label}</p>
                <p className="truncate font-mono text-sm text-white">{p[key]}</p>
              </div>
              <CopyButton value={p[key]} label="" />
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-muted">Dados 100% fictícios e aleatórios, apenas para testes.</p>
    </div>
  );
}
