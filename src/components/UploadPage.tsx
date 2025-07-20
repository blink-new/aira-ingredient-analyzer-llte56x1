import React, { useState, useRef } from 'react';
import { ArrowLeft, Camera, Upload } from 'lucide-react';
import { ProductMetadata } from '../App';

interface UploadPageProps {
  onImageAnalysis: (extractedText: string, metadata: ProductMetadata) => void;
  onBack: () => void;
}

const UploadPage: React.FC<UploadPageProps> = ({ onImageAnalysis, onBack }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.currentTarget.classList.add('dragover');
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    event.currentTarget.classList.remove('dragover');
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.currentTarget.classList.remove('dragover');
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const simulateOCR = async (): Promise<string> => {
    // Simulate OCR processing with mock ingredient text
    const mockIngredientTexts = [
      "Water, Sodium Lauryl Sulfate, Cocamidopropyl Betaine, Glycerin, Sodium Chloride, Polyethylene, Parabens, Fragrance, Citric Acid",
      "Aqua, Glycerin, Cetyl Alcohol, Stearyl Alcohol, Coconut Oil, Dimethicone, Phenoxyethanol, Tocopherol, Retinol, Hyaluronic Acid",
      "Water, Cyclopentasiloxane, Dimethicone, Glycerin, Titanium Dioxide, Iron Oxides, Talc, Mica, Formaldehyde, Benzyl Alcohol"
    ];
    
    return mockIngredientTexts[Math.floor(Math.random() * mockIngredientTexts.length)];
  };

  const handleAnalyzeImage = async () => {
    if (!selectedImage) return;

    setIsProcessing(true);
    setProgress(0);

    // Simulate processing steps
    const steps = [
      { message: 'Uploading image...', duration: 1000 },
      { message: 'Extracting text...', duration: 2000 },
      { message: 'Analyzing ingredients...', duration: 1500 },
      { message: 'Generating results...', duration: 500 }
    ];

    for (let i = 0; i < steps.length; i++) {
      setProgress((i / steps.length) * 100);
      await new Promise(resolve => setTimeout(resolve, steps[i].duration));
    }

    setProgress(100);

    // Simulate OCR extraction
    const extractedText = await simulateOCR();
    
    // Create mock metadata for uploaded image
    const metadata: ProductMetadata = {
      brand: "Unknown Brand",
      product: "Uploaded Product",
      image: selectedImage,
      url: "uploaded://local-image"
    };

    // Call the analysis callback
    onImageAnalysis(extractedText, metadata);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setIsProcessing(false);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '2rem auto',
      padding: '2rem',
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      position: 'relative'
    }}>
      <button
        onClick={onBack}
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          background: 'none',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          color: '#666',
          padding: '0.5rem',
          borderRadius: '50%'
        }}
        title="Back to Main"
      >
        <ArrowLeft size={24} />
      </button>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{
          margin: 0,
          color: '#132B38',
          fontSize: '1.8rem'
        }}>
          Upload Ingredient List
        </h1>
        <p style={{
          color: '#666',
          margin: '0.5rem 0 0'
        }}>
          Take a photo or upload an image of your product's ingredient list
        </p>
      </div>

      {!selectedImage && (
        <div
          style={{
            border: '2px dashed #ccc',
            borderRadius: '8px',
            padding: '2rem',
            textAlign: 'center',
            marginBottom: '1rem',
            transition: 'border-color 0.3s',
            cursor: 'pointer'
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            opacity: 0.5
          }}>
            <Camera size={48} />
          </div>
          <div style={{
            marginBottom: '1rem',
            color: '#666'
          }}>
            <p>Drag and drop an image here, or click to select</p>
          </div>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
            <button style={{
              background: '#132B38',
              color: 'white',
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              margin: '0 auto'
            }}>
              <Upload size={16} />
              Choose Image
            </button>
          </div>
        </div>
      )}

      {selectedImage && (
        <div style={{
          marginTop: '1rem',
          textAlign: 'center'
        }}>
          <img
            src={selectedImage}
            alt="Preview"
            style={{
              maxWidth: '100%',
              maxHeight: '300px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              marginBottom: '1rem'
            }}
          />
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '1rem'
          }}>
            <button
              onClick={handleAnalyzeImage}
              disabled={isProcessing}
              style={{
                flex: 1,
                padding: '0.75rem',
                border: 'none',
                borderRadius: '6px',
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                fontSize: '1rem',
                background: '#132B38',
                color: 'white',
                opacity: isProcessing ? 0.5 : 1
              }}
            >
              {isProcessing ? 'Processing...' : 'Analyze Ingredients'}
            </button>
            <button
              onClick={handleRemoveImage}
              disabled={isProcessing}
              style={{
                flex: 1,
                padding: '0.75rem',
                border: 'none',
                borderRadius: '6px',
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                fontSize: '1rem',
                background: '#6b7280',
                color: 'white',
                opacity: isProcessing ? 0.5 : 1
              }}
            >
              Remove Image
            </button>
          </div>
        </div>
      )}

      {isProcessing && (
        <div style={{
          marginTop: '1rem',
          textAlign: 'center'
        }}>
          <div style={{
            width: '100%',
            height: '8px',
            background: '#eee',
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '0.5rem'
          }}>
            <div style={{
              height: '100%',
              background: '#132B38',
              width: `${progress}%`,
              transition: 'width 0.3s ease'
            }} />
          </div>
          <div style={{
            fontSize: '0.9rem',
            color: '#666'
          }}>
            Extracting ingredients... {Math.round(progress)}%
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPage;