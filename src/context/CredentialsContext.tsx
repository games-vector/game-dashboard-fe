import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

interface Credentials {
  userId: string;
  agentId: string;
  cert: string;
}

interface CredentialsContextType {
  credentials: Credentials | null;
  availableUsers: Array<Credentials>;
  setCredentials: (creds: Credentials, availableUsers?: Array<Credentials>) => void;
}

const CredentialsContext = createContext<CredentialsContextType | undefined>(undefined);

export function CredentialsProvider({ children }: { children: ReactNode }) {
  const [credentials, setCredentialsState] = useState<Credentials | null>(null);
  const [availableUsers, setAvailableUsers] = useState<Array<Credentials>>([]);

  const setCredentials = useCallback((creds: Credentials, availableUsersList?: Array<Credentials>) => {
    setCredentialsState(creds);
    if (availableUsersList) {
      setAvailableUsers(availableUsersList);
    }
  }, []);

  return (
    <CredentialsContext.Provider value={{ credentials, availableUsers, setCredentials }}>
      {children}
    </CredentialsContext.Provider>
  );
}

export function useCredentials() {
  const context = useContext(CredentialsContext);
  if (context === undefined) {
    throw new Error('useCredentials must be used within a CredentialsProvider');
  }
  return context;
}
