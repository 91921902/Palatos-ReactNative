import React, {useState, useEffect} from "react";
import { FlatList, Pressable, ScrollView, Text, TextInput, View, Animated, TouchableWithoutFeedback, AccessibilityInfo  } from "react-native";
import { styles } from "./styles"
import BotaoVoltar from "../../components/BotaoVoltar.js"
import * as Font from 'expo-font';
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import ProdutoQuantidadeLista from "../../components/ProdutoQuantidadeLista";
import DateTimePicker from '@react-native-community/datetimepicker';

function Filtros({navigation, route}) {
  
    const [fontLoaded, setFontLoaded] = useState(false);
    const [listProducts, setListProducts] = useState([]);
    const [filterOrNot, setFilterOrNot] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [typeFilterText, setTypeFilterText] = useState("Produtos Vendidos:");
    const [products, setProducts] = useState([])
    const [leitorDeTela, setLeitorDeTela] = useState(false)

    const [leitorDeTelaAtivo, setLeitorDeTelaAtivo] = useState(false)

    const [typeFilter, setTypeFilter] = useState("default");

    const [animationMargin, setAnimationMargin] = useState(new Animated.Value(-10))
    const [animationOpacity, setAnimationOpacity] = useState(new Animated.Value(0))

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

    useEffect(() => {

        async function loadFonts() {
            await Font.loadAsync({
                'kavoon': fontKavoon,
                'lemonada': fontLemonada,
            });
            setFontLoaded(true);
        }
    
        loadFonts();
        
        const {products, allProducts} = route.params
        const filterProducts = []     

        setListProducts(products)
        setProducts(products)

        const checkScreenReader = async () => {
            const isEnabled = await AccessibilityInfo.isScreenReaderEnabled();
            setLeitorDeTela(isEnabled);
        };
    
        checkScreenReader()
    
        const accessibilityEventListener = AccessibilityInfo.addEventListener(
            'screenReaderChanged',
            checkScreenReader
        );
    
        return () => {
        // Remove o listener ao desmontar o componente
        accessibilityEventListener.remove();
        };
       
    }, [])

    useEffect(() => {

        if (typeFilter == "maisVendidos") {

            const oldOrder = [...products]
            oldOrder.sort((a, b) => b.quantidade - a.quantidade);
            setListProducts(oldOrder)

        } else if (typeFilter == "data") {

            const productsDate = []
            let data

            if (!leitorDeTela) {

                data = new Date(date).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
            } else {
                const day = dateString.substring(0, 2);
                const month = dateString.substring(2, 4);
                const year = dateString.substring(4, 8);

                data = `${day}/${month}/${year}`
            }

            for (let obj of products) {
                if (obj.data_compra == data) {
                    productsDate.push(obj)
                }
            }

            setListProducts(productsDate)

        } 

    }, [typeFilter, date])

    function animationMarginToDown() {
        setFilterOrNot(!filterOrNot)
        setListProducts(products)
        setTypeFilter("default")

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


    if (!fontLoaded) {
        return null; 
    }

    return(
        <View style={styles.containerFiltros}>
           <BotaoVoltar onPress={() =>{navigation.goBack()}}/>
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
                                        //setTypeFilter("default")
                                        //toggleTextFilter("normal") ATENCAO
                                    } else {
                                        setTypeFilter("maisVendidos")
                                        toggleTextFilter("maisVendidos")
                                    }
                                   
                                }}>
                                    <Text style={styles.textBtnFilter}>Mais Vendidos</Text>
                                </Pressable>
                                <Pressable style={styles.btnFilter} onPress={() => {
                                    if (typeFilter == "data") {
                                        //setTypeFilter("default")
                                        //toggleTextFilter("normal")
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

                leitorDeTela ? (

                    <View>
                        <TextInput 
                            style={[styles.dateInput, {paddingLeft: 10, textAlign: "center", fontFamily: "lemonada", color:"#445A14"}]}
                            cursorColor={"#445A14"}
                            maxLength={8}
                            accessibilityLabel="Insira a data da compra para filtrar"
                            placeholder="DD/MM/YYYY"
                            placeholderTextColor={"#445A14"}
                            keyboardType="numeric"
                        />
                    </View>

                ) : (

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
                )
                
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

                <FlatList 
                    keyExtractor={item => item.id}
                    data={listProducts}
                    renderItem={item => <ProdutoQuantidadeLista {...item} />}
                    scrollEnabled={false}
                />
                
           </ScrollView>
        </View>
    );

}

export default Filtros