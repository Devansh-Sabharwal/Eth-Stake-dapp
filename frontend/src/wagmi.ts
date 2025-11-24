import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]:
      http(),
      // "https://eth-sepolia.g.alchemy.com/v2/j4QvjEP5_bfvPn-9H-jZl7ZpoN25GO4l"
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
