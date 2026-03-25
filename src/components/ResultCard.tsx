import { ShieldCheck, Activity, Info, Pill, RotateCcw, AlertTriangle, CheckCircle } from 'lucide-react';

export interface AnalysisResult {
  disease: string;
  confidence: string;
  description: string;
  causes: string[];
  remedies: string[];
}

interface ResultCardProps {
  result: AnalysisResult;
  onReset: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onReset }) => {
  const isHealthy = result.disease.toLowerCase().includes('healthy');
  const isUnknown = result.disease.toLowerCase() === 'unknown';

  // Parse confidence percentage safely, e.g., "95.2%" -> 95.2
  const confValue = parseFloat(result.confidence.replace('%', '')) || 0;

  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl backdrop-blur-md bg-white/40 border-2 border-white/50 shadow-2xl overflow-hidden animate-fade-in-up">
      {/* Header section with Disease Name */}
      <div className={`p-8 border-b border-white/40 text-center relative overflow-hidden ${isHealthy ? 'bg-gradient-to-br from-green-500/20 to-emerald-600/20' : isUnknown ? 'bg-gradient-to-br from-amber-500/20 to-orange-600/20' : 'bg-gradient-to-br from-red-500/20 to-orange-600/20'}`}>
        <div className="absolute top-0 left-0 w-full h-full bg-white/10 glass-shine"></div>
        <div className="flex items-center justify-center space-x-3 mb-2">
          {isHealthy ? (
            <CheckCircle className="text-green-700" size={32} />
          ) : isUnknown ? (
             <AlertTriangle className="text-amber-700" size={32} />
          ) : (
            <ShieldCheck className="text-red-700" size={32} />
          )}
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Diagnosis Complete</h2>
        </div>
        <div className="mt-4 inline-flex items-center bg-white/60 backdrop-blur shadow-sm px-6 py-2 rounded-full border border-white/50">
          <span className={`text-2xl font-bold bg-clip-text text-transparent ${isHealthy ? 'bg-gradient-to-r from-green-600 to-emerald-800' : isUnknown ? 'bg-gradient-to-r from-amber-600 to-orange-800' : 'bg-gradient-to-r from-red-600 to-orange-800'}`}>
            {isHealthy ? 'Healthy 🌿' : result.disease}
          </span>
        </div>
      </div>

      <div className="p-8 space-y-8 bg-white/30 backdrop-blur-sm">
        {/* Confidence Progress Bar */}
        {!isUnknown && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-gray-800 font-medium">
              <span className="flex items-center gap-2"><Activity size={20} className="text-blue-500" /> Confidence Match</span>
              <span className="text-blue-700 font-bold">{result.confidence}</span>
            </div>
            <div className="w-full h-3 bg-white/50 rounded-full overflow-hidden shadow-inner">
              <div 
                className={`h-full transition-all duration-1000 ease-out flex items-center justify-end pr-1 ${isHealthy ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-red-400 to-red-600'}`}
                style={{ width: `${confValue}%` }}
              >
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

        {/* Description or Warning */}
        {isUnknown ? (
          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="flex items-center gap-2 text-lg font-semibold text-amber-800 mb-2">
              <AlertTriangle size={20} className="text-amber-500" /> Analysis Unclear
            </h4>
            <p className="text-amber-700 leading-relaxed font-medium">
              We couldn't positively identify a disease from this image. Please ensure the leaf is clearly visible and try another image.
            </p>
          </div>
        ) : (
          <div className="bg-white/50 rounded-2xl p-5 border border-white/60 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-2">
              <Info size={20} className="text-blue-500" /> Description
            </h4>
            <p className="text-gray-700 leading-relaxed font-medium">
              {result.description}
            </p>
          </div>
        )}

        {/* Causes & Remedies (Only if not healthy and not unknown) */}
        {!isHealthy && !isUnknown && (
          <>
            <div className="bg-white/50 rounded-2xl p-5 border border-white/60 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                <AlertTriangle size={20} className="text-orange-500" /> Possible Causes
              </h4>
              <ul className="space-y-2">
                {result.causes.map((cause, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700 font-medium">
                    <span className="text-orange-500 mt-1 mr-1">•</span>
                    <span>{cause}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/50 rounded-2xl p-5 border border-white/60 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                <Pill size={20} className="text-green-500" /> Recommended Remedies
              </h4>
              <ul className="space-y-2">
                {result.remedies.map((remedy, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700 font-medium">
                    <span className="text-green-500 mt-1 mr-1">✓</span>
                    <span>{remedy}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

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
