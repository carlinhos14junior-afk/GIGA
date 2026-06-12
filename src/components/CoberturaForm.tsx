import React, { useState } from 'react';
import { MapPin, Search, Send, CheckCircle2, Phone, User, Mail, ShieldAlert, Sparkles, Navigation } from 'lucide-react';
import { saveLead } from '../lib/supabase';

export default function CoberturaForm() {
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    email: '',
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    plano_interesse: 'Não especificado',
    observacoes: 'Origem: Consulta de Cobertura'
  });

  const [loading, setLoading] = useState(false);
  const [searchingCep, setSearchingCep] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const cidadesAtendidas = [
    { nome: 'São Paulo', regiao: 'Grande SP', signal: '100% FTTH' },
    { nome: 'Santo André', regiao: 'ABC Paulista', signal: '100% FTTH' },
    { nome: 'São Bernardo', regiao: 'ABC Paulista', signal: '100% FTTH' },
    { nome: 'Diadema', regiao: 'ABC Paulista', signal: '100% FTTH' },
    { nome: 'Mauá', regiao: 'Grande SP', signal: '98% FTTH' },
    { nome: 'Ribeirão Pires', regiao: 'Grande SP', signal: '95% FTTH' }
  ];

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'whatsapp') {
      const numeric = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [name]: numeric }));
    } 
    else if (name === 'cep') {
      const cleaned = value.replace(/\D/g, '').substring(0, 8);
      setFormData(prev => ({ ...prev, [name]: cleaned }));

      if (cleaned.length === 8) {
        fetchAddress(cleaned);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Auto ViaCEP Fetcher
  const fetchAddress = async (cepVal: string) => {
    setSearchingCep(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepVal}/json/`);
      const data = await res.json();
      if (!data.erro && data.logradouro) {
        setFormData(prev => ({
          ...prev,
          rua: data.logradouro || '',
          bairro: data.bairro || '',
        }));
        setErrorMsg('');
      } else if (data.erro) {
        setErrorMsg('CEP não localizado. Por favor, digite o endereço manualmente.');
      }
    } catch (e) {
      console.warn('ViaCEP API offline, manual input is active.');
    } finally {
      setSearchingCep(false);
    }
  };

  // Submit Lead Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.whatsapp || !formData.cep || !formData.rua || !formData.numero || !formData.bairro) {
      setErrorMsg('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const enderecoCompleto = `${formData.rua}, Nº ${formData.numero} - ${formData.bairro}`;

    try {
      await saveLead({
        nome: formData.nome,
        whatsapp: formData.whatsapp,
        email: formData.email || 'Não informado',
        cep: formData.cep,
        endereco: enderecoCompleto,
        plano_interesse: formData.plano_interesse,
        observacoes: formData.observacoes,
        status: 'novo',
      });
      
      setSubmitted(true);
      // Reset
      setFormData({
        nome: '',
        whatsapp: '',
        email: '',
        cep: '',
        rua: '',
        numero: '',
        bairro: '',
        plano_interesse: 'Não especificado',
        observacoes: 'Origem: Consulta de Cobertura'
      });
    } catch (e) {
      setErrorMsg('Ocorreu um erro ao processar. Por favor, tente novamente!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      id="cobertura" 
      className="relative py-28 bg-[#030712] overflow-hidden text-white border-b border-white/5"
    >
      {/* Dynamic fiber-optic glow backgrounds */}
      <div className="absolute top-1/3 right-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle_at_center,#005BFF/12,-transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-15%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,#00D4FF/10,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Stylized map & Cover cities */}
          <div className="lg:col-span-6 flex flex-col space-y-8">
            <div className="inline-flex items-center space-x-2 bg-[#005BFF]/10 border border-[#005BFF]/30 px-4 py-1.5 rounded-full text-[#00D4FF] font-black text-xs uppercase self-start tracking-widest">
              <MapPin size={13} className="text-[#00D4FF]" />
              <span>Planalto e Cobertura</span>
            </div>

            <div>
              <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tighter leading-none uppercase">
                COBERTURA DE REDE <br />
                <span className="bg-gradient-to-r from-[#005BFF] via-[#00AEEF] to-[#00D4FF] bg-clip-text text-transparent font-extrabold">
                  FIBRA ESTRUTURADA
                </span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4 font-medium">
                Nossa rede de ultra performance opera com cabos de fibra óptica de ponta a ponta (FTTH). Veja as cidades da Grande SP e ABC Paulista 100% cobertas:
              </p>
            </div>

            {/* Stylized Modern Interactive Cyber Map Mockup */}
            <div className="relative rounded-2xl bg-slate-900/60 border border-white/5 p-6 overflow-hidden min-h-[220px] flex flex-col justify-between">
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#005BFF_1.5px,transparent_1.5px)] bg-[size:16px_16px]" />
              
              {/* Connected Nodes Map Paths */}
              <div className="absolute inset-0 opacity-40 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 400 200" fill="none">
                  {/* Neon lines connecting cities coordinates */}
                  <path d="M50,80 L120,40 L190,140 L280,60 L350,110" stroke="url(#map-glow-grad)" strokeWidth="2.5" strokeDasharray="5 4" className="animate-pulse" />
                  <path d="M120,40 L280,60 M190,140 L350,110" stroke="#00D4FF" strokeWidth="1" opacity="0.6" />
                  
                  {/* Pulsing light rings around cities */}
                  <circle cx="50" cy="80" r="6" fill="#005BFF" />
                  <circle cx="50" cy="80" r="14" stroke="#005BFF" strokeWidth="1" className="animate-ping" style={{ animationDuration: '3s' }} />

                  <circle cx="120" cy="40" r="6" fill="#00D4FF" />
                  <circle cx="120" cy="40" r="14" stroke="#00D4FF" strokeWidth="1" className="animate-ping" style={{ animationDuration: '2.5s' }} />

                  <circle cx="190" cy="140" r="6" fill="#00AEEF" />
                  <circle cx="190" cy="140" r="14" stroke="#00AEEF" strokeWidth="1" className="animate-ping" style={{ animationDuration: '4s' }} />

                  <circle cx="280" cy="60" r="6" fill="#00D4FF" />
                  <circle cx="280" cy="60" r="14" stroke="#00D4FF" strokeWidth="1" className="animate-ping" style={{ animationDuration: '2s' }} />

                  <circle cx="350" cy="110" r="6" fill="#005BFF" />
                  <circle cx="350" cy="110" r="14" stroke="#005BFF" strokeWidth="1" className="animate-ping" style={{ animationDuration: '3.5s' }} />

                  <defs>
                    <linearGradient id="map-glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#005BFF" />
                      <stop offset="50%" stopColor="#00AEEF" />
                      <stop offset="100%" stopColor="#00D4FF" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Floating indicators labels inside map mockup */}
              <div className="relative z-10 flex justify-between items-center pb-2">
                <span className="text-[10px] font-bold tracking-widest text-[#00D4FF]/80 uppercase font-mono">GIGATEL FIBER MAP • DISPONIVEL</span>
                <span className="flex items-center text-[9px] font-black text-emerald-400 uppercase tracking-widest">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mr-1.5 animate-ping"></span> REDE ATIVA
                </span>
              </div>

              {/* Grid of the covered cities labels */}
              <div className="relative z-10 grid grid-cols-2 gap-3 pt-12">
                {cidadesAtendidas.map((cidade, i) => (
                  <div key={i} className="flex items-center space-x-2 bg-slate-950/70 border border-white/5 rounded-xl px-3.5 py-2.5 transition-all hover:bg-[#005BFF]/10 hover:border-[#00D4FF]/20">
                    <Navigation size={12} className="text-[#00D4FF] rotate-45 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-white leading-none">{cidade.nome}</h4>
                      <span className="text-[9px] text-[#00AEEF] font-bold tracking-tight uppercase block mt-1">{cidade.signal} • {cidade.regiao}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Premium Tech Cyan Form Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl bg-slate-900 border border-white/10 p-6 sm:p-10 shadow-2xl overflow-hidden group">
              {/* Highlight background elements inside form wrapper */}
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#005BFF] via-[#00AEEF] to-[#00D4FF]" />
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#005BFF]/5 rounded-full filter blur-3xl pointer-events-none" />

              {submitted ? (
                // Success State View
                <div className="relative z-10 text-center py-10 px-4 flex flex-col items-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-[#005BFF]/10 flex items-center justify-center text-white border border-[#00D4FF]/30 shadow-md">
                    <CheckCircle2 size={36} className="text-[#00D4FF]" />
                  </div>
                  
                  <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                    Solicitação Recebida!
                  </h3>
                  
                  <p className="text-slate-300 text-xs sm:text-sm max-w-sm leading-relaxed font-semibold">
                    Registramos seu interesse com sucesso no sistema. Um de nossos analistas de rede da GIGATEL FIBER ligará ou enviará mensagem no seu WhatsApp em instantes! Hospe-se na velocidade!
                  </p>
                  
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-7 py-3 rounded-xl bg-gradient-to-r from-[#005BFF] to-[#00D4FF] hover:opacity-90 font-extrabold text-xs uppercase tracking-widest text-white transition-all duration-200"
                  >
                    Consultar Outro Local
                  </button>
                </div>
              ) : (
                // Form Fields View
                <form id="cobertura-lead-form" onSubmit={handleSubmit} className="relative z-10 space-y-5">
                  <div className="pb-3 border-b border-white/5 text-center sm:text-left">
                    <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">VERIFIQUE SUA DISPONIBILIDADE</h3>
                    <p className="text-[10px] sm:text-xs text-[#00AEEF] font-bold uppercase tracking-wider mt-1">Garantimos resposta imediata via WhatsApp</p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-red-650/90 text-white rounded-lg text-xs font-bold border border-red-500/50 animate-bounce">
                      {errorMsg}
                    </div>
                  )}

                  {/* Input Split Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Nome */}
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="nome" className="text-[9px] font-black text-slate-400 uppercase tracking-widest">NOME COMPLETO *</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                          <User size={14} />
                        </span>
                        <input
                          id="nome"
                          type="text"
                          name="nome"
                          value={formData.nome}
                          onChange={handleChange}
                          placeholder="Ex: Carlos Silva"
                          required
                          className="w-full bg-slate-950/60 border border-white/10 focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] focus:outline-none rounded-xl py-3.5 pl-10 pr-4 text-xs font-semibold text-white placeholder-slate-550 transition-all font-medium"
                        />
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="whatsapp" className="text-[9px] font-black text-slate-400 uppercase tracking-widest">WHATSAPP COM DDD *</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                          <Phone size={14} />
                        </span>
                        <input
                          id="whatsapp"
                          type="tel"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleChange}
                          placeholder="DDD + Número (ex: 11910050121)"
                          required
                          className="w-full bg-slate-950/60 border border-white/10 focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] focus:outline-none rounded-xl py-3.5 pl-10 pr-4 text-xs font-semibold text-white placeholder-slate-550 transition-all font-medium"
                        />
                      </div>
                    </div>

                    {/* E-mail */}
                    <div className="flex flex-col space-y-1 sm:col-span-2">
                      <label htmlFor="email" className="text-[9px] font-black text-slate-400 uppercase tracking-widest">SEU E-MAIL PARA CONTATO (OPCIONAL)</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                          <Mail size={14} />
                        </span>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Ex: carlossilva@provedor.com"
                          className="w-full bg-slate-950/60 border border-white/10 focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] focus:outline-none rounded-xl py-3.5 pl-10 pr-4 text-xs font-semibold text-white placeholder-slate-550 transition-all font-medium"
                        />
                      </div>
                    </div>

                    {/* CEP */}
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="cep" className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
                        <span>CEP DO ENDEREÇO *</span>
                        {searchingCep && <span className="text-[9px] text-[#00D4FF] font-extrabold animate-pulse">BUSCANDO...</span>}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                          <Search size={14} />
                        </span>
                        <input
                          id="cep"
                          type="text"
                          name="cep"
                          value={formData.cep}
                          onChange={handleChange}
                          placeholder="Ex: 03910070"
                          maxLength={8}
                          required
                          className="w-full bg-slate-950/60 border border-white/10 focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] focus:outline-none rounded-xl py-3.5 pl-10 pr-4 text-xs font-semibold text-white placeholder-slate-550 transition-all font-medium"
                        />
                      </div>
                    </div>

                    {/* Bairro */}
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="bairro" className="text-[9px] font-black text-slate-400 uppercase tracking-widest">BAIRRO *</label>
                      <input
                        id="bairro"
                        type="text"
                        name="bairro"
                        value={formData.bairro}
                        onChange={handleChange}
                        placeholder="Ex: Jardim Catarina"
                        required
                        className="w-full bg-slate-950/60 border border-white/10 focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] focus:outline-none rounded-xl py-3.5 px-4 text-xs font-semibold text-white placeholder-slate-550 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Rua (Street) */}
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="rua" className="text-[9px] font-black text-slate-400 uppercase tracking-widest">RUA / LOGRADOURO *</label>
                    <input
                      id="rua"
                      type="text"
                      name="rua"
                      value={formData.rua}
                      onChange={handleChange}
                      placeholder="Ex: Rua Antônio Ferraciolli"
                      required
                      className="w-full bg-slate-950/60 border border-white/10 focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] focus:outline-none rounded-xl py-3.5 px-4 text-xs font-semibold text-white placeholder-slate-550 transition-all font-medium"
                    />
                  </div>

                  {/* Número */}
                  <div className="flex flex-col space-y-1 w-full sm:w-1/2">
                    <label htmlFor="numero" className="text-[9px] font-black text-slate-400 uppercase tracking-widest">NÚMERO / AP / BLOCO *</label>
                    <input
                      id="numero"
                      type="text"
                      name="numero"
                      value={formData.numero}
                      onChange={handleChange}
                      placeholder="Ex: 331"
                      required
                      className="w-full bg-slate-950/60 border border-white/10 focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] focus:outline-none rounded-xl py-3.5 px-4 text-xs font-semibold text-white placeholder-slate-550 transition-all font-medium"
                    />
                  </div>

                  {/* Plano Interesse Selector */}
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="plano_interesse" className="text-[9px] font-black text-slate-400 uppercase tracking-widest">PLANO DE INTERESSE</label>
                    <select
                      id="plano_interesse"
                      name="plano_interesse"
                      value={formData.plano_interesse}
                      onChange={handleChange}
                      className="w-full bg-slate-950/60 border border-white/10 focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] focus:outline-none rounded-xl py-3.5 px-4 text-xs font-bold text-white transition-all cursor-pointer font-medium"
                    >
                      <option value="Não especificado">Selecione um plano (opcional)</option>
                      <option value="Plano 500 Mega">Plano GIGATEL 500 MEGA - R$ 99,90</option>
                      <option value="Plano 1 Giga">Plano GIGATEL GIGA BLACK (1 Giga) - R$ 149,90</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button
                    id="submit-cobertura-btn"
                    type="submit"
                    disabled={loading}
                    className="w-full py-4.5 bg-gradient-to-r from-[#005BFF] to-[#00D4FF] hover:brightness-110 text-white font-extrabold uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2.5 cursor-pointer"
                  >
                    <span>{loading ? 'CONECTANDO CENTRAL...' : 'CONSULTAR DISPONIBILIDADE'}</span>
                    <Send size={13} />
                  </button>

                  <p className="text-[9px] text-center text-slate-450 leading-relaxed font-semibold">
                    * Ao clicar em consultar, seus dados são armazenados com criptografia e utilizados de forma restrita sob autorização da LGPD para fins de viabilidade técnica.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
