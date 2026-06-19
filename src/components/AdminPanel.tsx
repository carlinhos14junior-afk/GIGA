import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit3, Trash2, Save, Upload, ArrowDownToLine, 
  Activity, Calendar, Users, CheckSquare, Settings, Wifi, 
  Database, LogOut, ChevronLeft, ChevronRight, Grid, 
  LockKeyhole, Key, BadgeInfo, Image as ImageIcon, Globe, 
  Share2, CheckCircle, X, Lock, Check, Copy, Eye, Sun, Moon, Star
} from 'lucide-react';
import { 
  getSiteConfig, saveSiteConfig, getBanners, saveBanner, deleteBanner, 
  getEmpresa, saveEmpresa, getRedesSociais, saveRedesSociais, getSEO, saveSEO, 
  getCidadesCobertura, saveCidadeCobertura, deleteCidadeCobertura, getPlanos, 
  savePlano, deletePlano, getLeads, deleteLead, updateLeadStatus, 
  getUsuarios, saveUsuario, deleteUsuario, uploadFile, signIn, changePassword, 
  getCurrentUser, getLastUpdate, isRealSupabase, supabase, getUploads, saveUpload, deleteUpload,
  signOut, resetPassword, getBrandSettings, saveBrandSettings
} from '../lib/supabase';
import { 
  SiteConfig, Plano, Lead, Usuario, Banner, 
  Empresa, RedesSociais, CidadeCobertura, SEOConfig, UploadMedia,
  BrandSettings
} from '../types';
import Logo from './Logo';

interface AdminPanelProps {
  onConfigChange: () => void;
  onPlanosChange: () => void;
}

type TabType = 'dashboard' | 'banners' | 'empresa' | 'planos' | 'redes_sociais' | 'seo' | 'usuarios' | 'configuracoes' | 'rodape' | 'conteudo' | 'logo';

