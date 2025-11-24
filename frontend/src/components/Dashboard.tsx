import { useState } from "react";
import { useBalance, useConnection } from "wagmi";
import WalletModal from "./WalletModal";

export default function Dashboard() {
  const [walletModal, setWalletModal] = useState(false);

  const connection = useConnection();
  const address = connection.address;
  const [activeTab, setActiveTab] = useState("STAKE");
  const [inputValue, setInputValue] = useState("");
  const stakedBalance = 0;
  const INITIAL_APY = 5;

  const { data } = useBalance({
    address: address as `0x${string}`,
  });
  const ethBalance = data?.value ? Number(data.value) / 1e18 : 0;
  const setMax = () => {};
  const handleAction = () => {};
  return (
    <div>
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-2 shadow-2xl shadow-black/50 backdrop-blur-md animate-in fade-in slide-in-from-bottom-8 duration-700">
        {/* Tabs */}
        <div className="grid grid-cols-2 p-1 bg-black/40 rounded-2xl mb-6 border border-zinc-800/50">
          <button
            onClick={() => {
              setActiveTab("STAKE");
              setInputValue("");
            }}
            className={`py-3 text-sm font-medium rounded-xl transition-all duration-300 ${activeTab === "STAKE" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}
          >
            Stake
          </button>
          <button
            onClick={() => {
              setActiveTab("UNSTAKE");
              setInputValue("");
            }}
            className={`py-3 text-sm font-medium rounded-xl transition-all duration-300 ${activeTab === "UNSTAKE" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}
          >
            Unstake
          </button>
        </div>

        <div className="px-4 pb-4">
          {/* Input Area */}
          <div className="relative mb-6">
            <div className="flex justify-between mb-3 px-1">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                {activeTab === "STAKE" ? "You Stake" : "You Unstake"}
              </label>
              <span className="text-xs text-zinc-500 font-medium">
                Available Balance:{" "}
                <span className="text-zinc-300 ml-1">
                  {activeTab === "STAKE"
                    ? ethBalance.toFixed(4)
                    : stakedBalance.toFixed(4)}{" "}
                  ETH
                </span>
              </span>
            </div>

            <div className="group relative bg-black border border-zinc-800 focus-within:border-zinc-600 rounded-2xl transition-all duration-300">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="0.0"
                disabled={!address}
                className="w-full bg-transparent p-5 pr-32 text-4xl font-light text-white placeholder-zinc-700 focus:outline-none"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                {address && (
                  <button
                    onClick={setMax}
                    className="text-xs font-bold text-zinc-500 hover:text-white bg-zinc-900 hover:bg-zinc-800 px-2.5 py-1.5 rounded-lg transition-colors border border-zinc-800"
                  >
                    MAX
                  </button>
                )}
                <div className="flex items-center gap-2 bg-zinc-900/80 px-3 py-1.5 rounded-xl border border-zinc-800">
                  <span className="text-sm font-semibold text-white">ETH</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/30 rounded-xl p-4 mb-6 border border-zinc-800/50">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">APY Rate</span>
              <span className="text-green-400 font-medium">{INITIAL_APY}%</span>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={!address ? () => setWalletModal(true) : handleAction}
            className="cursor-pointer transition-colors duration-300 disabled:bg-white/60 px-3 py-4 bg-white text-center w-full text-black rounded-xl h-14 text-lg font-medium shadow-xl shadow-white/5"
            disabled={
              !address ? false : !inputValue || parseFloat(inputValue) <= 0
            }
          >
            {!address
              ? "Connect Wallet"
              : activeTab === "STAKE"
                ? "Confirm Stake"
                : "Confirm Unstake"}
          </button>
        </div>
      </div>
      {walletModal && <WalletModal setWalletModal={setWalletModal} />}
    </div>
  );
}
