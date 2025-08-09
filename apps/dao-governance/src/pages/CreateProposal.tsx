import { Button, Card, Input, Select, Textarea } from '@blockchain-playground/ui';
import { ArrowLeft, Info, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { useGovernanceStore } from '@/stores/governanceStore';
import type { ProposalAction, ProposalType } from '@/types';

type ProposalActionWithId = ProposalAction & { id: string };

export default function CreateProposal() {
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const { createProposal, isLoading } = useGovernanceStore();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'social' as ProposalType,
    votingPeriod: 604800, // 7 days in seconds
    quorum: '10000000000000000000000000', // 10M tokens
    threshold: '51', // 51%
  });

  const [actions, setActions] = useState<ProposalActionWithId[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addAction = () => {
    setActions((prev) => [
      ...prev,
      {
        id: `action-${Date.now()}-${Math.random().toString(36).substring(2)}`,
        target: '',
        value: '0',
        calldata: '0x',
        signature: '',
        description: '',
      },
    ]);
  };

  const updateAction = (index: number, field: keyof ProposalActionWithId, value: string) => {
    setActions((prev) =>
      prev.map((action, i) => (i === index ? { ...action, [field]: value } : action))
    );
  };

  const removeAction = (index: number) => {
    setActions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected) {
      toast.error('Please connect your wallet to create a proposal');
      return;
    }

    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const proposalId = await createProposal({
        ...formData,
        actions,
      });

      toast.success('Proposal created successfully!');
      navigate(`/proposals/${proposalId}`);
    } catch (error) {
      // Error is handled in the store
      console.error('Failed to create proposal:', error);
    }
  };

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground mb-4">
          Please connect your wallet to create a proposal
        </div>
        <Link to="/proposals">
          <Button>Back to Proposals</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <Link
        to="/proposals"
        className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Proposals</span>
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Create New Proposal</h1>
        <p className="text-muted-foreground mt-2">
          Submit a proposal for community voting and discussion.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>

          <div className="space-y-4">
            <div>
              <label htmlFor="proposal-title" className="block text-sm font-medium mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <Input
                id="proposal-title"
                placeholder="Enter proposal title..."
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                maxLength={200}
              />
              <div className="text-xs text-muted-foreground mt-1">
                {formData.title.length}/200 characters
              </div>
            </div>

            <div>
              <div className="block text-sm font-medium mb-2">
                Type <span className="text-red-500">*</span>
              </div>
              <Select
                value={formData.type}
                onValueChange={(value) => handleInputChange('type', value)}
              >
                <option value="constitutional">Constitutional</option>
                <option value="treasury">Treasury</option>
                <option value="technical">Technical</option>
                <option value="social">Social</option>
                <option value="emergency">Emergency</option>
              </Select>
            </div>

            <div>
              <label htmlFor="proposal-description" className="block text-sm font-medium mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="proposal-description"
                placeholder="Describe your proposal in detail. You can use Markdown formatting..."
                value={formData.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleInputChange('description', e.target.value)
                }
                rows={12}
                maxLength={5000}
              />
              <div className="text-xs text-muted-foreground mt-1">
                {formData.description.length}/5000 characters. Markdown supported.
              </div>
            </div>
          </div>
        </Card>

        {/* Voting Parameters */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Voting Parameters</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="voting-period" className="block text-sm font-medium mb-2">
                Voting Period (days)
              </label>
              <Input
                id="voting-period"
                type="number"
                min="1"
                max="30"
                value={formData.votingPeriod / 86400}
                onChange={(e) =>
                  handleInputChange('votingPeriod', (Number(e.target.value) * 86400).toString())
                }
              />
            </div>

            <div>
              <label htmlFor="quorum" className="block text-sm font-medium mb-2">
                Quorum (tokens)
              </label>
              <Input
                id="quorum"
                placeholder="10000000"
                value={Number(formData.quorum) / 1e18}
                onChange={(e) =>
                  handleInputChange('quorum', (Number(e.target.value) * 1e18).toString())
                }
              />
            </div>

            <div>
              <label htmlFor="threshold" className="block text-sm font-medium mb-2">
                Threshold (%)
              </label>
              <Input
                id="threshold"
                type="number"
                min="1"
                max="100"
                value={formData.threshold}
                onChange={(e) => handleInputChange('threshold', e.target.value)}
              />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
            <div className="flex items-start space-x-2">
              <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <strong>Voting Parameters:</strong> Quorum is the minimum number of tokens that must
                vote. Threshold is the percentage of "For" votes needed to pass.
              </div>
            </div>
          </div>
        </Card>

        {/* Actions (Optional) */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Actions (Optional)</h3>
            <Button type="button" variant="outline" onClick={addAction}>
              <Plus className="h-4 w-4 mr-2" />
              Add Action
            </Button>
          </div>

          {actions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No actions added. Actions are optional and define what happens if the proposal passes.
            </div>
          ) : (
            <div className="space-y-4">
              {actions.map((action, index) => (
                <div key={action.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">Action #{index + 1}</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeAction(index)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`target-${index}`} className="block text-xs font-medium mb-1">
                        Target Contract
                      </label>
                      <Input
                        id={`target-${index}`}
                        placeholder="0x..."
                        value={action.target}
                        onChange={(e) => updateAction(index, 'target', e.target.value)}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={`signature-${index}`}
                        className="block text-xs font-medium mb-1"
                      >
                        Function Signature
                      </label>
                      <Input
                        id={`signature-${index}`}
                        placeholder="transfer(address,uint256)"
                        value={action.signature}
                        onChange={(e) => updateAction(index, 'signature', e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor={`description-${index}`}
                        className="block text-xs font-medium mb-1"
                      >
                        Description
                      </label>
                      <Input
                        id={`description-${index}`}
                        placeholder="What does this action do?"
                        value={action.description}
                        onChange={(e) => updateAction(index, 'description', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Submit */}
        <div className="flex justify-end space-x-4">
          <Link to="/proposals">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Proposal'}
          </Button>
        </div>
      </form>
    </div>
  );
}
