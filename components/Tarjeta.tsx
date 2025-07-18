import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { ref, update } from 'firebase/database'
import { db } from '../firebase/Config'

export default function Tarjeta(props: any) {
    const { id, cliente, precio, servicio, ubicacion } = props.informacion
    const [estado, setEstado] = useState(props.informacion.estado)

    const getEstadoEstilo = (estado: string) => {
        switch (estado.toLowerCase()) {
            case 'pendiente':
                return styles.estadoPendiente
            case 'en proceso':
                return styles.estadoProceso
            case 'completado':
                return styles.estadoCompletado
            default:
                return styles.estadoDefault
        }
    }

    const cambiarEstado = (nuevoEstado: string) => {
        const pedidoRef = ref(db, `pedidos/${id}`)
        update(pedidoRef, { estado: nuevoEstado })
            .then(() => {
                setEstado(nuevoEstado)
            })
            .catch((error) => {
                console.error('Error al actualizar estado:', error)
                Alert.alert('Error', 'No se pudo actualizar el estado.')
            })
    }

    const manejarPresionado = () => {
        if (estado.toLowerCase() === 'completado') {
            Alert.alert('Estado final', 'Este pedido ya ha sido completado y no puede modificarse.')
            return
        }

        Alert.alert(
            'Cambiar estado',
            'Selecciona el nuevo estado para el pedido',
            [
                {
                    text: 'Pendiente',
                    onPress: () => cambiarEstado('pendiente'),
                },
                {
                    text: 'En proceso',
                    onPress: () => cambiarEstado('en proceso'),
                },
                {
                    text: 'Completado',
                    onPress: () => cambiarEstado('completado'),
                    style: 'destructive',
                },
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
            ]
        )
    }

    return (
        <View>
            <TouchableOpacity style={styles.card} onPress={manejarPresionado}>
                <Text style={styles.label}>ID:</Text>
                <Text style={styles.value}>{id}</Text>

                <Text style={styles.label}>Cliente:</Text>
                <Text style={styles.value}>{cliente}</Text>

                <Text style={styles.label}>Precio:</Text>
                <Text style={styles.value}>${precio}</Text>

                <Text style={styles.label}>Servicio:</Text>
                <Text style={styles.value}>{servicio}</Text>

                <Text style={styles.label}>Ubicación:</Text>
                <Text style={styles.value}>{ubicacion}</Text>

                <Text style={styles.label}>Estado:</Text>
                <Text style={[styles.estadoBase, getEstadoEstilo(estado)]}>
                    {estado.toUpperCase()}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#7f8c8d',
        marginTop: 5,
    },
    value: {
        fontSize: 16,
        fontWeight: '500',
        color: '#34495e',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 4,
    },
    estadoBase: {
        marginTop: 6,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        overflow: 'hidden',
    },
    estadoPendiente: {
        backgroundColor: '#e67e22',
    },
    estadoProceso: {
        backgroundColor: '#2980b9',
    },
    estadoCompletado: {
        backgroundColor: '#27ae60',
    },
    estadoDefault: {
        backgroundColor: '#7f8c8d',
    },
})

