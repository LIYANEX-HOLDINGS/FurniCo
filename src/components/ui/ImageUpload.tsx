"use client"
import { useState, useRef } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  onRemove: () => void;
  folder?: string;
  label?: string;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  folder = "cozycorner/blogs",
  label = "Upload Image"
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { token } = useAuthStore();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64data = reader.result as string;

        const res = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ image: base64data, folder })
        });

        const data = await res.json();
        if (data.success) {
          onChange(data.url);
        } else {
          setError(data.message || "Upload failed");
        }
        setIsUploading(false);
      };
    } catch (err: any) {
      setError("An unexpected error occurred during upload");
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        {value && (
          <button 
            type="button" 
            onClick={onRemove}
            className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Remove Image
          </button>
        )}
      </div>

      <div 
        onClick={() => !value && !isUploading && fileInputRef.current?.click()}
        className={cn(
          "relative aspect-video rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden bg-gray-50",
          !value ? "hover:border-primary/50 border-gray-200" : "border-transparent",
          isUploading && "opacity-60 cursor-not-allowed"
        )}
      >
        {value ? (
          <Image 
            src={value} 
            alt="Uploaded Preview" 
            fill 
            className="object-cover" 
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            {isUploading ? (
              <>
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                <span className="text-sm font-medium">Uploading to Cloudinary...</span>
              </>
            ) : (
              <>
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-1">
                  <Upload className="w-6 h-6 text-gray-400" />
                </div>
                <span className="text-sm font-medium">Click to upload or drag and drop</span>
                <span className="text-xs">SVG, PNG, JPG or GIF (max. 5MB)</span>
              </>
            )}
          </div>
        )}

        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>

      {error && <p className="text-xs text-red-500 mt-2 font-medium">{error}</p>}
    </div>
  );
}
