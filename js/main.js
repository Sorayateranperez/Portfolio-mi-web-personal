// 1. Scroll suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId.length > 1) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// 2. Efecto 3D Tilt en la tarjeta de Identificación / Avatar HUD
const idCard = document.querySelector('.id-card-outer');
const heroRight = document.querySelector('.hero-right');

if (idCard && heroRight) {
    heroRight.addEventListener('mousemove', (e) => {
        const rect = idCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        idCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    heroRight.addEventListener('mouseleave', () => {
        idCard.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });
}

// 3. Efecto magnético sutil en los botones principales
document.querySelectorAll('.btn-bevel').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.18 - 3}px, ${y * 0.18 - 3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// 4. Efecto de decodificación en títulos de proyectos al hacer hover
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789//_#';

function scrambleText(element) {
    const originalText = element.dataset.original || element.textContent;
    element.dataset.original = originalText;
    let iteration = 0;

    clearInterval(element.scrambleInterval);

    element.scrambleInterval = setInterval(() => {
        element.textContent = originalText
            .split('')
            .map((letter, index) => {
                if (letter === ' ') return ' ';
                if (index < iteration) return originalText[index];
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');

        if (iteration >= originalText.length) {
            clearInterval(element.scrambleInterval);
        }
        iteration += 1 / 2;
    }, 22);
}

document.querySelectorAll('.project-wrapper').forEach((card) => {
    const title = card.querySelector('.card-mid h3');
    if (title) {
        card.addEventListener('mouseenter', () => scrambleText(title));
    }
});
