
// Controle de Alternância de Telas (Mapeado com o CSS)
function showScreen(screenId) {
    // Esconde todas as telas
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    // Remove marcação ativa do menu inferior
    document.querySelectorAll('.bottom a').forEach(nav => {
        nav.removeAttribute('aria-current');
    });

    // Ativa a tela escolhida e marca o menu inferior correspondente
    const targetScreen = document.getElementById(screenId);
    if(targetScreen) {
        targetScreen.classList.add('active');
        window.scrollTo(0,0);
    }
    
    const targetNav = document.getElementById(`nav-${screenId}`);
    if(targetNav) {
        targetNav.setAttribute('aria-current', 'page');
    }
}

// Injeção Dinâmica Segura - Executa apenas após o HTML estar 100% pronto
document.addEventListener("DOMContentLoaded", () => {
    // 1. Renderizar Serviços na Vitrine Principal
    const servicesContainer = document.getElementById('servicesContainer');
    if (servicesContainer && typeof CONFIG !== 'undefined' && CONFIG.servicos) {
        servicesContainer.innerHTML = CONFIG.servicos.map(s => `
            <div class="service">
                <div>
                    <strong>${s.nome}</strong>
                    <small>Procedimento premium</small>
                </div>
                <div class="price">R$ ${s.preco.toFixed(2).replace('.', ',')}</div>
            </div>
        `).join('');
    }

    // 2. Renderizar Imagens na Galeria Dinâmica (Lendo os arquivos da raiz)
    const galleryContainer = document.getElementById('galleryContainer');
    if (galleryContainer && typeof CONFIG !== 'undefined') {
        // Filtra e unifica apenas as imagens que você já subiu para a raiz
        const todasImagens = [...CONFIG.vitrineImagens, ...CONFIG.galeriaImagens];
        
        galleryContainer.innerHTML = todasImagens.map(imgSrc => `
            <img src="${imgSrc}" alt="Trabalho Realizado Hair Space" loading="lazy">
        `).join('');
    }

    // 3. Alimentar os Campos de Seleção do Formulário de Agendamento
    const serviceSelect = document.getElementById('service');
    if (serviceSelect && typeof CONFIG !== 'undefined' && CONFIG.servicos) {
        // Limpa opções antigas estáticas se houverem
        serviceSelect.innerHTML = '<option value="" disabled selected>Selecione um serviço</option>';
        CONFIG.servicos.forEach(s => {
            const opt = document.createElement('option');
            opt.value = `${s.nome} (R$ ${s.preco.toFixed(2).replace('.', ',')})`;
            opt.textContent = `${s.nome} - R$ ${s.preco.toFixed(2).replace('.', ',')}`;
            serviceSelect.appendChild(opt);
        });
    }

    const barberSelect = document.getElementById('barber');
    if (barberSelect && typeof CONFIG !== 'undefined' && CONFIG.barbeiros) {
        barberSelect.innerHTML = '<option value="" disabled selected>Escolha o profissional</option>';
        CONFIG.barbeiros.forEach(b => {
            const opt = document.createElement('option');
            opt.value = b.nome;
            opt.textContent = b.nome;
            barberSelect.appendChild(opt);
        });
    }
});

// Envio Inteligente ao WhatsApp integrado ao CONFIG
function sendToWhatsApp() {
    if (typeof CONFIG === 'undefined') return;
    
    const phoneNumber = CONFIG.whatsappNumber; 

    const name = document.getElementById('name').value;
    const service = document.getElementById('service').value;
    const barber = document.getElementById('barber').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    if (!name || !service || !barber || !date || !time) {
        alert("Por favor, preencha todos os campos antes de continuar.");
        return;
    }

    const formattedDate = date.split('-').reverse().join('/');

    const message = `Olá, gostaria de solicitar um agendamento na *${CONFIG.barbeariaName}*!\n\n` +
                    `*Nome:* ${name}\n` +
                    `*Serviço:* ${service}\n` +
                    `*Barbeiro:* ${barber}\n` +
                    `*Data:* ${formattedDate}\n` +
                    `*Horário:* ${time}\n\n` +
                    `Aguardo confirmação de disponibilidade.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://whatsapp.com{phoneNumber}&text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
}

// Inicialização do Service Worker para PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('PWA Service Worker ativo!', reg))
            .catch(err => console.log('Falha ao instanciar SW offline', err));
    });
}
