import React from "react"
import { useState, useEffect } from "react"
import { Image, View, Text, ScrollView, TextInput } from "react-native"
import { styles } from "./styles"
import BotaoVoltar from "../../components/BotaoVoltar.js"

/* - COPIAR ISSO PARA USAR A FONT PERSONALIZADA - */

import * as Font from 'expo-font';
import fontLemonada from "../../assets/fonts/lemonada.ttf"



function NovoCadastro() {

    const [fontLoaded, setFontLoaded] = useState(false);
    const [btnReservation, setBtnReservation] = useState(true)

    useEffect(() => {
        async function loadFonts() {
        await Font.loadAsync({
            'lemonada': fontLemonada,
        });
        setFontLoaded(true);
        }

        loadFonts();
    }, []);

    if (!fontLoaded) {
        return null; 
    }

/* ----------------------------------------------- */

    

    return(
        <View style={styles.containerNovoCadastro}>
            <BotaoVoltar />                     
            <View style={styles.boxUploadPhoto}>
                <View style={styles.buttonUpload}>
                   <Image source={require("../../assets/icons/btnMaisV2.png")} style={styles.btnMais}/>
                   <Text style={{color: "white", fontFamily: "lemonada", fontSize: 10}}>Insira sua logo aqui</Text>
                </View>
            </View>
            <ScrollView style={{height: "60%"}}>
                <View style={styles.formularioCadastroRest}>
                    <View style={styles.boxInpt}>
                        <Text style={styles.formText}>Nome:</Text>
                        <TextInput  style={styles.inptFormRest} cursorColor={"#445A14"}/>
                    </View>
                    <View style={styles.boxInpt}>
                        <Text style={styles.formText}>Endereço:</Text>
                        <TextInput  style={styles.inptFormRest} cursorColor={"#445A14"}/>
                    </View>
                    <View style={styles.boxInpt}>
                        <Text style={styles.formText}>Telefone:</Text>
                        <TextInput  style={styles.inptFormRest} cursorColor={"#445A14"}/>
                    </View>
                    <View style={styles.boxInpt}>
                        <Text style={styles.formText}>Celular:</Text>
                        <TextInput  style={styles.inptFormRest} cursorColor={"#445A14"}/>
                    </View>
                    <View style={styles.boxInpt}>
                        <Text style={styles.formText}>Descrição:</Text>
                        <TextInput  
                            style={[styles.inptFormRest, {
                                padding: 10, 
                                height: 200, 
                                textAlignVertical: "top",
                                fontSize: 12
                            }]}
                            multiline={true}
                            numberOfLines={5}
                            maxLength={186}
                            cursorColor={"#445A14"}
                        />
                        <Text style={{paddingLeft: 10, fontFamily: "lemonada", color: "#445A14", fontSize: 11}}>Max 186</Text>
                    </View>
                    <View style={styles.boxInpt}>
                        <Text style={styles.formText}>Categoria:</Text>
                        <TextInput  style={styles.inptFormRest} cursorColor={"#445A14"}/>
                    </View>
                    <View style={styles.boxReserva}>
                        <Text style={{fontFamily: "lemonada", fontSize: 18, color: "#445A14"}}>Terá reserva?</Text>

                        <View>
                            <View style={styles.btnYesOrNot}>
                                <Text style={[styles.textBtnYes, {color: btnReservation ? "white" : "#92A14D"}]}>Sim</Text>
                                <Text style={[styles.textBtnNot, {color: btnReservation ? "#92A14D": "white"}]}>Não</Text>
                                <View style={[styles.controllerBtnYesOrNot, {left: btnReservation ? 3 : "", right: btnReservation ? "" : 3}]}/>
                            </View>
                        </View>

                        <View style={{
                            alignItems: "center",
                            gap: 20
                        }}>
                            <Text style={{fontFamily: "lemonada", fontSize: 12, color: "#445A14"}}>Escolha seu tempo de tolerância:</Text>
                            <TextInput 
                                keyboardType="numeric"
                                style={{width: 150, backgroundColor: "#D1C0AB", height: 40}}
                                cursorColor={"#445A14"}
                            />
                        </View>
                    </View>
                </View>
                <View style={{alignItems: "flex-end", marginTop: 30, padding: 15}}>
                    <Text style={{fontFamily: "lemonada", fontSize: 18, color: "#445A14"}}>Próximo </Text>
                </View>
            </ScrollView>
        </View>
    );

}

export default NovoCadastro