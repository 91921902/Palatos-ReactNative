import React,  {useState,useEffect} from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import{styles} from './styles'
import * as Font from 'expo-font';
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import MiniLogo from '../../components/MiniLogo';
import BotaoVoltar from '../../components/BotaoVoltar';
import BolaFavoritos from '../../components/BolaFavoritos';
import api from '../../providers/api'
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastroFavoritos({navigation}){
    const [fontLoaded, setFontLoaded] = useState(false);
    const [nome, setNome]= useState('');
    const [email,setEmail]=useState('');
    const [telefone, setTelefone]=useState('');
    const [favoritos, setFavoritos]=useState([{}]);
    const [reservas, setReservas]=useState([]);

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

    async function buscarDados(){

        const token=await AsyncStorage.getItem('token')
        let id

        try {
            const decode=jwtDecode(token)
            id=decode.userId
        } catch (error) {
            navigation.navigate("")
            console.log(error)
        }

        const usuario= await api.get(`user/getUser/${id}`)
        .then(response => response.data)

        setNome(usuario.nome)
        setEmail(usuario.email)
        setTelefone(usuario.tel)
        setFavoritos(usuario.favoritos)
        setReservas(usuario.reservas)
        

    }


return(
<ScrollView contentContainerStyle={styles.scroll}>

<View style={styles.container}>
   
    <MiniLogo/>
    <BotaoVoltar/>
    
    <View style={styles.fotoPessoa}>
       
    </View>
  
    <View style={styles.nomeView}>
        <Text style={styles.nome}>{nome}</Text>
    </View>


    <View style={styles.emailTelTexto}>
                 <View style={styles.direcaoEmailTel}>
                        <Text style={styles.emailEtel}>Email:</Text>
                        <Text style={styles.resposta}>{email}</Text>
                    </View> 

                <View style={styles.direcaoEmailTel}>
                    <Text style={styles.emailEtel}>Tel:</Text>
                    <Text style={styles.resposta}>{telefone}</Text>
            </View>
    </View>

    <View >
        <Text style={styles.favorito}>Favoritos</Text>
    </View>

<ScrollView horizontal={true} style={styles.favoritosStar}>
        {
            favoritos.map(favorito => {
                return(
                    <BolaFavoritos restaurante={favorito} navigation={navigation}/>
                )
            })
        }
       
   
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