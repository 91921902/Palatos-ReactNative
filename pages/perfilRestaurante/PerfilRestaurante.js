import React, { useState, useEffect } from "react"
import { styles } from "./styles"
import { View, Text, TextInput, TouchableOpacity, Image, RefreshControlComponent } from "react-native"
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import * as Font from 'expo-font'
import BotaoVoltar from "../../components/BotaoVoltar"
import { ScrollView } from "react-native"
import api from "../../providers/api"

function PerfilRestaurante({ navigation, route }) {

    const [fontLoaded, setFontLoaded] = useState(false);
    const [estrela, setEstrela] = useState([]);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [foto, setFoto] = useState("");
    const [avaliacao, setAvaliacao] = useState("3");


    useEffect(() => {

        function carregarEstrelas() {

            const avalicaoNumber = Number(avaliacao)
       
            let listaEstrelas = []
            for (let i = 0; i < avalicaoNumber; i++) {
                listaEstrelas.push(true)
            }
            while(listaEstrelas.length < 5) {
                listaEstrelas.push(false)
            }
  
            setEstrela(listaEstrelas)
        }

        async function buscarRestaurante() {

            const {id} = route.params;
            
            

            try {
                await api.get("restaurante/search/" + id)
                .then((response) => {
                    const restaurante = response.data.result

                    setNome(restaurante.nome)
                    setDescricao(restaurante.descricao)
                    setFoto(restaurante.foto)
                    carregarEstrelas()
                
                })
                
            } catch (err) {
                console.log(`Erro ao pegar restaurante: ${err}`)
            }
        }

        async function loadFonts() {
            await Font.loadAsync({
                'kavoon': fontKavoon,
                'lemonada': fontLemonada,
            });
            setFontLoaded(true);
        }

        loadFonts();
        buscarRestaurante()
    }, []);

    function irParaMenu() {
        const {id} = route.params;
        
        navigation.navigate("MenuRestaurante", {
            idRestaurante: id
        })
    }

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
                    {foto && <Image source={{ uri: foto }} style={styles.imgemRest} />}
                    {!foto && <Image source={require("../../assets/imgPadrao.png")} style={styles.imgemRest} />}
                </View>
            </View>

            <View style={styles.boxNomeRest}>
                <Text style={styles.nomeRestaurante}>{nome}</Text>
            </View>

            <View style={styles.boxFavoritos}>

                {
                    estrela.map((bool, index) => {
                        if (bool) {
                            return (<Image key={index} source={require(`../../assets/icons/estrela.png`)} style={styles.favoritos} />)
                        }
                        else {
                            return (<Image key={index} source={require(`../../assets/icons/estrelaVazia.png`)} style={styles.favoritos} />)
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

                <TouchableOpacity style={styles.botaoMenu} onPress={irParaMenu}>
                    <Text style={styles.textoMenu}>Ver Menu</Text>
                </TouchableOpacity>

            </View>


        </View>
    );

}

export default PerfilRestaurante