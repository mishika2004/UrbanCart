import { useState } from "react";

const posts = [
  {
    id: 1,
    category: "Fashion",
    title: "10 Must-Have Wardrobe Essentials for 2026",
    excerpt: "From classic white shirts to versatile denim, we break down the pieces every modern wardrobe needs this year.",
    author: "Priya Mehta",
    date: "March 5, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&auto=format&fit=crop",
    tag: "Style Guide",
  },
  {
    id: 2,
    category: "Home Decor",
    title: "How to Style Your Living Room on a Budget",
    excerpt: "You don't need a huge budget to have a beautifully decorated home. Here are our top tips for making your space look expensive without spending a fortune.",
    author: "Arjun Sharma",
    date: "February 28, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&auto=format&fit=crop",
    tag: "Interior Tips",
  },
  {
    id: 3,
    category: "Kids",
    title: "Best Educational Toys for Kids Under 10",
    excerpt: "Choosing the right toys can supercharge your child's development. We've rounded up the best learning toys available at UrbanCart right now.",
    author: "Sneha Kapoor",
    date: "February 20, 2026",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&auto=format&fit=crop",
    tag: "Parenting",
  },
  {
    id: 4,
    category: "Furniture",
    title: "Small Space? Big Style: Furniture Ideas for Studio Apartments",
    excerpt: "Living in a compact space doesn't mean compromising on comfort or style. Discover clever furniture picks that save space and look great.",
    author: "Rahul Verma",
    date: "February 12, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop",
    tag: "Space Saving",
  },
  {
    id: 5,
    category: "Fashion",
    title: "Summer 2026 Trends: What's Hot This Season",
    excerpt: "Pastels are back, maxi dresses are everywhere, and comfort is king. Here's what's trending in women's and men's fashion this summer.",
    author: "Priya Mehta",
    date: "February 6, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&auto=format&fit=crop",
    tag: "Trending",
  },
  {
    id: 6,
    category: "Home Decor",
    title: "Plants That Purify Your Home Air Naturally",
    excerpt: "Indoor plants don't just look good — they actively improve your air quality. Here are the best low-maintenance plants for Indian homes.",
    author: "Ananya Joshi",
    date: "January 30, 2026",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&auto=format&fit=crop",
    tag: "Wellness",
  },
];

const CATEGORIES = ["All", "Fashion", "Home Decor", "Kids", "Furniture"];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  const [featured, ...rest] = filtered;

  return (
    <div className="container mt-5 mb-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">UrbanCart Blog</h2>
        <p className="text-muted">Style tips, home inspiration, and shopping guides — straight from our team.</p>
      </div>

      {/* Category Filter */}
      <div className="d-flex gap-2 flex-wrap justify-content-center mb-5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`btn btn-sm rounded-pill px-3 ${activeCategory === cat ? "btn-dark" : "btn-outline-secondary"}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Post */}
      {featured && (
        <div className="card mb-5 shadow border-0 overflow-hidden">
          <div className="row g-0">
            <div className="col-md-6">
              <img src={featured.image} alt={featured.title}
                style={{ width: "100%", height: "320px", objectFit: "cover" }} />
            </div>
            <div className="col-md-6 d-flex align-items-center p-4">
              <div>
                <span className="badge bg-warning text-dark mb-2">{featured.tag}</span>
                <h3 className="fw-bold mb-2">{featured.title}</h3>
                <p className="text-muted mb-3">{featured.excerpt}</p>
                <div className="d-flex align-items-center gap-3 small text-muted">
                  <span>✍️ {featured.author}</span>
                  <span>📅 {featured.date}</span>
                  <span>⏱ {featured.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rest of posts */}
      <div className="row g-4">
        {rest.map((post) => (
          <div className="col-md-6 col-lg-4" key={post.id}>
            <div className="card h-100 shadow-sm border-0 overflow-hidden">
              <img src={post.image} alt={post.title}
                style={{ height: "200px", objectFit: "cover" }} />
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge bg-light text-dark border">{post.category}</span>
                  <span className="badge bg-warning text-dark">{post.tag}</span>
                </div>
                <h6 className="fw-bold mb-2">{post.title}</h6>
                <p className="text-muted small mb-3">{post.excerpt}</p>
                <div className="d-flex align-items-center gap-2 small text-muted mt-auto">
                  <span>✍️ {post.author}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted mt-4">No posts in this category yet.</p>
      )}
    </div>
  );
};

export default Blog;