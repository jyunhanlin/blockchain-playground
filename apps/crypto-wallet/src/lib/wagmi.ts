import { http, createConfig } from 'wagmi';
import { injected, metaMask } from 'wagmi/connectors';
import { supportedChains } from './chains';

export const config = createConfig({
  chains: [supportedChains[0], ...supportedChains.slice(1)],
  connectors: [metaMask(), injected()],
  transports: {
    [supportedChains[0].id]: http(),
    [supportedChains[1].id]: http(),
    [supportedChains[2].id]: http(),
  },
});

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
