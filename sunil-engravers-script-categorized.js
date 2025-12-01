// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
    }
});

// Form submission handler
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Simple validation
        if (name && email && message) {
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }

        // In a real application, you would send this data to a server
        console.log('Form Data:', { name, email, phone, message });
    });
}

// Gallery Categories Configuration
const categories = {
    rings: { name: 'Rings', count: 0 },
    earrings: { name: 'Earrings', count: 0 },
    necklaces: { name: 'Necklaces', count: 0 },
    chains: { name: 'Chains', count: 0 },
    bangles: { name: 'Bangles', count: 0 },
    pendants: { name: 'Pendants', count: 0 },
    other: { name: 'Other', count: 0 }
};

// Generate Gallery Items Dynamically
document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.getElementById('galleryGrid');

    // Load images from each category folder
    Object.keys(categories).forEach(category => {
        // For now, we'll create placeholders for each category
        // You'll need to organize photos into category folders
        loadCategoryImages(category, galleryGrid);
    });

    // Setup category filter buttons
    setupCategoryFilters();

    // Initialize animations after gallery is loaded
    setTimeout(() => {
        initScrollAnimations();
    }, 100);
});

// Load images from a specific category
function loadCategoryImages(category, container) {
    // Check images in category folders (1.jpg to 100.jpg in each category)
    // This will try to load images from category folders
    for (let i = 1; i <= 100; i++) {
        const img = new Image();
        const imagePath = `images/${category}/${i}.jpg`;

        img.onload = function() {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.setAttribute('data-category', category);

            galleryItem.innerHTML = `
                <img src="${imagePath}" alt="${categories[category].name} ${i}" loading="lazy">
                <div class="gallery-overlay">
                    <p>${categories[category].name} #${i}</p>
                </div>
            `;

            container.appendChild(galleryItem);
            categories[category].count++;

            // Re-initialize animations
            initScrollAnimations();
        };

        img.src = imagePath;
    }
}

// Setup Category Filter Functionality
function setupCategoryFilters() {
    const filterButtons = document.querySelectorAll('.category-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Get selected category
            const selectedCategory = button.getAttribute('data-category');

            // Filter gallery items
            filterGallery(selectedCategory);
        });
    });
}

// Filter Gallery by Category
function filterGallery(category) {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        if (category === 'all') {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 10);
        } else {
            const itemCategory = item.getAttribute('data-category');
            if (itemCategory === category) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        }
    });
}

// Scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .feature-item, .gallery-item');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}
