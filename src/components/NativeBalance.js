import { useMoralis, useNativeBalance } from "react-moralis";

function NativeBalance(props) {
  const { data: balance } = useNativeBalance(props);
  const { account, isAuthenticated } = useMoralis();

  if (!account || !isAuthenticated) return null;

  return (
    <h5 style={{ textAlign: "center", whiteSpace: "nowrap" }}>
      💰 {balance.formatted}
    </h5>
  );
}

export default NativeBalance;
