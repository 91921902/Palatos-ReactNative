import React, {useState, useEffect} from "react";
import { FlatList, Pressable, ScrollView, Text, TextInput, View, Animated, TouchableWithoutFeedback, Keyboard } from "react-native";
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
            
        /* for(let oldObj of products) {
            
            let isNew = true

            for (let newObj of filterProducts) {
            
                for (let prop in newObj) {
                
                    if (newObj[prop] == oldObj[prop] || prop == "id" || prop == "data_compra") {
                    
                        if (prop != "id" && prop != "data_compra" && prop != "tipo") {
                            
                            const index = filterProducts.findIndex(objeto => objeto.id === newObj.id);
                            
                            if (isNaN(filterProducts[index].quantidade) || filterProducts[index].quantidade == 0) {
                                filterProducts[index].quantidade = 1
                            } else {
                                filterProducts[index].quantidade += 1
                            }

                            isNew = false
                        }
                    } 
                }
            }

            if (filterProducts.length == 0 || isNew) {
                filterProducts.push(oldObj)
            }
            
        }

        for (let i = 0 ; i < filterProducts.length ; i++) {

            if (isNaN(filterProducts[i].quantidade)) {
                filterProducts[i].quantidade = 1
            }

        } */

        setListProducts(products)
        setProducts(products)
        
       
    }, [])

    useEffect(() => {


        

        if (typeFilter == "maisVendidos") {

            const oldOrder = [...products]
            oldOrder.sort((a, b) => b.quantidade - a.quantidade);
            setListProducts(oldOrder)

        } else if (typeFilter == "data") {

            const productsDate = []

            const data = new Date(date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              });

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