import React, {useState, useEffect} from "react";
import { View, Text, Pressable } from "react-native"; // Remova a importação de Text
import { styles } from "./styles";
import { PieChart } from "react-native-svg-charts";
import * as Font from 'expo-font';
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import BotaoVoltar from "../../components/BotaoVoltar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../providers/api";

function Financeiro({navigation}) {

    const [fontLoaded, setFontLoaded] = useState(false);
    const [porcentPrato, setPorcentPrato] = useState(0)
    const [porcentBebida, setPorcentBebida] = useState(0)
    const [porcentSobremesa, setPorcentSobremesa] = useState(0)
    const [filteredProducts, setFilteredProducts] = useState(null)
    const [allProducts, setAllProducts] = useState([])
    const [data, setData] = useState([])
    const [chartIsValid, setChartIsValid] = useState(false)

    useEffect(() => {
        async function loadFonts() {
        await Font.loadAsync({
            'kavoon': fontKavoon,
            'lemonada': fontLemonada,
        });
        setFontLoaded(true);
        }

        loadFonts();

        async function getData() {

            const token = await AsyncStorage.getItem("token")
            
            const result = await api.get("restaurante/financeiro/getAll", {
                headers: {
                    Authorization: token
                }
            })

            const {
                allProducts,
                filteredPurchases, 
                porcentPurchases
            } = result.data;
            
            setAllProducts(allProducts)

            if (filteredPurchases) {

                setPorcentPrato(porcentPurchases.pratos)
                setPorcentBebida(porcentPurchases.bebidas)
                setPorcentSobremesa(porcentPurchases.sobremesas)

            } else {

                setPorcentPrato(0)
                setPorcentBebida(0)
                setPorcentSobremesa(0)

                

            }
            
            setFilteredProducts(filteredPurchases)

            setData([
                {
                  key: 'Bebida',
                  value: porcentBebida,
                  svg: { fill: '#75AEED' },
                  
                },
                {
                  key: 'Sobremesas',
                  value: porcentSobremesa,
                  svg: { fill: '#45444A'},
                 
                },
                {
                  key: 'Pratos',
                  value: porcentPrato,
                  svg: { fill: '#82FC8E'},
                 
                },
            ])

            let isZero = true
            for(let i = 0 ; i < data.length ; i++) {

            if (data[i].value == 0) {
                isZero = false
                break
            }

            }

            if (!isZero) {
                setChartIsValid = true
            }

        }

        getData()

    }, []);

    if (!fontLoaded) {
        return null; 
    }

  function nextPage(filter) {

    let products
    const isValid = filteredProducts ? true : false

    switch(filter) {

        case "Bebidas":
            products = isValid ? filteredProducts.bebidas : 0
            break
        case "Pratos":
            products = isValid ? filteredProducts.pratos : 0
            break
        case "Sobremesas":
            products = isValid ? filteredProducts.sobremesas : 0
            break
    }

        navigation.navigate("Filtros", {
            products,
            allProducts
        })

  }

  return (
    <View style={styles.containerFinanceiro}>
         <BotaoVoltar onPress={() => {navigation.goBack()}}/>
        <View style={styles.subContainers}>
            <Text style={styles.title}>Financeiro</Text>
            {
                chartIsValid ? (
                    <PieChart
                        data={data}
                        style={{ height: 250, width: 250, marginTop: 30 }}
                        innerRadius={'40%'} 
                        animate={true}
                        animationDuration={500}
                        padAngle={0.02}
                    />
                ) : (
                    <Text style={styles.textNotPurchases}>Não ha compras para visualizar</Text>
                )
            }
            
            <View style={{position: "absolute", left: 10, top: "82%"}}>
                <View style={styles.boxGuia}>
                    <View style={[styles.quadradinhoCor, {backgroundColor: "#75AEED"}]} accessibilityLabel="Bebidas (50%)" importantForAccessibility="no-hide-descendants"/> 
                    <Text style={styles.textGuia} aria-hidden>Bebidas</Text>
                </View>
                <View style={styles.boxGuia}>
                    <View style={[styles.quadradinhoCor, {backgroundColor: "#45444A"}]} accessibilityLabel={`Sobremesas (50%)`} />
                    <Text style={styles.textGuia} aria-hidden>Sobremesas</Text>
                </View>
                <View style={styles.boxGuia}>
                    <View style={[styles.quadradinhoCor, {backgroundColor: "#82FC8E"}]}/>
                    <Text style={styles.textGuia}>Pratos Principais</Text>
                </View>
            </View>
        </View>
        <View style={[styles.subContainers, {paddingTop: 25}]}>
            <Text style={{
                fontFamily: "kavoon", 
                color: "#445A14",
                fontSize: 29
            }}>
                Especificações
            </Text>
            <View style={{width: "100%", alignItems: "center", gap: 30, paddingTop: 30}}>
                <Pressable style={styles.btnEspecificacoes} onPress={() => {nextPage("Bebidas")}}>
                    <Text style={styles.textBtns}>Bebidas</Text>
                </Pressable>
                <Pressable style={styles.btnEspecificacoes} onPress={() => {nextPage("Sobremesas")}}>
                    <Text style={styles.textBtns}>Sobremesas</Text>
                </Pressable>
                <Pressable style={styles.btnEspecificacoes} onPress={() => {nextPage("Pratos")}}>
                    <Text style={styles.textBtns}>Pratos Principais</Text>
                </Pressable>
            </View>
        </View>
    </View>
  );
}

export default Financeiro;