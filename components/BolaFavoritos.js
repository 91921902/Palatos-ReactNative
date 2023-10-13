import React from "react"; 
import {View , StyleSheet, Image} from 'react-native'

export default function BolaFavoritos(){


    return (
        <View style={styles.bolasView}>
            <View style={styles.bolinha}></View>

            <View style={styles.estrelinha}>
            <Image 
             source={require('../assets/estrela 1.png')}
             style={{width: 20, height: 25, }}  
            />
            </View>

        </View>   

    )
}

const styles = StyleSheet.create({

    bolinha:{
        width: 50,
        height: 50,
        borderRadius:5000,
        borderColor:'#445A14',
        borderWidth:2,
       
    },
    bolasView: {
        width: 50,
        height :100,
        marginLeft:20,
    
    },

    estrelinha:{
        width:'100%',
        height:'50%',
        alignItems: 'center',
        paddingTop:5,
    }
});