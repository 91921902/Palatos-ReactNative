import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Image } from "react-native";

export default function NomePrato() {
    return(
        <View style={styles.nomePrato}>
            <View style={styles.imagem}>
             <Image source={require('../assets/icons/fotoPrato.png')} style={styles.fotoPrato} />
            </View>
           <View style={styles.retangulo}>
                <View style={styles.titulo}>
                <Text style={styles.textoTitulo} numberOfLines={1} ellipsizeMode="tail">Lasanha De Abobrinha Grelhada</Text>
                </View>
               
                <View style={styles.descricao}>
                <Text style={styles.textoDescricao}numberOfLines={1} ellipsizeMode="tail">Abobrinha, queijo,presunto, orégano, carne moida</Text>
                </View>

                <View style={styles.preco}>
                    <Text style={styles.textoPreco}>R$</Text>
                    <Text style={styles.textoUnidade}>1 unid.</Text>
                </View>
            </View> 
        </View>
    );
}

const styles = StyleSheet.create({
    nomePrato:{
        width:'85%',
        height:120,
        backgroundColor:'#D1C0AB',
        borderRadius:2,
        flexDirection:'row',
        

    },
    imagem:{
     height:'100%',
      width:'35%',
      padding:5,
      backgroundColor:'#B8A997'
    },
    fotoPrato:{
        width:'100%',
        height:'100%',
        resizeMode:'cover',
    },
    titulo:{
      
    },
    textoTitulo:{
        color:'#445A14',
        fontFamily:'kavoon',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal',
      
    },
    descricao:{
      
      
    },
    textoDescricao:{
        color: '#445A14',
        fontFamily: 'Inter',
        fontSize: 16,
        fontStyle:'normal',
        fontWight: 400,
        lineHeight: 'normal',
    },

    
    preco:{
      flexDirection:'row',

    },
    textoPreco:{
      color: '#445A14',
      fontFamily:'Inter',
      fontSize:16,
      fontStyle: 'normal',
      fontWeight: 400,
      lineWeight:'normal',
      width:'50%',
      height:'100%',

    },
    textoUnidade:{
        color: '#445A14',
        fontFamily:'Inter',
        fontSize:16,
        fontStyle: 'normal',
        fontWeight: 400,
        lineWeight:'normal',
        width:'50%',
        height:'100%',

    },
    retangulo:{
        width:'65%',
        height:'100%',
        justifyContent:'center',
        gap:10,
        padding:10,   
    }
 
 
})