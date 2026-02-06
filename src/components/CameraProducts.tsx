import { Eye, Wifi, Moon, Cloud, Shield, Cpu } from "lucide-react";
import { Card } from "@/components/ui/card";
import cameraDome from "@/assets/camera-dome.jpg";
import cameraBullet from "@/assets/camera-bullet.jpg";
import cameraPtz from "@/assets/camera-ptz.jpg";
import cameraWireless from "@/assets/camera-wireless.jpg";
import cameraNvr from "@/assets/camera-nvr.jpg";
import cameraThermal from "@/assets/camera-thermal.jpg";

const cameras = [
  {
    name: "Dome Camera",
    tagline: "Indoor & Ceiling Mount",
    image: cameraDome,
    description:
      "Discreet ceiling-mounted cameras ideal for offices, retail stores, and indoor spaces. Vandal-resistant design with wide-angle coverage.",
    features: [
      { icon: Eye, label: "360° View" },
      { icon: Moon, label: "Night Vision" },
      { icon: Shield, label: "Vandal-Proof" },
    ],
  },
  {
    name: "Bullet Camera",
    tagline: "Outdoor & Long Range",
    image: cameraBullet,
    description:
      "Weatherproof outdoor cameras built for perimeter surveillance. Long-range infrared capabilities for large area coverage.",
    features: [
      { icon: Eye, label: "Long Range" },
      { icon: Moon, label: "IR 80m" },
      { icon: Shield, label: "IP67 Rated" },
    ],
  },
  {
    name: "PTZ Camera",
    tagline: "Pan-Tilt-Zoom Control",
    image: cameraPtz,
    description:
      "Motorized cameras with remote pan, tilt, and zoom control. Perfect for active monitoring of large areas and parking lots.",
    features: [
      { icon: Eye, label: "30x Zoom" },
      { icon: Wifi, label: "Remote Control" },
      { icon: Cpu, label: "Auto Tracking" },
    ],
  },
  {
    name: "Wireless IP Camera",
    tagline: "WiFi Connected",
    image: cameraWireless,
    description:
      "Easy-to-install wireless cameras with smartphone access. Stream live footage from anywhere with cloud recording support.",
    features: [
      { icon: Wifi, label: "WiFi Built-in" },
      { icon: Cloud, label: "Cloud Storage" },
      { icon: Eye, label: "4K Ultra HD" },
    ],
  },
  {
    name: "NVR System",
    tagline: "Network Video Recorder",
    image: cameraNvr,
    description:
      "Centralized recording systems for managing multiple cameras. Supports up to 32 channels with intelligent playback and search.",
    features: [
      { icon: Cpu, label: "32 Channels" },
      { icon: Cloud, label: "8TB Storage" },
      { icon: Shield, label: "AI Search" },
    ],
  },
  {
    name: "Thermal Camera",
    tagline: "Heat Detection",
    image: cameraThermal,
    description:
      "Advanced thermal imaging for perimeter security and fire detection. Works in complete darkness and adverse weather conditions.",
    features: [
      { icon: Moon, label: "Zero Light" },
      { icon: Eye, label: "Heat Map" },
      { icon: Shield, label: "Fire Detect" },
    ],
  },
];

const CameraProducts = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-dark">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Our Products
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
            Camera Systems & Equipment
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore our range of professional-grade CCTV cameras and recording 
            systems tailored for every security need.
          </p>
        </div>

        {/* Camera Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cameras.map((camera, index) => (
            <Card
              key={camera.name}
              className="bg-gradient-card border-border overflow-hidden hover:border-primary/50 transition-all duration-300 group animate-fade-in-up opacity-0"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              {/* Camera Image */}
              <div className="h-48 overflow-hidden bg-muted/30">
                <img
                  src={camera.image}
                  alt={camera.name}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {camera.name}
                    </h3>
                    <span className="text-primary text-sm font-medium">
                      {camera.tagline}
                    </span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {camera.description}
                </p>
              </div>

              {/* Feature Pills */}
              <div className="px-6 pb-6">
                <div className="flex flex-wrap gap-2">
                  {camera.features.map((feature) => (
                    <div
                      key={feature.label}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
                    >
                      <feature.icon className="w-3.5 h-3.5" />
                      {feature.label}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CameraProducts;
