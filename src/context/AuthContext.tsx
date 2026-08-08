import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import { DEMO_ACCOUNTS } from '../config/constants';
import { supabase, isSupabaseConfigured } from '../config/supabase';
import { safeStorage } from '../lib/storage';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginAsDemo: (role: UserRole) => void;
  loginWithEmail: (email: string, role: UserRole) => Promise<boolean>;
  loginWithCredentials: (identifier: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  switchRole: (newRole: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = safeStorage.getItem('ge_active_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.warn('Error parsing saved auth user:', err);
      }
    }
    // Return null so unauthenticated users land on LoginScreen first
    return null;
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      safeStorage.setItem('ge_active_user', JSON.stringify(user));
    } else {
      safeStorage.removeItem('ge_active_user');
    }
  }, [user]);

  const loginAsDemo = (targetRole: UserRole) => {
    setIsLoading(true);
    const account = DEMO_ACCOUNTS.find((a) => a.role === targetRole) || DEMO_ACCOUNTS[0];
    const newUser: UserProfile = {
      id: `usr-${targetRole}-${Date.now()}`,
      email: account.email,
      name: account.name,
      role: targetRole,
      class_name: (account as any).class_name || 'Grade 10-A',
      student_id: (account as any).student_id || 'st-1',
      designation: (account as any).designation || '',
      avatar_url: account.avatar_url,
      created_at: new Date().toISOString(),
    };
    setTimeout(() => {
      setUser(newUser);
      setIsLoading(false);
    }, 200);
  };

  const loginWithEmail = async (email: string, targetRole: UserRole): Promise<boolean> => {
    setIsLoading(true);
    if (isSupabaseConfigured && supabase) {
      try {
        // Attempt Supabase lookup if configured
        const { data } = await supabase.from('profiles').select('*').eq('email', email).single();
        if (data) {
          setUser(data as any);
          setIsLoading(false);
          return true;
        }
      } catch (err) {
        console.warn('Supabase profile query failed, using local auth:', err);
      }
    }

    // Local authentication fallback
    const matchedDemo = DEMO_ACCOUNTS.find((a) => a.email.toLowerCase() === email.toLowerCase());
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      email,
      name: matchedDemo ? matchedDemo.name : email.split('@')[0].toUpperCase(),
      role: matchedDemo ? matchedDemo.role : targetRole,
      class_name: 'Grade 10-A',
      student_id: 'st-1',
      avatar_url: matchedDemo?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      created_at: new Date().toISOString(),
    };
    setUser(newUser);
    setIsLoading(false);
    return true;
  };

  const loginWithCredentials = async (identifier: string, _password: string, targetRole: UserRole): Promise<boolean> => {
    setIsLoading(true);
    if (!identifier) {
      setIsLoading(false);
      return false;
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .or(`email.eq.${identifier},student_id.eq.${identifier}`)
          .single();
        if (data) {
          setUser(data as any);
          setIsLoading(false);
          return true;
        }
      } catch (err) {
        console.warn('Supabase credential lookup fallback:', err);
      }
    }

    // Local authentication fallback matching DEMO_ACCOUNTS or creating custom profile
    const matchedDemo = DEMO_ACCOUNTS.find(
      (a) =>
        a.role === targetRole ||
        a.email.toLowerCase() === identifier.toLowerCase() ||
        (a as any).student_id?.toLowerCase() === identifier.toLowerCase()
    );

    const isEmail = identifier.includes('@');
    const newUser: UserProfile = {
      id: `usr-${targetRole}-${Date.now()}`,
      email: isEmail ? identifier : (matchedDemo?.email || `${identifier.toLowerCase().replace(/\s+/g, '')}@gothwad.edu`),
      name: matchedDemo ? matchedDemo.name : `${targetRole.toUpperCase()} User (${identifier})`,
      role: targetRole,
      class_name: (matchedDemo as any)?.class_name || 'Grade 10-A',
      student_id: (matchedDemo as any)?.student_id || (identifier.startsWith('GE') ? identifier : `GE-2026-${identifier}`),
      designation: (matchedDemo as any)?.designation || (targetRole === 'admin' ? 'Administrator' : targetRole === 'teacher' ? 'Faculty Member' : 'Student'),
      avatar_url: matchedDemo?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      created_at: new Date().toISOString(),
    };

    setUser(newUser);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (newRole: UserRole) => {
    loginAsDemo(newRole);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'admin',
        isAuthenticated: !!user,
        isLoading,
        loginAsDemo,
        loginWithEmail,
        loginWithCredentials,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};
