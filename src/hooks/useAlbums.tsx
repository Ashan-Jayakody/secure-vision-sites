import { useState, useEffect, useCallback } from "react";
import { albumsApi, Album, Installation } from "@/services/albumsApi";

// Re-export types for backwards compatibility
export type { Album, Installation };

// Fallback data when API is unavailable
const fallbackAlbums: Album[] = [
  {
    _id: "default-1",
    name: "Recent Installations",
    description: "Our latest CCTV installations across various industries",
    installations: [
      { _id: "1", image: "/assets/gallery-1.jpg", title: "Corporate Office", category: "Commercial", date: "2024-01-15" },
      { _id: "2", image: "/assets/gallery-2.jpg", title: "Residential Home", category: "Residential", date: "2024-01-10" },
      { _id: "3", image: "/assets/gallery-3.jpg", title: "Warehouse Facility", category: "Industrial", date: "2024-01-05" },
      { _id: "4", image: "/assets/gallery-4.jpg", title: "Retail Store", category: "Commercial", date: "2023-12-20" },
      { _id: "5", image: "/assets/gallery-5.jpg", title: "Parking Lot", category: "Outdoor", date: "2023-12-15" },
      { _id: "6", image: "/assets/gallery-6.jpg", title: "Financial Institution", category: "Commercial", date: "2023-12-10" },
    ],
    createdAt: "2024-01-01",
  },
];

export const useAlbums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlbums = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await albumsApi.getAll();
      setAlbums(data);
    } catch (err) {
      console.error('Failed to fetch albums:', err);
      setError('Failed to connect to server.');
      setAlbums([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  const addAlbum = async (album: { name: string; description: string; installations?: Installation[] }) => {
    try {
      const newAlbum = await albumsApi.create(album);
      setAlbums(prev => [newAlbum, ...prev]);
      return newAlbum;
    } catch (err) {
      console.error('Failed to create album:', err);
      throw err;
    }
  };

  const updateAlbum = async (id: string, updates: { name?: string; description?: string }) => {
    try {
      const updated = await albumsApi.update(id, updates);
      setAlbums(prev => prev.map(album => album._id === id ? updated : album));
      return updated;
    } catch (err) {
      console.error('Failed to update album:', err);
      throw err;
    }
  };

  const deleteAlbum = async (id: string) => {
    try {
      await albumsApi.delete(id);
      setAlbums(prev => prev.filter(album => album._id !== id));
    } catch (err) {
      console.error('Failed to delete album:', err);
      throw err;
    }
  };

  const addInstallation = async (albumId: string, installation: Omit<Installation, '_id' | 'id'>) => {
    try {
      const newInstallation = await albumsApi.addInstallation(albumId, installation);
      setAlbums(prev => prev.map(album => 
        album._id === albumId 
          ? { ...album, installations: [...album.installations, newInstallation] }
          : album
      ));
      return newInstallation;
    } catch (err) {
      console.error('Failed to add installation:', err);
      throw err;
    }
  };

  const updateInstallation = async (albumId: string, installationId: string, updates: Partial<Installation>) => {
    try {
      const updated = await albumsApi.updateInstallation(albumId, installationId, updates);
      setAlbums(prev => prev.map(album => 
        album._id === albumId 
          ? {
              ...album,
              installations: album.installations.map(inst => 
                (inst._id || inst.id) === installationId ? updated : inst
              )
            }
          : album
      ));
      return updated;
    } catch (err) {
      console.error('Failed to update installation:', err);
      throw err;
    }
  };

  const deleteInstallation = async (albumId: string, installationId: string) => {
    try {
      await albumsApi.deleteInstallation(albumId, installationId);
      setAlbums(prev => prev.map(album => 
        album._id === albumId 
          ? {
              ...album,
              installations: album.installations.filter(inst => 
                (inst._id || inst.id) !== installationId
              )
            }
          : album
      ));
    } catch (err) {
      console.error('Failed to delete installation:', err);
      throw err;
    }
  };

  return {
    albums,
    isLoading,
    error,
    refetch: fetchAlbums,
    addAlbum,
    updateAlbum,
    deleteAlbum,
    addInstallation,
    updateInstallation,
    deleteInstallation,
  };
};
