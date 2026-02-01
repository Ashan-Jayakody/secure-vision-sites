import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useAlbums, Installation } from "@/hooks/useAlbums";

const Gallery = () => {
  const { albums, isLoading } = useAlbums();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentAlbumInstallations, setCurrentAlbumInstallations] = useState<Installation[]>([]);

  const handleImageClick = (image: string, installations: Installation[], index: number) => {
    setSelectedImage(image);
    setCurrentAlbumInstallations(installations);
    setCurrentImageIndex(index);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (direction === "prev") {
      const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : currentAlbumInstallations.length - 1;
      setCurrentImageIndex(newIndex);
      setSelectedImage(currentAlbumInstallations[newIndex].image);
    } else {
      const newIndex = currentImageIndex < currentAlbumInstallations.length - 1 ? currentImageIndex + 1 : 0;
      setCurrentImageIndex(newIndex);
      setSelectedImage(currentAlbumInstallations[newIndex].image);
    }
  };

  if (isLoading) {
    return (
      <section id="gallery" className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Loading gallery...</p>
        </div>
      </section>
    );
  }

  // Get all installations across all albums for "All" tab
  const allInstallations = albums.flatMap((album) => album.installations);

  return (
    <section id="gallery" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Our Work</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
            Recent Installations
          </h2>
          <p className="text-muted-foreground text-lg">
            Browse through our portfolio of successful CCTV installations 
            across various industries and property types.
          </p>
        </div>

        {/* Album Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent mb-8 h-auto">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-card/50 border border-border"
            >
              All
            </TabsTrigger>
            {albums.map((album) => (
              <TabsTrigger
                key={album.id}
                value={album.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-card/50 border border-border"
              >
                {album.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* All Installations */}
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allInstallations.map((installation, index) => (
                <div
                  key={installation.id}
                  className="group relative overflow-hidden rounded-xl cursor-pointer animate-scale-in opacity-0"
                  style={{ animationDelay: `${0.1 * (index % 6)}s` }}
                  onClick={() => handleImageClick(installation.image, allInstallations, index)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={installation.image}
                      alt={installation.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="text-primary text-sm font-medium">{installation.category}</span>
                      <h3 className="text-foreground text-xl font-semibold mt-1">{installation.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Album-specific tabs */}
          {albums.map((album) => (
            <TabsContent key={album.id} value={album.id}>
              {album.installations.length === 0 ? (
                <p className="text-center text-muted-foreground py-12">
                  No installations in this album yet.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {album.installations.map((installation, index) => (
                    <div
                      key={installation.id}
                      className="group relative overflow-hidden rounded-xl cursor-pointer animate-scale-in opacity-0"
                      style={{ animationDelay: `${0.1 * (index % 6)}s` }}
                      onClick={() => handleImageClick(installation.image, album.installations, index)}
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={installation.image}
                          alt={installation.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <span className="text-primary text-sm font-medium">{installation.category}</span>
                          <h3 className="text-foreground text-xl font-semibold mt-1">{installation.title}</h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Lightbox Dialog with Navigation */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl bg-background border-border p-0 overflow-hidden">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center text-foreground hover:bg-background transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          {currentAlbumInstallations.length > 1 && (
            <>
              <button
                onClick={() => navigateImage("prev")}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center text-foreground hover:bg-background transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigateImage("next")}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center text-foreground hover:bg-background transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
          
          {selectedImage && (
            <div>
              <img
                src={selectedImage}
                alt="Project detail"
                className="w-full h-auto"
              />
              {currentAlbumInstallations[currentImageIndex] && (
                <div className="p-4 bg-card">
                  <span className="text-primary text-sm font-medium">
                    {currentAlbumInstallations[currentImageIndex].category}
                  </span>
                  <h3 className="text-foreground text-lg font-semibold">
                    {currentAlbumInstallations[currentImageIndex].title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {currentImageIndex + 1} of {currentAlbumInstallations.length}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;
