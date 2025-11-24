import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useAccount, useSwitchChain } from "wagmi";

export function ChainDropdown() {
  const { switchChain } = useSwitchChain();
  const { chainId } = useAccount();

  const CHAINS = [
    { id: 1, name: "Mainnet" },
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
