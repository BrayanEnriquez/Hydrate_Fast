import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/templates/MainLayout';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../back/firebase';
import Select from '../components/atoms/Select';
import RadioGroup from '../components/molecules/RadioGroup';
import IrrigationRadioGroup from '../components/molecules/IrrigationRadioGroup';
import WeatherWidget from '../components/organisms/WeatherWidget';

const CreateCropPage = () => {
  const navigate = useNavigate();
  const [freqValue, setFreqValue] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Firestore Data States
  const [crops, setCrops] = useState([]);
  const [soilTypes, setSoilTypes] = useState([]);
  const [inclinations, setInclinations] = useState([]);
  const [irrigationTypes, setIrrigationTypes] = useState([]);

  // Form States
  const [selectedCrop, setSelectedCrop] = useState('');
  const [waterConsumption, setWaterConsumption] = useState('');
  const [selectedSoil, setSelectedSoil] = useState('');
  const [selectedInclination, setSelectedInclination] = useState('');
  const [selectedIrrigation, setSelectedIrrigation] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedHours, setSelectedHours] = useState([]);

  const toggleHour = (hour) => {
    if (selectedHours.includes(hour)) {
      setSelectedHours(selectedHours.filter(h => h !== hour));
    } else if (selectedHours.length < freqValue) {
      setSelectedHours([...selectedHours, hour]);
    }
  };

  const getHourColorClass = (hour) => {
    // 04:00 - 08:00 and 17:00 - 19:00 -> Green (Óptimo)
    if ((hour >= 4 && hour <= 8) || (hour >= 17 && hour <= 19)) {
      return { base: "border-[#012d1d] text-[#012d1d] bg-[#c1ecd4]/20", active: "bg-[#012d1d] text-white" };
    }
    // 10:00 - 16:00 -> Red (No Recomendado)
    if (hour >= 10 && hour <= 16) {
      return { base: "border-[#ba1a1a] text-[#ba1a1a] bg-[#ffdad6]/20", active: "bg-[#ba1a1a] text-white" };
    }
    // Rest -> Orange (Regular)
    return { base: "border-[#ea9147] text-[#ea9147] bg-[#ffdcc4]/20", active: "bg-[#ea9147] text-white" };
  };

  useEffect(() => {
    const fetchFirebaseData = async () => {
      try {
        const cropsSnap = await getDocs(collection(db, 'ConsumoAguaLm2dia'));
        setCrops(cropsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const soilsSnap = await getDocs(collection(db, 'TipoSuelo'));
        setSoilTypes(soilsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const inclSnap = await getDocs(collection(db, 'InclinacionSuelo'));
        setInclinations(inclSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const irrigSnap = await getDocs(collection(db, 'TipoRiego'));
        setIrrigationTypes(irrigSnap.docs.map(doc => doc.id));
      } catch (error) {
        console.error("Error fetching Firebase data: ", error);
      }
    };
    fetchFirebaseData();
  }, []);

  const handleCropChange = (e) => {
    setSelectedCrop(e.target.value);
  };

  // Auto-calculate water consumption when crop, soil, or inclination changes
  useEffect(() => {
    if (!selectedCrop) return;

    const crop = crops.find(c => c.id === selectedCrop);
    if (!crop || crop.Consumo === undefined) return;

    let baseConsumo = Number(crop.Consumo);
    let totalModifier = 0; // Percentage modifier

    if (selectedSoil) {
      const soil = soilTypes.find(s => s.id === selectedSoil);
      if (soil && soil.LimInf !== undefined) {
        totalModifier += soil.Accion ? Number(soil.LimInf) : -Number(soil.LimInf);
      }
    }

    if (selectedInclination) {
      const incl = inclinations.find(i => i.id === selectedInclination);
      if (incl && incl.LimInf !== undefined) {
        totalModifier += incl.Accion ? Number(incl.LimInf) : -Number(incl.LimInf);
      }
    }

    const finalConsumo = baseConsumo * (1 + totalModifier / 100);
    setWaterConsumption(finalConsumo.toFixed(1));
  }, [selectedCrop, selectedSoil, selectedInclination, crops, soilTypes, inclinations]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        navigate('/cultivos');
      }, 2000);
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="max-w-lg mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate('/cultivos')}
            className="flex items-center gap-1 text-[#414844] hover:text-[#012d1d] transition-colors mb-4"
          >
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>arrow_back</span>
            <span className="text-[12px] font-semibold tracking-[0.05em]" style={{ fontFamily: "'Inter', sans-serif" }}>VOLVER A MIS CULTIVOS</span>
          </button>

          <h2 className="text-[24px] leading-[32px] font-semibold text-[#191c1d] mb-1" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Programar Cultivo</h2>
          <p className="text-[14px] leading-[20px] text-[#414844]" style={{ fontFamily: "'Inter', sans-serif" }}>Configure los parámetros técnicos para optimizar el riego y crecimiento de su nueva siembra.</p>
        </div>

        <form className="space-y-4" id="cropForm" onSubmit={handleSubmit}>

          {/* Basic Information Bento Section */}
          <section className="bg-[#ffffff] p-4 rounded-xl shadow-sm border border-[#c1c8c2] space-y-4">
            <Select
              label="TIPO DE CULTIVO"
              required
              value={selectedCrop}
              onChange={handleCropChange}
              placeholder="Seleccione un cultivo de la base de datos"
              options={crops.map(c => ({ label: c.Cultivo || c.id, value: c.id }))}
            />

            <div className="relative">
              <label className="block text-[12px] font-semibold tracking-[0.05em] text-[#012d1d] mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>NOMBRE DE LA PARCELA</label>
              <input
                required
                className="w-full bg-[#f8f9fa] border border-[#c1c8c2] rounded-lg px-4 py-2 focus:border-[#012d1d] focus:ring-1 focus:ring-[#012d1d] outline-none transition-all placeholder:text-[#717973] text-[16px]"
                placeholder="Ej: Lote Norte"
                type="text"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="DEPARTAMENTO"
                options={[
                  { label: "Antioquia", value: "Antioquia" },
                  { label: "Cundinamarca", value: "Cundinamarca" },
                  { label: "Valle del Cauca", value: "Valle del Cauca" },
                  { label: "Huila", value: "Huila" }
                ]}
              />
              <Select
                label="CIUDAD"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                options={[
                  { label: "Medellín", value: "Medellín" },
                  { label: "Bogotá", value: "Bogotá" },
                  { label: "Cali", value: "Cali" },
                  { label: "Neiva", value: "Neiva" }
                ]}
              />
            </div>
          </section>

          {/* Weather Widget */}
          <WeatherWidget city={selectedCity} />

          {/* Soil and Terrain Bento Section */}
          <section className="grid grid-cols-1 gap-4">
            {/* Soil Type */}
            <div className="bg-[#ffffff] p-4 rounded-xl shadow-sm border-l-4 border-[#012d1d]">
              <label className="flex items-center gap-1 text-[12px] font-semibold tracking-[0.05em] text-[#012d1d] mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>terrain</span> TIPO DE SUELO
              </label>
              <RadioGroup
                name="soil"
                selectedValue={selectedSoil}
                onChange={setSelectedSoil}
                options={soilTypes.map(s => ({ label: s.Suelo || s.id, value: s.id, imageUrl: s.Imagen }))}
                activeBgColor="#012d1d"
              />
            </div>

            {/* Land Inclination */}
            <div className="bg-[#ffffff] p-4 rounded-xl shadow-sm border-l-4 border-[#006399]">
              <label className="flex items-center gap-1 text-[12px] font-semibold tracking-[0.05em] text-[#006399] mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>landscape</span> INCLINACIÓN DEL TERRENO
              </label>
              <RadioGroup
                name="slope"
                selectedValue={selectedInclination}
                onChange={setSelectedInclination}
                options={inclinations.map(i => ({ label: i.id, value: i.id }))}
                activeBgColor="#006399"
              />
            </div>
          </section>

          {/* Irrigation Configuration Section */}
          <section className="bg-[#ffffff] p-4 rounded-xl shadow-sm border border-[#c1c8c2] space-y-4">
            <div className="flex items-center gap-1 text-[#012d1d] mb-1">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>water_drop</span>
              <h3 className="text-[18px] font-semibold leading-[24px]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Configuración de Riego</h3>
            </div>

            <div className="space-y-2">
              <label className="block text-[12px] font-semibold tracking-[0.05em] text-[#414844]" style={{ fontFamily: "'Inter', sans-serif" }}>CONSUMO DE AGUA (LITROS/M²/DÍA)</label>
              <div className="relative flex items-center">
                <input
                  required
                  className="w-full bg-[#f3f4f5] border border-[#c1c8c2] rounded-lg px-4 py-2 focus:border-[#012d1d] focus:ring-1 focus:ring-[#012d1d] outline-none transition-all pr-12 text-[16px] text-[#012d1d] font-semibold"
                  placeholder="0.0"
                  step="0.1"
                  type="number"
                  value={waterConsumption}
                  onChange={(e) => setWaterConsumption(e.target.value)}
                />
                <span className="absolute right-4 text-[12px] font-semibold tracking-[0.05em] text-[#414844]">L/m²</span>
              </div>
              <p className="text-[10px] text-[#717973]">Calculado automáticamente según Cultivo, Suelo e Inclinación. Puede editarse manualmente.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-[12px] font-semibold tracking-[0.05em] text-[#414844]" style={{ fontFamily: "'Inter', sans-serif" }}>TIPO DE RIEGO</label>
              <IrrigationRadioGroup
                name="irrigation_type"
                selectedValue={selectedIrrigation}
                onChange={setSelectedIrrigation}
                options={irrigationTypes.map(type => {
                  let icon = "opacity";
                  let desc = "Sistema de irrigación";

                  if (type.toLowerCase().includes("aire") || type.toLowerCase().includes("aspersión")) {
                    icon = "rainy"; desc = "Ideal para coberturas amplias";
                  } else if (type.toLowerCase().includes("suelo") || type.toLowerCase().includes("tierra")) {
                    icon = "opacity"; desc = "Alta eficiencia y precisión";
                  } else if (type.toLowerCase().includes("manual")) {
                    icon = "hand_gesture"; desc = "Control directo por operario";
                  } else if (type.toLowerCase().includes("ambos")) {
                    icon = "water_ec"; desc = "Sistema combinado completo";
                  }

                  return { label: type, value: type, description: desc, icon: icon };
                })}
              />
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center">
                <label className="block text-[12px] font-semibold tracking-[0.05em] text-[#414844] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>Frecuencia de Riego</label>
                <span className="text-[#012d1d] font-bold text-[20px] transition-transform duration-200" id="frequencyValue">{freqValue}</span>
              </div>
              <input
                className="w-full h-2 bg-[#e7e8e9] rounded-full appearance-none cursor-pointer accent-[#012d1d]"
                max="5" min="1" step="1" type="range"
                value={freqValue}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setFreqValue(val);
                  if (selectedHours.length > val) {
                    setSelectedHours(selectedHours.slice(0, val));
                  }
                }}
              />
              <div className="flex justify-between text-[12px] font-semibold tracking-[0.05em] text-[#717973] px-1">
                <span>Mín</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>Máx</span>
              </div>
            </div>

            {/* Hours selection grid */}
            <div className="space-y-3 pt-4 border-t border-[#c1c8c2]">
              <div className="flex justify-between items-end">
                <label className="block text-[12px] font-semibold tracking-[0.05em] text-[#414844] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Horarios de Riego ({selectedHours.length}/{freqValue})
                </label>
                <div className="flex gap-2 text-[10px] font-bold">
                  <span className="flex items-center gap-1"><div className="w-2 h-2 bg-[#012d1d] rounded-full"></div> Óptimo</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 bg-[#ea9147] rounded-full"></div> Regular</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 bg-[#ba1a1a] rounded-full"></div> Evitar</span>
                </div>
              </div>

              <div className="grid grid-cols-6 gap-2">
                {[...Array(24)].map((_, hour) => {
                  const isSelected = selectedHours.includes(hour);
                  const colors = getHourColorClass(hour);
                  const hourStr = `${hour.toString().padStart(2, '0')}:00`;

                  return (
                    <button
                      type="button"
                      key={hour}
                      onClick={() => toggleHour(hour)}
                      disabled={!isSelected && selectedHours.length >= freqValue}
                      className={`text-[11px] font-bold py-2 rounded-lg border transition-all
                        ${isSelected ? colors.active : colors.base}
                        ${!isSelected && selectedHours.length >= freqValue ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
                      `}
                    >
                      {hourStr}
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-[#717973] mt-1">Selecciona tantas horas como tu frecuencia diaria lo permita.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-[12px] font-semibold tracking-[0.05em] text-[#414844] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>Duración del Ciclo (Semanas)</label>
              <div className="flex items-center gap-4">
                <input required className="w-24 bg-[#f8f9fa] border border-[#c1c8c2] rounded-lg px-4 py-2 focus:border-[#012d1d] focus:ring-1 focus:ring-[#012d1d] outline-none transition-all text-[16px]" min="1" type="number" defaultValue="12" />
                <div className="flex-1 h-[2px] bg-[#c1c8c2]"></div>
                <span className="text-[14px] text-[#414844]" style={{ fontFamily: "'Inter', sans-serif" }}>Estimado de cosecha</span>
              </div>
            </div>
          </section>

          <button
            type="submit"
            disabled={isSubmitting || isSuccess}
            className={`w-full text-[#ffffff] text-[18px] font-semibold leading-[24px] py-6 rounded-full shadow-lg active:scale-95 transition-all flex items-center justify-center gap-4 
              ${isSuccess ? 'bg-green-600' : 'bg-[#012d1d] hover:bg-[#1b4332]'}`}
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined animate-spin" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>progress_activity</span>
                PROCESANDO...
              </>
            ) : isSuccess ? (
              <>
                <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>check_circle</span>
                PROGRAMADO CON ÉXITO
              </>
            ) : (
              <>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>save</span>
                CONFIRMAR Y PROGRAMAR
              </>
            )}
          </button>
        </form>

        {/* Visual Context Card (Bento Style) */}
        <div className="mt-8 relative rounded-xl overflow-hidden shadow-sm h-48 group">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            alt="A cinematic, wide-angle shot of a lush green agricultural field in the Colombian mountains at sunrise."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2RkrJUlbaXJr2FMktTZ2AVqCzqIld9IIBcM8EGD1TLqUSg7WcGXDcjU9SFzYJWe_tPIxpKgyyLiKOjvK739LHwFrojpxoXkIAT27SgQGjPWsEFh3ppZcgCLs9wzDnhldL40gQ0NyFa0375bAOb3DyEZ-vBSx2z2yaJcJBiW4AHUnBagwAu60nZ01X_waTfhQqqQN9BbAwq_qpUWKx-tXtE8sIW6hOx2p5cAg2v00cPvqrZU9_Crw4AT6_XDGnOkj3ubAoPhgys865"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
            <span className="text-white text-[18px] font-semibold leading-[24px]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Optimización Hydrate Fast™</span>
            <p className="text-white/80 text-[14px]" style={{ fontFamily: "'Inter', sans-serif" }}>Algoritmos de precisión ajustados a su geolocalización.</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateCropPage;
