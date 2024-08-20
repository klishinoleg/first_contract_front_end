import {getHttpEndpoint} from '@orbs-network/ton-access';
import {TonClient} from 'ton';
import {useAsyncInitialize} from './useAsyncInitialize';
import {USE_TESTNET} from "../settings/vars.ts";

export function useTonClient() {
    return useAsyncInitialize(
        async () =>
            new TonClient({
                endpoint: await getHttpEndpoint({network: USE_TESTNET ? 'testnet' : 'mainnet'}),
            })
    );
}
