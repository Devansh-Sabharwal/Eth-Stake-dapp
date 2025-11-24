import { X } from "lucide-react";
import { useConnect, useConnectors } from "wagmi";

export default function WalletModal({
  setWalletModal,
}: {
  setWalletModal: (value: boolean) => void;
}) {
  const { connect } = useConnect();
  const connectors = useConnectors();
  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm top-0 h-screen w-screen flex justify-center items-center">
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
  );
}
