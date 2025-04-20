import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { motion } from 'framer-motion'

export default function CrewmateDetail() {
  const { id } = useParams()
  const [crewmate, setCrewmate] = useState(null)
  const [loading, setLoading] = useState(true)
  const [characterDetails, setCharacterDetails] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchCrewmate()
  }, [id])

  async function fetchCrewmate() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setCrewmate(data)
      
      if (data.character_id) {
        try {
          const response = await fetch(`https://api.disneyapi.dev/character/${data.character_id}`)
          const charData = await response.json()
          setCharacterDetails(charData.data)
        } catch (apiError) {
          console.error('Could not fetch character details:', apiError)
        }
      }
    } catch (error) {
      alert(error.message)
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (window.confirm('Are you sure you want to delete this crewmate?')) {
      try {
        const { error } = await supabase
          .from('crewmates')
          .delete()
          .eq('id', id)

        if (error) throw error
        navigate('/')
      } catch (error) {
        alert(error.message)
      }
    }
  }

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  )

  if (!crewmate) return <div className="not-found-message">Crewmate not found</div>

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="crewmate-detail-container"
    >
      <div className="detail-header">
        <h2>{crewmate.name}'s Profile</h2>
        <div className="detail-actions">
          <Link to={`/edit/${crewmate.id}`} className="btn-primary">
            Edit
          </Link>
          <button onClick={handleDelete} className="btn-danger">
            Delete
          </button>
        </div>
      </div>

      <div className="detail-card">
        <div className="detail-content">
          <div className="avatar-container">
            <div className="avatar-glow"></div>
            <img 
              src={crewmate.image_url} 
              alt={crewmate.name}
              className="crewmate-avatar"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = '/default-avatar.png'
              }}
            />
          </div>
          
          <div className="detail-info">
            <div className="crewmate-meta">
              <h3>{crewmate.name}</h3>
              {crewmate.attribute && (
                <span className="attribute-tag">{crewmate.attribute}</span>
              )}
              <p className="description">{crewmate.description}</p>
            </div>
            
            <div className="disney-info">
              <h4>Character Biography</h4>
              {characterDetails ? (
                <div className="disney-details">
                  <div className="detail-section">
                    <p><span>Full Name:</span> {characterDetails.name}</p>
                    {characterDetails.alignment && (
                      <p><span>Alignment:</span> {characterDetails.alignment}</p>
                    )}
                    {characterDetails.allies?.length > 0 && (
                      <p><span>Allies:</span> {characterDetails.allies.join(', ')}</p>
                    )}
                    {characterDetails.enemies?.length > 0 && (
                      <p><span>Enemies:</span> {characterDetails.enemies.join(', ')}</p>
                    )}
                  </div>

                  <div className="detail-section">
                    {characterDetails.films?.length > 0 && (
                      <p><span>Film Appearances:</span> {characterDetails.films.join(', ')}</p>
                    )}
                    {characterDetails.tvShows?.length > 0 && (
                      <p><span>TV Appearances:</span> {characterDetails.tvShows.join(', ')}</p>
                    )}
                    {characterDetails.videoGames?.length > 0 && (
                      <p><span>Video Games:</span> {characterDetails.videoGames.join(', ')}</p>
                    )}
                  </div>

                  <div className="detail-section">
                    {characterDetails.parkAttractions?.length > 0 && (
                      <p><span>Park Attractions:</span> {characterDetails.parkAttractions.join(', ')}</p>
                    )}
                    {characterDetails.shortFilms?.length > 0 && (
                      <p><span>Short Films:</span> {characterDetails.shortFilms.join(', ')}</p>
                    )}
                    {characterDetails.createdAt && (
                      <p><span>First Appearance:</span> {new Date(characterDetails.createdAt).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>
              ) : (
                <p className="no-info">No additional character information available</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="card-footer">
          <Link to="/" className="back-link">
            ← Back to Crewmate Roster
          </Link>
        </div>
      </div>
    </motion.div>
  )
}