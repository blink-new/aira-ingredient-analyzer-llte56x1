import React, { useState } from 'react';
import { Search, Camera, Settings } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
  onCameraUpload: () => void;
  onProfileClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onCameraUpload, onProfileClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <header className="sticky-header">
      <div className="header-left">aira</div>
      
      <div className="header-center">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
          />
          <button type="submit" style={{ display: 'none' }}>
            <Search size={16} />
          </button>
        </form>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onCameraUpload}
          className="bg-none border-none text-xl cursor-pointer p-1"
          title="Upload Ingredient Image"
        >
          <Camera size={22} />
        </button>
        
        <button
          onClick={onProfileClick}
          className="cursor-pointer p-1"
          title="Profile & Settings"
        >
          <Settings size={25} className="text-gray-600" />
        </button>
      </div>
    </header>
  );
};

export default Header;