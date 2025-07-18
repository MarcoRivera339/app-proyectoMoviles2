import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/Config'
import * as ImagePicker from 'expo-image-picker'
import { Audio } from 'expo-av'
import * as Haptics from 'expo-haptics'
import { useFonts } from 'expo-font'
import { LinearGradient } from 'expo-linear-gradient'

export default function RegisterScreen({ navigation }: any) {
    const [cedula, setcedula] = useState('')
    const [nombre, setnombre] = useState('')
    const [apellido, setapellido] = useState('')
    const [fechaNacimiento, setfechaNacimiento] = useState('')
    const [correo, setcorreo] = useState('')
    const [celular, setcelular] = useState('')
    const [contrasenia, setcontrasenia] = useState('')
    const [confirmarContrasenia, setconfirmarContrasenia] = useState('')
    const [tipoUsuario, settipoUsuario] = useState('servidor')
    const [image, setImage] = useState<string | null>(null)
    const [sound, setSound] = useState<Audio.Sound | null>(null)
    const [loaded, error] = useFonts({
        Jarring: require('../assets/fonts/Jarring.otf'),
    })

    async function playSound() {
        console.log('Loading Sound')
        const { sound } = await Audio.Sound.createAsync(require('../assets/audio/cash-register-purchase-87313.mp3'))
        setSound(sound as any)

        console.log('Playing Sound')
        await sound.playAsync()
    }

    async function guardar(uid: string) {
        const { error } = await supabase.from('usuario').insert({
            id: uid,
            cedula: cedula.trim(),
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            fechaNacimiento: fechaNacimiento.trim(),
            correo: correo.trim(),
            celular: celular.trim(),
            tipoUsuario: tipoUsuario,
        })
        if (error) {
            console.log('Error al guardar en Supabase:', error.message)
            Alert.alert('Error', 'No se pudo guardar el usuario en la base de datos.')
        }
    }

    async function registro() {
        if (
            !cedula ||
            !nombre ||
            !apellido ||
            !fechaNacimiento ||
            !correo ||
            !celular ||
            !contrasenia ||
            !confirmarContrasenia
        ) {
            Alert.alert('Error', 'Todos los campos son obligatorios')
            return
        }

        const email = correo.trim().replace(/^"|"$/g, '')
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            Alert.alert('Error', 'Correo electrónico inválido')
            return
        }

        if (contrasenia.trim().length < 6) {
            Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres')
            return
        }

        if (contrasenia !== confirmarContrasenia) {
            Alert.alert('Error', 'Las contraseñas no coinciden')
            return
        }

        if (!image) {
            Alert.alert('Imagen requerida', 'Debes seleccionar una imagen de perfil.')
            return
        }

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: contrasenia.trim(),
        })

        if (error) {
            console.log('Error en signUp:', error.message)
            Alert.alert('Error', error.message)
            return
        }

        if (data?.user) {
            await guardar(data.user.id)
            await subir(data.user.id)
            Alert.alert('Éxito', 'Usuario registrado correctamente')
            playSound()
            Haptics.selectionAsync()
            navigation.navigate('Login')
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

    const pickImage = async () => {
        if (image) {
            Alert.alert('Ya has seleccionado una imagen', 'Debes eliminar la imagen actual antes de escoger otra.')
            return
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    }

    const pickImageCamera = async () => {
        if (image) {
            Alert.alert('Ya has seleccionado una imagen', 'Debes eliminar la imagen actual antes de tomar una nueva.')
            return
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    }

    async function subir(uid: string) {
        const avatarFile = image!
        const { data, error } = await supabase.storage
            .from('servidores')
            .upload(
                `${uid}.png`,
                {
                    uri: avatarFile,
                    type: 'image/png',
                    name: `${uid}.png`,
                } as any,
                {
                    cacheControl: '3600',
                    upsert: false,
                    contentType: 'image/png',
                }
            )

        if (error) {
            console.log('Error al subir imagen:', error.message)
        } else {
            console.log('Imagen subida con éxito:', data)
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>¡Regístrate!</Text>
            <Text style={styles.subtitle}>Ingresa tus datos personales:</Text>

            <Text style={styles.label}>Cédula:</Text>
            <TextInput placeholder="Ej: 0102030405" style={styles.input} onChangeText={setcedula} keyboardType="numeric" />

            <Text style={styles.label}>Nombres:</Text>
            <TextInput placeholder="Ej: Juan Carlos" style={styles.input} onChangeText={setnombre} />

            <Text style={styles.label}>Apellidos:</Text>
            <TextInput placeholder="Ej: Pérez Díaz" style={styles.input} onChangeText={setapellido} />

            <Text style={styles.label}>Fecha de Nacimiento:</Text>
            <TextInput placeholder="YYYY-MM-DD" style={styles.input} onChangeText={setfechaNacimiento} />

            <Text style={styles.label}>Correo Electrónico:</Text>
            <TextInput
                placeholder="ejemplo@correo.com"
                style={styles.input}
                onChangeText={setcorreo}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Text style={styles.label}>Celular:</Text>
            <TextInput placeholder="09xxxxxxxx" style={styles.input} onChangeText={setcelular} keyboardType="phone-pad" />

            <Text style={styles.label}>Contraseña:</Text>
            <TextInput placeholder="******" style={styles.input} onChangeText={setcontrasenia} secureTextEntry />

            <Text style={styles.label}>Confirmar Contraseña:</Text>
            <TextInput
                placeholder="******"
                style={styles.input}
                onChangeText={setconfirmarContrasenia}
                secureTextEntry
            />

            <TouchableOpacity onPress={pickImage}>
                <LinearGradient colors={['#11998e', '#38ef7d']} style={styles.boton}>
                    <Text style={styles.botonTexto}>Elegir imagen de galería</Text>
                </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={pickImageCamera}>
                <LinearGradient colors={['#11998e', '#38ef7d']} style={styles.boton}>
                    <Text style={styles.botonTexto}>Tomar foto con cámara</Text>
                </LinearGradient>
            </TouchableOpacity>

            {image && (
                <>
                    <Image source={{ uri: image }} style={styles.image} />
                    <TouchableOpacity onPress={() => setImage(null)}>
                        <LinearGradient colors={['#888', '#555']} style={[styles.boton, { marginTop: 10 }]}>
                            <Text style={styles.botonTexto}>Eliminar imagen seleccionada</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </>
            )}

            <TouchableOpacity onPress={registro}>
                <LinearGradient colors={['#00c6ff', '#0072ff']} style={[styles.boton, { marginTop: 25 }]}>
                    <Text style={styles.botonTexto}>Registrar</Text>
                </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <LinearGradient colors={['#ff416c', '#ff4b2b']} style={[styles.botonCancelar, { marginTop: 10 }]}>
                    <Text style={styles.botonTextoCancelar}>Cancelar</Text>
                </LinearGradient>
            </TouchableOpacity>
        </ScrollView>
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
        marginBottom: 5,
        marginTop: 30,
        fontFamily: 'Jarring',
        textShadowColor: '#004d40',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    subtitle: {
        fontSize: 16,
        color: '#004d40',
        marginBottom: 20,
        fontFamily: 'Jarring',
        fontWeight: '600',
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
    boton: {
        paddingVertical: 16,
        paddingHorizontal: 70,
        borderRadius: 30,
        marginTop: 15,
        shadowColor: '#00796b',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 10,
    },
    botonTexto: {
        color: 'white',
        fontWeight: '900',
        fontSize: 22,
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    botonCancelar: {
        paddingVertical: 14,
        paddingHorizontal: 70,
        borderRadius: 30,
        shadowColor: '#b71c1c',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 7,
        elevation: 9,
    },
    botonTextoCancelar: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        marginTop: 15,
        borderRadius: 150,
        borderWidth: 4,
        borderColor: '#00796b',
        shadowColor: '#00796b',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 10,
    },
})

