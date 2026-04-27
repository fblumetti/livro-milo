# Xcode Handoff — Tutorial de Primeira Execução

Este documento descreve **apenas a última mudança** que precisa ser propagada para o app iOS via Capacitor antes da próxima submissão à App Store.

---

## Resumo da mudança

### Tutorial de 5 passos para novos utilizadores

**Objetivo:** Crianças e pais que abrem o app pela primeira vez não sabem para que serve cada botão. Foi adicionado um tutorial de onboarding que aparece automaticamente na primeira entrada na tela de pintar.

**Comportamento:**
- Aparece **automaticamente** na primeira vez que o utilizador entra na tela de colorir
- **Persistido em `localStorage`** com a chave `milo_tutorial_seen_v1` — não aparece novamente em visitas futuras
- Pode ser **dispensado** com botão "Pular", clicando fora do card, ou no último passo com "Vamos colorir!"
- Pode ser **reaberto a qualquer momento** através do novo botão "**?**" na toolbar (ao lado do botão de salvar)

**Conteúdo dos 5 passos:** cada passo mostra o ícone real do botão correspondente para facilitar a assimilação:

| Passo | Conteúdo | Ícone mostrado |
|---|---|---|
| 1/5 | Escolha uma cor | 6 círculos coloridos com 1º selecionado |
| 2/5 | Pinte ou Mova | Pílulas com lápis (ativo) + mãozinha |
| 3/5 | Leia a história | Pílula com ícone hambúrguer (☰) |
| 4/5 | Salve sua arte | Pílula com seta de download |
| 5/5 | Próxima cena | Pílula verde "Próxima →" idêntica ao botão real |

**Localização (i18n):** todos os textos do tutorial estão traduzidos em **PT, EN, ES**, e seguem automaticamente o idioma selecionado na home.

---

## Arquivo modificado

Apenas:
```
src/MiloApp.jsx
```

Mudanças resumidas no ficheiro:
- 3 novas chaves de tradução por idioma (`tutorialTitle`, `tutorialSkip`, `tutorialNext`, `tutorialDone`, `tutorialSteps[]`, `helpBtn`)
- 2 novos estados React (`showTutorial`, `tutorialStep`)
- 2 novas funções (`dismissTutorial`, `showTutorialAgain`)
- 1 novo `useEffect` para detetar primeira execução
- 1 novo overlay JSX (card centrado com semi-transparência)
- 1 novo ícone de ajuda na toolbar

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

No Xcode, com o projeto aberto, selecione o target **App** → aba **General** → seção **Identity**:
- **Version:** incremente (ex: de `1.0.1` para `1.0.2`)
- **Build:** incremente (ex: de `2` para `3`)

### Passo 3 — Testar no simulador

1. Escolha um dispositivo (ex: **iPad Pro 13-inch (M4)** ou **iPhone 16 Pro**)
2. Clique em ▶ **Run** (`Cmd + R`)
3. Verifique que:
   - O tutorial aparece automaticamente ao entrar pela primeira vez na tela de pintar
   - Os 5 passos navegam corretamente (Próximo / Pular / Vamos colorir!)
   - Após dispensar, o tutorial não aparece de novo (persistência localStorage)
   - O botão "?" na toolbar reabre o tutorial
   - Os ícones mostrados são idênticos aos botões reais do app

### Passo 4 — Arquivar para a App Store

1. **Product → Destination → Any iOS Device (arm64)**
2. **Product → Archive**
3. Na janela **Organizer** que abre: **Distribute App** → **App Store Connect** → **Upload**

### Passo 5 — Notas de versão no App Store Connect

No campo **What's New** (em cada idioma):

**🇧🇷 Português:**
```
Novo tutorial passo-a-passo para crianças e pais explorarem o app pela primeira vez!
• Tutorial aparece automaticamente na primeira utilização
• Botão de ajuda (?) para revisitar a qualquer momento
• Ícones idênticos aos botões reais para facilitar o aprendizado
```

**🇺🇸 English:**
```
New step-by-step tutorial for kids and parents to explore the app for the first time!
• Tutorial appears automatically on first use
• Help button (?) to revisit anytime
• Icons matching the real buttons to make learning easier
```

**🇪🇸 Español:**
```
¡Nuevo tutorial paso a paso para que niños y padres exploren la app por primera vez!
• El tutorial aparece automáticamente en el primer uso
• Botón de ayuda (?) para revisitar en cualquier momento
• Iconos idénticos a los botones reales para facilitar el aprendizaje
```

---

## Checklist final

- [ ] `MiloApp.jsx` copiado da pasta GitHub para a pasta Dropbox
- [ ] `npm run build:ios` executado sem erros
- [ ] Versão e Build incrementados no Xcode
- [ ] Simulador: tutorial aparece na primeira execução
- [ ] Simulador: tutorial persiste em localStorage (não reaparece)
- [ ] Simulador: botão "?" reabre o tutorial
- [ ] Simulador: ícones do tutorial correspondem aos botões reais
- [ ] Archive criado e enviado ao App Store Connect
- [ ] Notas de versão preenchidas em PT, EN, ES
- [ ] Submitted for Review

---

## Notas técnicas

- A versão web (PWA no Netlify) já tem este tutorial em produção.
- O Capacitor envolve a versão web num WebView nativo — `localStorage` funciona normalmente, então o tutorial é dispensado uma vez por instalação.
- Não há mudanças em código nativo Swift/Objective-C — apenas web assets.
- Se quiser **resetar o tutorial em todos os dispositivos** (ex: para testar após uma atualização), basta mudar a chave de localStorage no código (`milo_tutorial_seen_v1` → `_v2`).

---

*Projeto: Livro de Colorir do Milo — Instituto Fise / Dr. Francesco Blumetti*
