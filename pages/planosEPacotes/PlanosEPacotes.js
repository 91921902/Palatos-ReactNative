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
function PlanosEPacotes() {
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


    if (!fontLoaded) return null

    return (
        <View style={styles.containerPlanosEPacotes}>

        <MiniLogo/>

            <View style={styles.pacoteView}>
                <Text style={styles.adquira} >Adquira seu Pacote:</Text>
            </View>

            <View style={styles.body}>

               
                <View style={styles.botoes}>
                
                    <View style={styles.viewTextoPlano}>
                        <Text style={styles.plano}>Plano mensal:</Text>
                    </View>

                    <View style={styles.botaoPosition}>
                        <Pressable {...A11y.role("button")} style={styles.botaoBanner}>
                                <Image source={require("../../assets/BannerPlano1.png")}
                                style={styles.planoMensal}
                                /> 
                            </Pressable>
                        </View>
              

                    <View style={styles.viewTextoPlano}>
                        <Text style={styles.plano}>Plano Semestral:</Text>
                    </View>

                        <View style={styles.botaoPosition}>
                        <Pressable {...A11y.role("button")} style={styles.botaoBanner}>
                                <Image source={require("../../assets/bannerPlano2.png")}
                                style={styles.planoMensal}
                                /> 
                            </Pressable>
                        </View>


                        <View style={styles.viewTextoPlano}>
                        <Text style={styles.plano}>Plano Anual:</Text>
                    </View>

                        <View style={styles.botaoPosition}>
                        <Pressable {...A11y.role("button")} style={styles.botaoBanner}>
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