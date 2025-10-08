'use client';

import NavItem from './NavItem';
import {
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  DollarSign,
  Send,
  Link,
  Lock,
  Settings,
} from 'lucide-react';

const NAV_ITEMS = [
  {
    href: '/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
    label: 'Dashboard',
  },
  {
    href: '/users',
    icon: <Users className="h-5 w-5" />,
    label: 'Utilisateurs',
  },
  {
    href: '/kyc/merchants',
    icon: <FileText className="h-5 w-5" />,
    label: 'Documents KYC',
  },
  {
    href: '/merchants',
    icon: <CreditCard className="h-5 w-5" />,
    label: 'Marchands',
  },
  {
    href: '/transactions',
    icon: <DollarSign className="h-5 w-5" />,
    label: 'Transactions',
  },
  {
    href: '/p2p',
    icon: <Send className="h-5 w-5" />,
    label: 'Transferts P2P',
  },
  {
    href: '/payments',
    icon: <Link className="h-5 w-5" />,
    label: 'Liens de Paiement',
  },
  {
    href: '/withdrawals',
    icon: <DollarSign className="h-5 w-5" />,
    label: 'Demandes de Retrait',
  },
  {
    href: '/suspensions',
    icon: <Lock className="h-5 w-5" />,
    label: 'Suspensions',
  },
  {
    href: '/merchants/historical',
    icon: <Settings className="h-5 w-5" />,
    label: 'Historique Marchands',
  },
];

export default function Sidebar() {

  return (
    <aside className="hidden w-[210px] flex-col border-r border-gradiant-y bg-(--side-bg) sm:flex">
      <div className=" border-b border-gradiant h-(--top-bar-height) overflow-hidden flex items-center justify-center space-x-2">
        <div className="flex size-10 items-center justify-center rounded-lg bg-(image:--sebpay-gradiant-color)"><span className="text-xl font-bold text-white">S</span></div>
        <span className="bg-(image:--sebpay-gradiant-color) bg-clip-text text-2xl font-bold text-transparent">Sebpay</span>
      </div>
      <nav className="flex-1 h-screen overflow-auto">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.href}
            href={ item.href }
            icon={ item.icon }
            className='px-5'
          >
            { item.label }
          </NavItem>
        ))}
      </nav>
    </aside>
  );
}