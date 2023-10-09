import { useState } from "react";
import { Text, View } from "react-native";

function Comanda({obj}) {
    return(
        <View>
            {
                obj.isReserva? (
                    <Text>Mesa da reserva</Text>
                ) : (
                    <Text>Mesa do restaurante</Text>
                )
            }
        </View>
    )
}


export default Comanda