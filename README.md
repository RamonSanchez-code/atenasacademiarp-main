# Academia Atenas - Website

Este é o projeto do website da Academia Atenas, desenvolvido com React, Vite e Tailwind CSS.

## Como executar localmente (VS Code)

Para rodar este projeto em sua máquina local, siga os passos abaixo:

### Pré-requisitos

- **Node.js** (versão 18 ou superior recomendada)
- **npm** (instalado junto com o Node.js)

### Passo a Passo

1.  **Clone o projeto ou baixe os arquivos.**
2.  **Abra a pasta do projeto no VS Code.**
3.  **Abra o terminal integrado** (Ctrl + ` ou Terminal > New Terminal).
4.  **Instale as dependências:**
    ```bash
    npm install
    ```
5.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
6.  **Acesse o site:**
    O terminal mostrará um link (geralmente `http://localhost:3000`). Clique nele para abrir no seu navegador.

## Fotos e otimizacao de imagens

As fotos originais, em alta resolucao, ficam em `_originais/`. Essa pasta **nao vai
para o Git nem para o site publicado** — ela e so o seu acervo local.

O que o site entrega ao visitante sao as versoes otimizadas em `public/`, geradas
automaticamente a partir das originais (lado maior de 2000px, qualidade 82,
sem metadados EXIF).

**Ao adicionar fotos novas**, coloque-as em `public/` e rode:

```bash
python scripts/otimizar-imagens.py
```

O script guarda a copia original em `_originais/` e publica a versao leve em
`public/`. Pode rodar quantas vezes quiser: ele sempre gera a partir da original,
entao nunca ha perda acumulada de qualidade.

## Idioma e traducao

O site e travado em portugues do Brasil (`lang="pt-BR"` e `translate="no"` no
`index.html`). Isso impede que o tradutor automatico do navegador reescreva
textos, nomes das unidades e valores dos planos. Ao criar paginas novas, nao
remova esses atributos nem a classe `notranslate` do `<body>`.

## Seguranca

Os cabecalhos de seguranca de producao (Content-Security-Policy, HSTS,
X-Frame-Options, Permissions-Policy) e as regras de cache ficam em `vercel.json`.
Se o site passar a carregar algum recurso de um dominio novo (uma fonte, um
script, um video incorporado), e preciso liberar esse dominio na
Content-Security-Policy, senao o navegador bloqueia.

Nunca coloque chaves ou senhas no codigo do front-end: tudo que vai para o
`src/` acaba visivel no JavaScript publico.

## Estrutura do Projeto

- `src/pages/`: Contém as páginas principais (Home, Unidades, etc).
- `src/components/`: Componentes reutilizáveis (Layout, FloatingCTA, etc).
- `src/constants.ts`: Centraliza dados como contatos das unidades.
- `src/index.css`: Estilos globais e configuração do Tailwind.

## Tecnologias Utilizadas

- **React 19**
- **Vite** (Build tool rápida)
- **Tailwind CSS** (Estilização utilitária)
- **Motion** (Animações fluidas)
- **Lucide React** (Ícones)
