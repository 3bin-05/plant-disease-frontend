import { useState } from 'react';
import axios from 'axios';
import { ImageUpload } from './components/ImageUpload';
import { AnalysisLoading } from './components/AnalysisLoading';
import { ResultCard } from './components/ResultCard';
import type { AnalysisResult } from './components/ResultCard';
import { Leaf, AlertCircle } from 'lucide-react';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState<'upload' | 'loading' | 'result'>('upload');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (selectedFile: File | null) => {
    setFile(selectedFile);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please select an image first.");
      return;
    }

    setStep('loading');
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post<AnalysisResult>('https://plant-disease-backend-1-fcft.onrender.com/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResult(response.data);
      setStep('result');
    } catch (err) {
      console.error(err);
      setError("Something went wrong analyzing the image. Please try again.");
      setStep('upload');
    }
  };

  const resetState = () => {
    setFile(null);
    setResult(null);
    setStep('upload');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 font-sans relative overflow-x-hidden selection:bg-green-300">
      {/* Decorative background blur blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 container mx-auto px-4 py-12 lg:py-24 flex flex-col items-center justify-center min-h-screen">
        
        {/* Header */}
        <header className="text-center mb-12 max-w-3xl animate-fade-in-down">
          <div className="inline-flex items-center justify-center p-4 bg-white/40 mb-6 backdrop-blur-md rounded-full shadow-sm border border-white/50">
            <Leaf className="text-green-600 mr-2" fill="currentColor" size={32} />
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-900 tracking-tight">
              LeafCare
            </h1>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Plant Disease Detection
          </h2>
          <p className="text-lg text-gray-600 font-medium leading-relaxed">
            Upload a leaf image and get an instant diagnosis with treatment suggestions. Early detection saves yields.
          </p>
        </header>

        {/* Error Alert */}
        {error && (
          <div className="mb-8 w-full max-w-md bg-red-50/80 backdrop-blur border border-red-200 text-red-700 px-6 py-4 rounded-2xl shadow-sm flex items-center space-x-3 animate-shake">
            <AlertCircle size={24} className="text-red-500 shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Main Content Area */}
        <main className="w-full flex justify-center mb-16">
          {step === 'upload' && (
            <ImageUpload onImageSelect={handleImageSelect} onAnalyze={handleAnalyze} />
          )}
          
          {step === 'loading' && (
            <AnalysisLoading />
          )}

          {step === 'result' && result && (
            <ResultCard result={result} onReset={resetState} />
          )}
        </main>

        {/* Footer */}
        <footer className="mt-auto text-center text-gray-500 font-medium">
          <p>Built for Farmers 🌿</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
