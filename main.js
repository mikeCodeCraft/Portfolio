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
});