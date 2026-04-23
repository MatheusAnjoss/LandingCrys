// Menu Toggle Mobile
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');
    });
});

// Smooth Scroll Animado com Easing Suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const targetPosition = target.offsetTop - 80;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1500;
            let start = null;

            const easeInOutCubic = (t) => {
                return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            };

            const animation = (currentTime) => {
                if (start === null) start = currentTime;
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                const run = easeInOutCubic(progress);
                window.scrollTo(0, startPosition + distance * run);
                if (elapsed < duration) {
                    requestAnimationFrame(animation);
                }
            };

            requestAnimationFrame(animation);
        }
    });
});

// Função para verificar e animar elementos visíveis
function checkElementsVisibility() {
    const elementsToCheck = document.querySelectorAll(
        '.hero, .sobre, .servicos, .contato, .carousel-text, .sobre-content, .servicos-grid, .servico-card, .contato-content, .info-item'
    );

    elementsToCheck.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.9 && rect.bottom > window.innerHeight * 0.1;

        if (isVisible) {
            element.classList.add('fade-in');
        } else if (rect.top > window.innerHeight) {
            element.classList.remove('fade-in');
        }
    });
}

// Fade In/Out ao Scroll com múltiplos eventos
const scrollEvents = ['scroll', 'wheel', 'mousewheel', 'touchmove', 'keydown'];

scrollEvents.forEach(event => {
    window.addEventListener(event, checkElementsVisibility, { passive: true });
});

// Verificar logo ao carregar
window.addEventListener('load', checkElementsVisibility);

// Chamar uma vez após um pequeno delay para garantir que o DOM está pronto
setTimeout(checkElementsVisibility, 100);

// Adicionar classe ativa ao navbar ao scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

console.log('Landing page carregada com sucesso!');
