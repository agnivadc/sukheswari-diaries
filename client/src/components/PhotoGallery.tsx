import { useState } from "react";
import { X, Heart } from "lucide-react";
import img1 from "@assets/WhatsApp Image 2025-10-15 at 22.09.07 (1)_1760562982343.jpeg";
import img2 from "@assets/WhatsApp Image 2025-10-15 at 22.09.07 (2)_1760562982351.jpeg";
import img3 from "@assets/WhatsApp Image 2025-10-15 at 22.09.07_1760562982351.jpeg";
import img4 from "@assets/WhatsApp Image 2025-10-15 at 22.09.08 (1)_1760562982352.jpeg";
import img5 from "@assets/WhatsApp Image 2025-10-15 at 22.09.08 (2)_1760562982352.jpeg";
import img6 from "@assets/WhatsApp Image 2025-10-15 at 22.09.08 (3)_1760562982352.jpeg";
import img7 from "@assets/WhatsApp Image 2025-10-15 at 22.09.08 (4)_1760562982353.jpeg";
import img8 from "@assets/WhatsApp Image 2025-10-15 at 22.09.08 (5)_1760562982353.jpeg";
import img9 from "@assets/WhatsApp Image 2025-10-15 at 22.09.08 (6)_1760562982353.jpeg";
import img10 from "@assets/WhatsApp Image 2025-10-15 at 22.09.08 (7)_1760562982353.jpeg";
import img11 from "@assets/WhatsApp Image 2025-10-15 at 22.09.08_1760562982354.jpeg";
import img12 from "@assets/WhatsApp Image 2025-10-15 at 22.09.09 (1)_1760562982355.jpeg";
import img13 from "@assets/WhatsApp Image 2025-10-15 at 22.09.09 (2)_1760562982355.jpeg";
import img14 from "@assets/WhatsApp Image 2025-10-15 at 22.09.09 (3)_1760562982355.jpeg";
import img15 from "@assets/WhatsApp Image 2025-10-15 at 22.09.09 (4)_1760562982355.jpeg";
import img16 from "@assets/WhatsApp Image 2025-10-15 at 22.09.09 (5)_1760562982356.jpeg";
import img17 from "@assets/WhatsApp Image 2025-10-15 at 22.09.09 (6)_1760562982356.jpeg";
import img18 from "@assets/WhatsApp Image 2025-10-15 at 22.09.09 (7)_1760562982357.jpeg";
import img19 from "@assets/WhatsApp Image 2025-10-15 at 22.09.09_1760562982357.jpeg";

const photos = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
  img11, img12, img13, img14, img15, img16, img17, img18, img19
];

const rotations = [2, -3, 1, -2, 3, -1, 2, -3, 1, -2, 3, -1, 2, -2, 1, -3, 2, -1, 3];

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set());

  const toggleLike = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPhotos((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="py-20 px-6 bg-background" data-testid="photo-gallery">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4 text-foreground">
          Our Story in Pictures
        </h2>
        <p className="text-center text-muted-foreground mb-4 text-lg">
          Every photo tells a thousand words
        </p>
        <p className="text-center text-sm text-accent-foreground mb-12">
          💡 Click to view full size, heart to favorite
        </p>

        {/* Postcard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
              style={{
                transform: `rotate(${rotations[index]}deg)`,
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = `rotate(0deg) scale(1.05)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `rotate(${rotations[index]}deg) scale(1)`;
              }}
              onClick={() => setSelectedPhoto(index)}
              data-testid={`photo-card-${index}`}
            >
              {/* Postcard Container */}
              <div className="bg-background border-4 border-border shadow-lg p-3 pb-12 relative">
                {/* Photo */}
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={photo}
                    alt={`Memory ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Postcard bottom section */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  {/* Heart button */}
                  <button
                    onClick={(e) => toggleLike(index, e)}
                    className="hover-elevate active-elevate-2 p-1 rounded-md transition-transform"
                    data-testid={`like-photo-${index}`}
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${
                        likedPhotos.has(index)
                          ? "text-primary fill-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>

                  {/* Decorative stamp */}
                  <div className="w-8 h-8 border-2 border-primary/30 rounded-sm flex items-center justify-center text-xs text-primary/50 font-script">
                    ♥
                  </div>
                </div>

                {/* Tape effect */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-muted/50 border border-border/30 opacity-70" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto !== null && (
        <div
          className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
          data-testid="lightbox"
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-card hover-elevate active-elevate-2 border border-border"
            onClick={() => setSelectedPhoto(null)}
            data-testid="close-lightbox"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>

          <div className="max-w-5xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={photos[selectedPhoto]}
              alt={`Memory ${selectedPhoto + 1}`}
              className="w-full h-full object-contain rounded-md shadow-2xl"
            />

            {/* Navigation */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 bg-card/80 backdrop-blur-sm rounded-full px-6 py-3 border border-border">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhoto((prev) => (prev! > 0 ? prev! - 1 : photos.length - 1));
                }}
                className="text-foreground hover-elevate px-4 py-2 rounded-full transition-colors"
                data-testid="prev-photo"
              >
                ← Prev
              </button>
              <span className="text-muted-foreground py-2">
                {selectedPhoto + 1} / {photos.length}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhoto((prev) => (prev! < photos.length - 1 ? prev! + 1 : 0));
                }}
                className="text-foreground hover-elevate px-4 py-2 rounded-full transition-colors"
                data-testid="next-photo"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
