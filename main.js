// Demo blog posts data
const blogPosts = [
    {
        title: "How I Built a Customer Churn Model",
        date: "April 2025",
        summary: "A step-by-step guide to building, evaluating, and deploying a churn prediction model using Python and scikit-learn.",
        link: "#"
    },
    {
        title: "Visualizing Data with Python",
        date: "March 2025",
        summary: "Tips and tricks for creating impactful data visualizations using Matplotlib and Seaborn.",
        link: "#"
    },
    {
        title: "Getting Started with Deep Learning",
        date: "February 2025",
        summary: "An introduction to deep learning concepts and building your first neural network with TensorFlow.",
        link: "#"
    }
];

// Render blog posts
function renderBlogPosts() {
    const blogList = document.getElementById('blog-list');
    blogPosts.forEach(post => {
        const div = document.createElement('div');
        div.className = 'blog-post';
        div.innerHTML = `
            <h3>${post.title}</h3>
            <div class="date">${post.date}</div>
            <p>${post.summary}</p>
            <a href="${post.link}" class="button">Read More</a>
        `;
        blogList.appendChild(div);
    });
}

// Contact form handling (demo only)
document.addEventListener('DOMContentLoaded', () => {
    renderBlogPosts();

    const form = document.getElementById('contact-form');
    const formMsg = document.getElementById('form-message');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        formMsg.textContent = "Thank you for reaching out! (Demo: Form not actually submitted.)";
        form.reset();
    });
});
