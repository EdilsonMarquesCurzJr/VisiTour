import React from "react";
import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";



export const Hamb = React.forwardRef(({ HambVisibility, setHambVisibility, ...props }, ref) => {

    return (
        <Modal
            animationType="fade"
            visible={HambVisibility}
            onRequestClose={() => {
                setHambVisibility(!HambVisibility);
            }}
            presentationStyle="overFullScreen"
            transparent={true}
            ref={ref}
        >
            <View style={styles.container}>
                <Ionicons style={styles.userIcon} name="md-person" size={24} color="black" />
                <Text>Usuário</Text>
                <View style={styles.options}>
                    <View style={styles.optionIcons}>
                        <Ionicons name="settings" size={20} />
                        <Text>Configuração</Text>
                    </View>
                    <View style={styles.optionIcons}>
                        <Ionicons name="md-person" size={20} />
                        <Text>Conta</Text>
                    </View>
                    <View style={styles.optionIcons}>
                        <Ionicons name="md-person" size={20} />
                        <Text>FeedBack</Text>
                    </View>
                    <View style={styles.optionIcons}>
                        <Ionicons name="exit" size={20} />
                        <Text>Sair</Text>
                    </View>
                </View>
                <Pressable onPress={() => { setHambVisibility(false) }} style={styles.backIcon}>
                    <Ionicons name="arrow-back" style={styles.backIcon} size={30} />
                </Pressable>
            </View>
        </Modal>
    );
});

const styles = StyleSheet.create({
  container: {

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
    width: "50%",
    height: "100%",
    zIndex: 1,
    marginLeft: 0,
    borderBottomEndRadius: 25,
    borderTopEndRadius: 25,
  },
  userIcon: {
    justifyContent: "center",
    verticalAlign: "middle",
    textAlign: "center",
    borderBottomColor: "#000",
    borderWidth: 5,
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: -300,
  },
  options: {
    position:"relative",
    top: 100,
    rowGap: 25,
    marginBottom: 80,
  },
  optionIcons: {
    flexDirection: "row",
    borderBottomWidth: 3,  
    
  },
  backIcon:{
    marginTop:-200 ,
  },
});
