import React, { useState, useEffect } from 'react';
import { 
  Lock, Key, Landmark, LogOut, CheckCircle, Save, Plus, Trash2, 
  Settings, Users, Edit3, Grid, CornerDownRight, Database, Wifi, 
  ShieldAlert, BadgeInfo, Menu, ChevronLeft, ChevronRight, FileText, 
  Activity, Calendar, CheckSquare, Upload, ArrowDownToLine, LockKeyhole
} from 'lucide-react';
import { 
  getCurrentUser, signIn, signOut, isRealSupabase, 
  getSiteConfig, saveSiteConfig, getPlanos, savePlano, deletePlano, 
  getLeads, updateLeadStatus, deleteLead, getUsuarios, saveUsuario, 
  deleteUsuario, uploadFile, changePassword
} from '../lib/supabase';
import { SiteConfig, Plano, Lead, Usuario } from '../types';

interface AdminPanelProps {
  onConfigChange: () => void;
  onPlanosChange: () => void;
}

export default function AdminPanel({ onConfigChange, onPlanosChange }: AdminPanelProps) {
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState('admin@giganet.com.br');
  const [loginPassword, setLoginPassword] = useState('Admin@123');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Forced password change flow ("Forçar alteração de senha no primeiro acesso")
  const [mustChangePassword, setMustChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
  const [passwordChangeError, setPasswordChangeError] = useState('');
  const [passwordChanging, setPasswordChanging] = useState(false);

  // Sidebar responsive & collapsible states
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // Dashboard tabs
  const [activeTab, setActiveTab] = useState<'dashboard' | 'geral' | 'planos' | 'leads' | 'assets' | 'usuarios' | 'supabase'>('dashboard');
  
  // Data State
  const [currentConfig, setCurrentConfig] = useState<SiteConfig | null>(null);
  const [planosList, setPlanosList] = useState<Plano[]>([]);
  const [leadsList, setLeadsList] = useState<Lead[]>([]);
  const [usuariosList, setUsuariosList] = useState<Usuario[]>([]);
  
  // Lead Filter
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');
  
  // Save feedbacks
  const [configSuccess, setConfigSuccess] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  // New or Edited Plano Form
  const [selectedPlano, setSelectedPlano] = useState<Partial<Plano> | null>(null);
  const [planoForm, setPlanoForm] = useState({
    nome: '',
    velocidade: '',
    preco: 0,
    beneficiosStr: '',
    destaque: false,
    ativo: true
  });

  // User form states
  const [newUserOpen, setNewUserOpen] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserName, setNewUserName] = useState('');

  // Assets image preview states
  const [uploadLogoLoading, setUploadLogoLoading] = useState(false);
  const [uploadBannerLoading, setUploadBannerLoading] = useState(false);

  // Check login on startup
  useEffect(() => {
    async function checkAuth() {
      try {
        const u = await getCurrentUser();
        setUser(u);
        if (u) {
          // Check if admin is still logging in with default password
          const initialPwdChanged = localStorage.getItem('giganet_simulated_password_changed') === 'true';
          if (u.email === 'admin@giganet.com.br' && !initialPwdChanged) {
            setMustChangePassword(true);
          } else {
            loadDashboardData();
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setAuthLoading(false);
      }
    }
    checkAuth();
  }, []);

  // Load backend content
  async function loadDashboardData() {
    setDataLoading(true);
    try {
      const cfg = await getSiteConfig();
      setCurrentConfig(cfg);
      
      const pls = await getPlanos();
      setPlanosList(pls);

      const lds = await getLeads();
      setLeadsList(lds);

      const usrs = await getUsuarios();
      setUsuariosList(usrs);
    } catch (e) {
      console.error(e);
    } finally {
      setDataLoading(false);
    }
  }

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const { user: loggedIn, error, needsPasswordChange } = await signIn(loginEmail, loginPassword);
      if (error) {
        setLoginError(error.message);
      } else {
        // Double check forced password change on first login containing default "Admin@123"
        const initialPwdChanged = localStorage.getItem('giganet_simulated_password_changed') === 'true';
        if ((loginEmail === 'admin@giganet.com.br' && loginPassword === 'Admin@123') || (!isRealSupabase && loginEmail === 'admin@giganet.com.br' && !initialPwdChanged)) {
          setUser(loggedIn);
          setMustChangePassword(true);
        } else {
          setUser(loggedIn);
          loadDashboardData();
        }
      }
    } catch (error: any) {
      setLoginError('Falha ao autenticar.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Force Password Change Submit
  const handleForcePasswordChangeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeError('');
    setPasswordChangeSuccess(false);

    if (newPassword.length < 6) {
      setPasswordChangeError('A nova senha deve possuir pelo menos 6 caracteres.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordChangeError('As senhas não coincidem.');
      return;
    }

    setPasswordChanging(true);
    try {
      const { error } = await changePassword(newPassword);
      if (error) {
        setPasswordChangeError(error.message || 'Falha ao alterar senha.');
      } else {
        setPasswordChangeSuccess(true);
        setMustChangePassword(false);
        // Load data on success
        loadDashboardData();
      }
    } catch (e: any) {
      setPasswordChangeError('Falha no processamento.');
    } finally {
      setPasswordChanging(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await signOut();
    setUser(null);
    setMustChangePassword(false);
    setLoginEmail('admin@giganet.com.br');
    setLoginPassword('Admin@123');
  };

  // Save General Config
  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentConfig) return;

    try {
      const saved = await saveSiteConfig(currentConfig);
      setCurrentConfig(saved);
      setConfigSuccess(true);
      onConfigChange(); // Notify parent
      setTimeout(() => setConfigSuccess(false), 3000);
    } catch (e) {
      alert('Falha ao salvar as especificações.');
    }
  };

  // Edit/Add plans triggers
  const handleEditPlanoClick = (plano: Plano | null) => {
    if (plano) {
      setSelectedPlano(plano);
      setPlanoForm({
        nome: plano.nome,
        velocidade: plano.velocidade,
        preco: Number(plano.preco),
        beneficiosStr: plano.beneficios.join('\n'),
        destaque: plano.destaque,
        ativo: plano.ativo
      });
    } else {
      setSelectedPlano({ id: undefined });
      setPlanoForm({
        nome: '',
        velocidade: '',
        preco: 99.90,
        beneficiosStr: '100% Fibra Óptica\nWi-Fi Dual Band incluso\nDownload ilimitado',
        destaque: false,
        ativo: true
      });
    }
  };

  // Save Plan
  const handleSavePlano = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlano) return;

    try {
      const formattedBenefits = planoForm.beneficiosStr
        .split('\n')
        .map(b => b.trim())
        .filter(b => b.length > 0);

      const toSave = {
        id: selectedPlano.id,
        nome: planoForm.nome,
        velocidade: planoForm.velocidade,
        preco: Number(planoForm.preco),
        beneficios: formattedBenefits,
        destaque: planoForm.destaque,
        ativo: planoForm.ativo
      };

      await savePlano(toSave);
      setSelectedPlano(null);
      
      const updatedList = await getPlanos();
      setPlanosList(updatedList);
      onPlanosChange(); // Notify layout App.tsx
    } catch (e) {
      alert('Erro ao guardar configurações de planos.');
    }
  };

  // Delete Plan
  const handleDeletePlano = async (id: string | number) => {
    if (confirm('Tem certeza de que deseja excluir permanentemente este plano?')) {
      try {
        await deletePlano(id);
        const updatedList = await getPlanos();
        setPlanosList(updatedList);
        onPlanosChange();
      } catch (e) {
        alert('Falha ao remover plano.');
      }
    }
  };

  // Update Lead Status
  const handleStatusChange = async (leadId: string | number, newStatus: Lead['status']) => {
    try {
      await updateLeadStatus(leadId, newStatus);
      const updatedLeads = await getLeads();
      setLeadsList(updatedLeads);
    } catch (e) {
      alert('Erro ao atualizar status.');
    }
  };

  // Delete Lead
  const handleDeleteLead = async (leadId: string | number) => {
    if (confirm('Tem certeza de que quer excluir eternamente este lead de cobertura?')) {
      try {
        await deleteLead(leadId);
        const updatedLeads = await getLeads();
        setLeadsList(updatedLeads);
      } catch (e) {
        alert('Erro ao excluir lead.');
      }
    }
  };

  // User Actions
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserEmail || !newUserName) return;
    try {
      await saveUsuario({
        nome: newUserName,
        email: newUserEmail,
        perfil: 'admin'
      });
      setNewUserEmail('');
      setNewUserName('');
      setNewUserOpen(false);
      const usrs = await getUsuarios();
      setUsuariosList(usrs);
    } catch (err) {
      alert('Não foi possível salvar o usuário.');
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (id === 'admin-user-id' || usuariosList.length <= 1) {
      alert('Por motivos de segurança, você não pode deletar o único administrador padrão.');
      return;
    }
    if (confirm('Deletar este acesso de usuário administrativo permanentemente?')) {
      try {
        await deleteUsuario(id);
        const usrs = await getUsuarios();
        setUsuariosList(usrs);
      } catch (e) {
        alert('Não foi possível remover usuário.');
      }
    }
  };

  // Upload Logo directly to Bucket 'logos'
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentConfig) return;

    setUploadLogoLoading(true);
    try {
      const fileName = `logo_${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
      const publicUrl = await uploadFile('logos', fileName, file);
      setCurrentConfig({
        ...currentConfig,
        logo_url: publicUrl
      });
      // Save directly to persist
      await saveSiteConfig({
        ...currentConfig,
        logo_url: publicUrl
      });
      onConfigChange();
    } catch (err) {
      alert('Erro ao subir logotipo ao bucket Supabase.');
    } finally {
      setUploadLogoLoading(false);
    }
  };

  // Upload Banner directly to Bucket 'banners'
  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentConfig) return;

    setUploadBannerLoading(true);
    try {
      const fileName = `banner_${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
      const publicUrl = await uploadFile('banners', fileName, file);
      
      // Update local storage configuration backup for mock resolution, if applicable!
      localStorage.setItem('giganet_banner_url', publicUrl);
      alert('Banner atualizado com sucesso no Supabase Bucket! Você pode consumi-lo em apresentações de fundo.');
    } catch (err) {
      alert('Erro ao subir banner.');
    } finally {
      setUploadBannerLoading(false);
    }
  };

  // Export Leads to CSV ("Permitir exportação de lead para Excel e CSV")
  const exportLeadsToCSV = () => {
    if (leadsList.length === 0) {
      alert('Sem leads para exportar.');
      return;
    }

    // Prepare header keys
    const headers = ['ID', 'NOME', 'WHATSAPP', 'EMAIL', 'CEP', 'ENDERECO', 'PLANO INTEREST', 'OBSERVACOES', 'STATUS', 'DATA CADASTRO'];
    const rows = leadsList.map(lead => [
      lead.id,
      `"${lead.nome.replace(/"/g, '""')}"`,
      `"${lead.whatsapp}"`,
      `"${lead.email}"`,
      `"${lead.cep}"`,
      `"${(lead.endereco || '').replace(/"/g, '""')}"`,
      `"${(lead.plano_interesse || 'Não informado').replace(/"/g, '""')}"`,
      `"${(lead.observacoes || '').replace(/"/g, '""')}"`,
      lead.status,
      lead.created_at || ''
    ]);

    const csvContent = "\uFEFF" + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_giganet_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate Metrics
  const currentMonth = new Date().getMonth();
  const currentYearVal = new Date().getFullYear();
  
  const leadsDoMes = leadsList.filter(l => {
    if (!l.created_at) return false;
    const date = new Date(l.created_at);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYearVal;
  }).length;

  const novosLeads = leadsList.filter(l => l.status === 'novo').length;
  const planosAtivosTotal = planosList.filter(p => p.ativo).length;
  const ultimosCadastrosCount = Math.min(5, leadsList.length);

  // Filtered Leads
  const filteredLeads = leadsList.filter(lead => {
    if (leadStatusFilter === 'all') return true;
    return lead.status === leadStatusFilter;
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin"></div>
          <span className="text-xs text-slate-500 font-bold tracking-widest uppercase mt-4">Verificando Admin...</span>
        </div>
      </div>
    );
  }

  // --- FORCED FIRST-ACCESS PASSWORD CHANGE FLOW ---
  if (user && mustChangePassword) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 py-28 relative">
        <div className="max-w-md w-full bg-white border border-slate-200 p-8 sm:p-10 rounded-2xl shadow-lg relative">
          <div className="text-center mb-6">
            <div className="inline-flex p-3 rounded-xl bg-orange-50 border border-orange-200 text-orange-650 mb-3">
              <LockKeyhole size={28} className="text-orange-500 animate-pulse" />
            </div>
            <h2 className="font-display font-black text-xl text-slate-900 uppercase">Alteração de Senha Obrigatória</h2>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Detectamos que esta conta de administração oficial está utilizando a senha temporária padrão (<strong className="text-slate-800">Admin@123</strong>). Por diretrizes de segurança de dados estritas, você deve fornecer uma nova senha forte para prosseguir.
            </p>
          </div>

          {passwordChangeError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold mb-6">
              {passwordChangeError}
            </div>
          )}

          <form onSubmit={handleForcePasswordChangeSubmit} className="space-y-4">
            <div className="flex flex-col space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-500">Nova Senha Forte</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full bg-white border border-slate-200 focus:border-slate-400 focus:outline-none rounded-xl py-3 px-4 text-sm text-slate-900"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-500">Confirmar Nova Senha</label>
              <input
                type="password"
                required
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Repita a nova senha desejada"
                className="w-full bg-white border border-slate-200 focus:border-slate-400 focus:outline-none rounded-xl py-3 px-4 text-sm text-slate-900"
              />
            </div>

            <button
              type="submit"
              disabled={passwordChanging}
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-all disabled:opacity-50 mt-2 flex items-center justify-center space-x-1.5 shadow-sm"
            >
              <CheckCircle size={14} />
              <span>{passwordChanging ? 'Salvando...' : 'Confirmar e Alterar Senha'}</span>
            </button>
          </form>

          <button
            onClick={handleLogout}
            className="w-full mt-4 text-slate-400 hover:text-slate-600 hover:underline text-xs text-center font-semibold"
          >
            Sair e Voltar depois
          </button>
        </div>
      </div>
    );
  }

  // --- STANDARD SECURITY LOGIN SCREEN ---
  if (!user) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 py-28 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-25 pointer-events-none" />
        
        <div className="relative max-w-md w-full bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl shadow-xl overflow-hidden">
          
          <div className="text-center mb-8">
            <div className="inline-flex p-3.5 rounded-2xl bg-slate-50 text-slate-800 mb-3 border border-slate-100">
              <Lock size={24} className="text-slate-900" />
            </div>
            <h2 className="font-display font-extrabold text-2xl text-slate-900 uppercase tracking-tight">Giganet Admin</h2>
            <p className="text-xs text-slate-500 mt-1.5 uppercase tracking-wide">Área Administrativa do Provedor</p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold mb-6 text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-slate-500">E-mail de Operador</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Ex e-mail ou admin@giganet.com.br"
                required
                className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-slate-400 focus:outline-none rounded-xl py-3 px-4 text-sm text-slate-900"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-slate-500">Senha Secreta</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Senha"
                required
                className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-slate-400 focus:outline-none rounded-xl py-3 px-4 text-sm text-slate-900"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all disabled:opacity-50 mt-2 flex items-center justify-center space-x-2"
            >
              <Key size={13} />
              <span>{loginLoading ? 'Conectando...' : 'Acessar Central Administrativa'}</span>
            </button>
          </form>

          {/* Fallback Simulator Banner details showing standard login credentials */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="flex items-center space-x-1.5 justify-center mb-1 text-slate-600">
                <BadgeInfo size={14} className="text-emerald-500" />
                <span className="text-[10px] font-semibold uppercase tracking-wider">AMBIENTE EM PRODUÇÃO</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed text-center">
                Para testar agora em simulação, use o login homologado:<br />
                E-mail: <strong className="text-slate-900">admin@giganet.com.br</strong><br />
                Senha: <strong className="text-slate-900">Admin@123</strong>
              </p>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // --- LOGGED IN FULL-STACK DASHBOARD ---
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 flex">
      
      {/* 1. COLLAPSIBLE MENU LATERAL RECOlhÍvel */}
      <aside 
        className={`${
          isSidebarCollapsed ? 'w-16' : 'w-64'
        } shrink-0 bg-white border-r border-slate-200 min-h-screen p-4 hidden md:flex flex-col justify-between transition-all duration-300 relative`}
      >
        <div>
          {/* Logo brand */}
          <div className="flex items-center space-x-3 mb-8 px-2 pb-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black">
              G
            </div>
            {!isSidebarCollapsed && (
              <span className="font-display font-black text-sm text-slate-900 uppercase">Giganet Admin</span>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {[
              { id: 'dashboard', label: 'Painel Geral', icon: Grid },
              { id: 'geral', label: 'Configurações', icon: Settings },
              { id: 'planos', label: 'Gerenciar Planos', icon: Wifi },
              { id: 'leads', label: `CRM Leads (${leadsList.length})`, icon: Users },
              { id: 'assets', label: 'Mídias Logos/Banners', icon: Upload },
              { id: 'usuarios', label: 'Usuários Admin', icon: Activity },
              { id: 'supabase', label: 'Supabase Backend', icon: Database },
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id as any); setSelectedPlano(null); }}
                  className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                  title={tab.label}
                >
                  <TabIcon size={14} className="shrink-0" />
                  {!isSidebarCollapsed && <span>{tab.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile and collapse action */}
        <div className="pt-4 border-t border-slate-100">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="w-full flex items-center justify-center p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800 transition-colors mb-3"
            title={isSidebarCollapsed ? 'Expandir Menu' : 'Recolher Menu'}
          >
            {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>

          {!isSidebarCollapsed && (
            <div className="px-2 mb-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Operador</p>
              <p className="text-xs font-bold text-slate-700 truncate">{user?.email}</p>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 p-2.5 rounded-xl bg-red-50 text-red-650 hover:bg-red-100 text-xs font-extrabold transition-colors cursor-pointer"
          >
            <LogOut size={13} />
            {!isSidebarCollapsed && <span>Fazer Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Panel Stage Container */}
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Connection status warning badge */}
        <div className="mb-6 p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white border-slate-200 shadow-sm animate-fade-in text-xs text-slate-600">
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-xl shrink-0 ${isRealSupabase ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
              <Database size={16} />
            </div>
            <div>
              <div className="flex items-center space-x-1.5 leading-none">
                <span className="font-bold uppercase text-slate-500 text-[10px]">REPOSITÓRIO SUPABASE</span>
                <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded border leading-none ${
                    isRealSupabase 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                      : 'bg-amber-50 border-amber-200 text-amber-700'
                  }`}
                >
                  {isRealSupabase ? 'PRODUÇÃO ATIVA' : 'SESSÃO SIMULADA'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                {isRealSupabase 
                  ? 'Você está conectado de forma autêntica à sua tabela de dados do Supabase.' 
                  : 'Modo simulação local (localStorage). Dados persistem no navegador. Para conectar o Supabase real, use a aba "Supabase Backend".'}
              </p>
            </div>
          </div>
        </div>

        {/* --- 1. GENERAL PERFORMANCE DASHBOARD OVERVIEW TAB --- */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            {/* Header metrics card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total de Leads</span>
                  <span className="text-3xl font-display font-black text-slate-900 mt-1 block">{leadsList.length}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 text-slate-700 rounded-2xl">
                  <Activity size={20} />
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Leads do Mês</span>
                  <span className="text-3xl font-display font-black text-slate-900 mt-1 block">{leadsDoMes}</span>
                </div>
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                  <Calendar size={20} />
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Novos Contatos</span>
                  <span className="text-3xl font-display font-black text-emerald-500 mt-1 block">{novosLeads}</span>
                </div>
                <div className="p-3 bg-sky-50 text-sky-650 rounded-2xl">
                  <Users size={20} />
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Planos Ativos</span>
                  <span className="text-3xl font-display font-black text-slate-900 mt-1 block">{planosAtivosTotal}</span>
                </div>
                <div className="p-3 bg-pink-50 text-pink-650 rounded-2xl">
                  <CheckSquare size={20} />
                </div>
              </div>

            </div>

            {/* Quick Actions and Recent leads block */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
                  <div>
                    <h3 className="font-display font-extrabold text-[#0f172a] text-sm uppercase">Últimos Cadastros</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Leads capturados recentemente na ferramenta de cobertura de rede.</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="text-xs text-sky-650 hover:text-sky-700 font-bold"
                  >
                    Ver todos leads →
                  </button>
                </div>

                {leadsList.length === 0 ? (
                  <p className="py-12 text-slate-450 text-slate-400 text-xs text-center font-mono">Sem cadastros na base de dados.</p>
                ) : (
                  <div className="space-y-4">
                    {leadsList.slice(0, 4).map((lead) => (
                      <div key={lead.id} className="flex justify-between items-center p-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs gap-3">
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{lead.nome}</p>
                          <span className="text-[10px] text-slate-400 font-medium block mt-1">CEP: {lead.cep} • {lead.plano_interesse}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold font-mono border ${
                          lead.status === 'novo' 
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                            : 'bg-yellow-50 border-yellow-250 text-yellow-750'
                        }`}>
                          {lead.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick links summary helper columns */}
              <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-[#0f172a] text-sm uppercase mb-4 pb-2 border-b border-slate-100">Atalhos Administrativos</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setActiveTab('planos')}
                      className="w-full py-2.5 px-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs text-left text-slate-700 font-bold border border-slate-100 flex items-center space-x-2"
                    >
                      <Wifi size={14} />
                      <span>Gerenciar Preços de Planos</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('leads')}
                      className="w-full py-2.5 px-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs text-left text-slate-700 font-bold border border-slate-100 flex items-center space-x-2"
                    >
                      <Users size={14} />
                      <span>Análise de Cobertura Leads</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('geral')}
                      className="w-full py-2.5 px-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs text-left text-slate-700 font-bold border border-slate-100 flex items-center space-x-2"
                    >
                      <Settings size={14} />
                      <span>Contatos e Telefone de Atendimento</span>
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 text-xs text-slate-400 text-center leading-relaxed">
                  Sistema operacional otimizado para navegadores e dispositivos móveis corporativos Giganet.
                </div>
              </div>

            </div>
          </div>
        )}

        {/* --- 2. CONFIGURAÇÕES DO SITE site_config TAB --- */}
        {activeTab === 'geral' && currentConfig && (
          <form onSubmit={handleSaveConfig} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6 animate-fade-in">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="font-display font-extrabold text-lg text-slate-900">Configurações Gerais do Provedor</h3>
              <p className="text-xs text-slate-500 mt-1">
                Essas variáveis aplicam as informações do logotipo, WhatsApp, telefone e mídias sociais em todo o site.
              </p>
            </div>

            {configSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-250 text-emerald-700 font-bold text-xs rounded-xl flex items-center space-x-2">
                <CheckCircle size={14} />
                <span>Configurações aplicadas com sucesso e salvas!</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col space-y-1">
                <label className="text-xs text-slate-500 font-bold uppercase">Nome da Empresa</label>
                <input
                  type="text"
                  value={currentConfig.nome_empresa}
                  onChange={(e) => setCurrentConfig({ ...currentConfig, nome_empresa: e.target.value })}
                  required
                  className="w-full bg-white border border-slate-200 focus:border-slate-400 focus:outline-none rounded-xl py-3 px-4 text-sm text-slate-900"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-xs text-slate-500 font-bold uppercase">WhatsApp Comercial (Apenas números + DDD, ex: 5511999999999)</label>
                <input
                  type="text"
                  value={currentConfig.whatsapp}
                  onChange={(e) => setCurrentConfig({ ...currentConfig, whatsapp: e.target.value.replace(/\D/g, '') })}
                  required
                  className="w-full bg-white border border-slate-200 focus:border-slate-400 focus:outline-none rounded-xl py-3 px-4 text-sm text-slate-900"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-xs text-slate-500 font-bold uppercase">Telefone de Atendimento</label>
                <input
                  type="text"
                  value={currentConfig.telefone}
                  onChange={(e) => setCurrentConfig({ ...currentConfig, telefone: e.target.value })}
                  required
                  className="w-full bg-white border border-slate-200 focus:border-slate-400 focus:outline-none rounded-xl py-3 px-4 text-sm text-slate-900"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-xs text-slate-500 font-bold uppercase">E-mail Comercial</label>
                <input
                  type="email"
                  value={currentConfig.email}
                  onChange={(e) => setCurrentConfig({ ...currentConfig, email: e.target.value })}
                  required
                  className="w-full bg-white border border-slate-200 focus:border-slate-400 focus:outline-none rounded-xl py-3 px-4 text-sm text-slate-900"
                />
              </div>

              <div className="flex flex-col space-y-1 sm:col-span-2">
                <label className="text-xs text-slate-500 font-bold uppercase">Endereço de Atendimento Físico</label>
                <input
                  type="text"
                  value={currentConfig.endereco}
                  onChange={(e) => setCurrentConfig({ ...currentConfig, endereco: e.target.value })}
                  required
                  className="w-full bg-white border border-slate-200 focus:border-slate-400 focus:outline-none rounded-xl py-3 px-4 text-sm text-slate-900"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-xs text-slate-500 font-bold uppercase">Instagram (Username)</label>
                <input
                  type="text"
                  value={currentConfig.instagram || ''}
                  onChange={(e) => setCurrentConfig({ ...currentConfig, instagram: e.target.value })}
                  placeholder="giganet_fibra"
                  className="w-full bg-white border border-slate-200 focus:border-slate-400 focus:outline-none rounded-xl py-3 px-4 text-sm text-slate-900"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-xs text-slate-500 font-bold uppercase">Facebook (Nome de Usuário)</label>
                <input
                  type="text"
                  value={currentConfig.facebook || ''}
                  onChange={(e) => setCurrentConfig({ ...currentConfig, facebook: e.target.value })}
                  placeholder="giganetfibra"
                  className="w-full bg-white border border-slate-200 focus:border-slate-400 focus:outline-none rounded-xl py-3 px-4 text-sm text-slate-900"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-605 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-sm"
              >
                <Save size={14} />
                <span>Salvar Alterações Gerais</span>
              </button>
            </div>
          </form>
        )}

        {/* --- 3. GERENCIAR PLANOS TAB --- */}
        {activeTab === 'planos' && (
          <div className="space-y-6 animate-fade-in">
            {!selectedPlano ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6 gap-4">
                  <div>
                    <h3 className="font-display font-extrabold text-md text-slate-900 uppercase">Lista de Planos de Fibra</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Adicione ou remova planos ativos disponíveis no site do Provedor.</p>
                  </div>
                  <button
                    onClick={() => handleEditPlanoClick(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center space-x-1 shrink-0"
                  >
                    <Plus size={14} />
                    <span>Novo Plano</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {planosList.map((plano) => (
                    <div
                      key={plano.id}
                      className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex flex-col justify-between hover:border-slate-350 transition-all"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-slate-900 text-base">{plano.nome}</h4>
                          <span className="text-sm font-bold text-slate-500">{plano.velocidade}</span>
                        </div>
                        
                        <p className="text-2xl font-display font-black text-slate-900 mb-4">
                          R$ {plano.preco.toFixed(2).replace('.', ',')}
                          <span className="text-xs text-slate-500 font-normal ml-1">/mês</span>
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {plano.destaque && (
                            <span className="text-[9px] bg-slate-900 text-white font-mono px-2 py-0.5 rounded-full font-bold">
                              ★ POPULAR / MAIS ASSINADO
                            </span>
                          )}
                          {plano.ativo ? (
                            <span className="text-[9px] bg-emerald-50 border border-emerald-250 text-emerald-700 font-mono px-2 py-0.5 rounded-full font-bold">
                              ✓ EXIBINDO NO SITE
                            </span>
                          ) : (
                            <span className="text-[9px] bg-slate-200 text-slate-500 font-mono px-2 py-0.5 rounded-full font-bold">
                              OCULTO
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-slate-500 space-y-1 mb-4 border-t border-slate-200/60 pt-3">
                          <span className="font-bold text-slate-700 block mb-1">Benefícios cadastrados:</span>
                          {plano.beneficios && plano.beneficios.map((b, i) => (
                            <p key={i} className="flex items-center space-x-2 text-[11px] leading-relaxed">
                              <span className="text-emerald-500 font-bold">•</span>
                              <span>{b}</span>
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-200 flex justify-end space-x-2">
                        <button
                          onClick={() => handleEditPlanoClick(plano)}
                          className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center space-x-1 text-xs font-bold"
                        >
                          <Edit3 size={12} />
                          <span>Editar</span>
                        </button>
                        <button
                          onClick={() => handleDeletePlano(plano.id)}
                          className="px-3.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-650 flex items-center space-x-1 text-xs font-bold"
                        >
                          <Trash2 size={12} />
                          <span>Deletar</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSavePlano} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
                <div className="pb-4 border-b border-slate-100">
                  <h3 className="font-display font-black text-lg text-slate-900 uppercase">
                    {selectedPlano.id ? 'Modificar Plano Regulado' : 'Configurar Novo Plano Fibra'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Defina velocidade, preços e benefícios a serem informados nos cards principais.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col space-y-1">
                    <label className="text-xs text-slate-500 font-bold uppercase">Nome para Exibição Comercial</label>
                    <input
                      type="text"
                      value={planoForm.nome}
                      onChange={(e) => setPlanoForm({ ...planoForm, nome: e.target.value })}
                      placeholder="Ex: Plano Smart 500 Mega"
                      required
                      className="w-full bg-white border border-slate-200 focus:border-slate-400 focus:outline-none rounded-xl py-3 px-4 text-sm text-slate-900"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-xs text-slate-500 font-bold uppercase">Velocidade em Mega / Giga</label>
                    <input
                      type="text"
                      value={planoForm.velocidade}
                      onChange={(e) => setPlanoForm({ ...planoForm, velocidade: e.target.value })}
                      placeholder="Ex: 500 MEGA"
                      required
                      className="w-full bg-white border border-slate-200 focus:border-slate-400 focus:outline-none rounded-xl py-3 px-4 text-sm text-slate-900"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-xs text-slate-500 font-bold uppercase">Mensalidade (Preço R$, ex: 99.90)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={planoForm.preco}
                      onChange={(e) => setPlanoForm({ ...planoForm, preco: Number(e.target.value) })}
                      required
                      className="w-full bg-white border border-slate-200 focus:border-slate-400 focus:outline-none rounded-xl py-3 px-4 text-sm text-slate-900"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-xs text-slate-500 font-bold uppercase">Destaque Geral</label>
                    <div className="flex space-x-6 pt-3">
                      <label className="flex items-center space-x-2 text-xs font-bold text-slate-650 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={planoForm.destaque}
                          onChange={(e) => setPlanoForm({ ...planoForm, destaque: e.target.checked })}
                          className="rounded border-slate-300 accent-emerald-500 h-4 w-4"
                        />
                        <span>Destacar como "Mais Vendido"</span>
                      </label>

                      <label className="flex items-center space-x-2 text-xs font-bold text-slate-650 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={planoForm.ativo}
                          onChange={(e) => setPlanoForm({ ...planoForm, ativo: e.target.checked })}
                          className="rounded border-slate-300 accent-emerald-500 h-4 w-4"
                        />
                        <span>Exibir ATIVO no site</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1 sm:col-span-2">
                    <label className="text-xs text-slate-500 font-bold uppercase">Mais benefícios listáveis no card (Um por linha)</label>
                    <textarea
                      rows={4}
                      value={planoForm.beneficiosStr}
                      onChange={(e) => setPlanoForm({ ...planoForm, beneficiosStr: e.target.value })}
                      placeholder="Fibra pura integrada&#10;Garantia de velocidade&#10;Melhor suporte regional"
                      className="w-full bg-white border border-slate-200 focus:border-slate-400 focus:outline-none rounded-xl py-3 px-4 text-sm text-slate-900 font-mono"
                    ></textarea>
                    <span className="text-[10px] text-slate-400 mt-1 leading-none">
                      * Nota: Wi-Fi Grátis e Tecnologia Fibra já são incorporados por padrão de design comercial.
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setSelectedPlano(null)}
                    className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center space-x-1.5"
                  >
                    <Save size={14} />
                    <span>Salvar Plano</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* --- 4. CRM LEADS LIST TAB (COVERTURA ATIVO) --- */}
        {activeTab === 'leads' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6 animate-fade-in">
            <div className="pb-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="font-display font-extrabold text-slate-900 text-md uppercase">CRM de Leads Cobertura</h3>
                <p className="text-xs text-slate-500 mt-0.5">Monitore os dados solicitados pelos clientes no formulário do portal.</p>
              </div>

              {/* Status Filters and export actions */}
              <div className="flex flex-wrap items-center gap-2.5">
                <select
                  value={leadStatusFilter}
                  onChange={(e) => setLeadStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                >
                  <option value="all">📁 Todos os Leads ({leadsList.length})</option>
                  <option value="novo">🆕 Novo ({leadsList.filter(l => l.status === 'novo').length})</option>
                  <option value="em atendimento">⏳ Em Atendimento ({leadsList.filter(l => l.status === 'em atendimento').length})</option>
                  <option value="finalizado">✓ Convertido ({leadsList.filter(l => l.status === 'finalizado').length})</option>
                </select>

                <button
                  onClick={exportLeadsToCSV}
                  className="px-4 py-2.5 rounded-xl bg-emerald-550 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs flex items-center space-x-1.5 shadow-sm"
                  title="Exportar base sob o formato Excel / CSV com cabeçalhos estruturados"
                >
                  <ArrowDownToLine size={13} />
                  <span>Exportar para CSV (Excel)</span>
                </button>
              </div>
            </div>

            {filteredLeads.length === 0 ? (
              <p className="py-16 text-center text-slate-400 text-xs font-bold uppercase">Nenhum lead localizado sob o filtro atual.</p>
            ) : (
              <div className="overflow-x-auto border border-slate-100 rounded-2xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-b border-slate-200 text-slate-550 font-bold uppercase text-[10px]">
                      <th className="py-3.5 px-4 font-mono">ID / Nome Completo</th>
                      <th className="py-3.5 px-4 font-mono">WhatsApp</th>
                      <th className="py-3.5 px-4 font-mono">Inscrição E-mail</th>
                      <th className="py-3.5 px-4 font-mono">Localização (CEP & Endereço)</th>
                      <th className="py-3.5 px-4 font-mono">Plano & Notas</th>
                      <th className="py-3.5 px-4 font-mono">Interação Status</th>
                      <th className="py-3.5 px-4 font-mono text-center">Excluir</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150">
                    {filteredLeads.map((lead) => {
                      const timeStr = lead.created_at 
                        ? new Date(lead.created_at).toLocaleString('pt-BR') 
                        : 'Não registrada';

                      const textWhatsApp = `Olá ${lead.nome}! Analisamos seu pedido de cobertura da internet ultra Giganet para o CEP ${lead.cep}. Temos ótimas notícias de viabilidade técnica! Qual melhor horário para conversarmos?`;
                      const hrefWhatsApp = `https://wa.me/${lead.whatsapp}?text=${encodeURIComponent(textWhatsApp)}`;

                      return (
                        <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-4">
                            <span className="font-mono text-[9px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded font-bold">#{lead.id}</span>
                            <p className="font-bold text-slate-800 text-sm mt-1">{lead.nome}</p>
                            <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">{timeStr}</span>
                          </td>

                          <td className="py-4 px-4 font-bold">
                            <a
                              href={hrefWhatsApp}
                              target="_blank"
                              referrerPolicy="no-referrer"
                              rel="noopener noreferrer"
                              className="text-emerald-600 hover:underline flex items-center space-x-1"
                              title="Chamar cliente no WhatsApp"
                            >
                              <span>{lead.whatsapp}</span>
                            </a>
                          </td>

                          <td className="py-4 px-4 text-slate-500 max-w-xs truncate">
                            {lead.email || 'Não informado'}
                          </td>

                          <td className="py-4 px-4 leading-relaxed max-w-xs">
                            <span className="font-bold block text-slate-800">CEP: {lead.cep}</span>
                            <span className="text-slate-500 italic block mt-0.5 text-[11px]">{lead.endereco}</span>
                          </td>

                          <td className="py-4 px-4 leading-relaxed">
                            <span className="font-semibold text-slate-700 bg-sky-50 px-2 py-0.5 rounded text-[10px] block w-fit mb-1">{lead.plano_interesse}</span>
                            <span className="text-[11px] text-slate-450 text-slate-500">{lead.observacoes || 'Sem detalhes comerciais'}</span>
                          </td>

                          <td className="py-4 px-4">
                            <select
                              value={lead.status}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                              className={`px-3 py-1.5 rounded-lg border focus:outline-none text-[10px] font-bold ${
                                lead.status === 'novo'
                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                  : lead.status === 'em atendimento'
                                    ? 'bg-yellow-50 border-yellow-250 text-yellow-750'
                                    : 'bg-indigo-50 border-indigo-200 text-indigo-700'
                              }`}
                            >
                              <option value="novo">🆕 Novo</option>
                              <option value="em atendimento">⏳ Atendimento</option>
                              <option value="finalizado">✓ Finalizado</option>
                            </select>
                          </td>

                          <td className="py-4 px-4 text-center">
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-1 px-2.5 rounded bg-red-50 hover:bg-red-150 border border-red-100 text-red-650 font-bold hover:text-red-700 font-mono text-[10px] transition-colors"
                              title="Remover permanentemente"
                            >
                              Excluir
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* --- 5. LOGO & BANNER BUCKET ASSETS MANAGEMENT TAB --- */}
        {activeTab === 'assets' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-8 animate-fade-in">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="font-display font-extrabold text-slate-900 text-md uppercase">Mídias de Logos, Banners & Imagens (Storage Bucets)</h3>
              <p className="text-xs text-slate-500 mt-1">
                Fazer upload direto para os buckets do Supabase (<code className="text-slate-800 bg-slate-50 px-1 rounded">logos</code>, <code className="text-slate-800 bg-slate-50 px-1 rounded">banners</code>, <code className="text-slate-800 bg-slate-50 px-1 rounded">uploads</code>).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Logo upload sector */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm block">Substituir Logotipo da Empresa</h4>
                  <p className="text-xs text-slate-500 mt-1">Carregue um arquivo (.png ou .svg preferencialmente) para o bucket de Logos.</p>
                  
                  {currentConfig?.logo_url ? (
                    <div className="mt-4 p-4 bg-white border border-slate-220/60 rounded-xl flex items-center justify-center">
                      <img src={currentConfig.logo_url} alt="Logo Atual" className="h-10 w-auto object-contain" referrerPolicy="no-referrer" />
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-400 font-mono mt-4 text-center p-4 bg-white border border-dashed border-slate-220 rounded-xl">Nenhum logotipo customizado cadastrado.</p>
                  )}
                </div>
                
                <div className="mt-6 border-t border-slate-200 pt-4">
                  <label className="relative cursor-pointer flex items-center justify-center space-x-2 px-4 py-3 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition">
                    {uploadLogoLoading ? (
                      <span className="animate-pulse">Enviando imagem ao Supabase...</span>
                    ) : (
                      <>
                        <Upload size={14} className="text-emerald-500" />
                        <span>Selecionar Novo Logotipo</span>
                      </>
                    )}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleLogoUpload} 
                      disabled={uploadLogoLoading}
                      className="hidden" 
                    />
                  </label>
                </div>
              </div>

              {/* Banner Upload sector */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm block">Carregar Banner Principal corporativo</h4>
                  <p className="text-xs text-slate-500 mt-1">Carregue imagens para o bucket de Banners do Supabase para usar de plano de fundo.</p>
                  <p className="text-[11px] text-slate-450 text-slate-450 mt-3 p-4 bg-white border border-dashed border-slate-200 rounded-xl leading-relaxed text-center">
                    Ganhos estéticos: imagens panorâmicas de satélites ou cabo de fibra.
                  </p>
                </div>

                <div className="mt-6 border-t border-slate-200 pt-4">
                  <label className="relative cursor-pointer flex items-center justify-center space-x-2 px-4 py-3 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition">
                    {uploadBannerLoading ? (
                      <span className="animate-pulse">Subindo arquivo banner...</span>
                    ) : (
                      <>
                        <Upload size={14} className="text-emerald-500" />
                        <span>Subir Imagem de Banner</span>
                      </>
                    )}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleBannerUpload} 
                      disabled={uploadBannerLoading}
                      className="hidden" 
                    />
                  </label>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* --- 6. GERENCIAR USUÁRIOS ADMINISTRADORES TAB --- */}
        {activeTab === 'usuarios' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6 animate-fade-in">
            <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-display font-extrabold text-slate-900 text-md uppercase">Operadores Administrativos</h3>
                <p className="text-xs text-slate-400 mt-0.5">Veja a listagem das contas autorizadas a editar o painel.</p>
              </div>
              <button
                onClick={() => setNewUserOpen(!newUserOpen)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center space-x-1"
              >
                <Plus size={14} />
                <span>Registrar Novo Operador</span>
              </button>
            </div>

            {newUserOpen && (
              <form onSubmit={handleCreateUser} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <span className="text-xs font-bold text-slate-700 uppercase">Novo Acesso Operador</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold uppercase">Nome Completo</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Pedro Henrique"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:outline-none rounded-xl py-2 px-3 text-sm text-slate-900"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold uppercase">E-mail Comercial</label>
                    <input
                      type="email"
                      required
                      placeholder="Ex: pedro@giganet.com.br"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:outline-none rounded-xl py-2 px-3 text-sm text-slate-900"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => { setNewUserOpen(false); setNewUserEmail(''); setNewUserName(''); }}
                    className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-650 font-bold text-xs"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs"
                  >
                    Conceder Acesso Admin
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-3.5">
              {usuariosList.map((usr) => (
                <div key={usr.id} className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-mono text-[9px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded font-bold uppercase">Perfil: {usr.perfil}</span>
                    <p className="font-bold text-slate-800 text-sm mt-1">{usr.nome}</p>
                    <span className="text-slate-500 tracking-wide font-mono">{usr.email}</span>
                  </div>
                  
                  <button
                    onClick={() => handleDeleteUser(usr.id)}
                    className="p-1 px-2.5 rounded bg-red-50 hover:bg-red-100 border border-red-200 text-red-650 font-bold"
                  >
                    Remover Acesso
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- 7. DYNAMIC SUPABASE TUTORIAL GUIDE TAB --- */}
        {activeTab === 'supabase' && (
          <div className="space-y-6 animate-fade-in bg-white border border-slate-205 rounded-3xl p-8 shadow-sm">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="font-display font-black text-slate-900 text-md uppercase">Hospedagem & Conectar Supabase</h3>
              <p className="text-xs text-slate-500 mt-1">Procedimentos formais para linkar seu repositório de dados persistentes no ar.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-4">
              <p>
                O código fonte deste provedor foi escrito com total adesão técnica ao Supabase Client. Todas as funções chave do CRM e do modificador de variáveis de plans do site estão mapeadas e preparadas para rodar logo após você copiar o URL do seu projeto e Anon Key.
              </p>
              
              <div className="p-4 bg-slate-200/50 border border-slate-200 rounded-xl space-y-3">
                <span className="font-bold text-slate-800 block">Instrução de implantação rápida:</span>
                <ol className="list-decimal pl-4 space-y-1 text-slate-500">
                  <li>Crie uma conta gratuita no <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-slate-900 font-bold hover:underline">Supabase</a></li>
                  <li>Inicie uma nova instância de banco de dados vinculando suas tabelas e execute as migrações SQL</li>
                  <li>Preencha as variáveis de ambiente na Vercel (ou em arquivos local .env):</li>
                </ol>
                <div className="bg-slate-950 p-3 rounded-lg text-white font-mono text-[10px] space-y-1">
                  <p><span className="text-sky-400">VITE_SUPABASE_URL</span>="https://suacontasupabase.supabase.co"</p>
                  <p><span className="text-sky-400">VITE_SUPABASE_ANON_KEY</span>="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.youranonkeyhere"</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
