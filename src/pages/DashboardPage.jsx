import React from 'react';
import MainLayout from '../components/templates/MainLayout';

const DashboardPage = () => {
  return (
    <MainLayout>
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <h2 className="text-[32px] leading-10 font-semibold tracking-tight text-[#012d1d]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
            Dashboard General
          </h2>
          <p className="text-[#414844] text-base mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
            Vista general del estado de tus cultivos y recursos de agua.
          </p>
        </div>
      </div>

      {/* Resumen de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Métrica 1 */}
        <div className="bg-[#ffffff] rounded-xl shadow-sm border border-[#c1c8c2] p-4 flex flex-col gap-1 border-l-4 border-l-[#3f6653]">
          <span className="text-[#414844] text-sm font-semibold uppercase tracking-wider">Cultivos Activos</span>
          <span className="text-3xl font-bold text-[#012d1d]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>12</span>
          <span className="text-xs text-[#3f6653] font-medium">+2 este mes</span>
        </div>
        {/* Métrica 2 */}
        <div className="bg-[#ffffff] rounded-xl shadow-sm border border-[#c1c8c2] p-4 flex flex-col gap-1 border-l-4 border-l-[#006399]">
          <span className="text-[#414844] text-sm font-semibold uppercase tracking-wider">Humedad Promedio</span>
          <span className="text-3xl font-bold text-[#012d1d]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>56%</span>
          <span className="text-xs text-[#006399] font-medium">Estado óptimo</span>
        </div>
        {/* Métrica 3 */}
        <div className="bg-[#ffffff] rounded-xl shadow-sm border border-[#c1c8c2] p-4 flex flex-col gap-1 border-l-4 border-l-[#ea9147]">
          <span className="text-[#414844] text-sm font-semibold uppercase tracking-wider">Alertas Pendientes</span>
          <span className="text-3xl font-bold text-[#012d1d]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>3</span>
          <span className="text-xs text-[#ba1a1a] font-medium">Requieren atención</span>
        </div>
        {/* Métrica 4 */}
        <div className="bg-[#ffffff] rounded-xl shadow-sm border border-[#c1c8c2] p-4 flex flex-col gap-1 border-l-4 border-l-[#a5d0b9]">
          <span className="text-[#414844] text-sm font-semibold uppercase tracking-wider">Agua Usada (Hoy)</span>
          <span className="text-3xl font-bold text-[#012d1d]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>1.2k L</span>
          <span className="text-xs text-[#414844] font-medium">-5% vs ayer</span>
        </div>
      </div>

      {/* Gráficos de demostración (Estructura visual) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Panel de riego */}
        <div className="bg-[#ffffff] rounded-xl shadow-sm border border-[#c1c8c2] p-6 flex flex-col h-[300px]">
          <h3 className="text-xl font-semibold text-[#191c1d] mb-4" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Consumo de Agua Semanal</h3>
          <div className="flex-1 bg-[#f3f4f5] rounded-lg border border-dashed border-[#c1c8c2] flex items-center justify-center">
            <span className="text-[#717973] font-medium">Espacio para gráfico de barras</span>
          </div>
        </div>
        
        {/* Panel de estado de bombas */}
        <div className="bg-[#ffffff] rounded-xl shadow-sm border border-[#c1c8c2] p-6 flex flex-col h-[300px]">
          <h3 className="text-xl font-semibold text-[#191c1d] mb-4" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Estado del Sistema</h3>
          <div className="flex-1 flex flex-col justify-center gap-4">
            <div className="flex justify-between items-center p-3 rounded-lg bg-[#f8f9fa] border border-[#e1e3e4]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#012d1d]" style={{ fontVariationSettings: "'FILL' 1" }}>water_pump</span>
                <span className="font-semibold text-[#191c1d]">Bomba Principal Norte</span>
              </div>
              <span className="bg-[#c1ecd4] text-[#002114] px-2 py-1 text-xs font-bold rounded-full">OPERATIVA</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-[#f8f9fa] border border-[#e1e3e4]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#012d1d]" style={{ fontVariationSettings: "'FILL' 1" }}>water_pump</span>
                <span className="font-semibold text-[#191c1d]">Bomba Secundaria Sur</span>
              </div>
              <span className="bg-[#e1e3e4] text-[#414844] px-2 py-1 text-xs font-bold rounded-full">INACTIVA</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-[#f8f9fa] border border-[#e1e3e4]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#ea9147]" style={{ fontVariationSettings: "'FILL' 1" }}>sensors</span>
                <span className="font-semibold text-[#191c1d]">Sensor Humedad Sector B</span>
              </div>
              <span className="bg-[#ffdad6] text-[#93000a] px-2 py-1 text-xs font-bold rounded-full">FALLA CONEXIÓN</span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
