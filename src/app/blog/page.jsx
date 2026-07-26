import React from 'react';

const blogs = [
  {
    id: 1,
    date: "June 12, 2026",
    title: "5 Tips for Choosing the Perfect Rental Home",
    desc: "Discover practical tips that will help you find a comfortable and affordable rental property without unnecessary stress.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
  },
  {
    id: 2,
    date: "June 8, 2026",
    title: "Why Apartments Are Becoming More Popular",
    desc: "Modern apartments provide convenience, security, and premium amenities, making them an attractive choice for many renters.",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=250&fit=crop",
  },
  {
    id: 3,
    date: "June 2, 2026",
    title: "How to Save Money on Monthly Rent",
    desc: "Learn effective strategies to reduce rental expenses while still enjoying quality housing in your preferred location.",
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=250&fit=crop",
  },
];

const BlogPage = () => {
  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-10">Latest Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-card border border-border rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-blue-300">
            <img src={blog.img} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-5 flex flex-col flex-1 gap-2">
              <span className="text-sm text-muted-foreground">{blog.date}</span>
              <h3 className="text-base font-medium text-foreground leading-snug">{blog.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{blog.desc}</p>
              <a href="#" className="mt-2 inline-block bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-lg w-fit hover:bg-blue-700 transition">
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogPage;