import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Image } from "react-native";

export default function NomePrato() {
    return(
        <View style={styles.nomePrato}>
            <View style={styles.imagem}>
             <Image source={require('../assets/icons/fotoPrato.png')} style={styles.fotoPrato} />
            </View>

            <View style={styles.titulo}>
              <Text style={styles.textoTitulo}>Lasanha</Text>
            </View>

              <View style={styles.descricao}>
              <Text style={styles.textoDescricao}>Abobrinha, queijo,presunto</Text>
              </View>

                <View style={styles.preco}>
                <Text style={styles.textoPreco}>R$</Text>
                <Text style={styles.textoUnidade}>1 unid.</Text>

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
        flexDirection:'row'

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

    },
    descricao:{

    },
    textoDescricao:{

    },
    preco:{

    },
    textoPreco:{

    },
    textoUnidade:{

    },
 
 
})