# Como publicar o Livro do Milo como PWA no Netlify
### Usando o GitHub Desktop

---

## Pré-requisitos

- Conta no [GitHub](https://github.com) (gratuita) — repositório já criado ✅
- Conta no [Netlify](https://netlify.com) (gratuita)
- **GitHub Desktop** instalado — [download aqui](https://desktop.github.com)

---

## Passo 1 — Clonar o repositório para o Mac

1. Abra o **GitHub Desktop**
2. No menu superior, clique em **File → Clone Repository...**
3. Selecione a aba **GitHub.com**
4. Na lista, localize e selecione o seu repositório `livro-milo`
5. Em **Local Path**, clique em **Choose...** e escolha uma pasta no seu Mac onde quer salvar — por exemplo a pasta **Documentos**
6. Clique em **Clone**

O GitHub Desktop vai criar uma cópia local do repositório no seu Mac.

---

## Passo 2 — Copiar os arquivos do projeto para o repositório

1. Abra o **Finder**
2. Navegue até a pasta do projeto:
   `/Users/francesco/Library/CloudStorage/Dropbox/Livro Colorir Milo`
3. Selecione **todos os arquivos e pastas** dentro dela (`Cmd + A`)
4. **Não inclua** as pastas `node_modules`, `dist` e `ios` — segure `Cmd` e clique nelas para desmarcar
5. Copie os arquivos selecionados (`Cmd + C`)
6. Navegue até a pasta onde o repositório foi clonado (ex: `Documentos/livro-milo`)
7. Cole os arquivos ali (`Cmd + V`)

---

## Passo 3 — Criar o arquivo .gitignore

Para garantir que pastas pesadas não sejam enviadas ao GitHub:

1. Abra o **TextEdit**
2. Vá em **Formato → Transformar em Texto Simples**
3. Cole o seguinte conteúdo:
   ```
   node_modules/
   dist/
   ios/
   .DS_Store
   *.local
   ```
4. Salve dentro da pasta do repositório (`livro-milo`) com o nome **`.gitignore`**
   - No diálogo de salvar, apague a extensão `.txt` e escreva apenas `.gitignore`
   - Se o Mac perguntar "Tem certeza?", clique em **Use "."**

---

## Passo 4 — Fazer o primeiro commit

1. Volte ao **GitHub Desktop** — ele vai detectar automaticamente todos os arquivos novos
2. Na coluna da esquerda, confirme que os arquivos do projeto aparecem marcados
3. No campo **Summary** (canto inferior esquerdo), escreva:
   ```
   Primeiro commit — Livro do Milo
   ```
4. Clique no botão azul **"Commit to main"**

---

## Passo 5 — Enviar para o GitHub

1. Clique no botão **"Push origin"** no topo da janela
2. Aguarde alguns segundos
3. Clique em **"View on GitHub"** para confirmar que os arquivos chegaram ao repositório online ✅

---

## Passo 6 — Conectar o GitHub ao Netlify

1. Acesse [netlify.com](https://netlify.com) e faça login
2. Clique em **"Add new site"** → **"Import an existing project"**
3. Clique em **"Deploy with GitHub"**
4. Autorize o Netlify a acessar sua conta do GitHub (botão **Authorize Netlify**)
5. Na lista de repositórios, selecione **`livro-milo`**
6. Na tela de configuração, confirme:
   - **Branch to deploy:** `main`
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
7. Clique em **"Deploy site"**

O Netlify vai construir e publicar o app automaticamente. Aguarde 1–2 minutos.

---

## Passo 7 — Verificar o deploy

1. O Netlify vai gerar uma URL como `nome-aleatorio.netlify.app`
2. Abra essa URL no iPhone e toque em **Compartilhar → Adicionar à Tela de Início**
3. O app vai aparecer como ícone na tela inicial — isso é o PWA funcionando ✅

---

## Passo 8 — Mudar o nome do site (opcional)

1. No painel do site no Netlify, clique em **"Site settings"**
2. Em **Site details**, clique em **"Change site name"**
3. Escolha um nome como `livro-do-milo` → o link vai ficar `livro-do-milo.netlify.app`

---

## Como fazer atualizações futuras

Sempre que fizer alterações no projeto, copie os arquivos atualizados para a pasta do repositório e então:

1. Abra o **GitHub Desktop**
2. Os arquivos alterados aparecem automaticamente na coluna da esquerda
3. No campo **Summary**, escreva uma descrição breve, por exemplo:
   ```
   Atualização das ilustrações
   ```
4. Clique em **"Commit to main"**
5. Clique em **"Push origin"**

O Netlify detecta o push e publica a nova versão automaticamente em 1–2 minutos. ✅

---

## Resultado esperado

- ✅ Site publicado em HTTPS
- ✅ PWA instalável (ícone na tela inicial do iPhone e Android)
- ✅ Funciona offline após a primeira visita
- ✅ Atualizações automáticas a cada push no GitHub

---

*Projeto: Livro de Colorir do Milo — Instituto Fise / Dr. Francesco Blumetti*
