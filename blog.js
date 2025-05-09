// Blog Detail Page Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Get blog ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');

    if (blogId) {
        loadBlogPost(blogId);
        loadRelatedPosts(blogId);
    } else {
        // Handle case when no blog ID is provided
        document.querySelector('.blog-content').innerHTML = `
            <div class="error-message">
                <h2>Blog Post Not Found</h2>
                <p>The requested blog post could not be found.</p>
                <a href="index.html#blog" class="btn">Return to Blog</a>
            </div>
        `;
    }
});

// Function to load blog post content
async function loadBlogPost(blogId) {
    try {
        // In a real application, this would be an API call
        // For now, we'll simulate loading data
        const blogPost = await getBlogPost(blogId);
        
        if (blogPost) {
            updateBlogContent(blogPost);
            updatePageMetadata(blogPost);
        } else {
            throw new Error('Blog post not found');
        }
    } catch (error) {
        console.error('Error loading blog post:', error);
        showErrorMessage();
    }
}

// Function to load related posts
async function loadRelatedPosts(currentBlogId) {
    try {
        // In a real application, this would be an API call
        const relatedPosts = await getRelatedPosts(currentBlogId);
        updateRelatedPosts(relatedPosts);
    } catch (error) {
        console.error('Error loading related posts:', error);
    }
}

// Function to update blog content
function updateBlogContent(blogPost) {
    const blogContent = document.querySelector('.blog-content');
    
    blogContent.innerHTML = `
        <article>
            <header class="blog-header">
                <div class="blog-meta">
                    <span class="date">${formatDate(blogPost.date)}</span>
                    <div class="tags">
                        ${blogPost.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <h1>${blogPost.title}</h1>
            </header>
            
            <div class="blog-body">
                ${blogPost.content}
            </div>
            
            <footer class="blog-footer">
                <div class="author-info">
                    <img src="${blogPost.author.image}" alt="${blogPost.author.name}" class="author-image">
                    <div class="author-details">
                        <h3>${blogPost.author.name}</h3>
                        <p>${blogPost.author.bio}</p>
                    </div>
                </div>
                
                <div class="share-buttons">
                    <button class="share-btn" onclick="shareOnTwitter()">
                        <i class="fab fa-twitter"></i> Share on Twitter
                    </button>
                    <button class="share-btn" onclick="shareOnLinkedIn()">
                        <i class="fab fa-linkedin"></i> Share on LinkedIn
                    </button>
                </div>
            </footer>
        </article>
    `;
}

// Function to update related posts
function updateRelatedPosts(posts) {
    const relatedPostsContainer = document.querySelector('.related-posts');
    
    if (posts.length > 0) {
        const postsHTML = posts.map(post => `
            <div class="related-post">
                <h4><a href="blog-detail.html?id=${post.id}">${post.title}</a></h4>
                <span class="date">${formatDate(post.date)}</span>
            </div>
        `).join('');
        
        relatedPostsContainer.innerHTML = `
            <h3>Related Posts</h3>
            ${postsHTML}
        `;
    } else {
        relatedPostsContainer.style.display = 'none';
    }
}

// Function to update page metadata
function updatePageMetadata(blogPost) {
    document.title = `${blogPost.title} | Shakib Mahamud's Blog`;
    
    // Update meta tags for SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.content = blogPost.excerpt;
    }
    
    // Update Open Graph tags for social sharing
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    
    if (ogTitle) ogTitle.content = blogPost.title;
    if (ogDescription) ogDescription.content = blogPost.excerpt;
    if (ogImage) ogImage.content = blogPost.featuredImage;
}

// Helper function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Social sharing functions
function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(document.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
}

// Mock data functions (replace with actual API calls in production)
async function getBlogPost(id) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock blog post data
    return {
        id: id,
        title: "Understanding Data Science: A Comprehensive Guide",
        date: "2024-03-15",
        tags: ["Data Science", "Machine Learning", "AI"],
        content: `
            <p>Data science is an interdisciplinary field that uses scientific methods, processes, algorithms, and systems to extract knowledge and insights from structured and unstructured data.</p>
            
            <h2>What is Data Science?</h2>
            <p>Data science combines multiple fields, including statistics, scientific methods, artificial intelligence (AI), and data analysis, to extract value from data.</p>
            
            <h2>Key Components</h2>
            <ul>
                <li>Statistics and Mathematics</li>
                <li>Programming and Computer Science</li>
                <li>Domain Knowledge</li>
                <li>Communication Skills</li>
            </ul>
            
            <h2>Applications</h2>
            <p>Data science is applied across various industries, from healthcare to finance, helping organizations make data-driven decisions.</p>
        `,
        excerpt: "A comprehensive guide to understanding data science, its components, and applications in the modern world.",
        featuredImage: "path/to/featured-image.jpg",
        author: {
            name: "Shakib Mahamud",
            bio: "Data Scientist & Machine Learning Engineer",
            image: "path/to/author-image.jpg"
        }
    };
}

async function getRelatedPosts(currentBlogId) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock related posts data
    return [
        {
            id: "2",
            title: "Machine Learning Fundamentals",
            date: "2024-03-10"
        },
        {
            id: "3",
            title: "Data Visualization Best Practices",
            date: "2024-03-05"
        }
    ];
}

// Error handling
function showErrorMessage() {
    const blogContent = document.querySelector('.blog-content');
    blogContent.innerHTML = `
        <div class="error-message">
            <h2>Error Loading Blog Post</h2>
            <p>There was an error loading the blog post. Please try again later.</p>
            <a href="index.html#blog" class="btn">Return to Blog</a>
        </div>
    `;
} 