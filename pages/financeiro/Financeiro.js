import React, {useState, useEffect} from "react";
import { View, Text, Pressable } from "react-native"; // Remova a importação de Text
import { styles } from "./styles";
import { PieChart } from "react-native-svg-charts";
import * as Font from 'expo-font';
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import BotaoVoltar from "../../components/BotaoVoltar";

function Financeiro({navigation}) {

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

  const data = [
    {
      key: 'A',
      value: 50, // Porcentagem
      svg: { fill: '#75AEED' },
      
    },
    {
      key: 'B',
      value: 30,
      svg: { fill: '#45444A'},
     
    },
    {
      key: 'C',
      value: 20,
      svg: { fill: '#82FC8E'},
     
    },
  ];

  return (
    <View style={styles.containerFinanceiro}>
         <BotaoVoltar onPress={() => {navigation.goBack()}}/>
        <View style={styles.subContainers}>
            <Text style={styles.title}>Financeiro</Text>
            <PieChart
                data={data}
                style={{ height: 250, width: 250, marginTop: 30 }}
                innerRadius={'40%'} 
                animate={true}
                animationDuration={500}
                padAngle={0.02}
            />
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
                <Pressable style={styles.btnEspecificacoes}>
                    <Text style={styles.textBtns}>Bebidas</Text>
                </Pressable>
                <Pressable style={styles.btnEspecificacoes}>
                    <Text style={styles.textBtns}>Sobremesas</Text>
                </Pressable>
                <Pressable style={styles.btnEspecificacoes}>
                    <Text style={styles.textBtns}>Pratos Principais</Text>
                </Pressable>
            </View>
        </View>
    </View>
  );
}

export default Financeiro;