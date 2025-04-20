import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { motion } from 'framer-motion';

const CATEGORIES = {
  pirate: ['Bravery', 'Navigation', 'Combat', 'Loyalty'],
  princess: ['Kindness', 'Wisdom', 'Magic', 'Leadership'],
  villain: ['Cunning', 'Power', 'Stealth', 'Ambition'],
  comedian: ['Fun', 'Intelligence', 'Creativity', 'Boldness']
};

export default function EditCrewmate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    attribute: '',
    category: '',
    image_url: ''
  });
  const [loading, setLoading] = useState(true);
  const [availableAttributes, setAvailableAttributes] = useState([]);

  useEffect(() => {
    const fetchCrewmate = async () => {
      try {
        const { data, error } = await supabase
          .from('crewmates')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        
        setFormData(data);
        setAvailableAttributes(CATEGORIES[data.category] || []);
      } catch (error) {
        alert(error.message);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchCrewmate();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('crewmates')
        .update({
          ...formData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      navigate(`/crewmate/${id}`);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this crewmate?')) {
      try {
        const { error } = await supabase
          .from('crewmates')
          .delete()
          .eq('id', id);

        if (error) throw error;
        navigate('/');
      } catch (error) {
        alert(error.message);
      }
    }
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="edit-container"
    >
      <h2 className="edit-heading">Edit Crewmate</h2>
      
      <form onSubmit={handleSubmit} className="edit-form">
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
            onClick={handleDelete}
            className="btn-danger"
          >
            Delete Crewmate
          </button>
          <div className="action-buttons">
            <button
              type="button"
              onClick={() => navigate(`/crewmate/${id}`)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}