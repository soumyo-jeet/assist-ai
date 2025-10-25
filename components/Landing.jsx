"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle2, Zap, Target, TrendingUp, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

const Landing = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState(0);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 15,
        y: (e.clientY / window.innerHeight) * 15,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    // Rotate featured benefits
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const features = [
    { icon: Zap, text: "AI-powered resume optimization", color: "text-blue-500" },
    { icon: Target, text: "Interview preparation tools", color: "text-purple-500" },
    { icon: TrendingUp, text: "Personalized career guidance", color: "text-emerald-500" }
  ];

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "95%", label: "Success Rate" },
    { value: "4.9/5", label: "User Rating" }
  ];

  return (
    <section className={`relative w-full min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-300 ${isDark ? 'dark bg-slate-950' : 'bg-white'}`}>
      
      <style>{`
        .light-gradient {
          background: linear-gradient(to bottom right, #ffffff, #f3f4f6);
        }
        .dark-gradient {
          background: linear-gradient(to bottom right, #0f172a, #1e293b);
        }
      `}</style>

      <div className={`absolute inset-0 ${isDark ? 'dark-gradient' : 'light-gradient'}`} />
      
      {/* Sophisticated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className={`absolute top-1/4 -left-20 w-96 h-96 rounded-full blur-3xl transition-all duration-700 ease-out ${isDark ? 'bg-gradient-to-br from-blue-900/30 to-transparent' : 'bg-gradient-to-br from-blue-200/40 to-transparent'}`}
          style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
        />
        <div 
          className={`absolute bottom-1/3 -right-20 w-[500px] h-[500px] rounded-full blur-3xl transition-all duration-700 ease-out ${isDark ? 'bg-gradient-to-tl from-purple-900/30 to-transparent' : 'bg-gradient-to-tl from-purple-300/40 to-transparent'}`}
          style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }}
        />
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl ${isDark ? 'bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20' : 'bg-gradient-to-r from-blue-200/30 via-purple-200/30 to-pink-200/30'}`}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className={`absolute inset-0 ${isDark ? 'bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)]' : 'bg-[linear-gradient(rgba(0,0,0,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.05)_1px,transparent_1px)]'} bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]` } />

      <div className="container relative z-10 px-4 md:px-6 py-16">

        <div className="flex flex-col items-center text-center space-y-12 max-w-6xl mx-auto">
          
          {/* Badge */}
          <div className={`transition-all duration-1000 mt-8 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border ${isDark ? 'bg-blue-900/20 border-blue-700/40' : 'bg-blue-100/40 border-blue-400/40'}`}>
              <Sparkles className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className={`text-sm font-medium ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>Powered by Advanced AI</span>
            </div>
          </div>

          {/* Main heading */}
          <div className={`relative transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className={`text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Your AI Assistant for
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x">
                Career Success
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className={`max-w-2xl text-lg md:text-xl leading-relaxed transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Transform your job search with intelligent career guidance, expert interview preparation, and AI-powered tools designed to help you land your dream role faster.
          </p>

          {/* Feature cards */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className={`group relative flex flex-col items-center gap-3 p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDark ? 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/80 hover:border-blue-600/30' : 'bg-gray-100/50 border-gray-300/50 hover:bg-gray-100/80 hover:border-blue-400/30'} ${activeFeature === index ? isDark ? 'ring-2 ring-blue-500/20' : 'ring-2 ring-blue-400/30' : ''}`}
                >
                  <div className={`p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 ${isDark ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30' : 'bg-gradient-to-br from-blue-200/40 to-purple-200/40'}`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <span className={`text-sm font-medium text-center ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{feature.text}</span>
                </div>
              );
            })}
          </div>

          {/* Theme Toggle Button */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-full transition-all duration-300 ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400' : 'bg-gray-200 hover:bg-gray-300 text-slate-800'} shadow-lg hover:shadow-xl border ${isDark ? 'border-slate-700' : 'border-gray-300'}`}
              aria-label="Toggle theme"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>


          <div className={`flex flex-col sm:flex-row gap-4 pt-2 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link href="/dashboard">
              <Button 
                size="lg" 
                className="group relative px-10 py-7 text-lg font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:shadow-2xl hover:shadow-purple-600/20 transition-all duration-300 overflow-hidden text-white hover:text-white"
              >
                <span className="relative z-10 flex items-center">
                  Start for Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </Link>
            <Link href="#explore">
              <Button 
                variant="outline" 
                size="lg" 
                className={`px-10 py-7 text-lg font-semibold border-2 transition-all duration-300 backdrop-blur-sm ${isDark ? 'border-slate-600 hover:bg-slate-800/50 hover:border-blue-600/30 text-gray-200' : 'border-gray-400 hover:bg-gray-100/50 hover:border-blue-400/30 text-gray-800'}`}
              >
                Explore Features
              </Button>
            </Link>
          </div>

          {/* Stats section */}
          <div className={`pt-8 w-full max-w-3xl transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className={`grid grid-cols-3 gap-8 p-8 rounded-2xl backdrop-blur-sm border ${isDark ? 'bg-slate-800/30 border-slate-700/50' : 'bg-gray-100/30 border-gray-300/50'}`}>
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                    {stat.value}
                  </div>
                  <div className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social proof */}
          <div className={`flex items-center gap-3 text-sm transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i} 
                  className={`w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 border-2 ring-2 ${isDark ? 'border-slate-950 ring-slate-950' : 'border-white ring-white'}`}
                />
              ))}
            </div>
            <span className="font-medium">Join thousands of successful job seekers</span>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Landing;