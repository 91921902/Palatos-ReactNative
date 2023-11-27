import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Scanner({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  
    const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    };
  
  useEffect(() => {
    
    getBarCodeScannerPermissions();

  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    
    if (type == 256) {

        const parseData = JSON.parse(data)
        const {idRestaurante} = parseData

        async function saveClient() {
            await AsyncStorage.setItem('cliente', data)
        }

        saveClient()

        navigation.navigate("MenuRestaurante", {
            idRestaurante
        })

    } 

  };

  if (hasPermission === null) {
    getBarCodeScannerPermissions();
  }
  if (hasPermission === false) {
    getBarCodeScannerPermissions();
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "85%",
    height: "80%",
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
