import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from '@blockchain-playground/ui';
import { Loader2, Send } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { isAddress, parseEther } from 'viem';
import { useAccount, useBalance, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { formatBalance } from '@/lib/utils';

export function TransferForm() {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const {
    sendTransaction,
    data: hash,
    isPending: isSending,
    error: sendError,
  } = useSendTransaction();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: confirmError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipient || !amount) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!isAddress(recipient)) {
      toast.error('Invalid recipient address');
      return;
    }

    try {
      const value = parseEther(amount);
      await sendTransaction({
        to: recipient as `0x${string}`,
        value,
      });
      toast.success('Transaction sent!');
    } catch (error) {
      toast.error('Failed to send transaction');
      console.error(error);
    }
  };

  if (!address) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Send Transaction
          </CardTitle>
          <CardDescription>Connect your wallet to send transactions</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (isConfirmed) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Transaction Confirmed
          </CardTitle>
          <CardDescription>Your transaction has been confirmed!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm">
              Transaction Hash:
              <span className="font-mono text-xs block">{hash}</span>
            </p>
            <Button
              onClick={() => {
                setRecipient('');
                setAmount('');
                window.location.reload(); // Reset component state
              }}
              className="w-full"
            >
              Send Another Transaction
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" />
          Send Transaction
        </CardTitle>
        <CardDescription>
          Available: {formatBalance(balance?.formatted || '0')} {balance?.symbol}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="recipient" className="text-sm font-medium">
              Recipient Address
            </label>
            <Input
              id="recipient"
              type="text"
              placeholder="0x..."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="font-mono"
            />
          </div>

          <div>
            <label htmlFor="amount" className="text-sm font-medium">
              Amount ({balance?.symbol})
            </label>
            <Input
              id="amount"
              type="number"
              placeholder="0.0"
              step="0.0001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSending || isConfirming || !recipient || !amount}
          >
            {(isSending || isConfirming) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSending ? 'Sending...' : isConfirming ? 'Confirming...' : 'Send Transaction'}
          </Button>

          {(sendError || confirmError) && (
            <p className="text-sm text-destructive">
              Error: {sendError?.message || confirmError?.message}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
