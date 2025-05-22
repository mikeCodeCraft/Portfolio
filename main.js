document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });
        // Hide mobile menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                mobileMenu.classList.add('hidden');
            });
        });

        // Close mobile menu when clicking outside of it
        window.addEventListener('scroll', function () {
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        })
            // Hide mobile menu when clicking/touching outside of it
        document.addEventListener('mousedown', function (e) {
            if (!mobileMenu.classList.contains('hidden') &&
                !mobileMenu.contains(e.target) &&
                !menuButton.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
        document.addEventListener('touchstart', function (e) {
            if (!mobileMenu.classList.contains('hidden') &&
                !mobileMenu.contains(e.target) &&
                !menuButton.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // Copy code blocks to clipboard
    document.querySelectorAll('.code-block').forEach(block => {
        const button = document.createElement('button');
        button.innerHTML = '<i class="far fa-copy"></i>';
        button.className = 'absolute top-2 right-2 text-gray-400 hover:text-white';
        button.title = 'Copy to clipboard';
        button.addEventListener('click', () => {
            const code = block.querySelector('code').textContent;
            navigator.clipboard.writeText(code);
            const originalIcon = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.className = 'absolute top-2 right-2 text-green-500';
            setTimeout(() => {
                button.innerHTML = originalIcon;
                button.className = 'absolute top-2 right-2 text-gray-400 hover:text-white';
            }, 2000);
        });
        // Ensure the code block is positioned relatively for the button
        block.style.position = 'relative';
        block.appendChild(button);
    });
     // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Project filtering
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        const defaultFilter = document.querySelector('.filter-btn[data-filter="all"]');
        if (defaultFilter) {
            defaultFilter.classList.add('filter-active');
        }

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('filter-active'));
                // Add active class to clicked button
                button.classList.add('filter-active');

                const filterValue = button.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category')?.split(',') || [];

                    if (filterValue === 'all' || categories.includes(filterValue)) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });

        // Animation on scroll
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeIn');
                    // Optionally stop observing after animating once:
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.project-card').forEach(card => {
            observer.observe(card);
        });
    
});