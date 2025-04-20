import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { motion } from 'framer-motion';

export default function CrewmatesList() {
  const [crewmates, setCrewmates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchCrewmates = async () => {
      try {
        const { data, error } = await supabase
          .from('crewmates')
          .select('*')
          .order('created_at', { ascending: false });

        if (!isMounted) return;
        
        if (error) throw error;
        setCrewmates(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCrewmates();
    return () => { isMounted = false; };
  }, []);

  const calculateStats = () => {
    const stats = { total: crewmates.length };
    crewmates.forEach(crewmate => {
      stats[crewmate.attribute] = (stats[crewmate.attribute] || 0) + 1;
    });
    return stats;
  };

  const calculateSuccess = () => {
    const balancedAttributes = crewmates.filter(c => 
      c.category === 'pirate' ? c.attribute === 'Navigation' :
      c.category === 'princess' ? c.attribute === 'Wisdom' :
      c.attribute === 'Power'
    ).length;
    
    return crewmates.length > 0 
      ? Math.min((balancedAttributes / crewmates.length) * 100, 100)
      : 0;
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <h3>Error loading crewmates:</h3>
      <p>{error}</p>
      <button onClick={() => window.location.reload()} className="btn-primary">
        Try Again
      </button>
    </div>
  );

  return (
    <div className="crewmates-container">
      <div className="crew-header">
        <h1>My Crew</h1>
        <Link to="/create" className="btn-primary">
          Add New Crewmate
        </Link>
      </div>

      <div className="stats-container">
        <h3>Crew Statistics</h3>
        {Object.entries(calculateStats()).map(([key, value]) => (
          key !== 'total' && (
            <div key={key} className="stat-item">
              <span className="stat-label">{key}:</span>
              <div className="stat-bar">
                <div 
                  className="stat-fill"
                  style={{ width: `${(value / calculateStats().total) * 100}%` }}
                ></div>
              </div>
              <span className="stat-value">{(value / calculateStats().total * 100).toFixed(1)}%</span>
            </div>
          )
        ))}
      </div>

      <div className="success-metric">
        <h3>Mission Success Probability</h3>
        <div className="success-bar">
          <div 
            className="success-fill"
            style={{ width: `${calculateSuccess()}%` }}
          >
            {calculateSuccess().toFixed(0)}%
          </div>
        </div>
      </div>

      {crewmates.length === 0 ? (
        <div className="empty-state">
          <p>No crewmates found. Start by adding one!</p>
        </div>
      ) : (
        <div className="grid-container">
          {crewmates.map((crewmate, index) => (
            <motion.div
              key={crewmate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="crew-card"
            >
              <Link to={`/crewmate/${crewmate.id}`} className="crew-link">
                <div className="crew-content">
                  <div className="crew-avatar">
                    {crewmate.image_url ? (
                      <img 
                        src={crewmate.image_url} 
                        alt={crewmate.name}
                        className="avatar-image"
                      />
                    ) : (
                      <div className="avatar-placeholder">?</div>
                    )}
                  </div>
                  <div className="crew-info">
                    <h3>{crewmate.name}</h3>
                    <p className="crew-category">{crewmate.category}</p>
                    <span className="crew-attribute">{crewmate.attribute}</span>
                    <p className="crew-description">{crewmate.description || 'No description'}</p>
                  </div>
                </div>
              </Link>
              <div className="card-footer">
                <Link to={`/edit/${crewmate.id}`} className="edit-link">
                  Edit
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}