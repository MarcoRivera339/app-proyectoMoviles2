import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database'
import { db } from '../firebase/Config'

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
    usuario: string
    ubicacion: string
    valor: string
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Pedidos</Text>

      <FlatList
        data={datos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: Usuario }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.label}>ID:</Text>
            <Text style={styles.value}>{item.id}</Text>

            <Text style={styles.label}>Usuario:</Text>
            <Text style={styles.value}>{item.usuario}</Text>

            <Text style={styles.label}>Ubicación:</Text>
            <Text style={styles.value}>{item.ubicacion}</Text>

            <Text style={styles.label}>Valor:</Text>
            <Text style={styles.value}>${item.valor}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf0f9',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2c3e50',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7f8c8d',
    marginTop: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#34495e',
  },
})