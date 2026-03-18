import { useState, useRef } from 'react';
import type { ChangeEvent, DragEvent } from 'react';
import { UploadCloud } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (file: File | null, previewUrl: string) => void;
  onAnalyze: () => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, onAnalyze }) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onImageSelect(file, url);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center animate-fade-in-up">
      {!preview ? (
        <div
          className={`w-full relative group rounded-3xl border-2 border-dashed transition-all duration-300 ease-in-out backdrop-blur-md bg-white/20 p-12 text-center cursor-pointer overflow-hidden shadow-sm hover:shadow-lg ${
            dragActive ? 'border-green-500 bg-white/40' : 'border-green-300 hover:border-green-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-4 bg-green-100/50 rounded-full text-green-700 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <UploadCloud size={48} />
            </div>
            <div className="text-gray-800">
              <p className="text-xl font-medium mb-1">Drag & Drop</p>
              <p className="text-sm text-gray-600">or click to browse</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full p-6 backdrop-blur-md bg-white/30 rounded-3xl border border-white/50 shadow-xl flex flex-col items-center animate-fade-in">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 shadow-inner bg-black/5">
            <img src={preview} alt="Leaf Preview" className="w-full h-full object-contain" />
            <button
              onClick={() => { setPreview(null); onImageSelect(null, ''); }}
              className="absolute top-2 right-2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 backdrop-blur-md transition-colors"
            >
              &times;
            </button>
          </div>
          <button
            onClick={onAnalyze}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white text-lg font-semibold shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            Analyze Now
          </button>
        </div>
      )}
    </div>
  );
};
