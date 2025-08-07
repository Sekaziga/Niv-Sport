import { Link } from "react-router-dom";
// src/pages/Home.jsx
const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-sky-500/10"></div>
        <div className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23bfdbfe' fill-opacity='0.3'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30`}></div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Title */}
            <div className="mb-8">
              <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-sky-600 to-blue-800 mb-4 leading-tight">
                NIV SPORT
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-sky-400 to-blue-600 mx-auto rounded-full"></div>
            </div>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-blue-800 font-medium mb-8 leading-relaxed">
              Your ultimate destination for football passion
            </p>

            {/* Description */}
            <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
              Experience the thrill of the beautiful game with NIV Sport. We deliver the latest news, 
              exclusive content, and unforgettable moments from the world of football.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button className="group bg-gradient-to-r from-blue-900 to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-800 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                <span className="flex items-center justify-center">
                  Explore News
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </span>
              </button>
              
              <button className="group bg-white text-blue-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-sky-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-sky-200 hover:border-sky-300">
                <span className="flex items-center justify-center">
                  Watch Media
                  <svg className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">What We Offer</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover everything you need to stay connected with the beautiful game
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Link to="/news" className="group bg-gradient-to-br from-blue-50 to-sky-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-2 border border-blue-100">
            <div className="group bg-gradient-to-br from-sky-50 to-blue-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-2 border border-sky-100">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-900 to-sky-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Latest News</h3>
              <p className="text-gray-700 leading-relaxed">
                Stay updated with breaking news, match reports, and exclusive interviews from the football world.
              </p>
            </div>
            </Link>

            {/* Feature 2 */}
           <Link to="/media" className="group bg-gradient-to-br from-blue-50 to-sky-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-2 border border-blue-100"> 
            <div className="group bg-gradient-to-br from-blue-50 to-sky-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-2 border border-blue-100">
              <div className="w-16 h-16 bg-gradient-to-r from-sky-600 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Exclusive Media</h3>
              <p className="text-gray-700 leading-relaxed">
                Access high-quality videos, photos, and behind-the-scenes content from matches and events.
              </p>
            </div>
            </Link>

            {/* Feature 3 */}
            <Link to="/events" className="group bg-gradient-to-br from-blue-50 to-sky-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-2 border border-blue-100">
            <div className="group bg-gradient-to-br from-sky-50 to-white p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-2 border border-sky-100">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-700 to-sky-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Live Events</h3>
              <p className="text-gray-700 leading-relaxed">
                Never miss a moment with our comprehensive coverage of live matches and special events.
              </p>
            </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-sky-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-8">Experience the Game Like Never Before</h2>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-sky-400 to-blue-500 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <img
  src="/logo-niv.jpeg"
  alt="Team banner showcasing NIV Sport's football coverage"
  className="relative rounded-2xl shadow-2xl w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
  onError={(e) => {
    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDgwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMUU0MDhCIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMjAwIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9IjAuM2VtIj5OSVYgU3BvcnQgVGVhbSBCYW5uZXI8L3RleHQ+Cjwvc3ZnPgo=';
  }}
/>

            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-20 bg-gradient-to-br from-sky-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-blue-900 mb-6">Join the NIV Sport Community</h2>
            <p className="text-xl text-gray-700 mb-10 leading-relaxed">
              Be part of something bigger. Connect with fellow football enthusiasts and never miss a beat of the action.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:from-sky-400 hover:to-blue-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Get Started Today
              </button>
              <button className="text-blue-900 px-10 py-4 rounded-full font-semibold text-lg hover:bg-sky-50 transition-all duration-300 border-2 border-blue-900 hover:border-sky-500">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;