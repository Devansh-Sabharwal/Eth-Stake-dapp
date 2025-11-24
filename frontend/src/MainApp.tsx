import { ShieldCheck, Wallet2 } from "lucide-react";
import Navbar from "./components/Navbar";
import StatCard from "./components/Stat-Card";

import Dashboard from "./components/Dashboard";
import { useConnection, useReadContract } from "wagmi";
import { abi } from "./abi";
import { formatEther } from "viem";

function MainApp() {
  const connection = useConnection();
  const address = connection.address;
  let claim = 0;
  let stakedBalance = 0;

  const { data: stakedAmount, error: stakedError } = useReadContract({
    address: "0x0F7FFEE99710f994C6858d3A2f40b46876E595C9",
    abi,
    functionName: "userInfo",
    //@ts-ignore
    args: [address],
  });

  //@ts-ignore
  stakedBalance =
    //@ts-ignore
    (stakedAmount && Number(formatEther(stakedAmount[0] as bigint))) || 0;
  const { data: claimableRewards, error } = useReadContract({
    address: "0x0F7FFEE99710f994C6858d3A2f40b46876E595C9",
    abi,
    functionName: "getRewards",
    //@ts-ignore
    args: [address],
  });
  if (error || stakedError) console.error(error?.message);

  if (claimableRewards) claim = Number(formatEther(claimableRewards as bigint));

  // if (isPending) return <>Loading...</>;
  return (
    <>
      <div>
        <Navbar />
        <div className="m-8">
          <div className="w-full flex justify-center">
            <div>
              <div className="flex gap-4">
                <StatCard
                  title="Total Staked"
                  amount={stakedBalance || 0}
                  symbol="ETH"
                  Icon={<ShieldCheck size={24} />}
                />
                <StatCard
                  title="Total Rewards Available"
                  amount={claim || 0}
                  symbol="$ORCA"
                  Icon={<Wallet2 size={24} />}
                  button={true}
                />
              </div>
              <div className="mt-4">
                <Dashboard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainApp;
