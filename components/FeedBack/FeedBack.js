import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useNavigation } from "expo-router";
import { RedirectButton } from "../RedirectButton/RedirectButton";

export const FeedBack = () => {
    

    return (
        <>
            
            <View style={styles.container}>
            
            <Link href="/home" style={styles.arrouBack}>
                {/* <TouchableOpacity> */}
                    <Ionicons  name="arrow-back" size={30}/>
                {/* </TouchableOpacity> */}
            </Link>
                <Text style={styles.textFeed}>Com o que você gostaria de ajudar</Text>
                <View style={styles.button}>
                    <Link href="/Feed/FeedArea"style={styles.buttonFeed}>
                        {/* <TouchableOpacity > */}
                            <Text>Feedback de melhoria</Text>
                        {/* </TouchableOpacity> */}
                    </Link>
                    <Link href=''style={styles.buttonFeed}>
                    <TouchableOpacity>
                        <Text>Contribuir com o mapa</Text>
                    </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        marginBottom: 150,
        
    },
    textFeed:{
        fontWeight: "500",
        fontSize: 20,
    },
    button:{
        width: "70%",
        rowGap: 25,
        marginTop: 50,
    },
    buttonFeed:{
        backgroundColor:"gray",
        padding:10,
        borderRadius: 25,
        textAlign: 'center', 
        textAlignVertical: 'center',
       
    },
    arrouBack:{
        position: 'absolute',
        left: 20,
        top: 60
    },
});
