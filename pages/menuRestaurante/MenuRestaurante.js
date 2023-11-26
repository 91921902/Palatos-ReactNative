import React, {useEffect,useState} from "react";
import { ScrollView, Text, View, Pressable} from "react-native";
import { styles } from "./styles"
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import * as Font from 'expo-font';
import BotaoVoltar from "../../components/BotaoVoltar"
import MiniLogo from "../../components/MiniLogo"//temporario carrinho
import NomePrato from "../../components/NomePrato";
import BotaoCarrinho from '../../components/CarrinhoIcon';
import api from "../../providers/api";

function MenuRestaurante({navigation, route}) {
    const [fontLoaded, setFontLoaded] = useState(false);
    const [menu, setMenu]=useState([]);
    const [menuData, setMenuData] = useState([])
    const [mark, setMark] = useState("")

    const {idRestaurante} = route.params;

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                'kavoon': fontKavoon,
                'lemonada': fontLemonada,
            });
            setFontLoaded(true);
        }

        async function buscarMenu(){
            
            
            
            await api.get(`restaurante/cardapio/${idRestaurante}`)
            .then(resposta => {
                setMenu(resposta.data.menu)
                setMenuData(resposta.data.menu)
            })

        }

        buscarMenu()

        loadFonts();
    }, []);

    if (!fontLoaded) {
        return null; 
    }

    function filtrarProduto(tipo) {

        setMark(tipo)
    
        const filtro = menuData.filter(produto => produto.tipo == tipo)

        setMenu([...filtro])
                
    }
  
    return(
        <View style={styles.containerMenuRestaurante}>

            <BotaoVoltar onPress={() => navigation.goBack()}/>
            <BotaoCarrinho onPress={() => navigation.navigate("Pedidos", {
                idRest: idRestaurante
            })}/>

            <View style={styles.menuRestaurante}>

                <Pressable onPress={() => {filtrarProduto("Prato")}}>
                    <Text style={[styles.menu, mark == "Prato" && styles.marked]}>Pratos</Text>
                </Pressable>

                <Pressable onPress={() => {filtrarProduto("Bebida")}}>
                    <Text style={[styles.menu, mark == "Bebida" && styles.marked ]}>Bebidas</Text>
                </Pressable>

                <Pressable onPress={() => {filtrarProduto("Sobremesa")}}>
                    <Text style={[styles.menu, mark == "Sobremesa" && styles.marked ]}>Sobremesas</Text>
                </Pressable>
             
            </View>

            <ScrollView>
                <View style={styles.nomePrato}>
               {
                menu.map(produto =>{
                    return(
                        <NomePrato produto={produto} key={produto.codigo} navigation={navigation} idRest={idRestaurante}/>
                    )
                })
               }
                </View>

            </ScrollView>
           
        </View>

    );

}

export default MenuRestaurante