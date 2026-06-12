import React, { useState } from 'react';
import { MapPin, Search, Send, CheckCircle2, Phone, User, Mail } from 'lucide-react';
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

      // Auto ViaCEP lookup
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

    // Concatenate address for Supabase Tabela
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
    <section id="cobertura" className="relative py-20 bg-white border-b border-slate-205">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: value statement */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="inline-flex items-center space-x-1.5 bg-red-50 border border-red-100 px-4 py-1.5 rounded-full text-[#E30613] font-bold text-xs uppercase self-start tracking-wider">
              <MapPin size={12} className="text-[#E30613]" />
              <span>CONSULTE COBERTURA</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#0A2F8F] tracking-tighter leading-tight uppercase">
              CONSULTE A DISPONIBILIDADE <span className="text-[#E30613]">DO SINAL NA SUA PORTA</span>!
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              Informe seu CEP e endereço no formulário ao lado. Nosso sistema mapeia as caixas de atendimento ativas e nosso time entrará em contato para liberar sua instalação rápida sem custos.
            </p>

            {/* Quick Benefits List */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-brand-gray-light text-[#0A2F8F] mt-0.5">
                  <CheckCircle2 size={16} className="text-[#E30613]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-tight">Análise Imediata de CEP</h4>
                  <p className="text-xs text-slate-500 font-medium">Consulta automatizada que confere postes e caixas físicas próximas.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-brand-gray-light text-[#0A2F8F] mt-0.5">
                  <CheckCircle2 size={16} className="text-[#E30613]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-tight">Suporte 100% no WhatsApp</h4>
                  <p className="text-xs text-slate-500 font-medium">Retorno rápido e agendamento da melhor data para instalação na sua porta.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-brand-gray-light text-[#0A2F8F] mt-0.5">
                  <CheckCircle2 size={16} className="text-[#E30613]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-tight">Isenção de Adesão e Configuração</h4>
                  <p className="text-xs text-slate-500 font-medium">Consulte e garanta a instalação gratuita com roteador Wi-Fi inteligente incluso.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Royal Blue Form Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-[#0A2F8F] p-6 sm:p-10 shadow-xl overflow-hidden">
              {/* Highlight background elements */}
              <div className="absolute top-[-20%] right-[-20%] w-[50%] h-[50%] bg-[#E30613]/10 rounded-full filter blur-xl" />
              <div className="absolute bottom-[-10%] left-[-10%] w-[35%] h-[35%] bg-blue-500/10 rounded-full filter blur-xl" />

              {submitted ? (
                // Success State View
                <div className="relative z-10 text-center py-10 px-4 flex flex-col items-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white shadow-md">
                    <CheckCircle2 size={36} className="text-[#00A8FF]" />
                  </div>
                  
                  <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                    Solicitação Recebida!
                  </h3>
                  
                  <p className="text-white/80 text-xs sm:text-sm max-w-md leading-relaxed font-semibold">
                    Registramos seu interesse com sucesso no sistema. Um de nossos analistas de rede da GIGATEL FIBER ligará ou enviará mensagem no seu WhatsApp em instantes! Hospe-se na velocidade!
                  </p>
                  
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-7 py-3 rounded-lg bg-white hover:bg-slate-50 font-bold text-xs uppercase tracking-wider text-[#0A2F8F] transition-all duration-200"
                  >
                    Consultar Outro Local
                  </button>
                </div>
              ) : (
                // Form Fields View
                <form id="cobertura-lead-form" onSubmit={handleSubmit} className="relative z-10 space-y-5">
                  <div className="pb-3 border-b border-white/10 text-center sm:text-left">
                    <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">VERIFIQUE SUA COBERTURA AGORA</h3>
                    <p className="text-[10px] sm:text-xs text-white/70 font-semibold mt-1">Insira as informações abaixo e receba resposta agilizada no WhatsApp.</p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-red-650/90 text-white rounded-lg text-xs font-bold border border-red-500/50">
                      {errorMsg}
                    </div>
                  )}

                  {/* Input Split Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Nome */}
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="nome" className="text-[10px] font-bold text-white/80 uppercase tracking-widest">NOME COMPLETO *</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                          <User size={15} />
                        </span>
                        <input
                          id="nome"
                          type="text"
                          name="nome"
                          value={formData.nome}
                          onChange={handleChange}
                          placeholder="Ex: Carlos Silva"
                          required
                          className="w-full bg-white border border-slate-205 focus:ring-2 focus:ring-[#00A8FF] focus:outline-none rounded-lg py-3.5 pl-9 pr-4 text-xs font-semibold text-slate-800 placeholder-slate-400 transition-all font-medium"
                        />
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="whatsapp" className="text-[10px] font-bold text-white/80 uppercase tracking-widest">WHATSAPP COM DDD *</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                          <Phone size={15} />
                        </span>
                        <input
                          id="whatsapp"
                          type="tel"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleChange}
                          placeholder="DDD + Número (ex: 62999991234)"
                          required
                          className="w-full bg-white border border-slate-205 focus:ring-2 focus:ring-[#00A8FF] focus:outline-none rounded-lg py-3.5 pl-9 pr-4 text-xs font-semibold text-slate-800 placeholder-slate-400 transition-all font-medium"
                        />
                      </div>
                    </div>

                    {/* E-mail */}
                    <div className="flex flex-col space-y-1 sm:col-span-2">
                      <label htmlFor="email" className="text-[10px] font-bold text-white/80 uppercase tracking-widest">SEU E-MAIL PARA CONTATO (OPCIONAL)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                          <Mail size={15} />
                        </span>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Ex: carlossilva@provedor.com"
                          className="w-full bg-white border border-slate-205 focus:ring-2 focus:ring-[#00A8FF] focus:outline-none rounded-lg py-3.5 pl-9 pr-4 text-xs font-semibold text-slate-800 placeholder-slate-400 transition-all font-medium"
                        />
                      </div>
                    </div>

                    {/* CEP */}
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="cep" className="text-[10px] font-bold text-white/80 uppercase tracking-widest flex items-center justify-between">
                        <span>CEP DO ENDEREÇO *</span>
                        {searchingCep && <span className="text-[9px] text-[#00A8FF] font-extrabold animate-pulse">BUSCANDO...</span>}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                          <Search size={15} />
                        </span>
                        <input
                          id="cep"
                          type="text"
                          name="cep"
                          value={formData.cep}
                          onChange={handleChange}
                          placeholder="Ex: 74000000"
                          maxLength={8}
                          required
                          className="w-full bg-white border border-slate-205 focus:ring-2 focus:ring-[#00A8FF] focus:outline-none rounded-lg py-3.5 pl-9 pr-4 text-xs font-semibold text-slate-800 placeholder-slate-400 transition-all font-medium"
                        />
                      </div>
                    </div>

                    {/* Bairro */}
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="bairro" className="text-[10px] font-bold text-white/80 uppercase tracking-widest">BAIRRO *</label>
                      <input
                        id="bairro"
                        type="text"
                        name="bairro"
                        value={formData.bairro}
                        onChange={handleChange}
                        placeholder="Ex: Setor Bueno"
                        required
                        className="w-full bg-white border border-slate-205 focus:ring-2 focus:ring-[#00A8FF] focus:outline-none rounded-lg py-3.5 px-4 text-xs font-semibold text-slate-800 placeholder-slate-400 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Rua (Street) */}
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="rua" className="text-[10px] font-bold text-white/80 uppercase tracking-widest">RUA / LOGRADOURO *</label>
                    <input
                      id="rua"
                      type="text"
                      name="rua"
                      value={formData.rua}
                      onChange={handleChange}
                      placeholder="Ex: Avenida T-63"
                      required
                      className="w-full bg-white border border-slate-205 focus:ring-2 focus:ring-[#00A8FF] focus:outline-none rounded-lg py-3.5 px-4 text-xs font-semibold text-slate-800 placeholder-slate-400 transition-all font-medium"
                    />
                  </div>

                  {/* Número */}
                  <div className="flex flex-col space-y-1 w-full sm:w-1/2">
                    <label htmlFor="numero" className="text-[10px] font-bold text-white/80 uppercase tracking-widest">NÚMERO / AP / BLOCO *</label>
                    <input
                      id="numero"
                      type="text"
                      name="numero"
                      value={formData.numero}
                      onChange={handleChange}
                      placeholder="Ex: Qd 15 Lt 18 / Ap 402"
                      required
                      className="w-full bg-white border border-slate-205 focus:ring-2 focus:ring-[#00A8FF] focus:outline-none rounded-lg py-3.5 px-4 text-xs font-semibold text-slate-800 placeholder-slate-400 transition-all font-medium"
                    />
                  </div>

                  {/* Plano Interesse Selector */}
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="plano_interesse" className="text-[10px] font-bold text-white/80 uppercase tracking-widest">PLANO DE INTERESSE</label>
                    <select
                      id="plano_interesse"
                      name="plano_interesse"
                      value={formData.plano_interesse}
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-205 focus:ring-2 focus:ring-[#00A8FF] focus:outline-none rounded-lg py-3.5 px-4 text-xs font-bold text-slate-800 transition-all cursor-pointer font-medium"
                    >
                      <option value="Não especificado">Selecione um plano (opcional)</option>
                      <option value="Plano 500 Mega">Plano GIGATEL 500 MEGA - R$ 99,90</option>
                      <option value="Plano 800 Mega">Plano GIGATEL 800 MEGA (Ultra) - R$ 129,90</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button
                    id="submit-cobertura-btn"
                    type="submit"
                    disabled={loading}
                    className="w-full py-4.5 bg-[#E30613] hover:bg-opacity-92 text-white font-black uppercase tracking-wider text-xs rounded-lg shadow-lg hover:shadow-red-500/20 transition-all duration-200 disabled:opacity-50 flex items-center justify-center space-x-2.5 cursor-pointer"
                  >
                    <span>{loading ? 'ANALISANDO REDE...' : 'CONSULTAR AGORA'}</span>
                    <Send size={13} />
                  </button>

                  <p className="text-[9px] text-center text-white/50 leading-relaxed font-semibold">
                    * Ao clicar em consultar, seus dados são gravados com total segurança sob a proteção da LGPD e utilizados exclusivamente para análise de viabilidade técnica da rede fibra.
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
