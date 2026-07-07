// ============================================================
// CONTABILITA — Assessoria Contábil
// ============================================================

// TODO: substituir pelo número real do cliente.
// Formato internacional sem símbolos: 55 + DDD + número.
// Ex.: '5511987654321'
const WHATSAPP_NUMBER = '5500000000000';

const DEFAULT_MESSAGE = 'Olá! Vim pelo site da Contabilita e quero fazer o diagnóstico gratuito.';

function waUrl(message) {
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
}

// Todos os botões marcados com data-wa apontam para o WhatsApp.
// Sem JS, eles levam à seção de contato (fallback do href).
document.querySelectorAll('[data-wa]').forEach(function (link) {
    link.href = waUrl(DEFAULT_MESSAGE);
    link.target = '_blank';
    link.rel = 'noopener';
});

// Formulário: monta a mensagem e abre o WhatsApp já preenchido.
const form = document.getElementById('form-contato');
if (form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const nome = form.nome.value.trim();
        const telefone = form.telefone.value.trim();
        const mensagem = form.mensagem.value.trim();

        let texto = 'Olá! Vim pelo site da Contabilita.\n\nNome: ' + nome;
        if (telefone) {
            texto += '\nTelefone: ' + telefone;
        }
        texto += '\n\n' + mensagem;

        window.open(waUrl(texto), '_blank', 'noopener');
    });
}

// Header ganha fundo sólido ao rolar.
const header = document.querySelector('.site-header');
function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 24);
}
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

// Reveal on scroll — desativado quando o usuário prefere menos movimento
// (o CSS já mostra tudo nesse caso).
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) {
        el.classList.add('visible');
    });
} else {
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(function (el) {
        observer.observe(el);
    });
}
