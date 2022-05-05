import { createContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../components/configuration/firebase';
import { UserData } from '../types';

export const AuthContext = createContext<{ user: FirebaseUser | null; userData: UserData | null }>({
  user: null,
  userData: null,
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  const value = useMemo(() => ({ user, userData }), [user, userData]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const q = query(collection(db, 'users'), where('uid', '==', user?.uid || ''));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs: UserData[] = [];
      querySnapshot.forEach((doc) => {
        docs.push(doc.data() as unknown as UserData);
      });
      setUserData(docs[0]);
    });
    return () => unsubscribe();
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
