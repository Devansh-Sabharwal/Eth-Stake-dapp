import { Check, Copy, LogOut, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useBalance, useConnection, useDisconnect } from "wagmi";
import { ChainDropdown } from "./chain-dropdown";
import WalletModal from "./WalletModal";

export default function Navbar() {
  const [walletModal, setWalletModal] = useState(false);
  const connection = useConnection();
  const status = connection.status;
  const address = connection.address;

  return (
    <div className="border-b border-b-white/15">
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
      {walletModal && <WalletModal setWalletModal={setWalletModal} />}
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
