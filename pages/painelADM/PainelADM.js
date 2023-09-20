import React, {useState, useEffect} from "react";
import { Image, ScrollView, Text, Pressable, View } from "react-native";
import { styles } from "./styles"
import * as Font from 'expo-font';
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import MiniLogo from "../../components/MiniLogo";
import Icon from 'react-native-vector-icons/FontAwesome';

function PainelADM() {

    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
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
        return null; 
    }


    return(
        
        <View style={styles.containerPainelADM}>
            <MiniLogo />
            <View style={styles.boxImgRest}>
                <View style={{
                    width: 200,
                    height: 200,
                    borderRadius: 5000,
                    
                }}>
                    <Image source={require("../../assets/imgPadrao.png")} style={styles.imgRest}/>
                </View>
            </View>
            <View style={styles.boxAdm}>
                <Text style={styles.textTitleAdm}>Painel administrativo</Text>
                <ScrollView style={{width: "100%",height: "100%"}}>
                    <View style={styles.boxBtnAdm}>
                        <Pressable style={styles.btnAdm}>
                            <Text style={styles.textBtnAdm}>Editar Perfil</Text>
                            <View style={styles.boxIconCadeado}>
                                    <Icon 
                                        name="lock"
                                        size={30}
                                        color={"#445A14"}
                                    />
                            </View>
                        </Pressable>

                        <Pressable style={styles.btnAdm}>
                            <Text style={styles.textBtnAdm}>Editar Menu</Text>
                            <View style={styles.boxIconCadeado}>
                                <Image source={require("../../assets/icons/cadeado.png")} style={styles.iconCadeado}/>
                            </View>
                        </Pressable>

                        <Pressable style={styles.btnAdm}>
                            <Text style={styles.textBtnAdm}>Financeiro</Text>
                            <View style={styles.boxIconCadeado}>
                                <Image source={require("../../assets/icons/cadeado.png")} style={styles.iconCadeado}/>
                            </View>
                        </Pressable>

                        <Pressable style={styles.btnAdm}>
                            <Text style={styles.textBtnAdm}>Reservas</Text>
                        </Pressable>

                        <Pressable style={styles.btnAdm}>
                            <Text style={styles.textBtnAdm}>Comandas</Text>
                        </Pressable>

                        <Pressable style={styles.btnAdm}>
                            <Text style={styles.textBtnAdm}>Mesas</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default PainelADM