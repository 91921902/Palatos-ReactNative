    import React, {useEffect,useState} from "react";
import { ScrollView, Text, View } from "react-native";
import { styles } from "./styles"
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import * as Font from 'expo-font';
import BotaoVoltar from "../../components/BotaoVoltar"
import MiniLogo from "../../components/MiniLogo"//temporario carrinho
import NomePrato from "../../components/NomePrato";

function MenuRestaurante({navigation}) {
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
  


    return(
        <View style={styles.containerMenuRestaurante}>

             <BotaoVoltar onPress={() => navigation.goBack()}/>
             <MiniLogo/>

            <View style={styles.menuRestaurante}>

             <Text style={styles.menu}>Pratos</Text>
             <Text style={styles.menu}>Bebidas</Text>
             <Text style={styles.menu}>Sobremesas</Text>
            </View>

            <ScrollView>
                <View style={styles.nomePrato}>
                 <NomePrato/>
                </View>

            </ScrollView>
           
        </View>

    );

}

export default MenuRestaurante