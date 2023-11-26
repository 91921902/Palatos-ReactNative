import React from "react"
import { useState, useEffect } from "react"
import { Image, View, Text, ScrollView, TextInput, Animated, Easing, Pressable, Platform } from "react-native"
import { styles } from "./styles"
import BotaoVoltar from "../../components/BotaoVoltar.js"
import { useFormTools } from "../../providers/FormRestContext"
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import decode from "jwt-decode"
import api from "../../providers/api"
import ImageTools from "../../providers/ImageTools.js"

import * as Font from 'expo-font';
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import CheckBoxCategory from "../../components/CheckBoxCategory"
import TelaErro from "../../components/TelaErro.js"

const imageTools = new ImageTools()


function NovoCadastro({ navigation }) {

    const [fontLoaded, setFontLoaded] = useState(false);
    const [categoriasVisiveis, setCategoriasVisiveis] = useState(false)
    const [filtroCategoria, setFiltroCategoria] = useState("")

    // FORM

    const [btnReservation, setBtnReservation] = useState(true)
    const [file, setFile] = useState({})
    const [nome, setNome] = useState("")
    const [endereco, setEndereco] = useState("")
    const [telefone, setTelefone] = useState("")
    const [celular, setCelular] = useState("")
    const [descricao, setDescricao] = useState("")
    const [foto, setFoto] = useState("")
    const [tempoTolerancia, setTempoTolerancia] = useState("")
    const [cep, setCep] = useState("")
    const [rua, setRua] = useState("")
    const { userTools } = useFormTools()
    const { categorias } = useFormTools()

    const [isEdit, setIsEdit] = useState(false)
    const [fileEdit, setFileEdit] = useState(null)
    const [categoriasEdit, setCategoriasEdit] = useState([])

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

    const [erro, setErro] = useState([])

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                'lemonada': fontLemonada,
            });
            setFontLoaded(true);
        }

        loadFonts();

        async function isEditOrNot() {
            /* const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJpYXQiOjE3MDA3MDI4MTAsImV4cCI6MjMwNTUwMjgxMH0.Z0cceOaNbgbPoRw01-mxkFgu_07Mr0WvRW_ZiPxAx6s" */
            const token = await AsyncStorage.getItem("token")

            let tokenIsValid
            try {
                tokenIsValid = await api.get("users/auth", {
                    headers: {
                        Authorization: token
                    }
                }).then(response => response.data.status)
            } catch (error) {
                alert("erro")
            }

            if (token) {

                const decoded = decode(token)

                const { idRestaurante } = decoded
                if (idRestaurante && tokenIsValid) {
                    const restaurante = await api.get("/restaurante/search/" + idRestaurante)
                        .then(response => response.data.result)

                    if (restaurante) {
                        setIsEdit(true)

                        setNome(restaurante.nome)
                        setEndereco(restaurante.endereco)
                        setTelefone(restaurante.telefone_fixo)
                        setCelular(restaurante.celular)
                        setDescricao(restaurante.descricao)
                        setCategoriasEdit(restaurante.categorias)
                        setBtnReservation(restaurante.reservasAtivas)
                        setTempoTolerancia(restaurante.tempoTolerancia)
                        setFoto(restaurante.foto)
                        setCep(restaurante.cep)
                        setRua(restaurante.rua)
                    }
                }
            }

        }

        isEditOrNot()
    }, []);

    if (!fontLoaded) {
        return null;
    }



    /* ----------------------------------------------- */


    async function nextFormPage() {

        const errors = checkErrors()
        if (errors) return
        const isAuth = await userTools.authUser()

        if (!isAuth) {
            navigation.navigate('PagInicial', {
                message: "Para utilizar todos os recursos você precisa estar logado"
            })
        }

        const plano = JSON.parse(await AsyncStorage.getItem("plano"))
        const newFormData = new FormData()

        newFormData.append('nome', nome)
        newFormData.append('endereco', endereco)
        newFormData.append('telefone', telefone)
        newFormData.append('celular', celular)
        newFormData.append('descricao', descricao)
        newFormData.append('categorias', categorias)
        newFormData.append('reservasAtivas', btnReservation)
        newFormData.append('tempoTolerancia', tempoTolerancia)
        newFormData.append('cep', cep)
        newFormData.append('rua', rua)
        newFormData.append('plano', plano)

        await AsyncStorage.removeItem("plano")

        if (!file.uri) {
            file.uri = "sem_imagem"
        }

        if (file.uri.indexOf("file:///") != -1) {

            newFormData.append('file', JSON.parse(JSON.stringify({
                name: `restaurante.${file.extension}`,
                uri: file.uri,
                type: file.type
            })))

            navigation.navigate('NovoMenu', {
                formData: newFormData
            })

        } else {

            navigation.navigate('NovoMenu', {
                formData: newFormData,
                fotoRestaurante: file
            })

        }
    }

    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.canceled) {
            setFoto(result.assets[0].uri);
            const file = result.assets[0].uri

            const indiceDoisPontos = file.indexOf(':');
            let fileType = file.substring(indiceDoisPontos + 1, file.indexOf(";"))

            if (file.indexOf("file:///") != -1) {

                const mimeType = file.slice((file.lastIndexOf('.') + 1))
                fileType = `image/${mimeType}`


            }
            const extensionFile = imageTools.getExtensionFile(fileType)


            if (isEdit) {

                setFileEdit(
                    {
                        extension: extensionFile,
                        uri: file,
                        type: fileType
                    }
                )

            } else {

                setFile({
                    extension: extensionFile,
                    uri: file,
                    type: fileType
                })

            }

        } else {
            // ToastAndroid.show("Operação Cancelada", 600)
            alert("operação cancelada")
        }
    };

    function backPage() {

        navigation.goBack()

    }

    async function editRestaurant() {

        const formData = new FormData()
        formData.append('nome', nome)
        formData.append('endereco', endereco)
        formData.append('telefone', telefone)
        formData.append('celular', celular)
        formData.append('descricao', descricao)
        formData.append('categorias', categorias)
        formData.append('reservasAtivas', btnReservation)
        formData.append('tempoTolerancia', tempoTolerancia)
        formData.append('cep', cep)
        formData.append('rua', rua)

        if (fileEdit) {
            const { extension, type, uri } = fileEdit

            formData.append('file', JSON.parse(JSON.stringify({
                name: `restaurante.${extension}`,
                uri: uri,
                type: type
            })))
        }

        try {
            const token = await AsyncStorage.getItem("token")
            const decoded = decode(token)
            const { idRestaurante } = decoded
            await api.put("restaurante/edit/" + idRestaurante, formData, {
                headers: {
                    Authorization: token
                }
            })

            navigation.navigate("PainelADM")

        } catch (err) {
            console.log(err)
            alert("erro em tentar editar o restaurante")
        }

    }

    function validateField(field, type) {
        if (field == "" && typeof field == "string") {
            return "Este campo é obrigatório!"
        }

        if (typeof field == "string") {
             field = field.trim()
        }

        switch (type) {
            case "nome":
                if (field.length < 5) {
                    return "O nome deve ter no mínimo 5 caracteres!"
                }
                break;
            case "endereco":
                if (field.length < 5) {
                    return "Endereço inválido!"
                }
                break;
            case "celular":
                if (field.length < 10) {
                    return `${field.length}`
                }
                break;
            case "descricao":
                if (field.length < 10 || field.length > 186) {
                    return "A descrição deve estar entre 10 e 186 caracteres!"
                }
                break;
            case "cep":
                if (field.length != 8) {
                    return "Digite apenas os 8 números do CEP."
                }
                break;
            case "rua":
                if (field.length < 3) {
                    return "A rua deve ter no mínimo 3 caracteres!"
                }
                break;
            case "categoria":
                if (field.length < 1) {
               
                    return "Selecione uma categoria." 
                }
            case "tolerancia":
                const {btn, tempo} = field
                if (btn && tempo.length == 0) {
                    return "Este campo é obrigatório!"
                }


                break
            default:
                break;
        }
        return ""
    }

    function checkErrors() {

        let objErros = [
            { type: "nome", message: validateField(nome, "nome") },
            { type: "endereco", message: validateField(endereco, "endereco") },
            { type: "celular", message: validateField(celular, "celular") },
            { type: "descricao", message: validateField(descricao, "descricao") },
            { type: "cep", message: validateField(cep, "cep") },
            { type: "rua", message: validateField(rua, "rua") },
            { type: "categoria", message: validateField(categorias, "categoria")},
            { type: "tolerancia", message: validateField({btn: btnReservation, tempo: tempoTolerancia}, "tolerancia")}
        ]
        setErro(objErros)
        return objErros.some(obj => obj.message != "")
    }



    return (
        <View style={styles.containerNovoCadastro}>
            <BotaoVoltar onPress={backPage} />
            <View style={styles.boxUploadPhoto}>
                <Pressable style={[styles.buttonUpload, { overflow: !foto ? "" : "hidden" }]} onPress={pickImage}>
                    {!foto ? (
                        <>
                            <Image source={require("../../assets/icons/btnMaisV2.png")} style={styles.btnMais} />
                            <Text style={{ color: "white", fontFamily: "lemonada", fontSize: 10 }}>Insira sua logo aqui</Text>
                        </>
                    ) : (
                        <Image source={{ uri: foto }} style={{ height: '100%', width: '100%', resizeMode: "cover" }} />
                    )}
                </Pressable>
            </View>
            <ScrollView style={{ height: "60%" }}>
                <View style={styles.formularioCadastroRest}>
                    <View style={styles.boxInpt}>
                        <Text style={styles.formText}>Nome do Restaurante:</Text>
                        <TextInput style={styles.inptFormRest} cursorColor={"#445A14"} accessibilityLabel="Nome do restaurante:" value={nome} onChangeText={setNome} />
                        <TelaErro type={"nome"} width={"80%"} erro={erro} />
                    </View>
                    <View style={styles.boxInpt}>
                        <Text style={styles.formText}>CEP:</Text>
                        <TextInput style={styles.inptFormRest} cursorColor={"#445A14"} accessibilityLabel="CEP:" value={cep} onChangeText={setCep} />
                        <TelaErro type={"cep"} width={"80%"} erro={erro} />
                    </View>
                    <View style={styles.boxInpt}>
                        <Text style={styles.formText}>Rua:</Text>
                        <TextInput style={styles.inptFormRest} cursorColor={"#445A14"} accessibilityLabel="Rua:" value={rua} onChangeText={setRua} />
                        <TelaErro type={"rua"} width={"80%"} erro={erro} />
                    </View>
                    <View style={styles.boxInpt}>
                        <Text style={styles.formText}>Endereço:</Text>
                        <TextInput style={styles.inptFormRest} cursorColor={"#445A14"} accessibilityLabel="Endereço:" value={endereco} onChangeText={setEndereco} />
                        <TelaErro type={"endereco"} width={"80%"} erro={erro} />
                    </View>
                    <View style={styles.boxInpt}>
                        <Text style={styles.formText}>Telefone (opcional):</Text>
                        <TextInput style={styles.inptFormRest} cursorColor={"#445A14"} accessibilityLabel="Telefone (opcional):" value={telefone} onChangeText={setTelefone} />
                    </View>
                    <View style={styles.boxInpt}>
                        <Text style={styles.formText}>Celular:</Text>
                        <TextInput style={styles.inptFormRest} cursorColor={"#445A14"} accessibilityLabel="Celular:" value={celular} onChangeText={setCelular} />
                        <TelaErro type={"celular"} width={"80%"} erro={erro} />
                    </View>
                    <View style={styles.boxInpt}>
                        <Text style={styles.formText}>Descrição:</Text>
                        <TextInput
                            value={descricao}
                            onChangeText={setDescricao}
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
                            accessibilityLabel="Descrição do restaurante:"
                        />
                        <Text style={{ paddingLeft: 10, fontFamily: "lemonada", color: "#445A14", fontSize: 11 }}>Max 186</Text>
                        <TelaErro type={"descricao"} width={"80%"} erro={erro} />
                    </View>
                    <View style={styles.boxInpt}>
                        <Text style={styles.formText}>Categoria (Min. 1):</Text>
                        <TextInput style={styles.inptFormRest} cursorColor={"#445A14"} onPressIn={() => setCategoriasVisiveis(true)} onChangeText={setFiltroCategoria} value={filtroCategoria} accessibilityLabel="Categoria:" />


                        <CheckBoxCategory filter={filtroCategoria} categoriasEdit={categoriasEdit} />
                        <TelaErro type={"nome"} width={"80%"} erro={erro} />

                    </View>
                    <View style={styles.boxReserva}>
                        <Text style={{ fontFamily: "lemonada", fontSize: 18, color: "#445A14" }}>Terá reserva?</Text>

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
                                <Pressable onPress={toggleReservation} style={{ width: "50%" }}>
                                    <Text style={[styles.textBtnYes, { color: btnReservation ? "white" : "#92A14D" }]}>Sim</Text>
                                </Pressable>
                                <Pressable onPress={toggleReservation} style={{ width: "50%" }}>
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
                                    <Text style={{ fontFamily: "lemonada", fontSize: 12, color: "#445A14" }}>Escolha seu tempo de tolerância:</Text>
                                    <TextInput
                                        keyboardType="numeric"
                                        onChangeText={setTempoTolerancia}
                                        value={tempoTolerancia}
                                        style={{
                                            width: 150, backgroundColor: "transparent", height: 50, borderWidth: 2,
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
                                    <TelaErro type={"cep"} width={"80%"} erro={erro} />
                                </View>
                            ) : (
                                <View />
                            )
                        }


                    </View>
                </View>
                <View style={{ alignItems: "flex-end", marginTop: 30, padding: 15 }}>
                    {
                        isEdit ? (
                            <Text style={{ fontFamily: "lemonada", fontSize: 18, color: "#445A14" }} accessibilityRole="button" onPress={editRestaurant}>Editar</Text>
                        ) : (
                            <Text style={{ fontFamily: "lemonada", fontSize: 18, color: "#445A14" }} accessibilityRole="button" onPress={nextFormPage}>Próximo</Text>
                        )
                    }

                </View>
            </ScrollView>
        </View>
    );

}

export default NovoCadastro