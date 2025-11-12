import React, { createContext, useContext, useState } from 'react';

export type User = {
  id: string;
  name: string;
  email: string;
};

type UserContextValue = {
  user: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = (u: User) => setUser(u);
  const signOut = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}