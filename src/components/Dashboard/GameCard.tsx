import { useNavigate } from 'react-router-dom';
import type { Game } from '../../types';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/game/${game.gameCode}`);
  };

  const handleLearnMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/game/${game.gameCode}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
    >
      {/* Game Image/Thumbnail */}
      <div className="relative w-full h-64 overflow-hidden bg-gray-800">
        {game.thumbnail ? (
          <img
            src={game.thumbnail}
            alt={game.displayName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              // Fallback if image fails to load
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <span className="text-white text-6xl font-bold">
              {game.displayName.charAt(0)}
            </span>
          </div>
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
          {game.displayName}
        </h3>
        
        {game.description && (
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {game.description}
          </p>
        )}

        {/* Learn More Button */}
        <button
          onClick={handleLearnMore}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium py-2.5 px-4 rounded transition-colors"
        >
          Learn more
        </button>
      </div>
    </div>
  );
}
