import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles"
import BotaoVoltar from "../../components/BotaoVoltar";
import MiniLogo from "../../components/MiniLogo";

function NovoMenu() {


    return(
        <View style={styles.containerNovoMenu}>
            <BotaoVoltar />
            <MiniLogo />
        </View>
    );

}

export default NovoMenu