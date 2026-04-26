# Xcode Handoff — Atualização iOS (Safari/WebKit Fixes)

Este documento descreve **apenas as duas últimas mudanças** que precisam ser propagadas para o app iOS via Capacitor antes da próxima submissão à App Store.

---

## Resumo das mudanças

### 1. Fix de renderização SVG (páginas em branco no iPad)

**Problema:** No iPad Safari (WebKit), 11 das 14 páginas apareciam completamente em branco.

**Causa:** Os elementos `<svg>` raiz não tinham os atributos `style="width:100%;height:100%"` e `preserveAspectRatio="xMidYMid meet"`. O Safari WebKit é mais estrito que o Chrome — sem estes atributos, o SVG ficava com tamanho zero dentro do container flex.

**Fix aplicado:**
- Adicionado `style="width:100%;height:100%;display:block"` ao `<svg>` root de todos os 15 SVG_Fxx
- Adicionado `preserveAspectRatio="xMidYMid meet"` ao `<svg>` root de todos os 15 SVG_Fxx
- Adicionado CSS safety net no container que renderiza os SVGs:
  ```css
  .milo-svg-container svg { width: 100% !important; height: 100% !important; display: block !important; }
  ```

**Páginas afetadas:** 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 14 (todas as que apareciam em branco).

### 2. Fix da exportação PNG (imagem vazia em iPads antigos)

**Problema:** Em iPads mais antigos, ao salvar a imagem das páginas 1, 4, 6, 7, 8, 9, 11, 12, 13, 14, o PNG resultante saía completamente vazio.

**Causa:** O Safari em iPads antigos limita o tamanho máximo de canvas a ~4096px por dimensão. O código usava `scale = 3` fixo, gerando canvas de até 7200×5376 px nas páginas com viewBox maior — ultrapassava o limite e o canvas falhava silenciosamente.

**Fix aplicado em `src/MiloApp.jsx`, função `generatePNG`:**
```js
// iOS Safari (older iPads) caps canvas size around 4096×4096.
// Compute scale dynamically so the largest dimension stays under the cap.
const MAX_CANVAS_DIM = 4000;
const maxScale = Math.min(MAX_CANVAS_DIM / svgW, MAX_CANVAS_DIM / svgH);
const scale  = Math.min(3, maxScale);
const canvas = document.createElement('canvas');
canvas.width  = Math.floor(svgW * scale);
canvas.height = Math.floor(svgH * scale);
```

Páginas pequenas mantêm scale=3 (qualidade máxima); páginas grandes têm scale reduzido o suficiente para o canvas ficar ≤ 4000px.

---

## Como propagar as mudanças para o Xcode

> O projeto iOS gerado pelo Capacitor está em:
> `/Users/francesco/Library/CloudStorage/Dropbox/Livro Colorir Milo/ios/`

### Passo 1 — Sincronizar o código atualizado para o projeto iOS

Abra o **Terminal** e execute:

```bash
cd "/Users/francesco/Library/CloudStorage/Dropbox/Livro Colorir Milo"

# Copiar o MiloApp.jsx atualizado do repositório GitHub
cp "/Users/francesco/Documents/GitHub/livro-milo/src/MiloApp.jsx" \
   "src/MiloApp.jsx"

# Build + sync iOS + abrir Xcode (tudo num comando)
npm run build:ios
```

O comando `npm run build:ios` faz três coisas:
1. `npm run build` — gera os ficheiros estáticos em `dist/`
2. `npx cap sync ios` — copia `dist/` para `ios/App/App/public/`
3. `npx cap open ios` — abre o Xcode automaticamente

### Passo 2 — Incrementar a versão (se for fazer release)

No Xcode, com o projeto aberto:

1. Selecione o target **App** na barra lateral esquerda
2. Aba **General** → seção **Identity**:
   - **Version:** incremente para `1.0.1` (era `1.0.0`)
   - **Build:** incremente para `2` (era `1`)

### Passo 3 — Testar no simulador

1. Em cima na barra do Xcode, escolha um dispositivo (ex: **iPad Pro 13-inch (M4)**)
2. Clique no ▶ **Run** (ou `Cmd + R`)
3. Verifique que:
   - Todas as 14 páginas renderizam (nada em branco)
   - O botão de exportar gera uma imagem PNG não vazia em todas as páginas

### Passo 4 — Arquivar para a App Store

1. No menu superior do Xcode: **Product → Destination → Any iOS Device (arm64)**
2. **Product → Archive**
3. Quando o arquivamento terminar, abre a janela **Organizer**
4. Selecione o archive recém-criado → **Distribute App**
5. Escolha **App Store Connect** → **Upload**
6. Siga o assistente até o final

### Passo 5 — Submeter no App Store Connect

1. Acesse [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. Vá no app **Livro do Milo** → **TestFlight** (para testar antes) ou diretamente em **App Store** → criar nova versão `1.0.1`
3. Selecione o build recém-enviado
4. No campo **What's New** (em PT, EN, ES) coloque:

   **🇧🇷 Português:**
   ```
   Correções de compatibilidade com iPad e iPhones antigos:
   • Páginas que apareciam em branco agora renderizam corretamente
   • Salvar imagem agora funciona em todos os modelos
   ```

   **🇺🇸 English:**
   ```
   Compatibility fixes for older iPads and iPhones:
   • Pages that appeared blank now render correctly
   • Save image now works on all models
   ```

   **🇪🇸 Español:**
   ```
   Correcciones de compatibilidad con iPads y iPhones antiguos:
   • Las páginas que aparecían en blanco ahora se muestran correctamente
   • Guardar imagen ahora funciona en todos los modelos
   ```

5. **Submit for Review**

---

## Checklist final

- [ ] `npm run build:ios` executado sem erros
- [ ] Versão incrementada para `1.0.1` (ou superior) no Xcode
- [ ] Build incrementado para `2` (ou superior) no Xcode
- [ ] Testado no simulador iPad — todas as páginas renderizam
- [ ] Testado export — PNG não vazio em todas as páginas
- [ ] Archive criado e enviado para App Store Connect
- [ ] Notas de versão preenchidas em PT, EN, ES
- [ ] Submitted for Review

---

## Notas técnicas

- A versão web (PWA no Netlify) já tem todas estas correções aplicadas e está em produção.
- O Capacitor envolve a versão web num WebView nativo — então estas mudanças beneficiam tanto o PWA quanto o app iOS.
- Não há mudanças em código nativo Swift/Objective-C — apenas web assets.

---

*Projeto: Livro de Colorir do Milo — Instituto Fise / Dr. Francesco Blumetti*
