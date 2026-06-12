import React, { useState, useEffect } from 'react';
import { 
  Lock, Key, Landmark, LogOut, CheckCircle, Save, Plus, Trash2, 
  Settings, Users, Edit3, Grid, CornerDownRight, Database, Wifi, ShieldAlert, BadgeInfo 
} from 'lucide-react';
import { 
  getCurrentUser, signIn, signOut, isRealSupabase, 
  getSiteConfig, saveSiteConfig, getPlanos, savePlano, deletePlano, 
  getLeads, updateLeadStatus, deleteLead 
} from '../lib/supabase';
import { SiteConfig, Plano, LeadCobertura, LeadStatus } from '../types';
import SupabaseGuide from './SupabaseGuide';

interface AdminPanelProps {
  onConfigChange: () => void;
  onPlanosChange: () => void;
}

export default function AdminPanel({ onConfigChange, onPlanosChange }: AdminPanelProps) {
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState('admin@giganet.com.br');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboards tabs
  const [activeTab, setActiveTab] = useState<'geral' | 'planos' | 'leads' | 'supabase'>('geral');
  
  // Data State
  const [currentConfig, setCurrentConfig] = useState<SiteConfig | null>(null);
  const [planosList, setPlanosList] = useState<Plano[]>([]);
  const [leadsList, setLeadsList] = useState<LeadCobertura[]>([]);
  
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

  // Check login on startup
  useEffect(() => {
    async function checkAuth() {
      try {
        const u = await getCurrentUser();
        setUser(u);
        if (u) {
          loadDashboardData();
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
      const { user: loggedIn, error } = await signIn(loginEmail, loginPassword);
      if (error) {
        setLoginError(error.message);
      } else {
        setUser(loggedIn);
        loadDashboardData();
      }
    } catch (error: any) {
      setLoginError('Falha ao autenticar.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await signOut();
    setUser(null);
    setLoginEmail('admin@giganet.com.br');
    setLoginPassword('admin123');
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
      alert('Falha ao salvar especificações gerais.');
    }
  };

  // Select a plan to edit or trigger "New"
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
        beneficiosStr: '100% Fibra Óptica\nWi-Fi incluso\nDownload ilimitado',
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
      
      // refresh plans list
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
  const handleStatusChange = async (leadId: string | number, newStatus: LeadStatus) => {
    try {
      await updateLeadStatus(leadId, newStatus);
      // reload lists
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

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#070b19] flex items-center justify-center p-4">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-brand-purple border-t-brand-neon rounded-full animate-spin"></div>
          <span className="text-xs text-slate-400 font-mono mt-4">Verificando Credenciais...</span>
        </div>
      </div>
    );
  }

  // --- LOGIN SCREEN ---
  if (!user) {
    return (
      <div className="min-h-screen bg-[#070b19] flex items-center justify-center p-4 py-28 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#14192d_1px,transparent_1px),linear-gradient(to_bottom,#14192d_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 pointer-events-none" />
        
        <div className="relative max-w-md w-full bg-[#0d142c] border border-slate-850 p-6 sm:p-10 rounded-3xl shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-brand-purple to-brand-bright-blue" />
          
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-bright-blue mb-3">
              <Lock size={28} />
            </div>
            <h2 className="font-display font-black text-2xl text-white">GIGANET Admin</h2>
            <p className="text-xs text-slate-400 mt-1.5">Área de gerenciamento exclusiva do provedor</p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-xl text-xs font-semibold mb-6">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] font-mono font-bold uppercase text-slate-400">E-mail Administrativo</label>
              <input
                type="text"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Ex e-mail ou 'admin@giganet.com.br'"
                required
                className="w-full bg-[#070b19] border border-slate-800 hover:border-slate-700/80 focus:border-brand-purple focus:outline-none rounded-xl py-3 px-4 text-sm text-white transition-colors"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] font-mono font-bold uppercase text-slate-400">Senha Secreta</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Senha"
                required
                className="w-full bg-[#070b19] border border-slate-800 hover:border-slate-700/80 focus:border-brand-purple focus:outline-none rounded-xl py-3 px-4 text-sm text-white transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 bg-gradient-to-r from-brand-purple to-[#7e22ce] text-white hover:shadow-lg hover:shadow-brand-purple/35 text-xs font-bold rounded-xl transition-all disabled:opacity-50 mt-2 flex items-center justify-center space-x-2"
            >
              <Key size={14} />
              <span>{loginLoading ? 'Conectando...' : 'Acessar Painel Giganet'}</span>
            </button>
          </form>

          {/* Fallback Simulator Banner details showing standard login credentials */}
          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl">
              <div className="flex items-center space-x-1.5 justify-center mb-1 text-slate-300">
                <BadgeInfo size={14} className="text-brand-bright-blue" />
                <span className="text-[10px] font-mono uppercase font-bold text-center">AMBIENTE DE PRÉVIA AI STUDIO</span>
              </div>
              <p className="text-[10px] text-slate-450 text-slate-400 leading-relaxed text-center">
                Para testar agora sem configurar o Supabase, use o login de demonstração:<br />
                <strong className="text-emerald-400">admin@giganet.com.br</strong> com senha <strong className="text-emerald-400">admin123</strong>
              </p>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // --- LOGGED IN DASHBOARD ---
  return (
    <div className="min-h-screen bg-[#070b19] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Warning Bar if Supabase is simulation or live */}
        <div className="mb-8 p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-[#0d142c] border-brand-purple/20">
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-xl shrink-0 ${isRealSupabase ? 'bg-emerald-500/10 text-brand-neon' : 'bg-amber-500/10 text-amber-300'}`}>
              <Database size={18} />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-mono font-extrabold uppercase text-slate-400">STATUS DA CONEXÃO</span>
                <span className={`text-[8px] font-bold uppercase font-mono px-1.5 py-0.5 rounded border ${
                    isRealSupabase 
                      ? 'bg-emerald-500/10 border-brand-neon/30 text-brand-neon' 
                      : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                  }`}
                >
                  {isRealSupabase ? 'Supabase Conectado' : 'Simulação Local Ativa'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {isRealSupabase 
                  ? 'O painel está gravando e lendo pacotes de dados reais direto no seu Supabase.' 
                  : 'Modo de simulação em localStorage ativo. Todas as alterações que fizer aqui afetarão a prévia estante e serão salvas localmente.'}
              </p>
            </div>
          </div>

          {!isRealSupabase && (
            <button
              onClick={() => setActiveTab('supabase')}
              className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 text-center hover:text-white shrink-0 font-semibold"
            >
              Configurar Banco Real
            </button>
          )}
        </div>

        {/* Dashboard Profile Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-850 mb-8">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-brand-bright-blue uppercase">GIGANET FIBRA CONTROL CENTER</span>
            <h1 className="font-display font-black text-3xl text-white mt-1">Painel Administrativo</h1>
          </div>
          <div className="flex items-center space-x-3 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5">
            <span className="text-xs text-slate-400 font-mono">Logado como: <strong className="text-slate-200">{user?.email}</strong></span>
            <button
              onClick={handleLogout}
              className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center space-x-1 ml-2 pl-2 border-l border-slate-800 transition-colors"
              title="Fazer Logout"
            >
              <LogOut size={14} />
              <span>Sair</span>
            </button>
          </div>
        </div>

        {/* Dashboards Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'geral', label: 'Geral & Contatos', icon: Settings },
            { id: 'planos', label: 'Planos Fibra', icon: Wifi },
            { id: 'leads', label: `CRM Leads (${leadsList.length})`, icon: Users },
            { id: 'supabase', label: 'Conexão Supabase', icon: Database },
          ].map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as any); setSelectedPlano(null); }}
                className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-tr from-brand-purple to-[#7e22ce] text-white shadow-md shadow-brand-purple/20'
                    : 'bg-[#101835] border border-slate-800/80 hover:border-slate-700 text-slate-350 text-slate-300 hover:text-white'
                }`}
              >
                <TabIcon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* --- MAIN TAB SECTIONS --- */}
        {dataLoading ? (
          <div className="py-20 flex justify-center text-slate-400 text-xs font-mono">
            <span>Atualizando informações...</span>
          </div>
        ) : (
          <div>
            
            {/* 1. DYNAMIC GERAL TAB */}
            {activeTab === 'geral' && currentConfig && (
              <form onSubmit={handleSaveConfig} className="bg-[#101835] border border-slate-880 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="pb-4 border-b border-slate-800">
                  <h3 className="font-display font-extrabold text-lg text-white">Editar Informações Gerais do Provedor</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Essas variáveis controlam o nome da empresa, fone, endereço e WhatsApp de conversão do site em tempo real.
                  </p>
                </div>

                {configSuccess && (
                  <div className="p-3.5 bg-emerald-500/10 border border-brand-neon/30 text-brand-neon font-semibold text-xs rounded-xl flex items-center space-x-2">
                    <CheckCircle size={14} />
                    <span>Configurações atualizadas com sucesso e aplicadas no site!</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs text-slate-400 font-bold uppercase font-mono">Nome do Provedor</label>
                    <input
                      type="text"
                      value={currentConfig.nome_empresa}
                      onChange={(e) => setCurrentConfig({ ...currentConfig, nome_empresa: e.target.value })}
                      required
                      className="w-full bg-[#070b19] border border-slate-800 focus:border-brand-purple focus:outline-none rounded-xl py-3 px-4 text-sm text-white"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs text-slate-400 font-bold uppercase font-mono">Celular WhatsApp comercial (Apenas números incluindo DDD, no formato 5511999999999)</label>
                    <input
                      type="text"
                      value={currentConfig.whatsapp}
                      onChange={(e) => setCurrentConfig({ ...currentConfig, whatsapp: e.target.value.replace(/\D/g, '') })}
                      required
                      className="w-full bg-[#070b19] border border-slate-800 focus:border-brand-purple focus:outline-none rounded-xl py-3 px-4 text-sm text-white"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs text-slate-400 font-bold uppercase font-mono">Telefone fixo editável</label>
                    <input
                      type="text"
                      value={currentConfig.telefone}
                      onChange={(e) => setCurrentConfig({ ...currentConfig, telefone: e.target.value })}
                      required
                      className="w-full bg-[#070b19] border border-slate-800 focus:border-brand-purple focus:outline-none rounded-xl py-3 px-4 text-sm text-white"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs text-slate-400 font-bold uppercase font-mono">E-mail editável</label>
                    <input
                      type="email"
                      value={currentConfig.email}
                      onChange={(e) => setCurrentConfig({ ...currentConfig, email: e.target.value })}
                      required
                      className="w-full bg-[#070b19] border border-slate-800 focus:border-brand-purple focus:outline-none rounded-xl py-3 px-4 text-sm text-white"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5 sm:col-span-2">
                    <label className="text-xs text-slate-400 font-bold uppercase font-mono">Endereço de atendimento físico</label>
                    <input
                      type="text"
                      value={currentConfig.endereco}
                      onChange={(e) => setCurrentConfig({ ...currentConfig, endereco: e.target.value })}
                      required
                      className="w-full bg-[#070b19] border border-slate-800 focus:border-brand-purple focus:outline-none rounded-xl py-3 px-4 text-sm text-white"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs text-slate-400 font-bold uppercase font-mono">Instagram (Username)</label>
                    <input
                      type="text"
                      value={currentConfig.instagram}
                      onChange={(e) => setCurrentConfig({ ...currentConfig, instagram: e.target.value })}
                      placeholder="giganet_fibra"
                      className="w-full bg-[#070b19] border border-slate-800 focus:border-brand-purple focus:outline-none rounded-xl py-3 px-4 text-sm text-white"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs text-slate-400 font-bold uppercase font-mono">Facebook (Nome da página)</label>
                    <input
                      type="text"
                      value={currentConfig.facebook}
                      onChange={(e) => setCurrentConfig({ ...currentConfig, facebook: e.target.value })}
                      placeholder="giganetfibra"
                      className="w-full bg-[#070b19] border border-slate-800 focus:border-brand-purple focus:outline-none rounded-xl py-3 px-4 text-sm text-white"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md shadow-emerald-500/10 cursor-pointer"
                  >
                    <Save size={14} />
                    <span>Salvar Configurações Gerais</span>
                  </button>
                </div>
              </form>
            )}

            {/* 2. DYNAMIC PLANOS TAB */}
            {activeTab === 'planos' && (
              <div className="space-y-6">
                
                {/* Plans List Card panel */}
                {!selectedPlano ? (
                  <div className="bg-[#101835] border border-slate-800 rounded-3xl p-6 sm:p-8">
                    <div className="flex justify-between items-center pb-4 border-b border-slate-800 mb-6">
                      <div>
                        <h3 className="font-display font-extrabold text-lg text-white">Planos Cadastrados no Sistema</h3>
                        <p className="text-xs text-slate-400 mt-0.5">Configure abaixo velocidades, valores, destaques e benefícios dos planos.</p>
                      </div>
                      <button
                        onClick={() => handleEditPlanoClick(null)}
                        className="px-4 py-2.5 rounded-xl bg-brand-purple hover:bg-brand-purple/90 text-white font-bold text-xs flex items-center space-x-1"
                      >
                        <Plus size={14} />
                        <span>Adicionar Novo Plano</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {planosList.map((plano) => (
                        <div
                          key={plano.id}
                          className="p-5 rounded-2xl bg-[#0d142c] border border-slate-800 hover:border-slate-700/80 transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300">
                                  ID: {plano.id}
                                </span>
                                <h4 className="font-bold text-white text-base mt-1.5">{plano.nome}</h4>
                              </div>
                              <span className="text-lg font-mono font-black text-brand-neon">{plano.velocidade}</span>
                            </div>

                            <p className="text-xl font-display font-black text-white mb-4">
                              R$ {plano.preco.toFixed(2).replace('.', ',')}
                              <span className="text-xs text-slate-400 font-normal">/mês</span>
                            </p>

                            <ul className="text-xs text-slate-400 space-y-1 mb-4">
                              <li className="font-bold text-slate-300">Resumo de Benefícios:</li>
                              {plano.beneficios && plano.beneficios.map((b, i) => (
                                <li key={i} className="flex items-center space-x-1.5">
                                  <span className="text-brand-bright-blue font-bold">•</span>
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {plano.destaque && (
                                <span className="text-[9px] bg-brand-purple/20 border border-brand-purple/40 text-brand-bright-blue font-mono px-2 py-0.5 rounded-full font-bold">
                                  ★ RECOMENDADO / DESTACADO
                                </span>
                              )}
                              {plano.ativo ? (
                                <span className="text-[9px] bg-emerald-500/10 border border-brand-neon/30 text-brand-neon font-mono px-2 py-0.5 rounded-full font-bold">
                                  ✓ ATIVO NO SITE
                                </span>
                              ) : (
                                <span className="text-[9px] bg-slate-800 border border-slate-700 text-slate-400 font-mono px-2 py-0.5 rounded-full font-bold">
                                  PAUSADO / INATIVO
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="pt-4 border-t border-slate-800/60 flex space-x-2 justify-end">
                            <button
                              onClick={() => handleEditPlanoClick(plano)}
                              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white flex items-center space-x-1 text-xs font-semibold cursor-pointer"
                            >
                              <Edit3 size={12} />
                              <span>Editar</span>
                            </button>
                            <button
                              onClick={() => handleDeletePlano(plano.id)}
                              className="px-3.5 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/20 text-rose-450 text-rose-350 hover:text-rose-200 flex items-center space-x-1 text-xs font-semibold cursor-pointer"
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
                  // Create/Edit form card
                  <form onSubmit={handleSavePlano} className="bg-[#101835] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                    <div className="pb-4 border-b border-slate-800">
                      <h3 className="font-display font-extrabold text-lg text-white">
                        {selectedPlano.id ? 'Editar Informações do Plano' : 'Criar Novo Plano de Conexão'}
                      </h3>
                      <p className="text-xs text-slate-450 text-slate-400 mt-1">Preencha as variáveis correspondentes.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs text-slate-400 font-bold uppercase font-mono">Nome do Plano Comercial</label>
                        <input
                          type="text"
                          value={planoForm.nome}
                          onChange={(e) => setPlanoForm({ ...planoForm, nome: e.target.value })}
                          placeholder="Ex: Plano Ultra 800 Mega"
                          required
                          className="w-full bg-[#070b19] border border-slate-800 focus:border-brand-purple focus:outline-none rounded-xl py-3 px-4 text-sm text-white"
                        />
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs text-slate-400 font-bold uppercase font-mono">Exibição de Velocidade (MEGA)</label>
                        <input
                          type="text"
                          value={planoForm.velocidade}
                          onChange={(e) => setPlanoForm({ ...planoForm, velocidade: e.target.value })}
                          placeholder="Ex: 800 MEGA"
                          required
                          className="w-full bg-[#070b19] border border-slate-800 focus:border-brand-purple focus:outline-none rounded-xl py-3 px-4 text-sm text-white"
                        />
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs text-slate-400 font-bold uppercase font-mono">Mensalidade (Preço R$ - Apenas número, ex: 129.90)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={planoForm.preco}
                          onChange={(e) => setPlanoForm({ ...planoForm, preco: Number(e.target.value) })}
                          required
                          className="w-full bg-[#070b19] border border-slate-800 focus:border-brand-purple focus:outline-none rounded-xl py-3 px-4 text-sm text-white"
                        />
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs text-slate-400 font-bold uppercase font-mono">Benefício Duelo Principal (Destaque?)</label>
                        <div className="flex space-x-4 pt-3">
                          <label className="flex items-center space-x-2 text-sm text-slate-300">
                            <input
                              type="checkbox"
                              checked={planoForm.destaque}
                              onChange={(e) => setPlanoForm({ ...planoForm, destaque: e.target.checked })}
                              className="rounded border-slate-800 accent-brand-purple h-4 w-4"
                            />
                            <span>Destacar plano como "Mais vendido"</span>
                          </label>

                          <label className="flex items-center space-x-2 text-sm text-slate-300">
                            <input
                              type="checkbox"
                              checked={planoForm.ativo}
                              onChange={(e) => setPlanoForm({ ...planoForm, ativo: e.target.checked })}
                              className="rounded border-slate-800 accent-brand-purple h-4 w-4"
                            />
                            <span>Ativo (Exibir no site)</span>
                          </label>
                        </div>
                      </div>

                      {/* Benefits multi-line */}
                      <div className="flex flex-col space-y-1.5 sm:col-span-2">
                        <label className="text-xs text-slate-400 font-bold uppercase font-mono">Benefícios Listados (Um por linha)</label>
                        <textarea
                          rows={5}
                          value={planoForm.beneficiosStr}
                          onChange={(e) => setPlanoForm({ ...planoForm, beneficiosStr: e.target.value })}
                          placeholder="100% fibra óptica&#10;Wi-Fi potente incluso&#10;Melhor suporte técnico"
                          className="w-full bg-[#070b19] border border-slate-800 focus:border-brand-purple focus:outline-none rounded-xl py-3 px-4 text-sm text-white font-mono"
                        ></textarea>
                        <span className="text-[10px] text-slate-500">
                          * Nota: Itens básicos como "100% fibra óptica" ou "Wi-Fi incluso" são padronizados nos cards de layout do site por razões estéticas comerciais.
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setSelectedPlano(null)}
                        className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white font-semibold text-xs border border-slate-800"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1.5"
                      >
                        <Save size={14} />
                        <span>Salvar Informações do Plano</span>
                      </button>
                    </div>
                  </form>
                )}

              </div>
            )}

            {/* 3. CRM LEADS COBERTURA TAB */}
            {activeTab === 'leads' && (
              <div className="bg-[#101835] border border-slate-880 rounded-3xl p-6 sm:p-8">
                <div className="pb-4 border-b border-slate-800 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="font-display font-extrabold text-lg text-white">Solicitações de Cobertura Recebidas</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Contatos de clientes que inseriram dados no formulário de cobertura para assinar.
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold bg-brand-purple/20 border border-brand-purple/40 text-brand-bright-blue px-3 py-1.5 rounded-xl">
                    Total recebido: {leadsList.length} leads
                  </span>
                </div>

                {leadsList.length === 0 ? (
                  <div className="py-20 text-center text-slate-500 text-sm">
                    Nenhum lead de cobertura recebido até o momento.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 font-mono text-[10px] uppercase font-bold">
                          <th className="py-3 px-4">Histórico / Nome</th>
                          <th className="py-3 px-4">WhatsApp</th>
                          <th className="py-3 px-4">CEP & Endereço</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/50">
                        {leadsList.map((lead) => {
                          const timeString = lead.created_at 
                            ? new Date(lead.created_at).toLocaleString('pt-BR') 
                            : 'N/A';

                          const whatsAppLink = `https://wa.me/${lead.whatsapp}?text=${encodeURIComponent(
                            `Olá ${lead.nome}! Vimos que você preencheu o formulário de cobertura da GIGANET para o CEP ${lead.cep}. Temos ótimas notícias! Vamos agendar sua instalação comercial de fibra óptica?`
                          )}`;

                          return (
                            <tr key={lead.id} className="hover:bg-slate-900/40">
                              <td className="py-4 px-4">
                                <p className="font-bold text-white text-sm">{lead.nome}</p>
                                <span className="text-[10pt] text-slate-500 block font-mono mt-0.5">{timeString}</span>
                              </td>
                              
                              <td className="py-4 px-4">
                                <a
                                  href={whatsAppLink}
                                  target="_blank"
                                  referrerPolicy="no-referrer"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center space-x-1 font-bold text-brand-neon hover:underline"
                                  title="Iniciar resposta pelo WhatsApp"
                                >
                                  <span>{lead.whatsapp}</span>
                                </a>
                              </td>

                              <td className="py-4 px-4 leading-relaxed max-w-xs">
                                <span className="font-semibold block text-slate-300">CEP: {lead.cep}</span>
                                <span className="text-slate-400">{lead.rua}, Nº {lead.numero} - {lead.bairro}</span>
                              </td>

                              <td className="py-4 px-4 font-mono font-bold">
                                <div className="flex flex-col space-y-1.5 width-32">
                                  {/* Color selector trigger */}
                                  <select
                                    value={lead.status}
                                    onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                                    className={`px-2 py-1.5 rounded-lg border focus:outline-none text-[10px] font-bold ${
                                      lead.status === 'novo'
                                        ? 'bg-emerald-500/10 border-brand-neon/30 text-brand-neon'
                                        : lead.status === 'em atendimento'
                                          ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300'
                                          : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300'
                                    }`}
                                  >
                                    <option className="bg-[#0d142c] text-white" value="novo">🆕 Novo</option>
                                    <option className="bg-[#0d142c] text-white" value="em atendimento">⏳ Em Atendimento</option>
                                    <option className="bg-[#0d142c] text-white" value="finalizado">✓ Finalizado</option>
                                  </select>
                                </div>
                              </td>

                              <td className="py-4 px-4 text-right">
                                <button
                                  onClick={() => handleDeleteLead(lead.id)}
                                  className="p-2 border border-slate-800 hover:border-rose-500 hover:bg-rose-500/10 text-slate-500 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
                                  title="Remover Lead"
                                >
                                  <Trash2 size={14} />
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

            {/* 4. DETAILS SUPABASE DATABASE TAB */}
            {activeTab === 'supabase' && (
              <div className="space-y-6">
                {/* Integration Details card */}
                <div className="p-6 sm:p-8 bg-gradient-to-r from-brand-purple/20 via-[#0d142c] to-[#070b19] border border-brand-purple/30 rounded-3xl">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-brand-purple text-brand-neon rounded-2xl shrink-0">
                      <Database size={24} />
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-[#ffffff] text-lg">Hospedar na Vercel & Banco de Dados Supabase</h3>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                        Este projeto está 100% desenvolvido para ser enviado ao seu GitHub pessoal e publicado gratuitamente na Vercel com Banco Supabase. Para que todas as informações se tornem persistentes de forma permanente numa base de dados dedicada, basta configurar as seguintes variáveis de ambiente (Environment Variables) nas configurações do seu projeto na Vercel ou criar um arquivo <code className="text-white bg-slate-900 px-1 py-0.5 rounded">.env.local</code> local:
                      </p>
                      
                      <div className="mt-4 space-y-2.5 max-w-xl font-mono text-[11px]">
                        <div className="flex justify-between p-2.5 bg-slate-900 border border-slate-850 rounded-xl text-slate-300">
                          <span className="text-brand-bright-blue font-bold">VITE_SUPABASE_URL</span>
                          <span className="text-slate-450 text-slate-400">URL da API do seu Supabase</span>
                        </div>
                        <div className="flex justify-between p-2.5 bg-slate-900 border border-slate-850 rounded-xl text-slate-300">
                          <span className="text-brand-bright-blue font-bold">VITE_SUPABASE_ANON_KEY</span>
                          <span className="text-slate-450 text-slate-400">Chave pública de acesso secreta (anon key)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* DB queries guide module */}
                <SupabaseGuide />
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
