import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

const Hero = () => {
  const benefits = [
    "24/7 Professional Monitoring",
    "Free Site Survey",
    "Lifetime Support",
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "60% center",
        }}
      >
        <div className="absolute inset-0 bg-background/10" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl pt-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 shadow-sm mb-8 animate-fade-in opacity-0" style={{ animationDelay: "0.1s" }}>
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-sm text-foreground font-semibold">Trusted by 100+ Businesses</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-gradient leading-[1.1] mb-6 animate-fade-in opacity-0 tracking-tight" style={{ animationDelay: "0.2s" }}>
            Vintage CCTV
            <span className="text-foreground block mt-2">Installation & Monitoring</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl animate-fade-in opacity-0 leading-relaxed" style={{ animationDelay: "0.3s" }}>
            Protect what matters most with cutting-edge surveillance systems. 
            Expert installation, maintenance, and 24/7 support.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap gap-6 mb-12 animate-fade-in opacity-0" style={{ animationDelay: "0.4s" }}>
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 text-muted-foreground bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in opacity-0" style={{ animationDelay: "0.5s" }}>
            <Button 
              size="lg" 
              className="bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:opacity-90 hover:-translate-y-0.5 transition-all text-base px-8 h-14 rounded-full"
            >
              Get Free Quote
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/80 backdrop-blur border-border text-foreground hover:bg-white font-semibold text-base px-8 h-14 rounded-full shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <Play className="w-5 h-5 mr-2 text-primary" />
              Watch Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-7 h-12 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2 glass">
          <div className="w-1.5 h-3 bg-primary rounded-full opacity-80" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
