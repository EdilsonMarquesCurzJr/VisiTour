import { StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
export default function PreferencesPage() {
    const [isChecked, setChecked] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Escolha suas preferências</Text>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <View style={styles.section}>
                    <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
                    <Text style={styles.paragraph}>Normal checkbox</Text>
                </View>
                <View style={styles.section}>
                    <Checkbox
                        style={styles.checkbox}
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? '#4630EB' : undefined}
                    />
                    <Text style={styles.paragraph}>Custom colored checkbox</Text>
                </View>

            </View>
        </View>
    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4a3b2'

    },
    pageTitle: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 28
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paragraph: {
        fontSize: 15,
    },
    checkbox: {
        margin: 8,
    },
});