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
    const [avaliacao, setAvaliacao] = useState("0");


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

            //const {id} = route.params;
            const id = 39
            try {
                const rest = await api.get("restaurante/search/" + id)

                const {
                    nome,
                    descricao,
                    foto
                } = rest.data

                setNome(nome)
                setDescricao(descricao)
                setFoto(foto)
                setAvaliacao("5")

                carregarEstrelas()
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
                    estrela.map(bool => {
                        if (bool) {
                            return (<Image source={require(`../../assets/icons/estrela.png`)} style={styles.favoritos} />)
                        }
                        else {
                            return (<Image source={require(`../../assets/icons/estrelaVazia.png`)} style={styles.favoritos} />)
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