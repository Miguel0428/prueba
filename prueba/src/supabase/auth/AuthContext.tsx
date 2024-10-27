import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {signIn} from "../usuario/ApiUsuario";

type User = {
    id: string;
    nombre: string;
    correo: string;
    role: 'user' | 'admin';
};

type AuthContextType = {
    user: User | null;
    customSignIn: (email: string, password: string) => Promise<User | null>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const customSignIn = async (email: string, password: string): Promise<User | null> => {
        const authenticatedUser = await signIn(email, password);
        console.log('authenticatedUser', authenticatedUser)
        if (authenticatedUser) {
            setUser(authenticatedUser);
            await AsyncStorage.setItem('user', JSON.stringify(authenticatedUser));
        }

        return authenticatedUser;
    };

    const signOut = async () => {
        setUser(null);
        await AsyncStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, customSignIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
