// Aguarda o carregamento do DOM para iniciar o app
document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

function initApp() {
    renderVitrine();
    renderGaleria();
    renderServicos();
    renderBarbeiros();
    setupForm();
    setupNavigation();
}

// Renderiza as 6 imagens da Vitrine Principal
function renderVitrine() {
    const gridVitrine = document.querySelector(".grid-vitrine");
    if (!gridVitrine) return;

    gridVitrine.innerHTML = ""; // Limpa conteúdo anterior
    
    // Pega as imagens definidas no config.js
    CONFIG.vitrineImagens.forEach(url => {
        const img = document.createElement("img");
        img.src = url;
        img.alt = "Corte Hair Space";
        img.loading = "lazy";
        gridVitrine.appendChild(img);
    });
}

// Renderiza as 16 imagens na Galeria Completa (Oculta por padrão)
function renderGaleria() {
    const gridGaleria = document.querySelector(".grid-galeria");
    if (!gridGaleria) return;

    gridGaleria.innerHTML = ""; // Limpa conteúdo anterior

    // Junta as imagens da vitrine com as da galeria para somar as 16 fotos
    const todasImagens = [...CONFIG.vitrineImagens, ...CONFIG.galeriaImagens];

    todasImagens.forEach(url => {
        const img = document.createElement("img");
        img.src = url;
        img.alt = "Trabalho Real Hair Space";
        img.loading = "lazy";
        gridGaleria.appendChild(img);
    });

    // Lógica para abrir/fechar a galeria ao clicar no botão
    const btnVerGaleria = document.getElementById("btn-ver-galeria");
    const secaoGaleria = document.getElementById("galeria-completa");

    if (btnVerGaleria && secaoGaleria) {
        btnVerGaleria.addEventListener("click", () => {
            if (secaoGaleria.classList.contains("galeria-oculta")) {
                secaoGaleria.classList.remove("galeria-oculta");
                secaoGaleria.classList.add("galeria-visivel");
                btnVerGaleria.textContent = "FECHAR GALERIA";
                secaoGaleria.scrollIntoView({ behavior: "smooth" });
            } else {
                secaoGaleria.classList.remove("galeria-visivel");
                secaoGaleria.classList.add("galeria-oculta");
                btnVerGaleria.textContent = "VER GALERIA COMPLETA";
            }
        });
    }
}

// Renderiza as opções de Serviços em destaque com seus preços
function renderServicos() {
    const menuServicos = document.getElementById("menu-servicos");
    const selectServico = document.getElementById("servico");
    if (!menuServicos) return;

    menuServicos.innerHTML = "";
    if (selectServico) selectServico.innerHTML = "";

    CONFIG.servicos.forEach(servico => {
        // Cria a lista visual dos serviços em destaque
        const item = document.createElement("div");
        item.className = "servico-item";
        item.innerHTML = `
            <div class="servico-info">
                <strong>${servico.nome}</strong>
                <p>${servico.id === "combo" ? "Visual completo" : "Finalização e estilo"}</p>
            </div>
            <span class="servico-preco">R$ ${servico.preco.toFixed(2)}</span>
        `;
        menuServicos.appendChild(item);

        // Preenche o <select> do formulário de agendamento
        if (selectServico) {
            const option = document.createElement("option");
            option.value = servico.nome;
            option.textContent = `${servico.nome} - R$ ${servico.preco.toFixed(2)}`;
            selectServico.appendChild(option);
        }
    });
}

// Renderiza a lista de barbeiros no formulário
function renderBarbeiros() {
    const selectBarbeiro = document.getElementById("barbeiro");
    if (!selectBarbeiro) return;

    selectBarbeiro.innerHTML = "";
    CONFIG.barbeiros.forEach(barbeiro => {
        const option = document.createElement("option");
        option.value = barbeiro.nome;
        option.textContent = barbeiro.nome;
        selectBarbeiro.appendChild(option);
    });
}

// Configura o envio do formulário direcionando para o WhatsApp correto
function setupForm() {
    const form = document.getElementById("form-reserva");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nome = document.getElementById("nome").value;
        const servico = document.getElementById("servico").value;
        const barbeiro = document.getElementById("barbeiro").value;
        const dataInput = document.getElementById("data").value;
        const horario = document.getElementById("horario").value;

        // Formata a data para o padrão brasileiro (DD/MM/AAAA)
        const dataFormatada = dataInput.split("-").reverse().join("/");

        // Monta a mensagem de texto estruturada
        const textoMessage = `Olá, gostaria de agendar um horário!\n\n` +
                             `*Nome:* ${nome}\n` +
                             `*Serviço:* ${servico}\n` +
                             `*Barbeiro:* ${barbeiro}\n` +
                             `*Data:* ${dataFormatada}\n` +
                             `*Horário:* ${horario}`;

        const urlWhats = `https://whatsapp.com{CONFIG.whatsappNumber}&text=${encodeURIComponent(textoMessage)}`;
        
        // Abre o WhatsApp em uma nova aba
        window.open(urlWhats, "_blank");
    });
}

// Controla a navegação suave do menu inferior (Navbar)
function setupNavigation() {
    const links = document.querySelectorAll("footer a, .btn-primary");
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (href.startsWith("#")) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                }
            }
        });
    });
}

