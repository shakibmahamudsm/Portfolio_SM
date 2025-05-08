// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Set initial theme
document.documentElement.setAttribute('data-theme', 
    localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light')
);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    themeToggle.innerHTML = newTheme === 'light' ? 
        '<i class="fas fa-moon"></i>' : 
        '<i class="fas fa-sun"></i>';
});

// Mobile Menu
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

menuToggle.addEventListener('click', () => {
    // Toggle menu
    navLinks.classList.toggle('active');
    body.classList.toggle('menu-open');
    
    // Update icon
    const isOpen = navLinks.classList.contains('active');
    menuToggle.innerHTML = isOpen ? 
        '<i class="fas fa-times"></i>' : 
        '<i class="fas fa-bars"></i>';
    
    // Update aria-label for accessibility
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const isClickInside = navLinks.contains(e.target) || menuToggle.contains(e.target);
    
    if (!isClickInside && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.setAttribute('aria-label', 'Open menu');
    }
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            menuToggle.setAttribute('aria-label', 'Open menu');
        }
    });
});

// Close menu on window resize if open
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.setAttribute('aria-label', 'Open menu');
    }
});

// Project Filters
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 0);
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    });
});

// Blog Posts
const blogPosts = [
    {
        title: "Understanding Machine Learning Models",
        date: "2024-03-15",
        excerpt: "A deep dive into different types of machine learning models and when to use them...",
        tags: ["Machine Learning", "AI", "Data Science"]
    },
    {
        title: "Data Visualization Best Practices",
        date: "2024-03-10",
        excerpt: "Learn how to create effective and engaging data visualizations...",
        tags: ["Data Visualization", "Best Practices"]
    },
    {
        title: "Natural Language Processing in Python",
        date: "2024-03-05",
        excerpt: "A practical guide to implementing NLP techniques using Python...",
        tags: ["NLP", "Python", "Machine Learning"]
    }
];

function createBlogPost(post) {
    return `
        <article class="blog-post">
            <h3>${post.title}</h3>
            <div class="post-meta">
                <span class="date">${new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}</span>
                <div class="tags">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
            <p>${post.excerpt}</p>
            <a href="#" class="read-more">Read More</a>
        </article>
    `;
}

// Load blog posts
const blogList = document.getElementById('blog-list');
if (blogList) {
    blogList.innerHTML = blogPosts.map(post => createBlogPost(post)).join('');
}

// Form Validation
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !message) {
            formMessage.textContent = 'Please fill in all fields';
            formMessage.className = 'error';
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formMessage.textContent = 'Please enter a valid email address';
            formMessage.className = 'error';
            return;
        }
        
        // Simulate form submission
        formMessage.textContent = 'Message sent successfully!';
        formMessage.className = 'success';
        contactForm.reset();
        
        // Clear success message after 3 seconds
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = '';
        }, 3000);
    });
}

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
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                menuToggle.setAttribute('aria-label', 'Open menu');
            }
        }
    });
});
