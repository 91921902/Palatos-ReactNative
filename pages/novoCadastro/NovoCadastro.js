import React from "react"
import { useState, useEffect } from "react"
import { Image, View, Text, ScrollView, TextInput, Animated, Easing, Pressable, ToastAndroid, Platform } from "react-native"
import { styles } from "./styles"
import BotaoVoltar from "../../components/BotaoVoltar.js"
import { useFormTools } from "../../providers/FormRestContext"
import * as ImagePicker from 'expo-image-picker';



/* - COPIAR ISSO PARA USAR A FONT PERSONALIZADA - */

import * as Font from 'expo-font';
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import CheckBoxCategory from "../../components/CheckBoxCategory"



function NovoCadastro() {

    const [fontLoaded, setFontLoaded] = useState(false);
    const [categoriasVisiveis, setCategoriasVisiveis] = useState(false)
    const [filtroCategoria, setFiltroCategoria] = useState("")

    // FORM

    const [btnReservation, setBtnReservation] = useState(true)
    const [formData, setFormData] = useState(new FormData())
    const [nome, setNome] = useState("")
    const [endereco, setEndereco] = useState("")
    const [telefone, setTelefone] = useState("")
    const [celular, setcelular] = useState("")
    const [descricao, setDescricao] = useState("")
    const [foto, setFoto] = useState("") //falta carregar a foto quando selecionada
    const [tempoTolerancia, setTempoTolerancia] = useState("")
    const { categorias } = useFormTools()

    //----------------------------------------------------------------

    

    const animatedValue = new Animated.Value(btnReservation ? 0 : 1);

    const toggleReservation = () => {
        Animated.timing(animatedValue, {
        toValue: btnReservation ? 1 : 0,
        duration: 1000, // Duração da animação em milissegundos
        easing: Easing.linear, // Easing para uma transição suave
        useNativeDriver: false, // Deixe como 'false' para animações de estilo
        }).start();

        setBtnReservation(!btnReservation);
    };

    useEffect(() => {
        async function loadFonts() {
        await Font.loadAsync({
            'lemonada': fontLemonada,
        });
        setFontLoaded(true);
        }

        loadFonts();

    }, []);

    if (!fontLoaded) {
        return null; 
    }

/* ----------------------------------------------- */
    

    function nextFormPage() {

        
        formData.append('nome', nome)
        formData.append('endereco', endereco)
        formData.append('telefone', telefone)
        formData.append('celular',celular)
        formData.append('descricao', descricao)
        formData.append('categorias', categorias)
        formData.append('reservasAtivas', btnReservation)
        formData.append('tempoTolerancia', tempoTolerancia)
        //avaliacao comida pendente
        setFormData(formData)

        //ir para a proxima pagina passando esse formData como parametro!
    }

    const pickImage = async () => {
        
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
            setFoto(result.assets[0].uri);

            const fileName = result.assets[0].uri.substring(result.assets[0].uri.lastIndexOf("/") + 1, result.assets[0].uri.length)
            const fileType = fileName.split(".")[1]

            formData.append('file', JSON.parse(JSON.stringify({
                name: fileName,
                uri: result.assets[0].uri,
                type: 'image/' + fileType
            })))

            setFormData(formData)

        } else {
            ToastAndroid.show("Operação Cancelada", 600)
        }
    };
    

    return(
        <View style={styles.containerNovoCadastro}>
            <BotaoVoltar />                     
            <View style={styles.boxUploadPhoto}>
                <Pressable style={styles.buttonUpload} onPress={pickImage}>
                   <Image source={require("../../assets/icons/btnMaisV2.png")} style={styles.btnMais}/>
                   <Text style={{color: "white", fontFamily: "lemonada", fontSize: 10}}>Insira sua logo aqui</Text>
                </Pressable>
            </View>
            <ScrollView style={{height: "60%"}}>
                <View style={styles.formularioCadastroRest}>
                    <View style={styles.boxInpt}>
                        <Text style={styles.formText}>Nome do Restaurente:</Text>
                        <TextInput  style={styles.inptFormRest} cursorColor={"#445A14"} accessibilityLabel="Nome:"/>
                    </View>
                    <View style={styles.boxInpt}>
                        <Text style={styles.formText}>Endereço:</Text>
                        <TextInput  style={styles.inptFormRest} cursorColor={"#445A14"} accessibilityLabel="Endereço:"/>
                    </View>
                    <View style={styles.boxInpt}>
                        <Text style={styles.formText}>Telefone (opcional):</Text>
                        <TextInput  style={styles.inptFormRest} cursorColor={"#445A14"} accessibilityLabel="Telefone (opcional):"/>
                    </View>
                    <View style={styles.boxInpt}>
                        <Text style={styles.formText}>Celular:</Text>
                        <TextInput  style={styles.inptFormRest} cursorColor={"#445A14"} accessibilityLabel="Celular:"/>
                    </View>
                    <View style={styles.boxInpt}>
                        <Text style={styles.formText}>Descrição do Restaurante:</Text>
                        <TextInput  
                            style={[styles.inptFormRest, {
                                padding: 10, 
                                height: 200, 
                                textAlignVertical: "top",
                                fontSize: 12
                            }]}
                            multiline={true}
                            numberOfLines={5}
                            maxLength={186}
                            cursorColor={"#445A14"}
                            accessibilityRole="text"
                            accessibilityLabel="Descrição do restaurante:"
                        />
                        <Text style={{paddingLeft: 10, fontFamily: "lemonada", color: "#445A14", fontSize: 11}}>Max 186</Text>
                    </View>
                    <View style={styles.boxInpt}>
                        <Text style={styles.formText}>Categoria:</Text>
                        <TextInput  style={styles.inptFormRest} cursorColor={"#445A14"} onPressIn={() => setCategoriasVisiveis(true)} onChangeText={setFiltroCategoria} value={filtroCategoria} accessibilityLabel="Categoria:"/>
                       
                        {
                            categoriasVisiveis ? (<CheckBoxCategory filter={filtroCategoria}/>) : (<View />)
                        }  
                       
                    </View>
                    <View style={styles.boxReserva}>
                        <Text style={{fontFamily: "lemonada", fontSize: 18, color: "#445A14"}}>Terá reserva?</Text>

                        <View>    
                            <View style={styles.btnYesOrNot} accessibilityRole="button">
                                <Animated.View
                                    style={[
                                        styles.controllerBtnYesOrNot,
                                        {
                                        left: animatedValue.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ['2%', '50%'],
                                        }),
                                        },
                                    ]}
                                />
                                <Pressable  onPress={toggleReservation}  style={{width: "50%"}}>
                                    <Text style={[styles.textBtnYes, { color: btnReservation ? "white" : "#92A14D" }]}>Sim</Text>
                                </Pressable>
                                <Pressable  onPress={toggleReservation} style={{width: "50%"}}>
                                    <Text style={[styles.textBtnNot, { color: btnReservation ? "#92A14D" : "white" }]}>Não</Text>
                                </Pressable>
                            </View>
                        </View>
                                     
                        {
                            btnReservation ? (
                                <View style={{
                                    alignItems: "center",
                                    gap: 20
                                }}>
                                    <Text style={{fontFamily: "lemonada", fontSize: 12, color: "#445A14"}}>Escolha seu tempo de tolerância:</Text>
                                    <TextInput 
                                        keyboardType="numeric"
                                        onChangeText={setTempoTolerancia}
                                        value={tempoTolerancia}
                                        style={{width: 150, backgroundColor: "transparent", height: 50,borderWidth: 2,
                                        borderColor: "#445A14",
                                        borderRadius: 15,
                                        textAlign: "center",
                                        fontSize: 20,
                                        color: "#92A14D",
                                        fontFamily: "lemonada",
                                    }}
                                        placeholder="Min"
                                        placeholderTextColor={"#92A14D"}
                                        cursorColor={"#445A14"}
                                        accessibilityLabel="Escolha o tempo de tolerância:"
                                    />
                                </View>
                            ) : (
                                <View />
                            )
                        }

                        
                    </View>
                </View>
                <View style={{alignItems: "flex-end", marginTop: 30, padding: 15}}>
                    <Text style={{fontFamily: "lemonada", fontSize: 18, color: "#445A14"}} accessibilityRole="button" onPress={nextFormPage}>Próximo </Text>
                </View>
            </ScrollView>
        </View>
    );

}

export default NovoCadastro