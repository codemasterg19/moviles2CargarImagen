import { Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
//////////
import * as ImagePicker from "expo-image-picker";
import { storage } from "../config/Config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function CamaraScreen() {
  const [image, setImage] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  async function subirImagen(nombre: string) {
    const storageRef = ref(storage, "camara/" + nombre);

    try {
      const response = await fetch(image);
      const blob = await response.blob();

      // 'file' comes from the Blob or File API
      uploadBytes(storageRef, blob).then(() => {
        console.log("Archivo subido");
      });
      console.log("La imagen se subió con éxito");

      // Obtiene la URL de la imagen
      const imageURL = await getDownloadURL(storageRef);
      console.log("URL de desacarga de la imagen", imageURL);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Cargar imagen desde camara" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Subir imagen" color={"#677c9e"} onPress={() => subirImagen("foto")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
