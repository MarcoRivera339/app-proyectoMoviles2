import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../supabase/Config'

export default function LoginScreen({ navigation }: any) {
    const [correo, setcorreo] = useState("")
    const [contrasenia, setcontrasenia] = useState("")

    async function login() {
        // Validar campos vacíos
        if (!correo || !contrasenia) {
            Alert.alert("Error", "Por favor completa todos los campos");
            return;
        }

        const emailLimpio = correo.trim().replace(/^"|"$/g, '');
        const passwordLimpia = contrasenia.trim();

        // Validar formato del correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailLimpio)) {
            Alert.alert("Error", "Correo electrónico inválido");
            return;
        }

        // Validar longitud de contraseña
        if (passwordLimpia.length < 6) {
            Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres");
            return;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email: emailLimpio,
            password: passwordLimpia,
        });

        if (error) {
            console.log("Error en login:", error.message);
            Alert.alert("Error", error.message);
            return;
        }

        if (data?.user) {
            Alert.alert("Bienvenido", "Inicio de sesión exitoso");
            alert("Inicio de sesión exitoso");
            navigation.navigate('Drawer');
        } else {
            Alert.alert("Error", "No se pudo iniciar sesión");
            alert("No se pudo iniciar sesión");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Ingresa al sistema!</Text>

            <Text style={styles.label}>Correo Electrónico:</Text>
            <TextInput
                placeholder='ejemplo@correo.com'
                style={styles.input}
                onChangeText={setcorreo}
                keyboardType='email-address'
                autoCapitalize='none'
            />

            <Text style={styles.label}>Contraseña:</Text>
            <TextInput
                placeholder='******'
                style={styles.input}
                onChangeText={setcontrasenia}
                secureTextEntry
            />

            <TouchableOpacity style={styles.boton} onPress={() => login()}>
                <Text style={styles.botonTexto}>Ingresar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botonCancelar} onPress={() => navigation.navigate("Home")}>
                <Text style={styles.botonTextoCancelar}>Cancelar</Text>
            </TouchableOpacity>
        </View>
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
        marginBottom: 5,
        marginTop: 20,
    },
    label: {
        alignSelf: 'flex-start',
        marginLeft: '10%',
        marginTop: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        width: '80%',
        backgroundColor: '#ffffff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
    },
    boton: {
        backgroundColor: '#2e7d32',
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 8,
        marginTop: 20,
    },
    botonTexto: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    },
    botonCancelar: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 8,
        marginTop: 10,
    },
    botonTextoCancelar: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
})
