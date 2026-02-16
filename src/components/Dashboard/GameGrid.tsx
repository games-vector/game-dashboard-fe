import { useEffect, useState } from 'react';
import { apiService } from '../../services/api.service';
import type { Game } from '../../types';
import GameCard from './GameCard';
import { useCredentials } from '../../context/CredentialsContext';

export default function GameGrid() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setCredentials } = useCredentials();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const response = await apiService.getDashboardGames();
        setGames(response.games);
        
        // Store credentials in context along with available users
        const usersList = response.availableUsers && Array.isArray(response.availableUsers) && response.availableUsers.length > 0
          ? response.availableUsers
          : [
              {
                userId: response.userId,
                agentId: response.agentId,
                cert: response.cert,
              },
            ];
        
        setCredentials(
          {
            userId: response.userId,
            agentId: response.agentId,
            cert: response.cert,
          },
          usersList
        );
        
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to load games');
        console.error('Error fetching games:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading games...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 dark:text-gray-400">No games available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-black border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              <span className="text-white">IN</span>
              <span className="text-yellow-500">OUT</span>
            </div>
            <nav className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">About us</a>
              <a href="#" className="text-yellow-500 font-medium">Our Games</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">News</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">All Games</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game) => (
            <GameCard key={game.gameCode} game={game} />
          ))}
        </div>
      </main>
    </div>
  );
}
