import React, { useState, useEffect } from "react"
import { styles } from "./styles"
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native"
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import * as Font from 'expo-font'
import BotaoVoltar from "../../components/BotaoVoltar"
import { ScrollView } from "react-native"

function PerfilRestaurante({ navigation, route }) {

    const [fontLoaded, setFontLoaded] = useState(false);
    const [estrela, setEstrela] = useState([]);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [foto, setFoto] = useState("");
    const [avaliacao, setAvaliacao]=useState(5);


    useEffect(() => {
       
       function carregarEstrelas(){
        for(let i = 0; i < avaliacao; i++ ){
           setEstrela([...estrela,true])
        }
        while(estrela.length <= 5){
            setEstrela([...estrela,false])
        }

    }
    carregarEstrelas()

        async function loadFonts() {
            await Font.loadAsync({
                'kavoon': fontKavoon,
                'lemonada': fontLemonada,
            });
            setFontLoaded(true);
        }

        loadFonts();
    }, []);

    if (!fontLoaded) {
        return null
    }


    return (
        <View style={styles.containerPerfilRestaurante}>

            <BotaoVoltar onPress={() => navigation.goBack()} />

            <View style={styles.boxImgemRest}>
                <View style={{
                    width: 200,
                    height: 200,
                    borderRadius: 5000,

                }}>
                    <Image source={require("../../assets/imgPadrao.png")} style={styles.imgemRest} />
                </View>
            </View>

            <View style={styles.boxNomeRest}>
                <Text style={styles.nomeRestaurante}>{nome}</Text>
            </View>

            <View style={styles.boxFavoritos}>
               
              {
                estrela.map(bool =>  {
                  if(bool){
                    return(<Image source={require(`../../assets/icons/estrela.png`)} style={styles.favoritos} />)
                  }
                  else{
                    return(<Image source={require(`../../assets/icons/estrelaVazia.png`)} style={styles.favoritos} />)
                  }
                })
              }
            </View>

            <View style={styles.boxDescricao}>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.textoScrollView}>{descricao}</Text>
                </ScrollView>
            </View>

            <View style={styles.boxMenu}>

                <TouchableOpacity style={styles.botaoMenu}>
                    <Text style={styles.textoMenu}>Ver Menu</Text>
                </TouchableOpacity>

            </View>


        </View>
    );

}

export default PerfilRestaurante