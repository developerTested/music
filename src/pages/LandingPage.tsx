import { useState, useEffect } from 'react';
import { FaPlay,  FaSpotify, FaApple,   FaYoutube, FaSoundcloud, FaSun, FaMoon } from 'react-icons/fa';
import { HiOutlineMenu, HiX, HiOutlineDownload, HiOutlineSearch } from 'react-icons/hi';
import { BsHeadphones } from 'react-icons/bs';
import { IoMdMic } from 'react-icons/io';
import { MdHighQuality } from 'react-icons/md';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const progress = (scrollTop / (docHeight - windowHeight)) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 
      'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white' : 
      'bg-gradient-to-br from-gray-100 via-purple-100 to-violet-100 text-gray-900'}`}>
      
      {/* Animated background bubbles */}
      <div className="fixed inset-0 overflow-hidden z-0">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              backgroundColor: darkMode ? '#a855f7' : '#c084fc'
            }}
          />
        ))}
      </div>
      
      {/* Scroll progress indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-gradient-to-r from-purple-500 to-blue-500" 
        style={{ width: `${scrollProgress}%` }} />

      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-2">
          <BsHeadphones className={`text-2xl ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
          <span className="text-xl font-bold">Melodify</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <a href="#home" className={`hover:text-purple-300 transition ${!darkMode && 'hover:text-purple-700'}`}>Home</a>
          <a href="#features" className={`hover:text-purple-300 transition ${!darkMode && 'hover:text-purple-700'}`}>Features</a>
          <a href="#premium" className={`hover:text-purple-300 transition ${!darkMode && 'hover:text-purple-700'}`}>Premium</a>
          <a href="#testimonials" className={`hover:text-purple-300 transition ${!darkMode && 'hover:text-purple-700'}`}>Testimonials</a>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-500 transition"
          >
            {darkMode ? <FaSun className="text-yellow-300" /> : <FaMoon className="text-purple-700" />}
          </button>
          <Link to={`/auth/register`} className={`px-4 py-2 rounded-full ${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'} transition`}>
            Sign Up
          </Link>
          <Link to={`/auth/login`} className={`px-4 py-2 rounded-full border ${darkMode ? 'border-purple-400 hover:bg-purple-900' : 'border-purple-600 hover:bg-purple-100'} transition`}>
            Login
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-2xl focus:outline-none z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <HiX /> : <HiOutlineMenu />}
        </button>
      </nav>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden fixed inset-0 z-40 pt-20 px-6 ${darkMode ? 'bg-gray-900 bg-opacity-95' : 'bg-white bg-opacity-95'}`}>
          <div className="flex flex-col space-y-6">
            <a href="#home" className={`text-xl ${darkMode ? 'hover:text-purple-300' : 'hover:text-purple-700'}`}>Home</a>
            <a href="#features" className={`text-xl ${darkMode ? 'hover:text-purple-300' : 'hover:text-purple-700'}`}>Features</a>
            <a href="#premium" className={`text-xl ${darkMode ? 'hover:text-purple-300' : 'hover:text-purple-700'}`}>Premium</a>
            <a href="#testimonials" className={`text-xl ${darkMode ? 'hover:text-purple-300' : 'hover:text-purple-700'}`}>Testimonials</a>
            
            <div className="pt-8">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-3 rounded-full mb-4 flex items-center justify-center w-full border"
              >
                {darkMode ? (
                  <>
                    <FaSun className="mr-2 text-yellow-300" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <FaMoon className="mr-2 text-purple-700" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
              <div className="flex space-x-4">
                <button className={`px-4 py-3 rounded-full ${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'} transition w-full`}>
                  Sign Up
                </button>
                <button className={`px-4 py-3 rounded-full border ${darkMode ? 'border-purple-400 hover:bg-purple-900' : 'border-purple-600 hover:bg-purple-100'} transition w-full`}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <section id="home" className="container mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center relative z-10">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h1 className={`text-4xl md:text-6xl font-bold leading-tight mb-6 ${!darkMode && 'text-gray-800'}`}>
            Listen to <span className="text-purple-400">Millions</span> of Songs Anytime, Anywhere.
          </h1>
          <p className={`text-lg mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Over 50 million songs ad-free. Download your favorites and listen offline. High quality audio streaming.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-xl mb-8">
            <input
              type="text"
              placeholder="Search artists, songs, or albums..."
              className={`w-full py-4 px-6 pr-12 rounded-full ${darkMode ? 
                'bg-white bg-opacity-10 backdrop-blur-md border border-gray-700 focus:ring-purple-500' : 
                'bg-white border border-gray-300 focus:ring-purple-300'} focus:outline-none focus:ring-2`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <HiOutlineSearch className={`absolute right-6 top-1/2 transform -translate-y-1/2 text-xl ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to={`/home`} className={`px-8 py-3 rounded-full flex items-center justify-center ${darkMode ? 
              'bg-purple-600 hover:bg-purple-700' : 
              'bg-purple-500 hover:bg-purple-600 text-white'} transition`}>
              <FaPlay className="mr-2" /> Start Listening
            </Link>
            <button className={`px-8 py-3 rounded-full border ${darkMode ? 
              'border-purple-400 hover:bg-purple-900' : 
              'border-purple-500 hover:bg-purple-100'} transition flex items-center justify-center`}>
              Learn More
            </button>
          </div>
        </div>
        
          
      </section>
      
      {/* Features Section */}
      <section id="features" className={`py-20 ${darkMode ? 'bg-gray-900 bg-opacity-50' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-6">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-16 ${!darkMode && 'text-gray-800'}`}>
            Why Choose <span className="text-purple-400">Melodify</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <MdHighQuality className="text-2xl" />,
                title: "High Quality Audio",
                description: "Experience crystal clear sound with our lossless audio streaming at 320kbps."
              },
              {
                icon: <HiOutlineDownload className="text-2xl" />,
                title: "Offline Listening",
                description: "Download your favorite tracks and listen without an internet connection."
              },
              {
                icon: <IoMdMic className="text-2xl" />,
                title: "Exclusive Content",
                description: "Access podcasts, live sessions, and artist interviews you won't find anywhere else."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className={`p-8 rounded-xl transition ${darkMode ? 
                  'bg-gray-800 bg-opacity-50 hover:bg-opacity-70' : 
                  'bg-white hover:shadow-lg'}`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${darkMode ? 
                  'bg-purple-600' : 'bg-purple-500'}`}>
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 ${!darkMode && 'text-gray-800'}`}>{feature.title}</h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Premium Section */}
      <section id="premium" className="py-20">
        <div className="container mx-auto px-6">
          <div className={`rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center ${darkMode ? 
            'bg-gradient-to-r from-purple-900 to-blue-900' : 
            'bg-gradient-to-r from-purple-100 to-blue-100'}`}>
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${!darkMode && 'text-gray-800'}`}>
                Upgrade to <span className="text-purple-500">Premium</span>
              </h2>
              <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Get unlimited access to all features with no interruptions.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Ad-free music listening",
                  "Download to listen offline",
                  "High quality audio",
                  "Exclusive content"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className={`rounded-full p-1 mr-3 ${darkMode ? 'bg-purple-500' : 'bg-purple-400'}`}>
                      <FaPlay className="text-xs" />
                    </div>
                    <span className={!darkMode ? 'text-gray-700' : ''}>{item}</span>
                  </li>
                ))}
              </ul>
              <button className={`px-8 py-3 rounded-full font-bold ${darkMode ? 
                'bg-white text-purple-900 hover:bg-gray-200' : 
                'bg-purple-600 text-white hover:bg-purple-700'} transition`}>
                Try Premium for Free
              </button>
            </div>
            
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className={`w-64 h-64 rounded-full flex items-center justify-center backdrop-blur-lg border ${darkMode ? 
                  'bg-white bg-opacity-10 border-gray-700' : 
                  'bg-white bg-opacity-50 border-gray-300'}`}>
                  <div className={`w-48 h-48 rounded-full flex items-center justify-center backdrop-blur-lg border ${darkMode ? 
                    'bg-white bg-opacity-10 border-gray-700' : 
                    'bg-white bg-opacity-50 border-gray-300'}`}>
                    <div className={`w-32 h-32 rounded-full flex items-center justify-center backdrop-blur-lg border ${darkMode ? 
                      'bg-white bg-opacity-10 border-gray-700' : 
                      'bg-white bg-opacity-50 border-gray-300'}`}>
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center ${darkMode ? 
                        'bg-purple-500' : 'bg-purple-400'}`}>
                        <BsHeadphones className="text-3xl text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`absolute -top-5 -right-5 rounded-full p-3 shadow-lg ${darkMode ? 
                  'bg-purple-600' : 'bg-purple-500 text-white'}`}>
                  <span className="font-bold">$9.99</span>
                  <span className="text-xs block">per month</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section id="testimonials" className={`py-20 ${darkMode ? 'bg-gray-900 bg-opacity-50' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-6">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-16 ${!darkMode && 'text-gray-800'}`}>
            What Our <span className="text-purple-400">Users Say</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Music Producer",
                quote: "Melodify has transformed how I discover new music. The sound quality is unmatched!",
                avatar: "SJ"
              },
              {
                name: "Michael Chen",
                role: "DJ",
                quote: "The offline mode is a game changer for my international flights. Never without my music!",
                avatar: "MC"
              },
              {
                name: "Emma Rodriguez",
                role: "Podcast Host",
                quote: "The exclusive content keeps me coming back. Interviews you can't find anywhere else.",
                avatar: "ER"
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className={`p-8 rounded-xl transition ${darkMode ? 
                  'bg-gray-800 bg-opacity-50 hover:bg-opacity-70' : 
                  'bg-white hover:shadow-lg'}`}
              >
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold mr-4 ${darkMode ? 
                    'bg-purple-600' : 'bg-purple-500 text-white'}`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className={`font-bold ${!darkMode && 'text-gray-800'}`}>{testimonial.name}</h4>
                    <p className={darkMode ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'}>{testimonial.role}</p>
                  </div>
                </div>
                <p className={`italic mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>"{testimonial.quote}"</p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${!darkMode && 'text-gray-800'}`}>
            Ready to experience <span className="text-purple-400">better music</span>?
          </h2>
          <p className={`text-xl max-w-2xl mx-auto mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Join millions of users enjoying unlimited music streaming today.
          </p>
          <button className={`px-8 py-3 rounded-full font-bold transition ${darkMode ? 
            'bg-purple-600 hover:bg-purple-700' : 
            'bg-purple-500 hover:bg-purple-600 text-white'}`}>
            Get Started - It's Free
          </button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className={`py-12 ${darkMode ? 'bg-gray-900 bg-opacity-80' : 'bg-gray-800 text-gray-200'}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <BsHeadphones className={`text-2xl ${darkMode ? 'text-purple-400' : 'text-purple-300'}`} />
              <span className="text-xl font-bold">Melodify</span>
            </div>
            
            <div className="flex space-x-6 mb-6 md:mb-0">
              <a href="#" className="hover:text-purple-300 transition">Terms</a>
              <a href="#" className="hover:text-purple-300 transition">Privacy</a>
              <a href="#" className="hover:text-purple-300 transition">Cookies</a>
              <a href="#" className="hover:text-purple-300 transition">Contact</a>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-purple-600 transition bg-gray-700">
                <FaSpotify />
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-purple-600 transition bg-gray-700">
                <FaApple />
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-purple-600 transition bg-gray-700">
                <FaYoutube />
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-purple-600 transition bg-gray-700">
                <FaSoundcloud />
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Melodify. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Add global styles for animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-100vh) rotate(360deg); }
        }
        @keyframes equalize {
          0% { height: 4px; }
          100% { height: 20px; }
        }
      `}</style>
    </div>
  );
};
