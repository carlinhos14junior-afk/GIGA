import React from 'react';

export default function SpeedTest() {
  return (
    <div className="py-12 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-[#005BFF] py-6 px-8">
            <h2 className="text-2xl font-bold text-white tracking-tight">Teste sua Velocidade</h2>
            <p className="text-white/80 text-sm mt-1">Verifique a real performance da sua conexão agora!</p>
          </div>
          <div className="relative w-full" style={{ paddingBottom: '60%' }}>
            <iframe
              src="https://fast.com"
              className="absolute top-0 left-0 w-full h-full border-0"
              title="Speed Test"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}
