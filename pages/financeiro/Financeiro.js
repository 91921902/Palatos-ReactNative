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

            //const token = await AsyncStorage.getItem("token")
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpZFJlc3RhdXJhbnRlIjoxMCwiaWF0IjoxNzAwNTg4ODk5LCJleHAiOjIzMDUzODg4OTl9.9jfBlhnrjdGGCqa8JNiLwg3LfLKbmxbbDJnaex7vL1k"

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

        }

        getDataFake()

        function getDataFake() {

            const allProducts = [
                { id: 0, nome: "Camarão", preco: 23.3, tipo: "prato", data_compra: "19/12/2023", quantidade: 10 },
                { id: 1, nome: "Salmão", preco: 28.5, tipo: "prato", data_compra: "19/12/2023", quantidade: 13 },
                { id: 2, nome: "Salada", preco: 12.8, tipo: "prato", data_compra: "19/12/2023", quantidade: 19 },
                { id: 3, nome: "Bife", preco: 18.9, tipo: "prato", data_compra: "19/12/2023", quantidade: 1 },
                { id: 4, nome: "Pizza", preco: 14.5, tipo: "prato", data_compra: "19/12/2023", quantidade: 1 },
                { id: 5, nome: "Lasanha", preco: 16.7, tipo: "prato", data_compra: "18/12/2023", quantidade: 1 },
                { id: 6, nome: "Frango", preco: 15.2, tipo: "prato", data_compra: "18/12/2023", quantidade: 6 },
                { id: 7, nome: "Hambúrguer", preco: 11.4, tipo: "prato", data_compra: "18/12/2023", quantidade: 1 },
                { id: 8, nome: "Macarrã", preco: 13.7, tipo: "prato", data_compra: "18/12/2023", quantidade: 10 },
                { id: 9, nome: "Risoto", preco: 17.3, tipo: "prato", data_compra: "18/12/2023", quantidade: 1 },
                { id: 10, nome: "Água Mineral", preco: 2.5, tipo: "bebida", data_compra: "19/12/2023", quantidade: 1 },
                { id: 11, nome: "Refrigerante", preco: 3.0, tipo: "bebida", data_compra: "19/12/2023", quantidade: 14 },
                { id: 12, nome: "Suco de Laranja", preco: 4.2, tipo: "bebida", data_compra: "19/12/2023", quantidade: 13 },
                { id: 13, nome: "Cerveja Artesanal", preco: 6.8, tipo: "bebida", data_compra: "19/12/2023", quantidade: 1 },
                { id: 14, nome: "Vinho Tinto", preco: 9.3, tipo: "bebida", data_compra: "19/12/2023", quantidade: 1 },
                { id: 15, nome: "Caipirinha", preco: 7.1, tipo: "bebida", data_compra: "18/12/2023", quantidade: 1 },
                { id: 16, nome: "Coquetel de Frutas", preco: 5.9, tipo: "bebida", data_compra: "18/12/2023", quantidade: 1 },
                { id: 17, nome: "Limonada", preco: 3.5, tipo: "bebida", data_compra: "18/12/2023", quantidade: 1 },
                { id: 18, nome: "Chá Gelado", preco: 2.7, tipo: "bebida", data_compra: "18/12/2023", quantidade: 1 },
                { id: 19, nome: "Smoothie", preco: 4.9, tipo: "bebida", data_compra: "18/12/2023", quantidade: 1 },
                { id: 20, nome: "Cheesecake", preco: 6.7, tipo: "sobremesa", data_compra: "19/12/2023", quantidade: 1 },
                { id: 21, nome: "Tiramisù", preco: 8.2, tipo: "sobremesa", data_compra: "19/12/2023", quantidade: 1 },
                { id: 22, nome: "Mousse de Chocolate", preco: 5.5, tipo: "sobremesa", data_compra: "19/12/2023", quantidade: 1 },
                { id: 23, nome: "Pudim de Leite", preco: 4.8, tipo: "sobremesa", data_compra: "19/12/2023", quantidade: 1 },
                { id: 24, nome: "Torta de Maçã", preco: 7.3, tipo: "sobremesa", data_compra: "19/12/2023", quantidade: 1 },
                { id: 25, nome: "Brownie com Sorvete", preco: 6.4, tipo: "sobremesa", data_compra: "18/12/2023", quantidade: 1 },
                { id: 26, nome: "Creme Brûlée", preco: 8.9, tipo: "sobremesa", data_compra: "18/12/2023", quantidade: 1 },
                { id: 27, nome: "Sorvete de Baunilha", preco: 3.2, tipo: "sobremesa", data_compra: "18/12/2023", quantidade: 1 },
                { id: 28, nome: "Muffin de Blueberry", preco: 2.9, tipo: "sobremesa", data_compra: "18/12/2023", quantidade: 1 },
                { id: 29, nome: "Cupcake de Chocolate", preco: 3.5, tipo: "sobremesa", data_compra: "18/12/2023", quantidade: 1 },
            ]

            const filteredPurchases = {
                pratos: [{ id: 0, nome: "Camarão", preco: 23.3, tipo: "prato", data_compra: "19/12/2023", quantidade: 10},
                { id: 1, nome: "Salmão", preco: 28.5, tipo: "prato", data_compra: "19/12/2023", quantidade: 13},
                { id: 2, nome: "Salada", preco: 12.8, tipo: "prato", data_compra: "19/12/2023", quantidade: 19},
                { id: 3, nome: "Bife", preco: 18.9, tipo: "prato", data_compra: "19/12/2023", quantidade: 11},
                { id: 4, nome: "Pizza", preco: 14.5, tipo: "prato", data_compra: "19/12/2023", quantidade: 13},
                { id: 5, nome: "Lasanha", preco: 16.7, tipo: "prato", data_compra: "18/12/2023", quantidade: 14 },
                { id: 6, nome: "Frango", preco: 15.2, tipo: "prato", data_compra: "18/12/2023", quantidade: 65 },
                { id: 7, nome: "Hambúrguer", preco: 11.4, tipo: "prato", data_compra: "18/12/2023", quantidade: 11 },
                { id: 8, nome: "Macarrão", preco: 13.7, tipo: "prato", data_compra: "18/12/2023", quantidade: 10 },
                { id: 9, nome: "Risoto", preco: 17.3, tipo: "prato", data_compra: "18/12/2023", quantidade: 12 },
                ],

                bebidas: [{ id: 10, nome: "Água Mineral", preco: 2.5, tipo: "bebida", data_compra: "19/12/2023", quantidade: 1},
                {id:11, nome: "Refrigerante", preco: 3.0, tipo: "bebida", data_compra: "19/12/2023", quantidade: 14},
                {id: 12, nome: "Suco de Laranja", preco: 4.2, tipo: "bebida", data_compra: "19/12/2023", quantidade: 13},
                { id: 13, nome: "Cerveja Artesanal", preco: 6.8, tipo: "bebida", data_compra: "12/12/2023", quantidade: 13},
                { id: 14, nome: "Vinho Tinto", preco: 9.3, tipo: "bebida", data_compra: "18/12/2023", quantidade: 11},
                { id: 15, nome: "Caipirinha", preco: 7.1, tipo: "bebida", data_compra: "18/12/2023", quantidade: 14 },
                { id: 16, nome: "Coquetel de Frutas", preco: 5.9, tipo: "bebida", data_compra: "18/12/2023", quantidade: 1 },
                { id: 17, nome: "Limonada", preco: 3.5, tipo: "bebida", data_compra: "18/12/2023", quantidade: 15 },
                { id: 18, nome: "Chá Gelado", preco: 2.7, tipo: "bebida", data_compra: "18/12/2023", quantidade: 13 },
                { id: 19, nome: "Smoothie", preco: 4.9, tipo: "bebida", data_compra: "18/12/2023", quantidade: 11 },
                ],

                sobremesas: [{ id: 20, nome: "Cheesecake", preco: 6.7, tipo: "sobremesa", data_compra: "19/12/2023", quantidade: 14}
                ,{ id: 21, nome: "Tiramisù", preco: 8.2, tipo: "sobremesa", data_compra: "19/12/2023", quantidade: 16}
                ,{ id: 22, nome: "Mousse de Chocolate", preco: 5.5, tipo: "sobremesa", data_compra: "19/12/2023", quantidade: 12}
                ,{ id: 23, nome: "Pudim de Leite", preco: 4.8, tipo: "sobremesa", data_compra: "19/12/2023", quantidade: 14}
                ,{ id: 24, nome: "Torta de Maçã", preco: 7.3, tipo: "sobremesa", data_compra: "19/12/2023", quantidade: 17}
                ,{ id: 25, nome: "Brownie com Sorvete", preco: 6.4, tipo: "sobremesa", data_compra: "18/12/2023", quantidade: 15 }
                ,{ id: 26, nome: "Creme Brûlée", preco: 8.9, tipo: "sobremesa", data_compra: "18/12/2023", quantidade: 19 }
                ,{ id: 27, nome: "Sorvete de Baunilha", preco: 3.2, tipo: "sobremesa", data_compra: "18/12/2023", quantidade: 15 }
                ,{ id: 28, nome: "Muffin de Blueberry", preco: 2.9, tipo: "sobremesa", data_compra: "18/12/2023", quantidade: 14 }
                ,{ id: 29, nome: "Cupcake de Chocolate", preco: 3.5, tipo: "sobremesa", data_compra: "18/12/2023", quantidade: 11 },
                ]
            }
                        
            setAllProducts(allProducts)

            setPorcentPrato(60)
            setPorcentBebida(30)
            setPorcentSobremesa(10)

            setFilteredProducts(filteredPurchases)

        }

    }, []);

    useEffect(() => {
       
        setData([
            {
                key: 'Bebida',
                value: porcentBebida,
                svg: { fill: '#75AEED' },
            },
            {
                key: 'Sobremesas',
                value: porcentSobremesa,
                svg: { fill: '#45444A' },
            },
            {
                key: 'Pratos',
                value: porcentPrato,
                svg: { fill: '#82FC8E' },
            },
        ]);
    
        const shouldShowChart = porcentBebida !== 0 || porcentSobremesa !== 0 || porcentPrato !== 0;

        setChartIsValid(shouldShowChart);

    }, [porcentBebida, porcentSobremesa, porcentPrato]);

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
                chartIsValid && 
                    <PieChart
                        data={data}
                        style={{ height: 250, width: 250, marginTop: 30 }}
                        innerRadius={'40%'} 
                        animate={true}
                        animationDuration={500}
                        padAngle={0.02}
                    />
            }   

            {!chartIsValid && <Text style={styles.textNotPurchases}>Não há compras para visualizar</Text>}
                    
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