import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Input,
  Text,
  useDisclosure
} from "@chakra-ui/react"
import { CalendarIcon } from "@chakra-ui/icons"
import * as React from "react"
import { connectToDatabase } from '../util/mongodb'

let daysWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


function Week({ appointments }) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <Container>
      <Heading p={4}>Week</Heading>
      <Center>
        <Grid
          templateColumns="repeat(25, 1fr)"
          templateRows="repeat(8, 1fr)"
          gap={1}>
          {/* Items in Legend */}
          {[...Array(24)].map(
            (value = null, index = number) => (
              <GridItem rowStart={0} colStart={index + 2} key={index} > {index}h </GridItem>
            )
          )}
          {[...Array(daysWeek.length)].map(
            (value = null, index = number) => (
              <GridItem 
              p={3}
              rowStart={index + 2} 
              colStart={1} 
              key={index} 
              bg="blue.50" 
              fontSize="2xl">
              <Text fontSize="2xl"> { daysWeek[index] } </Text>
              </GridItem>
            )
          )}
          {appointments.map((appointment) => (

            <GridItem as="button"
              ref={btnRef}
              onClick={onOpen}
              key={appointment._id}
              rowStart={daysWeek.indexOf(appointment.day) + 2}
              colStart={appointment.start + 2}
              colEnd={appointment.end + 2}
              boxShadow="outline"
              bg="gray.100"
              rounded="md"
              isTruncated>

              <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
              >
                <DrawerOverlay>
                  <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                      <CalendarIcon size="8" />
                      <Box> Appointment</Box>
                    </DrawerHeader>

                    <DrawerBody>
                      <Box ml="2">Not implemented!</Box>
                      <Input placeholder="Type here..." />
                    </DrawerBody>

                    <DrawerFooter>
                      <Button variant="outline" mr={3} onClick={onClose}>
                        Cancel
              </Button>
                      <Button color="blue">Save</Button>
                    </DrawerFooter>
                  </DrawerContent>
                </DrawerOverlay>
              </Drawer>
              <Flex>
                {/*<IconButton
                  //onClick={props.onClick}
                  aria-label="appointment"
                  icon={<CalendarIcon />}
                  size="1"
                />*/}
                <Box ml="1">
                  <Text fontWeight="bold">
                    {appointment.name}
                    <Badge ml="1" colorScheme="green">
                      {appointment.type}
                    </Badge>
                  </Text>
                </Box>
              </Flex>
            </GridItem>

          ))}
        </Grid>
      </Center>
      {/*<Box>
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment._id}>
              <h2>{appointment.name}</h2>
              <h3>{appointment.type}</h3>
              <p>{appointment.day}</p>
              <p>{appointment.start}</p>
              <p>{appointment.end}</p>
              <p>{appointment.active}</p>
            </li>
          ))}
        </ul>
      </Box>*/}
      {/*props.isConnected ? (
          <Box>You are connected to MongoDB</Box>
        ) : (
          <Box>You are NOT connected to MongoDB.</Box>  
        )*/}
      {/*<Box>by <a href={props.user.html_url}>{props.user.login}</a></Box>*/}
    </Container>

  )

}

export async function getStaticProps() {
  const { db } = await connectToDatabase();

  const appointments = await db
    .collection("appointments")
    .find({ active: true })
    .sort({ day: 1, start: 1 })
    .limit(20)
    .toArray();

  return {
    props: {
      appointments: JSON.parse(JSON.stringify(appointments)),
    }
  };
}

/*export async function getStaticProps() {

  const res = await fetch('https://api.github.com/users/pevaristo')
  const user = await res.json()

  return {
    props: {
      user,
    },
  }
}*/

/*export async function getServerSideProps(context) {
  const { client } = await connectToDatabase()

  const isConnected = await client.isConnected()

  return {
    props: { isConnected },
  }
}*/

export default Week