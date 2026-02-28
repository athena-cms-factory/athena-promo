import { useState } from 'react';
import type { Jet } from '../data/jets';

interface JetCardProps {
  jet: Jet;
}

const JetCard = ({ jet }: JetCardProps) => {
  const [imageError, setImageError] = useState(false);

  const imageUrl = jet.imageUrl;

  return (
    <div className={`jet-card ${jet.origin.toLowerCase()}`}>
      <div className="jet-image-container">
        {!imageError ? (
          <img 
            src={imageUrl} 
            alt={jet.fullName} 
            loading="lazy" 
            onError={() => {
              console.error(`Failed to load image: ${jet.name} (${imageUrl})`);
              setImageError(true);
            }}
          />
        ) : (
          <div className="image-placeholder">
            <span>{jet.name.substring(0, 2).toUpperCase()}</span>
          </div>
        )}
        <div className="jet-year-badge">{jet.introductionYear}</div>
      </div>
      <div className="jet-content">
        <div className="jet-header">
          <span className={`origin-tag ${jet.origin.toLowerCase()}`}>
            {jet.origin === 'US' ? '🇺🇸 USA' : '🇪🇺 Europe'}
          </span>
          <h3>{jet.name}</h3>
        </div>
        <p className="full-name">{jet.fullName}</p>
        <p className="manufacturer">Fabrikant: {jet.manufacturer}</p>
        <p className="description">{jet.description}</p>
      </div>
    </div>
  );
};

export default JetCard;
