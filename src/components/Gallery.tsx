import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { useAlbums, Installation, Album } from "@/hooks/useAlbums";

const Gallery = () => {
  const { albums, isLoading } = useAlbums();
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleAlbumClick = (album: Album) => {
    setSelectedAlbum(album);
  };

  const handleBackToAlbums = () => {
    setSelectedAlbum(null);
  };

  const handleImageClick = (image: string, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (!selectedAlbum) return;
    const installations = selectedAlbum.installations;
    
    if (direction === "prev") {
      const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : installations.length - 1;
      setCurrentImageIndex(newIndex);
      setSelectedImage(installations[newIndex].image);
    } else {
      const newIndex = currentImageIndex < installations.length - 1 ? currentImageIndex + 1 : 0;
      setCurrentImageIndex(newIndex);
      setSelectedImage(installations[newIndex].image);
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

  return (
    <section id="gallery" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Our Work</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
            {selectedAlbum ? selectedAlbum.name : "Recent Installations"}
          </h2>
          <p className="text-muted-foreground text-lg">
            {selectedAlbum 
              ? selectedAlbum.description 
              : "Browse through our portfolio of successful CCTV installations across various industries and property types."
            }
          </p>
        </div>

        {/* Back Button when viewing album */}
        {selectedAlbum && (
          <button
            onClick={handleBackToAlbums}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Albums</span>
          </button>
        )}

        {/* Albums Grid */}
        {!selectedAlbum && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album, index) => (
              <div
                key={album._id}
                className="group relative overflow-hidden rounded-xl cursor-pointer animate-scale-in opacity-0 bg-card border border-border"
                style={{ animationDelay: `${0.1 * index}s` }}
                onClick={() => handleAlbumClick(album)}
              >
                {/* Album Cover - Split layout for up to 3 images */}
                <div className="aspect-[4/3] overflow-hidden flex">
                  {album.installations.length > 0 ? (
                    album.installations.length === 1 ? (
                      <img
                        src={album.installations[0].image}
                        alt={album.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : album.installations.length === 2 ? (
                      <>
                        <div className="w-1/2 h-full border-r border-background/20 overflow-hidden">
                          <img
                            src={album.installations[0].image}
                            alt={album.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="w-1/2 h-full overflow-hidden">
                          <img
                            src={album.installations[1].image}
                            alt={album.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-2/3 h-full border-r border-background/20 overflow-hidden">
                          <img
                            src={album.installations[0].image}
                            alt={album.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="w-1/3 h-full flex flex-col">
                          <div className="h-1/2 border-b border-background/20 overflow-hidden">
                            <img
                              src={album.installations[1].image}
                              alt={album.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          <div className="h-1/2 overflow-hidden">
                            <img
                              src={album.installations[2].image}
                              alt={album.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                        </div>
                      </>
                    )
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">No images</span>
                    </div>
                  )}
                </div>
                
                {/* Album Info Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-foreground text-xl font-semibold">{album.name}</h3>
                    <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{album.description}</p>
                    <span className="text-primary text-sm font-medium mt-2 inline-block">
                      {album.installations.length} {album.installations.length === 1 ? "photo" : "photos"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Album Images Grid */}
        {selectedAlbum && (
          <>
            {selectedAlbum.installations.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">
                No installations in this album yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedAlbum.installations.map((installation, index) => (
                  <div
                    key={installation._id || installation.id}
                    className="group relative overflow-hidden rounded-xl cursor-pointer animate-scale-in opacity-0"
                    style={{ animationDelay: `${0.1 * (index % 6)}s` }}
                    onClick={() => handleImageClick(installation.image, index)}
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
          </>
        )}
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
          
          {selectedAlbum && selectedAlbum.installations.length > 1 && (
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
          
          {selectedImage && selectedAlbum && (
            <div>
              <img
                src={selectedImage}
                alt="Project detail"
                className="w-full h-auto"
              />
              {selectedAlbum.installations[currentImageIndex] && (
                <div className="p-4 bg-card">
                  <span className="text-primary text-sm font-medium">
                    {selectedAlbum.installations[currentImageIndex].category}
                  </span>
                  <h3 className="text-foreground text-lg font-semibold">
                    {selectedAlbum.installations[currentImageIndex].title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {currentImageIndex + 1} of {selectedAlbum.installations.length}
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
