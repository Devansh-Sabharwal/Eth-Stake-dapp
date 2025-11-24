import { Check, ChevronDown, Copy, LogOut, TrendingUp, X } from "lucide-react";
import { useState } from "react";
import {
  useAccount,
  useBalance,
  useConnect,
  useConnection,
  useConnectors,
  useDisconnect,
  useSwitchChain,
} from "wagmi";

export default function Navbar() {
  const [walletModal, setWalletModal] = useState(false);
  const connection = useConnection();
  const status = connection.status;
  const address = connection.address;
  const { connect } = useConnect();
  const connectors = useConnectors();
  return (
    <div className="border-b border-b-white/20">
      <div className="mx-8 flex py-6 justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-white p-1 rounded-lg">
            <TrendingUp color="black" />
          </span>
          <span className="text-xl font-bold text-white tracking-tight">
            Stakify
          </span>
        </div>
        <div className="flex gap-4">
          {status == "connected" && address && <Disconnect address={address} />}
          {status == "disconnected" && (
            <button
              className="active:scale-[0.98] cursor-pointer hover:scale-[1.02] transition-all duration-300 px-4 py-2 bg-white text-black font-semibold rounded-lg"
              onClick={() => setWalletModal(true)}
            >
              Connect Wallet
            </button>
          )}
          <ChainDropdown />
        </div>
      </div>
      {walletModal && (
        <div className="fixed top-0 h-screen w-screen flex justify-center items-center">
          <div className="w-full backdrop-blur-md max-w-md bg-black border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <span className="text-xl font-medium">Connect Wallet</span>
              <button
                onClick={() => setWalletModal(false)}
                className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="mt-6 flex flex-col gap-4">
              {connectors.map((connector) => (
                <button
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all group"
                  key={connector.uid}
                  onClick={() => {
                    connect({ connector });
                    setWalletModal(false);
                  }}
                  type="button"
                >
                  <span className="text-white">{connector.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
const Disconnect = ({ address }: { address: string }) => {
  const { data } = useBalance({
    address: address as `0x${string}`,
  });
  const bal = data?.value ? Number(data.value) / 1e18 : 0;
  const { disconnect } = useDisconnect();
  const [triggerCopy, setTriggerCopy] = useState(false);
  const trimmedAddress = `${address?.slice(0, 5)}...${address?.slice(-4)}`;

  return (
    <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl p-1 pr-4">
      <div className="px-3 py-1.5 bg-zinc-800 rounded-lg text-sm font-medium text-zinc-300">
        {bal.toFixed(4)} ETH
      </div>
      <div
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => {
          navigator.clipboard.writeText(address);
          setTriggerCopy(true);
          setTimeout(() => {
            setTriggerCopy(false);
          }, 1500);
        }}
      >
        <span className="text-sm font-semibold text-white">
          {trimmedAddress}
        </span>
        {!triggerCopy ? (
          <Copy
            size={14}
            className="text-zinc-500 group-hover:text-white transition-colors"
          />
        ) : (
          <Check size={14} className="text-green-500" />
        )}
      </div>
      <button
        onClick={() => {
          disconnect();
        }}
        className="ml-2 p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
        title="Disconnect"
      >
        <LogOut size={16} />
      </button>
    </div>
  );
};

export function ChainDropdown() {
  const { switchChain } = useSwitchChain();
  const { chainId } = useAccount();

  const CHAINS = [
    { id: 1, name: "Ethereum Mainnet" },
    { id: 11155111, name: "Sepolia" },
  ];

  const [open, setOpen] = useState(false);

  const activeChain = CHAINS.find((c) => c.id === chainId) || CHAINS[0];

  const handleSelect = (id: 1 | 11155111) => {
    switchChain({ chainId: id });
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-48 px-4 py-2 bg-zinc-900 border border-white/10 text-white rounded-md hover:bg-zinc-800 transition"
      >
        {activeChain.name}
        <span className="ml-2">
          <ChevronDown />
        </span>
      </button>

      {open && (
        <div className="absolute mt-2 w-48 bg-zinc-900 border border-zinc-700 rounded-md shadow-lg z-20">
          {CHAINS.map((chain) => (
            <button
              key={chain.id}
              //@ts-ignore
              onClick={() => handleSelect(chain.id)}
              className="
                block w-full text-left px-4 py-2 text-white
                hover:bg-neutral-800 transition
              "
            >
              {chain.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
