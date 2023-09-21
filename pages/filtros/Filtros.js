import React, {useState, useEffect} from "react";
import { FlatList, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { styles } from "./styles"
import BotaoVoltar from "../../components/BotaoVoltar.js"
import * as Font from 'expo-font';
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import ProdutoQuantidadeLista from "../../components/ProdutoQuantidadeLista";

function Filtros() {
  
    const [fontLoaded, setFontLoaded] = useState(false);
    const [listProducts, setListProducts] = useState([]);

    /*
    {(listProducts)
        id, nome, quandidade
    }
    */
    useEffect(() => {setListProducts([{id: 1, nome: "bebida", quantidade: 3},{id: 2, nome: "bebida", quantidade: 3},{id: 3, nome: "bebida", quantidade: 3},{id: 4, nome: "bebida", quantidade: 3},{id: 5, nome: "bebida", quantidade: 3},{id: 6, nome: "bebida", quantidade: 3},{id: 7, nome: "bebida", quantidade: 3},{id: 8, nome: "bebida", quantidade: 3},{id: 9, nome: "bebida", quantidade: 3},{id: 10, nome: "bebida", quantidade: 3},{id: 11, nome: "bebida", quantidade: 3},{id: 12, nome: "bebida", quantidade: 3},{id: 13, nome: "bebida", quantidade: 3},{id: 14, nome: "bebida", quantidade: 3},])}, [])

    

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
        <View style={styles.containerFiltros}>
           <BotaoVoltar />
           <View style={styles.boxFilter}>
                <View style={[styles.metadeFiltro, {paddingBottom: 25}]}>
                    <Text style={{
                        color: "#445A14",
                        fontSize: 26,
                        fontFamily: "kavoon"
                    }}>Filtros:</Text>
                </View>
                <View style={[styles.metadeFiltro, {flexDirection: "column", justifyContent: "flex-end"}]}>
                    <View style={{
                        alignItens: "center", 
                        justifyContent: "center",
                        backgroundColor: "#D1C0AB",
                        width: "80%",
                        marginTop: 5
                    }}>
                        <Text style={{
                            color: "#445A14",
                            fontSize: 14,
                            fontFamily: "lemonada",
                            textAlign: "center"
                        }}>Buscar por:</Text>
                    </View>

                    <View style={styles.boxBtnFilter}>
                        <Pressable style={styles.btnFilter}>
                            <Text style={styles.textBtnFilter}>Mais Vendidos</Text>
                        </Pressable>
                        <Pressable style={styles.btnFilter}>
                            <Text style={styles.textBtnFilter}>Data</Text>
                        </Pressable>
                    </View>
                </View>
           </View>
           <View style={styles.boxInptData}>
                <TextInput 
                    style={styles.textInput} 
                    placeholder="Insira a data a verificar:"
                    placeholderTextColor="#445A14"
                    cursorColor={"#445A14"}
                />
           </View>
           <ScrollView style={styles.boxList}>
                <Text style={{width:"100%", textAlign: "center", height: "10%", verticalAlign: "middle", fontSize: 16, fontFamily: "kavoon", color: "#445A14", borderBottomWidth: 1, borderColor: "#445A14"}}>
                    Lista produtos mais vendidos:
                </Text>
                <View style={styles.headerList}>
                    <Text style={[styles.textHeaderList, {borderRightWidth: 1, borderColor: "#445A14"}]}>Nome:</Text>
                    <Text style={styles.textHeaderList}>Quantidade:</Text>
                </View>
                {
                    listProducts ? (
                        <FlatList 
                            keyExtractor={item => item.id}
                            data={listProducts}
                            renderItem={item => <ProdutoQuantidadeLista {...item} />}
                            scrollEnabled={false}
                        />
                    ) : (
                        <View />
                    )
                }
                
                
           </ScrollView>
        </View>
    );

}

export default Filtros