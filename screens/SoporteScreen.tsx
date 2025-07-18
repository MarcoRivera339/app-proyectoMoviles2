import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native'
import { ref, push, set } from 'firebase/database'
import { db } from '../firebase/Config'

export default function SoporteScreen({ navigation }: any) {
  const [nombre, setNombre] = useState('')
  const [mensaje, setMensaje] = useState('')

  const enviarSoporte = async () => {
    if (!nombre || !mensaje) {
      Alert.alert('Error', 'Por favor, llena todos los campos.')
      return
    }
    try {
      const soporteRef = ref(db, 'soporte')
      const nuevoSoporteRef = push(soporteRef)
      await set(nuevoSoporteRef, {
        nombre,
        mensaje,
        fecha: new Date().toISOString(),
      })
      Alert.alert('¡Mensaje enviado!', 'Te responderemos pronto.')
      setNombre('')
      setMensaje('')
    } catch (error) {
      Alert.alert('Error', 'Error al enviar mensaje')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Soporte</Text>

      <View style={styles.content}>
        <Text style={styles.text}>¿En qué podemos ayudarte?</Text>

        <TextInput
          style={styles.input}
          placeholder="Tu nombre"
          value={nombre}
          onChangeText={setNombre}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe tu problema o consulta"
          value={mensaje}
          onChangeText={setMensaje}
          multiline
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.boton} onPress={enviarSoporte} activeOpacity={0.8}>
          <Text style={styles.botonTexto}>Enviar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={[styles.boton, styles.botonSecundario]} onPress={() => navigation.goBack()} activeOpacity={0.8}>
        <Text style={[styles.botonTexto, styles.botonTextoSecundario]}>Volver</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#2e7d32',
    marginBottom: 30,
    textAlign: 'center',
    letterSpacing: 1.5,
  },
  content: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: '#333',
    marginBottom: 15,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    fontSize: 18,
    fontWeight: '500',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  textArea: {
    height: 120,
  },
  boton: {
    backgroundColor: '#27ae60',
    paddingVertical: 16,
    borderRadius: 30,
    marginTop: 10,
    alignItems: 'center',
    shadowColor: '#1b5e20',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  botonTexto: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1,
  },
  botonSecundario: {
    backgroundColor: '#e74c3c',
    marginBottom: 30,
    marginTop: 20,
  },
  botonTextoSecundario: {
    color: '#fff',
  },
})

