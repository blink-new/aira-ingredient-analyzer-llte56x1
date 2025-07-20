import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { UserPreferences } from '../App';

interface ProfilePageProps {
  userPreferences: UserPreferences;
  onPreferencesUpdate: (preferences: UserPreferences) => void;
  onBack: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ 
  userPreferences, 
  onPreferencesUpdate, 
  onBack 
}) => {
  const [displayName, setDisplayName] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [localPreferences, setLocalPreferences] = useState(userPreferences);

  const handleAddIngredient = () => {
    if (newIngredient.trim() && !localPreferences.watchlist?.includes(newIngredient.trim())) {
      const updatedPreferences = {
        ...localPreferences,
        watchlist: [...(localPreferences.watchlist || []), newIngredient.trim()]
      };
      setLocalPreferences(updatedPreferences);
      setNewIngredient('');
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    const updatedPreferences = {
      ...localPreferences,
      watchlist: localPreferences.watchlist?.filter(item => item !== ingredient) || []
    };
    setLocalPreferences(updatedPreferences);
  };

  const handleFlagToggle = (flagType: keyof NonNullable<UserPreferences['flagPreferences']>) => {
    const updatedPreferences = {
      ...localPreferences,
      flagPreferences: {
        ...localPreferences.flagPreferences,
        [flagType]: !localPreferences.flagPreferences?.[flagType]
      }
    };
    setLocalPreferences(updatedPreferences);
  };

  const handleSave = () => {
    onPreferencesUpdate(localPreferences);
    alert('Preferences saved successfully!');
  };

  const flagOptions = [
    { key: 'microplastics', label: 'Microplastics', description: 'Flag ingredients containing microplastics' },
    { key: 'comedogenic', label: 'Comedogenic', description: 'Flag pore-clogging ingredients' },
    { key: 'irritant', label: 'Irritant', description: 'Flag potentially irritating ingredients' },
    { key: 'endocrine', label: 'Endocrine Disruptor', description: 'Flag hormone-disrupting ingredients' },
    { key: 'euBanned', label: 'EU Banned/Restricted', description: 'Flag ingredients banned in the EU' },
    { key: 'cancer', label: 'Cancer Risk', description: 'Flag potentially carcinogenic ingredients' },
    { key: 'penetration', label: 'Penetration Enhancer', description: 'Flag absorption-enhancing ingredients' }
  ];

  return (
    <div style={{
      fontFamily: "'Kanit', sans-serif",
      margin: 0,
      padding: 0,
      width: '360px',
      background: 'linear-gradient(135deg, #f8fffe 0%, #132B38 100%)',
      color: '#333',
      minHeight: '500px'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        padding: '10px',
        borderBottom: '1px solid rgba(226, 103, 93, 0.1)',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button
          onClick={onBack}
          style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px'
          }}
        >
          <ArrowLeft size={20} />
        </button>
        <h1 style={{
          fontSize: '1.3rem',
          fontWeight: 500,
          color: '#132B38',
          margin: 0,
          letterSpacing: '-0.5px'
        }}>
          Profile
        </h1>
        <p style={{
          fontSize: '0.9rem',
          color: '#666',
          margin: '8px 0 0 0'
        }}>
          Customize your ingredient analysis preferences
        </p>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Personal Information */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(5px)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
        }}>
          <h2 style={{
            fontSize: '0.9rem',
            fontWeight: 500,
            color: '#333',
            margin: '0 0 12px 0'
          }}>
            Personal Information
          </h2>
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              fontSize: '0.8rem',
              color: '#555',
              marginBottom: '6px',
              display: 'block',
              fontWeight: 500
            }}>
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your name"
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontFamily: "'Kanit', sans-serif",
                background: 'rgba(255, 255, 255, 0.9)',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        {/* Watchlist */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(5px)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
        }}>
          <h2 style={{
            fontSize: '0.9rem',
            fontWeight: 500,
            color: '#333',
            margin: '0 0 12px 0'
          }}>
            Personal Watchlist
          </h2>
          <p style={{
            fontSize: '0.8rem',
            color: '#666',
            marginBottom: '12px'
          }}>
            Add ingredients you want to be specifically flagged in product analysis
          </p>
          
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <input
              type="text"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              placeholder="Enter ingredient name..."
              style={{
                flex: 1,
                padding: '10px 12px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontFamily: "'Kanit', sans-serif"
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleAddIngredient()}
            />
            <button
              onClick={handleAddIngredient}
              style={{
                padding: '10px 16px',
                background: '#132B38',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 500
              }}
            >
              Add
            </button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {localPreferences.watchlist?.map((ingredient, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(180, 183, 237, 0.1)',
                  color: '#132B38',
                  padding: '6px 12px',
                  borderRadius: '16px',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: '1px solid #132B38'
                }}
              >
                {ingredient}
                <span
                  onClick={() => handleRemoveIngredient(ingredient)}
                  style={{
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    opacity: 0.7,
                    marginLeft: '4px'
                  }}
                >
                  ×
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Flag Preferences */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(5px)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
        }}>
          <h2 style={{
            fontSize: '0.9rem',
            fontWeight: 500,
            color: '#333',
            margin: '0 0 12px 0'
          }}>
            Flag Preferences
          </h2>
          <p style={{
            fontSize: '0.8rem',
            color: '#666',
            marginBottom: '12px'
          }}>
            Choose which pre-built flags to show or ignore during analysis
          </p>

          {flagOptions.map((option) => (
            <div
              key={option.key}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 0',
                borderBottom: '1px solid rgba(229, 231, 235, 0.5)'
              }}
            >
              <div>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#333',
                  fontWeight: 500
                }}>
                  {option.label}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#666',
                  marginTop: '4px',
                  maxWidth: '75%'
                }}>
                  {option.description}
                </div>
              </div>
              
              <label style={{
                position: 'relative',
                display: 'inline-block',
                width: '50px',
                height: '26px'
              }}>
                <input
                  type="checkbox"
                  checked={localPreferences.flagPreferences?.[option.key as keyof NonNullable<UserPreferences['flagPreferences']>] || false}
                  onChange={() => handleFlagToggle(option.key as keyof NonNullable<UserPreferences['flagPreferences']>)}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: localPreferences.flagPreferences?.[option.key as keyof NonNullable<UserPreferences['flagPreferences']>] ? '#132B38' : '#ccc',
                  transition: '0.3s ease',
                  borderRadius: '25px',
                  boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'
                }}>
                  <span style={{
                    position: 'absolute',
                    content: '""',
                    height: '22px',
                    width: '22px',
                    left: '2px',
                    bottom: '2px',
                    backgroundColor: 'white',
                    transition: '0.3s ease',
                    borderRadius: '50%',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    transform: localPreferences.flagPreferences?.[option.key as keyof NonNullable<UserPreferences['flagPreferences']>] ? 'translateX(24px)' : 'translateX(0)'
                  }} />
                </span>
              </label>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginTop: '24px',
          paddingTop: '16px',
          borderTop: '1px solid rgba(229, 231, 235, 0.3)'
        }}>
          <button
            onClick={onBack}
            style={{
              flex: 1,
              padding: '6px 10px',
              background: 'white',
              color: '#132B38',
              borderRadius: '8px',
              border: '1px solid #132B38',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontFamily: "'Kanit', sans-serif",
              fontWeight: 500
            }}
          >
            ← Back to Analysis
          </button>
          <button
            onClick={handleSave}
            style={{
              flex: 1,
              padding: '6px 10px',
              background: '#132B38',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontFamily: "'Kanit', sans-serif",
              fontWeight: 500
            }}
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;