// Controle de Alternância de Telas Original (Mantido intacto)
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.querySelectorAll('.bottom a').forEach(nav => {
        nav.removeAttribute('aria-current');
    });

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

// Injeção Dinâmica Corrigida para GitHub Pages (Sem alterar nenhuma tag ou estilo)
document.addEventListener("DOMContentLoaded", () => {
    // 1. Renderizar estritamente as 6 imagens na Vitrine Principal (Início)
    // AJUSTE: Removida a barra "/" inicial para ler as imagens na raiz do repositório
    const vitrineContainer = document.getElementById('vitrineContainer');
    if (vitrineContainer && typeof CONFIG !== 'undefined' && CONFIG.vitrineImagens) {
        vitrineContainer.innerHTML = CONFIG.vitrineImagens.map(imgSrc => `
            <img src="${imgSrc}" alt="Vitrine Hair Space" loading="lazy">
        `).join('');
    }

    // 2. Renderizar TODAS as imagens na Aba da Galeria Completa
    // AJUSTE: Removida a barra "/" inicial para carregar corretamente no GitHub Pages
    const galleryContainer = document.getElementById('galleryContainer');
    if (galleryContainer && typeof CONFIG !== 'undefined') {
        const todasImagens = [...CONFIG.vitrineImagens, ...CONFIG.galeriaImagens];
        galleryContainer.innerHTML = todasImagens.map(imgSrc => `
            <img src="${imgSrc}" alt="Galeria Completa Hair Space" loading="lazy">
        `).join('');
    }

    // 3. Alimentar os selects do formulário de agendamento (Inalterado)
    const serviceSelect = document.getElementById('service');
    if (serviceSelect && typeof CONFIG !== 'undefined' && CONFIG.servicos) {
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

// Envio de Dados via API do WhatsApp Original
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

// Ativação Offline (Service Worker)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js') // AJUSTE: Removida a barra inicial para evitar quebra do PWA
            .then(reg => console.log('PWA carregado offline!', reg))
            .catch(err => console.log('Erro de SW:', err));
    });
}


