import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, Switch } from 'react-native';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function LoginScreen({ navigation }: any) {

  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);


  function getErrorMessage(errorCode: any) {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'El formato del correo electrónico no es válido.';
      case 'auth/user-disabled':
        return 'La cuenta de usuario ha sido deshabilitada.';
      case 'auth/user-not-found':
        return 'No se encontró ningún usuario con este correo.';
      case 'auth/wrong-password':
        return 'La contraseña es incorrecta.';
      case 'auth/email-already-in-use':
        return 'El correo electrónico ya está en uso por otra cuenta.';
      case 'auth/operation-not-allowed':
        return 'El inicio de sesión con correo electrónico y contraseña no está habilitado.';
      case 'auth/weak-password':
        return 'La contraseña proporcionada es demasiado débil.';
      case 'auth/too-many-requests':
        return 'Demasiados intentos de inicio de sesión fallidos. Por favor, intenta de nuevo más tarde.';
      case 'auth/requires-recent-login':
        return 'Esta operación es sensible y requiere autenticación reciente. Inicia sesión nuevamente antes de intentar esta solicitud.';
      case 'auth/network-request-failed':
        return 'La solicitud de red ha fallado. Por favor, verifica tu conexión a internet.';
      case 'auth/internal-error':
        return 'Ha ocurrido un error interno. Por favor, inténtalo de nuevo.';
      case 'auth/invalid-credential':
        return 'Las credenciales proporcionadas no son válidas.';
      case 'auth/invalid-verification-code':
        return 'El código de verificación proporcionado no es válido.';
      case 'auth/invalid-verification-id':
        return 'El ID de verificación proporcionado no es válido.';
      default:
        return 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.';
    }
  }

  function login() {
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
        /*console.log(user);*/
        navigation.navigate("Drawer");
        setCorreo('');
        setContrasenia('');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = getErrorMessage(errorCode);
        /*console.log(`Error Code: ${errorCode}, Message: ${error.message}`);*/
        Alert.alert("Error de Autenticación", errorMessage);
      });
  }

    const resetearCampos = () => {
    setCorreo('');
    setContrasenia('');
  };
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

      <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>Login</Text>

      <TextInput
        style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
        placeholder='Correo electrónico'
        placeholderTextColor={isDarkMode ? '#a9a9a9' : '#6c757d'}
        onChangeText={(texto) => setCorreo(texto)}
        keyboardType='email-address'
        autoCapitalize='none'
        autoCorrect={false}
        value={correo}
      />
      <TextInput
        style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
        placeholder='Contraseña'
        placeholderTextColor={isDarkMode ? '#a9a9a9' : '#6c757d'}
        onChangeText={(texto) => setContrasenia(texto)}
        secureTextEntry
        autoCapitalize='none'
        autoCorrect={false}
        value={contrasenia}
      />

      <TouchableOpacity style={[styles.button, isDarkMode ? styles.darkButton : styles.lightButton]} onPress={login}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      <Text
        style={[styles.registerText, isDarkMode ? styles.darkText : styles.lightText]}
        onPress={() => {
          resetearCampos(); // Llama a la función para resetear los campos
          navigation.navigate('Registro');
        }}
      >
        👉 Regístrate aquí 👈
      </Text>
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
  input: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderWidth: 1,
  },
  lightInput: {
    backgroundColor: '#ffffff',
    borderColor: '#ced4da',
  },
  darkInput: {
    backgroundColor: '#495057',
    borderColor: '#6c757d',
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
  registerText: {
    marginTop: 20,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
