import React,  {useState,useEffect} from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import{styles} from './styles'
import * as Font from 'expo-font';
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import MiniLogo from '../../components/MiniLogo';
import BotaoVoltar from '../../components/BotaoVoltar';


export default function MenuIndividual(){
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
<View style={styles.container}>
  <MiniLogo/>
  <BotaoVoltar/>



    <View style={styles.caixaFoto}>
    
        <View style={styles.foto}>

        </View>  

    </View>

    <View>
        <Text style={styles.tituloDoPrato}>Testando nome prato</Text>
    </View>



</View>
  );
}