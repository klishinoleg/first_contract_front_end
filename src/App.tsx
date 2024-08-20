import './App.css'
import {TonConnectButton} from "@tonconnect/ui-react";
import {useMainContract} from "./hooks/useMainContract.ts";
import {useTonConnect} from "./hooks/useTonConnect.ts";
import {USE_TESTNET} from "./settings/vars.ts";
import {fromNano} from "ton-core";
import {useState} from "react";


function App() {
    const {
        contract_address,
        counter_value,
        contract_balance,
        sendIncrement,
        sendDeposit,
        sendWithdrawalRequest,
        // recent_sender,
        // owner_address,
    } = useMainContract();

    const {connected} = useTonConnect();
    const [depositAmount, setDepositAmount] = useState("0.01");
    const [withdrawalAmount, setWithdrawalAmount] = useState("1");

    const deposit = () => {
        if (depositAmount !== "0") {
            sendDeposit(depositAmount);
            setDepositAmount("0");
        }
    }

    const withdrawalRequest = () => {
        if (withdrawalAmount !== "0") {
            sendWithdrawalRequest(withdrawalAmount);
            setWithdrawalAmount("0");
        }
    }
    return (
        <div>
            <div>
                <TonConnectButton/>
            </div>
            <div>
                <div className='Card'>
                    <b>Our contract Address</b>
                    <div className='Hint'>
                        <a href={`https://${USE_TESTNET ? "testnet." : ""}tonscan.org/address/${contract_address}`}
                           target='_blank'>
                            {contract_address?.slice(0, 30) + "..."}
                        </a>
                    </div>
                    <b>Our contract Balance</b>
                    <div className='Hint'>{fromNano(contract_balance)}</div>
                </div>
                <div className='Card'>
                    <b>Counter Value</b>
                    <div>{counter_value ?? "Loading..."}</div>
                </div>
                {connected && (
                    <div>
                        <div>
                            <a onClick={() => sendIncrement()}>Increment by 5</a>
                        </div>
                        <h4>Deposit request</h4>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div>
                                <input value={depositAmount} onChange={({target}) => setDepositAmount(target.value)}/>
                            </div>
                            <div>
                                <button onClick={deposit} disabled={depositAmount === "0"}>deposit</button>
                            </div>
                        </div>
                        <h4>Withdrawal request</h4>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div>
                                <input value={withdrawalAmount} onChange={({target}) => setWithdrawalAmount(target.value)}/>
                            </div>
                            <div>
                                <button onClick={withdrawalRequest} disabled={withdrawalAmount === "0"}>Withdrawal request</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default App
