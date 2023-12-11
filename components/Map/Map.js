import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native"
import MapView, { Marker } from "react-native-maps"

export default function Map({ navigation, route }) {

    const { data } = route.params;
    const { latitude, longitude } = data;
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.0001,
                    longitudeDelta: 0.001,
                }}

            >
                <Marker
                    description={`${data.nome}`}
                    coordinate={
                        {
                            latitude: latitude,
                            longitude: longitude
                        }
                    }
                    pinColor="#000"
                />
            </MapView>
            <Stack.Screen
                options={{
                    title: data.nome,
                    headerStyle: { backgroundColor: '#D2D5D8' },
                    headerTintColor: '#000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center',
                    headerShown: true,
                    headerTransparent: true,

                }}
            />
        </View>
    )


}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        width: '100%',
        height: '100%',
    }
});