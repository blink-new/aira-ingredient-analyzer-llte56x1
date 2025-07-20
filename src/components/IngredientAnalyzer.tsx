import React, { useState } from 'react';

interface IngredientAnalyzerProps {
  onAnalyze: (ingredients: string[]) => void;
}

const IngredientAnalyzer: React.FC<IngredientAnalyzerProps> = ({ onAnalyze }) => {
  const [ingredientText, setIngredientText] = useState('');

  const handleAnalyze = () => {
    const rawInput = ingredientText.trim();
    if (!rawInput) {
      alert('Please enter one or more ingredients.');
      return;
    }

    // Clean and parse ingredients
    const cleanLines = rawInput
      .split(/\n+/)
      .filter(line => !line.includes(':') && !line.trim().startsWith('-'));
    
    const ingredients = cleanLines
      .join(' ')
      .split(/[;,•.]+/)
      .map(s => s.trim())
      .filter((value, index, self) => value && self.indexOf(value) === index);

    if (ingredients.length === 0) {
      alert('No valid ingredients detected.');
      return;
    }

    onAnalyze(ingredients);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIngredientText(e.target.value);
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <div className="manual-input-container">
      <label htmlFor="manual-ingredients">Enter Ingredient List:</label>
      <textarea
        id="manual-ingredients"
        value={ingredientText}
        onChange={handleTextareaChange}
        placeholder="Enter ingredients separated by commas, semicolons, or line breaks..."
        style={{ minHeight: '40px' }}
      />
      <button onClick={handleAnalyze}>
        Analyze
      </button>
    </div>
  );
};

export default IngredientAnalyzer;