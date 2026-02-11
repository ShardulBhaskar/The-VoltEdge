import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Binary } from 'lucide-react';

const Blog = () => {
  const blogs = [
    {
      id: 1,
      title: "Numbering and Coding Systems",
      excerpt: "Understanding the fundamental language of computers: how different number systems and coding schemes form the backbone of digital electronics.",
      date: "Feb 11, 2026",
      author: "Shardul Bhaskar",
      category: "Digital Electronics",
      path: "/blog/numbering-and-coding-systems",
      icon: <Binary className="w-12 h-12 text-blue-500 mb-4" />
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Latest Insights
        </h1>
        <p className="text-slate-500 text-lg">
          Tutorials, guides, and deep dives into the world of electronics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <article 
            key={blog.id} 
            className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col"
          >
            <div className="p-8 flex-1 flex flex-col">
              <div className="mb-4">
                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  {blog.category}
                </span>
              </div>
              
              {blog.icon}

              <h2 className="text-2xl font-bold text-slate-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                <Link to={blog.path}>
                  {blog.title}
                </Link>
              </h2>
              
              <p className="text-slate-500 mb-6 flex-grow line-clamp-3">
                {blog.excerpt}
              </p>

              <div className="flex flex-col items-center justify-between mt-auto border-t border-slate-100">
                <div className="flex items-center text-sm text-slate-400 gap-4">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{blog.date}</span>
                  </div>
                </div>
                
                <Link 
                  to={blog.path}
                  className="inline-flex items-center text-blue-600 font-semibold text-md p-4 hover:translate-x-1 transition-transform"
                >
                  Read More <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
