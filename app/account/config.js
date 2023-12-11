import { createStackNavigator } from "@react-navigation/stack";


import UserUpdate from "../../components/UserConfig/UserConfig";


const Stack = createStackNavigator();

export default function UserConfgiPages() {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="UserUpdate"
                component={UserUpdate}

            />
        </Stack.Navigator>
    );





}