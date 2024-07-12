import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'

export default function MapaScreen() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
      initialRegion={{
        latitude: -0.180653, // Coordenadas de Quito
        longitude: -78.467834,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      map: {
        width: '100%',
        height: '100%',
      },
})