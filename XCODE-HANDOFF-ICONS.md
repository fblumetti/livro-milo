# Xcode Handoff — Novos Ícones Casa & Livro

Este documento descreve **apenas a última mudança** que precisa ser propagada para o app iOS via Capacitor antes da próxima submissão à App Store.

---

## Resumo da mudança

### Substituição de dois ícones do header da tela de pintar

**Objetivo:** Tornar a navegação mais intuitiva para crianças, substituindo símbolos genéricos por ícones com significado universal.

| Posição | Antes | Depois | Justificação |
|---|---|---|---|
| Canto superior **esquerdo** | `<` (chevron) | 🏠 **Casa clássica** | A seta sugeria "página anterior", mas o botão volta para a tela inicial. A casinha é o padrão consagrado para "home" e elimina a ambiguidade. |
| Canto superior **direito** | `☰` (hambúrguer) | 📖 **Livro aberto** | O hambúrguer é genérico e pouco convidativo num app infantil. O livro reforça a identidade narrativa do app. |

**Bonus:** O ícone do passo 3 do tutorial ("Leia a história") também foi atualizado para mostrar o mesmo livro aberto, mantendo a consistência visual entre o tutorial e o botão real.

**O que NÃO mudou:**
- Os handlers (`setScreen('home')` e `setShowStoryMobile`) permanecem idênticos
- O container dos botões permanece igual (38×38, transparente, sem borda)
- O comportamento, animações e estados ativos/inativos permanecem iguais
- Apenas os atributos `<path d="...">` dos SVGs foram trocados

---

## Arquivo modificado

Apenas:
```
src/MiloApp.jsx
```

Três SVG `path` substituídos no total:
- Linha ~1521 — botão de voltar para casa (header)
- Linha ~1538 — botão de história/livro (header)
- Linha ~1641 — ícone de história no passo 3 do tutorial

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
- **Version:** incremente (ex: de `1.0.2` para `1.0.3`)
- **Build:** incremente (ex: de `3` para `4`)

### Passo 3 — Testar no simulador

1. Escolha um dispositivo (ex: **iPad Pro 13-inch (M4)** ou **iPhone 16 Pro**)
2. Clique em ▶ **Run** (`Cmd + R`)
3. Verifique:
   - ✅ Canto superior esquerdo mostra **🏠 casa** ao invés de chevron
   - ✅ Casa, ao ser tocada, volta para a tela inicial (mesmo comportamento de antes)
   - ✅ Canto superior direito mostra **📖 livro aberto** ao invés de hambúrguer
   - ✅ Livro, ao ser tocado, abre o painel da história (mesmo comportamento de antes)
   - ✅ No tutorial (passo 3 de 5), o ícone mostrado é o mesmo livro aberto

### Passo 4 — Arquivar para a App Store

1. **Product → Destination → Any iOS Device (arm64)**
2. **Product → Archive**
3. Na janela **Organizer**: **Distribute App** → **App Store Connect** → **Upload**

### Passo 5 — Notas de versão no App Store Connect

No campo **What's New** (em cada idioma):

**🇧🇷 Português:**
```
Ícones do header redesenhados para tornar a navegação mais clara:
• Botão de início agora é uma casinha (antes era uma seta)
• Botão da história agora é um livro aberto (antes era um menu)
```

**🇺🇸 English:**
```
Header icons redesigned to make navigation clearer:
• Home button is now a house (was an arrow)
• Story button is now an open book (was a menu)
```

**🇪🇸 Español:**
```
Iconos de la cabecera rediseñados para hacer la navegación más clara:
• El botón de inicio ahora es una casita (antes era una flecha)
• El botón de historia ahora es un libro abierto (antes era un menú)
```

---

## Checklist final

- [ ] `MiloApp.jsx` copiado da pasta GitHub para a pasta Dropbox
- [ ] `npm run build:ios` executado sem erros
- [ ] Versão e Build incrementados no Xcode
- [ ] Simulador: ícone de casa aparece no canto superior esquerdo
- [ ] Simulador: ícone de livro aberto aparece no canto superior direito
- [ ] Simulador: ambos respondem ao toque com o comportamento original
- [ ] Simulador: o passo 3 do tutorial mostra o livro aberto
- [ ] Archive criado e enviado ao App Store Connect
- [ ] Notas de versão preenchidas em PT, EN, ES
- [ ] Submitted for Review

---

## Notas técnicas

- A versão web (PWA no Netlify) já tem estes ícones em produção.
- Mudança puramente visual — nenhum handler, estado ou comportamento foi alterado.
- Os SVGs usam `currentColor` para o stroke, então herdam a cor do botão (verde escuro `#2D5035` no header claro, branco quando ativo).
- O peso do traço foi padronizado em `1.8` e tamanho em `22×22 px` para ambos, garantindo consistência visual.

---

*Projeto: Livro de Colorir do Milo — Instituto Fise / Dr. Francesco Blumetti*
