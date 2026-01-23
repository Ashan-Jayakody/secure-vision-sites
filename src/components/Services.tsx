import { Home, Building2, Warehouse, Car, Store, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

const services = [
  {
    icon: Home,
    title: "Residential CCTV",
    description: "Protect your home with smart security cameras that integrate with your smartphone.",
  },
  {
    icon: Building2,
    title: "Commercial Systems",
    description: "Enterprise-grade surveillance for offices, banks, and corporate facilities.",
  },
  {
    icon: Warehouse,
    title: "Industrial Security",
    description: "Heavy-duty cameras for warehouses, factories, and manufacturing plants.",
  },
  {
    icon: Store,
    title: "Retail Solutions",
    description: "Loss prevention systems designed specifically for retail environments.",
  },
  {
    icon: Car,
    title: "Parking & Outdoor",
    description: "Weatherproof cameras with night vision for parking lots and perimeters.",
  },
  {
    icon: Shield,
    title: "Remote Monitoring",
    description: "24/7 professional monitoring with instant alerts and mobile access.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-32 bg-gradient-dark">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
            Complete Security Solutions
          </h2>
          <p className="text-muted-foreground text-lg">
            From homes to enterprises, we provide tailored CCTV installations 
            that meet your unique security requirements.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              className="bg-gradient-card border-border p-6 hover:border-primary/50 transition-all duration-300 group cursor-pointer animate-fade-in-up opacity-0"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
