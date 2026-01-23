import { Award, Clock, Headphones, Wrench, Users, Zap } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Certified Experts",
    description: "Our technicians are fully certified and trained on the latest security technologies.",
  },
  {
    icon: Clock,
    title: "Same Day Service",
    description: "Emergency installation and repair services available within 24 hours.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock technical support and monitoring for complete peace of mind.",
  },
  {
    icon: Wrench,
    title: "Free Maintenance",
    description: "Complimentary first-year maintenance with every installation package.",
  },
  {
    icon: Users,
    title: "10+ Years Experience",
    description: "Over a decade of expertise protecting homes and businesses.",
  },
  {
    icon: Zap,
    title: "Latest Technology",
    description: "4K cameras, AI detection, cloud storage, and mobile app integration.",
  },
];

const stats = [
  { value: "500+", label: "Installations" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" },
  { value: "10+", label: "Years" },
];

const Features = () => {
  return (
    <section id="features" className="py-20 md:py-32 bg-gradient-dark">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
            The SecureView Difference
          </h2>
          <p className="text-muted-foreground text-lg">
            We go beyond just installing cameras. Our commitment to quality 
            and service sets us apart from the competition.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="text-center p-6 rounded-xl bg-gradient-card border border-border animate-fade-in opacity-0"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.value}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="flex gap-4 animate-fade-in-up opacity-0"
              style={{ animationDelay: `${0.15 * index}s` }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
