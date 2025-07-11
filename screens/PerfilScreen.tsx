import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { supabase } from '../supabase/Config'

export default function PerfilScreen({ navigation }: any) {
  const [nombre, setnombre] = useState('')
  const [apellido, setapellido] = useState('')
  const [fechaNacimiento, setfechaNacimiento] = useState('')
  const [correo, setcorreo] = useState('')
  const [celular, setcelular] = useState('')
  const [tipoUsuario, settipoUsuario] = useState('')

  async function leerUsuario() {
    const { data: { user } } = await supabase.auth.getUser()
    traerUsuario(user?.id)
  }

  async function traerUsuario(uid: any) {
    const { data, error } = await supabase
      .from('usuario')
      .select()
      .eq('id', uid)
    if (error) {
      console.log('Error al traer usuario:', error.message)
      return
    }
    if (data && data.length > 0) {
      setnombre(data[0].nombre)
      setapellido(data[0].apellido)
      setfechaNacimiento(data[0].fechaNacimiento)
      setcorreo(data[0].correo)
      setcelular(data[0].celular)
      settipoUsuario(data[0].tipoUsuario)
    }
  }

  async function logout() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.log('Error cerrando sesión:', error.message)
      return
    }
    navigation.navigate('Home')
  }

  useEffect(() => {
    leerUsuario()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <MaterialIcons name='person' size={120} color='#34495e' style={styles.icon} />
      <View style={styles.infoContainer}>
        <Text style={styles.text}>Nombre: {nombre}</Text>
        <Text style={styles.text}>Apellido: {apellido}</Text>
        <Text style={styles.text}>Fecha de Nacimiento: {fechaNacimiento}</Text>
        <Text style={styles.text}>Correo: {correo}</Text>
        <Text style={styles.text}>Celular: {celular}</Text>
        <Text style={styles.text}>Tipo de Usuario: {tipoUsuario}</Text>
      </View>

      <TouchableOpacity onPress={logout} style={styles.button}>
        <Text style={styles.textButton}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 25,
    color: '#2c3e50',
  },
  icon: {
    marginBottom: 30,
  },
  infoContainer: {
    width: '100%',
    marginBottom: 40,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: '#34495e',
    marginBottom: 15,
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: '#e74c3c',
    paddingVertical: 14,
    paddingHorizontal: 80,
    borderRadius: 30,
    shadowColor: '#e74c3c',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  textButton: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
})

