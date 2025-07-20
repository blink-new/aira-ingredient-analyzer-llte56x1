import React from 'react';
import { IngredientResult } from '../App';

interface AnalysisResultsProps {
  results: IngredientResult[];
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ results }) => {
  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, txt =>
      txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
    );
  };

  const getFlagColor = (flag: string) => {
    if (flag.includes('⭐')) return '#132B38';
    return '#dc2626';
  };

  return (
    <div id="ingredients">
      {results.map((result, index) => (
        <div key={index} className="ingredient-block">
          <strong>{toTitleCase(result.name)}</strong>
          <br />
          <em>{result.description}</em>
          <br />
          
          {result.flags && result.flags.length > 0 && (
            <div className="flags">
              {result.flags.map((flag, flagIndex) => (
                <span
                  key={flagIndex}
                  className="flag-icon"
                  style={{
                    backgroundColor: getFlagColor(flag),
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: '10px',
                    fontSize: '0.7em',
                    marginRight: '4px',
                    display: 'inline-block',
                    marginBottom: '2px'
                  }}
                  title={flag}
                >
                  {flag}
                </span>
              ))}
            </div>
          )}
          
          <br />
          <small style={{ fontSize: '0.75em', color: 'gray' }}>
            <a
              href={`mailto:support@aira.com?subject=Ingredient Submission Request&body=Please review the following ingredient: ${encodeURIComponent(result.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'gray', textDecoration: 'underline' }}
            >
              Submit for Review
            </a>
          </small>
        </div>
      ))}
    </div>
  );
};

export default AnalysisResults;