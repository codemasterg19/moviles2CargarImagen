import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

export default function Card(props: any) {
    function mensaje(mascota: any) {
        Alert.alert("INFORMACIÓN", "El nombre de la mascota es: " + mascota.name);
    }

    return (
        <TouchableOpacity onPress={() => mensaje(props.data)} style={styles.card}>
            <View style={styles.container}>
                <Text style={styles.txtTitle}>Nombre: {props.data.nombre}</Text>
                <Text style={styles.txt}>Especie: {props.data.especie}</Text>
                <Text style={styles.txt}>Edad: {props.data.edad}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 5,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    container: {
        padding: 20,
    },
    txtTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    txt: {
        fontSize: 18,
        marginBottom: 5,
    },
});
