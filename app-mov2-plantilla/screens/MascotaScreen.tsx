import { Alert, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
////FIREBASE
import { onValue, ref, remove, set, update } from "firebase/database";
import { db } from "../config/Config";

export default function MascotaScreen() {
  const [id, setid] = useState("");
  const [nombre, setnombre] = useState("");
  const [especie, setespecie] = useState("");
  const [edad, setedad] = useState("");

  function guardarMascota() {
    set(ref(db, "mascotas/" + id), {
      name: nombre,
      especie: especie,
      edad: edad,
    });
    Alert.alert("Éxito", "Mascota guardada correctamente");
  }

  function editar() {
    update(ref(db, "mascotas/" + id), {
      name: nombre,
      especie: especie,
      edad: edad,
    });
    Alert.alert("Éxito", "Mascota actualizada correctamente");
  }

  function LeeMascota() {
    const starCountRef = ref(db, "mascotas/" + id);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data == null) {
        Alert.alert("Error", "Elemento no encontrado");
        setnombre("");
        setespecie("");
        setedad("");
      } else {
        setnombre(data.name);
        setespecie(data.especie);
        setedad(data.edad);
      }
    });
  }

  function eliminar() {
    remove(ref(db, "mascotas/" + id));
    Alert.alert("Éxito", "Mascota eliminada correctamente");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/*------------------ GUARDAR -------------------------- */}
      <View style={styles.card}>
        <Text style={styles.title}>Guardar Mascota</Text>
        <TextInput
          placeholder="Ingresar ID"
          style={styles.input}
          onChangeText={(texto) => setid(texto)}
        />
        <TextInput
          placeholder="Ingresar nombre"
          style={styles.input}
          onChangeText={(texto) => setnombre(texto)}
        />
        <TextInput
          placeholder="Ingresar especie"
          style={styles.input}
          onChangeText={(texto) => setespecie(texto)}
        />
        <TextInput
          placeholder="Ingresar edad"
          style={styles.input}
          onChangeText={(texto) => setedad(texto)}
        />
        <TouchableOpacity style={styles.button} onPress={guardarMascota}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />

      {/*------------------ EDITAR-------------------------- */}
      <View style={styles.card}>
        <Text style={styles.title}>Editar Mascota</Text>
        <View style={styles.row}>
          <TextInput
            placeholder="Ingresar ID"
            style={[styles.input, styles.inputRow]}
            onChangeText={(texto) => setid(texto)}
          />
          <TouchableOpacity style={styles.buttonSmall} onPress={LeeMascota}>
            <Text style={styles.buttonText}>Buscar</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Ingresar nombre"
          style={styles.input}
          onChangeText={(texto) => setnombre(texto)}
          value={nombre}
        />
        <TextInput
          placeholder="Ingresar especie"
          style={styles.input}
          onChangeText={(texto) => setespecie(texto)}
          value={especie}
        />
        <TextInput
          placeholder="Ingresar edad"
          style={styles.input}
          onChangeText={(texto) => setedad(texto)}
          value={edad}
        />
        <TouchableOpacity style={styles.button} onPress={editar}>
          <Text style={styles.buttonText}>Guardar Cambios</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />

      {/*------------------ ELIMINAR------------------------- */}
      <View style={styles.card}>
        <Text style={styles.title}>Eliminar Mascota</Text>
        <TextInput
          placeholder="Ingresar ID"
          style={styles.input}
          onChangeText={(texto) => setid(texto)}
        />
        <TouchableOpacity style={[styles.button, styles.buttonDelete]} onPress={eliminar}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  separator: {
    height: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  inputRow: {
    flex: 1,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#1e90ff",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
  },
  buttonDelete: {
    backgroundColor: "#ff4d4d",
  },
  buttonSmall: {
    backgroundColor: "#1e90ff",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
