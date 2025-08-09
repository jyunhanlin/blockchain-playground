import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// Layout components
import Navbar from './components/governance/Navbar';
import Sidebar from './components/governance/Sidebar';
import CreateProposalPage from './pages/CreateProposal';
// Page components
import Dashboard from './pages/Dashboard';
import DiscussionDetailPage from './pages/DiscussionDetail';
import DiscussionsPage from './pages/Discussions';
import ProfilePage from './pages/Profile';
import ProposalDetailPage from './pages/ProposalDetail';
import ProposalsPage from './pages/Proposals';
import VotingHistoryPage from './pages/VotingHistory';

// Store
import { useGovernanceStore } from './stores/governanceStore';

export default function App() {
  const { loadProposals } = useGovernanceStore();

  // Load initial data
  useEffect(() => {
    loadProposals();
  }, [loadProposals]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6 ml-64">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/proposals" element={<ProposalsPage />} />
            <Route path="/proposals/:id" element={<ProposalDetailPage />} />
            <Route path="/create-proposal" element={<CreateProposalPage />} />
            <Route path="/voting-history" element={<VotingHistoryPage />} />
            <Route path="/discussions" element={<DiscussionsPage />} />
            <Route path="/discussions/:id" element={<DiscussionDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
