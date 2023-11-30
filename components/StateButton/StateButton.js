import { Link } from "expo-router";
import { Pressable } from "react-native";

export const StateButton = ({ children, ...props }) => {
    return (
        <Pressable style={{ position: 'absolute', bottom: 30 }} {...props} >
            {children}
        </Pressable>
    );
}