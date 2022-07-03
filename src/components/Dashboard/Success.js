import React, { useContext, useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { NativeBaseProvider, Box, Text, VStack, Button } from "native-base";
import {TokenContext} from '../../context/TokenContext'
import axios from "axios";


const GetDetails = () => {
  const route=useRoute()
  const [redata, setRedata] = useState([]);
  const [state, dispatch] = useContext(TokenContext);
  const [flag,setFlag] = useState(false);

  //API Call for get bank account through scanning QR code.
  const getBankAccounts = () => {
    const { secretKey } = route.params;
    axios
      .get(`http://192.168.168.219:4000/api/v1/getAllDetails/${secretKey}`, {
        headers: {
          Authorization: "Bearer " + state.token,
        },
      })
      .then(function (response) {
        setRedata(response.data);
        setFlag(true);
      }) 
      .catch(function (error) {
        // console.log(error);
      });
  };

  const updateBankAccounts = (data) => {
    const { secretKey } = route.params;
    axios
      .put('http://192.168.168.219:4000/api/v1/updateSlipStatus', {
        id:route.params.secretKey,
        status:data
      })
      .then(function (response) {
        console.log(response)
      }) 
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getBankAccounts();
  }, []);

  return (
    <Box>
      {flag ? 
        <VStack space={1} alignItems="center" marginTop={10}>
          <Text fontSize="md">Total Amount = {redata["amount"]}</Text>
          <Text fontSize="md">BranchName = {redata["bankAccount"]["bankName"]}</Text>
          <Text fontSize="md">BankName = {redata["bankAccount"]["branchName"]}</Text>
          <Text fontSize="md">Full Name = {redata["bankAccount"]["fullName"]}</Text>
          <Text fontSize="md">Contact no. = {redata["bankAccount"]["mobileNo"]}</Text>
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
        :"Loading"
      }
      <VStack>
        <Button size="sm" onPress={()=>updateBankAccounts("1")} marginTop={5}>
          Confirm
        </Button>

        <Button size="sm" marginTop={5} onPress={()=>updateBankAccounts("2")} >
          Reject
        </Button>
      </VStack>
    </Box>
  );
};

export default function Success() {
  return (
    <NativeBaseProvider>
        <Box w="full" p={"2"} flex={1}>
          <GetDetails />
        </Box>
    </NativeBaseProvider>
  );
}



