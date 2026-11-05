function sendToWhatsApp() {
    // Insira seu número de WhatsApp com DDD abaixo (apenas números)
    const phoneNumber = "5511999999999"; 

    const name = document.getElementById('name').value;
    const service = document.getElementById('service').value;
    const barber = document.getElementById('barber').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    if(!name || !service || !barber || !date || !time) {
        alert("Por favor, preencha todos os campos antes de continuar.");
        return;
    }

    // Formatando a data de YYYY-MM-DD para DD/MM/YYYY
    const formattedDate = date.split('-').reverse().join('/');

    // Montando a mensagem estilizada para o WhatsApp
    const message = `Olá, gostaria de solicitar um agendamento na *Hair Space*!

*Nome:* ${name}
*Serviço:* ${service}
*Barbeiro:* ${barber}
*Data:* ${formattedDate}
*Horário:* ${time}

Aguardo confirmação de disponibilidade.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://whatsapp.com{phoneNumber}&text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
}

// Registro simples do Service Worker (SW.js) para o PWA funcionar
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker registrado!', reg))
            .catch(err => console.log('Falha ao registrar Service Worker', err));
    });
}

