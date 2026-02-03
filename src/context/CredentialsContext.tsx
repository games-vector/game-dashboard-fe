import { createContext, useContext, useState, ReactNode } from 'react';

interface Credentials {
  userId: string;
  agentId: string;
  cert: string;
}

interface CredentialsContextType {
  credentials: Credentials | null;
  setCredentials: (creds: Credentials) => void;
}

const CredentialsContext = createContext<CredentialsContextType | undefined>(undefined);

export function CredentialsProvider({ children }: { children: ReactNode }) {
  const [credentials, setCredentials] = useState<Credentials | null>(null);

  return (
    <CredentialsContext.Provider value={{ credentials, setCredentials }}>
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
