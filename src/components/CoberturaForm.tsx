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
      className="relative py-28 bg-slate-50 overflow-hidden text-slate-800 border-b border-slate-150"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Stylized map & Cover cities */}
          <div className="lg:col-span-6 flex flex-col space-y-8">
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full text-[#005BFF] font-black text-xs uppercase self-start tracking-widest">
              <MapPin size={13} className="text-[#005BFF]" />
              <span>Planalto e Cobertura</span>
            </div>

            <div>
              <h2 className="font-display font-black text-4xl sm:text-5xl text-slate-900 tracking-tighter leading-none uppercase">
                COBERTURA DE REDE <br />
                <span className="text-[#005BFF] font-extrabold bg-gradient-to-r from-[#005BFF] to-[#0188FF] bg-clip-text text-transparent">
                  FIBRA ESTRUTURADA
                </span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-4 font-medium">
                Nossa rede de ultra performance opera com cabos de fibra óptica de ponta a ponta (FTTH). Veja as cidades da Grande SP e ABC Paulista 100% cobertas:
              </p>
            </div>

            {/* Stylized Modern Interactive Cyber Map Mockup */}
            <div className="relative rounded-2xl bg-white border border-slate-200 p-6 overflow-hidden min-h-[220px] flex flex-col justify-between shadow-sm">
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#005BFF_1.5px,transparent_1.5px)] bg-[size:16px_16px]" />
              
              {/* Connected Nodes Map Paths */}
              <div className="absolute inset-0 opacity-40 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 400 200" fill="none">
                  {/* Neon lines connecting cities coordinates */}
                  <path d="M50,80 L120,40 L190,140 L280,60 L350,110" stroke="url(#map-glow-grad)" strokeWidth="2.5" strokeDasharray="5 4" className="animate-pulse" />
                  <path d="M120,40 L280,60 M190,140 L350,110" stroke="#005BFF" strokeWidth="1" opacity="0.4" />
                  
                  {/* Pulsing light rings around cities */}
                  <circle cx="50" cy="80" r="6" fill="#005BFF" />
                  <circle cx="50" cy="80" r="14" stroke="#005BFF" strokeWidth="1" className="animate-ping" style={{ animationDuration: '3s' }} />

                  <circle cx="120" cy="40" r="6" fill="#005BFF" />
                  <circle cx="120" cy="40" r="14" stroke="#005BFF" strokeWidth="1" className="animate-ping" style={{ animationDuration: '2.5s' }} />

                  <circle cx="190" cy="140" r="6" fill="#005BFF" />
                  <circle cx="190" cy="140" r="14" stroke="#005BFF" strokeWidth="1" className="animate-ping" style={{ animationDuration: '4s' }} />

                  <circle cx="280" cy="60" r="6" fill="#005BFF" />
                  <circle cx="280" cy="60" r="14" stroke="#005BFF" strokeWidth="1" className="animate-ping" style={{ animationDuration: '2s' }} />

                  <circle cx="350" cy="110" r="6" fill="#005BFF" />
                  <circle cx="350" cy="110" r="14" stroke="#005BFF" strokeWidth="1" className="animate-ping" style={{ animationDuration: '3.5s' }} />

                  <defs>
                    <linearGradient id="map-glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#005BFF" />
                      <stop offset="100%" stopColor="#00AEEF" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Floating indicators labels inside map mockup */}
              <div className="relative z-10 flex justify-between items-center pb-2">
                <span className="text-[10px] font-bold tracking-widest text-[#005BFF] uppercase font-mono">GIGATEL FIBER MAP • DISPONÍVEL</span>
                <span className="flex items-center text-[9px] font-black text-[#005BFF] uppercase tracking-widest">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#005BFF] mr-1.5 animate-ping"></span> REDE ATIVA
                </span>
              </div>

              {/* Grid of the covered cities labels */}
              <div className="relative z-10 grid grid-cols-2 gap-3 pt-12">
                {cidadesAtendidas.map((cidade, i) => (
                  <div key={i} className="flex items-center space-x-2 bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2.5 transition-all hover:bg-blue-50/80 hover:border-blue-200">
                    <Navigation size={12} className="text-[#005BFF] rotate-45 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 leading-none">{cidade.nome}</h4>
                      <span className="text-[9px] text-slate-500 font-bold tracking-tight uppercase block mt-1">{cidade.signal} • {cidade.regiao}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Premium Light Form Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-xl overflow-hidden group">
              {/* Highlight blue line at the top */}
              <div className="absolute inset-x-0 top-0 h-[4px] bg-[#005BFF]" />

              {submitted ? (
                // Success State View
                <div className="relative z-10 text-center py-10 px-4 flex flex-col items-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-[#005BFF] border border-blue-100 shadow-sm">
                    <CheckCircle2 size={36} className="text-[#005BFF]" />
                  </div>
                  
                  <h3 className="font-display font-black text-2xl text-slate-900 uppercase tracking-tight">
                    Solicitação Recebida!
                  </h3>
                  
                  <p className="text-slate-600 text-xs sm:text-sm max-w-sm leading-relaxed font-semibold">
                    Registramos seu interesse com sucesso no sistema. Um de nossos analistas de rede da GIGATEL FIBER ligará ou enviará mensagem no seu WhatsApp em instantes! Hospe-se na velocidade!
                  </p>
                  
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-7 py-3 rounded-xl bg-[#005BFF] hover:bg-[#004ccb] font-extrabold text-xs uppercase tracking-widest text-white transition-all duration-200"
                  >
                    Consultar Outro Local
                  </button>
                </div>
              ) : (
                // Form Fields View
                <form id="cobertura-lead-form" onSubmit={handleSubmit} className="relative z-10 space-y-5">
                  <div className="pb-3 border-b border-slate-100 text-center sm:text-left">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">VERIFIQUE SUA DISPONIBILIDADE</h3>
                    <p className="text-[10px] sm:text-xs text-[#005BFF] font-black uppercase tracking-wider mt-1">Garantimos resposta imediata via WhatsApp</p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-red-50 text-red-650 rounded-lg text-xs font-bold border border-red-200 animate-bounce">
                      {errorMsg}
                    </div>
                  )}

                  {/* Input Split Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Nome */}
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="nome" className="text-[9px] font-black text-slate-500 uppercase tracking-widest">NOME COMPLETO *</label>
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
                          className="w-full bg-slate-50 border border-slate-200 focus:border-[#005BFF] focus:ring-1 focus:ring-[#005BFF] focus:outline-none rounded-xl py-3 pl-10 pr-4 text-xs font-semibold text-slate-800 placeholder-slate-400 transition-all"
                        />
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="whatsapp" className="text-[9px] font-black text-slate-500 uppercase tracking-widest">WHATSAPP COM DDD *</label>
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
                          placeholder="Ex: 11910050121"
                          required
                          className="w-full bg-slate-50 border border-slate-200 focus:border-[#005BFF] focus:ring-1 focus:ring-[#005BFF] focus:outline-none rounded-xl py-3 pl-10 pr-4 text-xs font-semibold text-slate-800 placeholder-slate-400 transition-all font-medium"
                        />
                      </div>
                    </div>

                    {/* E-mail */}
                    <div className="flex flex-col space-y-1 sm:col-span-2">
                      <label htmlFor="email" className="text-[9px] font-black text-slate-500 uppercase tracking-widest">SEU E-MAIL PARA CONTATO (OPCIONAL)</label>
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
                          className="w-full bg-slate-50 border border-slate-200 focus:border-[#005BFF] focus:ring-1 focus:ring-[#005BFF] focus:outline-none rounded-xl py-3 pl-10 pr-4 text-xs font-semibold text-slate-800 placeholder-slate-400 transition-all"
                        />
                      </div>
                    </div>

                    {/* CEP */}
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="cep" className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center justify-between">
                        <span>CEP DO ENDEREÇO *</span>
                        {searchingCep && <span className="text-[9px] text-[#005BFF] font-extrabold animate-pulse">BUSCANDO...</span>}
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
                          className="w-full bg-slate-50 border border-slate-200 focus:border-[#005BFF] focus:ring-1 focus:ring-[#005BFF] focus:outline-none rounded-xl py-3 pl-10 pr-4 text-xs font-semibold text-slate-800 placeholder-slate-400 transition-all"
                        />
                      </div>
                    </div>

                    {/* Bairro */}
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="bairro" className="text-[9px] font-black text-slate-500 uppercase tracking-widest">BAIRRO *</label>
                      <input
                        id="bairro"
                        type="text"
                        name="bairro"
                        value={formData.bairro}
                        onChange={handleChange}
                        placeholder="Ex: Jardim Catarina"
                        required
                        className="w-full bg-slate-50 border border-slate-200 focus:border-[#005BFF] focus:ring-1 focus:ring-[#005BFF] focus:outline-none rounded-xl py-3 px-4 text-xs font-semibold text-slate-800 placeholder-slate-400 transition-all"
                      />
                    </div>
                  </div>

                  {/* Rua (Street) */}
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="rua" className="text-[9px] font-black text-slate-500 uppercase tracking-widest">RUA / LOGRADOURO *</label>
                    <input
                      id="rua"
                      type="text"
                      name="rua"
                      value={formData.rua}
                      onChange={handleChange}
                      placeholder="Ex: Rua Antônio Ferraciolli"
                      required
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#005BFF] focus:ring-1 focus:ring-[#005BFF] focus:outline-none rounded-xl py-3 px-4 text-xs font-semibold text-slate-800 placeholder-slate-400 transition-all"
                    />
                  </div>

                  {/* Número */}
                  <div className="flex flex-col space-y-1 w-full sm:w-1/2">
                    <label htmlFor="numero" className="text-[9px] font-black text-slate-500 uppercase tracking-widest">NÚMERO / AP / BLOCO *</label>
                    <input
                      id="numero"
                      type="text"
                      name="numero"
                      value={formData.numero}
                      onChange={handleChange}
                      placeholder="Ex: 331"
                      required
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#005BFF] focus:ring-1 focus:ring-[#005BFF] focus:outline-none rounded-xl py-3 px-4 text-xs font-semibold text-slate-800 placeholder-slate-400 transition-all"
                    />
                  </div>

                  {/* Plano Interesse Selector */}
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="plano_interesse" className="text-[9px] font-black text-slate-500 uppercase tracking-widest">PLANO DE INTERESSE</label>
                    <select
                      id="plano_interesse"
                      name="plano_interesse"
                      value={formData.plano_interesse}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#005BFF] focus:ring-1 focus:ring-[#005BFF] focus:outline-none rounded-xl py-3 px-4 text-xs font-bold text-slate-700 transition-all cursor-pointer"
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
                    className="w-full py-4 bg-[#005BFF] hover:bg-[#004ccb] text-white font-extrabold uppercase tracking-widest text-xs rounded-xl shadow-md transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2.5 cursor-pointer text-white"
                  >
                    <span>{loading ? 'CONECTANDO CENTRAL...' : 'CONSULTAR DISPONIBILIDADE'}</span>
                    <Send size={13} />
                  </button>

                  <p className="text-[9px] text-center text-slate-400 leading-relaxed font-semibold">
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
