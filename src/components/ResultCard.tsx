
import { ShieldCheck, Activity, Info, Pill, RotateCcw } from 'lucide-react';

export interface AnalysisResult {
  prediction: string;
  confidence: number;
  description: string;
  solution: string;
}

interface ResultCardProps {
  result: AnalysisResult;
  onReset: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onReset }) => {
  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl backdrop-blur-md bg-white/40 border-2 border-white/50 shadow-2xl overflow-hidden animate-fade-in-up">
      {/* Header section with Disease Name */}
      <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 p-8 border-b border-white/40 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-white/10 glass-shine"></div>
        <div className="flex items-center justify-center space-x-3 mb-2">
          <ShieldCheck className="text-green-700" size={32} />
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Diagnosis Complete</h2>
        </div>
        <div className="mt-4 inline-block bg-white/60 backdrop-blur shadow-sm px-6 py-2 rounded-full border border-green-200">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-800">
            {result.prediction}
          </span>
        </div>
      </div>

      <div className="p-8 space-y-8 bg-white/30 backdrop-blur-sm">
        {/* Confidence Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-gray-800 font-medium">
            <span className="flex items-center gap-2"><Activity size={20} className="text-blue-500" /> Confidence Match</span>
            <span className="text-blue-700 font-bold">{Math.round(result.confidence * 100)}%</span>
          </div>
          <div className="w-full h-3 bg-white/50 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-1000 ease-out flex items-center justify-end pr-1"
              style={{ width: `${result.confidence * 100}%` }}
            >
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white/50 rounded-2xl p-5 border border-white/60 shadow-sm hover:shadow-md transition-shadow">
          <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-2">
            <Info size={20} className="text-amber-500" /> Description
          </h4>
          <p className="text-gray-700 leading-relaxed font-medium">
            {result.description}
          </p>
        </div>

        {/* Solution */}
        <div className="bg-white/50 rounded-2xl p-5 border border-white/60 shadow-sm hover:shadow-md transition-shadow">
          <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-2">
            <Pill size={20} className="text-rose-500" /> Recommended Treatment
          </h4>
          <p className="text-gray-700 leading-relaxed font-medium">
            {result.solution}
          </p>
        </div>

        <button
          onClick={onReset}
          className="w-full mt-4 flex items-center justify-center gap-2 py-4 rounded-xl bg-white/80 hover:bg-white text-gray-800 font-semibold shadow border border-gray-200 hover:shadow-lg transition-all active:scale-95"
        >
          <RotateCcw size={20} />
          Try Another Image
        </button>
      </div>
    </div>
  );
};
