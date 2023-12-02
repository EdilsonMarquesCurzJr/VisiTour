import { Link } from "expo-router";
import { Pressable } from "react-native";

export const StateButton = ({ children, ...props }) => {
    return (
        <Pressable {...props} >
            {children}
        </Pressable>
    );
}