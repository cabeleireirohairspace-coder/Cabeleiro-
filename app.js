(function () {
  "use strict";
  var C = window.HAIRSPACE;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var brl = function (n) { return "R$ " + n; };

  /* ---------- Conteúdo a partir da config ---------- */
  function imgTag(src, alt, pos) {
    var style = pos ? ' style="object-position:' + pos + '"' : "";
    return '<img src="' + src + '" alt="' + alt + '" width="360" height="480" loading="lazy" decoding="async"' + style + ">";
  }
  $("#vitrine").innerHTML = C.vitrine.map(function (f) { return imgTag(f.src, f.alt, f.pos); }).join("");
  $("#galeriaGrid").innerHTML = C.galeria.map(function (l) {
    var p = l.split("|"); return imgTag(p[0], p[1] || "Trabalho da Hair Space");
  }).join("");

  $("#servicos").innerHTML = C.servicos.map(function (s) {
    return '<div class="service"><div><strong>' + s.nome + "</strong><small>" + s.desc + '</small></div><div class="price">' + brl(s.preco) + "</div></div>";
  }).join("");
  $("#servico").innerHTML = C.servicos.map(function (s) {
    return "<option>" + s.nome + " — " + brl(s.preco) + "</option>";
  }).join("");
  $("#barbeiro").innerHTML = C.barbeiros.map(function (b) { return "<option>" + b + "</option>"; }).join("");
  $("#regras").innerHTML = (C.regras || []).map(function (r) { return "<li>" + r + "</li>"; }).join("");

  var wa = "https://wa.me/" + C.whatsapp;
  $("#contato").innerHTML =
    "<p>📍 " + C.endereco + ' — <a href="' + C.mapaUrl + '" target="_blank" rel="noopener">ver no mapa</a></p>' +
    (C.horarioFuncionamento ? "<p>🕘 " + C.horarioFuncionamento + "</p>" : "") +
    '<p>📸 Instagram: <a href="https://instagram.com/' + C.instagram + '" target="_blank" rel="noopener">@' + C.instagram + "</a></p>" +
    '<p>📲 WhatsApp: <a href="' + wa + '" target="_blank" rel="noopener">' + C.whatsappExibicao + "</a></p>" +
    '<a class="btn block" href="' + wa + "?text=" + encodeURIComponent("Olá, quero agendar um horário na Hair Space.") + '" target="_blank" rel="noopener">FALAR NO WHATSAPP</a>';

  /* ---------- Navegação (hash) ---------- */
  var screens = ["home", "agendar", "galeria", "fidelidade"];
  function route() {
    var id = location.hash.replace("#", "");
    if (screens.indexOf(id) < 0) id = "home";
    $$(".screen").forEach(function (s) { s.classList.toggle("active", s.id === id); });
    $$(".bottom a").forEach(function (a) {
      if (a.dataset.screen === id) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    window.scrollTo(0, 0);
    var h = $("#" + id + " h2[tabindex], #" + id + " h3[tabindex]");
    if (h && document.readyState === "complete") h.focus({ preventScroll: true });
  }
  window.addEventListener("hashchange", route);
  route();

  /* ---------- Agendamento ---------- */
  var dataEl = $("#data"), horaEl = $("#hora"), hint = $("#dataHint");
  function iso(d) { return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10); }
  dataEl.min = iso(new Date());

  function fillHours() {
    var now = new Date(), v = dataEl.value, slots = C.horarios.slice();
    hint.hidden = true; dataEl.setCustomValidity("");
    if (v) {
      var d = new Date(v + "T12:00:00");
      if (C.diasFechados.indexOf(d.getDay()) >= 0) {
        slots = []; hint.textContent = "Fechado neste dia. Escolha outra data."; hint.hidden = false;
        dataEl.setCustomValidity("Dia fechado");
      } else if (v === iso(now)) {
        slots = slots.filter(function (h) {
          var p = h.split(":"); var t = new Date(); t.setHours(+p[0], +p[1], 0, 0); return t > now;
        });
        if (!slots.length) { hint.textContent = "Não há mais horários hoje. Escolha outra data."; hint.hidden = false; }
      }
    }
    horaEl.innerHTML = slots.length ? slots.map(function (h) { return "<option>" + h + "</option>"; }).join("") : "<option value=''>Sem horários</option>";
    horaEl.disabled = !slots.length;
  }
  dataEl.addEventListener("change", fillHours);
  fillHours();

  $("#booking").addEventListener("submit", function (e) {
    e.preventDefault();
    var nome = $("#nome").value.trim();
    if (!nome) { $("#nome").focus(); return; }
    if (!dataEl.value) { dataEl.focus(); return; }
    if (!dataEl.checkValidity() || horaEl.disabled || !horaEl.value) { dataEl.focus(); return; }
    var d = new Date(dataEl.value + "T12:00:00").toLocaleDateString("pt-BR");
    var texto = [
      "Olá, Hair Space! Quero solicitar um agendamento.", "",
      "Nome: " + nome,
      "Serviço: " + $("#servico").value,
      "Barbeiro: " + $("#barbeiro").value,
      "Data: " + d,
      "Horário desejado: " + horaEl.value, "",
      "Podem confirmar a disponibilidade?"
    ].join("\n");
    var a = document.createElement("a");
    a.href = wa + "?text=" + encodeURIComponent(texto);
    a.target = "_blank"; a.rel = "noopener";
    document.body.appendChild(a); a.click(); a.remove();
  });

  /* ---------- Instalar app (PWA) ---------- */
  var deferred = null;
  var ua = navigator.userAgent || "";
  var isIOS = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  var inApp = /Instagram|FBAN|FBAV|FB_IAB|Line\/|MicroMessenger|TikTok/i.test(ua);
  var isAndroid = /Android/.test(ua);
  function isInstalled() {
    return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  }
  function syncInstallUI() {
    var show = !isInstalled();
    $$("[data-install]").forEach(function (b) { b.hidden = !show; });
    $$("[data-install-section]").forEach(function (s) { s.hidden = !show; });
  }
  syncInstallUI();
  window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); deferred = e; });
  window.addEventListener("appinstalled", function () { deferred = null; syncInstallUI(); });

  var sheet = $("#installSheet");
  function openSheet(titulo, intro, passos) {
    $("#installTitle").textContent = titulo;
    $("#installIntro").textContent = intro;
    $("#installSteps").innerHTML = passos.map(function (p) { return "<li>" + p + "</li>"; }).join("");
    if (sheet.showModal) sheet.showModal(); else sheet.setAttribute("open", "");
  }
  $("#installClose").addEventListener("click", function () { sheet.close ? sheet.close() : sheet.removeAttribute("open"); });
  sheet.addEventListener("click", function (e) { if (e.target === sheet) sheet.close(); });

  function onInstall() {
    if (deferred) {
      var p = deferred; deferred = null;
      p.prompt();
      p.userChoice.then(syncInstallUI);
      return;
    }
    if (inApp) {
      openSheet("Abra no navegador", "O navegador do Instagram não permite instalar apps. Abra esta página no " + (isIOS ? "Safari" : "Chrome") + ":",
        ["Toque nos <strong>três pontinhos</strong> (⋯ ou ⋮) no canto da tela", "Escolha <strong>Abrir no navegador</strong>", "Depois toque em <strong>Baixar app</strong> de novo"]);
    } else if (isIOS) {
      openSheet("Instalar no iPhone", "No iPhone, a instalação é feita pelo Safari:",
        ["Abra esta página no <strong>Safari</strong>", "Toque no botão <strong>Compartilhar</strong> (quadrado com seta)", "Escolha <strong>Adicionar à Tela de Início</strong>", "Toque em <strong>Adicionar</strong>"]);
    } else if (isAndroid) {
      openSheet("Instalar no Android", "Pelo Chrome, em poucos toques:",
        ["Toque nos <strong>três pontinhos</strong> (⋮) no canto superior", "Escolha <strong>Instalar app</strong> ou <strong>Adicionar à tela inicial</strong>", "Confirme em <strong>Instalar</strong>"]);
    } else {
      openSheet("Instalar no computador", "No Chrome ou Edge:",
        ["Clique no ícone de <strong>instalar</strong> na barra de endereço", "Ou abra o menu ⋮ e escolha <strong>Instalar Hair Space</strong>"]);
    }
  }
  $$("[data-install]").forEach(function (b) { b.addEventListener("click", onInstall); });

  /* ---------- Service worker ---------- */
  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
    window.addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); });
  }
})();
