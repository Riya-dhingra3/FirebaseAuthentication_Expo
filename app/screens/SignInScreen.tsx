import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export default function SignInScreen({ promptAsync }: { promptAsync: any }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleEmailSignIn = async () => {
        console.log(email,password);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setError("");
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Ionicons name="logo-firebase" size={100} color="#FFA611" />
            <Text style={styles.headerText}>
                Sign In With{" "}
                <Text style={styles.googleText}>
                    G<Text style={styles.googleTextRed}>o</Text>
                    <Text style={styles.googleTextYellow}>o</Text>
                    <Text style={styles.googleTextBlue}>g</Text>
                    <Text style={styles.googleTextGreen}>l</Text>
                    <Text style={styles.googleTextRed}>e</Text>
                </Text>
            </Text>
            <Text style={styles.headerText}>And Firebase</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleEmailSignIn}>
                <Text style={styles.buttonText}>Sign In with Email</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.googleButton} onPress={() => promptAsync()}>
                <AntDesign name="google" size={30} color="white" />
                <Text style={styles.googleButtonText}>Sign In With Google</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    headerText: {
        fontSize: 32,
        fontWeight: "bold",
    },
    googleText: {
        color: "#4285F4",
    },
    googleTextRed: {
        color: "#EA4336",
    },
    googleTextYellow: {
        color: "#FBBC04",
    },
    googleTextBlue: {
        color: "#4285F4",
    },
    googleTextGreen: {
        color: "#34A853",
    },
    input: {
        width: "90%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        marginVertical: 10,
    },
    button: {
        backgroundColor: "#4285F4",
        width: "90%",
        padding: 10,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 17,
    },
    googleButton: {
        backgroundColor: "#4285F4",
        width: "90%",
        padding: 10,
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 15,
        marginTop: 20,
    },
    googleButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 17,
    },
    errorText: {
        color: "red",
        marginVertical: 10,
    },
});
