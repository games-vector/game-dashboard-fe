import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api.service';
import type { Game, LoginAndLaunchGameResponse } from '../../types';
import PlayDemoButton from './PlayDemoButton';
import ShareButton from './ShareButton';
import { useCredentials } from '../../context/CredentialsContext';

export default function GameDetailsPage() {
  const { gameCode } = useParams<{ gameCode: string }>();
  const navigate = useNavigate();
  const { credentials } = useCredentials();
  const [game, setGame] = useState<Game | null>(null);
  const [gameUrl, setGameUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [launching, setLaunching] = useState(false);

  useEffect(() => {
    const fetchGameAndLaunch = async () => {
      if (!gameCode) {
        setError('Game code is required');
        setLoading(false);
        return;
      }

      if (!credentials) {
        setError('Credentials not available. Please go back to dashboard.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // First, get game details
        const gamesResponse = await apiService.getDashboardGames();
        const foundGame = gamesResponse.games.find(
          (g) => g.gameCode === gameCode
        );

        if (!foundGame) {
          setError('Game not found');
          setLoading(false);
          return;
        }

        setGame(foundGame);

        // Then, call doLoginAndLaunchGame with credentials
        setLaunching(true);
        const launchResponse: LoginAndLaunchGameResponse =
          await apiService.loginAndLaunchGame({
            cert: credentials.cert,
            agentId: credentials.agentId,
            userId: credentials.userId,
            platform: foundGame.platform,
            gameType: foundGame.gameType,
            gameCode: foundGame.gameCode,
          });

        if (launchResponse.status === '0000' && launchResponse.url) {
          setGameUrl(launchResponse.url);
        } else {
          setError(launchResponse.desc || 'Failed to launch game');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load game');
        console.error('Error loading game:', err);
      } finally {
        setLoading(false);
        setLaunching(false);
      }
    };

    fetchGameAndLaunch();
  }, [gameCode, credentials]);

  if (loading || launching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            {launching ? 'Launching game...' : 'Loading game details...'}
          </p>
        </div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">
            {error || 'Game not found'}
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const demoGifUrl = game.demoGif || null;

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-black border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="text-2xl font-bold hover:opacity-80 transition-opacity"
            >
              <span className="text-white">IN</span>
              <span className="text-yellow-500">OUT</span>
            </button>
            <nav className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">About us</a>
              <a href="#" className="text-yellow-500 font-medium">Our Games</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">News</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Game Info */}
          <div>
            <h1 className="text-5xl font-bold text-white mb-6">{game.displayName}</h1>
            
            {/* Action Buttons */}
            {gameUrl && (
              <div className="flex gap-4 mb-6">
                <PlayDemoButton gameUrl={gameUrl} />
                <ShareButton gameUrl={gameUrl} />
              </div>
            )}

            {/* Description */}
            {game.description && (
              <div className="mb-6">
                <p className="text-gray-300 leading-relaxed text-lg">
                  {game.description}
                </p>
              </div>
            )}

            {/* Extended Description */}
            <div className="text-gray-400 space-y-4">
              <p>
                {game.displayName} taps into a familiar world where every move feels rewarding. Clear visuals, a recognizable atmosphere, and a steady sense of progress create an experience that's easy to understand and satisfying to explore.
              </p>
              <p>
                Step by step, players uncover bonuses, build momentum, and stay engaged through a rhythm that feels intuitive and nostalgic. The gameplay focuses on simplicity and flow, keeping attention on the process rather than complexity.
              </p>
              <p>
                {game.displayName} is designed to feel comfortable from the first click - and compelling enough to keep players coming back for more.
              </p>
            </div>
          </div>

          {/* Right Side - Game Display */}
          <div>
            {/* Main Game Display - Demo GIF */}
            {demoGifUrl && (
              <div className="bg-gray-900 rounded-lg overflow-hidden mb-4">
                <img
                  src={demoGifUrl}
                  alt={`${game.displayName} demo`}
                  className="w-full h-auto"
                  onError={(e) => {
                    // Fallback if GIF fails to load
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}

            {/* Game Images */}
            {game.images && game.images.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {game.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${game.displayName} image ${index + 1}`}
                    className="w-full h-32 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                    onError={(e) => {
                      // Hide broken images
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
