import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './screens/SignInScreen';
import SuccessScreen from './screens/success';
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from 'expo-web-browser';
import { auth } from "../firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCredential,
    signOut,
} from "firebase/auth";
import { ActivityIndicator, View } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const Stack = createStackNavigator();

export default function App() {
    const [userInfo, setUserInfo] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: "971580877402-8pt7hmdq00fffs302ptas2drth46qcco.apps.googleusercontent.com"
    });

    const checkLocalUser = async () => {
        setLoading(true);
        try {
            const userJSON = await AsyncStorage.getItem("@user");
            const userData = userJSON ? JSON.parse(userJSON) : null;
            console.log("Local Storage", userData);
            setUserInfo(userData);
        } catch (e:any) {
            alert(e.message);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if (response?.type === "success") {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential);
        }
    }, [response]);

    React.useEffect(() => {
        checkLocalUser();
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log(JSON.stringify(user, null, 2));
                setUserInfo(user);
                await AsyncStorage.setItem("@user", JSON.stringify(user));
            } else {
                console.log("user is not authenticated");
            }
        });
        return () => unsub();
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            await AsyncStorage.removeItem("@user");
            setUserInfo(null);
        } catch (e:any) {
            alert(e.message);
        }
    };

    const renderScreens = () => {
        if (userInfo) {
            return (
                <Stack.Screen name="Success">
                    {(props) => <SuccessScreen {...props} onSignOut={handleSignOut} />}
                </Stack.Screen>
            );
        } else {
            return (
                <Stack.Screen name="SignIn" options={{ headerShown: false }}>
                    {(props) => <SignInScreen {...props} promptAsync={promptAsync} />}
                </Stack.Screen>
            );
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
            <Stack.Navigator>
                {renderScreens()}
            </Stack.Navigator>
    );
}
