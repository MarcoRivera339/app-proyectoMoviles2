import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../supabase/Config'

export default function RegisterScreen({ navigation }: any) {

    const [cedula, setcedula] = useState("")
    const [nombre, setnombre] = useState("")
    const [apellido, setapellido] = useState("")
    const [fechaNacimiento, setfechaNacimiento] = useState("")
    const [correo, setcorreo] = useState("")
    const [celular, setcelular] = useState("")
    const [contrasenia, setcontrasenia] = useState("")
    const [confirmarContrasenia, setconfirmarContrasenia] = useState("")
    const [tipoUsuario, settipoUsuario] = useState("servidor")

    async function guardar() {
        const { error } = await supabase
            .from('usuario')
            .insert(
                {
                    cedula: cedula,
                    nombre: nombre,
                    apellido:apellido,
                    fechaNacimiento:fechaNacimiento,
                    correo: correo,
                    celular:celular,
                    contrasenia:contrasenia,
                    tipoUsuario:tipoUsuario
                }
            )
        console.log(error);
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>¡Regístrate!</Text>
            <Text style={styles.subtitle}>Ingresa tus datos personales:</Text>

            <Text style={styles.label}>Cédula:</Text>
            <TextInput
                placeholder='Ej: 0102030405'
                style={styles.input}
                onChangeText={setcedula}
                keyboardType='numeric'
            />

            <Text style={styles.label}>Nombres:</Text>
            <TextInput
                placeholder='Ej: Juan Carlos'
                style={styles.input}
                onChangeText={setnombre}
            />

            <Text style={styles.label}>Apellidos:</Text>
            <TextInput
                placeholder='Ej: Pérez Díaz'
                style={styles.input}
                onChangeText={setapellido}
            />

            <Text style={styles.label}>Fecha de Nacimiento:</Text>
            <TextInput
                placeholder='YYYY-MM-DD'
                style={styles.input}
                onChangeText={setfechaNacimiento}
            />

            <Text style={styles.label}>Correo Electrónico:</Text>
            <TextInput
                placeholder='ejemplo@correo.com'
                style={styles.input}
                onChangeText={setcorreo}
                keyboardType='email-address'
            />

            <Text style={styles.label}>Celular:</Text>
            <TextInput
                placeholder='09xxxxxxxx'
                style={styles.input}
                onChangeText={setcelular}
                keyboardType='phone-pad'
            />

            <Text style={styles.label}>Contraseña:</Text>
            <TextInput
                placeholder='******'
                style={styles.input}
                onChangeText={setcontrasenia}
                secureTextEntry
            />

            <Text style={styles.label}>Confirmar Contraseña:</Text>
            <TextInput
                placeholder='******'
                style={styles.input}
                onChangeText={setconfirmarContrasenia}
                secureTextEntry
            />

            <TouchableOpacity style={styles.boton} onPress={()=>guardar()}>
                <Text style={styles.botonTexto}>Registrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botonCancelar} onPress={() => navigation.navigate("Home")}>
                <Text style={styles.botonTextoCancelar}>Cancelar</Text>
            </TouchableOpacity>
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
        marginBottom: 5,
        marginTop: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
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
