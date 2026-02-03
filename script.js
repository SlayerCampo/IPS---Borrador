/**
 * IPS LITORAL SALUD - Lógica de Interacción Dinámica Mejorada
 * Versión optimizada para móvil
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('IPS Litoral Salud - Inicializando');

    // --- 1. ELEMENTOS CLAVE ---
    const heroBrand = document.getElementById('brand-identity');
    const stickyNav = document.getElementById('sticky-nav');
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    const animatedBoxes = document.querySelectorAll('.animate-box');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const contactForm = document.getElementById('contactForm');

    // --- 2. EFECTO DE TRANSFORMACIÓN DEL LOGO AL HACER SCROLL ---
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const triggerHeight = 100;
        
        const isMobile = window.innerWidth <= 768;
        const adjustedTrigger = isMobile ? 50 : triggerHeight;

        if (scrollY > adjustedTrigger) {
            heroBrand.classList.add('stuck');
            stickyNav.classList.add('visible');
        } else {
            heroBrand.classList.remove('stuck');
            stickyNav.classList.remove('visible');
        }

        // Animación de entrada de elementos
        revealOnScroll();
        
        // Actualizar el enlace activo en la navegación
        updateActiveNavLink();
    });

    // --- 3. FUNCIONALIDAD "LEER MÁS" MEJORADA ---
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const parent = btn.closest('.expandable-content, .card-content, .value-content') || btn.parentElement;
            const content = parent.querySelector('.more-text');
            
            if (content) {
                const isActive = content.classList.contains('active');
                
                // Alternar el estado actual
                content.classList.toggle('active');
                
                // Cambiar el texto y el icono del botón
                if (content.classList.contains('active')) {
                    if (!btn.hasAttribute('data-original-text')) {
                        btn.setAttribute('data-original-text', btn.innerHTML);
                    }
                    btn.innerHTML = 'Leer menos <i class="fa-solid fa-chevron-up"></i>';
                    btn.classList.add('active');
                } else {
                    btn.innerHTML = btn.getAttribute('data-original-text') || 'Leer más <i class="fa-solid fa-chevron-down"></i>';
                    btn.classList.remove('active');
                }
            }
        });
    });

    // --- 4. ANIMACIÓN DE ENTRADA (REVEAL) MEJORADA ---
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        animatedBoxes.forEach(box => {
            const boxTop = box.getBoundingClientRect().top;

            if (boxTop < triggerBottom) {
                if (!box.classList.contains('show')) {
                    box.classList.add('show');
                    box.style.opacity = "1";
                    box.style.transform = "translateY(0)";
                }
            }
        });
    };

    // Configuración inicial de las cajas para la animación
    animatedBoxes.forEach(box => {
        box.style.opacity = "0";
        box.style.transform = "translateY(30px)";
        box.style.transition = "all 0.8s ease-out";
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // --- 5. MENÚ HAMBURGUESA MÓVIL MEJORADO ---
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            menuToggle.classList.toggle('active');
            
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('mobile-active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });

        // Cerrar menú al hacer clic en un enlace (solo en móvil)
        if (window.innerWidth <= 768) {
            const navLinksItems = navLinks.querySelectorAll('a');
            navLinksItems.forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('mobile-active');
                    menuToggle.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    document.body.style.overflow = '';
                });
            });
        }
    }

    // --- 6. ACTUALIZAR ENLACE ACTIVO EN NAVEGACIÓN ---
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinksItems = document.querySelectorAll('.nav-links a');
        
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // --- 7. FORMULARIOS ---
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Por favor, ingresa un correo electrónico válido.');
                return;
            }
            
            // Simular envío
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // --- 8. FUNCIONES UTILITARIAS ---
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // --- 9. SMOOTH SCROLL PARA ENLACES INTERNOS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#contacto') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const navHeight = stickyNav.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // --- 10. AJUSTES INICIALES ---
    function adjustHeroHeight() {
        const hero = document.querySelector('.hero-initial');
        if (hero && window.innerWidth <= 768) {
            hero.style.height = `${window.innerHeight}px`;
        }
    }
    
    adjustHeroHeight();
    window.addEventListener('resize', adjustHeroHeight);
    
    console.log('IPS Litoral Salud - Inicialización completa');
});

// --- 11. MANEJO DE ERRORES ---
window.addEventListener('error', (e) => {
    console.error('Error en IPS Litoral Salud:', e.error);
});