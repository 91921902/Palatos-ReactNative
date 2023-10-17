import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { Image } from "react-native";

export default function ItemRestaurante() {
    return(
        <View style={styles.itemRestaurante}>
            <View style={styles.imagem}>
             <Image source={require('../assets/fotoRestaurante.png')} style={styles.fotoRestaurante} />

            </View>

            <View style={styles.descricao}>
             <Image source={require('../assets/icons/coracao.png')}style={styles.coracao}/>
             
               <Text style={styles.tituloRestaurante} numberOfLines={1} ellipsizeMode="tail">Nome Restaurantefgfxddrssertjsetjsetj</Text>

               <Text style={styles.categoriaRestaurante} numberOfLines={1} ellipsizeMode="tail">Massa, Lasanha, abobora, pinhão, salada verde, brocolis, abobrinha, arroz, feijão</Text>

             <Pressable style={styles.botao}>
                <Text style={styles.textoBotao}>ver mais</Text>
             </Pressable>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    itemRestaurante:{
      width:'85%',
      height:120,
      backgroundColor:'#D1C0AB',
      borderRadius:2,
      flexDirection:'row'
    },
    imagem:{

      height:'100%',
      width:'35%',
      padding:5,
      backgroundColor:'#B8A997'
    },
    descricao:{
     height:'100%',
     width:'65%',
     justifyContent:'center',
     gap:5,
     padding:10,   
    },
    coracao:{
      width:30,
      height:30,
      position:'absolute',
      right:5,
      top:3,

    },
    botao:{
        position:'absolute',
        bottom:10,
        right:10,
    },
    textoBotao:{
      color:'#445A14',
      fontFamily:'Inter',
      fontSize: 20,
      fontStyle: 'normal',
     

    },
    fotoRestaurante:{
      width:'100%',
      height:'100%',
      resizeMode:'cover',
      
    },
    tituloRestaurante:{
        color:'#445A14',
        fontFamily:'kavoon',
        fontSize: 20,
        fontStyle: 'normal',
       
  


    },
    categoriaRestaurante:{
        color: '#445A14',
        fontFamily: 'Inter',
        fontSize: 16,
        fontStyle:'normal',
        fontWight: 400,
  

    },
})