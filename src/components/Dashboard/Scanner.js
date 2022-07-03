import React, { useState, useEffect } from "react";

import { NativeBaseProvider, Box, Center } from "native-base";
import { BarCodeScanner } from "expo-barcode-scanner";
import { ImageBackground, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function Scanner() {
  const navigation = useNavigation();
  const [dataID, setDataID] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setDataID(data);
    getData(data);
  };

  const getData = (data) => {
    axios
      .get(`http://192.168.168.219:4000/api/v1/getSlipById/${data}`)
      .then(function (response) {
        console.log(response["data"]);
        navigation.navigate("Slip Data",{ secretKey: data });
      })
      .catch(function (error) {
        console.log(error);
        navigation.navigate("Failed");
      });
  };

  return (
    <NativeBaseProvider>
      <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290" h="70%">
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}
