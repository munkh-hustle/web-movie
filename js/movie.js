document.addEventListener('DOMContentLoaded', function() {
    // This would typically load more movie details from an API
    // For now, we'll just add some interactive elements
    
    // Add to list functionality
    const addToListBtn = document.querySelector('.btn-outline:nth-of-type(1)');
    addToListBtn.addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-check"></i> Added to List';
        this.style.backgroundColor = 'var(--primary-color)';
        this.style.borderColor = 'var(--primary-color)';
        
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-plus"></i> Add to List';
            this.style.backgroundColor = 'transparent';
            this.style.borderColor = 'var(--light-color)';
        }, 2000);
    });
    
    // Share button functionality
    const shareBtn = document.querySelector('.btn-outline:nth-of-type(2)');
    shareBtn.addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: 'How To Train Your Dragon: The Hidden World',
                text: 'Check out this amazing movie!',
                url: window.location.href
            }).catch(err => {
                console.log('Error sharing:', err);
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            alert('Share this movie with your friends!');
        }
    });
});