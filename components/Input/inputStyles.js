import { Appearance } from "react-native";
const styles = {
    light: {
        inputLabel: 'text-xl',
        input: 'w-44 max-h-11 bg-white rounded-lg px-1 text-xl border-solid border-2 border-black',
    },
    dark: {

    }
}
const currentMode = Appearance.getColorScheme();

export const inputStyles = styles[currentMode];