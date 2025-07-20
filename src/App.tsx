import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import IngredientAnalyzer from './components/IngredientAnalyzer';
import AnalysisResults from './components/AnalysisResults';
import AlternativeProducts from './components/AlternativeProducts';
import ProfilePage from './components/ProfilePage';
import UploadPage from './components/UploadPage';

export interface IngredientResult {
  name: string;
  description: string;
  flags: string[];
  link?: string;
  rawData?: any;
}

export interface ProductMetadata {
  brand?: string;
  product?: string;
  image?: string;
  url?: string;
}

export interface UserPreferences {
  watchlist?: string[];
  flagPreferences?: {
    microplastics: boolean;
    comedogenic: boolean;
    irritant: boolean;
    endocrine: boolean;
    euBanned: boolean;
    cancer: boolean;
    penetration: boolean;
  };
}

function App() {
  const [currentPage, setCurrentPage] = useState<'main' | 'profile' | 'upload'>('main');
  const [analysisResults, setAnalysisResults] = useState<IngredientResult[]>([]);
  const [productMetadata, setProductMetadata] = useState<ProductMetadata | null>(null);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    watchlist: [],
    flagPreferences: {
      microplastics: true,
      comedogenic: true,
      irritant: true,
      endocrine: true,
      euBanned: true,
      cancer: true,
      penetration: true,
    }
  });
  const [showRecommendations, setShowRecommendations] = useState(false);

  // Mock ingredient database for demo
  const mockIngredientData = [
    {
      ingredient: "Sodium Lauryl Sulfate",
      description: "A surfactant that can be irritating to sensitive skin",
      flags: ["Irritant"],
      microplastics: "no",
      comedogenic: "no",
      irritant: "yes",
      endocrine_disruptor: "no",
      eu_banned: "no",
      cancer_risk: "no",
      penetration_enhancer: "no"
    },
    {
      ingredient: "Parabens",
      description: "Preservatives that may disrupt hormones",
      flags: ["Endocrine Disruptor"],
      microplastics: "no",
      comedogenic: "no",
      irritant: "maybe",
      endocrine_disruptor: "yes",
      eu_banned: "no",
      cancer_risk: "maybe",
      penetration_enhancer: "no"
    },
    {
      ingredient: "Coconut Oil",
      description: "Natural moisturizer, but can clog pores for some people",
      flags: ["Comedogenic"],
      microplastics: "no",
      comedogenic: "yes",
      irritant: "no",
      endocrine_disruptor: "no",
      eu_banned: "no",
      cancer_risk: "no",
      penetration_enhancer: "no"
    },
    {
      ingredient: "Polyethylene",
      description: "Plastic polymer used as a thickener, contains microplastics",
      flags: ["Microplastic"],
      microplastics: "yes",
      comedogenic: "no",
      irritant: "no",
      endocrine_disruptor: "no",
      eu_banned: "no",
      cancer_risk: "no",
      penetration_enhancer: "no"
    },
    {
      ingredient: "Formaldehyde",
      description: "Preservative with potential carcinogenic properties",
      flags: ["Carcinogen", "EU Banned"],
      microplastics: "no",
      comedogenic: "no",
      irritant: "yes",
      endocrine_disruptor: "no",
      eu_banned: "yes",
      cancer_risk: "yes",
      penetration_enhancer: "no"
    }
  ];

  const normalizeIngredientName = (name: string): string => {
    if (!name) return "";
    let norm = name.replace(/\s*\([^)]*\)\s*/g, " ").trim().replace(/\s+/g, " ");
    if (norm.includes("/")) norm = norm.split("/")[0].trim();
    return norm.toLowerCase().replace(/\s+/g, " ");
  };

  const getDefaultFlags = (match: any): string[] => {
    const flags: string[] = [];
    const FLAG_MAP = {
      microplastics: "Microplastic",
      comedogenic: "Comedogenic",
      irritant: "Irritant",
      endocrine_disruptor: "Endocrine Disruptor",
      eu_banned: "EU Banned",
      cancer_risk: "Carcinogen",
      penetration_enhancer: "Penetration Enhancer"
    };

    for (const [key, icon] of Object.entries(FLAG_MAP)) {
      if (match[key]?.trim().toLowerCase() === "yes") flags.push(icon);
      else if (match[key]?.trim().toLowerCase() === "maybe") flags.push(`Possible ${icon}`);
    }
    return flags;
  };

  const processIngredients = async (ingredients: string[]) => {
    const results = await Promise.all(
      ingredients.map(async (rawInput) => {
        const normInput = normalizeIngredientName(rawInput);
        
        // Special case: Water
        if (/\bwater\b|\baqua\b|\beau\b/.test(normInput)) {
          return {
            name: "Water",
            description: "Universal solvent; generally safe.",
            flags: []
          };
        }

        // Find match in mock data
        const match = mockIngredientData.find(entry => 
          normalizeIngredientName(entry.ingredient) === normInput
        );

        if (match) {
          const flags = getDefaultFlags(match);
          
          // Add watchlist flag if applicable
          if (userPreferences.watchlist?.includes(normInput)) {
            flags.push("⭐ On Your Watchlist");
          }

          return {
            name: match.ingredient,
            description: match.description,
            flags,
            rawData: match
          };
        }

        // Check watchlist for unknown ingredients
        const watchlistFlags = [];
        if (userPreferences.watchlist?.includes(normInput)) {
          watchlistFlags.push("⭐ On Your Watchlist");
        }

        return {
          name: rawInput,
          description: "Not yet rated by aira.",
          flags: watchlistFlags
        };
      })
    );

    setAnalysisResults(results);
    setShowRecommendations(true);
  };

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Implement search functionality
  };

  const handleCameraUpload = () => {
    setCurrentPage('upload');
  };

  const handleProfileClick = () => {
    setCurrentPage('profile');
  };

  const handleBackToMain = () => {
    setCurrentPage('main');
  };

  const handleImageAnalysis = (extractedText: string, metadata: ProductMetadata) => {
    setProductMetadata(metadata);
    
    // Process extracted text into ingredients
    const cleanLines = extractedText
      .split(/\n+/)
      .filter(line => !line.includes(":") && !line.trim().startsWith("-"));
    
    const ingredients = cleanLines
      .join(" ")
      .split(/[,;•]+/)
      .map(s => s.trim())
      .filter((value, index, self) => value && self.indexOf(value) === index);

    if (ingredients.length > 0) {
      processIngredients(ingredients);
    }
    
    setCurrentPage('main');
  };

  const handlePreferencesUpdate = (newPreferences: UserPreferences) => {
    setUserPreferences(newPreferences);
  };

  if (currentPage === 'profile') {
    return (
      <ProfilePage
        userPreferences={userPreferences}
        onPreferencesUpdate={handlePreferencesUpdate}
        onBack={handleBackToMain}
      />
    );
  }

  if (currentPage === 'upload') {
    return (
      <UploadPage
        onImageAnalysis={handleImageAnalysis}
        onBack={handleBackToMain}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header
        onSearch={handleSearch}
        onCameraUpload={handleCameraUpload}
        onProfileClick={handleProfileClick}
      />
      
      {showRecommendations && (
        <AlternativeProducts />
      )}
      
      <div className="container">
        {productMetadata && (
          <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
            <div className="flex items-center">
              {productMetadata.image && (
                <img 
                  src={productMetadata.image} 
                  alt="Product" 
                  className="h-15 w-15 object-cover rounded-lg mr-3"
                />
              )}
              <div>
                {productMetadata.brand && (
                  <div className="font-bold text-gray-900">{productMetadata.brand}</div>
                )}
                {productMetadata.product && (
                  <div className="text-sm text-gray-600">{productMetadata.product}</div>
                )}
              </div>
            </div>
          </div>
        )}

        {analysisResults.length > 0 ? (
          <AnalysisResults results={analysisResults} />
        ) : (
          <IngredientAnalyzer onAnalyze={processIngredients} />
        )}
      </div>
    </div>
  );
}

export default App;