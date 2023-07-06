import { Box, Heading, VStack,Text } from '@chakra-ui/react'
import React from 'react'

// Getting the Search Query Params
import {useSearchParams} from "react-router-dom";

// Payment successful Component
const PaymentSuccess = () => {

    const searchQuery = useSearchParams()[0];
    const referenceNum = searchQuery.get("reference");
    
  return (
    <Box>
        <VStack>
            <Heading textTransform={"uppercase"}>
                Order Successful
            </Heading>

                <Text>
                    Reference No. {referenceNum}
                </Text>
        </VStack>
    </Box>
  )
}

export default PaymentSuccess