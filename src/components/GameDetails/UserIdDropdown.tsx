import { useState } from 'react';

interface UserCredentials {
  userId: string;
  agentId: string;
  cert: string;
}

interface UserIdDropdownProps {
  availableUsers: Array<UserCredentials>;
  selectedUserId: string;
  onUserIdChange: (userId: string) => void;
  disabled?: boolean;
}

export default function UserIdDropdown({
  availableUsers,
  selectedUserId,
  onUserIdChange,
  disabled = false,
}: UserIdDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (availableUsers.length <= 1) {
    // Don't show dropdown if there's only one or no users
    return null;
  }

  const selectedUser = availableUsers.find((u) => u.userId === selectedUserId);

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Select User ID
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 text-left focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between"
        >
          <span className="truncate">
            {selectedUser?.userId || selectedUserId}
          </span>
          <svg
            className={`ml-2 h-5 w-5 transition-transform ${
              isOpen ? 'transform rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && !disabled && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute z-20 mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
              {availableUsers.map((user) => (
                <button
                  key={user.userId}
                  type="button"
                  onClick={() => {
                    onUserIdChange(user.userId);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors ${
                    user.userId === selectedUserId
                      ? 'bg-gray-700 text-yellow-500'
                      : 'text-white'
                  }`}
                >
                  {user.userId}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
