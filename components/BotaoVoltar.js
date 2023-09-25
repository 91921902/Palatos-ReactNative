import { View, Image, StyleSheet } from "react-native";

export default function BotaoVoltar() {

    return(
        <View style={styles.botaoVoltar}>
            <Image source={require("../assets/icons/voltar.png")} style={{resizeMode: "contain", width: 50, height: 50}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    botaoVoltar: {
        width: 50,
        height: 50,
        position: "absolute",
        top: 40,
        left: 30,
        borderRadius: 5000,
    }
})