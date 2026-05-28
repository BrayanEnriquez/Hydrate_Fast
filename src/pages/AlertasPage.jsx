import React from 'react';
import MainLayout from '../components/templates/MainLayout';

const AlertasPage = () => {
  return (
    <MainLayout>
      <div className="flex flex-col mb-6">
        <h2 className="text-[32px] leading-10 font-semibold tracking-tight text-[#012d1d]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
          Alertas de Cultivo
        </h2>
        <p className="text-[#414844] text-base mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
          Monitoreo de notificaciones y eventos críticos en tu sistema de riego.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Alerta Crítica (Roja) */}
        <div className="bg-[#ffffff] border-l-4 border-[#ba1a1a] rounded-xl shadow-sm p-5 flex items-start gap-4">
          <div className="bg-[#ffdad6] text-[#ba1a1a] rounded-full p-2 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-[#191c1d]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Humedad Crítica: Arroz Tolima</h4>
            <p className="text-[#414844] text-sm mt-1">El nivel de humedad del suelo en el sector 4 ha caído por debajo del 15%. Se requiere riego manual de inmediato debido a que la bomba no respondió a la instrucción automática.</p>
            <div className="mt-3 flex gap-2">
              <button className="bg-[#ba1a1a] text-white px-4 py-1.5 rounded-lg text-sm font-semibold active:scale-95 transition-transform">Forzar Riego</button>
              <button className="border border-[#717973] text-[#414844] px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-[#f8f9fa] active:scale-95 transition-colors">Descartar</button>
            </div>
          </div>
          <span className="text-[#717973] text-xs font-semibold uppercase">Hace 5 min</span>
        </div>

        {/* Alerta Media (Naranja) */}
        <div className="bg-[#ffffff] border-l-4 border-[#ea9147] rounded-xl shadow-sm p-5 flex items-start gap-4">
          <div className="bg-[#ffdcc4] text-[#6f3800] rounded-full p-2 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-[#191c1d]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Nivel de Tanque Bajo</h4>
            <p className="text-[#414844] text-sm mt-1">El Tanque Principal (Reserva A) se encuentra al 20% de su capacidad. Recomendamos reabastecer el sistema hoy antes del ciclo de riego nocturno.</p>
            <div className="mt-3 flex gap-2">
              <button className="border border-[#717973] text-[#414844] px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-[#f8f9fa] active:scale-95 transition-colors">Marcar como leído</button>
            </div>
          </div>
          <span className="text-[#717973] text-xs font-semibold uppercase">Hace 2 horas</span>
        </div>

        {/* Notificación Info (Azul) */}
        <div className="bg-[#ffffff] border-l-4 border-[#006399] rounded-xl shadow-sm p-5 flex items-start gap-4 opacity-80">
          <div className="bg-[#cde5ff] text-[#001d32] rounded-full p-2 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-[#191c1d]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Mantenimiento Programado</h4>
            <p className="text-[#414844] text-sm mt-1">Se realizará un mantenimiento en las válvulas de presión el día viernes a las 14:00h. Los riegos automáticos estarán suspendidos por 2 horas.</p>
          </div>
          <span className="text-[#717973] text-xs font-semibold uppercase">Ayer</span>
        </div>
      </div>
    </MainLayout>
  );
};

export default AlertasPage;
