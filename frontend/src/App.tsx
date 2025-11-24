import { ShieldCheck, Wallet2 } from "lucide-react";
import Navbar from "./components/Navbar";
import StatCard from "./components/Stat-Card";
import Dashboard from "./components/Dashboard";

function App() {
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
                  amount={0}
                  symbol="ETH"
                  Icon={<ShieldCheck size={24} />}
                />
                <StatCard
                  title="Total Rewards Available"
                  amount={0}
                  symbol="$ORCA"
                  Icon={<Wallet2 size={24} />}
                  button={true}
                />
              </div>
              <div>
                <Dashboard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
