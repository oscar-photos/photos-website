function disableLinks() {
    const links = document.querySelectorAll('.link');
    if (window.innerWidth < 798) {
        links.forEach(link => {
            link.classList.add('disabled-link');
        });
    } else {
        links.forEach(link => {
            link.classList.remove('disabled-link');
        });
    }
}

// Run on initial load
disableLinks();

// Run on window resize
window.addEventListener('resize', disableLinks);