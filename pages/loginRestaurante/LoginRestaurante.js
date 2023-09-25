import React,  {useState,useEffect} from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';
import{styles} from './styles'
import * as Font from 'expo-font';
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import fontLemonada from "../../assets/fonts/lemonada.ttf"

export default function LoginRestaurante() {

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

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/palatosLogo.png')}
      />
      
      <Text style={styles.emailSenha}>Email</Text>
      <TextInput style={styles.inputs} />

      <Text style={styles.emailSenha}>Senha</Text>
      <TextInput style={styles.inputs} />

     <Pressable>
         <Text style={styles.textoLembrar}>Esqueceu sua senha?</Text>
    </Pressable>


      <Pressable style={styles.btnEntrar}>

        <Text style={styles.palavraEntrar}>Entrar</Text>
        
        </Pressable>

        <View style={styles.containerLembrar}>
            <Pressable style={styles.lembreDeMim}>
                <View></View>
            </Pressable>
            <Text style={styles.textoLembrar}>Lembrar de mim</Text>
        </View>
    </View>

    
  );
}
