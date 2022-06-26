import React from "react";
import { useMoralis } from "react-moralis";

const ManualHeader = () => {
  const {
    enableWeb3,
    isWeb3Enabled,
    account,
    Moralis,
    deactivateWeb3,
    isWeb3EnableLoading,
  } = useMoralis();
  const [address, setAddress] = React.useState<string>("");

  React.useEffect(() => {
    if (isWeb3Enabled) return;

    if (localStorage.getItem("connected")) {
      enableWeb3();
    }
  }, [isWeb3Enabled]);

  React.useEffect(() => {
    Moralis.onAccountChanged((account) => {
      console.log(`Account changed to '${account}'`);
      if (account === null) {
        localStorage.removeItem("connected");
        deactivateWeb3();
      }
    });
  }, []);

  return (
    <div>
      {account ? (
        <div>Connected to {account}</div>
      ) : (
        <button
          onClick={async () => {
            await enableWeb3();
            localStorage.setItem("connected", "injected");
          }}
          disabled={isWeb3EnableLoading ? true : false}
        >
          Connect
        </button>
      )}
    </div>
  );
};

export default ManualHeader;
