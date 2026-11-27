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

// 3. Efecto 3D sutil en los expedientes de proyectos al mover el ratón
document.querySelectorAll('.dossier-wrapper').forEach((dossier) => {
    dossier.addEventListener('mousemove', (e) => {
        const rect = dossier.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        dossier.style.transform = `translate(-6px, -8px) rotateX(${y * -3.5}deg) rotateY(${x * 3.5}deg)`;
    });

    dossier.addEventListener('mouseleave', () => {
        dossier.style.transform = '';
    });
});

// 4. Efecto magnético sutil en los botones principales
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

// 5. Efecto de decodificación en títulos de expedientes al hacer hover
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
    }, 20);
}

document.querySelectorAll('.dossier-wrapper').forEach((card) => {
    const title = card.querySelector('.dossier-content h3');
    if (title) {
        card.addEventListener('mouseenter', () => scrambleText(title));
    }
});

// 6. Aparición suave escalonada al hacer scroll
const revealItems = document.querySelectorAll('.reveal-item');

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, idx) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, idx * 70);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    revealItems.forEach((el) => observer.observe(el));
} else {
    revealItems.forEach((el) => el.classList.add('is-visible'));
}

// 7. Estado visual al enviar el formulario de contacto
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value.trim();
        formFeedback.textContent = `[ TRANSMISIÓN PREPARADA PARA ${nombre.toUpperCase() || 'OPERADOR'} — CONECTA UN SERVICIO DE CORREO PARA ENVIAR ]`;
        formFeedback.style.color = '#7B4BB1';
        formFeedback.style.fontWeight = '700';
        contactForm.reset();
    });
}
