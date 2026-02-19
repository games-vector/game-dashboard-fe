import { useEffect, useState, useMemo } from 'react';
import { apiService } from '../../services/api.service';
import type { Game } from '../../types';
import GameCard from './GameCard';
import { useCredentials } from '../../context/CredentialsContext';

export default function GameGrid() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
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

  // Filter games based on search query
  const filteredGames = useMemo(() => {
    if (!searchQuery.trim()) {
      return games;
    }
    
    const query = searchQuery.toLowerCase().trim();
    return games.filter((game) => {
      const matchesName = game.gameName?.toLowerCase().includes(query);
      const matchesDisplayName = game.displayName?.toLowerCase().includes(query);
      const matchesDescription = game.description?.toLowerCase().includes(query);
      return matchesName || matchesDisplayName || matchesDescription;
    });
  }, [games, searchQuery]);

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
    <div className="h-screen bg-gray-950 flex flex-col overflow-hidden">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-black border-b border-gray-800 flex-shrink-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="text-2xl font-bold">
              <span className="text-white">IN</span>
              <span className="text-yellow-500">OUT</span>
            </div>
            {/* Search Bar */}
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Scrollable Main Content */}
      <main className="flex-1 overflow-y-auto container mx-auto px-4 py-12">
        {filteredGames.length === 0 && searchQuery ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No games found matching "{searchQuery}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
              <GameCard key={game.gameCode} game={game} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
