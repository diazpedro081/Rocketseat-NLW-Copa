import { createContext, ReactNode, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { api } from "../services/api"

WebBrowser.maybeCompleteAuthSession();
interface UserProps {
    name: string;
    avatarUrl: string;
}

export interface AuthContextDataProps {
    user: UserProps;
    isUserLoading: boolean;
    signIn: () => Promise<void>;
    setUser: ({ }: UserProps) => void; // add
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({} as UserProps);
    const [isUserLoading, setIsUserLoading] = useState(false);

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId:
            "459731115170-uajvh1srt0tvvbpln4p7ih7dtpfu9n4o.apps.googleusercontent.com",
        redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
        scopes: ["profile", "email"],
    });

    async function signIn() {
        try {
            setIsUserLoading(true);

            await promptAsync();
        } catch (error) {
            throw error;
        } finally {
            setIsUserLoading(false);
        }
    }

    async function signInWithGoogle(access_token: string) {
        try {
            setIsUserLoading(true)
            const tokenResponse = await api.post('/users', {
                access_token
            })
            api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}`

            const userInfoResponse = await api.get('/me')
            setUser(userInfoResponse.data.user)

            await AsyncStorage.setItem("@storage_key:token", tokenResponse.data.token);

        } catch (error) {
            console.log(error)
            throw error
        } finally {
            setIsUserLoading(false)
        }
        console.log("TOKEN DE AUTHENTICAÇÃO: ", access_token);
    }
    useEffect(() => {
        if (response?.type === "success" && response.authentication?.accessToken) {
            signInWithGoogle(response.authentication.accessToken);
        }
    }, [response]);
    return (
        <AuthContext.Provider
            value={{
                signIn,
                isUserLoading,
                user,
                setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}