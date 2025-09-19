window.onload = function() {
    const fadeInElement = document.querySelectorAll('.fade-in');
    console.log(fadeInElement);
    for (const element of fadeInElement) {
        element.classList.add('show');
    }
};
