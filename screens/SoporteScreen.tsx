import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'

export default function SoporteScreen({ navigation }: any) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Centro de Soporte</Text>
      <Text style={styles.subtitle}>¿Tienes algún problema o duda? Estamos aquí para ayudarte.</Text>

      <View style={styles.card}>
        <Text style={styles.label}>📧 Correo de contacto:</Text>
        <Text style={styles.texto}>soporte@masterclean.com</Text>

        <Text style={styles.label}>📱 Teléfono:</Text>
        <Text style={styles.texto}>+593 99 427 1141</Text>

        <Text style={styles.label}>⏰ Horarios de atención:</Text>
        <Text style={styles.texto}>Lunes a Viernes, de 08h00 a 18h00</Text>
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
    marginBottom: 10,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginTop: 15,
  },
  texto: {
    fontSize: 16,
    color: '#555',
  },
  card: {
    backgroundColor: '#ffffff',
    width: '90%',
    padding: 20,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    elevation: 3,
  },
  botonCancelar: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginTop: 30,
  },
  botonTextoCancelar: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
