import React, { useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Video, ResizeMode } from 'expo-av'
import { LinearGradient } from 'expo-linear-gradient'

export default function HomeScreen({ navigation }: any) {
    const video = useRef(null)

    return (
        <View style={styles.container}>
            <Video
                ref={video}
                source={require('../assets/videos/limpieza.mp4')}
                style={StyleSheet.absoluteFill}
                resizeMode={ResizeMode.COVER}
                isLooping
                shouldPlay
                isMuted
            />

            <View style={styles.overlay}>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Master Clean</Text>
                </View>

                <View style={styles.bottomContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')} activeOpacity={0.8}>
                        <LinearGradient colors={['#11998e', '#38ef7d']} style={styles.boton}>
                            <Text style={styles.txt}>Login</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Register')} activeOpacity={0.8}>
                        <LinearGradient colors={['#00c6ff', '#0072ff']} style={styles.boton}>
                            <Text style={styles.txt}>Register</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.45)', // un poco más oscuro para mejor contraste
        justifyContent: 'space-between',
    },
    headerContainer: {
        marginTop: 80,
        alignItems: 'center',
    },
    title: {
        fontSize: 44,
        fontWeight: '900',
        color: '#fff',
        textShadowColor: '#00695c',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 8,
        textAlign: 'center',
        letterSpacing: 2,
    },
    bottomContainer: {
        marginBottom: 50,
        alignItems: 'center',
    },
    boton: {
        paddingVertical: 16,
        paddingHorizontal: 90,
        borderRadius: 30,
        marginVertical: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 12,
    },
    txt: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 1.5,
    },
})
