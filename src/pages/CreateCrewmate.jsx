import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { motion } from 'framer-motion';

const CATEGORIES = {
  pirate: ['Bravery', 'Navigation', 'Combat', 'Loyalty'],
  princess: ['Kindness', 'Wisdom', 'Magic', 'Leadership'],
  villain: ['Cunning', 'Power', 'Stealth', 'Ambition'],
  comedian: ['Fun', 'Intelligence', 'Creativity', 'Boldness']
};

export default function CreateCrewmate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    attribute: '',
    category: '',
    image_url: '',
    character_id: '' // <-- Add this
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [availableAttributes, setAvailableAttributes] = useState([]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(`https://api.disneyapi.dev/character?name=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      setSearchResults(data.data || []);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('crewmates')
        .insert([{
          ...formData,
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;
      navigate('/');
    } catch (error) {
      console.error('Creation failed:', error);
    }
  };

  return (
    <div className="create-container">
      <h2 className="create-heading">Add New Crewmate</h2>
      
      <div className="search-section">
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Disney characters..."
            className="search-input"
          />
          <button
            type="button"
            onClick={handleSearch}
            disabled={loading}
            className="search-button"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      {searchResults.length > 0 && (
        <div className="search-results-grid">
          {searchResults.map(character => (
            <button
              key={character._id}
              type="button"
              onClick={() => setFormData({
                ...formData,
                name: character.name,
                image_url: character.imageUrl || '',
                character_id: character._id // <-- Add this
              })}
              className={`result-button ${formData.name === character.name ? 'selected-result' : ''}`}
            >
              <div className="character-preview">
                {character.imageUrl ? (
                  <img
                    src={character.imageUrl}
                    alt={character.name}
                    className="character-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/default-avatar.png'; // or any local fallback image
                    }}
                  />
                ) : (
                  <div className="image-placeholder">
                    <span>?</span>
                  </div>
                )}
                <span className="character-name">{character.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="creation-form">
        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            value={formData.category}
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value, attribute: '' });
              setAvailableAttributes(CATEGORIES[e.target.value] || []);
            }}
            className="form-input"
            required
          >
            <option value="">Select Category</option>
            {Object.keys(CATEGORIES).map(cat => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="form-textarea"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Attribute</label>
          <div className="attribute-grid">
            {availableAttributes.map(attr => (
              <button
                type="button"
                key={attr}
                onClick={() => setFormData({ ...formData, attribute: attr })}
                className={`attribute-btn ${formData.attribute === attr ? 'selected' : ''}`}
              >
                {attr}
              </button>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            Create Crewmate
          </button>
        </div>
      </form>
    </div>
  );
}