export default function Dashboard({ onConfigChange, onPlanosChange }: AdminPanelProps) {
  // Theme Toggle state (with persistence in localStorage)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('gigatel_admin_theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('gigatel_admin_theme', theme);
  }, [theme]);

  // Navigation & Sizing
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [alertMessage, setAlertMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Authentication States
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  // Forgot Password States
  const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [forgotError, setForgotError] = useState('');
  
  // Forced change password - REMOVED
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordChanging, setPasswordChanging] = useState(false);
  const [passwordChangeError, setPasswordChangeError] = useState('');

  // Loaded Data States
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [bannersList, setBannersList] = useState<Banner[]>([]);
  const [empresaDetail, setEmpresaDetail] = useState<Empresa | null>(null);
  const [planosList, setPlanosList] = useState<Plano[]>([]);
  const [redesSociaisDetail, setRedesSociaisDetail] = useState<RedesSociais | null>(null);
  const [seoConfigDetail, setSeoConfigDetail] = useState<SEOConfig | null>(null);
  const [brandSettingsDetail, setBrandSettingsDetail] = useState<BrandSettings | null>(null);
  const [usuariosList, setUsuariosList] = useState<Usuario[]>([]);
  const [leadsList, setLeadsList] = useState<Lead[]>([]);
  const [uploadsList, setUploadsList] = useState<UploadMedia[]>([]);

  // Site general operational status selector
  const [siteStatus, setSiteStatus] = useState<'Ativo' | 'Manutenção'>('Ativo');

  // Form Modals / Edit targets states
  const [editingBanner, setEditingBanner] = useState<Partial<Banner> | null>(null);
  const [editingPlano, setEditingPlano] = useState<Partial<Plano> | null>(null);
  const [editingUsuario, setEditingUsuario] = useState<Partial<Usuario> | null>(null);

  // Upload loaders
  const [uploadLoading, setUploadLoading] = useState(false);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [uploadDesktopLoading, setUploadDesktopLoading] = useState(false);
  const [uploadMobileLoading, setUploadMobileLoading] = useState(false);
  const [uploadLogoLoading, setUploadLogoLoading] = useState(false);
  const [uploadLogoBrancaLoading, setUploadLogoBrancaLoading] = useState(false);
  const [uploadLogoRodapeLoading, setUploadLogoRodapeLoading] = useState(false);
  const [uploadLogoMobileLoading, setUploadLogoMobileLoading] = useState(false);
  const [uploadFaviconLoading, setUploadFaviconLoading] = useState(false);

  // Trigger helper Alert popup
  const showAlert = (text: string, type: 'success' | 'error' = 'success') => {
    setAlertMessage({ text, type });
    // Keep success messages a bit longer for visibility
    const duration = type === 'success' ? 3500 : 5000;
    setTimeout(() => setAlertMessage(null), duration);
  };

  // Check persistent session on load
  useEffect(() => {
    async function initSession() {
      try {
        // Load empresa data regardless of login status for branding (login screen)
        const emp = await getEmpresa();
        setEmpresaDetail(emp);

        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          await loadAllCMSData();
        }
        
        // Load initial status preference
        const savedStatus = localStorage.getItem('gigatel_site_status') as 'Ativo' | 'Manutenção';
        if (savedStatus) {
          setSiteStatus(savedStatus);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setAuthLoading(false);
      }
    }
    initSession();
  }, []);

  // Fetch all databases/Localstorage items
  const loadAllCMSData = async () => {
    // Optionally add a small fake delay to show transparency that it IS fetching
    try {
      const [cfg, bans, emp, pls, cob, red, seo, usrs, lds, mds, brands] = await Promise.all([
        getSiteConfig(true),
        getBanners(true),
        getEmpresa(),
        getPlanos(),
        getCidadesCobertura(),
        getRedesSociais(),
        getSEO(),
        getUsuarios(),
        getLeads(),
        getUploads(),
        getBrandSettings()
      ]);

      if (cfg && cfg.site_status) {
        setSiteStatus(cfg.site_status);
      }
      setSiteConfig(cfg);
      setBannersList(bans);
      setEmpresaDetail(emp);
      setPlanosList(pls);
      setRedesSociaisDetail(red);
      setSeoConfigDetail(seo);
      setUsuariosList(usrs);
      setLeadsList(lds);
      setUploadsList(mds);
      setBrandSettingsDetail(brands);
    } catch (e) {
      console.error("Error loading CMS elements: ", e);
    }
  };

  // Sign In submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      const response = await signIn(loginEmail, loginPassword);
      if (response.error) {
        setLoginError(response.error.message || 'Credenciais inválidas.');
      } else {
        setUser(response.user);
        
        // Ensure session persistence
        localStorage.setItem('admin_logged', 'true');
        localStorage.setItem('admin_email', loginEmail);
        
        await loadAllCMSData();
      }
    } catch (err: any) {
      setLoginError(err.message || 'Erro inesperado.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Forgot Password submit
  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotError('');
    setForgotSuccess('');
    try {
      const response = await resetPassword(forgotEmail);
      if (response.error) {
        setForgotError(response.error.message || 'Erro ao recuperar acesso.');
      } else {
        setForgotSuccess(response.message || 'Instruções enviadas com sucesso!');
        showAlert(response.message || 'Instruções enviadas com sucesso!');
      }
    } catch (err: any) {
      setForgotError(err.message || 'Erro inesperado.');
    } finally {
      setForgotLoading(false);
    }
  };

  // Sign out handle
  const handleLogout = async () => {
    await signOut();
    setUser(null);
    setLoginPassword('');
    setLoginEmail('');
    localStorage.removeItem('admin_logged');
    localStorage.removeItem('admin_email');
  };

  // Manual Site Refresh
  const [refreshing, setRefreshing] = useState(false);
  const handleManualRefresh = async () => {
    setRefreshing(true);
    try {
      // Clear local memory/state and fetch again
      await loadAllCMSData();
      onConfigChange();
      onPlanosChange();
      showAlert('Site atualizado com sucesso! Cache limpo e dados recarregados da nuvem.');
    } catch (err) {
      showAlert('Erro ao atualizar site.', 'error');
    } finally {
      setRefreshing(false);
    }
  };

  // Save Site general status preference
  const handleSaveSiteStatus = async (status: 'Ativo' | 'Manutenção') => {
    setSiteStatus(status);
    if (siteConfig) {
      try {
        const updated = { ...siteConfig, site_status: status };
        await saveSiteConfig(updated);
        setSiteConfig(updated);
        onConfigChange();
        showAlert(`Status do site alterado para "${status}" e salvo na nuvem!`);
      } catch (e) {
        showAlert('Falha ao sincronizar status na nuvem.', 'error');
      }
    } else {
      localStorage.setItem('gigatel_site_status', status);
      showAlert(`Status do site alterado para "${status}" localmente!`);
    }
  };

  // CRM: Delete Lead
  const handleDeleteLead = async (id: string | number) => {
    if (confirm('Deseja excluir este lead permanentemente?')) {
      try {
        await deleteLead(id);
        setLeadsList(prev => prev.filter(l => l.id !== id));
        showAlert('Lead removido com sucesso!');
      } catch (err) {
        console.error('Error deleting lead:', err);
        showAlert('Houve um erro ao processar exclusão.', 'error');
      }
    }
  };

  // CRM: Change lead step status
  const handleLeadStageChange = async (id: string | number, status: Lead['status']) => {
    try {
      await updateLeadStatus(id, status);
      setLeadsList(leadsList.map(l => l.id === id ? { ...l, status } : l));
      showAlert('Status atualizado com sucesso!');
    } catch (err) {
      showAlert('Falha ao atualizar status.', 'error');
    }
  };

  // MÓDULO BANNERS: Guard/Submit
  const handleBannerSaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBanner) return;
    try {
      const saved = await saveBanner({
        titulo: editingBanner.titulo || '',
        subtitulo: editingBanner.subtitulo || '',
        texto_botao: editingBanner.texto_botao || 'Contratar',
        link_botao: editingBanner.link_botao || '#planos',
        image_url: editingBanner.image_url || '',
        mobile_image_url: editingBanner.mobile_image_url || '',
        ordem: Number(editingBanner.ordem || 1),
        status: editingBanner.status || 'ativo'
      });
      
      const refreshed = await getBanners();
      setBannersList(refreshed);
      setEditingBanner(null);
      onConfigChange();
      showAlert('Banner salvo com sucesso!');
      
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      showAlert('Erro ao registrar o banner.', 'error');
    }
  };

  const excluirBanner = async (id: string | number) => {
    const confirmar = window.confirm(
      "Deseja realmente excluir este banner?"
    );

    if (!confirmar) return;

    try {
      await deleteBanner(id);
      setBannersList(prev => prev.filter(banner => banner.id !== id));
      
      // Close modal if deleting the one being edited
      if (editingBanner && editingBanner.id === id) {
        setEditingBanner(null);
      }
      
      onConfigChange();
      showAlert('Banner excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir banner:', error);
      showAlert('Erro ao excluir banner do sistema.', 'error');
    }
  };

  // MÓDULO CONTEÚDO E RODAPÉ: Generic config save
  const handleSiteConfigGeneralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteConfig) return;
    try {
      const saved = await saveSiteConfig(siteConfig);
      setSiteConfig(saved);
      onConfigChange();
      showAlert('Conteúdo do site atualizado com sucesso!');
    } catch (err) {
      showAlert('Erro ao gravar conteúdo.', 'error');
    }
  };

  // MÓDULO DADOS DA EMPRESA: Submit
  const handleEmpresaSaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!empresaDetail) return;
    try {
      const saved = await saveEmpresa(empresaDetail);
      setEmpresaDetail(saved);
      
      // Keep main siteConfig in sync to ensure automatic top/footer updates
      if (siteConfig) {
        const synced = {
          ...siteConfig,
          nome_empresa: saved.nome_empresa,
          telefone: saved.telefone,
          whatsapp: saved.whatsapp,
          email: saved.email,
          endereco: `${saved.endereco}, ${saved.numero}`,
          cnpj: saved.cnpj,
          logo_url: saved.logo_url || '',
          logo_white_url: saved.logo_white_url || '',
          logo_footer_url: saved.logo_footer_url || '',
          logo_mobile_url: saved.logo_mobile_url || '',
          favicon_url: saved.favicon_url || ''
        };
        await saveSiteConfig(synced);
        setSiteConfig(synced);
      }
      
      onConfigChange();
      showAlert('Dados da empresa salvos e replicados!');
    } catch (err) {
      showAlert('Erro ao guardar configurações da empresa.', 'error');
    }
  };

  // MÓDULO PLANOS: Submit
  const handlePlanoSaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlano) return;
    try {
      const benefits = Array.isArray(editingPlano.beneficios) 
        ? editingPlano.beneficios 
        : typeof editingPlano.beneficios === 'string'
          ? (editingPlano.beneficios as string).split('\n').map(s => s.trim()).filter(Boolean)
          : [];

      await savePlano({
        id: editingPlano.id,
        nome: editingPlano.nome || '',
        velocidade: editingPlano.velocidade || '',
        preco: Number(editingPlano.preco || 0),
        descricao: editingPlano.descricao || '',
        beneficios: benefits,
        ordem: Number(editingPlano.ordem || 1),
        destaque: editingPlano.destaque || false,
        ativo: editingPlano.ativo !== false,
        status: editingPlano.status || 'ativo'
      });

      const refreshed = await getPlanos();
      setPlanosList(refreshed);
      setEditingPlano(null);
      onPlanosChange();
      showAlert('Plano gravado com sucesso no site!');
    } catch (err) {
      showAlert('Não foi possível gravar o plano.', 'error');
    }
  };

  const handleDeletePlanoClick = async (id: string | number) => {
    if (confirm('Tem certeza que deseja excluir permanentemente este plano de internet?')) {
      try {
        await deletePlano(id);
        setPlanosList(prev => prev.filter(p => p.id !== id));
        onPlanosChange();
        showAlert('Plano excluído com sucesso!');
      } catch (err) {
        console.error('Error deleting plan:', err);
        showAlert('Erro ao excluir plano.', 'error');
      }
    }
  };

  // MÓDULO REDES SOCIAIS: Submit
  const handleRedesSaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!redesSociaisDetail) return;
    try {
      const saved = await saveRedesSociais(redesSociaisDetail);
      setRedesSociaisDetail(saved);
      
      // Sync to general layout
      if (siteConfig) {
        const synced = {
          ...siteConfig,
          instagram: saved.instagram,
          facebook: saved.facebook
        };
        await saveSiteConfig(synced);
        setSiteConfig(synced);
      }
      onConfigChange();
      showAlert('Canais de redes sociais atualizados com sucesso!');
    } catch (err) {
      showAlert('Erro ao gravar redes sociais.', 'error');
    }
  };

  // MÓDULO SEO: Submit
  const handleSEOSaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!seoConfigDetail) return;
    try {
      const saved = await saveSEO(seoConfigDetail);
      setSeoConfigDetail(saved);
      
      // Set page meta details dynamically to demonstrate real fidelity
      document.title = saved.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', saved.meta_description);
      }
      
      onConfigChange();
      showAlert('Metadados de SEO atualizados! (Os spiders do Google lerão estes dados informados)');
    } catch (err) {
      showAlert('Erro de SEO.', 'error');
    }
  };

  // MÓDULO USUÁRIOS: Submit
  const handleUsuarioSaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUsuario) return;
    try {
      await saveUsuario({
        id: editingUsuario.id,
        nome: editingUsuario.nome || '',
        email: editingUsuario.email || '',
        perfil: editingUsuario.perfil || 'colaborador',
        nivel: editingUsuario.nivel || 'Editor',
        status: editingUsuario.status || 'ativo'
      });

      const refreshed = await getUsuarios();
      setUsuariosList(refreshed);
      setEditingUsuario(null);
      showAlert('Usuário operador salvo com sucesso!');
    } catch (err) {
      showAlert('Falha ao cadastrar usuário.', 'error');
    }
  };

  const handleDeleteUsuarioClick = async (id: string) => {
    if (id === 'admin-user-id') {
      showAlert('Você não pode deletar o administrador mestre do sistema!', 'error');
      return;
    }
    if (confirm('Deletar acesso administrativo para este usuário?')) {
      try {
        await deleteUsuario(id);
        setUsuariosList(prev => prev.filter(u => u.id !== id));
        showAlert('Usuário deletado com sucesso!');
      } catch (err) {
        console.error('Error deleting user:', err);
        showAlert('Erro de exclusão.', 'error');
      }
    }
  };

  // Upload Logo/Identity Helpers
  const handleLogoIdentityUpload = async (type: 'logo_url' | 'logo_white_url' | 'logo_footer_url' | 'logo_mobile_url' | 'favicon_url', file: File) => {
    if (!brandSettingsDetail) return;
    
    if (type === 'logo_url') setUploadLogoLoading(true);
    else if (type === 'logo_white_url') setUploadLogoBrancaLoading(true);
    else if (type === 'logo_footer_url') setUploadLogoRodapeLoading(true);
    else if (type === 'logo_mobile_url') setUploadLogoMobileLoading(true);
    else setUploadFaviconLoading(true);

    try {
      // User requested Pattern: Auth Check
      if (isRealSupabase && supabase) {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user) {
          throw new Error("Usuário não autenticado. Faça login novamente.");
        }
      }

      const fileName = `${type}_${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
      const url = await uploadFile('site-images', fileName, file);
      
      const updated = {
        ...brandSettingsDetail,
        [type]: url
      };
      
      setBrandSettingsDetail(updated);
      
      // Auto save on upload
      await saveBrandSettings(updated);
      
      onConfigChange();
      showAlert(`Item de identidade atualizado com sucesso!`);
      
      // Auto-reload to apply changes across the site
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err: any) {
      console.error('Error uploading logo:', err);
      showAlert(err.message || 'Erro ao subir logotipo.', 'error');
    } finally {
      if (type === 'logo_url') setUploadLogoLoading(false);
      else if (type === 'logo_white_url') setUploadLogoBrancaLoading(false);
      else if (type === 'logo_footer_url') setUploadLogoRodapeLoading(false);
      else if (type === 'logo_mobile_url') setUploadLogoMobileLoading(false);
      else setUploadFaviconLoading(false);
    }
  };

  const handleBrandSettingsSaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandSettingsDetail) return;
    try {
      await saveBrandSettings(brandSettingsDetail);
      onConfigChange();
      showAlert('Identidade Visual salva com sucesso!');
    } catch (err) {
      console.error('Error saving brand settings:', err);
      showAlert('Erro ao salvar identidade visual.', 'error');
    }
  };

  // UPLOAD GERENCIADOR DE MÍDIA: Handle
  const handleMediaUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaFile) return;
    setUploadLoading(true);
    try {
      const fileName = `${Date.now()}_${mediaFile.name.replace(/\s+/g, '_')}`;
      const url = await uploadFile('site-images', fileName, mediaFile);
      
      const mockUpload: Omit<UploadMedia, 'id'> = {
        nome: mediaFile.name,
        url: url,
        tamanho: `${Math.round(mediaFile.size / 1024)} KB`,
        tipo: mediaFile.type,
        status: 'ativo'
      };

      await saveUpload(mockUpload);
      const refreshed = await getUploads();
      setUploadsList(refreshed);
      setMediaFile(null);
      // Clear file inputs
      const fInput = document.getElementById('media-uploader-input') as HTMLInputElement;
      if (fInput) fInput.value = '';

      showAlert('Arquivo subido ao bucket do Supabase e indexado!');
    } catch (err) {
      showAlert('Erro no upload.', 'error');
    } finally {
      setUploadLoading(false);
    }
  };

  const handleDeleteUploadClick = async (id: string | number) => {
    if (confirm('Deseja excluir permanentemente este arquivo de mídia?')) {
      try {
        await deleteUpload(id);
        setUploadsList(prev => prev.filter(u => u.id !== id));
        showAlert('Arquivo de mídia removido com sucesso!');
      } catch (err) {
        console.error('Error deleting upload:', err);
        showAlert('Falha ao remover mídia.', 'error');
      }
    }
  };

  // Upload Banner Image Helpers
  const handleBannerImageUpload = async (type: 'desktop' | 'mobile', file: File) => {
    if (!editingBanner) return;
    if (type === 'desktop') setUploadDesktopLoading(true);
    else setUploadMobileLoading(true);

    try {
      const fileName = `banner_${type}_${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
      const url = await uploadFile('site-images', fileName, file);
      
      setEditingBanner(prev => prev ? {
        ...prev,
        [type === 'desktop' ? 'image_url' : 'mobile_image_url']: url
      } : null);

      showAlert(`Imagem ${type === 'desktop' ? 'Desktop' : 'Mobile'} do banner carregada!`);
    } catch (err) {
      console.error(err);
      showAlert('Erro ao subir imagem do banner. Tente novamente.', 'error');
    } finally {
      if (type === 'desktop') setUploadDesktopLoading(false);
      else setUploadMobileLoading(false);
    }
  };

  // Export Leads list to Excel and CSV
  const handleExportLeads = () => {
    if (leadsList.length === 0) {
      showAlert('Sem leads na base para exportar.', 'error');
      return;
    }
    const headers = ['ID', 'NOME CLIENTE', 'WHATSAPP', 'EMAIL', 'CEP', 'ENDEREÇO', 'PLANO INTERESSE', 'STATUS INTERAÇÃO', 'DATA CADASTRO'];
    const rows = leadsList.map(lead => [
      lead.id,
      `"${lead.nome.replace(/"/g, '""')}"`,
      `"${lead.whatsapp}"`,
      `"${lead.email || ''}"`,
      `"${lead.cep}"`,
      `"${(lead.endereco || '').replace(/"/g, '""')}"`,
      `"${lead.plano_interesse || 'Geral'}"`,
      `"${lead.status}"`,
      `"${lead.created_at || ''}"`
    ]);

    const csvContent = "\uFEFF" + [headers.join(';'), ...rows.map(e => e.join(';'))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_cobertura_gigatel_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // CSV Reader or clipboard helper
  const handleCopyLinkToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    showAlert('URL copiada para a área de transferência!');
  };

  const darkThemeStyles = theme === 'dark' ? (
    <style dangerouslySetInnerHTML={{ __html: `
      .dark-theme-admin {
        background-color: #0b1329 !important;
        color: #e2e8f0 !important;
      }
      .dark-theme-admin aside {
        background-color: #0f1a36 !important;
        border-color: #1e2e56 !important;
      }
      .dark-theme-admin aside .border-slate-100 {
        border-color: #1e2e56 !important;
      }
      .dark-theme-admin input,
      .dark-theme-admin select,
      .dark-theme-admin textarea {
        background-color: #142247 !important;
        border-color: #243b70 !important;
        color: #ffffff !important;
      }
      .dark-theme-admin input:focus,
      .dark-theme-admin select:focus,
      .dark-theme-admin textarea:focus {
        border-color: #005BFF !important;
        box-shadow: 0 0 0 2px rgba(0, 91, 255, 0.2) !important;
        outline-color: #005BFF !important;
      }
      .dark-theme-admin .bg-white {
        background-color: #111e3b !important;
        border-color: #203561 !important;
        color: #e2e8f0 !important;
      }
      .dark-theme-admin .border-slate-200,
      .dark-theme-admin .border-slate-205,
      .dark-theme-admin .border-slate-100 {
        border-color: #203561 !important;
      }
      .dark-theme-admin label,
      .dark-theme-admin .text-slate-400,
      .dark-theme-admin .text-slate-500 {
        color: #8fa0c4 !important;
      }
      .dark-theme-admin .text-slate-900,
      .dark-theme-admin .text-slate-800,
      .dark-theme-admin .text-slate-705,
      .dark-theme-admin .text-slate-700 {
        color: #ffffff !important;
      }
      .dark-theme-admin table {
        color: #e2e8f0 !important;
      }
      .dark-theme-admin thead,
      .dark-theme-admin .bg-slate-55,
      .dark-theme-admin .bg-slate-50 {
        background-color: #152449 !important;
      }
      .dark-theme-admin tr:hover {
        background-color: #192b57 !important;
      }
      .dark-theme-admin .bg-emerald-50 {
        background-color: #0d2a23 !important;
        color: #4ade80 !important;
        border-color: #115e45 !important;
      }
      .dark-theme-admin .text-emerald-605 {
        color: #4ade80 !important;
      }
      .dark-theme-admin .bg-amber-50 {
        background-color: #2d2613 !important;
        color: #fbbf24 !important;
        border-color: #78350f !important;
      }
      .dark-theme-admin .bg-blue-50 {
        background-color: #0f2452 !important;
        color: #38bdf8 !important;
        border-color: #0369a1 !important;
      }
      .dark-theme-admin .bg-slate-100 {
        background-color: #1a2c54 !important;
        color: #94a3b8 !important;
      }
      .dark-theme-admin aside button.text-slate-600 {
        color: #94a3b8 !important;
      }
      .dark-theme-admin aside button.text-slate-600:hover {
        background-color: #192b57 !important;
        color: #ffffff !important;
      }
      .dark-theme-admin .shadow-sm,
      .dark-theme-admin .shadow-md,
      .dark-theme-admin .shadow-lg,
      .dark-theme-admin .shadow-xl {
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.4) !important;
      }
    ` }} />
  ) : null;

  // Render Loader screen during authentication verification
  if (authLoading) {
    return (
      <div className={`min-h-screen bg-white flex flex-col items-center justify-center p-8 ${theme === 'dark' ? 'dark-theme-admin' : ''}`}>
        {darkThemeStyles}
        <div className="w-10 h-10 border-4 border-slate-200 border-t-[#005BFF] rounded-full animate-spin"></div>
        <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-4">Iniciando Portal de Controle...</span>
      </div>
    );
  }

  // --- RENDERING 2: LOGIN CENTRAL ---
  if (!user) {
    return (
      <div className={`min-h-screen bg-slate-50 flex items-center justify-center p-4 py-28 relative ${theme === 'dark' ? 'dark-theme-admin' : ''}`}>
        {darkThemeStyles}
        {/* Floating Toggle Theme button on login visual */}
        <div className="absolute top-6 right-6 z-50">
          <button
            type="button"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="flex items-center justify-center p-3 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:text-slate-800 shadow-sm transition-all cursor-pointer"
            title={theme === 'light' ? 'Ativar Modo Escuro' : 'Ativar Modo Claro'}
          >
            {theme === 'light' ? <Moon size={16} className="text-blue-600" /> : <Sun size={16} className="text-amber-500" />}
          </button>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-20 pointer-events-none" />
        
        <div className="relative max-w-sm w-full bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl shadow-xl">
          <div className="text-center mb-8 flex flex-col items-center">
            <Logo size="lg" className="mb-4" logoUrl={brandSettingsDetail?.logo_url || empresaDetail?.logo_url} nomeEmpresa={empresaDetail?.nome_empresa} />
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest bg-slate-100 px-3 py-1 rounded-full">
              {isForgotPasswordMode ? 'Recuperação de Acesso' : 'Portal do Administrador'}
            </span>
          </div>

          {isForgotPasswordMode ? (
            // --- FORGOT PASSWORD FORM ---
            <div className="space-y-4">
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Informe o seu e-mail cadastrado na tabela de administradores para recuperar ou restaurar as suas credenciais.
              </p>

              {forgotError && (
                <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold text-center leading-normal">
                  {forgotError}
                </div>
              )}

              {forgotSuccess && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold text-center leading-normal">
                  {forgotSuccess}
                </div>
              )}

              <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-slate-500">Seu E-mail de Administrador</label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="adm@gigatel.com.br"
                    className="w-full bg-white border border-slate-200 hover:border-slate-350 focus:border-slate-505 focus:outline-none rounded-xl py-3 px-4 text-sm text-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-full py-3.5 bg-[#005BFF] hover:bg-[#004ccb] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 mt-3 flex items-center justify-center space-x-2"
                >
                  <span>{forgotLoading ? 'Processando...' : 'Recuperar Acesso'}</span>
                </button>
              </form>

              <button
                type="button"
                onClick={() => {
                  setIsForgotPasswordMode(false);
                  setForgotError('');
                  setForgotSuccess('');
                }}
                className="w-full text-center text-xs font-semibold text-slate-500 hover:text-slate-800 mt-2 hover:underline"
              >
                Voltar para o Login
              </button>
            </div>
          ) : (
            // --- STANDARD LOGIN FORM ---
            <div>
              {loginError && (
                <div className="p-3.5 bg-red-50 border border-red-205 text-red-700 rounded-xl text-xs font-bold mb-6 text-center leading-normal">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-slate-500">E-mail de Operador</label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="adm@gigatel.com.br"
                    className="w-full bg-white border border-slate-200 hover:border-slate-350 focus:border-slate-500 focus:outline-none rounded-xl py-3 px-4 text-sm text-slate-900"
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold uppercase text-slate-500">Senha Secreta</label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotPasswordMode(true);
                        setForgotEmail(loginEmail);
                      }}
                      className="text-[10px] font-bold text-[#005BFF] hover:underline"
                    >
                      Esqueci minha senha
                    </button>
                  </div>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Sua senha secreta"
                    className="w-full bg-white border border-slate-200 hover:border-slate-350 focus:border-slate-505 focus:outline-none rounded-xl py-3 px-4 text-sm text-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-3.5 bg-[#005BFF] hover:bg-[#004ccb] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 mt-3 flex items-center justify-center space-x-2"
                >
                  <Key size={13} />
                  <span>{loginLoading ? 'Conectando...' : 'Entrar no Painel'}</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- RENDERING 3: FULL ADMINISTRATIVE LOGGED IN WORKSPACE ---
  return (
    <div className={`min-h-screen bg-slate-50 pt-28 pb-20 flex relative ${theme === 'dark' ? 'dark-theme-admin' : ''}`}>
      {darkThemeStyles}
      
      {/* 🚀 Dynamic Success/Error Popup - More prominent for user feedback */}
      {alertMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] px-4 pointer-events-none animate-in fade-in zoom-in duration-300">
          <div className={`max-w-md w-full p-6 rounded-3xl shadow-2xl flex flex-col items-center text-center space-y-4 border pointer-events-auto ${
            alertMessage.type === 'success' 
              ? 'bg-white border-emerald-100' 
              : 'bg-white border-red-100'
          }`}>
            <div className={`p-4 rounded-full ${
              alertMessage.type === 'success' ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'
            }`}>
              {alertMessage.type === 'success' ? (
                <div className="relative">
                  <CheckCircle size={48} className="relative z-10" />
                  <div className="absolute inset-0 bg-emerald-400/20 blur-xl rounded-full scale-150 animate-pulse"></div>
                </div>
              ) : (
                <X size={48} />
              )}
            </div>
            
            <div>
              <h3 className={`text-lg font-black uppercase tracking-tight ${
                alertMessage.type === 'success' ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {alertMessage.type === 'success' ? 'Sucesso Total!' : 'Ops! Ocorreu um Erro'}
              </h3>
              <p className="text-sm font-bold text-slate-700 mt-2 leading-relaxed">
                {alertMessage.text}
              </p>
            </div>

            {alertMessage.type === 'success' && (
              <div className="text-[10px] uppercase font-black text-slate-400 bg-slate-50 px-4 py-1.5 rounded-full tracking-tighter">
                O site já atualizou automaticamente
              </div>
            )}

            <button 
              onClick={() => setAlertMessage(null)}
              className={`px-8 py-2.5 rounded-xl text-xs font-black transition-all ${
                alertMessage.type === 'success' 
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' 
                  : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* 1. COLLAPSIBLE MENU LATERAL RECOlhÍvel */}
      <aside 
        className={`${
          isSidebarCollapsed ? 'w-16' : 'w-64'
        } shrink-0 bg-white border-r border-slate-200 min-h-[80vh] p-4 hidden md:flex flex-col justify-between transition-all duration-300 relative`}
      >
        <div>
          {/* Menu Title */}
          <div className="flex items-center mb-6 pl-1.5 pb-4 border-b border-slate-100 overflow-hidden">
            {!isSidebarCollapsed ? (
              <div className="flex flex-col">
                <Logo size="sm" logoUrl={brandSettingsDetail?.logo_url || empresaDetail?.logo_url} nomeEmpresa={empresaDetail?.nome_empresa} />
                <span className="text-[8px] font-black uppercase text-slate-400 tracking-[0.2em] mt-1 ml-1">Painel Admin</span>
              </div>
            ) : (
              <Logo size="sm" variant="icon" logoUrl={brandSettingsDetail?.logo_url || empresaDetail?.logo_url} nomeEmpresa={empresaDetail?.nome_empresa} />
            )}
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Grid },
              { id: 'banners', label: 'Banners Slideshow', icon: ImageIcon },
              { id: 'conteudo', label: 'Conteúdo Site', icon: Edit3 },
              { id: 'empresa', label: 'Dados da Empresa', icon: Settings },
              { id: 'logo', label: 'Logotipos e Identidade', icon: ImageIcon },
              { id: 'planos', label: 'Planos de Fibra', icon: Wifi },
              { id: 'rodape', label: 'Rodapé Site', icon: ArrowDownToLine },
              { id: 'redes_sociais', label: 'Redes Sociais', icon: Share2 },
              { id: 'seo', label: 'SEO e Metatags', icon: Key },
              { id: 'usuarios', label: 'Usuários Admin', icon: Users },
              { id: 'configuracoes', label: 'Gerenciador de Mídia', icon: Upload }
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id as TabType); }}
                  className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#005BFF] text-white shadow-sm'
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
            className="w-full flex items-center justify-center p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800 transition-colors mb-2"
            title={isSidebarCollapsed ? 'Expandir Menu' : 'Recolher Menu'}
          >
            {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>

          <button
            type="button"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="w-full flex items-center justify-center space-x-2 p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-800 transition-colors mb-3 cursor-pointer"
            title={theme === 'light' ? 'Ativar Modo Escuro' : 'Ativar Modo Claro'}
          >
            {theme === 'light' ? (
              <>
                <Moon size={14} className="text-blue-600 shrink-0" />
                {!isSidebarCollapsed && <span className="text-[11px] font-bold">Modo Escuro</span>}
              </>
            ) : (
              <>
                <Sun size={14} className="text-amber-500 shrink-0" />
                {!isSidebarCollapsed && <span className="text-[11px] font-bold">Modo Claro</span>}
              </>
            )}
          </button>

          {!isSidebarCollapsed && (
            <div className="px-2 mb-3">
              <p className="text-[9px] font-bold text-slate-400 uppercase">Operando como</p>
              <p className="text-xs font-bold text-slate-700 truncate">{user?.email}</p>
            </div>
          )}

          <button
            onClick={handleManualRefresh}
            disabled={refreshing}
            className="w-full flex items-center justify-center space-x-2 p-2.5 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 text-[11px] font-black transition-all mb-2 shadow-lg shadow-emerald-500/10 cursor-pointer disabled:opacity-50"
          >
            {refreshing ? <span className="animate-spin mr-1">⌛</span> : <Activity size={13} />}
            {!isSidebarCollapsed && <span>{refreshing ? 'Atualizando...' : 'Atualizar Site'}</span>}
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 p-2.5 rounded-xl bg-red-50 text-red-650 hover:bg-red-100 text-xs font-black transition-colors cursor-pointer"
          >
            <LogOut size={13} />
            {!isSidebarCollapsed && <span>Fazer Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Panel Stage Container */}
      <div className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Navigation and Quick Controls (Displayed on mobile layouts below md breakpoint) */}
        <div className="flex md:hidden flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 rounded-3xl border border-slate-205 mb-6 shadow-sm">
          <div className="flex flex-col space-y-1.5 w-full sm:w-64">
            <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Aba Selecionada</label>
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as TabType)}
              className="p-2.5 text-xs font-bold border border-slate-205 rounded-xl bg-slate-50 focus:outline-[#005BFF] cursor-pointer w-full text-slate-700"
            >
              <option value="dashboard">📊 Dashboard Geral</option>
              <option value="logo">🎨 Logotipos e Identidade</option>
              <option value="banners">🖼️ Banners Slideshow</option>
              <option value="conteudo">📝 Conteúdo do Site</option>
              <option value="empresa">🏢 Dados da Empresa</option>
              <option value="planos">📶 Planos de Fibra</option>
              <option value="rodape">👣 Rodapé do Site</option>
              <option value="redes_sociais">🔔 Redes Sociais</option>
              <option value="seo">🔑 SEO e Metatags</option>
              <option value="usuarios">👥 Usuários Admin</option>
              <option value="configuracoes">📁 Gerenciador de Mídia</option>
            </select>
          </div>

          <div className="flex items-center justify-end space-x-2.5 self-end sm:self-center">
            {/* Theme Switcher */}
            <button
              type="button"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="flex items-center justify-center p-2.5 rounded-xl bg-slate-50 border border-slate-205 text-slate-600 hover:text-slate-800 shadow-sm transition-all cursor-pointer"
              title={theme === 'light' ? 'Ativar Modo Escuro' : 'Ativar Modo Claro'}
            >
              {theme === 'light' ? <Moon size={15} className="text-blue-600" /> : <Sun size={15} className="text-amber-500" />}
            </button>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center justify-center space-x-1.5 p-2.5 rounded-xl bg-red-50 border border-red-105 text-red-650 hover:bg-red-100 font-bold text-xs transition-colors cursor-pointer"
              title="Fazer Logout"
            >
              <LogOut size={14} />
              <span>Sair</span>
            </button>
          </div>
        </div>
        
        {/* Connection status warning badge */}
        <div className="mb-6 p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white border-slate-200 shadow-sm text-xs text-slate-600">
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-xl shrink-0 ${isRealSupabase ? 'bg-emerald-50 text-emerald-605' : 'bg-amber-50 text-amber-600'}`}>
              <Database size={15} />
            </div>
            <div>
              <div className="flex items-center space-x-1.5 leading-none">
                <span className="font-bold uppercase text-slate-500 text-[9px] tracking-wide">STATUS DE CONEXÃO</span>
                <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border leading-none ${
                    isRealSupabase 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                      : 'bg-amber-50 border-amber-200 text-amber-700'
                  }`}
                >
                  {isRealSupabase ? 'Supabase Conectado' : 'Simulação Offline'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                {isRealSupabase 
                  ? 'Você está conectado de forma autêntica à sua tabela de dados do Supabase.' 
                  : 'Modo simulação local ativo. Dados persistem localmente via localStorage.'}
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================
            TAB 1: DASHBOARD
            ======================================================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fade-in">
            {/* Header metrics card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total de Planos</span>
                  <span className="text-3xl font-display font-black text-slate-900 mt-1 block">{planosList.length}</span>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-100 text-slate-700 rounded-xl">
                  <Wifi size={18} />
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total de Banners</span>
                  <span className="text-3xl font-display font-black text-slate-900 mt-1 block">{bannersList.length}</span>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-100 text-slate-700 rounded-xl">
                  <ImageIcon size={18} />
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Última Atualização</span>
                  <span className="text-xs font-bold text-slate-700 mt-2 block truncate max-w-[130px]">{getLastUpdate()}</span>
                </div>
                <div className="p-2.5 bg-blue-50 text-[#005BFF] rounded-xl">
                  <Calendar size={18} />
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Status do Site</span>
                <div className="flex items-center space-x-2 mt-1">
                  <button 
                    onClick={() => handleSaveSiteStatus('Ativo')}
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-all ${
                      siteStatus === 'Ativo' 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                        : 'bg-white border-slate-200 text-slate-500'
                    }`}
                  >
                    Ativo
                  </button>
                  <button 
                    onClick={() => handleSaveSiteStatus('Manutenção')}
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-all ${
                      siteStatus === 'Manutenção' 
                        ? 'bg-amber-50 border-amber-200 text-amber-700 font-bold' 
                        : 'bg-white border-slate-200 text-slate-500'
                    }`}
                  >
                    Manutenção
                  </button>
                </div>
              </div>

            </div>

            {/* Leads Section inside Dashboard */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
                <div>
                  <h3 className="font-display font-black text-xs text-slate-800 uppercase tracking-wider">CRM leads de Cobertura</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Últimas consultas de cobertura enviadas pelos clientes no site.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={handleExportLeads}
                    className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-750 font-bold rounded-xl text-[10px] flex items-center space-x-1"
                  >
                    <ArrowDownToLine size={12} />
                    <span>Exportar CSV</span>
                  </button>
                </div>
              </div>

              {leadsList.length === 0 ? (
                <p className="text-center py-12 text-slate-400 text-xs font-mono">Sem leads cadastrados no momento.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-sans text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-150 text-slate-500 font-bold text-[10px] uppercase">
                        <th className="py-3 px-4 font-bold">Cliente</th>
                        <th className="py-3 px-4 font-bold">WhatsApp / CEP</th>
                        <th className="py-3 px-4 font-bold">Plano</th>
                        <th className="py-3 px-4 font-bold">Ação Comercial</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {leadsList.slice(0, 5).map((l) => (
                        <tr key={l.id} className="hover:bg-slate-50/50">
                          <td className="py-3.5 px-4">
                            <p className="font-bold text-slate-900">{l.nome}</p>
                            <span className="text-[10px] text-slate-400 block">{l.created_at ? new Date(l.created_at).toLocaleString('pt-BR') : ''}</span>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold leading-normal">
                            <span className="text-emerald-600 block">{l.whatsapp}</span>
                            <span className="text-[10px] text-slate-500">CEP: {l.cep}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 bg-blue-50 text-[#005BFF] border border-blue-100 rounded text-[9px] font-bold">{l.plano_interesse || 'Qualquer'}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center space-x-2">
                              <select 
                                value={l.status}
                                onChange={(e) => handleLeadStageChange(l.id, e.target.value as any)}
                                className="p-1 px-1.5 text-[10px] font-bold border border-slate-205 rounded bg-white"
                              >
                                <option value="novo">🆕 Novo</option>
                                <option value="em atendimento">⏳ Atendimento</option>
                                <option value="convertido">✓ Ganho</option>
                                <option value="cancelado">✗ Perdido</option>
                              </select>
                              <button 
                                onClick={() => handleDeleteLead(l.id)}
                                className="text-red-655 text-red-500 hover:text-red-700 text-[10px]"
                              >
                                Excluir
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: BANNERS SLIDESHOW
            ======================================================== */}
        {activeTab === 'banners' && (
          <div className="space-y-6 animate-fade-in">
            {/* Form modal or inline edit */}
            {editingBanner ? (
              <form onSubmit={handleBannerSaveSubmit} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="pb-3 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-display font-black text-sm text-slate-800 uppercase tracking-wider">
                    {editingBanner.id ? 'Editar Banner Slide' : 'Novo Banner Slide'}
                  </h3>
                  <button type="button" onClick={() => setEditingBanner(null)} className="text-slate-400 hover:text-slate-900">
                    <X size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Título Principal</label>
                    <input 
                      type="text" 
                      required
                      value={editingBanner.titulo || ''}
                      onChange={(e) => setEditingBanner({ ...editingBanner, titulo: e.target.value })}
                      className="p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-slate-400 bg-white"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Subtítulo secundário</label>
                    <input 
                      type="text" 
                      required
                      value={editingBanner.subtitulo || ''}
                      onChange={(e) => setEditingBanner({ ...editingBanner, subtitulo: e.target.value })}
                      className="p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-slate-400 bg-white"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Texto do Botão</label>
                    <input 
                      type="text" 
                      required
                      value={editingBanner.texto_botao || ''}
                      onChange={(e) => setEditingBanner({ ...editingBanner, texto_botao: e.target.value })}
                      className="p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-slate-400 bg-white"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Link do Botão (URL ou Âncora)</label>
                    <input 
                      type="text" 
                      required
                      value={editingBanner.link_botao || ''}
                      onChange={(e) => setEditingBanner({ ...editingBanner, link_botao: e.target.value })}
                      className="p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-slate-400 bg-white"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Imagem Desktop</label>
                    <div className="flex space-x-2">
                      <input 
                        type="text" 
                        required
                        value={editingBanner.image_url || ''}
                        onChange={(e) => setEditingBanner({ ...editingBanner, image_url: e.target.value })}
                        className="p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-slate-400 bg-white flex-grow"
                        placeholder="https://..."
                      />
                      <label className="flex items-center space-x-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer text-xs font-bold text-slate-700 border border-slate-200 shrink-0 select-none">
                        {uploadDesktopLoading ? (
                          <span className="animate-spin mr-1">⌛</span>
                        ) : '📁 Upload'}
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleBannerImageUpload('desktop', e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Imagem Mobile</label>
                    <div className="flex space-x-2">
                      <input 
                        type="text" 
                        required
                        value={editingBanner.mobile_image_url || ''}
                        onChange={(e) => setEditingBanner({ ...editingBanner, mobile_image_url: e.target.value })}
                        className="p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-slate-400 bg-white flex-grow"
                        placeholder="https://..."
                      />
                      <label className="flex items-center space-x-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer text-xs font-bold text-slate-700 border border-slate-200 shrink-0 select-none">
                        {uploadMobileLoading ? (
                          <span className="animate-spin mr-1">⌛</span>
                        ) : '📁 Upload'}
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleBannerImageUpload('mobile', e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Ordem de Exibição</label>
                    <input 
                      type="number" 
                      required
                      value={editingBanner.ordem || 1}
                      onChange={(e) => setEditingBanner({ ...editingBanner, ordem: Number(e.target.value) })}
                      className="p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-slate-400 bg-white"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Status do Banner</label>
                    <select 
                      value={editingBanner.status || 'ativo'}
                      onChange={(e) => setEditingBanner({ ...editingBanner, status: e.target.value as 'ativo' | 'inativo' })}
                      className="p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-slate-400 bg-white"
                    >
                      <option value="ativo">Ativo (Exibido)</option>
                      <option value="inativo">Inativo (Ocultado)</option>
                    </select>
                  </div>
                </div>

                {/* TEMPO REAL PREVIEW: Visual feedback to increase fidelity of modular actions */}
                <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl">
                  <span className="text-[9px] uppercase font-black text-slate-400 block mb-2 tracking-widest">Pré-visualização em Tempo Real</span>
                  <div className="relative rounded-xl border overflow-hidden bg-white p-6 max-w-full">
                    <div className="absolute top-0 right-0 w-[40%] h-full bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${editingBanner.image_url || ''})` }} />
                    <span className="inline-block bg-blue-50 text-[#005BFF] text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full mb-2 border border-blue-105">Slide Banner Ativo</span>
                    <h3 className="font-display font-black text-slate-900 text-sm md:text-md leading-tight uppercase max-w-xs">{editingBanner.titulo || 'SEM TÍTULO'}</h3>
                    <p className="text-[10px] text-slate-500 mt-1 max-w-xs">{editingBanner.subtitulo || 'Sem subtítulo configurado.'}</p>
                    <button type="button" className="mt-3 py-1.5 px-3 bg-[#005BFF] text-white text-[9px] font-bold rounded-lg uppercase">{editingBanner.texto_botao || 'CONTRATAR'}</button>
                  </div>
                </div>

                <div className="pt-3 border-t flex justify-between items-center">
                  <div>
                    {editingBanner.id && (
                      <button 
                        type="button" 
                        onClick={() => excluirBanner(editingBanner.id!)}
                        className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold flex items-center space-x-1.5 border border-red-100"
                      >
                        <Trash2 size={13} />
                        <span>Excluir Permanentemente</span>
                      </button>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button type="button" onClick={() => setEditingBanner(null)} className="px-4 py-2 rounded-xl bg-slate-150 hover:bg-slate-200 text-slate-750 text-xs font-bold">Cancelar</button>
                    <button type="submit" className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center space-x-1.5"><Save size={13} /><span>Salvar Banner</span></button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6 font-semibold">
                  <div>
                    <h3 className="font-display font-black text-xs text-slate-800 uppercase tracking-wider">Banners Carrossel (Hero Secction)</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">Gerencie os slides exibidos na seção de apresentação principal do site.</p>
                  </div>
                  <button 
                    onClick={() => setEditingBanner({ titulo: '', subtitulo: '', texto_botao: 'Contratar Agora', link_botao: '#planos', image_url: '', mobile_image_url: '', ordem: bannersList.length + 1, status: 'ativo' })}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs flex items-center space-x-1.5"
                  >
                    <Plus size={14} />
                    <span>Adicionar Banner</span>
                  </button>
                </div>

                {bannersList.length === 0 ? (
                  <p className="text-center py-12 text-slate-400 text-xs font-mono">Nenhum banner cadastrado ainda.</p>
                ) : (
                  <div className="space-y-4">
                    {bannersList.map((banner) => (
                      <div key={banner.id} className="p-4 border rounded-2xl flex flex-col md:flex-row md:items-center md:justify-between bg-[#F8FAFC] border-slate-200 text-xs gap-4 hover:border-slate-300">
                        <div className="flex items-start space-x-4">
                          {banner.image_url && <img src={banner.image_url} alt={banner.titulo} className="w-16 h-12 rounded-lg object-cover border border-slate-200 shadow-sm" referrerPolicy="no-referrer" />}
                          <div>
                            <span className="font-mono text-[9px] text-[#005BFF] bg-blue-50 px-1.5 py-0.5 rounded font-black">Slide Ordem: {banner.ordem}</span>
                            <h4 className="font-bold text-slate-900 text-sm mt-1 uppercase max-w-sm truncate">{banner.titulo}</h4>
                            <p className="text-[10px] text-slate-500 truncate max-w-xs">{banner.subtitulo}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 shrink-0 md:self-center self-end">
                          <span className={`px-2 py-0.5 text-[9px] rounded-full uppercase font-black font-mono border ${
                            banner.status === 'ativo' 
                              ? 'bg-emerald-50 border-emerald-250 text-emerald-700' 
                              : 'bg-slate-100 border-slate-200 text-slate-450'
                          }`}>
                            {banner.status}
                          </span>
                          <button 
                            onClick={() => setEditingBanner(banner)}
                            className="p-1 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold flex items-center gap-1.5 transition-all"
                          >
                            <Edit3 size={13} /> Editar
                          </button>
                          <button 
                            onClick={() => excluirBanner(banner.id)}
                            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm shadow-red-500/20 uppercase tracking-wider"
                          >
                            Excluir
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            TAB: CONTEÚDO DO SITE
            ======================================================== */}
        {activeTab === 'conteudo' && siteConfig && (
          <form onSubmit={handleSiteConfigGeneralSubmit} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 animate-fade-in">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="font-display font-black text-xs text-slate-800 uppercase tracking-wider">Edição de Conteúdos do Site</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Ajuste os textos principais de todas as seções da página inicial.</p>
            </div>

            <div className="space-y-6 text-xs">
              {/* HERO SECTION */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                <h4 className="font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  SEÇÃO HERO (TOPO)
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex flex-col space-y-1">
                    <label className="font-bold text-slate-400 uppercase text-[10px]">Título Principal (Use \n para nova linha)</label>
                    <textarea 
                      rows={2}
                      value={siteConfig.hero_titulo || ''}
                      onChange={(e) => setSiteConfig({ ...siteConfig, hero_titulo: e.target.value })}
                      className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="font-bold text-slate-400 uppercase text-[10px]">Subtítulo / Descrição</label>
                    <textarea 
                      rows={2}
                      value={siteConfig.hero_subtitulo || ''}
                      onChange={(e) => setSiteConfig({ ...siteConfig, hero_subtitulo: e.target.value })}
                      className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1">
                      <label className="font-bold text-slate-400 uppercase text-[10px]">Texto do Botão Hero</label>
                      <input 
                        type="text" 
                        value={siteConfig.hero_texto_botao || ''}
                        onChange={(e) => setSiteConfig({ ...siteConfig, hero_texto_botao: e.target.value })}
                        className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="font-bold text-slate-400 uppercase text-[10px]">Link do Botão Hero</label>
                      <input 
                        type="text" 
                        value={siteConfig.hero_link_botao || ''}
                        onChange={(e) => setSiteConfig({ ...siteConfig, hero_link_botao: e.target.value })}
                        className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* VANTAGENS SECTION */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                <h4 className="font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  DIFERENCIAIS / VANTAGENS
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex flex-col space-y-1">
                    <label className="font-bold text-slate-400 uppercase text-[10px]">Título da Seção</label>
                    <input 
                      type="text" 
                      value={siteConfig.vantagens_titulo || ''}
                      onChange={(e) => setSiteConfig({ ...siteConfig, vantagens_titulo: e.target.value })}
                      className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="font-bold text-slate-400 uppercase text-[10px]">Descrição da Seção</label>
                    <textarea 
                      rows={2}
                      value={siteConfig.vantagens_subtitulo || ''}
                      onChange={(e) => setSiteConfig({ ...siteConfig, vantagens_subtitulo: e.target.value })}
                      className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="font-bold text-slate-400 uppercase text-[10px]">Lista de Diferenciais</label>
                    <div className="space-y-2">
                      {(() => {
                        let list: any[] = [];
                        try { list = JSON.parse(siteConfig.vantagens_lista_json || '[]'); } catch(e) {}
                        return (
                          <>
                            {list.map((item, idx) => (
                              <div key={idx} className="flex flex-col p-3 bg-white border rounded-xl gap-2 relative group">
                                <button 
                                  type="button"
                                  onClick={() => {
                                    const newList = list.filter((_, i) => i !== idx);
                                    setSiteConfig({ ...siteConfig, vantagens_lista_json: JSON.stringify(newList) });
                                  }}
                                  className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X size={14} />
                                </button>
                                <input 
                                  type="text" 
                                  placeholder="Título do Diferencial"
                                  value={item.titulo || ''}
                                  onChange={(e) => {
                                    const newList = [...list];
                                    newList[idx] = { ...newList[idx], titulo: e.target.value };
                                    setSiteConfig({ ...siteConfig, vantagens_lista_json: JSON.stringify(newList) });
                                  }}
                                  className="p-1.5 border-b font-bold focus:outline-none"
                                />
                                <textarea 
                                  placeholder="Descrição detalhada"
                                  rows={2}
                                  value={item.descricao || ''}
                                  onChange={(e) => {
                                    const newList = [...list];
                                    newList[idx] = { ...newList[idx], descricao: e.target.value };
                                    setSiteConfig({ ...siteConfig, vantagens_lista_json: JSON.stringify(newList) });
                                  }}
                                  className="p-1.5 text-[10px] focus:outline-none resize-none"
                                />
                              </div>
                            ))}
                            <button 
                              type="button"
                              onClick={() => {
                                const newList = [...list, { titulo: '', descricao: '' }];
                                setSiteConfig({ ...siteConfig, vantagens_lista_json: JSON.stringify(newList) });
                              }}
                              className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:text-slate-600 hover:border-slate-400 text-[10px] font-bold flex items-center justify-center gap-1"
                            >
                              <Plus size={12} /> Incluir Novo Diferencial
                            </button>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </div>

              {/* SOBRE NÓS SECTION */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                <h4 className="font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  SOBRE NÓS
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1">
                      <label className="font-bold text-slate-400 uppercase text-[10px]">Tag (Ex: Sobre Nós)</label>
                      <input 
                        type="text" 
                        value={siteConfig.sobre_titulo_tag || ''}
                        onChange={(e) => setSiteConfig({ ...siteConfig, sobre_titulo_tag: e.target.value })}
                        className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="font-bold text-slate-400 uppercase text-[10px]">URL da Imagem Sobre</label>
                      <input 
                        type="text" 
                        value={siteConfig.sobre_imagem_url || ''}
                        onChange={(e) => setSiteConfig({ ...siteConfig, sobre_imagem_url: e.target.value })}
                        className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="font-bold text-slate-400 uppercase text-[10px]">Título Chamativo</label>
                    <textarea 
                      rows={2}
                      value={siteConfig.sobre_titulo || ''}
                      onChange={(e) => setSiteConfig({ ...siteConfig, sobre_titulo: e.target.value })}
                      className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white font-bold"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="font-bold text-slate-400 uppercase text-[10px]">Texto de Destaque</label>
                    <textarea 
                      rows={3}
                      value={siteConfig.sobre_destaque || ''}
                      onChange={(e) => setSiteConfig({ ...siteConfig, sobre_destaque: e.target.value })}
                      className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white font-semibold"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="font-bold text-slate-400 uppercase text-[10px]">Descrição Detalhada</label>
                    <textarea 
                      rows={4}
                      value={siteConfig.sobre_descricao || ''}
                      onChange={(e) => setSiteConfig({ ...siteConfig, sobre_descricao: e.target.value })}
                      className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-1">
                        <label className="font-bold text-slate-400 uppercase text-[10px]">Título Propósito</label>
                        <input 
                          type="text" 
                          value={siteConfig.sobre_proposito_titulo || ''}
                          onChange={(e) => setSiteConfig({ ...siteConfig, sobre_proposito_titulo: e.target.value })}
                          className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <label className="font-bold text-slate-400 uppercase text-[10px]">Descrição Propósito</label>
                        <textarea 
                          rows={2}
                          value={siteConfig.sobre_proposito_desc || ''}
                          onChange={(e) => setSiteConfig({ ...siteConfig, sobre_proposito_desc: e.target.value })}
                          className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-1">
                        <label className="font-bold text-slate-400 uppercase text-[10px]">Título Valor</label>
                        <input 
                          type="text" 
                          value={siteConfig.sobre_valor_titulo || ''}
                          onChange={(e) => setSiteConfig({ ...siteConfig, sobre_valor_titulo: e.target.value })}
                          className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <label className="font-bold text-slate-400 uppercase text-[10px]">Descrição Valor</label>
                        <textarea 
                          rows={2}
                          value={siteConfig.sobre_valor_desc || ''}
                          onChange={(e) => setSiteConfig({ ...siteConfig, sobre_valor_desc: e.target.value })}
                          className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CONTATO SECTION */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                <h4 className="font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  SEÇÃO DE CONTATO
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex flex-col space-y-1">
                    <label className="font-bold text-slate-400 uppercase text-[10px]">Título de Chamada</label>
                    <textarea 
                      rows={2}
                      value={siteConfig.contato_titulo || ''}
                      onChange={(e) => setSiteConfig({ ...siteConfig, contato_titulo: e.target.value })}
                      className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white font-bold"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="font-bold text-slate-400 uppercase text-[10px]">Tag de Contato (Ex: CONECTE-SE AGORA)</label>
                    <input 
                      type="text" 
                      value={siteConfig.contato_subtitulo || ''}
                      onChange={(e) => setSiteConfig({ ...siteConfig, contato_subtitulo: e.target.value })}
                      className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="font-bold text-slate-400 uppercase text-[10px]">Descrição Chamativa</label>
                    <textarea 
                      rows={3}
                      value={siteConfig.contato_descricao || ''}
                      onChange={(e) => setSiteConfig({ ...siteConfig, contato_descricao: e.target.value })}
                      className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="font-bold text-slate-400 uppercase text-[10px]">Texto Legal Rodapé (LGPD)</label>
                    <textarea 
                      rows={2}
                      value={siteConfig.contato_legal || ''}
                      onChange={(e) => setSiteConfig({ ...siteConfig, contato_legal: e.target.value })}
                      className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white text-[10px]"
                    />
                  </div>
                </div>
              </div>

              {/* FAQ SECTION */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                <h4 className="font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  PERGUNTAS FREQUENTES (FAQ)
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex flex-col space-y-1">
                    <label className="font-bold text-slate-400 uppercase text-[10px]">Título do FAQ</label>
                    <input 
                      type="text" 
                      value={siteConfig.faq_titulo || ''}
                      onChange={(e) => setSiteConfig({ ...siteConfig, faq_titulo: e.target.value })}
                      className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="font-bold text-slate-400 uppercase text-[10px]">Subtítulo do FAQ</label>
                    <textarea 
                      rows={2}
                      value={siteConfig.faq_subtitulo || ''}
                      onChange={(e) => setSiteConfig({ ...siteConfig, faq_subtitulo: e.target.value })}
                      className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="font-bold text-slate-400 uppercase text-[10px]">Lista de FAQ (Interativo)</label>
                    <div className="space-y-2 text-[11px]">
                      {(() => {
                        let list: any[] = [];
                        try { list = JSON.parse(siteConfig.faq_lista_json || '[]'); } catch(e) {}
                        return (
                          <>
                            {list.map((item, idx) => (
                              <div key={idx} className="flex flex-col p-3 bg-white border rounded-xl gap-2 relative group shadow-sm">
                                <button 
                                  type="button"
                                  onClick={() => {
                                    const newList = list.filter((_, i) => i !== idx);
                                    setSiteConfig({ ...siteConfig, faq_lista_json: JSON.stringify(newList) });
                                  }}
                                  className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X size={14} />
                                </button>
                                <input 
                                  type="text" 
                                  placeholder="Pergunta do Cliente"
                                  value={item.pergunta || ''}
                                  onChange={(e) => {
                                    const newList = [...list];
                                    newList[idx] = { ...newList[idx], pergunta: e.target.value };
                                    setSiteConfig({ ...siteConfig, faq_lista_json: JSON.stringify(newList) });
                                  }}
                                  className="p-1.5 border-b font-bold focus:outline-none"
                                />
                                <textarea 
                                  placeholder="Resposta detalhada"
                                  rows={2}
                                  value={item.resposta || ''}
                                  onChange={(e) => {
                                    const newList = [...list];
                                    newList[idx] = { ...newList[idx], resposta: e.target.value };
                                    setSiteConfig({ ...siteConfig, faq_lista_json: JSON.stringify(newList) });
                                  }}
                                  className="p-1.5 text-[10px] focus:outline-none resize-none"
                                />
                              </div>
                            ))}
                            <button 
                              type="button"
                              onClick={() => {
                                const newList = [...list, { pergunta: '', resposta: '' }];
                                setSiteConfig({ ...siteConfig, faq_lista_json: JSON.stringify(newList) });
                              }}
                              className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:text-slate-600 hover:border-slate-400 text-[10px] font-bold flex items-center justify-center gap-1"
                            >
                              <Plus size={12} /> Excluir ou Incluir FAQ
                            </button>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </div>

              {/* DEPOIMENTOS SECTION */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                <h4 className="font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  DEPOIMENTOS / AVALIAÇÕES
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex flex-col space-y-1">
                    <label className="font-bold text-slate-400 uppercase text-[10px]">Título de Avaliações</label>
                    <input 
                      type="text" 
                      value={siteConfig.depoimentos_titulo || ''}
                      onChange={(e) => setSiteConfig({ ...siteConfig, depoimentos_titulo: e.target.value })}
                      className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="font-bold text-slate-400 uppercase text-[10px]">Subtítulo de Avaliações</label>
                    <textarea 
                      rows={2}
                      value={siteConfig.depoimentos_subtitulo || ''}
                      onChange={(e) => setSiteConfig({ ...siteConfig, depoimentos_subtitulo: e.target.value })}
                      className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="font-bold text-slate-400 uppercase text-[10px]">Lista de Depoimentos (Interativo)</label>
                    <div className="space-y-3">
                      {(() => {
                        let list: any[] = [];
                        try { list = JSON.parse(siteConfig.depoimentos_lista_json || '[]'); } catch(e) {}
                        return (
                          <>
                            {list.map((item, idx) => (
                              <div key={idx} className="flex flex-col p-4 bg-white border rounded-2xl gap-2 relative group shadow-sm border-slate-100">
                                <button 
                                  type="button"
                                  onClick={() => {
                                    const newList = list.filter((_, i) => i !== idx);
                                    setSiteConfig({ ...siteConfig, depoimentos_lista_json: JSON.stringify(newList) });
                                  }}
                                  className="absolute top-3 right-3 text-red-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X size={16} />
                                </button>
                                <div className="grid grid-cols-2 gap-2">
                                  <input 
                                    type="text" placeholder="Nome do Cliente"
                                    value={item.nome || ''}
                                    onChange={(e) => {
                                      const newList = [...list];
                                      newList[idx] = { ...newList[idx], nome: e.target.value };
                                      setSiteConfig({ ...siteConfig, depoimentos_lista_json: JSON.stringify(newList) });
                                    }}
                                    className="p-1 px-2 border rounded-lg font-bold focus:outline-none text-[11px]"
                                  />
                                  <input 
                                    type="text" placeholder="Cargo / Perfil"
                                    value={item.cargo || ''}
                                    onChange={(e) => {
                                      const newList = [...list];
                                      newList[idx] = { ...newList[idx], cargo: e.target.value };
                                      setSiteConfig({ ...siteConfig, depoimentos_lista_json: JSON.stringify(newList) });
                                    }}
                                    className="p-1 px-2 border rounded-lg focus:outline-none text-[10px]"
                                  />
                                </div>
                                <input 
                                  type="text" placeholder="Plano assinado"
                                  value={item.plano || ''}
                                  onChange={(e) => {
                                    const newList = [...list];
                                    newList[idx] = { ...newList[idx], plano: e.target.value };
                                    setSiteConfig({ ...siteConfig, depoimentos_lista_json: JSON.stringify(newList) });
                                  }}
                                  className="p-1 px-2 border rounded-lg focus:outline-none text-[10px] text-blue-600 font-bold"
                                />
                                <textarea 
                                  placeholder="Relato do cliente"
                                  rows={2}
                                  value={item.texto || ''}
                                  onChange={(e) => {
                                    const newList = [...list];
                                    newList[idx] = { ...newList[idx], texto: e.target.value };
                                    setSiteConfig({ ...siteConfig, depoimentos_lista_json: JSON.stringify(newList) });
                                  }}
                                  className="p-1 px-2 border rounded-lg text-[11px] focus:outline-none resize-none leading-tight"
                                />
                                <div className="flex items-center gap-2">
                                  <input 
                                    type="text" placeholder="Avatar URL"
                                    value={item.avatar || ''}
                                    onChange={(e) => {
                                      const newList = [...list];
                                      newList[idx] = { ...newList[idx], avatar: e.target.value };
                                      setSiteConfig({ ...siteConfig, depoimentos_lista_json: JSON.stringify(newList) });
                                    }}
                                    className="p-1 px-2 border rounded-lg focus:outline-none text-[9px] flex-grow font-mono"
                                  />
                                  <div className="flex gap-1 text-amber-400">
                                    {[1,2,3,4,5].map(s => (
                                      <Star key={s} size={10} fill={item.estrelas >= s ? "currentColor" : "none"} />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                            <button 
                              type="button"
                              onClick={() => {
                                const newList = [...list, { nome: '', cargo: '', plano: '', texto: '', estrelas: 5, avatar: '' }];
                                setSiteConfig({ ...siteConfig, depoimentos_lista_json: JSON.stringify(newList) });
                              }}
                              className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-slate-600 hover:border-slate-400 text-[10px] font-bold flex items-center justify-center gap-1"
                            >
                              <Plus size={14} /> Incluir Nova Avaliação de Cliente
                            </button>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t flex justify-end">
              <button 
                type="submit" 
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl flex items-center space-x-1.5 shadow-md shadow-emerald-200"
              >
                <Save size={14} />
                <span>Salvar Conteúdo</span>
              </button>
            </div>
          </form>
        )}

        {/* ========================================================
            TAB: RODAPÉ DO SITE
            ======================================================== */}
        {activeTab === 'rodape' && siteConfig && (
          <form onSubmit={handleSiteConfigGeneralSubmit} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5 animate-fade-in">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="font-display font-black text-xs text-slate-800 uppercase tracking-wider">Configuração Completa do Rodapé</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Gerencie todas as informações exibidas na parte inferior do portal.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">Título da Coluna Principal</label>
                <input 
                  type="text" 
                  value={siteConfig.footer_titulo || ''}
                  onChange={(e) => setSiteConfig({ ...siteConfig, footer_titulo: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">CNPJ Exibido no Rodapé</label>
                <input 
                  type="text" 
                  value={siteConfig.footer_cnpj || ''}
                  onChange={(e) => setSiteConfig({ ...siteConfig, footer_cnpj: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                />
              </div>

              <div className="flex flex-col space-y-1 sm:col-span-2">
                <label className="font-bold text-slate-400 uppercase text-[10px]">Sugestão de Descrição / Slogan</label>
                <textarea 
                  rows={2}
                  value={siteConfig.footer_descricao || ''}
                  onChange={(e) => setSiteConfig({ ...siteConfig, footer_descricao: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">Endereço Exibido</label>
                <input 
                  type="text" 
                  value={siteConfig.footer_endereco || ''}
                  onChange={(e) => setSiteConfig({ ...siteConfig, footer_endereco: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">E-mail Exibido</label>
                <input 
                  type="email" 
                  value={siteConfig.footer_email || ''}
                  onChange={(e) => setSiteConfig({ ...siteConfig, footer_email: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">Telefone Exibido</label>
                <input 
                  type="text" 
                  value={siteConfig.footer_telefone || ''}
                  onChange={(e) => setSiteConfig({ ...siteConfig, footer_telefone: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">Instagram (Username)</label>
                <input 
                  type="text" 
                  value={siteConfig.footer_instagram || ''}
                  onChange={(e) => setSiteConfig({ ...siteConfig, footer_instagram: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">Facebook (Username)</label>
                <input 
                  type="text" 
                  value={siteConfig.footer_facebook || ''}
                  onChange={(e) => setSiteConfig({ ...siteConfig, footer_facebook: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">Horários de Atendimento</label>
                <input 
                  type="text" 
                  value={siteConfig.footer_horario || ''}
                  onChange={(e) => setSiteConfig({ ...siteConfig, footer_horario: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                />
              </div>

              <div className="flex flex-col space-y-1 sm:col-span-2">
                <label className="font-bold text-slate-400 uppercase text-[10px]">Texto Legal / OBS Rodapé</label>
                <textarea 
                  rows={2}
                  value={siteConfig.footer_texto_legal || ''}
                  onChange={(e) => setSiteConfig({ ...siteConfig, footer_texto_legal: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">Texto Copyright</label>
                <input 
                  type="text" 
                  value={siteConfig.footer_copyright || ''}
                  onChange={(e) => setSiteConfig({ ...siteConfig, footer_copyright: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                />
              </div>

              <div className="flex flex-col space-y-1 sm:col-span-2">
                <label className="font-bold text-slate-400 uppercase text-[10px]">Links Rápidos</label>
                <div className="space-y-2">
                  {(() => {
                    const lines = (siteConfig.footer_links_rapidos || '').split('\n').filter(Boolean);
                    return (
                      <>
                        {lines.map((line, idx) => {
                          const [label, slug] = line.split(':').map(s => s.trim());
                          return (
                            <div key={idx} className="flex items-center gap-2">
                              <input 
                                type="text"
                                placeholder="Página (ex: Planos)"
                                value={label || ''}
                                onChange={(e) => {
                                  const newLines = [...lines];
                                  newLines[idx] = `${e.target.value}: ${slug || ''}`;
                                  setSiteConfig({ ...siteConfig, footer_links_rapidos: newLines.join('\n') });
                                }}
                                className="p-2 border rounded-xl flex-grow focus:outline-slate-400"
                              />
                              <input 
                                type="text"
                                placeholder="URL (ex: #planos)"
                                value={slug || ''}
                                onChange={(e) => {
                                  const newLines = [...lines];
                                  newLines[idx] = `${label || ''}: ${e.target.value}`;
                                  setSiteConfig({ ...siteConfig, footer_links_rapidos: newLines.join('\n') });
                                }}
                                className="p-2 border rounded-xl w-1/3 focus:outline-slate-400 font-mono"
                              />
                              <button 
                                type="button"
                                onClick={() => {
                                  const newLines = lines.filter((_, i) => i !== idx);
                                  setSiteConfig({ ...siteConfig, footer_links_rapidos: newLines.join('\n') });
                                }}
                                className="text-red-400 hover:text-red-600 p-2"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          );
                        })}
                        <button 
                          type="button"
                          onClick={() => {
                            const newLines = [...lines, 'Novo Link: #'];
                            setSiteConfig({ ...siteConfig, footer_links_rapidos: newLines.join('\n') });
                          }}
                          className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:text-slate-600 text-[10px] font-bold"
                        >
                          + Incluir Link no Rodapé
                        </button>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t flex justify-end">
              <button 
                type="submit" 
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl flex items-center space-x-1.5"
              >
                <Save size={14} />
                <span>Salvar Rodapé</span>
              </button>
            </div>
          </form>
        )}

        {/* ========================================================
            TAB 3: DADOS DA EMPRESA
            ======================================================== */}
        {activeTab === 'empresa' && empresaDetail && (
          <form onSubmit={handleEmpresaSaveSubmit} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5 animate-fade-in">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="font-display font-black text-xs text-slate-800 uppercase tracking-wider">Módulo Dados da Empresa</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Essas variáveis modificam todas as referências físicas e de comunicações do site.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">Nome da Empresa</label>
                <input 
                  type="text" 
                  required
                  value={empresaDetail.nome_empresa}
                  onChange={(e) => setEmpresaDetail({ ...empresaDetail, nome_empresa: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">Telefone Comercial</label>
                <input 
                  type="text" 
                  required
                  value={empresaDetail.telefone}
                  onChange={(e) => setEmpresaDetail({ ...empresaDetail, telefone: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">WhatsApp Comercial (Com ddd, ex: 5511910050121)</label>
                <input 
                  type="text" 
                  required
                  value={empresaDetail.whatsapp}
                  onChange={(e) => setEmpresaDetail({ ...empresaDetail, whatsapp: e.target.value.replace(/\D/g, '') })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">E-mail de Contato</label>
                <input 
                  type="email" 
                  required
                  value={empresaDetail.email}
                  onChange={(e) => setEmpresaDetail({ ...empresaDetail, email: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                />
              </div>

              <div className="flex flex-col space-y-1 sm:col-span-2">
                <label className="font-bold text-slate-400 uppercase text-[10px]">Endereço Comercial (Logradouro)</label>
                <input 
                  type="text" 
                  required
                  value={empresaDetail.endereco}
                  onChange={(e) => setEmpresaDetail({ ...empresaDetail, endereco: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">Número</label>
                <input 
                  type="text" 
                  required
                  value={empresaDetail.numero}
                  onChange={(e) => setEmpresaDetail({ ...empresaDetail, numero: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">CNPJ da Empresa</label>
                <input 
                  type="text" 
                  value={empresaDetail.cnpj || ''}
                  onChange={(e) => setEmpresaDetail({ ...empresaDetail, cnpj: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                  placeholder="00.000.000/0000-00"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">Bairro</label>
                <input 
                  type="text" 
                  required
                  value={empresaDetail.bairro || ''}
                  onChange={(e) => setEmpresaDetail({ ...empresaDetail, bairro: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">Cidade (Ex: São Paulo)</label>
                <input 
                  type="text" 
                  required
                  value={empresaDetail.cidade || ''}
                  onChange={(e) => setEmpresaDetail({ ...empresaDetail, cidade: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">Estado (UF, ex SP)</label>
                <input 
                  type="text" 
                  maxLength={2}
                  required
                  value={empresaDetail.estado || ''}
                  onChange={(e) => setEmpresaDetail({ ...empresaDetail, estado: e.target.value.toUpperCase() })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">CEP</label>
                <input 
                  type="text" 
                  required
                  value={empresaDetail.cep || ''}
                  onChange={(e) => setEmpresaDetail({ ...empresaDetail, cep: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">Horários de Funcionamento</label>
                <input 
                  type="text" 
                  required
                  value={empresaDetail.horario_funcionamento || ''}
                  onChange={(e) => setEmpresaDetail({ ...empresaDetail, horario_funcionamento: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">Latitude (Para link de rotas)</label>
                <input 
                  type="text" 
                  value={empresaDetail.latitude || ''}
                  onChange={(e) => setEmpresaDetail({ ...empresaDetail, latitude: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white font-mono"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">Longitude (Para link de rotas)</label>
                <input 
                  type="text" 
                  value={empresaDetail.longitude || ''}
                  onChange={(e) => setEmpresaDetail({ ...empresaDetail, longitude: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white font-mono"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">CNPJ da Empresa</label>
                <input 
                  type="text" 
                  value={empresaDetail.cnpj || ''}
                  onChange={(e) => setEmpresaDetail({ ...empresaDetail, cnpj: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                  placeholder="Ex: 45.182.293/0001-90"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">Instagram (Usuário sem @)</label>
                <input 
                  type="text" 
                  value={empresaDetail.instagram || ''}
                  onChange={(e) => setEmpresaDetail({ ...empresaDetail, instagram: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                  placeholder="gigatelofc"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">Facebook (Usuário)</label>
                <input 
                  type="text" 
                  value={empresaDetail.facebook || ''}
                  onChange={(e) => setEmpresaDetail({ ...empresaDetail, facebook: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                  placeholder="gigatelofc"
                />
              </div>
            </div>

            <div className="pt-3 border-t flex justify-end">
              <button 
                type="submit" 
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl flex items-center space-x-1.5"
              >
                <Save size={14} />
                <span>Salvar e Atualizar Site</span>
              </button>
            </div>
          </form>
        )}

        {/* ========================================================
            TAB: LOGOTIPOS E IDENTIDADE
            ======================================================== */}
        {activeTab === 'logo' && brandSettingsDetail && (
          <form onSubmit={handleBrandSettingsSaveSubmit} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-8 animate-fade-in">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="font-display font-black text-xs text-slate-800 uppercase tracking-wider">Identidade Visual</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Gerencie os logotipos principais, favicon e variações de cor do seu site.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Logo Principal (Dark Mode / Normal) */}
              <div className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <label className="font-bold text-slate-800 uppercase text-[10px]">Logo Principal (Colorida)</label>
                  <p className="text-[10px] text-slate-500 mb-2">Usado em fundos claros (Painel, Login, Menu Branco).</p>
                  <div className="flex flex-col space-y-3">
                    <div className="flex space-x-2">
                      <input 
                        type="text" 
                        value={brandSettingsDetail.logo_url || ''}
                        onChange={(e) => setBrandSettingsDetail({ ...brandSettingsDetail, logo_url: e.target.value })}
                        className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white flex-grow text-xs font-mono"
                        placeholder="URL do Logo"
                      />
                      <label className="flex items-center space-x-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 rounded-xl cursor-pointer text-[10px] font-bold text-white shrink-0 select-none transition-colors">
                        {uploadLogoLoading ? <span className="animate-spin">⌛</span> : <Upload size={12} />}
                        <span>Upload</span>
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files && handleLogoIdentityUpload('logo_url', e.target.files[0])} />
                      </label>
                    </div>
                    
                    <div className="relative group aspect-video bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center p-4 overflow-hidden">
                      {brandSettingsDetail.logo_url ? (
                        <>
                          <img src={brandSettingsDetail.logo_url} alt="Logo Principal" className="max-h-full object-contain" referrerPolicy="no-referrer" />
                          <button 
                            type="button"
                            onClick={() => setBrandSettingsDetail({...brandSettingsDetail, logo_url: ''})}
                            className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={12} />
                          </button>
                        </>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400">Nenhum logo carregado</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Logo Branca (Light Version) */}
              <div className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <label className="font-bold text-slate-800 uppercase text-[10px]">Logo Secundária (Branca / Negativa)</label>
                  <p className="text-[10px] text-slate-500 mb-2">Usado em fundos escuros (Menu Transparente, Rodapé).</p>
                  <div className="flex flex-col space-y-3">
                    <div className="flex space-x-2">
                      <input 
                        type="text" 
                        value={brandSettingsDetail.logo_white_url || ''}
                        onChange={(e) => setBrandSettingsDetail({ ...brandSettingsDetail, logo_white_url: e.target.value })}
                        className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white flex-grow text-xs font-mono"
                        placeholder="URL do Logo Branco"
                      />
                      <label className="flex items-center space-x-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 rounded-xl cursor-pointer text-[10px] font-bold text-white shrink-0 select-none transition-colors">
                        {uploadLogoBrancaLoading ? <span className="animate-spin">⌛</span> : <Upload size={12} />}
                        <span>Upload</span>
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files && handleLogoIdentityUpload('logo_white_url', e.target.files[0])} />
                      </label>
                    </div>
                    
                    <div className="relative group aspect-video bg-[#0A1F44] rounded-2xl border-2 border-dashed border-white/10 flex items-center justify-center p-4 overflow-hidden">
                      {brandSettingsDetail.logo_white_url ? (
                        <>
                          <img src={brandSettingsDetail.logo_white_url} alt="Logo Branca" className="max-h-full object-contain" referrerPolicy="no-referrer" />
                          <button 
                            type="button"
                            onClick={() => setBrandSettingsDetail({...brandSettingsDetail, logo_white_url: ''})}
                            className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={12} />
                          </button>
                        </>
                      ) : (
                        <span className="text-[10px] font-bold text-white/20">Nenhum logo branco carregado</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Logo Rodapé */}
              <div className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <label className="font-bold text-slate-800 uppercase text-[10px]">Logo para Rodapé</label>
                  <p className="text-[10px] text-slate-500 mb-2">Exibido na parte inferior do site.</p>
                  <div className="flex flex-col space-y-3">
                    <div className="flex space-x-2">
                      <input 
                        type="text" 
                        value={brandSettingsDetail.logo_footer_url || ''}
                        onChange={(e) => setBrandSettingsDetail({ ...brandSettingsDetail, logo_footer_url: e.target.value })}
                        className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white flex-grow text-xs font-mono"
                        placeholder="URL do Logo Rodapé"
                      />
                      <label className="flex items-center space-x-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 rounded-xl cursor-pointer text-[10px] font-bold text-white shrink-0 select-none transition-colors">
                        {uploadLogoRodapeLoading ? <span className="animate-spin">⌛</span> : <Upload size={12} />}
                        <span>Upload</span>
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files && handleLogoIdentityUpload('logo_footer_url', e.target.files[0])} />
                      </label>
                    </div>
                    
                    <div className="relative group aspect-video bg-slate-900 rounded-2xl border-2 border-dashed border-white/10 flex items-center justify-center p-4 overflow-hidden">
                      {brandSettingsDetail.logo_footer_url ? (
                        <>
                          <img src={brandSettingsDetail.logo_footer_url} alt="Logo Rodapé" className="max-h-full object-contain" referrerPolicy="no-referrer" />
                          <button 
                            type="button"
                            onClick={() => setBrandSettingsDetail({...brandSettingsDetail, logo_footer_url: ''})}
                            className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={12} />
                          </button>
                        </>
                      ) : (
                        <span className="text-[10px] font-bold text-white/20">Sem logo rodapé</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Logo Mobile */}
              <div className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <label className="font-bold text-slate-800 uppercase text-[10px]">Logo para Versão Mobile</label>
                  <p className="text-[10px] text-slate-500 mb-2">Logo compacta para telas menores.</p>
                  <div className="flex flex-col space-y-3">
                    <div className="flex space-x-2">
                      <input 
                        type="text" 
                        value={brandSettingsDetail.logo_mobile_url || ''}
                        onChange={(e) => setBrandSettingsDetail({ ...brandSettingsDetail, logo_mobile_url: e.target.value })}
                        className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white flex-grow text-xs font-mono"
                        placeholder="URL do Logo Mobile"
                      />
                      <label className="flex items-center space-x-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 rounded-xl cursor-pointer text-[10px] font-bold text-white shrink-0 select-none transition-colors">
                        {uploadLogoMobileLoading ? <span className="animate-spin">⌛</span> : <Upload size={12} />}
                        <span>Upload</span>
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files && handleLogoIdentityUpload('logo_mobile_url', e.target.files[0])} />
                      </label>
                    </div>
                    
                    <div className="relative group aspect-video bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center p-4 overflow-hidden">
                      {brandSettingsDetail.logo_mobile_url ? (
                        <>
                          <img src={brandSettingsDetail.logo_mobile_url} alt="Logo Mobile" className="max-h-full object-contain" referrerPolicy="no-referrer" />
                          <button 
                            type="button"
                            onClick={() => setBrandSettingsDetail({...brandSettingsDetail, logo_mobile_url: ''})}
                            className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={12} />
                          </button>
                        </>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400">Sem logo mobile</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Favicon */}
              <div className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <label className="font-bold text-slate-800 uppercase text-[10px]">Favicon (Ícone da Aba)</label>
                  <p className="text-[10px] text-slate-500 mb-2">Ícone pequeno exibido na aba do navegador (PNG/ICO).</p>
                  <div className="flex flex-col space-y-3">
                    <div className="flex space-x-2">
                      <input 
                        type="text" 
                        value={brandSettingsDetail.favicon_url || ''}
                        onChange={(e) => setBrandSettingsDetail({ ...brandSettingsDetail, favicon_url: e.target.value })}
                        className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white flex-grow text-xs font-mono"
                        placeholder="URL do Favicon"
                      />
                      <label className="flex items-center space-x-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 rounded-xl cursor-pointer text-[10px] font-bold text-white shrink-0 select-none transition-colors">
                        {uploadFaviconLoading ? <span className="animate-spin">⌛</span> : <Upload size={12} />}
                        <span>Upload</span>
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files && handleLogoIdentityUpload('favicon_url', e.target.files[0])} />
                      </label>
                    </div>
                    
                    <div className="relative group w-24 h-24 bg-white rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center p-4 self-center overflow-hidden">
                      {brandSettingsDetail.favicon_url ? (
                        <>
                          <img src={brandSettingsDetail.favicon_url} alt="Favicon" className="w-12 h-12 object-contain" referrerPolicy="no-referrer" />
                          <button 
                            type="button"
                            onClick={() => setBrandSettingsDetail({...brandSettingsDetail, favicon_url: ''})}
                            className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={12} />
                          </button>
                        </>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400 text-center leading-tight">Sem Favicon</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t flex items-center justify-between">
              <div className="flex items-center space-x-2 text-slate-400">
                <CheckCircle size={14} className="text-emerald-500" />
                <span className="text-[10px] font-bold uppercase">As logos serão atualizadas em tempo real em todo o ecossistema.</span>
              </div>
              <button 
                type="submit" 
                className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl flex items-center space-x-2 shadow-xl shadow-emerald-500/20 uppercase tracking-tighter text-xs transition-all hover:scale-[1.02] active:scale-95"
              >
                <Save size={16} />
                <span>Salvar Identidade Visual</span>
              </button>
            </div>
          </form>
        )}

        {/* ========================================================
            TAB 4: PLANOS DE FIBRA
            ======================================================== */}
        {activeTab === 'planos' && (
          <div className="space-y-6 animate-fade-in">
            {editingPlano ? (
              <form onSubmit={handlePlanoSaveSubmit} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="pb-3 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-display font-black text-sm text-slate-800 uppercase tracking-wider">
                    {editingPlano.id ? 'Editar Plano Fibra' : 'Configurar Novo Plano'}
                  </h3>
                  <button type="button" onClick={() => setEditingPlano(null)} className="text-slate-400 hover:text-slate-900">
                    <X size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="flex flex-col space-y-1">
                    <label className="font-bold text-slate-400 uppercase text-[10px]">Nome Comercial do Plano</label>
                    <input 
                      type="text" 
                      required
                      value={editingPlano.nome || ''}
                      onChange={(e) => setEditingPlano({ ...editingPlano, nome: e.target.value })}
                      className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                      placeholder="Ex: PLANO ULTRA HYPE"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="font-bold text-slate-400 uppercase text-[10px]">Velocidade (Ex: 500 MEGA)</label>
                    <input 
                      type="text" 
                      required
                      value={editingPlano.velocidade || ''}
                      onChange={(e) => setEditingPlano({ ...editingPlano, velocidade: e.target.value })}
                      className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="font-bold text-slate-400 uppercase text-[10px]">Mensalidade em Reais (Preço, ex: 119.90)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      required
                      value={editingPlano.preco || 0}
                      onChange={(e) => setEditingPlano({ ...editingPlano, preco: Number(e.target.value) })}
                      className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="font-bold text-slate-400 uppercase text-[10px]">Ordem de exibição</label>
                    <input 
                      type="number" 
                      value={editingPlano.ordem || 1}
                      onChange={(e) => setEditingPlano({ ...editingPlano, ordem: Number(e.target.value) })}
                      className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                    />
                  </div>

                  <div className="flex flex-col space-y-1 sm:col-span-2">
                    <label className="font-bold text-slate-400 uppercase text-[10px]">Descrição curta (detalhes no card)</label>
                    <input 
                      type="text" 
                      value={editingPlano.descricao || ''}
                      onChange={(e) => setEditingPlano({ ...editingPlano, descricao: e.target.value })}
                      className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                      placeholder="Detalhe do roteador e Wi-Fi inteligente..."
                    />
                  </div>

                  <div className="flex flex-col space-y-1 sm:col-span-2">
                    <label className="font-bold text-slate-400 uppercase text-[10px]">Benefícios e Recursos (Vantagens do Plano)</label>
                    <div className="space-y-2">
                      {(() => {
                        const benefits = Array.isArray(editingPlano.beneficios) 
                          ? editingPlano.beneficios 
                          : typeof editingPlano.beneficios === 'string'
                            ? (editingPlano.beneficios as string).split('\n').filter(Boolean)
                            : [];
                        
                        return (
                          <>
                            {benefits.map((benefit, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <input 
                                  type="text"
                                  value={benefit}
                                  onChange={(e) => {
                                    const newBenefits = [...benefits];
                                    newBenefits[idx] = e.target.value;
                                    setEditingPlano({ ...editingPlano, beneficios: newBenefits });
                                  }}
                                  className="p-2 border rounded-xl flex-grow focus:outline-slate-400"
                                  placeholder="Ex: Wi-Fi Gigabit Incluso"
                                />
                                <button 
                                  type="button"
                                  onClick={() => {
                                    const newBenefits = benefits.filter((_, i) => i !== idx);
                                    setEditingPlano({ ...editingPlano, beneficios: newBenefits });
                                  }}
                                  className="text-red-400 hover:text-red-600 p-2"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ))}
                            <button 
                              type="button"
                              onClick={() => {
                                const newBenefits = [...benefits, ''];
                                setEditingPlano({ ...editingPlano, beneficios: newBenefits });
                              }}
                              className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:text-slate-600 text-[10px] font-bold"
                            >
                              + Incluir Novo Benefício no Plano
                            </button>
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 sm:col-span-2 pt-1 font-bold">
                    <label className="flex items-center space-x-2 text-xs text-slate-650 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={editingPlano.destaque || false}
                        onChange={(e) => setEditingPlano({ ...editingPlano, destaque: e.target.checked })}
                        className="rounded border-slate-300 accent-[#005BFF] h-4 w-4 cursor-pointer"
                      />
                      <span>Destacar como "Mais Vendido"</span>
                    </label>

                    <label className="flex items-center space-x-2 text-xs text-slate-650 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={editingPlano.ativo !== false}
                        onChange={(e) => setEditingPlano({ ...editingPlano, ativo: e.target.checked })}
                        className="rounded border-slate-300 accent-[#005BFF] h-4 w-4 cursor-pointer"
                      />
                      <span>Exibir ATIVO no site</span>
                    </label>
                  </div>
                </div>

                <div className="pt-3 border-t flex justify-end space-x-2">
                  <button type="button" onClick={() => setEditingPlano(null)} className="px-4 py-2 rounded-xl bg-slate-150 hover:bg-slate-200 text-slate-750 text-xs font-bold">Cancelar</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center space-x-1.5"><Save size={13} /><span>Salvar Plano</span></button>
                </div>
              </form>
            ) : (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6 font-semibold">
                  <div>
                    <h3 className="font-display font-black text-xs text-slate-800 uppercase tracking-wider">Planos Regulados Fibra</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">Adicione, ordene, destaque e retire do ar ofertas promocionais e empresariais.</p>
                  </div>
                  <button 
                    onClick={() => setEditingPlano({ nome: '', velocidade: '', preco: 99.90, beneficios: [], destaque: false, ativo: true, ordem: planosList.length + 1 })}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs flex items-center space-x-1.5"
                  >
                    <Plus size={14} />
                    <span>Adicionar Plano</span>
                  </button>
                </div>

                {planosList.length === 0 ? (
                  <p className="text-center py-12 text-slate-400 text-xs font-mono">Nenhum plano cadastrado ainda.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {planosList.map((plano) => (
                      <div key={plano.id} className="p-5 border rounded-2xl bg-[#F8FAFC] border-slate-200 flex flex-col justify-between hover:border-slate-350 transition-all text-xs">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-slate-900 text-sm uppercase">{plano.nome}</h4>
                            <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded font-black font-mono">{plano.velocidade}</span>
                          </div>
                          
                          <p className="text-2xl font-display font-black text-slate-900 mb-3">
                            R$ {(Number(plano.preco) || 0).toFixed(2).replace('.', ',')}
                            <span className="text-xxs text-slate-400 font-normal ml-1">/mês</span>
                          </p>

                          <div className="flex flex-wrap gap-1.5 mb-3 leading-none">
                            {plano.destaque && <span className="text-[8px] bg-[#005BFF] text-white font-black uppercase px-2 py-0.5 rounded font-mono">★ MAIS COMPRADO</span>}
                            {plano.ativo ? <span className="text-[8px] bg-emerald-50 border border-emerald-250 text-emerald-700 font-black uppercase px-2 py-0.5 rounded font-mono">✓ VIVO NO SITE</span> : <span className="text-[8px] bg-slate-100 text-slate-400 font-black uppercase px-2 py-0.5 rounded font-mono">OCULTO</span>}
                          </div>

                          <div className="border-t border-slate-200/60 pt-2.5 mb-4 text-[10px]/relaxed text-slate-500">
                            <span className="font-bold text-slate-700 block mb-1">Destaques listados:</span>
                            {plano.beneficios && plano.beneficios.slice(0, 3).map((b, i) => (
                              <p key={i} className="truncate">• {b}</p>
                            ))}
                            {plano.beneficios && plano.beneficios.length > 3 && <p className="text-[#005BFF] text-[9px] font-bold">Mais {plano.beneficios.length - 3} recursos...</p>}
                          </div>
                        </div>

                        <div className="pt-3 border-t flex justify-end space-x-2">
                          <button 
                            onClick={() => setEditingPlano(plano)}
                            className="p-1 px-2.5 rounded bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold"
                          >
                            Editar
                          </button>
                          <button 
                            onClick={() => handleDeletePlanoClick(plano.id)}
                            className="p-1 px-2.5 rounded bg-red-50 hover:bg-red-100 border border-red-100 text-red-650 font-bold"
                          >
                            Excluir
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            TAB 6: REDES SOCIAIS
            ======================================================== */}
        {activeTab === 'redes_sociais' && redesSociaisDetail && (
          <form onSubmit={handleRedesSaveSubmit} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5 animate-fade-in">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="font-display font-black text-xs text-slate-800 uppercase tracking-wider">Canais e Mídias Sociais</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Informe os links de redirecionamento para alimentar os rodapés e cabeçalhos do site.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">Instagram (Username ou Perfil completo)</label>
                <input 
                  type="text" 
                  required
                  value={redesSociaisDetail.instagram}
                  onChange={(e) => setRedesSociaisDetail({ ...redesSociaisDetail, instagram: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                  placeholder="gigatelofc"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">Facebook (Username ou Link)</label>
                <input 
                  type="text" 
                  required
                  value={redesSociaisDetail.facebook}
                  onChange={(e) => setRedesSociaisDetail({ ...redesSociaisDetail, facebook: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                  placeholder="gigatelofc"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">YouTube Canal Link</label>
                <input 
                  type="text" 
                  value={redesSociaisDetail.youtube}
                  onChange={(e) => setRedesSociaisDetail({ ...redesSociaisDetail, youtube: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                  placeholder="c/CanalGigaTel"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">TikTok Username</label>
                <input 
                  type="text" 
                  value={redesSociaisDetail.tiktok}
                  onChange={(e) => setRedesSociaisDetail({ ...redesSociaisDetail, tiktok: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                  placeholder="gigatel"
                />
              </div>

              <div className="flex flex-col space-y-1 sm:col-span-2">
                <label className="font-bold text-slate-400 uppercase text-[10px]">LinkedIn Company Link</label>
                <input 
                  type="text" 
                  value={redesSociaisDetail.linkedin}
                  onChange={(e) => setRedesSociaisDetail({ ...redesSociaisDetail, linkedin: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                  placeholder="company/gigatel-fiber"
                />
              </div>
            </div>

            <div className="pt-3 border-t flex justify-end">
              <button 
                type="submit" 
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl flex items-center space-x-1.5"
              >
                <Save size={14} />
                <span>Salvar Canais</span>
              </button>
            </div>
          </form>
        )}

        {/* ========================================================
            TAB 7: SEO E METATAGS
            ======================================================== */}
        {activeTab === 'seo' && seoConfigDetail && (
          <form onSubmit={handleSEOSaveSubmit} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5 animate-fade-in">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="font-display font-black text-xs text-slate-800 uppercase tracking-wider">Metatags de SEO para Google</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Determine como as aranhas e indexadores do Google leem as informações de título e descrição do portal.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 text-xs">
              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">Page Title (Título da Guia)</label>
                <input 
                  type="text" 
                  required
                  value={seoConfigDetail.title}
                  onChange={(e) => setSeoConfigDetail({ ...seoConfigDetail, title: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white font-semibold text-slate-800"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">Meta Description (Resumo exibido no Google)</label>
                <textarea 
                  rows={3}
                  required
                  value={seoConfigDetail.meta_description}
                  onChange={(e) => setSeoConfigDetail({ ...seoConfigDetail, meta_description: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">Palavras-Chave (Separadas por vírgula)</label>
                <input 
                  type="text" 
                  required
                  value={seoConfigDetail.keywords}
                  onChange={(e) => setSeoConfigDetail({ ...seoConfigDetail, keywords: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white font-mono"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">OpenGraph Sharing Title (Título para WhatsApp / Face compartilhado)</label>
                <input 
                  type="text" 
                  required
                  value={seoConfigDetail.open_graph_title}
                  onChange={(e) => setSeoConfigDetail({ ...seoConfigDetail, open_graph_title: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">OpenGraph Sharing Description (Descrição de compartilhamentos)</label>
                <input 
                  type="text" 
                  required
                  value={seoConfigDetail.open_graph_description}
                  onChange={(e) => setSeoConfigDetail({ ...seoConfigDetail, open_graph_description: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[10px]">Imagem de Compartilhamento URL (Sharing Image)</label>
                <input 
                  type="text" 
                  required
                  value={seoConfigDetail.imagem_compartilhamento}
                  onChange={(e) => setSeoConfigDetail({ ...seoConfigDetail, imagem_compartilhamento: e.target.value })}
                  className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white font-mono"
                />
              </div>
            </div>

            <div className="pt-3 border-t flex justify-end">
              <button 
                type="submit" 
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl flex items-center space-x-1.5"
              >
                <Save size={14} />
                <span>Salvar Meta Tags</span>
              </button>
            </div>
          </form>
        )}

        {/* ========================================================
            TAB 8: USUÁRIOS ADMIN
            ======================================================== */}
        {activeTab === 'usuarios' && (
          <div className="space-y-6 animate-fade-in">
            {editingUsuario ? (
              <form onSubmit={handleUsuarioSaveSubmit} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="pb-3 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-display font-black text-sm text-slate-800 uppercase tracking-wider">
                    {editingUsuario.id ? 'Modificar Operador' : 'Registrar Novo Operador'}
                  </h3>
                  <button type="button" onClick={() => setEditingUsuario(null)} className="text-slate-400 hover:text-slate-900">
                    <X size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="flex flex-col space-y-1">
                    <label className="font-bold text-slate-400 uppercase text-[10px]">Nome Completo</label>
                    <input 
                      type="text" 
                      required
                      value={editingUsuario.nome || ''}
                      onChange={(e) => setEditingUsuario({ ...editingUsuario, nome: e.target.value })}
                      className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                      placeholder="Ex: Pedro Henrique"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="font-bold text-slate-400 uppercase text-[10px]">E-mail de Acesso</label>
                    <input 
                      type="email" 
                      required
                      value={editingUsuario.email || ''}
                      onChange={(e) => setEditingUsuario({ ...editingUsuario, email: e.target.value })}
                      className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white font-mono"
                      placeholder="pedro@gigatel.com.br"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="font-bold text-slate-400 uppercase text-[10px]">Nível Hierárquico</label>
                    <select 
                      value={editingUsuario.nivel || 'Editor'}
                      onChange={(e) => setEditingUsuario({ ...editingUsuario, nivel: e.target.value as 'Administrador' | 'Editor' })}
                      className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                    >
                      <option value="Administrador">Administrador</option>
                      <option value="Editor">Editor</option>
                    </select>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="font-bold text-slate-400 uppercase text-[10px]">Status Geral</label>
                    <select 
                      value={editingUsuario.status || 'ativo'}
                      onChange={(e) => setEditingUsuario({ ...editingUsuario, status: e.target.value as 'ativo' | 'inativo' })}
                      className="p-2.5 border rounded-xl focus:outline-slate-400 bg-white"
                    >
                      <option value="ativo">Conta Ativa / Concedida</option>
                      <option value="inativo">Bloqueado / Expirado</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3 border-t flex justify-end space-x-2">
                  <button type="button" onClick={() => setEditingUsuario(null)} className="px-4 py-2 rounded-xl bg-slate-150 hover:bg-slate-200 text-slate-750 text-xs font-bold">Cancelar</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center space-x-1.5"><Save size={13} /><span>Autorizar Acesso</span></button>
                </div>
              </form>
            ) : (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6 font-semibold">
                  <div>
                    <h3 className="font-display font-black text-xs text-slate-800 uppercase tracking-wider">Usuários Operadores</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">Listagem das contas do provedor autorizadas a mexer neste portal.</p>
                  </div>
                  <button 
                    onClick={() => setEditingUsuario({ nome: '', email: '', nivel: 'Editor', status: 'ativo', perfil: 'colaborador' })}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs flex items-center space-x-1.5"
                  >
                    <Plus size={14} />
                    <span>Adicionar Usuário</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {usuariosList.map((usuario) => (
                    <div key={usuario.id} className="p-3 border rounded-xl flex justify-between items-center bg-[#F8FAFC] border-slate-185 text-xs gap-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-800 text-md">{usuario.nome}</span>
                          <span className="text-[8px] bg-slate-200 text-slate-600 font-extrabold uppercase px-1.5 py-0.5 rounded tracking-wide font-mono">{usuario.nivel || 'Editor'}</span>
                        </div>
                        <span className="text-slate-500 font-mono tracking-wide mt-1 block font-semibold">{usuario.email}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => setEditingUsuario(usuario)}
                          className="px-2 py-1 bg-white hover:bg-slate-50 border rounded text-[10px] font-bold"
                        >
                          Editar
                        </button>
                        <button 
                          onClick={() => handleDeleteUsuarioClick(usuario.id)}
                          className="px-2 py-1 text-red-600 hover:text-red-850 text-[10px] font-semibold"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            TAB 9: CONFIGURAÇÕES - GERENCIADOR DE MÍDIA
            ======================================================== */}
        {activeTab === 'configuracoes' && (
          <div className="space-y-6 animate-fade-in">
            {/* Upload form block */}
            <form onSubmit={handleMediaUploadSubmit} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="font-display font-black text-xs text-slate-800 uppercase tracking-wider">Fazer Upload de Nova Mídia</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Carregue arquivos diretamente ao bucket de uploads do Supabase.</p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-3 text-xs">
                <input 
                  type="file" 
                  id="media-uploader-input"
                  required
                  accept="image/*,video/*,.pdf"
                  onChange={(e) => setMediaFile(e.target.files?.[0] || null)}
                  className="p-2 border rounded-xl flex-grow bg-slate-50 cursor-pointer text-slate-650"
                />
                <button 
                  type="submit" 
                  disabled={uploadLoading}
                  className="px-6 py-3 bg-[#005BFF] hover:bg-[#004ccb] text-white font-bold rounded-xl flex items-center space-x-1 shrink-0 disabled:opacity-50"
                >
                  {uploadLoading ? (
                    <span className="animate-pulse">Enviando...</span>
                  ) : (
                    <>
                      <Upload size={14} />
                      <span>Upload de Mídia</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Upload grid section */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <span className="font-display font-black text-xs text-slate-800 uppercase block mb-4 pb-2 border-b">Galeria de Mídias Cadastradas</span>

              {uploadsList.length === 0 ? (
                <p className="text-center py-12 text-slate-400 text-xs font-mono">Nenhuma imagem ou logo carregada no momento.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {uploadsList.map((media) => (
                    <div key={media.id} className="p-3 border.5 border rounded-2xl bg-[#F8FAFC] border-slate-200 text-xs flex flex-col justify-between hover:border-slate-300">
                      <div>
                        <div className="h-28 rounded-lg overflow-hidden border bg-white flex items-center justify-center relative group">
                          {media.url && <img src={media.url} alt={media.nome} className="max-h-full max-w-full object-contain" referrerPolicy="no-referrer" />}
                          <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                            <a href={media.url} target="_blank" rel="noopener noreferrer" className="p-1 px-2.5 bg-white text-slate-900 font-bold hover:bg-slate-200 rounded text-[10px]">Ver original</a>
                          </div>
                        </div>

                        <p className="font-bold text-slate-805 mt-2 truncate text-slate-800" title={media.nome}>{media.nome}</p>
                        <span className="text-[10px] text-slate-450 text-slate-400 block mt-1 tracking-wide font-mono font-semibold">{media.tamanho} • {media.tipo}</span>
                      </div>

                      <div className="pt-3 mt-3 border-t flex justify-between items-center gap-1">
                        <button 
                          onClick={() => handleCopyLinkToClipboard(media.url)}
                          className="p-1 px-2 rounded bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-[10px] flex items-center space-x-1"
                        >
                          <Copy size={11} />
                          <span>Copiar Link</span>
                        </button>
                        <button 
                          onClick={() => handleDeleteUploadClick(media.id)}
                          className="p-1 px-2 text-red-622 font-bold text-red-650 hover:text-red-800 text-[10px]"
                        >
                          Deletar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
