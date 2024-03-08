import React from "react";
import { 
  Box, 
  Heading, 
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useUser, useAddress } from "@thirdweb-dev/react"
import { useRouter } from 'next/router';
import { Voting } from "../../components/voting";
import ClaimPoap from "../../components/claim-poap"

/**
 * Renders the "More" component.
 * 
 * @returns JSX.Element
 */
export default function More() {
  const router = useRouter()
  const { isLoggedIn, user } = useUser()
  const address = useAddress()

  const {
    end, 
    start, 
    title, 
    body, 
    choices, 
    snapshot, 
    creator,
    score,
    scores,
    identifier,
  } = router.query

  /**
   * Converts a Unix timestamp to a UTC string representation of the date.
   * @param date - The Unix timestamp to convert.
   * @returns The UTC string representation of the date.
   */
  const convertDate = (date: any) => {
    date = new Date(date * 1000);
    return date.toUTCString();
  }

  /**
   * Opens a new browser window to display the details of a specific block on PolygonScan.
   * @param id - The ID of the block to navigate to.
   */
  const goTo = (id: any) => {
    let url = `https://polygonscan.com/block/${id}`;
    window.open(url, '_blank');
  }


  return (
    <Box
      display='flex'
      flexDirection='row'
      flexWrap={'wrap'}
      alignItems='flex-start'
      justifyContent='center'
    >
      <Box
        maxW={['100vw']}>
          <Box padding={4}>
              <Breadcrumb spacing='8px' mb={4} separator={<ChevronRightIcon color='gray.500' />}>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                  <BreadcrumbLink href="/vote">Vote</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink>Details</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            <Box>
            </Box>
            <Box>
              <Heading>{title}</Heading>
            </Box>
          </Box>
          <Box
            padding={4}>
            <Box>
              <Text>{body}</Text>
            </Box>
          </Box>
      </Box>
      <Box>
        <Box
          padding={5}
          marginBottom={5}
          maxWidth={'100vw'}
          cursor='pointer'>
          <Box  
            bgGradient="linear(to-l, #FFCC80, #D32F2F, #EC407A)"
            padding={2}
            display='flex'
            borderTopLeftRadius={10}
            borderTopRightRadius={10}
            flexDirection='row'
            >
            <Heading
              size={'md'}
              color="white">Details</Heading>
          </Box>
          <Box
            border={'2px solid #ec407a'}
            borderBottomRadius={10}
            padding={10}>
            <Box
              padding={2}>
              <Text>{`Creator:  ${creator}`}</Text>
              <Text onClick={() => goTo(snapshot)}>{`Snapshot:  ${snapshot}`}</Text>
            </Box>
            <Box
              background={'black'}
              padding={2}
              borderRadius={10}>
              <Box  
                display='flex'
                flexDirection='row'>
                <Text
                  color='white'>{`start date: ${convertDate(start)}`}</Text>
              </Box>
              <Box
                display='flex'
                flexDirection='row'>
                <Text
                  color='white'>{`end date: ${convertDate(end)}`}</Text>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          padding={5}
          marginBottom={5}
          cursor='pointer'
          minW={['100vw', '100vw', '100vw', '20px']}
          maxWidth={'100vw'}
          >
          <Box  
            bgGradient="linear(to-l, #FFCC80, #D32F2F, #EC407A)"
            padding={2}
            display='flex'
            borderTopLeftRadius={10}
            borderTopRightRadius={10}
            flexDirection='row'>
            <Heading
              size={'md'}
              color="white">Current Results</Heading>
          </Box>
          <Box
            border={'2px solid #ec407a'}
            borderBottomRadius={10}
            padding={10}
          >
            <Voting
              choices={choices}
              score={score}
              scores={scores} />
          </Box>
        </Box>
        { isLoggedIn && (
          <Box
            padding={5}
            marginBottom={5}
            cursor='pointer'
            minW={['100vw', '100vw', '100vw', '20px']}
            maxWidth={'100vw'}
          >
            <Box
              background='brand.400'
              padding={2}
              display='flex'
              borderTopLeftRadius={10}
              borderTopRightRadius={10}
              flexDirection='row'>
              <Heading
                size={'md'}
                color="white">I Voted POAP</Heading>
            </Box>
            <Box
              border={'2px solid #ec407a'}
              borderBottomRadius={10}
              padding={10}
            >
              <ClaimPoap
                address={address as string}
                proposalId={identifier as string}
                snapshot={snapshot as string}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}
