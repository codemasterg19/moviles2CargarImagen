
import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
//FIREBASE
import { ref, onValue } from "firebase/database";
import { db } from "../config/Config";

export default function ListaMascotaScreen() {
  const [lista, setlista] = useState([]);

  let listaQuemada = [
    {
      id: 1,
      nombre: "Luna",
      especie: "Perro",
      edad: "3 años",
    },
    {
      id: 2,
      nombre: "Tom",
      especie: "Gato",
      edad: "2 años",
    },
    {
      id: 3,
      nombre: "Rocky",
      especie: "Perro",
      edad: "4 años",
    },
    {
      id: 4,
      nombre: "Bella",
      especie: "Gato",
      edad: "1 año",
    },
    {
      id: 5,
      nombre: "Max",
      especie: "Conejo",
      edad: "2 años",
    },
  ];

  useEffect(() => {
    //setlista(listaQuemada);
    leer();
  }, []);

  function leer() {
    const starCountRef = ref(db, "mascotas/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      // console.log(data);

      //transformar
      const listTemporal : any= Object.keys(data).map((id) => ({ id, ...data[id] }));
      // console.log(listTemporal)

      setlista(listTemporal);
    });
  }

  return (
    <View style={styles.container}>
      <FlatList data={lista} renderItem={({ item }) => <Card data={item} />} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
