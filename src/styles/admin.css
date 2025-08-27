import MenuItem from './MenuItem';
import { FiUsers, FiFileText, FiCreditCard, FiDollarSign, FiSend, FiLink, FiLock, FiSettings, FiHome } from 'react-icons/fi';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4 border-b">
        <h1 className="text-xl font-semibold text-gray-800">Sebpay Admin</h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          <MenuItem icon={<FiHome />} text="Dashboard" href="/admin" />
          
          {/* Administration & Autorisation */}
          <MenuItem icon={<FiUsers />} text="Utilisateurs" href="/admin/users" />
          <MenuItem icon={<FiUsers />} text="Rôles Utilisateurs" href="/admin/user-roles" />
          
          {/* Gestion KYC */}
          <MenuItem icon={<FiFileText />} text="Documents KYC" href="/admin/kyc" />
          <MenuItem icon={<FiFileText />} text="Types Documents" href="/admin/kyc-document-types" />
          
          {/* Marchands */}
          <MenuItem icon={<FiCreditCard />} text="Marchands" href="/admin/merchants" />
          <MenuItem icon={<FiCreditCard />} text="Historique Marchands" href="/admin/merchant-histories" />
          
          {/* Transactions */}
          <MenuItem icon={<FiDollarSign />} text="Transactions" href="/admin/transactions" />
          <MenuItem icon={<FiSend />} text="Transferts P2P" href="/admin/p2p-transfers" />
          <MenuItem icon={<FiLink />} text="Liens de Paiement" href="/admin/payment-links" />
          
          {/* Retraits */}
          <MenuItem icon={<FiDollarSign />} text="Demandes de Retrait" href="/admin/withdrawal-requests" />
          
          {/* Suspensions */}
          <MenuItem icon={<FiLock />} text="Suspensions de Compte" href="/admin/account-suspensions" />
          
          {/* API */}
          <MenuItem icon={<FiSettings />} text="Documentation API" href="/admin/api/docs" />
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;