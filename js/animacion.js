// Animaciones al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
    
    // Función para animar elementos cuando entran en viewport
    const animateOnScroll = () => {
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animated');
            }
        });
    };

    document.addEventListener('DOMContentLoaded', function() {
    // Obtener la URL actual
    const currentLocation = window.location.pathname;
    
    // Seleccionar todos los enlaces del navbar
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
        // Comparar la URL del enlace con la URL actual
        if (link.href === window.location.href) {
            link.classList.add('active'); // Agregar clase active al enlace correspondiente
        } else {
            link.classList.remove('active'); // Asegurarse de que los demás enlaces no tengan la clase active
        }
    });
});


    // Ejecutar animación al cargar y al hacer scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Efecto hover mejorado para las tarjetas de servicio
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            
            // Animar el icono
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            // Restaurar icono
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Animación de entrada escalonada para las tarjetas
    const staggerAnimation = () => {
        const cards = document.querySelectorAll('.service-card, .about-content');
        
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animationDelay = `${index * 0.2}s`;
                card.classList.add('animate-on-scroll');
            }, index * 100);
        });
    };

    // Ejecutar animación escalonada
    staggerAnimation();

    // Efecto parallax suave (opcional)
    const parallaxElements = document.querySelectorAll('.about-content');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate * 0.1}px)`;
        });
    });

    // Contador animado (si tienes números)
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);
        
        const counter = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);
            
            if (start >= target) {
                element.textContent = target;
                clearInterval(counter);
            }
        }, 16);
    };

    // Observador de intersección para mejor rendimiento
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar todos los elementos con animación
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efecto de escritura para títulos (opcional)
    const typeWriter = (element, text, speed = 100) => {
        let i = 0;
        element.innerHTML = '';
        element.style.borderRight = '2px solid #f39c12';
        
        const type = () => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                // Remover cursor después de escribir
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        type();
    };

    // Activar efecto de escritura en títulos principales
    const mainTitles = document.querySelectorAll('h2');
    mainTitles.forEach((title, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        const originalText = title.textContent;
                        typeWriter(title, originalText, 100);
                    }, index * 500);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(title);
    });
});

// Función para mostrar elementos con delay
function showElementsWithDelay() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Efecto de loading
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    showElementsWithDelay();
});