# Xcode Handoff — Botão de Ajuda movido para o Header

Este documento descreve **apenas as últimas mudanças** que precisam ser propagadas para o app iOS via Capacitor antes da próxima submissão à App Store.

---

## Resumo da mudança

### Botão `?` sai da toolbar e entra no header como pill junto ao livro

**Objetivo:** Libertar espaço na toolbar e manter o acesso ao tutorial sempre visível no header.

| Elemento | Antes | Depois |
|---|---|---|
| Botão `?` (tutorial) | Na toolbar, ao lado do botão de download | Removido da toolbar |
| Canto superior direito | Apenas botão do livro (38×38) | Pill único com livro + divisória + `?` |
| Toolbar | desfazer · lixeira · lápis · mão · download · **?** | desfazer · lixeira · lápis · mão · download |

**Comportamento do pill:**
- Fundo: `rgba(45,80,53,.12)` com `borderRadius: 12` e `overflow: hidden`
- Divisória interna: `1px` de altura `20px` em `rgba(45,80,53,.2)`
- Livro: mantém estado ativo (fundo `M.greenDk` + ícone branco quando história aberta)
- `?`: chama `showTutorialAgain()` — mesmo comportamento de antes

**O que NÃO mudou:**
- Os ícones SVG (livro e círculo com ?) permanecem idênticos
- Os handlers (`setShowStoryMobile` e `showTutorialAgain`) permanecem idênticos
- O estado ativo do botão livro permanece idêntico
- O botão casa (esquerdo) permanece idêntico

---

## Arquivo modificado

Apenas:
```
src/MiloApp.jsx
```

### Mudança 1 — Substituir o botão do livro por um pill duplo no header

**Localizar** (cerca da linha 1531) o bloco do `{/* Story toggle */}`:

```jsx
{/* Story toggle */}
<button onClick={() => setShowStoryMobile(s => !s)} style={{
  width:38, height:38, borderRadius:12, border:0,
  background: showStoryMobile ? M.greenDk : 'rgba(45,80,53,.12)',
  color: showStoryMobile ? '#fff' : M.greenDk,
  display:'inline-flex', alignItems:'center', justifyContent:'center',
  cursor:'pointer', flexShrink:0, transition:'all 0.18s',
}}>
  <svg ...livro...</svg>
</button>
```

**Substituir por:**

```jsx
{/* Right group: story + help pill */}
<div style={{
  display:'flex', alignItems:'center', flexShrink:0,
  background:'rgba(45,80,53,.12)', borderRadius:12, overflow:'hidden',
}}>
  <button onClick={() => setShowStoryMobile(s => !s)} style={{
    width:38, height:38, border:0,
    background: showStoryMobile ? M.greenDk : 'transparent',
    color: showStoryMobile ? '#fff' : M.greenDk,
    display:'inline-flex', alignItems:'center', justifyContent:'center',
    cursor:'pointer', transition:'all 0.18s',
  }}>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 5 C2 4.4, 2.4 4, 3 4 L10 4 C11 4, 12 4.6, 12 5.5 L12 20 C12 19.2, 11.4 18.5, 10.5 18.5 L3 18.5 C2.4 18.5, 2 18.1, 2 17.5 Z"/><path d="M22 5 C22 4.4, 21.6 4, 21 4 L14 4 C13 4, 12 4.6, 12 5.5 L12 20 C12 19.2, 12.6 18.5, 13.5 18.5 L21 18.5 C21.6 18.5, 22 18.1, 22 17.5 Z"/><path d="M5 8 L8.5 8 M5 11 L8.5 11 M15.5 8 L19 8 M15.5 11 L19 11"/></svg>
  </button>
  <div style={{ width:1, height:20, background:'rgba(45,80,53,.2)', flexShrink:0 }}/>
  <button onClick={showTutorialAgain} style={{
    width:38, height:38, border:0,
    background:'transparent', color:M.greenDk,
    display:'inline-flex', alignItems:'center', justifyContent:'center',
    cursor:'pointer',
  }}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
  </button>
</div>
```

### Mudança 2 — Remover o botão `?` da toolbar

**Localizar** (cerca da linha 1404) e **apagar** estas 4 linhas:

```jsx
{/* Help / re-show tutorial */}
{iconBtn(showTutorialAgain, t.helpBtn, false, false,
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
)}
```

---

## Como propagar as mudanças para o Xcode

### Passo 1 — Aplicar as mudanças no ficheiro

Abra `src/MiloApp.jsx` na pasta Dropbox e aplique as duas mudanças descritas acima.

### Passo 2 — Build e sync

```bash
cd "/Users/francesco/Library/CloudStorage/Dropbox/Livro Colorir Milo"
npm run build:ios
```

### Passo 3 — Incrementar a versão no Xcode

No Xcode, target **App** → aba **General** → **Identity**:
- **Version:** incremente (ex: `1.0.3` → `1.0.4`)
- **Build:** incremente (ex: `4` → `5`)

### Passo 4 — Testar no simulador

1. **Run** (`Cmd + R`)
2. Verifique:
   - ✅ Canto superior direito mostra um pill com livro + divisória + `?`
   - ✅ Toque no livro abre/fecha a história (mesmo comportamento)
   - ✅ Toque no `?` reabre o tutorial
   - ✅ A toolbar não tem mais o botão `?`
   - ✅ Livro ativo fica com fundo verde escuro e ícone branco dentro do pill

### Passo 5 — Arquivar para a App Store

1. **Product → Destination → Any iOS Device (arm64)**
2. **Product → Archive**
3. **Organizer → Distribute App → App Store Connect → Upload**

### Passo 6 — Notas de versão no App Store Connect

**🇧🇷 Português:**
```
Botão de ajuda movido para o topo da tela:
• Fica sempre visível ao lado do botão de história
• A barra de ferramentas ficou mais limpa e espaçosa
```

**🇺🇸 English:**
```
Help button moved to the top of the screen:
• Always visible next to the story button
• Toolbar is now cleaner and less cluttered
```

**🇪🇸 Español:**
```
Botón de ayuda movido a la parte superior de la pantalla:
• Siempre visible junto al botón de historia
• La barra de herramientas quedó más limpia y espaciosa
```

---

## Checklist final

- [ ] Mudança 1 aplicada no `src/MiloApp.jsx` (pill duplo no header)
- [ ] Mudança 2 aplicada no `src/MiloApp.jsx` (remover `?` da toolbar)
- [ ] `npm run build:ios` executado sem erros
- [ ] Versão e Build incrementados no Xcode
- [ ] Simulador: pill livro + `?` aparece no canto superior direito
- [ ] Simulador: livro abre/fecha história normalmente
- [ ] Simulador: `?` reabre o tutorial
- [ ] Simulador: toolbar sem botão `?`
- [ ] Archive criado e enviado ao App Store Connect
- [ ] Notas de versão preenchidas em PT, EN, ES
- [ ] Submitted for Review

---

*Projeto: Livro de Colorir do Milo — Instituto Fise / Dr. Francesco Blumetti*
