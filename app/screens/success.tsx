import { auth } from "@/firebase";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Button, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SuccessScreen({ onSignOut }:{ onSignOut:any }) {
    return (
        <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Congratulations! You are signed in</Text>
            <Button title="Sign-out" onPress={onSignOut} />
        </SafeAreaView>
    );
}
