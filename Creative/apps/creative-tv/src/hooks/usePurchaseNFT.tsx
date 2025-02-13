// Importing required modules and dependencies
import { useAddress, ThirdwebSDK, useSigner, useSmartWallet, embeddedWallet } from '@thirdweb-dev/react';
import { Paywall } from '@unlock-protocol/paywall';
import { networks, mumbai } from '@unlock-protocol/networks';
import { useToast } from '@chakra-ui/react';
import { BigNumber } from 'ethers';
import { ERC20_ABI, LOCK_ADDRESS_MUMBAI_TESTNET, ACCOUNT_FACTORY_TESTNET } from '../utils/config';
// Main hook for purchasing NFTs
export default function usePurchaseNFT() {
  // Initialize toast for user feedback
  const toast = useToast();
  
  // Get user's wallet address
  const address = useAddress();
  const { connect } = useSmartWallet(embeddedWallet(), {
    factoryAddress: ACCOUNT_FACTORY_TESTNET,
    gasless: true,
  });
  
  // Predefined contract addresses and purchase price
  const LOCK_ADDRESS = LOCK_ADDRESS_MUMBAI_TESTNET.address;
  const TOKEN_ADDRESS = '0x0000000000000000000000000000000000001010';
  const PURCHASE_PRICE = 1000000000000000000;
  
  // Get the signer from ThirdwebSDK
  const signer = useSigner();
  const sdkSigner = signer && ThirdwebSDK.fromSigner(signer);


  // Function to purchase the NFT
  const purchaseNFT = async () => {
   
    const paywall = new Paywall(networks);
    if (typeof window !== 'undefined') {
      const provider = paywall.getProvider('https://app.unlock-protocol.com')
    
    
    try {
      // Add pre-purchase logic if any
      
      // Connect a provider if you need (optional)
       paywall.connect(provider);
      
      // Load Unlock's checkout modal
      const paywallConfig = {
        // Your paywall configuration here
        locks: {
          [LOCK_ADDRESS_MUMBAI_TESTNET.address]: {
            network: mumbai,
          }
        },
        pessimistic: true,
        recipient: address, // from new SmartWallet(config);
      };
      const response = await paywall.loadCheckoutModal(paywallConfig);
      
      // Add post-purchase logic based on the 'response'
      if (response) {
        toast({
          title: "Purchased NFT",
          description: "You are now a member of CreativeTV!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
      
    } catch (err) {
      console.error("Failed to purchase NFT", err);
      toast({
        title: "Failed to purchase NFT",
        description: "Please try again",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }
  };

  // Return the main function for use elsewhere in the application
  return {
    purchaseNFT
  };
}
