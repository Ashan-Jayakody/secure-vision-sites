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
        <div className="  mx-28 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-28 ">
          {brands.map((brand, index) => (
            <div
              key={brand.name}
              className="group relative p-6 rounded-xl bg-gradient-card border border-border text-center hover:border-primary/40 hover:shadow-glow transition-all duration-300 animate-fade-in opacity-0"
              style={{ animationDelay: `${0.08 * index}s` }}
            >
              <div className="w-18 h-18 mx-auto mb-4 rounded-full bg-white overflow-hidden flex items-center justify-center  group-hover:bg-primary/20 transition-colors">
                <img src={brand.image} className="w-full h-full object-contain "/>
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">
                {brand.name}
              </h3>
              <span className="text-sm text-primary font-medium">
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
