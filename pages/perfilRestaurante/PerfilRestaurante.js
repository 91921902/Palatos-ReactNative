import React,{useState,useEffect} from "react"
import { styles } from "./styles"
import {  View, Text, TextInput, TouchableOpacity, Image } from "react-native"
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import * as Font from 'expo-font'
import BotaoVoltar from "../../components/BotaoVoltar"
import { ScrollView } from "react-native"

function PerfilRestaurante({navigation}) {

    const [fontLoaded, setFontLoaded] = useState(false);
    const[estrela, setEstrela]=useState(['estrela','estrela','estrela','estrelaVazia','estrelaVazia']);
 

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
        return null
    }


    return(
        <View style={styles.containerPerfilRestaurante}>

        <BotaoVoltar onPress={() => navigation.goBack()}/>

            <View style={styles.boxImgemRest}>
                <View style={{
                    width: 200,
                    height: 200,
                    borderRadius: 5000,
                    
                }}>
                    <Image source={require("../../assets/imgPadrao.png")} style={styles.imgemRest} />
                </View>
            </View>

            <View style={styles.boxNomeRest}>
                <Text style={styles.nomeRestaurante}>Nome Restaurante</Text>
            </View>

             <View style={styles.boxFavoritos}>
                <Image source={require(`../../assets/icons/estrela.png`)}style={styles.favoritos}/>
                <Image source={require(`../../assets/icons/estrela.png`)}style={styles.favoritos}/>
                <Image source={require(`../../assets/icons/estrela.png`)}style={styles.favoritos}/>
                <Image source={require(`../../assets/icons/estrela.png`)}style={styles.favoritos}/>
                <Image source={require(`../../assets/icons/estrela.png`)}style={styles.favoritos}/>
            </View>

            <View style={styles.boxDescricao}>
                <ScrollView style={styles.scrollView}>
                 <Text style={styles.textoScrollView}>oiopioioioioioijdxhjahudgjwqhdbj,
                 hxcgjuvdcesvchgvcdhnesvchhgsvcdxsvjxvasxcgvhgvedvcxjcvdsghvxsvxjvsdvdhx
                 cgjuvdcesvchgvcdhnesvchhgsvcdxsvjxvasxcgvhgvedvcxjcvdsghvxsvxjvsdvdhxcg
                 juvdcesvchgvcdhnesvchhgsvcdxsvjxvasxcgvhgvedvcxjcvdsghvxsvxjvsdvdhxcgju
                 vdcesvchgvcdhnesvchhgsvcdxsvjxvasxcgvhgvedvcxjcvdsghvxsvxjvsdvd</Text>
                </ScrollView>
            </View>

            <View style={styles.boxMenu}>
                
                <TouchableOpacity style={styles.botaoMenu}>
                     <Text style={styles.textoMenu}>Ver Menu</Text>
                </TouchableOpacity>
                
            </View>
            

        </View>
    );

}

export default PerfilRestaurante