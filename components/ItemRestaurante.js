import React, {useState, useEffect} from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { Image } from "react-native";
import api from "../providers/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ItemRestaurante({rest, favoritos, navigation}) {

    const [isFavorito, setIsFavorito] = useState(false)

    useEffect(() => {

      for(let fav of favoritos) {
        if (rest.id == fav.id_restaurante) {
          setIsFavorito(true)
          break
        }
      }

    }, [favoritos])

    function irParaRestaurante(id) {
      
      navigation.navigate("PerfilRestaurante", {
        id: id
      })

    }

    async function toggleFavorito() {

      const idRestaurante = rest.id
      const token = await AsyncStorage.getItem('token')

      const message = await api.patch("users/toggleFavorito/" + idRestaurante, {}, {
        headers: {
          Authorization: token
        }
      })
      .then(response => response.data.message)

      if (message == "Restaurante Favoritado") {

        setIsFavorito(true)

      } else if (message == "Restaurante removido dos favoritos") {

        setIsFavorito(false)

      } else {
        alert("erro favorito")
      }

    }

    return(
        <Pressable style={styles.itemRestaurante} onPress={() => irParaRestaurante(rest.id)}>
            <View style={styles.imagem}>
             <Image source={{uri: rest.foto}} style={styles.fotoRestaurante} />

            </View>

            <View style={styles.descricao}>

                {isFavorito && (
                  <Pressable onPress={toggleFavorito} style={{position:'absolute',right:5, top:3}}>
                    <Image source={require('../assets/icons/coracao.png')}style={styles.coracao}/> 
                  </Pressable>
                )}

                {!isFavorito && (
                  <Pressable onPress={toggleFavorito} style={{position:'absolute',right:5, top:3}}>
                    <Image source={require('../assets/icons/coracaoVazio.png')}style={styles.coracao}/>
                  </Pressable>
                )}

               <Text style={styles.tituloRestaurante} numberOfLines={1} ellipsizeMode="tail">
                {rest.nome}
               </Text>

               <Text style={styles.categoriaRestaurante} numberOfLines={1} ellipsizeMode="tail">
                {rest.descricao}
               </Text>

             <View style={styles.botao}>
                <Text style={styles.textoBotao}>ver mais</Text>
             </View>
            </View>
            
        </Pressable>
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

    },
    botao:{
        position:'absolute',
        bottom:10,
        right:10,
    },
    textoBotao:{
      color:'#445A14',
      fontFamily:'lemonada',
      fontSize: 10,

     

    },
    fotoRestaurante:{
      width:'100%',
      height:'100%',
      resizeMode:'cover',
      
    },
    tituloRestaurante:{
        color:'#445A14',
        fontFamily:'kavoon',
        fontSize: 20
       
  


    },
    categoriaRestaurante:{
        color: '#445A14',
        fontFamily: 'lemonada',
        fontSize: 16
  

    },
})