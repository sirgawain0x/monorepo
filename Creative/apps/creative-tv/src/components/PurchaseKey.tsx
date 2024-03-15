import React from "react";
import { 
    useDisclosure, 
    Button,
    Center,
    Image, 
    Modal, 
    ModalBody, 
    ModalOverlay, 
    ModalHeader, 
    ModalContent, 
    ModalCloseButton, 
    ModalFooter,
    Text,
} from "@chakra-ui/react";
import { useContract, useNFT } from "@thirdweb-dev/react";
import { LOCK_ADDRESS_MUMBAI_TESTNET } from "utils/config";
import Unlock from "utils/fetchers/Unlock.json";
import WertPurchaseNFT from "./WertPurchaseNFT";


function PurchaseKey() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Connect to your NFT contract
  const { contract } = useContract( 
    LOCK_ADDRESS_MUMBAI_TESTNET.address, 
    Unlock.abi,
  );

  // Load the NFT metadata from the contract using a hook
  const { data: nft, isLoading, error } = useNFT(contract, "1");
  // Render the NFT onto the UI
  if (isLoading) return <div>Loading...</div>;
  if (error || !nft) return <div>NFT not found</div>;

  return (
    <>
      <Button onClick={onOpen}>Get Access</Button>
      {/* MODAL */}
      <Modal
        lockFocusAcrossFrames={false} 
        isOpen={isOpen} 
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={'center'}>Claim the {`${nft?.metadata?.name}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <Image src={`${nft?.metadata?.image}`} alt='Creative Membership' width={250} height={250} />
            </Center>
            <Text fontSize="sm" textAlign={'center'} mt={4}>{`${nft?.metadata?.description}`}</Text>
          </ModalBody>

          <ModalFooter>
              <WertPurchaseNFT/>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default PurchaseKey;