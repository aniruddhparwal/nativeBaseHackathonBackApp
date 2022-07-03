import React, { useContext, useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { NativeBaseProvider, Box, Center,Text, FlatList, HStack, VStack, Spacer, View, Button } from "native-base";
import { Image, StyleSheet } from "react-native";
import {TokenContext} from '../../context/TokenContext'
import axios from "axios";


// const styles = StyleSheet.create({
//   image: {
//     flex: 1,
//     justifyContent: "center",
//     width:"200",
//   },
//   logo: {
//     width: 100,
//     height: 100,
//     backgroundColor:"white"
//   },
// });


const GetDetails = () => {
  const route=useRoute()
  const [redata, setRedata] = useState([]);
  const [state, dispatch] = useContext(TokenContext);
  const [flag,setFlag] = useState(false);
  const getBankAccounts = () => {
    // console.log("my data", user);
    const { secretKey } = route.params;

    axios
      .get(`http://192.168.168.219:4000/api/v1/getAllDetails/${secretKey}`, {
        headers: {
          Authorization: "Bearer " + state.token,
        },
      })
      .then(function (response) {
        // console.log(response,"jjjjjjjj")
        setRedata(response.data);
        setFlag(true);
      }) 
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateBankAccounts = (data) => {
    // console.log("my data", user);
    const { secretKey } = route.params;
    console.log(data,"========",secretKey,"========")
    axios
      .put('http://192.168.168.219:4000/api/v1/updateSlipStatus', {
        id:route.params.secretKey,
        status:data
      })
      .then(function (response) {
        console.log(response,"jjjjjjjj")
      }) 
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getBankAccounts();
  }, []);
  

  const [showModal, setShowModal] = useState(false);

  return (
    <Box>
      {flag ? console.log(redata,"lkkkkkk"):"null"}
      {/* Total Amount = {redata["amount"]} */}
      {/* {redata["bankAccount"]["bankName"]}
      {redata["bankAccount"]["branchName"]}
      {redata["bankAccount"]["fullName"]}
      {redata["bankAccount"]["mobileNo"]}
      {redata["bankAccount"]["bankAccountId"]}
      {redata["slipData"]["10"]} */}
      {/* {redata["slipExpiryDate"]} */}
      {flag ? 
      <VStack space={1} alignItems="center" marginTop={10}>
        <Text fontSize="md">Total Amount = {redata["amount"]}</Text>
        <Text fontSize="md">BranchName = {redata["bankAccount"]["bankName"]}</Text>
        <Text fontSize="md">BankName = {redata["bankAccount"]["branchName"]}</Text>
        <Text fontSize="md">Full Name = {redata["bankAccount"]["fullName"]}</Text>
        <Text fontSize="md">Contact no. = {redata["bankAccount"]["mobileNo"]}</Text>
        {/* <Text fontSize="md">Currency Note = {redata["slipData"]["10"]}</Text> */}
        <Text>Rupees Note:
              {(redata["slipData"]['10'] != null) ? (<Text>10 x {redata["slipData"]['10']} = {10 * redata["slipData"]['10']} </Text>) : (<Text></Text>)}
              {(redata["slipData"]['20'] != null) ? (<Text>20 x {redata["slipData"]['20']} = {20 * redata["slipData"]['20']} </Text>) : (<Text></Text>)}
              {(redata["slipData"]['50'] != null) ? (<Text>50 x {redata["slipData"]['50']} = {50 * redata["slipData"]['50']} </Text>) : (<Text></Text>)}
              {(redata["slipData"]['100'] != null) ? (<Text>100 x {redata["slipData"]['100']} = {100 * redata["slipData"]['100']} </Text>) : (<Text></Text>)}
              {(redata["slipData"]['200'] != null) ? (<Text>200 x {redata["slipData"]['200']} = {10 * redata["slipData"]['200']} </Text>) : (<Text></Text>)}
              {(redata["slipData"]['500'] != null) ? (<Text>500 x {redata["slipData"]['500']} = {500 * redata["slipData"]['500']} </Text>) : (<Text></Text>)}
              {(redata["slipData"]['2000'] != null) ? (<Text>2000 x {redata["slipData"]['2000']} = {2000 * redata["slipData"]['2000']} </Text>) : (<Text></Text>)}
        </Text>
        <Text fontSize="md">Slip Expire on = {redata["slipExpiryDate"]}</Text>
      </VStack>
  :
  "Loading"
}
      <VStack>
        <Button size="sm" onPress={()=>updateBankAccounts(1)} marginTop={5}>
          Confirm
        </Button>

        <Button size="sm" marginTop={5} onPress={()=>updateBankAccounts(2)} >
          Reject
        </Button>
      </VStack>
      {/* <FlatList
        data={redata}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: "muted.50",
            }}
            borderColor="muted.800"
            pl={["0", "4"]}
            pr={["0", "5"]}
            py="2"
          >
            <HStack space={[2, 3]} justifyContent="space-between">
              <VStack>
                <View>hiii</View>
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                  editable={false} 
                >
                  hi
                  {redata.amount}
                </Text>
                <Text
                  marginTop={"2"}
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  {item[0].slipDuration}
                </Text>
              </VStack>
              <Spacer />
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      /> */}
    </Box>
  );
};

export default function Success() {
  return (
    <NativeBaseProvider>
      {/* <Center w='full' flex={1} background={"white"}>
        <Image source={require('../../assets/success.gif')} style={styles.logo}/>
        <Text fontSize="2xl">
          Success
        </Text>
        </Center> */}
        <Box w="full" p={"2"} flex={1}>
          <GetDetails />
        </Box>
    </NativeBaseProvider>
  );
}



