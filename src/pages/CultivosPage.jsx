import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../components/templates/MainLayout';

import maizImg from '../assets/maiz_valle.png';
import cafeImg from '../assets/cafe_quindio.png';
import arrozImg from '../assets/arroz_tolima.png';

/* ────────── Status badge ────────── */
const StatusBadge = ({ icon, label, bgClass, textClass }) => (
  <div className={`absolute top-2 right-2 ${bgClass} px-2 py-1 rounded-full flex items-center gap-1`}>
    <span className={`material-symbols-outlined text-sm ${textClass}`} style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>{icon}</span>
    <span className={`text-xs font-bold ${textClass}`}>{label}</span>
  </div>
);

/* ────────── Crop card ────────── */
const CropCard = ({
  image, imageAlt, stripeColor,
  badge,
  name,
  humIcon, humValue, humColor,
  tempValue,
  irrigLabel, tankPct, tankBarClass,
}) => (
  <div
    className="bg-[#ffffff] rounded-xl shadow-sm border border-[#c1c8c2] overflow-hidden flex flex-col hover:shadow-md transition-shadow"
    style={{ borderLeft: `4px solid ${stripeColor}` }}
  >

    {/* Image */}
    <div className="h-32 w-full relative">
      <img className="w-full h-full object-cover" src={image} alt={imageAlt} />
      <StatusBadge {...badge} />
    </div>

    {/* Body */}
    <div className="p-4 flex flex-col gap-2">

      {/* Title row */}
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold text-[#191c1d]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{name}</h3>
        <span className="material-symbols-outlined text-[#414844] cursor-pointer" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>more_vert</span>
      </div>

      {/* Sensors */}
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-1">
          <span className={`material-symbols-outlined ${humColor}`} style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>{humIcon}</span>
          <span className={`text-sm font-medium ${humColor}`} style={{ fontFamily: "'Inter', sans-serif" }}>{humValue} Hum.</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[#ea9147]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>thermostat</span>
          <span className="text-sm font-medium text-[#191c1d]" style={{ fontFamily: "'Inter', sans-serif" }}>{tempValue}</span>
        </div>
      </div>

      {/* Tank progress */}
      <div className="mt-2">
        <div className="flex justify-between text-xs font-semibold tracking-wider text-[#414844] mb-1">
          <span>{irrigLabel}</span>
          <span>{tankPct}% Tanque</span>
        </div>
        <div className="w-full bg-[#edeeef] h-1 rounded-full overflow-hidden">
          <div className={`${tankBarClass} h-full`} style={{ width: `${tankPct}%` }} />
        </div>
      </div>
    </div>
  </div>
);

/* ────────── Page ────────── */
const CultivosPage = () => {
  return (
    <MainLayout>

      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <h2 className="text-[32px] leading-10 font-semibold tracking-tight text-[#012d1d]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Hydrate Fast</h2>
          <p className="text-[#414844] text-base mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
            Gestiona y monitorea tus zonas de producción activa.
          </p>
        </div>
        <Link
          to="/cultivos/nuevo"
          className="bg-[#012d1d] text-[#ffffff] px-6 py-2 rounded-full flex items-center gap-2 shadow-sm hover:opacity-90 transition-all active:scale-95 self-start md:self-auto"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>add</span>
          <span className="text-xs font-semibold tracking-wider">CREAR NUEVO CULTIVO</span>
        </Link>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Add new card */}
        <Link
          to="/cultivos/nuevo"
          className="group relative bg-[#ffffff] border-2 border-dashed border-[#c1c8c2] rounded-xl p-6 flex flex-col items-center justify-center min-h-[220px] cursor-pointer hover:border-[#012d1d] transition-colors"
        >
          <div className="w-16 h-16 rounded-full bg-[#c1ecd4] flex items-center justify-center text-[#012d1d] mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>add_task</span>
          </div>
          <h3 className="text-xl font-semibold text-[#191c1d]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Agregar Parcela</h3>
          <p className="text-[#414844] text-center text-sm mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
            Configura nuevos sensores e irrigación
          </p>
        </Link>

        {/* Maíz Valle — ÓPTIMO */}
        <CropCard
          image={maizImg}
          imageAlt="Campo de maíz verde vibrante"
          stripeColor="#3f6653"
          badge={{ icon: 'check_circle', label: 'ÓPTIMO', bgClass: 'bg-[#f8f9fa]/90', textClass: 'text-[#012d1d]' }}
          name="Maíz Valle"
          humIcon="water_drop"
          humValue="68%"
          humColor="text-[#006399]"
          tempValue="24°C"
          irrigLabel="Siguiente riego: Hoy 18:00"
          tankPct={92}
          tankBarClass="bg-[#006399]"
        />

        {/* Café Quindío — IRRIGANDO */}
        <CropCard
          image={cafeImg}
          imageAlt="Plantas de café con cerezas rojas"
          stripeColor="#006399"
          badge={{ icon: 'opacity', label: 'IRRIGANDO', bgClass: 'bg-[#67bafd]', textClass: 'text-[#004972]' }}
          name="Café Quindío"
          humIcon="water_drop"
          humValue="52%"
          humColor="text-[#006399]"
          tempValue="19°C"
          irrigLabel="Flujo: 2.4 m³/h"
          tankPct={45}
          tankBarClass="bg-[#006399]"
        />

        {/* Arroz Tolima — BAJA HUMEDAD */}
        <CropCard
          image={arrozImg}
          imageAlt="Arrozal inundado al amanecer"
          stripeColor="#ea9147"
          badge={{ icon: 'warning', label: 'BAJA HUMEDAD', bgClass: 'bg-[#ffdad6]', textClass: 'text-[#93000a]' }}
          name="Arroz Tolima"
          humIcon="water_drop"
          humValue="31%"
          humColor="text-[#ba1a1a]"
          tempValue="31°C"
          irrigLabel="Siguiente riego: URGENTE"
          tankPct={15}
          tankBarClass="bg-[#ba1a1a]"
        />
      </div>
    </MainLayout>
  );
};

export default CultivosPage;
