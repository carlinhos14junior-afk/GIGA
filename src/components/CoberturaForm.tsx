import React, { useState } from 'react';
import { MapPin, Search, Send, CheckCircle2, Phone, User, Landmark, HelpCircle } from 'lucide-react';
import { saveLead } from '../lib/supabase';
import { LeadCobertura } from '../types';

export default function CoberturaForm() {
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
  });

  const [loading, setLoading] = useState(false);
  const [searchingCep, setSearchingCep] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Formatting Phone Input automatically for comfort
    if (name === 'whatsapp') {
      const numeric = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [name]: numeric }));
    } 
    // Format CEP block
    else if (name === 'cep') {
      const cleaned = value.replace(/\D/g, '').substring(0, 8);
      setFormData(prev => ({ ...prev, [name]: cleaned }));

      // If CEP reaches 8 digits, fetch address automatically
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
        setErrorMsg('CEP não localizado, por favor digite o endereço manualmente.');
      }
    } catch (e) {
      console.warn('ViaCEP API offline or blocked, manual input allowed.');
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

    try {
      await saveLead({
        nome: formData.nome,
        whatsapp: formData.whatsapp,
        cep: formData.cep,
        rua: formData.rua,
        numero: formData.numero,
        bairro: formData.bairro,
        status: 'novo',
      });
      
      setSubmitted(true);
      // Reset form on complete
      setFormData({
        nome: '',
        whatsapp: '',
        cep: '',
        rua: '',
        numero: '',
        bairro: '',
      });
    } catch (e) {
      setErrorMsg('Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="cobertura" className="relative py-24 bg-[#070B19]">
      <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-brand-purple/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-brand-neon/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: marketing/value statement */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="inline-flex items-center space-x-1.5 bg-brand-neon/10 border border-brand-neon/30 px-3 py-1 rounded-full text-brand-neon font-mono text-xs font-semibold uppercase self-start">
              <MapPin size={12} />
              <span>Verificar Cobertura</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
              A Giganet já está no seu bairro? Consulte agora!
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              Estamos expandindo nossa rede de fibra óptica 100% de alta qualidade todos os dias. Informe seu endereço para receber uma viabilidade instantânea!
            </p>

            {/* Quick Benefits List */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-xl bg-brand-purple/20 text-brand-bright-blue mt-1">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Verificação Rápida</h4>
                  <p className="text-xs text-slate-400">Nossa equipe comercial checa sua rua no mapa de viabilidade em poucos minutos.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-xl bg-brand-purple/20 text-brand-bright-blue mt-1">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Atendimento pelo WhatsApp</h4>
                  <p className="text-xs text-slate-400">Entramos em contato diretamente por WhatsApp de forma humanizada e rápida.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-xl bg-brand-purple/20 text-brand-bright-blue mt-1">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Instalação Expressa Bonificada</h4>
                  <p className="text-xs text-slate-400">Dependendo da sua rua, conseguimos instalar a fibra no mesmo dia!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl border border-slate-800 bg-[#0d142c]/90 p-6 sm:p-10 shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-purple via-brand-bright-blue to-brand-neon" />
              
              {submitted ? (
                // Success State View
                <div className="text-center py-12 px-4 flex flex-col items-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-brand-neon/40 flex items-center justify-center text-brand-neon shadow-lg shadow-emerald-500/10 animate-bounce">
                    <CheckCircle2 size={44} />
                  </div>
                  
                  <h3 className="font-display font-extrabold text-2xl text-white">
                    Solicitação Recebida com Sucesso!
                  </h3>
                  
                  <p className="text-slate-300 text-sm max-w-md leading-relaxed">
                    Recebemos sua solicitação! Nossa equipe vai verificar a disponibilidade para seu endereço e chamar você no WhatsApp o quanto antes. Prepare-se para navegar na velocidade da luz! 🚀
                  </p>
                  
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-semibold text-xs text-slate-300 hover:text-white transition-all duration-200"
                  >
                    Consultar outro endereço
                  </button>
                </div>
              ) : (
                // Form Fields View
                <form id="cobertura-lead-form" onSubmit={handleSubmit} className="space-y-5">
                  <div className="pb-2 border-b border-slate-800">
                    <h3 className="text-xl font-bold text-white">Consulta de Disponibilidade</h3>
                    <p className="text-xs text-slate-400 mt-1">Preencha o formulário abaixo e nós faremos o restante.</p>
                  </div>

                  {errorMsg && (
                    <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs font-semibold">
                      {errorMsg}
                    </div>
                  )}

                  {/* Input Split Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Nome */}
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="nome" className="text-xs font-mono font-bold text-slate-400 uppercase">Seu Nome completo *</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                          <User size={16} />
                        </span>
                        <input
                          id="nome"
                          type="text"
                          name="nome"
                          value={formData.nome}
                          onChange={handleChange}
                          placeholder="Ex: João Silva"
                          required
                          className="w-full bg-[#070b19]/60 border border-slate-800 hover:border-slate-700 focus:border-brand-purple focus:outline-none rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="whatsapp" className="text-xs font-mono font-bold text-slate-400 uppercase">WhatsApp (com DDD) *</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-xs">
                          <Phone size={14} />
                        </span>
                        <input
                          id="whatsapp"
                          type="tel"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleChange}
                          placeholder="Ex: 11999998888"
                          required
                          className="w-full bg-[#070b19]/60 border border-slate-800 hover:border-slate-700 focus:border-brand-purple focus:outline-none rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* CEP */}
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="cep" className="text-xs font-mono font-bold text-slate-400 uppercase flex items-center justify-between">
                        <span>CEP *</span>
                        {searchingCep && <span className="text-[10px] text-brand-neon font-normal animate-pulse">Buscando cep...</span>}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
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
                          className="w-full bg-[#070b19]/60 border border-slate-800 hover:border-slate-700 focus:border-brand-purple focus:outline-none rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Bairro */}
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="bairro" className="text-xs font-mono font-bold text-slate-400 uppercase">Bairro *</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                          <MapPin size={16} />
                        </span>
                        <input
                          id="bairro"
                          type="text"
                          name="bairro"
                          value={formData.bairro}
                          onChange={handleChange}
                          placeholder="Bairro"
                          required
                          className="w-full bg-[#070b19]/60 border border-slate-800 hover:border-slate-700 focus:border-brand-purple focus:outline-none rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Rua (Street) */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="rua" className="text-xs font-mono font-bold text-slate-400 uppercase">Rua / Logradouro *</label>
                    <input
                      id="rua"
                      type="text"
                      name="rua"
                      value={formData.rua}
                      onChange={handleChange}
                      placeholder="Ex: Avenida Paulista"
                      required
                      className="w-full bg-[#070b19]/60 border border-slate-800 hover:border-slate-700 focus:border-brand-purple focus:outline-none rounded-xl py-3 px-4 text-sm text-white placeholder-slate-500 transition-colors"
                    />
                  </div>

                  {/* Número */}
                  <div className="flex flex-col space-y-1.5 w-full sm:w-1/3">
                    <label htmlFor="numero" className="text-xs font-mono font-bold text-slate-400 uppercase">Número / Apt *</label>
                    <input
                      id="numero"
                      type="text"
                      name="numero"
                      value={formData.numero}
                      onChange={handleChange}
                      placeholder="Ex: 1000"
                      required
                      className="w-full bg-[#070b19]/60 border border-slate-800 hover:border-slate-700 focus:border-brand-purple focus:outline-none rounded-xl py-3 px-4 text-sm text-white placeholder-slate-500 transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    id="submit-cobertura-btn"
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-brand-purple via-slate-900 to-[#39ff14]/30 hover:to-[#39ff14]/50 border border-brand-purple/20 text-white font-extrabold uppercase tracking-wider rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2.5 active:scale-98"
                  >
                    <span>{loading ? 'Processando Solicitação...' : 'Consultar Disponibilidade Rápida'}</span>
                    <Send size={15} />
                  </button>

                  <p className="text-[10px] text-center text-slate-500 mt-2">
                    * Ao enviar, você declara que concorda em ser contatado e em ter seu endereço analisado pela equipe técnica de instalação sob o escopo da LGPD.
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
