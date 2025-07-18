import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/Config'
import { Audio } from 'expo-av'
import * as Haptics from 'expo-haptics'
import { useFonts } from 'expo-font'
import { LinearGradient } from 'expo-linear-gradient'

export default function LoginScreen({ navigation }: any) {
  const [correo, setcorreo] = useState('')
  const [contrasenia, setcontrasenia] = useState('')
  const [sound, setSound] = useState<Audio.Sound | null>(null)
  const [loaded, error] = useFonts({
    Jarring: require('../assets/fonts/Jarring.otf'),
  })

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/audio/cash-register-purchase-87313.mp3')
    )
    setSound(sound as any)
    await sound.playAsync()
  }

  async function login() {
    if (!correo || !contrasenia) {
      Alert.alert('Error', 'Por favor completa todos los campos')
      return
    }

    const emailLimpio = correo.trim().replace(/^"|"$/g, '')
    const passwordLimpia = contrasenia.trim()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailLimpio)) {
      Alert.alert('Error', 'Correo electrónico inválido')
      return
    }

    if (passwordLimpia.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres')
      return
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailLimpio,
      password: passwordLimpia,
    })

    if (error) {
      console.log('Error en login:', error.message)
      Alert.alert('Error', 'Credenciales incorrectas o problema de conexión')
      return
    }

    const user = data?.user
    if (!user) {
      Alert.alert('Error', 'No se pudo iniciar sesión')
      return
    }

    const { data: userData, error: userError } = await supabase
      .from('usuario')
      .select('tipoUsuario')
      .eq('id', user.id)
      .single()

    if (userError) {
      console.log('Error consultando tipoUsuario:', userError.message)
      Alert.alert('Error', 'No se pudo verificar el tipo de usuario')
      return
    }

    if (userData?.tipoUsuario === 'servidor') {
      Alert.alert('Bienvenido', 'Inicio de sesión exitoso')
      alert('Inicio de sesión exitoso')
      playSound()
      Haptics.selectionAsync()
      navigation.navigate('Drawer')
    } else {
      Alert.alert(
        'Acceso denegado',
        "Tu cuenta no tiene permisos para acceder a esta sección. Solo los usuarios con tipo 'servidor' pueden ingresar."
      )
      alert(
        "Tu cuenta no tiene permisos para acceder a esta sección. Solo los usuarios con tipo 'servidor' pueden ingresar."
      )
      await supabase.auth.signOut()
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound')
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Ingresa al sistema!</Text>

      <Text style={styles.label}>Correo Electrónico:</Text>
      <TextInput
        placeholder="ejemplo@correo.com"
        style={styles.input}
        onChangeText={setcorreo}
        keyboardType="email-address"
        autoCapitalize="none"
        value={correo}
      />

      <Text style={styles.label}>Contraseña:</Text>
      <TextInput
        placeholder="******"
        style={styles.input}
        onChangeText={setcontrasenia}
        secureTextEntry
        value={contrasenia}
      />

      {/* Botón Ingresar con degradado */}
      <TouchableOpacity
        onPress={login}
        activeOpacity={0.8}
        style={{ borderRadius: 30, overflow: 'hidden', marginTop: 25 }}
      >
        <LinearGradient
          colors={['#00b09b', '#96c93d']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            paddingVertical: 16,
            paddingHorizontal: 70,
            borderRadius: 30,
            shadowColor: '#00b09b',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.4,
            shadowRadius: 8,
            elevation: 10,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: '900',
              fontSize: 22,
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: 2,
            }}
          >
            Ingresar
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Botón Cancelar con degradado */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        activeOpacity={0.8}
        style={{ borderRadius: 30, overflow: 'hidden', marginTop: 15 }}
      >
        <LinearGradient
          colors={['#e53935', '#b71c1c']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            paddingVertical: 14,
            paddingHorizontal: 70,
            borderRadius: 30,
            shadowColor: '#b71c1c',
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.5,
            shadowRadius: 7,
            elevation: 9,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: 1.5,
            }}
          >
            Cancelar
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
    flexGrow: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#00796b',
    marginBottom: 10,
    marginTop: 30,
    fontFamily: 'Jarring',
    textShadowColor: '#004d40',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginTop: 15,
    fontWeight: '700',
    color: '#004d40',
    fontSize: 16,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  input: {
    width: '80%',
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#00796b',
    marginBottom: 15,
    fontFamily: 'Jarring',
    fontSize: 18,
    shadowColor: '#00796b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
})

