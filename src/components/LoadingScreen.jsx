import { motion } from 'framer-motion'

export default function LoadingScreen({ message = "Loading Disney Magic..." }) {
  return (
    <div className="loading-screen">
      <motion.div
        className="loading-icon-container"
        animate={{ 
          y: [0, -15, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2,
          ease: "easeInOut"
        }}
      >
        <svg className="loading-icon" viewBox="0 0 512 512">
          <path className="castle-main" d="M256 32L32 160v288h448V160L256 32zm0 64l160 128v192H96V224L256 96z"/>
          <path className="castle-details" d="M256 96l-96 72v120h48V216l48-36 48 36v72h48V168l-48-72z"/>
        </svg>
      </motion.div>
      
      <motion.p 
        className="loading-message"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        {message}
      </motion.p>
      
      <div className="progress-container">
        <motion.div 
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
      </div>
      
      <motion.div 
        className="loading-subtext"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <svg className="magic-icon" viewBox="0 0 20 20">
          <path className="magic-path" fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
        </svg>
        Preparing something magical...
      </motion.div>
    </div>
  )
}