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
          <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900 flex items-center justify-center">
            <Send className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Send Transaction
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Available:{' '}
              <span className="font-semibold">
                {formatBalance(balance?.formatted || '0')} {balance?.symbol}
              </span>
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="recipient"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Recipient Address
            </label>
            <Input
              id="recipient"
              type="text"
              placeholder="0x1234...abcd"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="font-mono text-sm"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Enter the Ethereum address of the recipient
            </p>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="amount"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Amount ({balance?.symbol})
            </label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                placeholder="0.0"
                step="0.0001"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pr-16"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400">
                {balance?.symbol}
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Minimum: 0.0001 {balance?.symbol}</span>
              <button
                type="button"
                onClick={() => setAmount(balance?.formatted || '0')}
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Use Max
              </button>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSending || isConfirming || !recipient || !amount}
          >
            {(isSending || isConfirming) && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {isSending
              ? 'Sending Transaction...'
              : isConfirming
              ? 'Confirming...'
              : 'Send Transaction'}
          </Button>

          {(sendError || confirmError) && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg dark:bg-red-950/20 dark:border-red-800">
              <p className="text-sm text-red-600 dark:text-red-400">
                Error: {sendError?.message || confirmError?.message}
              </p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
