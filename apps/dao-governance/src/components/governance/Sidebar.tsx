import { Button } from '@blockchain-playground/ui';
import {
  FileText,
  History,
  LayoutDashboard,
  MessageSquare,
  Plus,
  TrendingUp,
  Users,
  Vote,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Proposals',
    href: '/proposals',
    icon: FileText,
  },
  {
    name: 'Discussions',
    href: '/discussions',
    icon: MessageSquare,
  },
  {
    name: 'Voting History',
    href: '/voting-history',
    icon: History,
  },
];

const quickActions = [
  {
    name: 'Create Proposal',
    href: '/create-proposal',
    icon: Plus,
    variant: 'default' as const,
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border">
      <div className="flex flex-col h-full">
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <div className="mb-6">
            <h2 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Navigation
            </h2>
          </div>

          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </Link>
            );
          })}

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Quick Actions
            </h2>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <Link key={action.name} to={action.href}>
                  <Button variant={action.variant} className="w-full justify-start" size="sm">
                    <action.icon className="mr-2 h-4 w-4" />
                    {action.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mt-8 space-y-4">
            <h2 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Quick Stats
            </h2>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Active Proposals</span>
                <Vote className="h-4 w-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-foreground">3</div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Participation Rate</span>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-foreground">23.7%</div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total Voters</span>
                <Users className="h-4 w-4 text-purple-500" />
              </div>
              <div className="text-2xl font-bold text-foreground">1,432</div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
