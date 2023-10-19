import React, {useState, useEffect} from "react";
import { Image, ScrollView, Text, Pressable, View } from "react-native";
import { styles } from "./styles"
import * as Font from 'expo-font';
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import MiniLogo from "../../components/MiniLogo";
import Icon from 'react-native-vector-icons/FontAwesome';
import jwtDecode from "jwt-decode"

import api from "../../providers/api"
import AsyncStorage from "@react-native-async-storage/async-storage";

function PainelADM({navigation, route}) {

    const [fontLoaded, setFontLoaded] = useState(false);
    const [fotoRest, setFotoRest] = useState("")

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                'kavoon': fontKavoon,
                'lemonada': fontLemonada,
            });
            setFontLoaded(true);
        }

        loadFonts();

        async function getData() {

            const token = await AsyncStorage.getItem("token")
            let idRestaurante
            try {
               
                const decoded = jwtDecode(token)
                if (decoded) {
                    idRestaurante = decoded.idRestaurante; 

                } else {
                    navigation.navigate("PainelADM", {message: "Erro de Autenticação"})
                }

            } catch (error) {

                navigation.navigate("PainelADM", {message: "Erro de Autenticação"})

            }
            
            await api.get(`/restaurante/${idRestaurante}`).then(response => {
                const restauranteData = response.data
                const restaurante = restauranteData.result
                AsyncStorage.setItem("restaurante", JSON.stringify(restaurante))
                setFotoRest(restaurante.foto)
            })
        }

        if (route.params) {
            
            const { restaurante } = route.params;

            if (restaurante) {
                
                AsyncStorage.setItem("restaurante", JSON.stringify(restaurante.resultRestaurant))
                setFotoRest(restaurante.resultRestaurant.foto)

            } else {
                
                getData()
                
            }
            
        } else {

            getData()

        }

    }, []);

    if (!fontLoaded) {
        return null; 
    }

    return(
        
        <View style={styles.containerPainelADM}>
            <MiniLogo />
            <View style={styles.boxImgRest}>
                <View style={{
                    width: 200,
                    height: 200,
                }}>
                    {fotoRest && <Image source={{uri: fotoRest}} style={styles.imgRest}/>}
                    {!fotoRest && <Image source={require("../../assets/imgPadrao.png")} style={styles.imgRest}/>}
                </View>
            </View>
            <View style={styles.boxAdm}>
                <Text style={styles.textTitleAdm}>Painel administrativo</Text>
                <ScrollView style={{width: "100%",height: "100%"}}>
                    <View style={styles.boxBtnAdm}>
                        <Pressable style={styles.btnAdm} accessibilityRole='button'>
                            <Text style={styles.textBtnAdm}>Editar Perfil</Text>
                            <View style={styles.boxIconCadeado}>
                                    <Icon 
                                        name="lock"
                                        size={30}
                                        color={"#445A14"}
                                    />
                            </View>
                        </Pressable>

                        <Pressable style={styles.btnAdm} accessibilityRole='button'>
                            <Text style={styles.textBtnAdm}>Editar Menu</Text>
                            <View style={styles.boxIconCadeado}>
                                <Icon 
                                    name="lock"
                                    size={30}
                                    color={"#445A14"}
                                />
                            </View>
                        </Pressable>

                        <Pressable style={styles.btnAdm} accessibilityRole='button'>
                            <Text style={styles.textBtnAdm}>Financeiro</Text>
                            <View style={styles.boxIconCadeado}>
                                <Icon 
                                    name="lock"
                                    size={30}
                                    color={"#445A14"}
                                />
                            </View>
                        </Pressable>

                        <Pressable style={styles.btnAdm} accessibilityRole='button'>
                            <Text style={styles.textBtnAdm}>Reservas</Text>
                        </Pressable>

                        <Pressable style={styles.btnAdm} accessibilityRole='button'>
                            <Text style={styles.textBtnAdm}>Comandas</Text>
                        </Pressable>

                        <Pressable style={styles.btnAdm} accessibilityRole='button'>
                            <Text style={styles.textBtnAdm}>Mesas</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default PainelADM