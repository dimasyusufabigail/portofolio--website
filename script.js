// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation highlighting
    function updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Typing animation for the main title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Start typing animation when page loads
    const mainTitle = document.querySelector('#about h1');
    if (mainTitle) {
        const originalText = mainTitle.textContent;
        setTimeout(() => {
            typeWriter(mainTitle, originalText, 150);
        }, 1000);
    }
    
    // Parallax effect for sections
    function parallaxEffect() {
        const sections = document.querySelectorAll('section');
        const scrolled = window.pageYOffset;
        
        sections.forEach((section, index) => {
            const rate = scrolled * -0.5;
            const yPos = -(rate / (index + 1));
            section.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    // Apply parallax on scroll (with throttling)
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(parallaxEffect);
            ticking = true;
            setTimeout(() => { ticking = false; }, 16);
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Skill items hover effect with random colors
    const skillItems = document.querySelectorAll('#skills li');
    const colors = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
    ];
    
    skillItems.forEach((item, index) => {
        const originalBackground = item.style.background;
        
        item.addEventListener('mouseenter', function() {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            this.style.background = randomColor;
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Project items click effect
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add a pulse animation
            this.style.animation = 'pulse 0.6s ease-in-out';
            
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });
    
    // Contact section interactive elements
    const contactSection = document.querySelector('#contact');
    const contactItems = contactSection.querySelectorAll('p');
    
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            // Copy to clipboard functionality (for email and phone)
            const text = this.textContent;
            
            if (text.includes('Email:') || text.includes('Phone:')) {
                const value = text.split(': ')[1];
                
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(value).then(() => {
                        showNotification('Disalin ke clipboard!');
                    });
                }
            }
        });
        
        item.style.cursor = 'pointer';
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Notification system
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    }
    
    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        nav a.active {
            background: #667eea !important;
            color: white !important;
            transform: translateY(-2px);
        }
        
        .project-item {
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    console.log('Website portofolio berhasil dimuat!');
    console.log('Dibuat oleh: Dimas Yusuf Budianto');
    console.log('Sekolah: SMK Krian 1');
});

