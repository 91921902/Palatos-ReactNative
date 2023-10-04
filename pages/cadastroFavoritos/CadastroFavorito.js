import React,  {useState,useEffect} from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import{styles} from './styles'
import * as Font from 'expo-font';
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import MiniLogo from '../../components/MiniLogo';
import BotaoVoltar from '../../components/BotaoVoltar';
import BolaFavoritos from '../../components/BolaFavoritos';


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
<ScrollView style={styles.scroll}>
    
<View style={styles.container}>
   
    <MiniLogo/>
    

    <View style={styles.fotoPessoa}>
       
    </View>
  
    <View style={styles.nomeView}>
        <Text style={styles.nome}>teste nome pessoa</Text>
    </View>


    <View>
        <Text style={styles.emailEsenha}>Email:</Text>
        <Text style={styles.emailEsenha}>Senha:</Text>
    </View>


    <View style={styles.favoritoView}>
        <Text style={styles.favorito}>Favoritos</Text>
    </View>


    <View>
        <BolaFavoritos />
    </View>

<View style={styles.reservaView}> 
    <Text style={styles.textoReserva}>Minhas reservas:</Text>
</View>

<View style={styles.visualizarReserva}>
    <Image
    source={require('../assets/reserva (1) 1.png')}
    />
</View>
 



</View>
</ScrollView>
  );
}