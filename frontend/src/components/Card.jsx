import React from 'react'

import { Image, VStack, Text, Button } from '@chakra-ui/react';

// Card Component for each Product
const Card = ({amount,img,checkoutHandler}) => {
  return (
    <VStack>
      <Image src={img} boxSize={"64"} objectFit={'cover'}/>
      <Text>₹{amount}</Text>
      <Button onClick={() => {checkoutHandler(amount)}}>Buy Now</Button>
    </VStack>
  )
}

export default Card