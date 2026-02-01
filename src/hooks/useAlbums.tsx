import { useState, useEffect } from "react";

import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

export interface Installation {
  id: string;
  image: string;
  title: string;
  category: string;
  description?: string;
  date: string;
}

export interface Album {
  id: string;
  name: string;
  description: string;
  installations: Installation[];
  createdAt: string;
}

// Default albums with initial data
const defaultAlbums: Album[] = [
  {
    id: "default-1",
    name: "Recent Installations",
    description: "Our latest CCTV installations across various industries",
    installations: [
      { id: "1", image: gallery1, title: "Corporate Office", category: "Commercial", date: "2024-01-15" },
      { id: "2", image: gallery2, title: "Residential Home", category: "Residential", date: "2024-01-10" },
      { id: "3", image: gallery3, title: "Warehouse Facility", category: "Industrial", date: "2024-01-05" },
      { id: "4", image: gallery4, title: "Retail Store", category: "Commercial", date: "2023-12-20" },
      { id: "5", image: gallery5, title: "Parking Lot", category: "Outdoor", date: "2023-12-15" },
      { id: "6", image: gallery6, title: "Financial Institution", category: "Commercial", date: "2023-12-10" },
    ],
    createdAt: "2024-01-01",
  },
];

const STORAGE_KEY = "secureview_albums";

export const useAlbums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setAlbums(JSON.parse(stored));
      } catch {
        setAlbums(defaultAlbums);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultAlbums));
      }
    } else {
      setAlbums(defaultAlbums);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultAlbums));
    }
    setIsLoading(false);
  }, []);

  const saveAlbums = (newAlbums: Album[]) => {
    setAlbums(newAlbums);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newAlbums));
  };

  const addAlbum = (album: Omit<Album, "id" | "createdAt">) => {
    const newAlbum: Album = {
      ...album,
      id: `album-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    saveAlbums([...albums, newAlbum]);
    return newAlbum;
  };

  const updateAlbum = (id: string, updates: Partial<Omit<Album, "id" | "createdAt">>) => {
    const updated = albums.map((album) =>
      album.id === id ? { ...album, ...updates } : album
    );
    saveAlbums(updated);
  };

  const deleteAlbum = (id: string) => {
    saveAlbums(albums.filter((album) => album.id !== id));
  };

  const addInstallation = (albumId: string, installation: Omit<Installation, "id">) => {
    const newInstallation: Installation = {
      ...installation,
      id: `inst-${Date.now()}`,
    };
    const updated = albums.map((album) =>
      album.id === albumId
        ? { ...album, installations: [...album.installations, newInstallation] }
        : album
    );
    saveAlbums(updated);
    return newInstallation;
  };

  const updateInstallation = (albumId: string, installationId: string, updates: Partial<Installation>) => {
    const updated = albums.map((album) =>
      album.id === albumId
        ? {
            ...album,
            installations: album.installations.map((inst) =>
              inst.id === installationId ? { ...inst, ...updates } : inst
            ),
          }
        : album
    );
    saveAlbums(updated);
  };

  const deleteInstallation = (albumId: string, installationId: string) => {
    const updated = albums.map((album) =>
      album.id === albumId
        ? { ...album, installations: album.installations.filter((inst) => inst.id !== installationId) }
        : album
    );
    saveAlbums(updated);
  };

  return {
    albums,
    isLoading,
    addAlbum,
    updateAlbum,
    deleteAlbum,
    addInstallation,
    updateInstallation,
    deleteInstallation,
  };
};
