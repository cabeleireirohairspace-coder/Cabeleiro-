/* ============================================================
   HAIR SPACE — CONFIGURAÇÃO
   Edite aqui telefone, preços, barbeiros, horários e fotos.
   Não precisa mexer no resto do código.
   ============================================================ */
window.HAIRSPACE = {
  nome: "Hair Space",

  // WhatsApp somente com números: 55 + DDD + número
  whatsapp: "5511947983217",
  whatsappExibicao: "(11) 94798-3217",
  instagram: "hairspace_oficial",

  endereco: "Rua Eternas Ondas, 3 — Cidade A. E. Carvalho",
  mapaUrl: "https://www.google.com/maps/search/?api=1&query=Rua+Eternas+Ondas+3+Cidade+A.E.+Carvalho+S%C3%A3o+Paulo",

  // Horário de funcionamento exibido na página (deixe "" para esconder)
  horarioFuncionamento: "",

  // Dias fechados: 0=domingo, 1=segunda ... 6=sábado. Exemplo: [0] fecha aos domingos
  diasFechados: [],

  // Horários oferecidos no agendamento
  horarios: ["09:00","10:00","11:00","14:00","15:00","16:00","17:00","18:00"],

  // Barbeiros (CONFIRMAR nomes reais antes de publicar)
  barbeiros: ["Qualquer disponível","Carlos","Rafael","Diego"],

  // Serviços e preços (CONFIRMAR valores antes de publicar)
  servicos: [
    { nome: "Corte de cabelo", desc: "Acabamento e estilo",    preco: 45 },
    { nome: "Barba",           desc: "Desenho e finalização",  preco: 30 },
    { nome: "Corte + barba",   desc: "Visual completo",        preco: 70 },
    { nome: "Sobrancelha",     desc: "Design e acabamento",    preco: 15 }
  ],

  // Regras exibidas abaixo do formulário (extraídas do cartaz "Agenda Dezembro" — CONFIRMAR)
  regras: [
    "Tolerância de 10 minutos de atraso.",
    "Em caso de falta, avise com pelo menos 24 horas de antecedência."
  ],

  // Fotos da vitrine (tela inicial) — as que aparecem em destaque
  vitrine: [
    { src: "assets/img/vitrine/risca-lateral-barba.webp", alt: "Corte com risca lateral e barba", pos: "center 20%" },
    { src: "assets/img/vitrine/pompadour-degrade.webp",   alt: "Pompadour com degradê" },
    { src: "assets/img/vitrine/social-risca.webp",        alt: "Corte social com risca" },
    { src: "assets/img/vitrine/mechas-rosas.webp",        alt: "Corte com mechas rosas" },
    { src: "assets/img/vitrine/risco-duplo.webp",         alt: "Corte com risco e barba" },
    { src: "assets/img/vitrine/degrade-desenho.webp",     alt: "Degradê com desenho" }
  ],

  // Galeria completa: vitrine + todas as outras fotos.
  // Para adicionar uma foto: coloque o arquivo em assets/img/galeria/ e inclua uma linha aqui.
  galeria: [
    "assets/img/vitrine/risca-lateral-barba.webp|Corte com risca lateral e barba",
    "assets/img/vitrine/pompadour-degrade.webp|Pompadour com degradê",
    "assets/img/vitrine/social-risca.webp|Corte social com risca",
    "assets/img/vitrine/mechas-rosas.webp|Corte com mechas rosas",
    "assets/img/vitrine/risco-duplo.webp|Corte com risco e barba",
    "assets/img/vitrine/degrade-desenho.webp|Degradê com desenho",
    "assets/img/galeria/cacheado-tijolinho.webp|Corte texturizado com risca",
    "assets/img/galeria/cacheado-volume.webp|Cabelo com volume e degradê",
    "assets/img/galeria/classico-franja.webp|Corte clássico com franja",
    "assets/img/galeria/corte-lateral.webp|Corte com acabamento lateral",
    "assets/img/galeria/degrade-oculos.webp|Degradê com desenho",
    "assets/img/galeria/cacheado-degrade.webp|Cacheado com degradê",
    "assets/img/galeria/risco-duplo-fino.webp|Degradê com risco duplo",
    "assets/img/galeria/navalha-acabamento.webp|Acabamento na navalha",
    "assets/img/galeria/risca-marcada.webp|Degradê com risca marcada",
    "assets/img/galeria/degrade-risca.webp|Degradê com risca e desenho",
  ]
};
