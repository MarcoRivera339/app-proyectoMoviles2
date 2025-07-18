import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database'
import { db } from '../firebase/Config'
import Tarjeta from '../components/Tarjeta'

export default function ListaPedidosScreen() {
  const [datos, setdatos] = useState([])

  function leer() {
    const starCountRef = ref(db, 'pedidos/')
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val()
      if (!data) return

      let arreglo: any = Object.keys(data).map(id => ({
        id, ...data[id]
      }))
      setdatos(arreglo)
    })
  }

  useEffect(() => {
    leer()
  }, [])

  type Usuario = {
    id: string
    cliente: string
    estado: string
    precio: number
    servicio: string
    ubicacion: string
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Pedidos</Text>

      <FlatList
        data={datos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: Usuario }) => (
          <Tarjeta informacion={item} />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',  // fondo claro y suave
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 25,
    textAlign: 'center',
    color: '#27ae60',  // verde vibrante
    textShadowColor: '#145214',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
})