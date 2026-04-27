# Xcode Handoff — Container nos Botões do Header

Este documento descreve **apenas as últimas mudanças** que precisam ser propagadas para o app iOS via Capacitor antes da próxima submissão à App Store.

---

## Resumo da mudança

### Botões de casa e livro ganham container visual consistente com a toolbar

**Objetivo:** Tornar os botões do header inequivocamente clicáveis, usando o mesmo estilo visual já estabelecido pelo botão de modo ativo (desenhar/mover) na toolbar.

| Elemento | Antes | Depois |
|---|---|---|
| Botão casa (esquerdo) | Fundo transparente, `borderRadius: 14`, circular | Fundo `rgba(45,80,53,.12)` (tint suave verde), `borderRadius: 12` |
| Botão livro (direito, inativo) | Fundo transparente | Fundo `rgba(45,80,53,.12)` |
| Botão livro (direito, ativo) | Fundo `M.greenDk` (verde escuro) — **mantido** | Sem alteração |
| Botão ativo na toolbar (lápis/mão) | Fundo `#C8DFC8` | Fundo `rgba(45,80,53,.12)` — unificado com header |
| Padding do header | `bottom: 0` | `bottom: 8px`, `top: safe-area + 4px` |

**Resultado visual:**
- Os botões da casa e do livro têm agora um fundo translúcido suave que deixa claro que são elementos interativos.
- O botão ativo na toolbar usa exatamente o mesmo tint, criando linguagem visual coesa em todo o app.
- O padding vertical extra no header afasta os botões da barra de progresso (em baixo) e da borda do ecrã (em cima), dando mais respiro.

**O que NÃO mudou:**
- Os ícones SVG (casa e livro aberto) permanecem idênticos
- Os handlers (`setScreen('home')` e `setShowStoryMobile`) permanecem idênticos
- O estado ativo do botão livro (fundo verde escuro + ícone branco) permanece idêntico
- O comportamento, animações e lógica permanecem iguais

---

## Arquivo modificado

Apenas:
```
src/MiloApp.jsx
```

Mudanças resumidas:
- **Linha ~1509** — padding do header: `bottom: 0` → `bottom: 8px`, top ganha `+ 4px` extra além do safe area
- **Linha ~1516** — botão casa: `background: 'transparent'` → `background: 'rgba(45,80,53,.12)'`, `borderRadius: 14` → `12`
- **Linha ~1532** — botão livro (inativo): `background: 'transparent'` → `background: 'rgba(45,80,53,.12)'`, `borderRadius: 14` → `12`
- **Linha ~1314** — `iconBtn` na toolbar: `background: active ? '#C8DFC8'` → `background: active ? 'rgba(45,80,53,.12)'`

---

## Como propagar as mudanças para o Xcode

> O projeto iOS gerado pelo Capacitor está em:
> `/Users/francesco/Library/CloudStorage/Dropbox/Livro Colorir Milo/ios/`

### Passo 1 — Sincronizar o código atualizado

Abra o **Terminal** e execute:

```bash
cd "/Users/francesco/Library/CloudStorage/Dropbox/Livro Colorir Milo"

# Copiar o MiloApp.jsx atualizado do repositório GitHub
cp "/Users/francesco/Documents/Documentos - MacBook Air de Francesco/GitHub/livro-milo/src/MiloApp.jsx" \
   "src/MiloApp.jsx"

# Build + sync iOS + abrir Xcode (tudo num comando)
npm run build:ios
```

### Passo 2 — Incrementar a versão no Xcode

No Xcode, selecione o target **App** → aba **General** → seção **Identity**:
- **Version:** incremente (ex: de `1.0.3` para `1.0.4`)
- **Build:** incremente (ex: de `4` para `5`)

### Passo 3 — Testar no simulador

1. Escolha um dispositivo (ex: **iPad Pro 13-inch (M4)** ou **iPhone 16 Pro**)
2. Clique em ▶ **Run** (`Cmd + R`)
3. Verifique:
   - ✅ Botão da casa tem fundo verde translúcido suave (não transparente)
   - ✅ Botão do livro (inativo) tem o mesmo fundo verde translúcido
   - ✅ Botão do livro (ativo, ao tocar) fica verde escuro com ícone branco — como antes
   - ✅ Há espaço visível entre os botões e a barra de progresso laranja
   - ✅ Há espaço visível entre os botões e o topo do ecrã
   - ✅ Na toolbar, o botão de modo ativo (lápis ou mão) tem o mesmo tint suave

### Passo 4 — Arquivar para a App Store

1. **Product → Destination → Any iOS Device (arm64)**
2. **Product → Archive**
3. Na janela **Organizer**: **Distribute App** → **App Store Connect** → **Upload**

### Passo 5 — Notas de versão no App Store Connect

No campo **What's New** (em cada idioma):

**🇧🇷 Português:**
```
Botões de início e história com visual mais claro:
• Fundo suave indica que os botões são clicáveis
• Mais espaço entre os botões e as bordas do ecrã
• Visual consistente com os controles da toolbar
```

**🇺🇸 English:**
```
Home and story buttons now easier to identify:
• Subtle background makes buttons clearly tappable
• More breathing room between buttons and screen edges
• Consistent look with the toolbar controls
```

**🇪🇸 Español:**
```
Botones de inicio e historia más fáciles de identificar:
• Fondo suave indica que los botones son tocables
• Más espacio entre los botones y los bordes de la pantalla
• Apariencia consistente con los controles de la barra de herramientas
```

---

## Checklist final

- [ ] `MiloApp.jsx` copiado da pasta GitHub para a pasta Dropbox
- [ ] `npm run build:ios` executado sem erros
- [ ] Versão e Build incrementados no Xcode
- [ ] Simulador: botão casa com fundo translúcido verde suave
- [ ] Simulador: botão livro (inativo) com mesmo fundo translúcido
- [ ] Simulador: botão livro (ativo) permanece verde escuro com ícone branco
- [ ] Simulador: espaço visível entre botões e barra de progresso
- [ ] Simulador: botão ativo da toolbar usa o mesmo tint suave
- [ ] Archive criado e enviado ao App Store Connect
- [ ] Notas de versão preenchidas em PT, EN, ES
- [ ] Submitted for Review

---

## Notas técnicas

- A cor `rgba(45,80,53,.12)` é um tint 12% do verde escuro principal (`#2D5035`) — subtil em fundo claro, invisível em fundos escuros onde os botões ficam brancos.
- O `borderRadius: 12` (rect arredondado) substitui o `14` anterior, ficando ligeiramente mais quadrado — consistente com a linguagem dos `iconBtn` da toolbar (`borderRadius: 12`).
- O padding `bottom: 8px` no header é fixo; o top acrescenta `4px` ao safe area existente para dispositivos sem notch.
- A versão web (PWA no Netlify) já tem estas mudanças em produção.

---

*Projeto: Livro de Colorir do Milo — Instituto Fise / Dr. Francesco Blumetti*
