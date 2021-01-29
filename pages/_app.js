import * as React from "react"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

import Fonts from '../styles/Fonts'

const theme = extendTheme({
  fonts: {
    heading: "Open Sans",
    body: "Raleway",
  },
})

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Component {...pageProps} />
    </ChakraProvider>
    )
}

export default MyApp
