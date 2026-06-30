"use client";
import { CpfGen, CpfVal, CnpjGen, CnpjVal, PisGen, PessoaGen } from "./brasil";
import { UuidGen, SenhaGen, LoremGen, QrGen } from "./geradores";
import { JsonFmt, Base64Tool, UrlTool, ContadorTool, CaseTool, RegexTool } from "./texto";
import { HashTool, JwtTool } from "./seguranca";
import { CoresTool, BaseTool, TimestampTool } from "./conversores";
import { CartaoGen, TemperaturaTool, NumeroGen, BinarioTool, RomanosTool, DatasTool } from "./extras";

const MAP: Record<string, React.ComponentType> = {
  "gerador-cpf": CpfGen,
  "validador-cpf": CpfVal,
  "gerador-cnpj": CnpjGen,
  "validador-cnpj": CnpjVal,
  "gerador-pis": PisGen,
  "gerador-pessoa": PessoaGen,
  "gerador-uuid": UuidGen,
  "gerador-senha": SenhaGen,
  "gerador-lorem": LoremGen,
  "gerador-qrcode": QrGen,
  "json-formatter": JsonFmt,
  "base64": Base64Tool,
  "url-encoder": UrlTool,
  "hash": HashTool,
  "jwt-decoder": JwtTool,
  "conversor-cores": CoresTool,
  "conversor-base": BaseTool,
  "conversor-timestamp": TimestampTool,
  "contador-texto": ContadorTool,
  "case-converter": CaseTool,
  "regex-tester": RegexTool,
  "gerador-cartao": CartaoGen,
  "conversor-temperatura": TemperaturaTool,
  "gerador-numero": NumeroGen,
  "texto-binario": BinarioTool,
  "numeros-romanos": RomanosTool,
  "calculadora-datas": DatasTool,
};

export function ToolRenderer({ slug }: { slug: string }) {
  const Cmp = MAP[slug];
  if (!Cmp) return <p className="text-muted">Ferramenta não encontrada.</p>;
  return <Cmp />;
}
