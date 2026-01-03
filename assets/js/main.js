/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
  const toggle = document.getElementById(toggleId),
  nav = document.getElementById(navId)

  if(toggle && nav){
      toggle.addEventListener('click', ()=>{
          nav.classList.toggle('show')
      })
  }
}
showMenu('nav-toggle','nav-menu')

/*===== ACTIVE AND REMOVE MENU =====*/
const navLink = document.querySelectorAll('.nav__link');   

function linkAction(){
  /*Active link*/
  navLink.forEach(n => n.classList.remove('active'));
  this.classList.add('active');
  
  /*Remove menu mobile*/
  const navMenu = document.getElementById('nav-menu')
  navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '100px',
    duration: 2000,
    reset: true
});

/*SCROLL HOME*/
sr.reveal('.home__title',{}); 
sr.reveal('.button',{delay: 200}); 
sr.reveal('.home__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 

/*SCROLL ABOUT*/
sr.reveal('.about__img',{}); 
sr.reveal('.about__subtitle',{delay: 400}); 
sr.reveal('.about__text',{delay: 400}); 

sr.reveal('.qualif__icon',{delay:400});
sr.reveal('.qualif__subtitle',{delay:400});
sr.reveal('.qualif__text',{delay:400});
/*SCROLL SKILLS*/
sr.reveal('.skills__subtitle',{}); 
sr.reveal('.skills__text',{delay:600}); 
sr.reveal('.skills__data',{interval: 200}); 
sr.reveal('.skills__img',{delay: 600});
//SCROLL FAMILIAR
sr.reveal('.familiar_cont',{interval: 200});
sr.reveal('.familiar__img',{interval: 200});
sr.reveal('.familiar__subtitle',{interval:200});
/*SCROLL WORK*/
//sr.reveal('.work__img',{delay: 200}); 
//acheivement section
//sr.reveal('.certificate__img',{delay: 200});
/*SCROLL CONTACT*/
sr.reveal('.contact__input',{interval: 50}); 
var typed = new Typed(".typing",{
  strings: ["Senior AI/ML Engineer","LLM Specialist","RAG Systems Expert","Computer Vision Engineer","MLOps Engineer","Agentic AI Developer"],
  typeSpeed: 100,
  backSpeed: 70,
  loop: true
});

// Smooth scrolling for navigation links
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

// Add scroll spy functionality
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Parallax effect for home section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.home__img');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Dynamic skill bar animations
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skills__bar');
    skillBars.forEach((bar, index) => {
        const percentage = bar.parentElement.querySelector('.skills__percentage').textContent;
        const numericValue = parseInt(percentage);
        
        setTimeout(() => {
            bar.style.setProperty('--skill-width', percentage);
            bar.style.width = percentage;
        }, index * 200);
    });
};

// Trigger skill bar animation when skills section is visible
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.about__stat-number');
    counters.forEach(counter => {
        const target = parseFloat(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = current.toFixed(1) + (counter.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
            }
        };
        
        updateCounter();
    });
};

// Trigger counter animation when about section is visible
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('.about');
if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// Add hover effects to project cards
document.querySelectorAll('.work__card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02) rotateX(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
    });
});

// Floating animation for social icons
document.querySelectorAll('.home__social-icon').forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.2}s`;
    icon.style.animation = 'float 3s ease-in-out infinite';
});

// Add ripple effect to buttons
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const rippleCSS = `
.button {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Stagger animation for expertise skills
document.querySelectorAll('.expertise__category').forEach(category => {
    const skills = category.querySelectorAll('.expertise__skill');
    skills.forEach((skill, index) => {
        skill.style.animationDelay = `${index * 0.1}s`;
    });
});

// Add magnetic effect to cards
document.querySelectorAll('.work__card, .llm__card, .blog__category').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        this.style.transform = `perspective(1000px) rotateX(${deltaY * 5}deg) rotateY(${deltaX * 5}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
});

// Header background blur on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.l-header');
    if (window.scrollY > 100) {
        header.style.backdropFilter = 'blur(20px)';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.backdropFilter = 'blur(10px)';
        header.style.backgroundColor = 'rgba(255, 255, 255, 1)';
    }
});




