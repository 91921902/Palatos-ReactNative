import React,  {useState,useEffect} from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import{styles} from './styles'
import * as Font from 'expo-font';
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import MiniLogo from '../../components/MiniLogo';
import BotaoVoltar from '../../components/BotaoVoltar';
import BolaFavoritos from '../../components/BolaFavoritos';


export default function CadastroFavoritos(){
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


    <View style={styles.emailTelTexto}>
                 <View style={styles.direcaoEmailTel}>
                        <Text style={styles.emailEtel}>Email:</Text>
                        <Text style={styles.resposta}>resposta ex...</Text>
                    </View> 

                <View style={styles.direcaoEmailTel}>
                    <Text style={styles.emailEtel}>Tel:</Text>
                    <Text style={styles.resposta}>resposta ex...</Text>
            </View>

    </View>


    <View style={styles.favoritoView}>
        <Text style={styles.favorito}>Favoritos</Text>
    </View>

<ScrollView horizontal={true} style={styles.favoritosStar}>
        <BolaFavoritos />
       
   
</ScrollView>

<View style={styles.reservaView}> 
    <Text style={styles.textoReserva}>Minhas reservas:</Text>
</View>

<View style={styles.visualizarReserva}>
    <View style={styles.viewReserva}>
     <Image
         source={require('../../assets/reserva.png')}
         style={styles.iconeReserva}
        />
    </View>
</View>
 

</View>
</ScrollView>
  );
}