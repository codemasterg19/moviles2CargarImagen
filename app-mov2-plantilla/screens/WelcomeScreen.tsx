import { StyleSheet, Text, View, TouchableOpacity, Switch, Alert } from 'react-native';
import React, { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { auth } from '../config/Config';



export default function WelcomeScreen({ navigation }: any) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  function logout() {
    signOut(auth).then(() => {
      // Sign-out successful.
      Alert.alert("Sesión Cerrada", "Tu sesión se ha cerrado correctamente.", [
        { text: "OK", onPress: () => navigation.navigate('Login') }
      ]);
      
    }).catch((error) => {
      // An error happened.
      Alert.alert("Error", "Ocurrió un error al cerrar sesión. Inténtalo de nuevo.");
    });
  }
  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <View style={styles.switchContainer}>
        <Text style={[styles.switchText, isDarkMode ? styles.darkText : styles.lightText]}>Modo Oscuro</Text>
        <Switch
          value={isDarkMode}
          onValueChange={(value) => setIsDarkMode(value)}
          style={styles.switch}
        />
      </View>


      <TouchableOpacity
        style={[styles.button, isDarkMode ? styles.darkButton : styles.lightButton]}
        onPress={logout}
      >
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  lightContainer: {
    backgroundColor: '#f8f9fa',
  },
  darkContainer: {
    backgroundColor: '#343a40',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  lightText: {
    color: '#343a40',
  },
  darkText: {
    color: '#f8f9fa',
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  lightButton: {
    backgroundColor: '#007bff',
  },
  darkButton: {
    backgroundColor: '#1a73e8',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchText: {
    fontSize: 12,
    marginRight: 10,
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
});
