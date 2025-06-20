'use client';

import { Button } from '@/components/ui/button';
import { useConnect, useAccount, useDisconnect } from 'wagmi';
import { coinbaseWallet } from 'wagmi/connectors';
import { useEffect } from 'react';

export default function ConnectWalletButton() {
  const { connect, connectors, isPending, error: connectError } = useConnect();
  const { address, isConnected, status } = useAccount();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    console.log(
      '[ConnectWalletButton] Available connectors:',
      connectors.map((c) => c.id)
    );
  }, [connectors]);

  useEffect(() => {
    console.log(
      '[ConnectWalletButton] useAccount status:',
      status,
      'isConnected:',
      isConnected,
      'address:',
      address
    );
    if (isConnected && address) {
      console.log('[ConnectWalletButton] Wallet connected:', address);
    } else {
      console.log('[ConnectWalletButton] Wallet disconnected');
    }
  }, [isConnected, address, status]);

  useEffect(() => {
    if (connectError) {
      console.error('[ConnectWalletButton] Connect error:', connectError);
    }
  }, [connectError]);

  const handleConnect = () => {
    console.log(
      '[ConnectWalletButton] Connect button clicked. Available connectors:',
      connectors.map((c) => c.id)
    );
    const connectorToUse = connectors[0];
    if (connectorToUse) {
      connect({ connector: connectorToUse });
      console.log('[ConnectWalletButton] connect() called with:', connectorToUse);
    } else {
      console.warn('[ConnectWalletButton] No connector found.');
    }
  };

  const handleDisconnect = () => {
    console.log('[ConnectWalletButton] Disconnect button clicked.');
    disconnect();
    console.log('[ConnectWalletButton] disconnect() called.');
  };

  if (isConnected && address) {
    return (
      <Button
        variant="outline"
        className="bg-black text-white hover:bg-gray-800 transition-colors duration-200 active:scale-95"
        onClick={handleDisconnect}
      >
        {address.slice(0, 6)}...{address.slice(-4)}
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      className="bg-black text-white hover:bg-gray-800 transition-colors duration-200 active:scale-95"
      onClick={handleConnect}
      disabled={isPending}
    >
      Connect Wallet
    </Button>
  );
}
