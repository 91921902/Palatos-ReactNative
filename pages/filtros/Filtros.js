import React, {useState, useEffect} from "react";
import { FlatList, Pressable, ScrollView, Text, TextInput, View, Animated, TouchableWithoutFeedback, Keyboard } from "react-native";
import { styles } from "./styles"
import BotaoVoltar from "../../components/BotaoVoltar.js"
import * as Font from 'expo-font';
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import ProdutoQuantidadeLista from "../../components/ProdutoQuantidadeLista";
import DateTimePicker from '@react-native-community/datetimepicker';



function Filtros({navigation}) {
  
    const [fontLoaded, setFontLoaded] = useState(false);
    const [listProducts, setListProducts] = useState([]);
    const [filterOrNot, setFilterOrNot] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [typeFilterText, setTypeFilterText] = useState("Produtos Vendidos:");

    const [typeFilter, setTypeFilter] = useState("default");

    const [animationMargin, setAnimationMargin] = useState(new Animated.Value(-10))
    const [animationOpacity, setAnimationOpacity] = useState(new Animated.Value(0))
    /*
    {(listProducts)
        id, nome, quandidade
    }
    */

    function toggleTextFilter(type) {
        switch(type) {
            case "data":
                setTypeFilterText("Produtos vendidos nessa data:");
                break
            case "maisVendidos":
                setTypeFilterText("Produtos mais vendidos:");
                break
            case "normal":
                setTypeFilterText("Produtos vendidos:");
                break
        }
    }

    const showDatepicker = () => {
        setShowDatePicker(true);
      };
    
    const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
        setDate(selectedDate);
    }
    };

    useEffect(() => {setListProducts([{id: 1, nome: "bebida", quantidade: 3},{id: 2, nome: "bebida", quantidade: 3},{id: 3, nome: "bebida", quantidade: 3},{id: 4, nome: "bebida", quantidade: 3},{id: 5, nome: "bebida", quantidade: 3},{id: 6, nome: "bebida", quantidade: 3},{id: 7, nome: "bebida", quantidade: 3},{id: 8, nome: "bebida", quantidade: 3},{id: 9, nome: "bebida", quantidade: 3},{id: 10, nome: "bebida", quantidade: 3},{id: 11, nome: "bebida", quantidade: 3},{id: 12, nome: "bebida", quantidade: 3},{id: 13, nome: "bebida", quantidade: 3},{id: 14, nome: "bebida", quantidade: 3},])}, [])

    function animationMarginToDown() {
        setFilterOrNot(!filterOrNot)

        Animated.timing(
            animationMargin,
            {
                toValue: 5,
                duration: 200,
                useNativeDriver: false
            }
        ).start()

        Animated.timing(
            animationOpacity,
            {
                toValue: 1,
                duration: 500,
                useNativeDriver: false
            }
        ).start()

        if (filterOrNot) {
            setAnimationMargin(new Animated.Value(-10))
            setAnimationOpacity(new Animated.Value(0))   
        }

    }
    

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
           <BotaoVoltar onPress={() => navigation.goBack()}/>
           <View style={styles.boxFilter}>
                <View style={styles.boxFilterSearch}>
                    <View>
                        <Text style={styles.textFiltros}>Filtros:</Text>
                    </View>
                    <Pressable style={styles.boxSearch} onPress={animationMarginToDown}>
                        <Text style={styles.textSearch}>Buscar por:</Text>
                    </Pressable>
                </View>
                
                <View style={styles.boxFilterSearch}>
                    <View>
                        <Text style={[styles.textFiltros, {opacity: 0}]}>Filtros:</Text>
                    </View>
                    {
                        filterOrNot ? (
                            <Animated.View style={[styles.boxBtnFilter, {marginTop: animationMargin, opacity: animationOpacity}]}>
                                <Pressable style={styles.btnFilter} onPress={() => {
                                    
                                    if (typeFilter == "maisVendidos") {
                                        setTypeFilter("default")
                                        toggleTextFilter("normal")
                                    } else {
                                        setTypeFilter("maisVendidos")
                                        toggleTextFilter("maisVendidos")
                                    }
                                   
                                }}>
                                    <Text style={styles.textBtnFilter}>Mais Vendidos</Text>
                                </Pressable>
                                <Pressable style={styles.btnFilter} onPress={() => {
                                    if (typeFilter == "data") {
                                        setTypeFilter("default")
                                        toggleTextFilter("normal")
                                    } else {
                                        setTypeFilter("data")
                                        toggleTextFilter("data")
                                    }
                          
                                }}>
                                    <Text style={styles.textBtnFilter}>Data</Text>
                                </Pressable>
                            </Animated.View>
                        ) : (
                            <View/>
                        )
                    }

                </View>
           </View>
           {
            typeFilter == "data" ? (
                <View style={styles.boxInptData}>
               
                    <Pressable onPress={showDatepicker} style={styles.dateInput}>
                        <Text style={styles.textDate}>{date.toLocaleDateString()}</Text>
                    </Pressable>
                        
                        {showDatePicker && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                onChange={onDateChange}
                            />
                        )}
                </View>
            ) : (
                <View />
            )
           }
           
           <ScrollView style={styles.boxList}>
                <View style={styles.boxTextHeader}>
                    <Text style={{fontSize: 16, fontFamily: "kavoon", color: "#445A14"}}>
                        {typeFilterText}
                    </Text>
                </View>
                
                <View style={styles.headerList}>
                    <Text style={[styles.textHeaderList, {borderRightWidth: 1, borderColor: "#445A14"}]}>Nome:</Text>
                    <Text style={styles.textHeaderList}>Quantidade:</Text>
                </View>
                {
                    listProducts.length > 0 ? (
                        <FlatList 
                            keyExtractor={item => item.id}
                            data={listProducts}
                            renderItem={item => <ProdutoQuantidadeLista {...item} />}
                            scrollEnabled={false}
                        />
                    ) : (
                        <View style={styles.boxTextProductsNotFound}>
                            <Text style={{fontSize: 13, fontFamily: "kavoon", color: "#445A14"}}>
                                Produtos Não Encontrados.
                            </Text>
                        </View>
                    )
                }
           </ScrollView>
        </View>
    );

}

export default Filtros