import React, { useState, useEffect } from 'react';
import {
  getAllClients,
  saveClient,
  deleteClient,
  getCompanyConfig,
  saveCompanyConfig,
  getClientByShareToken,
} from './utils/storageService';
import NihalcoLanding from './components/NihalcoLanding';
import AdminDashboard from './components/AdminDashboard';
import AdminLoginModal from './components/AdminLoginModal';
import ClientMagazineView from './components/ClientMagazineView';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(true);

  // NIHALCO Platform State
  const [companyConfig, setCompanyConfig] = useState({});
  const [clients, setClients] = useState([]);

  // Auth & View Routing State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  // Hash-based share token routing (e.g. #/m/nih001x9a8b)
  const [shareToken, setShareToken] = useState(null);
  const [activeClientData, setActiveClientData] = useState(null);

  // Load state on startup
  useEffect(() => {
    async function initPlatform() {
      try {
        const configData = await getCompanyConfig();
        const clientsData = await getAllClients();
        setCompanyConfig(configData);
        setClients(clientsData);

        // Check hash URL routing (e.g. #/m/token or #/admin)
        const hash = window.location.hash;
        if (hash.includes('#/m/')) {
          const token = hash.split('#/m/')[1];
          setShareToken(token);
          const clientData = await getClientByShareToken(token);
          setActiveClientData(clientData);
        } else if (hash === '#/admin') {
          setIsAdminLoginOpen(true);
        }
      } catch (err) {
        console.error('Initialization error:', err);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    }

    initPlatform();

    const handleHashChange = async () => {
      const hash = window.location.hash;
      if (hash.includes('#/m/')) {
        const token = hash.split('#/m/')[1];
        setShareToken(token);
        const clientData = await getClientByShareToken(token);
        setActiveClientData(clientData);
      } else if (hash === '#/admin') {
        setIsAdminLoginOpen(true);
      } else {
        setShareToken(null);
        setActiveClientData(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Save/Update Client
  const handleSaveClient = async (updatedClient) => {
    const existingIndex = clients.findIndex((c) => c.id === updatedClient.id);
    let newClients;
    if (existingIndex >= 0) {
      newClients = [...clients];
      newClients[existingIndex] = updatedClient;
    } else {
      newClients = [updatedClient, ...clients];
    }
    setClients(newClients);
    await saveClient(updatedClient);
  };

  // Delete Client
  const handleDeleteClient = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this client workspace?')) {
      const filtered = clients.filter((c) => c.id !== id);
      setClients(filtered);
      await deleteClient(id);
    }
  };

  // Save Company Config
  const handleSaveCompanyConfig = async (newConfig) => {
    setCompanyConfig(newConfig);
    await saveCompanyConfig(newConfig);
  };

  // Open Client Preview
  const handlePreviewClient = async (token) => {
    window.location.hash = `#/m/${token}`;
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-charcoal text-ivory font-sans">
        <div className="w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center font-serif text-3xl text-gold mb-6 animate-pulse shadow-gold-glow">
          N
        </div>
        <h2 className="font-serif text-2xl tracking-widest text-gold uppercase">
          NIHALCO
        </h2>
        <p className="text-xs uppercase tracking-ultra text-ivory/60 mt-2 font-light flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gold animate-spin" />
          <span>Loading Preserved Platform...</span>
        </p>
      </div>
    );
  }

  // ROUTE 1: PUBLIC CLIENT MAGAZINE VIEW (`#/m/:shareToken`)
  if (shareToken) {
    return (
      <ClientMagazineView
        clientData={activeClientData}
        onGoHome={() => {
          window.location.hash = '';
        }}
      />
    );
  }

  // ROUTE 2: ADMIN STUDIO DASHBOARD (`/admin`)
  if (isAdminAuthenticated) {
    return (
      <AdminDashboard
        clients={clients}
        companyConfig={companyConfig}
        onSaveClient={handleSaveClient}
        onDeleteClient={handleDeleteClient}
        onSaveCompanyConfig={handleSaveCompanyConfig}
        onCloseAdmin={() => setIsAdminAuthenticated(false)}
        onPreviewClient={handlePreviewClient}
      />
    );
  }

  // ROUTE 3: NIHALCO PUBLIC LANDING PAGE (`/`)
  const publishedClients = clients.filter((c) => c.status === 'PUBLISHED');

  return (
    <>
      <NihalcoLanding
        config={companyConfig}
        publishedClients={publishedClients}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onViewClientMagazine={(token) => {
          window.location.hash = `#/m/${token}`;
        }}
      />

      {/* Admin Passcode Authentication Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={() => setIsAdminAuthenticated(true)}
      />
    </>
  );
}
