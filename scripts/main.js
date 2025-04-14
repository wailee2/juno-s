// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // 1. Menu Overlay Functionality
    // ======================
    const menuBtn = document.querySelector('.menu-btn');
    const overlay = document.getElementById('menuOverlay');
    const closeBtn = document.querySelector('.close-btn');
    
    // Open overlay when menu button is clicked
    if (menuBtn && overlay) {
        menuBtn.addEventListener('click', function() {
            overlay.style.width = '100%';
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close overlay when close button is clicked
    if (closeBtn && overlay) {
        closeBtn.addEventListener('click', function() {
            overlay.style.width = '0';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close overlay when clicking on a link
    const overlayLinks = document.querySelectorAll('.overlay-content a');
    overlayLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (overlay) {
                overlay.style.width = '0';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Close overlay when clicking outside content
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                overlay.style.width = '0';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // WhatsApp order button functionality
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const phoneNumber = '2348123456789';
            const message = 'Hello, I want to place an order from your website.';
            window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
        });
    });
    
    // Simple cart functionality
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Your cart is currently empty. Browse products to add items.');
        });
    }
    
    // Universal search functionality for all pages
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    if (searchInput && searchButton) {
        // Handle search button click
        searchButton.addEventListener('click', performSearch);
        
        // Handle Enter key press
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        function performSearch() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                // Redirect to products.html with search term
                window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
            }
        }
    }
    
    // If we're on the products page, check for search term in URL
    if (window.location.pathname.includes('products.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = urlParams.get('search');
        
        if (searchTerm) {
            // Set the search input value
            if (searchInput) {
                searchInput.value = decodeURIComponent(searchTerm);
            }
            // Filter products
            filterProducts(decodeURIComponent(searchTerm));
        }
    }
    
    function filterProducts(searchTerm) {
        const productCards = document.querySelectorAll('.product-card');
        let hasResults = false;
        searchTerm = searchTerm.toLowerCase();
        
        productCards.forEach(card => {
            const productName = card.querySelector('.info')?.textContent.toLowerCase() || "";
            const productCategory = card.getAttribute('data-category');
            const productSizes = card.getAttribute('data-sizes');
            
            // Check if search term matches in name, category, or sizes
            if (productName.includes(searchTerm) || 
                productCategory.includes(searchTerm) || 
                (searchTerm === 'shoe' && productCategory === 'shoes') ||
                (searchTerm === 'shirt' && productCategory === 'clothing')) {
                card.style.display = 'block';
                hasResults = true;
            } else {
                card.style.display = 'none';
            }
        });
        
        const noResultsElement = document.querySelector('.no-results');
        if (noResultsElement) {
            noResultsElement.style.display = hasResults ? 'none' : 'block';
        }
    }

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll animations
    function handleScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-left, .animate-right, .animate-up, .animate-fade');
        
        animatedElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check on load
    handleScrollAnimations();
    
    // Check on scroll
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Optional: Add intersection observer for better performance
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.animate-left, .animate-right, .animate-up, .animate-fade').forEach(el => {
            observer.observe(el);
        });
    }
});