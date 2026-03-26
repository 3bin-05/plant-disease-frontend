import { Leaf } from 'lucide-react';

export const AnalysisLoading: React.FC = () => {
  return (
    <div className="w-full max-w-md mx-auto p-10 backdrop-blur-lg bg-white/30 rounded-3xl border border-white/40 shadow-xl flex flex-col items-center justify-center space-y-8 animate-pulse text-center">
      <div className="relative flex items-center justify-center">
        {/* Outer spinning ring */}
        <div className="absolute inset-0 border-4 border-green-200 border-t-green-500 rounded-full w-24 h-24 animate-spin"></div>
        {/* Inner pulsing leaf */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center shadow-inner relative z-10 text-green-600 animate-bounce">
          <Leaf size={36} />
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 tracking-tight">Analyzing leaf...</h3>
        <p className="text-gray-600 mt-2">Processing image and detecting anomalies</p>
      </div>
    </div>
  );
};
