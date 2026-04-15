import hikvision from "@/assets/hikvision.png";
import ezviz from "@/assets/ezviz.png";
import imou from "@/assets/imou.png"

const brands = [
  {
    name: "Hikvision",
    description: "World's leading video surveillance provider with cutting-edge AI analytics.",
    specialty: "AI-Powered Analytics",
    image: hikvision,
  },
  {
    name: "EZVIZ",
    description: "Advanced security solutions with innovative HDCVI technology and smart features.",
    specialty: "Simple Smart Home",
    image: ezviz,
  },
  {
    name: "IMOU",
    description: "Pioneer in network video with premium quality IP cameras and open platform.",
    specialty: "Smart IOT Performance",
    image: imou,
  },
];

const TrustedBrands = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-light">
      <div className="container mx-auto px-4 ">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 lg:gap-20 max-w-5xl mx-auto px-4 sm:px-0">
          {brands.map((brand, index) => (
            <div
              key={brand.name}
              className="group relative p-6 rounded-2xl glass border border-white/40 text-center hover:shadow-lg transition-all duration-300 animate-fade-in opacity-0"
              style={{ animationDelay: `${0.08 * index}s` }}
            >
              <div className="w-28 h-28 mx-auto mb-5 rounded-full bg-white/80 overflow-hidden flex items-center justify-center p-2 shadow-sm group-hover:scale-105 transition-transform duration-300">
                <img src={brand.image} alt={brand.name} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-base sm:text-lg font-display font-bold text-foreground mb-1">
                {brand.name}
              </h3>
              <span className="text-xs sm:text-sm text-primary font-semibold uppercase tracking-wide opacity-90">
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
