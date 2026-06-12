import React, { useState } from 'react';
import { MapPin, Search, Send, CheckCircle2, Phone, User, Mail, HelpCircle } from 'lucide-react';
import { saveLead } from '../lib/supabase';
import { Lead } from '../types';

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

    // Concatenate address for Supabase Tabela: leads (id, nome, whatsapp, email, cep, endereco, plano_interesse, observacoes, status, created_at)
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
    <section id="cobertura" className="relative py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: marketing/value statement */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="inline-flex items-center space-x-1.5 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full text-emerald-700 font-bold text-xs uppercase self-start tracking-wider">
              <MapPin size={12} className="text-emerald-500" />
              <span>Verificar Cobertura</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
              Consulte se a melhor Fibra Óptica já atende seu endereço!
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              Estamos expandindo ativamente nossa rede de ultravelocidade. Informe seus dados para consultar a disponibilidade do sinal 100% fibra na sua porta.
            </p>

            {/* Quick Benefits List */}
            <div className="space-y-5 pt-4">
              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-800 mt-0.5">
                  <CheckCircle2 size={18} className="text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Análise de Viabilidade Imediata</h4>
                  <p className="text-xs text-slate-500">Nosso sistema mapeia as caixas de atendimento mais próximas da sua residência.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-800 mt-0.5">
                  <CheckCircle2 size={18} className="text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Contate Sem Compromisso</h4>
                  <p className="text-xs text-slate-500">Nosso time entra em contato diretamente pelo WhatsApp para apresentar promoções.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-800 mt-0.5">
                  <CheckCircle2 size={18} className="text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Isenção de Instalação</h4>
                  <p className="text-xs text-slate-500">Aprovando a viabilidade, você ganha a instalação residencial grátis!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Form Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl border border-slate-200 bg-[#F8FAFC] p-8 sm:p-10 shadow-lg">
              
              {submitted ? (
                // Success State View
                <div className="text-center py-12 px-4 flex flex-col items-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm animate-bounce">
                    <CheckCircle2 size={36} />
                  </div>
                  
                  <h3 className="font-display font-extrabold text-2xl text-slate-900">
                    Obrigado pelo seu Contato!
                  </h3>
                  
                  <p className="text-slate-600 text-sm max-w-md leading-relaxed">
                    Recebemos os dados com sucesso. Nosso departamento comercial verificará a viabilidade e entrará em contato com você pelo WhatsApp em breve! 🚀
                  </p>
                  
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 font-bold text-xs text-white transition-all duration-200"
                  >
                    Consultar Outro Endereço
                  </button>
                </div>
              ) : (
                // Form Fields View
                <form id="cobertura-lead-form" onSubmit={handleSubmit} className="space-y-5">
                  <div className="pb-3 border-b border-slate-200">
                    <h3 className="text-xl font-bold text-slate-900">Consulte Disponibilidade de Sinal</h3>
                    <p className="text-xs text-slate-500 mt-1">Preencha com atenção para acelerarmos seu atendimento.</p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold">
                      {errorMsg}
                    </div>
                  )}

                  {/* Input Split Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Nome */}
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="nome" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Seu Nome completo *</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                          <User size={16} />
                        </span>
                        <input
                          id="nome"
                          type="text"
                          name="nome"
                          value={formData.nome}
                          onChange={handleChange}
                          placeholder="Ex: João da Silva"
                          required
                          className="w-full bg-white border border-slate-200 focus:border-slate-400 focus:outline-none rounded-xl py-3 pl-10 pr-4 text-sm text-slate-850 placeholder-slate-400 transition-colors"
                        />
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="whatsapp" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">WhatsApp com DDD *</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400Combined">
                          <Phone size={16} className="text-slate-400" />
                        </span>
                        <input
                          id="whatsapp"
                          type="tel"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleChange}
                          placeholder="DDD + Número (ex: 11999998888)"
                          required
                          className="w-full bg-white border border-slate-200 focus:border-slate-400 focus:outline-none rounded-xl py-3 pl-10 pr-4 text-sm text-slate-850 placeholder-slate-400 transition-colors"
                        />
                      </div>
                    </div>

                    {/* E-mail (Adding as requested in Supabase table checklist) */}
                    <div className="flex flex-col space-y-1.5 sm:col-span-2">
                      <label htmlFor="email" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">E-mail para contato</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                          <Mail size={16} />
                        </span>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Ex: joaosilva@email.com"
                          className="w-full bg-white border border-slate-200 focus:border-slate-400 focus:outline-none rounded-xl py-3 pl-10 pr-4 text-sm text-slate-850 placeholder-slate-400 transition-colors"
                        />
                      </div>
                    </div>

                    {/* CEP */}
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="cep" className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                        <span>CEP *</span>
                        {searchingCep && <span className="text-[10px] text-sky-600 font-bold animate-pulse">Buscando CEP...</span>}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                          <Search size={16} />
                        </span>
                        <input
                          id="cep"
                          type="text"
                          name="cep"
                          value={formData.cep}
                          onChange={handleChange}
                          placeholder="Ex: 01311100"
                          maxLength={8}
                          required
                          className="w-full bg-white border border-slate-200 focus:border-slate-400 focus:outline-none rounded-xl py-3 pl-10 pr-4 text-sm text-slate-850 placeholder-slate-400 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Bairro */}
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="bairro" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Bairro *</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                          <MapPin size={16} />
                        </span>
                        <input
                          id="bairro"
                          type="text"
                          name="bairro"
                          value={formData.bairro}
                          onChange={handleChange}
                          placeholder="Ex: Centro"
                          required
                          className="w-full bg-white border border-slate-200 focus:border-slate-400 focus:outline-none rounded-xl py-3 pl-10 pr-4 text-sm text-slate-850 placeholder-slate-400 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Rua (Street) */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="rua" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Rua / Logradouro *</label>
                    <input
                      id="rua"
                      type="text"
                      name="rua"
                      value={formData.rua}
                      onChange={handleChange}
                      placeholder="Ex: Avenida Paulista"
                      required
                      className="w-full bg-white border border-slate-200 focus:border-slate-400 focus:outline-none rounded-xl py-3 px-4 text-sm text-slate-850 placeholder-slate-400 transition-colors"
                    />
                  </div>

                  {/* Número */}
                  <div className="flex flex-col space-y-1.5 w-full sm:w-1/3">
                    <label htmlFor="numero" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Número / Ap / Blocco *</label>
                    <input
                      id="numero"
                      type="text"
                      name="numero"
                      value={formData.numero}
                      onChange={handleChange}
                      placeholder="Ex: 500"
                      required
                      className="w-full bg-white border border-slate-200 focus:border-slate-400 focus:outline-none rounded-xl py-3 px-4 text-sm text-slate-850 placeholder-slate-400 transition-colors"
                    />
                  </div>

                  {/* Plano Interesse Selector */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="plano_interesse" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Plano de Interesse</label>
                    <select
                      id="plano_interesse"
                      name="plano_interesse"
                      value={formData.plano_interesse}
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-200 focus:border-slate-404 focus:outline-none rounded-xl py-3 px-4 text-sm text-slate-800 transition-colors"
                    >
                      <option value="Não especificado">Selecione um plano (opcional)</option>
                      <option value="Plano Smart 500 Mega">Smart 500 Mega - R$ 99,90</option>
                      <option value="Plano Ultra 800 Mega">Ultra 800 Mega - R$ 129,90</option>
                      <option value="Plano Premium 1 Giga">Premium 1 Giga - R$ 199,90</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button
                    id="submit-cobertura-btn"
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold uppercase tracking-wider text-xs rounded-xl shadow-md transition-all duration-200 disabled:opacity-50 flex items-center justify-center space-x-2.5"
                  >
                    <span>{loading ? 'Consultando viabilidade...' : 'Consultar Viabilidade Agora'}</span>
                    <Send size={14} />
                  </button>

                  <p className="text-[10px] text-center text-slate-400 mt-2 leading-relaxed">
                    * Ao clicar em consultar, seus dados são transmitidos com segurança sob a proteção da LGPD e utilizados exclusivamente para análise de viabilidade técnica.
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
