import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { Image } from "react-native";

export default function NomePrato({produto,navigation, idRest}) {

    function entrarPrato(){
        
        navigation.navigate("MenuIndividual",{
            id:produto.codigo,
            idRest: idRest
        })
    }

    return(

        <Pressable style={styles.nomePrato} onPress={entrarPrato}>
            <View style={styles.imagem}>
             <Image source={{uri: produto.foto}} style={styles.fotoPrato} />
            </View>
           <View style={styles.retangulo}>
                <View style={styles.titulo}>
                <Text style={styles.textoTitulo} numberOfLines={1} ellipsizeMode="tail">{produto.nome_produto}</Text>
                </View>
               
                <View style={styles.descricao}>
                <Text style={styles.textoDescricao}numberOfLines={1} ellipsizeMode="tail">{produto.descricao}</Text>
                </View>

                <View style={styles.preco}>
                    <Text style={styles.textoPreco}>R$ {produto.preco}</Text>
                    <Text style={styles.textoUnidade}>1 unid.</Text>
                </View>
            </View> 
        </Pressable>
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
        
      
    },
    descricao:{
      
      
    },
    textoDescricao:{
        color: '#445A14',
        fontFamily: 'lemonada',
        fontSize: 16,
      
      
    },

    
    preco:{
      flexDirection:'row',

    },
    textoPreco:{
      color: '#445A14',
      fontFamily:'lemonada',
      fontSize:16,
      width:'50%',
      height:'100%'
    },
    textoUnidade:{
        color: '#445A14',
        fontFamily:'lemonada',
        fontSize:16,
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