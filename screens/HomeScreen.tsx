import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function HomeScreen({ navigation }: any) {
    return (
        <ImageBackground source={require('../assets/images/empresa-de-limpieza-de-departamento-y-casas.png')} style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Master Clean</Text>
            </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.txt}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.txt}>Register</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    headerContainer: {
        marginTop: 80,
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'yellow',
        textShadowColor: '#000000',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 6,
        textAlign: 'center',
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 40,
        width: '100%',
        alignItems: 'center',
    },
    boton: {
        backgroundColor: 'rgba(255,255,255,0.8)',
        paddingVertical: 15,
        paddingHorizontal: 60,
        marginVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        elevation: 5
    },
    txt: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})
