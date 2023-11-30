import React from 'react';
import { TextInput, View, Text, Appearance, StyleSheet } from 'react-native';
import { inputStyles } from './inputStyles';

const Input = ({ value, onChangeText, label, invalidLabel, ...props }) => {
    return (
        <View>
            {label && <Text style={styles.inputLabel}>{label}</Text>}
            {invalidLabel && <Text style={styles.invalidLabel}>{invalidLabel}</Text>}
            <TextInput style={styles.input}
                value={value}
                onChangeText={text => onChangeText(text)}
                {...props}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    inputLabel: {
        fontSize: 16,
        lineHeight: 18,
        fontWeight: '400',

    },
    invalidLabel: {
        fontSize: 16,
        fontWeight: '400',
        color: '#F01E2C'
    },
    input: {
        width: 227,
        backgroundColor: '#FFF',
        fontSize: 16,
        padding: 15,
        marginTop: 2,
        borderRadius: 25,

    }
});
export default Input;