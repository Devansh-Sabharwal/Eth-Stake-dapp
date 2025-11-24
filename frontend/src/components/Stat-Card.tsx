interface Props {
  title: string;
  amount: number;
  symbol: string;
  Icon: React.ReactNode;
  button?: boolean;
}
export default function StatCard(props: Props) {
  const { Icon } = props;
  return (
    <div className="p-5 w-96 bg-zinc-900/50 rounded-2xl hover:border-zinc-800 border border-white/10">
      <div className=" flex justify-between">
        <div>
          <div className="text-base text-slate-400">{props.title}</div>
          <div className="mt-4 text-3xl font-semibold">
            {props.amount.toFixed(4)}
            <span> {props.symbol}</span>
          </div>
        </div>
        <div className="p-3 border border-zinc-600 bg-zinc-800 h-fit rounded-md">
          {Icon}
        </div>
      </div>
      <div className="mt-6">{props.button && <ClaimButton />}</div>
    </div>
  );
}
function ClaimButton() {
  return (
    <button
      className="w-full active:scale-[0.98] cursor-pointer hover:scale-[1.02] transition-all duration-300 px-4 py-2 bg-white text-black font-semibold rounded-lg"
      onClick={() => {}}
    >
      Claim Rewards
    </button>
  );
}
