/**
 * Conteúdo editorial por ferramenta — parágrafos, passo a passo e FAQ.
 * Texto único por página (SEO / política de conteúdo do AdSense).
 * Renderizado em /ferramentas/[slug] junto com FAQPage JSON-LD.
 */
export interface ToolContent {
  /** Parágrafos explicando o que é e quando usar. */
  about: string[];
  /** Passo a passo de uso. */
  howTo: string[];
  /** Perguntas frequentes específicas da ferramenta. */
  faq: { q: string; a: string }[];
}

export const TOOL_CONTENT: Record<string, ToolContent> = {
  "gerador-cpf": {
    about: [
      "O CPF (Cadastro de Pessoas Físicas) tem 11 dígitos, e os dois últimos são dígitos verificadores calculados por módulo 11 a partir dos nove primeiros. Este gerador cria números matematicamente válidos — ou seja, que passam na validação de formulários — mas que são fictícios e não pertencem a nenhuma pessoa real.",
      "Ele é útil para desenvolvedores e QAs que precisam testar cadastros, integrações e máscaras de input sem usar dados reais, o que inclusive é uma boa prática exigida pela LGPD em ambientes de teste. Você pode gerar com ou sem pontuação e escolher o estado (a nona posição do CPF indica a região fiscal).",
    ],
    howTo: [
      "Escolha se quer o resultado com máscara (000.000.000-00) ou só números.",
      "Clique em Gerar — o número é criado localmente no seu navegador.",
      "Use o botão de copiar para colar no seu formulário ou teste automatizado.",
    ],
    faq: [
      { q: "O CPF gerado é de uma pessoa real?", a: "Não. O número é sorteado aleatoriamente e apenas os dígitos verificadores são calculados para que ele seja estruturalmente válido. Qualquer coincidência com um CPF emitido pela Receita Federal é acidental — a ferramenta não consulta nenhuma base de dados." },
      { q: "Posso usar o CPF gerado para me cadastrar em serviços?", a: "Não. Usar CPF fictício em cadastros reais pode configurar fraude (art. 299 do Código Penal — falsidade ideológica). A ferramenta destina-se exclusivamente a testes de software, protótipos e demonstrações." },
      { q: "Como o dígito verificador é calculado?", a: "Cada um dos dois dígitos finais é o resultado de uma soma ponderada dos dígitos anteriores, módulo 11. Se o resto for 0 ou 1, o dígito é 0; caso contrário, é 11 menos o resto. É o mesmo algoritmo usado por sistemas bancários e pela Receita." },
    ],
  },
  "validador-cpf": {
    about: [
      "Este validador confere se um número de CPF é estruturalmente válido: verifica o tamanho, rejeita sequências repetidas (como 111.111.111-11) e recalcula os dois dígitos verificadores pelo algoritmo oficial de módulo 11.",
      "Importante: validade estrutural não significa que o CPF existe ou está regular na Receita Federal — isso só a consulta oficial no site da Receita pode dizer. A ferramenta é ideal para depurar validações de formulário, higienizar bases de teste e conferir números digitados manualmente.",
    ],
    howTo: [
      "Cole ou digite o CPF no campo — com ou sem pontos e traço.",
      "A validação acontece em tempo real, no seu navegador.",
      "Veja o resultado: válido (dígitos conferem) ou inválido (estrutura errada).",
    ],
    faq: [
      { q: "O validador diz se o CPF está ativo na Receita?", a: "Não. Ele confere apenas a matemática dos dígitos verificadores. Situação cadastral (regular, suspenso, cancelado) só pode ser consultada no portal oficial da Receita Federal." },
      { q: "Por que 111.111.111-11 é rejeitado se os dígitos conferem?", a: "Sequências de dígitos idênticos passam na conta do módulo 11, mas são bloqueadas por convenção — a Receita nunca emite CPFs assim, e todo validador sério as rejeita." },
      { q: "Meu CPF digitado aqui fica salvo em algum lugar?", a: "Não. A validação roda 100% em JavaScript no seu navegador; nenhum dado é enviado a servidores, registrado em logs ou armazenado." },
    ],
  },
  "gerador-cnpj": {
    about: [
      "O CNPJ (Cadastro Nacional da Pessoa Jurídica) tem 14 dígitos: oito de raiz, quatro de ordem (geralmente 0001, a matriz) e dois verificadores calculados por módulo 11. Este gerador produz números com dígitos verificadores corretos, prontos para passar em validações de formulário.",
      "É a forma segura de testar cadastros de empresas, integrações com ERPs e emissão de notas em homologação sem expor o CNPJ de uma empresa real. Tudo é gerado localmente, sem consultas externas.",
    ],
    howTo: [
      "Escolha o formato: com máscara (00.000.000/0001-00) ou apenas dígitos.",
      "Clique em Gerar para criar um CNPJ fictício válido.",
      "Copie o resultado e use no seu ambiente de teste.",
    ],
    faq: [
      { q: "O CNPJ gerado pertence a alguma empresa?", a: "Não. A raiz é aleatória e apenas os dígitos verificadores são calculados. A ferramenta não consulta a base da Receita Federal, e qualquer coincidência é acidental." },
      { q: "Posso emitir nota fiscal de teste com esse CNPJ?", a: "Somente em ambientes de homologação que aceitam dados fictícios. Em produção, usar CNPJ inexistente é irregular e será rejeitado pelos sistemas da SEFAZ." },
      { q: "Qual a diferença entre matriz e filial no número?", a: "Os quatro dígitos após a barra indicam o estabelecimento: 0001 costuma ser a matriz e 0002 em diante, as filiais. A raiz de oito dígitos identifica a empresa em si." },
    ],
  },
  "validador-cnpj": {
    about: [
      "Este validador verifica se um CNPJ é estruturalmente correto: 14 dígitos, sequências repetidas bloqueadas e os dois dígitos verificadores recalculados pelo algoritmo oficial com pesos 2 a 9.",
      "Use-o para depurar regras de validação no seu sistema, conferir números recebidos em planilhas e detectar erros de digitação antes de consultar a situação cadastral na Receita Federal.",
    ],
    howTo: [
      "Cole o CNPJ no campo, com ou sem pontuação.",
      "A conferência dos dígitos acontece instantaneamente no navegador.",
      "Resultado válido significa estrutura correta — confirme a situação cadastral na Receita se precisar.",
    ],
    faq: [
      { q: "CNPJ válido aqui significa empresa ativa?", a: "Não. A ferramenta valida a matemática do número. Para saber se a empresa existe e está ativa, consulte o cartão CNPJ no site da Receita Federal." },
      { q: "O validador funciona para o novo CNPJ alfanumérico?", a: "O formato alfanumérico anunciado pela Receita (a partir de 2026) usa letras na raiz e um cálculo adaptado. Esta ferramenta valida o formato numérico tradicional de 14 dígitos, que continua aceito." },
      { q: "Meus dados são enviados a algum servidor?", a: "Não. Todo o processamento é local, no seu navegador. Nada é armazenado ou transmitido." },
    ],
  },
  "gerador-pis": {
    about: [
      "O PIS/PASEP (ou NIS) tem 11 dígitos, sendo o último um verificador calculado por módulo 11 com pesos fixos. É o número usado para abono salarial, FGTS e outros benefícios trabalhistas.",
      "Este gerador cria números fictícios estruturalmente válidos para testar sistemas de RH, folha de pagamento e integrações com o eSocial em ambiente de desenvolvimento — sem usar o PIS de um trabalhador real.",
    ],
    howTo: [
      "Clique em Gerar para criar um número PIS/PASEP fictício.",
      "Escolha copiar com ou sem a máscara padrão (000.00000.00-0).",
      "Use apenas em ambientes de teste e homologação.",
    ],
    faq: [
      { q: "O número gerado dá direito a algum benefício?", a: "Não. É um número matematicamente válido porém fictício — não está registrado na Caixa Econômica nem no sistema do PIS/PASEP." },
      { q: "PIS, PASEP e NIS são a mesma coisa?", a: "O número é o mesmo (11 dígitos, mesmo algoritmo). PIS é para empregados do setor privado, PASEP para servidores públicos, e NIS é o termo genérico usado pela Caixa." },
      { q: "Para que testar com PIS fictício?", a: "Sistemas de folha, admissão digital e eSocial validam o dígito verificador do PIS. Testar com números reais de funcionários viola a LGPD; números fictícios válidos resolvem isso." },
    ],
  },
  "gerador-pessoa": {
    about: [
      "Popular banco de testes com dados realistas é uma das tarefas mais repetitivas do desenvolvimento. Este gerador cria perfis completos de pessoas fictícias — nome, e-mail, telefone, endereço, CPF válido e mais — prontos para usar em seeds, mocks e demonstrações.",
      "Todos os dados são inventados na hora, no seu navegador: os nomes vêm de listas de nomes comuns no Brasil, os endereços são plausíveis mas fictícios e o CPF é válido apenas na estrutura. Nenhuma informação corresponde a uma pessoa real.",
    ],
    howTo: [
      "Clique em Gerar pessoa para criar um perfil fictício completo.",
      "Copie os campos que precisar — individualmente ou o registro todo.",
      "Gere quantos perfis quiser; cada clique cria dados novos e aleatórios.",
    ],
    faq: [
      { q: "Os dados gerados são de pessoas reais?", a: "Não. Nomes, e-mails, telefones e endereços são combinações aleatórias de listas fictícias. A ferramenta não consulta nenhuma base de dados real." },
      { q: "Posso usar esses dados em produção?", a: "Não é recomendado. Eles servem para desenvolvimento, testes e demonstrações. Cadastrar dados fictícios em serviços reais pode violar os termos de uso do serviço." },
      { q: "Por que não usar dados reais anonimizados em testes?", a: "A LGPD considera arriscado usar dados pessoais reais fora de produção, mesmo 'anonimizados' — reidentificação é comum. Dados sintéticos eliminam o risco por completo." },
    ],
  },
  "gerador-uuid": {
    about: [
      "UUID (Universally Unique Identifier) é um identificador de 128 bits padronizado pela RFC 4122, escrito como 32 caracteres hexadecimais em cinco grupos (ex.: 550e8400-e29b-41d4-a716-446655440000). A versão 4, gerada aqui, é totalmente aleatória — a chance de colisão é desprezível na prática.",
      "UUIDs são usados como chave primária em bancos distribuídos, IDs de requisição, nomes de arquivo únicos e correlação de logs. Esta ferramenta usa a API crypto.randomUUID() do navegador, com aleatoriedade criptográfica.",
    ],
    howTo: [
      "Defina quantos UUIDs quer gerar de uma vez.",
      "Clique em Gerar — cada UUID v4 é criado com aleatoriedade criptográfica.",
      "Copie um UUID individual ou a lista inteira.",
    ],
    faq: [
      { q: "Dois UUIDs v4 podem ser iguais?", a: "Teoricamente sim, na prática não: são 122 bits aleatórios, o que dá cerca de 5,3×10³⁶ combinações. Você precisaria gerar bilhões por segundo durante séculos para ter chance relevante de colisão." },
      { q: "Qual a diferença entre UUID v4 e v7?", a: "O v4 é 100% aleatório; o v7 (mais recente) embute um timestamp no início, o que o torna ordenável por tempo — melhor para índices de banco de dados. Para a maioria dos usos, v4 continua padrão." },
      { q: "UUID é seguro para usar como token de autenticação?", a: "Um UUID v4 gerado com aleatoriedade criptográfica tem entropia suficiente, mas tokens de sessão dedicados (com expiração e revogação) continuam sendo a prática recomendada." },
    ],
  },
  "gerador-senha": {
    about: [
      "Senhas fortes são a defesa mais barata contra invasão de contas. Este gerador cria senhas aleatórias usando a Web Crypto API do navegador (crypto.getRandomValues), a mesma classe de aleatoriedade usada em criptografia — nada de Math.random() previsível.",
      "Você controla o tamanho e os conjuntos de caracteres (maiúsculas, minúsculas, números, símbolos). A senha nunca sai do seu navegador: não é enviada, registrada nem armazenada em lugar nenhum.",
    ],
    howTo: [
      "Ajuste o tamanho da senha — 16 caracteres ou mais é o recomendado.",
      "Marque os conjuntos de caracteres que o serviço aceita.",
      "Clique em Gerar e copie a senha direto para o seu gerenciador de senhas.",
    ],
    faq: [
      { q: "Qual o tamanho ideal de uma senha?", a: "Hoje, 16+ caracteres aleatórios com letras, números e símbolos é um bom padrão. Comprimento importa mais que complexidade: cada caractere extra multiplica o custo de um ataque de força bruta." },
      { q: "É seguro gerar senha em um site?", a: "Aqui, sim: a geração usa a Web Crypto API e acontece inteiramente no seu dispositivo. O código é open source e pode ser auditado no GitHub. Ainda assim, guarde a senha em um gerenciador, não em texto plano." },
      { q: "Devo usar a mesma senha forte em vários serviços?", a: "Nunca. Se um serviço vazar, todos os outros ficam expostos (credential stuffing). Use uma senha única por serviço e um gerenciador de senhas para lembrá-las." },
    ],
  },
  "gerador-lorem": {
    about: [
      "Lorem Ipsum é o texto de preenchimento clássico da indústria gráfica, derivado de um texto de Cícero de 45 a.C. Ele permite avaliar tipografia e layout sem que o conteúdo real distraia o olhar.",
      "Este gerador cria parágrafos, frases ou palavras sob medida para mockups, protótipos, temas de CMS e testes de overflow de texto — direto no navegador, sem limites de uso.",
    ],
    howTo: [
      "Escolha a unidade: parágrafos, frases ou palavras.",
      "Defina a quantidade desejada.",
      "Clique em Gerar e copie o texto para o seu layout.",
    ],
    faq: [
      { q: "O Lorem Ipsum significa alguma coisa?", a: "É um latim embaralhado, derivado do 'De finibus bonorum et malorum' de Cícero. As palavras foram alteradas ao longo dos séculos e o texto não tem significado coerente — de propósito." },
      { q: "Por que não usar texto real no protótipo?", a: "Texto real chama atenção para o conteúdo e gera discussões prematuras sobre copy. O Lorem Ipsum mantém o foco no layout, espaçamento e hierarquia visual." },
      { q: "Posso usar em produto final?", a: "Não é recomendado — Lorem Ipsum esquecido em produção é um erro clássico. Use-o apenas em fases de design e desenvolvimento." },
    ],
  },
  "gerador-qrcode": {
    about: [
      "QR Code (Quick Response) é um código de barras bidimensional criado em 1994 pela Denso Wave, capaz de armazenar milhares de caracteres com correção de erros embutida — ele funciona mesmo parcialmente danificado.",
      "Este gerador transforma URLs, textos, contatos ou qualquer string em um QR Code baixável em PNG. A geração acontece inteiramente no seu navegador: o conteúdo do seu QR Code não passa por nenhum servidor.",
    ],
    howTo: [
      "Cole o link ou texto que o QR Code deve conter.",
      "O código é gerado na hora, com pré-visualização.",
      "Baixe a imagem PNG e use em impressos, telas ou apresentações.",
    ],
    faq: [
      { q: "O QR Code gerado expira?", a: "Não. QR Codes estáticos como estes codificam o conteúdo diretamente na imagem — funcionam para sempre. Apenas serviços de 'QR dinâmico' (que redirecionam por um servidor) podem expirar." },
      { q: "Quanto texto cabe em um QR Code?", a: "Até 4.296 caracteres alfanuméricos no nível de correção mais baixo. Na prática, quanto mais dados, mais denso o código — para leitura fácil em impressos, prefira URLs curtas." },
      { q: "Posso usar o QR Code comercialmente?", a: "Sim. A especificação do QR Code é aberta e livre de royalties, e a imagem gerada aqui é sua para qualquer uso." },
    ],
  },
  "json-formatter": {
    about: [
      "JSON (JavaScript Object Notation) é o formato padrão de troca de dados em APIs. Este formatador valida, indenta e minifica JSON no navegador, apontando erros de sintaxe com mensagens claras — vírgula sobrando, aspas erradas, chave sem fechar.",
      "Ideal para inspecionar respostas de API, depurar payloads de webhook e preparar fixtures de teste. Como o processamento é local, você pode colar dados sensíveis sem medo: nada é enviado a servidores.",
    ],
    howTo: [
      "Cole o JSON no campo de entrada.",
      "Clique em Formatar para indentar (ou Minificar para compactar).",
      "Se houver erro de sintaxe, a mensagem indica o problema para correção.",
    ],
    faq: [
      { q: "Por que meu JSON dá erro com aspas simples?", a: "A especificação JSON exige aspas duplas em chaves e strings. Aspas simples são válidas em JavaScript, mas não em JSON — é o erro mais comum ao colar objetos JS." },
      { q: "JSON aceita comentários?", a: "Não, o JSON puro não suporta comentários. Variantes como JSONC (usada no VS Code) aceitam, mas a maioria dos parsers rejeita. Remova comentários antes de validar." },
      { q: "É seguro colar dados de produção aqui?", a: "Sim. A formatação usa JSON.parse/JSON.stringify localmente no seu navegador; nenhum byte é transmitido. Ainda assim, evite compartilhar a tela com tokens visíveis." },
    ],
  },
  "base64": {
    about: [
      "Base64 é uma codificação que representa dados binários usando 64 caracteres ASCII imprimíveis. É onipresente: imagens embutidas em CSS (data URIs), anexos de e-mail (MIME), tokens JWT e headers de autenticação HTTP Basic.",
      "Esta ferramenta codifica e decodifica Base64 com suporte correto a UTF-8 (acentos e emojis não viram lixo). Atenção: Base64 é codificação, não criptografia — qualquer pessoa pode decodificar.",
    ],
    howTo: [
      "Cole o texto (para codificar) ou a string Base64 (para decodificar).",
      "Escolha a direção: Encode ou Decode.",
      "Copie o resultado com um clique.",
    ],
    faq: [
      { q: "Base64 serve para proteger senhas?", a: "Não! Base64 é reversível por qualquer um, instantaneamente — é codificação, não criptografia. Para proteger dados use criptografia real (AES) ou hashing com salt (bcrypt/argon2) para senhas." },
      { q: "Por que o Base64 aumenta o tamanho dos dados?", a: "Cada 3 bytes viram 4 caracteres, um acréscimo de ~33%. Por isso embutir imagens grandes em Base64 no HTML piora a performance — prefira arquivos externos." },
      { q: "O que significam os '=' no final?", a: "É padding: quando os dados não são múltiplos de 3 bytes, o Base64 completa com '=' para fechar o bloco de 4 caracteres. Um ou dois '=' no fim são normais." },
    ],
  },
  "url-encoder": {
    about: [
      "URLs só aceitam um conjunto limitado de caracteres. O percent-encoding (URL encoding) converte os demais — espaços, acentos, símbolos — em sequências %XX, garantindo que parâmetros cheguem intactos ao servidor.",
      "Esta ferramenta faz encode e decode de componentes de URL, útil para montar query strings à mão, depurar redirects e entender por que aquele parâmetro com '&' quebrou sua requisição.",
    ],
    howTo: [
      "Cole o texto ou a URL no campo de entrada.",
      "Escolha Encode (texto → %XX) ou Decode (%XX → texto).",
      "Copie o resultado para sua requisição ou código.",
    ],
    faq: [
      { q: "Qual a diferença entre encodeURI e encodeURIComponent?", a: "encodeURIComponent codifica tudo que tem significado especial em URL (?, &, =, /), ideal para valores de parâmetros. encodeURI preserva esses caracteres, servindo para URLs inteiras. Esta ferramenta usa a variante de componente, a mais comum." },
      { q: "Por que espaço vira %20 e às vezes '+'?", a: "%20 é o padrão do percent-encoding. O '+' só representa espaço no formato application/x-www-form-urlencoded (formulários HTML). Os dois coexistem por razões históricas." },
      { q: "Preciso codificar a URL inteira?", a: "Não — apenas os valores dinâmicos (parâmetros, segmentos de path com texto livre). Codificar a URL inteira duplamente é causa comum de bugs com %2520." },
    ],
  },
  "hash": {
    about: [
      "Funções de hash criptográfico transformam qualquer entrada em uma 'impressão digital' de tamanho fixo: mudou um bit da entrada, o hash muda completamente. São a base de verificação de integridade de arquivos, assinaturas digitais e armazenamento de senhas.",
      "Esta ferramenta calcula SHA-1, SHA-256, SHA-384 e SHA-512 usando a Web Crypto API nativa do navegador — rápido, correto e sem enviar seu texto a lugar nenhum.",
    ],
    howTo: [
      "Digite ou cole o texto a ser processado.",
      "Escolha o algoritmo (SHA-256 é o padrão recomendado).",
      "O hash aparece em hexadecimal — copie com um clique.",
    ],
    faq: [
      { q: "Hash é o mesmo que criptografia?", a: "Não. Criptografia é reversível com a chave; hash é uma via de mão única — não existe 'desfazer hash'. Por isso hashes servem para verificar integridade e senhas, não para esconder mensagens." },
      { q: "Por que SHA-1 não é mais recomendado?", a: "Colisões práticas de SHA-1 foram demonstradas em 2017 (ataque SHAttered). Ele permanece na ferramenta por compatibilidade com sistemas legados, mas para segurança use SHA-256 ou superior." },
      { q: "Posso usar SHA-256 puro para guardar senhas?", a: "Não é o ideal: SHA-256 é rápido demais, o que facilita força bruta. Senhas pedem algoritmos lentos e com salt, como bcrypt, scrypt ou argon2." },
    ],
  },
  "jwt-decoder": {
    about: [
      "JWT (JSON Web Token) é o formato mais comum de token de autenticação em APIs: três blocos Base64URL separados por pontos — header (algoritmo), payload (claims como usuário e expiração) e assinatura.",
      "Este decodificador abre o header e o payload de forma legível, mostrando claims e datas de expiração. A decodificação é local: seu token não é enviado a nenhum servidor — importante, porque um JWT vazado pode dar acesso à conta.",
    ],
    howTo: [
      "Cole o JWT completo (os três blocos separados por pontos).",
      "Header e payload são decodificados e exibidos como JSON formatado.",
      "Confira claims como exp (expiração), iss (emissor) e sub (usuário).",
    ],
    faq: [
      { q: "Decodificar um JWT quebra a segurança dele?", a: "Não — o conteúdo do JWT é apenas codificado em Base64URL, legível por qualquer um por design. A segurança está na assinatura, que impede alteração. Por isso nunca coloque dados sensíveis no payload." },
      { q: "Esta ferramenta valida a assinatura?", a: "Não. Validar exige a chave secreta ou pública do emissor, que você não deve colar em sites. A ferramenta é para inspecionar o conteúdo; a validação deve acontecer no seu backend." },
      { q: "O que é o claim 'exp'?", a: "É o timestamp Unix de expiração do token. Depois desse momento, o backend deve rejeitá-lo. Use nosso conversor de timestamp para ler a data em formato humano." },
    ],
  },
  "conversor-cores": {
    about: [
      "Cada formato de cor tem seu lugar: HEX é compacto e universal no CSS, RGB expõe os canais para manipulação em JavaScript, e HSL (matiz, saturação, luminosidade) é o mais intuitivo para criar variações — clarear, escurecer, dessaturar.",
      "Este conversor traduz entre os três formatos em tempo real, com pré-visualização da cor. Útil para front-end, design systems e ajustes de acessibilidade.",
    ],
    howTo: [
      "Digite a cor em qualquer formato: #3B82F6, rgb(59,130,246) ou hsl(217,91%,60%).",
      "Os outros formatos são calculados automaticamente.",
      "Confira a pré-visualização e copie o formato que precisar.",
    ],
    faq: [
      { q: "Quando usar HSL em vez de HEX?", a: "HSL facilita criar variações consistentes: para escurecer, reduza a luminosidade; para um tom análogo, gire o matiz. Design tokens modernos costumam ser definidos em HSL por isso." },
      { q: "O que significa cada par do HEX?", a: "#RRGGBB: dois dígitos hexadecimais por canal — vermelho, verde e azul, de 00 (0) a FF (255). #3B82F6 é R=59, G=130, B=246." },
      { q: "E transparência (alpha)?", a: "HEX de 8 dígitos (#RRGGBBAA), rgba() e hsla() adicionam um canal alpha de 0 (transparente) a 1 (opaco). Verifique o contraste final sobre o fundo real ao usar transparência." },
    ],
  },
  "conversor-base": {
    about: [
      "Binário, octal, decimal e hexadecimal são formas diferentes de escrever o mesmo número. Programadores usam hexadecimal para representar bytes compactamente (FF = 255 = 11111111) e binário para enxergar bits de flags e máscaras.",
      "Este conversor traduz números entre as quatro bases instantaneamente — útil para depurar permissões Unix, cores, endereços de memória e operações bitwise.",
    ],
    howTo: [
      "Digite o número em qualquer uma das bases.",
      "As outras três são convertidas em tempo real.",
      "Copie o valor na base que precisar.",
    ],
    faq: [
      { q: "Por que hexadecimal é tão usado em computação?", a: "Cada dígito hex representa exatamente 4 bits, então um byte são sempre 2 dígitos (00–FF). É a forma mais compacta e legível de escrever dados binários." },
      { q: "O que significa o prefixo 0x?", a: "É a convenção para indicar hexadecimal em linguagens como C, JavaScript e Python (0xFF = 255). Da mesma forma, 0b indica binário e 0o, octal." },
      { q: "Onde o octal ainda aparece?", a: "Principalmente em permissões de arquivo Unix (chmod 755) — cada dígito octal representa 3 bits de permissão (leitura, escrita, execução)." },
    ],
  },
  "conversor-timestamp": {
    about: [
      "Unix timestamp é o número de segundos desde 1º de janeiro de 1970 UTC (a 'época Unix'). É o formato universal de data em bancos de dados, APIs e logs, por ser compacto e independente de fuso horário.",
      "Este conversor traduz timestamp para data legível (no seu fuso e em UTC) e vice-versa, aceitando segundos e milissegundos. Indispensável para depurar logs, tokens JWT e agendamentos.",
    ],
    howTo: [
      "Cole o timestamp (em segundos ou milissegundos) para ver a data.",
      "Ou escolha uma data e hora para obter o timestamp correspondente.",
      "O resultado mostra tanto o horário local quanto UTC.",
    ],
    faq: [
      { q: "Como sei se o timestamp está em segundos ou milissegundos?", a: "Pelo tamanho: timestamps atuais têm 10 dígitos em segundos e 13 em milissegundos. JavaScript (Date.now()) usa milissegundos; Unix e a maioria das APIs, segundos." },
      { q: "O que é o problema do ano 2038?", a: "Sistemas que guardam timestamp em inteiro de 32 bits estouram em 19/01/2038. Sistemas modernos usam 64 bits, adiando o problema por bilhões de anos." },
      { q: "Timestamp muda com fuso horário?", a: "Não — ele é sempre relativo a UTC. O que muda é a representação legível: o mesmo timestamp vira horários diferentes em São Paulo e Tóquio." },
    ],
  },
  "contador-texto": {
    about: [
      "Contar caracteres e palavras é rotina de quem escreve para a web: limites de meta description (~155 caracteres), posts de redes sociais, campos de formulário e SMS (160 caracteres).",
      "Este contador mostra caracteres (com e sem espaços), palavras, linhas e parágrafos em tempo real, enquanto você digita ou cola o texto — tudo processado localmente.",
    ],
    howTo: [
      "Cole ou digite o texto na área de entrada.",
      "As contagens atualizam em tempo real, a cada tecla.",
      "Use os números para ajustar o texto ao limite da plataforma.",
    ],
    faq: [
      { q: "Quais os limites das principais plataformas?", a: "Título SEO: ~60 caracteres; meta description: ~155; post no X/Twitter: 280; legenda no Instagram: 2.200; SMS: 160. O contador ajuda a ficar dentro de todos." },
      { q: "Emoji conta como um caractere?", a: "Depende da plataforma. Muitos emojis ocupam 2 ou mais unidades UTF-16, e plataformas contam de formas diferentes. Em limites apertados, teste na plataforma real." },
      { q: "Como as palavras são contadas?", a: "Pela separação por espaços e quebras de linha, o mesmo critério de editores como o Word na maioria dos casos. Hifens e barras podem gerar pequenas diferenças entre ferramentas." },
    ],
  },
  "case-converter": {
    about: [
      "Cada linguagem e contexto tem sua convenção de nomenclatura: camelCase em JavaScript, snake_case em Python, kebab-case em URLs e CSS, PascalCase em classes. Converter à mão é tedioso e sujeito a erro.",
      "Esta ferramenta converte texto entre MAIÚSCULAS, minúsculas, Título, camelCase, snake_case e kebab-case de uma vez — útil para renomear variáveis, gerar slugs e padronizar constantes.",
    ],
    howTo: [
      "Cole o texto ou identificador a converter.",
      "Veja todas as variações geradas simultaneamente.",
      "Copie o formato que a sua linguagem ou framework pede.",
    ],
    faq: [
      { q: "Quando usar cada convenção?", a: "camelCase: variáveis e funções em JS/Java; PascalCase: classes e componentes React; snake_case: Python e colunas SQL; kebab-case: URLs, arquivos e classes CSS; UPPER_SNAKE: constantes." },
      { q: "O que é um slug?", a: "A versão de um título amigável para URL: minúsculas, sem acentos, palavras separadas por hífen. 'Gerador de CPF' vira 'gerador-de-cpf'. O kebab-case é a base dos slugs." },
      { q: "A conversão lida com acentos?", a: "Sim — para slugs e identificadores, os acentos são normalizados (ç→c, ã→a), já que a maioria das linguagens e URLs os evita." },
    ],
  },
  "regex-tester": {
    about: [
      "Expressões regulares (regex) são a linguagem padrão para busca e validação de padrões em texto — e-mails, telefones, datas, logs. Poderosas, mas fáceis de errar: um quantificador mal colocado muda tudo.",
      "Este testador executa seu padrão JavaScript contra um texto de exemplo em tempo real, destacando as correspondências e grupos de captura. Perfeito para lapidar a regex antes de colocá-la no código.",
    ],
    howTo: [
      "Digite o padrão regex (sem barras) e as flags (g, i, m…).",
      "Cole o texto de teste na área abaixo.",
      "As correspondências são destacadas conforme você ajusta o padrão.",
    ],
    faq: [
      { q: "O que fazem as flags g, i e m?", a: "g (global) encontra todas as ocorrências, não só a primeira; i ignora maiúsculas/minúsculas; m faz ^ e $ casarem com início e fim de cada linha, não do texto todo." },
      { q: "Por que minha regex funciona aqui e não no meu código?", a: "Cada linguagem tem seu dialeto: esta ferramenta usa o motor JavaScript. Padrões com lookbehind, \\p{…} ou named groups podem se comportar diferente em Python (re), Java ou Go." },
      { q: "Regex é a melhor forma de validar e-mail?", a: "Para formulários, uma regex simples (algo@algo.tld) basta — a validação real é enviar um e-mail de confirmação. A regex 'perfeita' de e-mail do RFC 5322 é enorme e desnecessária na prática." },
    ],
  },
  "gerador-cartao": {
    about: [
      "Números de cartão de crédito seguem o algoritmo de Luhn (módulo 10): o último dígito é um verificador calculado sobre os anteriores. Gateways e formulários usam essa conta como primeira barreira contra erros de digitação.",
      "Este gerador cria números fictícios que passam no Luhn, com prefixos (BINs) de teste das principais bandeiras — Visa, Mastercard, Amex. Servem para testar formulários de checkout e integrações em sandbox. Não funcionam para compras: não existem no sistema bancário.",
    ],
    howTo: [
      "Escolha a bandeira (Visa, Mastercard, Amex).",
      "Clique em Gerar para criar um número válido pelo Luhn.",
      "Use no ambiente de teste ou sandbox do seu gateway de pagamento.",
    ],
    faq: [
      { q: "Os cartões gerados podem fazer compras reais?", a: "Não. O número apenas passa na validação matemática — não há conta, saldo, banco emissor nem autorização. Qualquer tentativa de transação real é recusada na hora." },
      { q: "Gateways têm cartões de teste oficiais?", a: "Sim. Stripe, Mercado Pago, PagSeguro e outros publicam números de teste próprios que simulam aprovação e recusa em sandbox. Prefira-os para testar fluxos completos; este gerador serve para validação de formulário." },
      { q: "Como funciona o algoritmo de Luhn?", a: "Da direita para a esquerda, dobra-se um dígito sim, outro não (subtraindo 9 se passar de 9), soma-se tudo e o total deve ser múltiplo de 10. Criado em 1954, segue em uso universal." },
    ],
  },
  "conversor-temperatura": {
    about: [
      "Celsius, Fahrenheit e Kelvin medem a mesma grandeza com escalas diferentes: o Celsius fixa 0° no congelamento da água, o Fahrenheit usa 32° para isso, e o Kelvin começa no zero absoluto (-273,15 °C), sendo a unidade do Sistema Internacional.",
      "Este conversor traduz entre as três escalas instantaneamente — útil para receitas americanas, artigos científicos, APIs de clima e specs de hardware.",
    ],
    howTo: [
      "Digite a temperatura e selecione a escala de origem.",
      "As outras escalas são calculadas na hora.",
      "Copie o valor convertido.",
    ],
    faq: [
      { q: "Qual a fórmula de Celsius para Fahrenheit?", a: "°F = °C × 9/5 + 32. No caminho inverso, °C = (°F − 32) × 5/9. Para Kelvin, K = °C + 273,15." },
      { q: "Por que o Kelvin não usa símbolo de grau?", a: "Por ser uma escala absoluta (começa no zero absoluto), o SI define a unidade como 'kelvin' (K), sem o '°'. Escreve-se 300 K, não 300 °K." },
      { q: "Existe temperatura em que °C e °F coincidem?", a: "Sim: -40. É o único ponto em que as duas escalas marcam o mesmo número (-40 °C = -40 °F)." },
    ],
  },
  "gerador-numero": {
    about: [
      "Sortear números parece trivial, mas fazer certo importa: esta ferramenta usa aleatoriedade do navegador para gerar números dentro do intervalo que você definir, com ou sem repetição — para sorteios, amostragens, jogos e testes.",
      "Defina mínimo, máximo e quantidade; o resultado sai na hora, sem cadastro e sem enviar nada a servidores.",
    ],
    howTo: [
      "Defina o valor mínimo e o máximo do intervalo.",
      "Escolha quantos números sortear (e se podem repetir).",
      "Clique em Sortear e copie o resultado.",
    ],
    faq: [
      { q: "Posso usar para sorteio de seguidores?", a: "Sim — numere os participantes e sorteie no intervalo. Para transparência, grave a tela do sorteio. Para promoções comerciais reguladas, consulte as regras da SECAP/ME." },
      { q: "Os números são realmente aleatórios?", a: "São pseudoaleatórios de qualidade estatística, suficientes para sorteios e testes. Para fins criptográficos (chaves, tokens), use ferramentas específicas como o nosso gerador de senhas, que usa a Web Crypto API." },
      { q: "'Sem repetição' funciona como?", a: "Como uma urna: cada número sorteado sai do conjunto e não pode ser sorteado de novo — ideal para bingos e distribuição de brindes." },
    ],
  },
  "texto-binario": {
    about: [
      "Todo texto no computador é, no fundo, números: cada caractere tem um código (ASCII/Unicode) que a máquina guarda em bits. Este conversor mostra exatamente isso — transforma texto em binário (8 bits por caractere) e binário de volta em texto.",
      "Além do valor didático para quem estuda computação, é útil para depurar encodings, exercícios de CTF e entender de vez o que significa 'o computador só entende 0 e 1'.",
    ],
    howTo: [
      "Digite o texto (ou cole a sequência binária).",
      "Escolha a direção da conversão.",
      "O resultado sai agrupado em blocos de 8 bits, um por caractere.",
    ],
    faq: [
      { q: "Por que 8 bits por caractere?", a: "8 bits = 1 byte, a unidade padrão. O ASCII usa 7 bits (0–127) completados a 1 byte. Caracteres acentuados e emojis usam múltiplos bytes em UTF-8 — por isso 'ç' vira mais de 8 bits." },
      { q: "O que é ASCII?", a: "É a tabela de 1963 que mapeia 128 códigos para letras, dígitos e símbolos — 'A' é 65 (01000001). O Unicode/UTF-8 estende o ASCII para todos os alfabetos do mundo, mantendo compatibilidade." },
      { q: "Binário e Base64 são a mesma coisa?", a: "Não. Binário é a representação em bits; Base64 é uma codificação de bytes em 64 caracteres imprimíveis. Ambos representam os mesmos dados de formas diferentes." },
    ],
  },
  "numeros-romanos": {
    about: [
      "Os algarismos romanos usam sete letras (I, V, X, L, C, D, M) e a regra subtrativa — IV é 4, IX é 9, XL é 40. Continuam vivos em capítulos de livros, relógios, séculos (séc. XXI), nomes de papas e edições de eventos.",
      "Este conversor traduz de decimal para romano e vice-versa, no intervalo clássico de 1 a 3999, validando sequências malformadas.",
    ],
    howTo: [
      "Digite o número decimal (1 a 3999) ou o numeral romano.",
      "A conversão acontece automaticamente nas duas direções.",
      "Copie o resultado.",
    ],
    faq: [
      { q: "Por que o limite é 3999?", a: "No sistema clássico, 4000 seria 'MMMM', que a convenção moderna evita. Os romanos usavam um traço sobre a letra (vínculo) para multiplicar por mil — notação que não existe em texto comum." },
      { q: "Existe zero em romano?", a: "Não. O sistema romano não tem símbolo para zero — o conceito só chegou à Europa séculos depois, com os algarismos indo-arábicos." },
      { q: "IIII ou IV?", a: "A forma subtrativa IV é a padrão. A exceção famosa são os mostradores de relógio, que tradicionalmente usam IIII por equilíbrio visual — ambas são historicamente legítimas." },
    ],
  },
  "calculadora-datas": {
    about: [
      "Quantos dias faltam para o lançamento? Quantos dias se passaram desde o contrato? Qual a idade exata em anos, meses e dias? Contar isso à mão erra fácil — anos bissextos e meses de tamanhos diferentes confundem qualquer um.",
      "Esta calculadora resolve as duas tarefas mais comuns: diferença entre duas datas (em dias, semanas, meses e anos) e cálculo de idade a partir do nascimento — com precisão de calendário, direto no navegador.",
    ],
    howTo: [
      "Escolha o modo: diferença entre datas ou cálculo de idade.",
      "Selecione as datas nos campos.",
      "O resultado detalhado aparece na hora.",
    ],
    faq: [
      { q: "A calculadora considera anos bissextos?", a: "Sim. O cálculo usa o calendário real (via API de datas do navegador), incluindo os 29 de fevereiro — regra: divisível por 4, exceto séculos não divisíveis por 400." },
      { q: "A contagem inclui o dia final?", a: "A diferença é exclusiva: de 1º a 5 do mês são 4 dias. Para contagens inclusivas (comuns em prazos jurídicos), some 1 ao resultado." },
      { q: "Funciona para datas antes de 1970?", a: "Sim. Diferente do Unix timestamp, a API de datas do JavaScript representa datas muito anteriores a 1970 sem problema." },
    ],
  },
};
