import React, {useState, useEffect} from "react";
import { Text, TextInput, View, ScrollView, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles"
import BotaoVoltar from "../../components/BotaoVoltar";
import MiniLogo from "../../components/MiniLogo";
import * as Font from 'expo-font';
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import Icon from 'react-native-vector-icons/FontAwesome';



function NovoMenu() {

    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
        await Font.loadAsync({
            'kavoon': fontKavoon,
        });
        setFontLoaded(true);
        }

        loadFonts();
    }, []);

    if (!fontLoaded) {
        return null; 
    }

    return(
        <View style={styles.containerNovoMenu}>
            <BotaoVoltar />
            <MiniLogo />
            <View style={styles.boxQuantMesas}>
                <Text style={styles.textQuantMesas}>Quantidade de mesas do seu Restaurante:</Text>
                <TextInput 
                    keyboardType="numeric"
                    style={styles.inputQuantMesas}
                />
            </View>
            <View style={styles.titleMenu}>
               <Text style={styles.textTitleMenu}>Faça seu Menu:</Text>
            </View>
            <ScrollView style={{width: "100%",height: "50%"}}>
                <View style={styles.menuItens}>

                    <View style={styles.item}>
                        <View style={styles.boxPhoto}>
                            <TouchableOpacity activeOpacity={1} style={styles.btnAddPhoto}>
                                <View style={{position: "absolute", top: 2, right: 2}}>
                                    <Icon 
                                        name="plus"
                                        size={25}
                                        color={"#445A14"}
                                        style={{alignItems: "flex-end"}}
                                    />
                                </View>
                                <View style={{width: "100%", height: "100%", alignItems: "center", justifyContent: "center"}}>
                                    <Icon 
                                        name="cutlery"
                                        size={30}
                                        color={"#445A14"}
                                    />
                                 </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.boxDescItem}>



                            
                            <TouchableOpacity style={styles.btnAddItem}>
                                <Image source={require("../../assets/icons/adicionar.png")} style={styles.imgAddItem}/>
                            </TouchableOpacity>
                        </View>    
                    </View>

                </View>
            </ScrollView>
            <View style={styles.boxFinalizarMenu}>
                <TouchableOpacity style={styles.btnFinalizarMenu}>
                    <Text style={styles.textFinalizarMenu}>Finalizar Menu</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}

export default NovoMenu