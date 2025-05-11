document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.querySelector('.canvas-overlay');
    
    overlay.addEventListener('click', function() {
        this.classList.add('hidden');
    });
}); 