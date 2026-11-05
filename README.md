# Hair Space — App da barbearia

Site/app para celular (PWA) com vitrine, galeria completa, agendamento pelo WhatsApp, Clube Hair Space e botão **Baixar app**.

## Estrutura

```
index.html            página principal
manifest.webmanifest  dados do app instalável (nome, cores, ícones)
sw.js                 funcionamento offline e cache
css/style.css         visual
js/config.js          ⭐ telefone, preços, barbeiros, horários e fotos (edite aqui)
js/app.js             lógica (navegação, agendamento, instalar app)
assets/img/vitrine/   6 fotos da tela inicial
assets/img/galeria/   demais fotos da galeria
assets/icons/         ícones do app (feitos com a logo dourada)
```

## Publicar no GitHub (grátis)

1. Crie um repositório no GitHub (ex.: `hairspace`).
2. Envie **todo o conteúdo desta pasta** (incluindo `.nojekyll`).
3. No repositório: **Settings → Pages → Branch: `main` / pasta `/ (root)` → Save**.
4. Em ~1 minuto o app fica em `https://SEU-USUARIO.github.io/hairspace/`.
5. Em `index.html`, troque `assets/img/og.jpg` na tag `og:image` pelo endereço completo, para a prévia aparecer ao compartilhar o link.

Coloque esse link na bio do Instagram. Ao abrir pelo Chrome, o botão **Baixar app** instala o app com o ícone da logo. No iPhone o botão mostra o passo a passo (Safari → Compartilhar → Adicionar à Tela de Início). O navegador interno do Instagram não instala apps; o botão orienta a abrir no navegador.

## Editar conteúdo

- **Preços, barbeiros, horários, telefone, dias fechados:** `js/config.js`.
- **Adicionar foto:** coloque o arquivo (de preferência `.webp` ou `.jpg`, ~800 px de largura) em `assets/img/galeria/` e inclua uma linha em `galeria` no `config.js`. Para aparecer também na vitrine, inclua em `vitrine`.
- **Depois de qualquer mudança**, aumente o número em `sw.js` (`hairspace-v1` → `hairspace-v2`) para os celulares receberem a versão nova.

## Confirmar antes de divulgar

- Preços e nomes dos barbeiros (Carlos, Rafael, Diego).
- Regras do agendamento (tolerância de 10 min e aviso de 24 h), tiradas do cartaz "Agenda Dezembro".
- Horário de funcionamento: está vazio em `config.js` (`horarioFuncionamento`). Preencha para aparecer na página.
- Dias fechados (`diasFechados`), se houver.
- As fotos vieram de prints do Instagram (baixa resolução). Para melhor qualidade, troque pelos arquivos originais do celular.

## Testar no computador

```
python3 -m http.server 8000
```
Abra `http://localhost:8000`.

## App de loja (APK)

O PWA já instala como app. Se quiser um APK/Play Store depois, dá para empacotar este mesmo site com o PWABuilder (pwabuilder.com) ou Bubblewrap.
