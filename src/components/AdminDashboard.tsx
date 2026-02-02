import { useState, useRef, ChangeEvent, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useAlbums, Album } from "@/hooks/useAlbums";
import { useMessages } from "@/hooks/useMessages";
import { toast } from "@/hooks/use-toast";
import { uploadImage } from "@/services/cloudinaryApi";
import { Plus, Trash2, Edit, LogOut, FolderPlus, Image, ArrowLeft, X, Loader2, Mail, LayoutDashboard, Settings, Phone } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { albums, addAlbum, updateAlbum, deleteAlbum, addInstallation, deleteInstallation } = useAlbums();
  const { messages, deleteMessage, isLoading: isLoadingMessages } = useMessages();
  
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [activeTab, setActiveTab] = useState("albums");
  const [isAlbumDialogOpen, setIsAlbumDialogOpen] = useState(false);
  const [isInstallationDialogOpen, setIsInstallationDialogOpen] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Album form state
  const [albumName, setAlbumName] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");
  
  // Installation form state
  const [instTitle, setInstTitle] = useState("");
  const [instCategory, setInstCategory] = useState("");
  const [instDescription, setInstDescription] = useState("");
  const [instDate, setInstDate] = useState("");
  const [instImage, setInstImage] = useState<string>("");
  const [instImageFile, setInstImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    logout();
    navigate("/");
    toast({ title: "Logged out successfully" });
  };

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setInstImageFile(file);
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setInstImage(previewUrl);
    }
  };

  const handleCreateAlbum = async () => {
    if (!albumName.trim()) {
      toast({ title: "Album name is required", variant: "destructive" });
      return;
    }
    
    setIsSaving(true);
    try {
      if (editingAlbum) {
        await updateAlbum(editingAlbum._id, { name: albumName, description: albumDescription });
        toast({ title: "Album updated successfully" });
      } else {
        await addAlbum({ name: albumName, description: albumDescription, installations: [] });
        toast({ title: "Album created successfully" });
      }
      
      setAlbumName("");
      setAlbumDescription("");
      setEditingAlbum(null);
      setIsAlbumDialogOpen(false);
    } catch (error) {
      toast({ title: "Failed to save album", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditAlbum = (album: Album) => {
    setEditingAlbum(album);
    setAlbumName(album.name);
    setAlbumDescription(album.description);
    setIsAlbumDialogOpen(true);
  };

  const handleDeleteAlbum = async (id: string) => {
    try {
      await deleteAlbum(id);
      if (selectedAlbum?._id === id) {
        setSelectedAlbum(null);
      }
      toast({ title: "Album deleted" });
    } catch (error) {
      toast({ title: "Failed to delete album", variant: "destructive" });
    }
  };

  const handleCreateInstallation = async () => {
    if (!selectedAlbum) return;
    if (!instTitle.trim() || !instCategory.trim() || (!instImage && !instImageFile)) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    
    setIsSaving(true);
    try {
      let imageUrl = instImage;
      
      // Upload image to Cloudinary if a file was selected
      if (instImageFile) {
        setIsUploading(true);
        try {
          const result = await uploadImage(instImageFile);
          imageUrl = result.secure_url;
        } catch (error) {
          toast({ title: "Failed to upload image", variant: "destructive" });
          setIsUploading(false);
          setIsSaving(false);
          return;
        }
        setIsUploading(false);
      }
      
      await addInstallation(selectedAlbum._id, {
        title: instTitle,
        category: instCategory,
        description: instDescription,
        date: instDate || new Date().toISOString().split("T")[0],
        image: imageUrl,
      });
      
      // Reset form
      setInstTitle("");
      setInstCategory("");
      setInstDescription("");
      setInstDate("");
      setInstImage("");
      setInstImageFile(null);
      setIsInstallationDialogOpen(false);
      
      toast({ title: "Installation added successfully" });
    } catch (error) {
      toast({ title: "Failed to add installation", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteInstallation = async (installationId: string) => {
    if (!selectedAlbum) return;
    try {
      await deleteInstallation(selectedAlbum._id, installationId);
      toast({ title: "Installation deleted" });
    } catch (error) {
      toast({ title: "Failed to delete installation", variant: "destructive" });
    }
  };

  // Refresh selected album when albums change
  const currentAlbum = selectedAlbum ? albums.find((a) => a._id === selectedAlbum._id) : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {currentAlbum && (
              <Button variant="ghost" size="icon" onClick={() => setSelectedAlbum(null)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <h1 className="text-xl font-bold text-foreground">
              {currentAlbum ? currentAlbum.name : "Admin Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              View Site
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-card border border-border p-1">
            <TabsTrigger value="albums" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Albums
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Mail className="w-4 h-4 mr-2" />
              Messages
              {messages.length > 0 && (
                <span className="ml-2 bg-primary-foreground text-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {messages.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="albums" className="mt-0">
            {!currentAlbum ? (
              // Albums List View
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-foreground">Albums</h2>
                  <Dialog open={isAlbumDialogOpen} onOpenChange={(open) => {
                    setIsAlbumDialogOpen(open);
                    if (!open) {
                      setEditingAlbum(null);
                      setAlbumName("");
                      setAlbumDescription("");
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button>
                        <FolderPlus className="w-4 h-4 mr-2" />
                        New Album
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card border-border">
                      <DialogHeader>
                        <DialogTitle className="text-foreground">
                          {editingAlbum ? "Edit Album" : "Create New Album"}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="album-name" className="text-foreground">Album Name</Label>
                          <Input
                            id="album-name"
                            value={albumName}
                            onChange={(e) => setAlbumName(e.target.value)}
                            placeholder="e.g., 2024 Installations"
                            className="bg-background/50 border-border"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="album-desc" className="text-foreground">Description</Label>
                          <Textarea
                            id="album-desc"
                            value={albumDescription}
                            onChange={(e) => setAlbumDescription(e.target.value)}
                            placeholder="Brief description of this album"
                            className="bg-background/50 border-border"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleCreateAlbum}>
                          {editingAlbum ? "Save Changes" : "Create Album"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {albums.map((album) => (
                    <Card
                      key={album._id}
                      className="bg-card/50 border-border hover:border-primary/50 transition-colors cursor-pointer group"
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div onClick={() => setSelectedAlbum(album)} className="flex-1">
                            <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors">
                              {album.name}
                            </CardTitle>
                            <CardDescription className="text-muted-foreground mt-1">
                              {album.installations.length} installation{album.installations.length !== 1 ? "s" : ""}
                            </CardDescription>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditAlbum(album);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteAlbum(album._id);
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent onClick={() => setSelectedAlbum(album)}>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {album.description || "No description"}
                        </p>
                        {album.installations.length > 0 && (
                          <div className="grid grid-cols-3 gap-1 mt-4">
                            {album.installations.slice(0, 3).map((inst) => (
                              <div key={inst._id || inst.id} className="aspect-square rounded overflow-hidden">
                                <img
                                  src={inst.image}
                                  alt={inst.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              // Album Detail View (Installations)
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-muted-foreground">{currentAlbum.description}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {currentAlbum.installations.length} installation{currentAlbum.installations.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <Dialog open={isInstallationDialogOpen} onOpenChange={setIsInstallationDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Installation
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card border-border max-w-lg">
                      <DialogHeader>
                        <DialogTitle className="text-foreground">Add New Installation</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                        <div className="space-y-2">
                          <Label className="text-foreground">Image *</Label>
                          <div
                            className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            {instImage ? (
                              <div className="relative">
                                <img
                                  src={instImage}
                                  alt="Preview"
                                  className="max-h-40 mx-auto rounded"
                                />
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  className="absolute top-0 right-0 h-6 w-6"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setInstImage("");
                                    setInstImageFile(null);
                                  }}
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            ) : (
                              <>
                                <Image className="w-10 h-10 mx-auto text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground">
                                  Click to upload an image
                                </p>
                              </>
                            )}
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageSelect}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="inst-title" className="text-foreground">Title *</Label>
                          <Input
                            id="inst-title"
                            value={instTitle}
                            onChange={(e) => setInstTitle(e.target.value)}
                            placeholder="e.g., Corporate Office Security"
                            className="bg-background/50 border-border"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="inst-category" className="text-foreground">Category *</Label>
                          <Input
                            id="inst-category"
                            value={instCategory}
                            onChange={(e) => setInstCategory(e.target.value)}
                            placeholder="e.g., Commercial, Residential, Industrial"
                            className="bg-background/50 border-border"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="inst-desc" className="text-foreground">Description</Label>
                          <Textarea
                            id="inst-desc"
                            value={instDescription}
                            onChange={(e) => setInstDescription(e.target.value)}
                            placeholder="Brief description of the installation"
                            className="bg-background/50 border-border"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="inst-date" className="text-foreground">Installation Date</Label>
                          <Input
                            id="inst-date"
                            type="date"
                            value={instDate}
                            onChange={(e) => setInstDate(e.target.value)}
                            className="bg-background/50 border-border"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleCreateInstallation} disabled={isSaving || isUploading}>
                          {isUploading ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Uploading...
                            </>
                          ) : isSaving ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            "Add Installation"
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {currentAlbum.installations.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-border rounded-lg">
                    <Image className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No installations yet</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Add your first installation to this album
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentAlbum.installations.map((inst) => (
                      <Card key={inst._id || inst.id} className="bg-card/50 border-border overflow-hidden group">
                        <div className="aspect-[4/3] overflow-hidden relative">
                          <img
                            src={inst.image}
                            alt={inst.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                            onClick={() => handleDeleteInstallation(inst._id || inst.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <CardContent className="p-4">
                          <span className="text-xs text-primary font-medium">{inst.category}</span>
                          <h3 className="text-foreground font-semibold mt-1">{inst.title}</h3>
                          {inst.description && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {inst.description}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-2">{inst.date}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="messages" className="mt-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-foreground">Inquiries</h2>
            </div>

            {isLoadingMessages ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-border rounded-lg bg-card/30">
                <Mail className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                <p className="text-muted-foreground">No messages yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  When users request a quote, they will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <Card key={message._id} className="bg-card/50 border-border">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col">
                          <CardTitle className="text-lg text-foreground">
                            {message.name}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-4 mt-1">
                            <span className="flex items-center gap-1.5">
                              <Mail className="w-3.5 h-3.5" />
                              {message.email}
                            </span>
                            {message.phone && (
                              <span className="flex items-center gap-1.5">
                                <Phone className="w-3.5 h-3.5" />
                                {message.phone}
                              </span>
                            )}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground">
                            {new Date(message.createdAt).toLocaleDateString()}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => deleteMessage(message._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="p-3 bg-background/50 rounded-lg border border-border/50">
                        <p className="text-sm text-foreground whitespace-pre-wrap">
                          {message.message}
                        </p>
                      </div>
                      <div className="mt-3">
                        <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-semibold bg-primary/10 text-primary uppercase tracking-wider">
                          {message.service || 'Security Assessment'}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
