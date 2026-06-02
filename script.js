// Minimalist Developer Portfolio Script - Shoheb Amin
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Responsive Navigation Menu
    // ==========================================
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const navbar = document.querySelector('.navbar');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // Scroll Navbar Border Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // ==========================================
    // 2. Project Category Filtering
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons && projectCards) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Toggle active classes
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    card.classList.add('filtering');
                    
                    setTimeout(() => {
                        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                            card.classList.remove('hide');
                            card.classList.remove('filtering');
                        } else {
                            card.classList.add('hide');
                        }
                    }, 200);
                });
            });
        });
    }


    // ==========================================
    // 3. Navigation Link Active Scroll Spy
    // ==========================================
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    const spyScroll = () => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', spyScroll);
    spyScroll();


    // ==========================================
    // 4. Contact Form Validation & Toast Notification
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending Message...';

            // Prepare and send JSON data to FormSubmit API
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            fetch('https://formsubmit.co/ajax/shohebamin7@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(async (response) => {
                if (response.status === 200) {
                    submitBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message Sent!';
                    submitBtn.style.backgroundColor = '#10b981'; // solid clean green
                    showToast('Thank you! Shoheb will get back to you shortly.');
                } else {
                    submitBtn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Error';
                    showToast('Oops! Something went wrong. Please try again.');
                }
            })
            .catch(error => {
                submitBtn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Error';
                showToast('Network error. Please check your connection.');
            })
            .finally(() => {
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = '';
                }, 3500);
            });
        });
    }

    function showToast(message) {
        // Remove existing toast if present
        const oldToast = document.querySelector('.toast-notification');
        if (oldToast) oldToast.remove();

        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">âœ“</span>
                <span class="toast-message">${message}</span>
            </div>
        `;
        document.body.appendChild(toast);
        
        // Simple slide/fade-in
        setTimeout(() => toast.classList.add('show'), 50);

        // Remove after 3.5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }
});
