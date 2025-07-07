import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'

export default function PerfilScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>

      <View style={styles.card}>
        <Text style={styles.label}>👤 Nombre:</Text>
        <Text style={styles.texto}>Marco Antonio Rivera Altamirano</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>📝 Características:</Text>
        <Text style={styles.texto}>
          - Usuario tipo servidor{'\n'}
          - Disponible para nuevos pedidos{'\n'}
          - Conectado recientemente
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>📅 Historial:</Text>
        <Text style={styles.texto}>
          - Servicio en Quito Norte - 12/06/2025{'\n'}
          - Servicio en Centro Histórico - 18/06/2025{'\n'}
          - Servicio en La Mariscal - 24/06/2025
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 20,
    marginTop: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    width: '90%',
    padding: 20,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    elevation: 3,
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  texto: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
})
