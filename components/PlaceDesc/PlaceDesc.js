import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Stack } from "expo-router";
export default function PlaceDescPage({ navigation, route }) {
    const { placeData } = route.params;
    // console.log("Desc Image: ", placeData);
    const CircleButton = () => {
        const data = placeData;
        const goToLocation = () => {
            navigation.navigate('Map', { data });
        }
        return (
            <TouchableOpacity style={styles.circleButtonStyle} onPress={goToLocation}>
                <MaterialIcons name="place" size={40} color="white" />
            </TouchableOpacity>

        );
    }
    return (
        <ImageBackground
            style={styles.backgroundImage}
            source={{ uri: placeData.image }}
        >
            <Stack.Screen
                options={{
                    title: placeData.nome,
                    headerStyle: { backgroundColor: '#D2D5D8' },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center',
                    headerShown: true,
                    headerTransparent: true,

                }}
            />
            <View style={styles.container}>
                <CircleButton />

                <View style={styles.description} >
                    <Text style={styles.descriptionText}>{placeData.descricao}</Text>

                </View>


            </View>



        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    descriptionText: {
        fontWeight: 'bold',
        fontSize: 16.7,
        color: '#000',
        textAlign: 'justify'
    },
    description: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 10,
        paddingHorizontal: 10,
        paddingBottom: 5
    },
    container: {
        flex: 1,
        backgroundColor: '#00000040',
        justifyContent: 'flex-end'
    },
    circleButtonStyle: {
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 1000,
        alignSelf: 'flex-end',
        marginBottom: "4%",
        marginRight: "4%"
    }

});