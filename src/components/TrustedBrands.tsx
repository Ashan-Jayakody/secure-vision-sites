const brands = [
  {
    name: "Hikvision",
    description: "World's leading video surveillance provider with cutting-edge AI analytics.",
    specialty: "AI-Powered Analytics",
  },
  {
    name: "Dahua",
    description: "Advanced security solutions with innovative HDCVI technology and smart features.",
    specialty: "HDCVI Technology",
  },
  {
    name: "Axis Communications",
    description: "Pioneer in network video with premium quality IP cameras and open platform.",
    specialty: "Network IP Cameras",
  },
  {
    name: "Hanwha Vision",
    description: "Enterprise-grade surveillance systems with deep learning capabilities.",
    specialty: "Deep Learning",
  },
  {
    name: "CP Plus",
    description: "Trusted brand offering reliable and affordable security camera solutions.",
    specialty: "Value Solutions",
  },
  {
    name: "Uniview",
    description: "Professional IP video surveillance with intelligent scene analysis.",
    specialty: "Scene Analysis",
  },
];

const TrustedBrands = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-light">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Our Partners
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
            Trusted Brands We Work With
          </h2>
          <p className="text-muted-foreground text-lg">
            We partner with industry-leading manufacturers to deliver reliable, 
            high-performance security systems you can count on.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {brands.map((brand, index) => (
            <div
              key={brand.name}
              className="group relative p-6 rounded-xl bg-gradient-card border border-border text-center hover:border-primary/40 hover:shadow-glow transition-all duration-300 animate-fade-in opacity-0"
              style={{ animationDelay: `${0.08 * index}s` }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <span className="text-primary font-bold text-lg">
                  {brand.name.charAt(0)}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">
                {brand.name}
              </h3>
              <span className="text-xs text-primary font-medium">
                {brand.specialty}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;
