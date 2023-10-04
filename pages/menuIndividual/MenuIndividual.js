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
<ScrollView style={styles.scroll}>
    
<View style={styles.container}>
  <MiniLogo/>
  <BotaoVoltar/>



    <View style={styles.caixaFoto}>
    
        <View style={styles.foto}>

        </View>  

    </View>

    <View >
        <Text style={styles.tituloDoPrato}>Testando nome prato</Text>
    </View>

    <View style={styles.descricaoView}>
        <Text style={styles.descricao}>prato bem bom e gostoso,  bla bla bla blab bla bla</Text>
    </View>


    <View>
        <Text style={styles.observacoes}>Observações:</Text>
    </View>

    <View>
        <TextInput style={styles.inpObs}
            placeholder='Ex: Tirar cebola, tirar salada...'
            placeholderTextColor={'#92A14D'}
    
        />

        <Text style={styles.excluirAlgo}></Text>
    </View>

    <View style={styles.icones}>
        <Image
          source={require('../../assets/mais 1.png')}
          style={{width: 31, height: 34,}}  
        />
        <Image
         source={require('../../assets/menos 1.png')}
         style={{width: 31, height: 34,}} 
        />

    </View>

    <View style={styles.valorView}>
        <Text style={styles.valor}>R$...</Text>
    </View>

   <View style={styles.carrinhoView}>
            <Pressable style={styles.btnCarrinho}>
                <Text style={styles.textoCarrinho}>Enviar para o carrinho</Text>
            </Pressable>
        </View>


</View>
</ScrollView>
  );
}