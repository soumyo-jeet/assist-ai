"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle2, Zap, Target, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

const Landing = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState(0);

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
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 overflow-hidden">
      
      {/* Sophisticated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-gradient-to-br from-primary/8 to-transparent blur-3xl transition-transform duration-700 ease-out"
          style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
        />
        <div 
          className="absolute bottom-1/3 -right-20 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-purple-500/8 to-transparent blur-3xl transition-transform duration-700 ease-out"
          style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 blur-3xl"
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="container relative z-10 px-4 md:px-6 py-16 ">
        <div className="flex flex-col items-center text-center space-y-12 max-w-6xl mx-auto">
          
          {/* Badge */}
          <div className={`transition-all duration-1000 mt-8 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Powered by Advanced AI</span>
            </div>
          </div>

          {/* Main heading */}
          <div className={`relative transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-foreground/70 leading-[1.1] tracking-tight">
              Your AI Assistant for
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary animate-gradient-x">
                Career Success
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className={`max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Transform your job search with intelligent career guidance, expert interview preparation, and AI-powered tools designed to help you land your dream role faster.
          </p>

          {/* Feature cards */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className={`group relative flex flex-col items-center gap-3 p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm hover:bg-card/80 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${activeFeature === index ? 'ring-2 ring-primary/20' : ''}`}
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <span className="text-sm font-medium text-center">{feature.text}</span>
                </div>
              );
            })}
          </div>

          {/* CTA buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 pt-2 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link href="/dashboard">
              <Button 
                size="lg" 
                className="group relative px-10 py-7 text-lg font-semibold bg-gradient-to-r from-primary via-primary to-purple-600 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </Link>
            <Link href="#explore">
              <Button 
                variant="outline" 
                size="lg" 
                className="px-10 py-7 text-lg font-semibold border-2 hover:bg-accent/50 hover:border-primary/30 transition-all duration-300 backdrop-blur-sm"
              >
                Explore Features
              </Button>
            </Link>
          </div>

          {/* Stats section */}
          <div className={`pt-8 w-full max-w-3xl transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="grid grid-cols-3 gap-8 p-8 rounded-2xl bg-card/30 border border-border/50 backdrop-blur-sm">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social proof */}
          <div className={`flex items-center gap-3 text-sm text-muted-foreground transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i} 
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 via-purple-500/30 to-pink-500/30 border-2 border-background ring-2 ring-background"
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