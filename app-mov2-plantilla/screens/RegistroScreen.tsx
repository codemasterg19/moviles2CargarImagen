import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Switch } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';
import Dialog from 'react-native-dialog';

export default function RegistroScreen({ navigation }: any) {
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  function getErrorMessage(errorCode: any) {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'El correo electrónico ya está en uso por otra cuenta.';
      case 'auth/invalid-email':
        return 'El formato del correo electrónico no es válido.';
      case 'auth/operation-not-allowed':
        return 'La operación no está permitida. Por favor, contacta al soporte.';
      case 'auth/weak-password':
        return 'La contraseña proporcionada es demasiado débil.';
      case 'auth/network-request-failed':
        return 'La solicitud de red ha fallado. Por favor, verifica tu conexión a internet.';
      case 'auth/internal-error':
        return 'Ha ocurrido un error interno. Por favor, inténtalo de nuevo.';
      case 'auth/requires-recent-login':
        return 'Esta operación es sensible y requiere autenticación reciente. Inicia sesión nuevamente antes de intentar esta solicitud.';
      default:
        return 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.';
    }
  }

  function registro() {
    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
        /*console.log('Usuario registrado:', user.email);*/
        setDialogMessage('El usuario se ha registrado correctamente.');
        setVisible(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = getErrorMessage(errorCode);
        /*console.error(`Error Code: ${errorCode}, Message: ${error.message}`);*/
        setDialogMessage(errorMessage);
        setVisible(true);
      });
  }

  const handleDialogClose = () => {
    setVisible(false);
    if (dialogMessage === 'El usuario se ha registrado correctamente.') {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#343a40' : '#f8f9fa' }]}>
      <View style={styles.switchContainer}>
        <Text style={[styles.switchText, { color: isDarkMode ? '#f8f9fa' : '#343a40' }]}>Modo Oscuro</Text>
        <Switch
          value={isDarkMode}
          onValueChange={(value) => setIsDarkMode(value)}
          style={styles.switch}
        />
      </View>

      <Text style={[styles.title, { color: isDarkMode ? '#f8f9fa' : '#343a40' }]}>Registro</Text>

      <TextInput
        style={[styles.input, { backgroundColor: isDarkMode ? '#495057' : '#ffffff', borderColor: isDarkMode ? '#6c757d' : '#ced4da', color: isDarkMode ? '#f8f9fa' : '#343a40' }]}
        placeholder='Correo electrónico'
        placeholderTextColor={isDarkMode ? '#a9a9a9' : '#6c757d'}
        onChangeText={(texto) => setCorreo(texto)}
        keyboardType='email-address'
        autoCapitalize='none'
        autoCorrect={false}
      />
      <TextInput
        style={[styles.input, { backgroundColor: isDarkMode ? '#495057' : '#ffffff', borderColor: isDarkMode ? '#6c757d' : '#ced4da', color: isDarkMode ? '#f8f9fa' : '#343a40' }]}
        placeholder='Contraseña'
        placeholderTextColor={isDarkMode ? '#a9a9a9' : '#6c757d'}
        onChangeText={(texto) => setContrasenia(texto)}
        secureTextEntry
        autoCapitalize='none'
        autoCorrect={false}
      />

      <TouchableOpacity style={[styles.button, { backgroundColor: isDarkMode ? '#1a73e8' : '#007bff' }]} onPress={registro}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.backButtonText, { color: isDarkMode ? '#f8f9fa' : '#343a40' }]}>Regresar</Text>
      </TouchableOpacity>

      <Dialog.Container visible={visible}>
        <Dialog.Title>{dialogMessage === 'El usuario se ha registrado correctamente.' ? 'Registro Exitoso' : 'Error de Registro'}</Dialog.Title>
        <Dialog.Description>{dialogMessage}</Dialog.Description>
        <Dialog.Button label="OK" onPress={handleDialogClose} />
      </Dialog.Container>
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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderWidth: 1,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  backButton: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#007bff',
  },
  backButtonText: {
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
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
