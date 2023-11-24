import React from "react"; 
import { useState } from "react";
import {View , StyleSheet, Image, Pressable} from 'react-native'

export default function BolaFavoritos({restaurante, navigation}){

    const [foto, setFoto]=useState(restaurante.foto);
    const [idRestaurante, setIdRestaurante]=useState(restaurante.id_restaurante);


    function goRestaurant(){
        navigation.navigate("PerfilRestaurante",{id:idRestaurante})
    }

    return (
        <View style={styles.bolasView}>
            <Pressable style={styles.bolinha} onPress={goRestaurant}>
                {foto && (
                    <Image 
                    source={{uri:restaurante.foto}}
                    style={{width: '100%', height: '100%', resizeMode:'contain', borderRadius:5000}}  
                    />
                )}
            </Pressable>

            <View style={styles.estrelinha}>
                <Image 
                source={require('../assets/estrela.png')}
                style={{width: 30, height: 30, resizeMode:'contain' }}  
                />
            </View>
        </View>   

    )
}

const styles = StyleSheet.create({

    bolinha:{
        width: 60,
        height: 60,
        borderRadius:5000,
        borderColor:'#445A14',
        borderWidth:2,
       
    },
    bolasView: {
        minWidth: 80,
        height :100,
        marginLeft:5,
        alignItems:"center",

    },

    estrelinha:{
        width:'100%',
        height:'50%',
        alignItems: 'center',
        paddingTop:5,
    }
});