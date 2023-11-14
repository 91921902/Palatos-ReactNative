import React from "react"
import api from "../../api/axios"
import { useEffect } from "react"
import { Image, View, Text, Pressable } from "react-native"
import { useState } from "react"
import { styles } from "./styles"
import BotaoVoltar from "../../components/BotaoVoltar.js"
import A11y from "../../providers/A11y.js"
import * as Font from 'expo-font';
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import MiniLogo from "../../components/MiniLogo"
import AsyncStorage from "@react-native-async-storage/async-storage"
function PlanosEPacotes({ navigation }) {
    const [fontLoaded, setFontLoaded] = useState(false);


    useEffect(() => {

        async function loadFonts() {
            await Font.loadAsync({
                'lemonada': fontLemonada,
                'kavoon': fontKavoon,
            });
            setFontLoaded(true);
        }

        loadFonts();


    }, [])

    async function setPlano(plano) {


        switch (plano) {

            case 1:
                await AsyncStorage.setItem("plano", JSON.stringify(1))
                navigation.navigate("NovoCadastro")
                break
            case 2:
                await AsyncStorage.setItem("plano", JSON.stringify(2))
                navigation.navigate("NovoCadastro")
                break
            case 3:
                await AsyncStorage.setItem("plano", JSON.stringify(3))
                navigation.navigate("NovoCadastro")
                break
        }

    }


    if (!fontLoaded) return null

    return (
        <View style={styles.containerPlanosEPacotes}>

            <MiniLogo />
            <BotaoVoltar onPress={() => navigation.goBack()} />

            <View style={styles.pacoteView}>
                <Text style={styles.adquira} >Adquira seu Pacote:</Text>
            </View>

            <View style={styles.body}>


                <View style={styles.botoes}>

                    <View style={styles.viewTextoPlano}>
                        <Text style={styles.plano}>Plano mensal:</Text>
                    </View>

                    <View style={styles.botaoPosition}>
                        <Pressable {...A11y.role("button")} style={styles.botaoBanner} onPress={() => setPlano(1)}>
                            <Image source={require("../../assets/BannerPlano1.png")}
                                style={styles.planoMensal}
                            />
                        </Pressable>
                    </View>


                    <View style={styles.viewTextoPlano}>
                        <Text style={styles.plano}>Plano Semestral:</Text>
                    </View>

                    <View style={styles.botaoPosition}>
                        <Pressable {...A11y.role("button")} style={styles.botaoBanner} onPress={() => setPlano(2)}>
                            <Image source={require("../../assets/bannerPlano2.png")}
                                style={styles.planoMensal}
                            />
                        </Pressable>
                    </View>


                    <View style={styles.viewTextoPlano}>
                        <Text style={styles.plano}>Plano Anual:</Text>
                    </View>

                    <View style={styles.botaoPosition}>
                        <Pressable {...A11y.role("button")} style={styles.botaoBanner} onPress={() => setPlano(3)}>
                            <Image source={require("../../assets/bannerPlano3.png")}
                                style={styles.planoMensal}
                            />
                        </Pressable>
                    </View>




                </View>

            </View>

        </View>
    );
}

export default PlanosEPacotes