import { useState, useEffect, useRef, useCallback } from "react";

const STORAGE_KEY = "greco_command_v3_state";
const CONV_KEY = "greco_command_v3_conv";

const seededState = {
  inicializado: true,
  reflexion_fundador: "Pablo identificó que su objetivo inconsciente era cobrar el dinero del alumno. Una vez cobrado, el compromiso se sentía cumplido y las clases pasaban a modo 'cuando pueda'. Esta visión inmadura no le permitía ver a cada alumno como un compromiso y responsabilidad a corto plazo, generando eternización de alumnos, huecos en la agenda y decisiones operativas erradas. El Director debe recordar esto y usarlo como lente de auditoría permanente.",
  alumnos: [
    { id: "a01", nombre: "Alejandra", paquete: "pack15", vehiculo: "suzuki", precio: 12380, pagado: 12380, modalidad: "contado", clases_total: 15, clases_dadas: 15, estado: "activo", ingreso_fecha: "2025-11-01", notas: "Sin clases disponibles. Comprará clases adicionales. Examen pendiente sin fecha próxima." },
    { id: "a02", nombre: "Alexander", paquete: "pack15", vehiculo: "suzuki", precio: 12380, pagado: 12380, modalidad: "contado", clases_total: 15, clases_dadas: 4, estado: "activo", ingreso_fecha: "2026-03-01", notas: "" },
    { id: "a03", nombre: "Juan Manuel", paquete: "pack15", vehiculo: "suzuki", precio: 12380, pagado: 12380, modalidad: "contado", clases_total: 15, clases_dadas: 15, estado: "activo", ingreso_fecha: "2025-11-01", notas: "Examen el lunes 23 de marzo 2026. Sin clases disponibles." },
    { id: "a04", nombre: "Ramiro", paquete: "pack20", vehiculo: "suzuki", precio: 15221, pagado: 13400, modalidad: "contado en 2 pagos de $6.700", clases_total: 20, clases_dadas: 15, estado: "activo", ingreso_fecha: "2026-01-01", notas: "Pagó 2x$6.700 = $13.400. Diferencia de $1.821 respecto al precio de lista. Verificar con Pablo." },
    { id: "a05", nombre: "Eustaquio", paquete: "pack15", vehiculo: "suzuki", precio: 12380, pagado: 12380, modalidad: "contado", clases_total: 15, clases_dadas: 15, estado: "activo", ingreso_fecha: "2025-12-01", notas: "Examen el lunes 23 de marzo 2026. Sin clases disponibles." },
    { id: "a06", nombre: "Marcelo", paquete: "pack15", vehiculo: "suzuki", precio: 12380, pagado: 12380, modalidad: "contado", clases_total: 15, clases_dadas: 9, estado: "activo", ingreso_fecha: "2025-11-01", notas: "" },
    { id: "a07", nombre: "Verónica", paquete: "pack15", vehiculo: "suzuki", precio: 12380, pagado: 12380, modalidad: "contado", clases_total: 15, clases_dadas: 4, estado: "activo", ingreso_fecha: "2025-12-01", notas: "Estuvo muy enferma. Progreso lento justificado." },
    { id: "a08", nombre: "Lorena", paquete: "pack15", vehiculo: "suzuki", precio: 12380, pagado: 12380, modalidad: "contado", clases_total: 15, clases_dadas: 10, estado: "activo", ingreso_fecha: "2026-01-01", notas: "Examen estimado abril 2026." },
    { id: "a09", nombre: "Joanna", paquete: "pack15", vehiculo: "suzuki", precio: 12380, pagado: 12380, modalidad: "contado", clases_total: 15, clases_dadas: 13, estado: "activo", ingreso_fecha: "2026-01-01", notas: "Examen en abril 2026." },
    { id: "a10", nombre: "Rodolfo", paquete: "pack15", vehiculo: "suzuki", precio: 12380, pagado: 12380, modalidad: "contado", clases_total: 15, clases_dadas: 8, estado: "activo", ingreso_fecha: "2026-01-01", notas: "" },
    { id: "a11", nombre: "Melany", paquete: "pack15", vehiculo: "suzuki", precio: 12380, pagado: 12380, modalidad: "contado", clases_total: 15, clases_dadas: 3, estado: "activo", ingreso_fecha: "2026-03-01", notas: "" },
    { id: "a12", nombre: "Mayra", paquete: "pack15", vehiculo: "suzuki", precio: 12380, pagado: 12380, modalidad: "contado", clases_total: 15, clases_dadas: 0, estado: "activo", ingreso_fecha: "2026-03-24", notas: "Comienza la semana del 24 de marzo 2026." },
    { id: "a13", nombre: "Lilian", paquete: "pack15", vehiculo: "suzuki", precio: 12380, pagado: 12380, modalidad: "contado", clases_total: 15, clases_dadas: 15, estado: "activo", ingreso_fecha: "2025-11-01", notas: "Sin clases disponibles. Debe contratar clases sueltas. Examen en abril 2026." },
  ],
  finanzas: {
    ingresos: [
      { id: "i01", alumno: "Alejandra", monto: 12380, fecha: "2025-11-05", concepto: "Pack 15 Suzuki contado" },
      { id: "i02", alumno: "Marcelo", monto: 12380, fecha: "2025-11-10", concepto: "Pack 15 Suzuki contado" },
      { id: "i03", alumno: "Lilian", monto: 12380, fecha: "2025-11-15", concepto: "Pack 15 Suzuki contado" },
      { id: "i04", alumno: "Juan Manuel", monto: 12380, fecha: "2025-11-20", concepto: "Pack 15 Suzuki contado" },
      { id: "i05", alumno: "Eustaquio", monto: 12380, fecha: "2025-12-05", concepto: "Pack 15 Suzuki contado" },
      { id: "i06", alumno: "Verónica", monto: 12380, fecha: "2025-12-10", concepto: "Pack 15 Suzuki contado" },
      { id: "i07", alumno: "Ramiro", monto: 6700, fecha: "2026-01-08", concepto: "Pack 20 Suzuki - 1er pago" },
      { id: "i08", alumno: "Ramiro", monto: 6700, fecha: "2026-01-22", concepto: "Pack 20 Suzuki - 2do pago" },
      { id: "i09", alumno: "Lorena", monto: 12380, fecha: "2026-01-10", concepto: "Pack 15 Suzuki contado" },
      { id: "i10", alumno: "Joanna", monto: 12380, fecha: "2026-01-12", concepto: "Pack 15 Suzuki contado" },
      { id: "i11", alumno: "Rodolfo", monto: 12380, fecha: "2026-01-15", concepto: "Pack 15 Suzuki contado" },
      { id: "i12", alumno: "Alexander", monto: 12380, fecha: "2026-03-05", concepto: "Pack 15 Suzuki contado" },
      { id: "i13", alumno: "Melany", monto: 12380, fecha: "2026-03-10", concepto: "Pack 15 Suzuki contado" },
      { id: "i14", alumno: "Mayra", monto: 12380, fecha: "2026-03-22", concepto: "Pack 15 Suzuki contado" },
    ],
    egresos: [
      { id: "e01", concepto: "Combustible", monto: 9000, fecha: "2026-03-01", tipo: "fijo_mensual" },
      { id: "e02", concepto: "Cochera", monto: 2700, fecha: "2026-03-01", tipo: "fijo_mensual" },
      { id: "e03", concepto: "Seguro", monto: 7500, fecha: "2026-03-01", tipo: "fijo_mensual" },
      { id: "e04", concepto: "Cuota auto", monto: 7500, fecha: "2026-03-01", tipo: "fijo_mensual" },
      { id: "e05", concepto: "Mantenimiento", monto: 700, fecha: "2026-03-01", tipo: "fijo_mensual" },
      { id: "e06", concepto: "BPS", monto: 8400, fecha: "2026-03-01", tipo: "fijo_mensual" },
      { id: "e07", concepto: "DGI (3% de lo recaudado)", monto: 0, fecha: "2026-03-01", tipo: "variable_sobre_ingresos", porcentaje: 0.03, nota: "Se calcula como el 3% de los ingresos del mes. Actualizar mensualmente." },
      { id: "e08", concepto: "Publicidad (Instagram/Facebook/WhatsApp)", monto: 2750, fecha: "2026-03-01", tipo: "variable_marketing", rango: "2500-3000", nota: "Costo variable de adquisición. Permite calcular CAC mensual." },
    ],
  },
  metas: [],
  config: {
    moneda: "UYU",
    egresos_fijos_mensuales: 35800, // 27400 + BPS 8400. DGI es variable: 3% de ingresos del mes.
    costo_publicidad_promedio: 2750, // variable, rango 2500-3000. Usar para calcular CAC mensual.
    precios: {
      manual_suzuki: {
        pack15: { contado: 12380, cuota12: 1215 },
        pack20: { contado: 15221, cuota12: 1494 },
        pack25: { contado: 20353, cuota12: 1997 },
      },
      electrico_jmev3: {
        pack8:  { contado: 10800, cuota12: 1060 },
        pack15: { contado: 13700, cuota12: 1344 },
        pack25: { contado: 19990, cuota12: 1962 },
      },
      adicionales: {
        practica_extra:         { monto: 1250, modalidad: "contado" },
        presentacion_examen:    { monto: 1600, modalidad: "contado o hasta 12 cuotas POS" },
        clase_individual_55min: { monto: 1300, modalidad: "solo contado" },
      },
      politica_examen: {
        incluido_en_pack: false,
        costo: 1600,
        exento_si: "alumno nuevo Suzuki que eligió y mantuvo horario valle (L-V hasta 13hs o 14-18hs) durante la totalidad del pack",
        aplica_a: "solo vehículo Suzuki, alumnos nuevos",
        segunda_presentacion: "siempre con costo $1.600 independientemente del horario",
      },
    },
  },
  ultima_auditoria: null,
};

const defaultState = { ...seededState };

function mergeDeep(base, updates) {
  if (!updates) return base;
  const result = { ...base };
  for (const key of Object.keys(updates)) {
    if (
      updates[key] !== null &&
      typeof updates[key] === "object" &&
      !Array.isArray(updates[key]) &&
      typeof base[key] === "object" &&
      !Array.isArray(base[key])
    ) {
      result[key] = mergeDeep(base[key] || {}, updates[key]);
    } else {
      result[key] = updates[key];
    }
  }
  return result;
}

function computeMetrics(state) {
  const now = new Date();
  const mes = now.getMonth();
  const anio = now.getFullYear();
  const alumnosActivos = state.alumnos.filter((a) => a.estado === "activo").length;
  const totalAlumnos = state.alumnos.length;
  const ingresosMes = state.finanzas.ingresos
    .filter((i) => { const d = new Date(i.fecha); return d.getMonth() === mes && d.getFullYear() === anio; })
    .reduce((s, i) => s + (i.monto || 0), 0);
  const egresosMes = state.finanzas.egresos
    .filter((e) => { const d = new Date(e.fecha); return d.getMonth() === mes && d.getFullYear() === anio; })
    .reduce((s, e) => s + (e.monto || 0), 0);
  const saldoMes = ingresosMes - egresosMes;
  const deudaPendiente = state.alumnos
    .filter((a) => a.estado === "activo")
    .reduce((s, a) => s + Math.max(0, (a.precio || 0) - (a.pagado || 0)), 0);
  const clasesPendientes = state.alumnos
    .filter((a) => a.estado === "activo")
    .reduce((s, a) => s + Math.max(0, (a.clases_total || 0) - (a.clases_dadas || 0)), 0);
  return { alumnosActivos, totalAlumnos, ingresosMes, egresosMes, saldoMes, deudaPendiente, clasesPendientes };
}

function buildSystemPrompt(state) {
  const m = computeMetrics(state);
  const now = new Date();
  const dateStr = now.toLocaleDateString("es-UY", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  return `Sos el Director Ejecutivo de GRECO, academia de conductores en Salinas, Canelones, Uruguay. Tu rol exclusivo es ser el jefe directo de Pablo, el dueño-operador que trabaja solo.

HOY ES: ${dateStr}

CONTEXTO DE GRECO:
- Dos vehículos: Suzuki (clases manuales) y JMEV3 eléctrico (aguardando autorización municipal, pendiente instalación de limpiaparabrisas trasero)
- Asistente virtual de WhatsApp llamada Natalia, que atiende prospectos y filtra consultas
- Pablo lo hace todo: instrucción, administración, redes sociales
- Sede: Salinas, Canelones, Uruguay

REFLEXIÓN FUNDADOR (contexto permanente de auditoría):
${state.reflexion_fundador || ""}

ESTADO COMPLETO DE LA ACADEMIA:
${JSON.stringify(state, null, 2)}

MÉTRICAS ACTUALES:
- Alumnos activos: ${m.alumnosActivos} (total histórico: ${m.totalAlumnos})
- Ingresos este mes: $${m.ingresosMes.toLocaleString()}
- Egresos este mes: $${m.egresosMes.toLocaleString()}
- Saldo del mes: $${m.saldoMes.toLocaleString()} ${m.saldoMes < 0 ? "⚠ NEGATIVO" : ""}
- Deuda pendiente de cobrar: $${m.deudaPendiente.toLocaleString()}
- Clases pendientes de dar: ${m.clasesPendientes}

TU MISIÓN:
1. Si inicializado=false → hacé el onboarding: recopilá datos reales uno por uno, con preguntas concretas
2. Si inicializado=true → operá como jefe: controlá, exigí, auditá, dirigí con profundidad estratégica real
3. Siempre registrás los datos que Pablo da en las actualizaciones del estado
3b. Cuando se registra un alumno nuevo, calculás automáticamente su egreso estimado así:
    - Preguntás la frecuencia de clases acordada (cuántas por semana)
    - Calculás: clases_total / frecuencia_semanal = semanas hasta egreso
    - Sumás las semanas a la fecha de ingreso y das una fecha estimada de examen
    - Registrás en las notas del alumno: "Egreso estimado inicial: semana del DD/MM/YYYY (frecuencia X cls/semana)"
    - Avisás si esa fecha es realista o si requiere ajuste
    - Si Pablo ajusta la estimación, registrás la fecha ajustada como definitiva
3c. En cada reporte diario que incluya clases dadas, recalculás el egreso proyectado:
    - Ritmo real = clases_dadas / semanas_transcurridas_desde_ingreso
    - Egreso recalculado = fecha_ingreso + (clases_total / ritmo_real) en semanas
    - Si el egreso recalculado se aleja más de 2 semanas del estimado inicial, lo mencionás explícitamente
    - En auditorías e informes quincenal mostrás: fecha estimada original vs fecha recalculada por ritmo real
4. Detectás evasivas, inconsistencias y las nombrás sin drama y sin piedad
5. Das UNA directiva concreta al final de cada respuesta operativa: "Lo que vas a hacer ahora es:"
6. En auditorías: veredicto numérico 0-100 + una línea de conclusión + puntos críticos con fundamento estratégico
7. Si Pablo escribe "exportar estado" o "exportá el estado", respondés SOLO con el JSON completo del estado actual entre tres backticks, sin texto adicional antes ni después. Ese JSON lo va a copiar y pegar en otra conversación para generar el informe quincenal en PDF.

MARCO ESTRATÉGICO QUE APLICÁS:
Operás con el rigor de un MBA de primer nivel aplicado a una PyME de servicios. Esto significa que cada análisis considera:
- Estructura de costos fijos vs variables y punto de equilibrio operativo (break-even)
- Valor de vida del cliente (LTV: cuánto vale un alumno que egresa vs uno que se eterniza)
- Costo de adquisición de cliente (CAC) y eficiencia del canal Natalia
- Rotación de capacidad: cuántos alumnos puede procesar la academia por mes según horas disponibles
- Concentración de riesgo: dependencia de pocos alumnos, horarios o ingresos
- Flujo de caja real vs ingresos cobrados por adelantado (distinción crítica en este modelo de negocio)
- Precio como señal de posicionamiento, no solo como cobertura de costos
- Palancas de crecimiento: qué mueve el resultado con menos esfuerzo

Cuando un concepto tiene nombre técnico real, lo usás en rioplatense directo y agregás el término entre paréntesis. No para impresionar, sino para que Pablo sepa que lo que está haciendo tiene respaldo en el mundo real.

TU ESTILO:
- Rioplatense directo, sobrio, sin adornos ni consolación
- Hacés UNA pregunta a la vez cuando necesitás datos
- Sin listas con guiones. Texto continuo, párrafos cortos
- Sarcasmo inteligente cuando la situación lo amerita, nunca cruel
- Sos exigente porque te importa el resultado, no para humillar

DISTANCIA OPERATIVA (regla permanente):
Cuando hablás de alumnos, siempre los referenciás por su ID seguido del nombre entre paréntesis: "a08 (Lorena)" o "a03 (Juan Manuel)". El ID va primero siempre. Nunca solo el nombre. Nunca preguntás por el estado emocional ni personal de ningún alumno. Solo hechos: clases pendientes, fechas, pagos, avance. El encuadre correcto es "a08 (Lorena) tiene 5 clases pendientes y examen en abril". Pablo tomó esta decisión conscientemente para entrenar distancia operativa y el Director la respeta y refuerza sin excepción.

FORMATO DE RESPUESTA: Siempre JSON válido con exactamente esta estructura:
{
  "mensaje": "tu respuesta en texto plano, sin markdown, sin asteriscos, sin guiones de lista",
  "actualizaciones": null o objeto parcial con los campos que cambian,
  "modo": "onboarding" o "operacion" o "auditoria" o "finanzas"
}

CRÍTICO: El campo "mensaje" debe contener SOLO el texto conversacional para Pablo. NUNCA incluyas JSON, datos técnicos, arrays ni objetos dentro del campo "mensaje". Las actualizaciones van ÚNICAMENTE en el campo "actualizaciones", nunca mezcladas en el texto del mensaje.

Cuando actualizás alumnos, mandá el array COMPLETO de alumnos. Cada alumno tiene: {id, nombre, paquete, precio, pagado, clases_total, clases_dadas, estado, ingreso_fecha}.
Cuando marcás inicializado como true, incluilo en actualizaciones: {"inicializado": true}.`;
}

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=VT323&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0d1a0d;
    --surface: #111f11;
    --surface2: #162416;
    --border: #2a4a2a;
    --green: #39ff14;
    --green-dim: #1a8c0a;
    --green-muted: #2a6a2a;
    --green-dark: #0f3a0f;
    --amber: #ffb700;
    --red: #ff3a1a;
    --text: #c8f0c8;
    --text-dim: #7ab07a;
    --muted: #3a6a3a;
    --scanline: rgba(0,255,0,0.025);
  }

  html, body, #root { height: 100%; }

  .gc-root {
    background: var(--bg);
    color: var(--text);
    height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: 'Share Tech Mono', monospace;
    overflow: hidden;
    position: relative;
  }

  .gc-root::before {
    content: '';
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: repeating-linear-gradient(0deg, var(--scanline) 0px, var(--scanline) 1px, transparent 1px, transparent 4px);
    pointer-events: none;
    z-index: 10;
  }

  .gc-header {
    background: var(--surface);
    border-bottom: 1px solid var(--green-dim);
    padding: 8px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
  }

  .gc-title {
    font-family: 'VT323', monospace;
    font-size: 32px;
    color: var(--green);
    letter-spacing: 4px;
    text-shadow: 0 0 10px var(--green), 0 0 20px var(--green-dim);
    line-height: 1;
  }

  .gc-subtitle {
    font-size: 10px;
    color: var(--text-dim);
    letter-spacing: 2px;
    margin-top: 2px;
  }

  .gc-header-actions { display: flex; gap: 8px; }

  .gc-btn {
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    letter-spacing: 1px;
    padding: 5px 12px;
    border: 1px solid var(--green-muted);
    background: transparent;
    color: var(--text-dim);
    cursor: pointer;
    text-transform: uppercase;
    transition: all 0.1s;
  }
  .gc-btn:hover { border-color: var(--green); color: var(--green); background: var(--green-dark); text-shadow: 0 0 8px var(--green); }
  .gc-btn-report { border-color: var(--green-muted); color: var(--text-dim); }
  .gc-btn-report:hover { border-color: var(--green); color: var(--green); background: var(--green-dark); }
  .gc-btn-audit { border-color: var(--green-dim); color: var(--green); background: var(--green-dark); }
  .gc-btn-audit:hover { background: var(--green-dim); color: var(--bg); text-shadow: none; }

  .gc-body { display: flex; flex: 1; overflow: hidden; }

  .gc-sidebar {
    width: 210px;
    background: var(--surface);
    border-right: 1px solid var(--border);
    padding: 14px;
    overflow-y: auto;
    flex-shrink: 0;
  }

  @media (max-width: 600px) { .gc-sidebar { display: none; } }

  .gc-sidebar-section { margin-bottom: 18px; }

  .gc-sidebar-label {
    font-size: 9px;
    letter-spacing: 3px;
    color: var(--muted);
    text-transform: uppercase;
    border-bottom: 1px solid var(--border);
    padding-bottom: 5px;
    margin-bottom: 10px;
  }

  .gc-metric { margin-bottom: 10px; }
  .gc-metric-label { font-size: 9px; color: var(--muted); margin-bottom: 1px; letter-spacing: 1px; }
  .gc-metric-value { font-family: 'VT323', monospace; font-size: 24px; color: var(--text-dim); line-height: 1; }
  .gc-metric-value.positive { color: var(--green); text-shadow: 0 0 8px var(--green-dim); }
  .gc-metric-value.negative { color: var(--red); text-shadow: 0 0 8px var(--red); }
  .gc-metric-value.warning { color: var(--amber); text-shadow: 0 0 8px var(--amber); }

  .gc-alumno-item { font-size: 10px; padding: 4px 0; border-bottom: 1px solid #1a2a1a; color: var(--text-dim); }
  .gc-alumno-item span { color: var(--muted); display: block; font-size: 9px; }

  .gc-chat { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

  .gc-messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .gc-messages::-webkit-scrollbar { width: 4px; }
  .gc-messages::-webkit-scrollbar-track { background: var(--bg); }
  .gc-messages::-webkit-scrollbar-thumb { background: var(--border); }

  .gc-msg { max-width: 88%; display: flex; flex-direction: column; gap: 3px; }
  .gc-msg.boss { align-self: flex-start; }
  .gc-msg.user { align-self: flex-end; }

  .gc-msg-header { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--muted); }
  .gc-msg.boss .gc-msg-header { color: var(--green-dim); text-shadow: 0 0 6px var(--green-dim); }

  .gc-msg-bubble { padding: 10px 14px; font-size: 13px; line-height: 1.65; border: 1px solid var(--border); background: var(--surface2); }
  .gc-msg.boss .gc-msg-bubble { border-left: 2px solid var(--green-dim); color: var(--text); }
  .gc-msg.user .gc-msg-bubble { border-left: 2px solid var(--green-muted); color: var(--text-dim); background: var(--surface); }

  .gc-msg-modo { font-size: 8px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); opacity: 0.5; }

  .gc-input-area {
    border-top: 1px solid var(--border);
    padding: 12px 16px;
    background: var(--surface);
    display: flex;
    gap: 8px;
    align-items: flex-end;
    flex-shrink: 0;
  }

  .gc-prompt-symbol {
    font-family: 'VT323', monospace;
    font-size: 22px;
    color: var(--green);
    text-shadow: 0 0 8px var(--green);
    line-height: 1;
    padding-bottom: 10px;
    flex-shrink: 0;
  }

  .gc-textarea {
    flex: 1;
    background: var(--bg);
    border: 1px solid var(--green-muted);
    color: var(--green);
    font-family: 'Share Tech Mono', monospace;
    font-size: 13px;
    padding: 8px 12px;
    resize: none;
    line-height: 1.5;
    min-height: 38px;
    max-height: 100px;
    outline: none;
    transition: border-color 0.1s, box-shadow 0.1s;
    caret-color: var(--green);
    -webkit-appearance: none;
    border-radius: 0;
  }
  .gc-textarea:focus { border-color: var(--green); box-shadow: 0 0 8px var(--green-dark); }
  .gc-textarea::placeholder { color: var(--muted); }

  .gc-send {
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    letter-spacing: 2px;
    padding: 8px 16px;
    background: var(--green-dark);
    border: 1px solid var(--green-dim);
    color: var(--green);
    cursor: pointer;
    text-transform: uppercase;
    transition: all 0.1s;
    height: 38px;
    text-shadow: 0 0 6px var(--green-dim);
    -webkit-appearance: none;
    border-radius: 0;
  }
  .gc-send:hover { background: var(--green-dim); color: var(--bg); text-shadow: none; box-shadow: 0 0 12px var(--green-dim); }
  .gc-send:disabled { background: transparent; border-color: var(--border); color: var(--muted); text-shadow: none; cursor: default; }

  .gc-loading { display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--green-dim); letter-spacing: 2px; text-transform: uppercase; }

  .gc-cursor { display: inline-block; width: 8px; height: 14px; background: var(--green); animation: blink-cursor 0.8s steps(1) infinite; box-shadow: 0 0 6px var(--green); }

  @keyframes blink-cursor { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

  .gc-status-dot { width: 6px; height: 6px; background: var(--green); border-radius: 50%; display: inline-block; margin-right: 6px; box-shadow: 0 0 6px var(--green); animation: pulse 2s infinite; }
  .gc-status-dot.pending { background: var(--amber); box-shadow: 0 0 6px var(--amber); }

  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }


  .gc-btn-panel { display: none; }
  @media (max-width: 600px) {
    .gc-btn-panel { display: inline-block; border-color: var(--green-muted); color: var(--text-dim); }
  }

  .gc-mobile-panel {
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 12px 16px;
    display: none;
    flex-direction: column;
    gap: 10px;
    flex-shrink: 0;
  }

  @media (max-width: 600px) {
    .gc-mobile-panel { display: flex; }
  }

  .gc-mobile-row {
    display: flex;
    gap: 8px;
    justify-content: space-between;
  }

  .gc-mobile-metric {
    flex: 1;
    background: var(--surface2);
    border: 1px solid var(--border);
    padding: 8px;
    text-align: center;
  }

  .gc-mobile-metric .gc-metric-value { font-size: 20px; }
  .gc-mobile-metric .gc-metric-label { font-size: 8px; }

  .gc-mobile-alumnos {
    border-top: 1px solid var(--border);
    padding-top: 8px;
  }

  .gc-sidebar::-webkit-scrollbar { width: 3px; }
  .gc-sidebar::-webkit-scrollbar-track { background: transparent; }
  .gc-sidebar::-webkit-scrollbar-thumb { background: var(--border); }

  .gc-empty { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--green-muted); gap: 6px; }
  .gc-big-title { font-family: 'VT323', monospace; font-size: 80px; color: var(--green-dark); line-height: 1; text-shadow: 0 0 30px var(--green-dark); letter-spacing: 8px; }
  .gc-init-text { font-size: 10px; letter-spacing: 4px; color: var(--muted); }
`;

export default function GRECOCommand() {
  const [academyState, setAcademyState] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [showMobilePanel, setShowMobilePanel] = useState(false);
  const chatEndRef = useRef(null);
  const hasGreeted = useRef(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    let state = { ...seededState };
    let conv = [];
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s) {
        const parsed = JSON.parse(s);
        state = parsed.inicializado ? parsed : { ...seededState };
      }
    } catch {}
    try { const c = localStorage.getItem(CONV_KEY); if (c) conv = JSON.parse(c); } catch {}
    setAcademyState(state);
    setMessages(conv);
    setReady(true);
  }, []);

  const saveState = useCallback((s) => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {} }, []);
  const saveConv = useCallback((msgs) => { try { localStorage.setItem(CONV_KEY, JSON.stringify(msgs.slice(-30))); } catch {} }, []);

  const callBoss = useCallback(async (userMsg, isGreeting = false, currentState, currentMessages) => {
    setLoading(true);
    const updatedMessages = isGreeting ? currentMessages : [...currentMessages, { role: "user", content: userMsg }];
    if (!isGreeting) setMessages(updatedMessages);
    const apiMessages = isGreeting
      ? [{ role: "user", content: "Iniciá el sistema ahora." }]
      : updatedMessages.map((m) => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch("/api/boss", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: buildSystemPrompt(currentState),
          messages: apiMessages,
        }),
      });
      const data = await res.json();
      const raw = data.content?.[0]?.text || "";
      let parsed = { mensaje: raw, actualizaciones: null, modo: "operacion" };
      try {
        // Try to extract JSON from the raw response - handle cases where model wraps in text
        let jsonStr = raw.replace(/```json|```/g, "").trim();
        // If raw starts with { "mensaje": it means the model returned JSON as plain text
        // Find the outermost JSON object
        const firstBrace = jsonStr.indexOf("{");
        const lastBrace = jsonStr.lastIndexOf("}");
        if (firstBrace !== -1 && lastBrace !== -1) {
          jsonStr = jsonStr.substring(firstBrace, lastBrace + 1);
        }
        const attempt = JSON.parse(jsonStr);
        if (attempt && typeof attempt.mensaje === "string") {
          // Clean mensaje - remove any leaked JSON data after the conversational text
          let msg = attempt.mensaje;
          // Find where JSON data starts leaking into the message
          const leakPatterns = [
            /",\s*"actualizaciones"/,
            /",\s*"alumnos"\s*:/,
            /\{\s*"id"\s*:/,
            /\[\s*\{\s*"id"/
          ];
          for (const pattern of leakPatterns) {
            const idx = msg.search(pattern);
            if (idx > 0) { msg = msg.substring(0, idx).trim(); break; }
          }
          // Remove trailing comma or quote
          msg = msg.replace(/[,"]\s*$/, "").trim();
          parsed = { ...attempt, mensaje: msg || "Procesado." };
        }
      } catch(e) {
        // Last resort: try to find "mensaje" value manually via regex
        try {
          const msgMatch = raw.match(/"mensaje"\s*:\s*"((?:[^"\\]|\\.)*)"/);
          if (msgMatch) {
            parsed = { mensaje: msgMatch[1], actualizaciones: null, modo: "operacion" };
          }
        } catch(e2) {}
      }
      let newState = currentState;
      if (parsed.actualizaciones) {
        newState = mergeDeep(currentState, parsed.actualizaciones);
        setAcademyState(newState);
        saveState(newState);
      }
      const bossMsg = { role: "assistant", content: parsed.mensaje || "...", modo: parsed.modo || "operacion" };
      const finalMessages = [...updatedMessages, bossMsg];
      setMessages(finalMessages);
      saveConv(finalMessages);
    } catch {
      const errMsg = { role: "assistant", content: "Error de conexión. Revisá tu conexión e intentá de nuevo.", modo: "operacion" };
      setMessages([...updatedMessages, errMsg]);
    }
    setLoading(false);
  }, [saveState, saveConv]);

  useEffect(() => {
    if (ready && academyState && !hasGreeted.current) {
      hasGreeted.current = true;
      if (messages.length === 0) callBoss("", true, academyState, []);
    }
  }, [ready, academyState]);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  function handleKeyDown(e) { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }

  function handleSend() {
    const msg = input.trim();
    if (!msg || loading || !academyState) return;
    setInput("");
    callBoss(msg, false, academyState, messages);
  }

  async function generateReport() {
    if (loading || !academyState) return;
    setLoading(true);
    const m = computeMetrics(academyState);
    const now = new Date();
    const dateStr = now.toLocaleDateString("es-UY", { day: "2-digit", month: "2-digit", year: "numeric" });
    const ingresosFijos = academyState.config?.egresos_fijos_mensuales || 35800;
    const publicidad = academyState.config?.costo_publicidad_promedio || 2750;
    const dgi = Math.round(m.ingresosMes * 0.03);
    const totalEgresos = ingresosFijos + publicidad + dgi;
    const saldoReal = m.ingresosMes - totalEgresos;
    try {
      const res = await fetch("/api/boss", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: buildSystemPrompt(academyState),
          messages: [{ role: "user", content: "Generá un informe ejecutivo quincenal. Respondé SOLO con JSON válido con esta estructura exacta: {\"periodo\": \"string\", \"puntuacion\": number, \"diagnostico\": \"string\", \"puntos_criticos\": [{\"numero\": 1, \"descripcion\": \"string\", \"accion\": \"string\", \"prioridad\": \"ALTA\"}], \"directiva_principal\": \"string\", \"metas\": \"string\"}. Fecha de hoy: " + dateStr }],
        }),
      });
      const data = await res.json();
      const raw = data.content?.[0]?.text || "";
      let reportData = null;
      try {
        const clean = raw.replace(/```json|```/g, "").trim();
        reportData = JSON.parse(clean);
      } catch(e) {}
      if (reportData) {
        buildAndDownloadPDF(reportData, dateStr, m, ingresosFijos, publicidad, dgi, totalEgresos, saldoReal);
      } else {
        alert("Error generando el informe. Intentá de nuevo.");
      }
    } catch(e) {
      alert("Error de conexión al generar el informe.");
    }
    setLoading(false);
  }

  function buildAndDownloadPDF(d, dateStr, m, ingresosFijos, publicidad, dgi, totalEgresos, saldoReal) {
    const saldoStr = (saldoReal >= 0 ? "+" : "") + "$" + saldoReal.toLocaleString();
    const saldoColor = saldoReal >= 0 ? "#1a7a1a" : "#8a1a1a";
    const alumnosActivos = academyState.alumnos.filter(a => a.estado === "activo");
    const alumnosRows = alumnosActivos.map(a => {
      const rest = (a.clases_total || 0) - (a.clases_dadas || 0);
      return "<tr><td>" + (a.id||"") + "</td><td>" + a.nombre + "</td><td style='text-align:center'>" + (a.clases_dadas||0) + "</td><td style='text-align:center'>" + rest + "</td><td>" + (a.estado||"activo") + "</td><td>" + (a.notas||"—") + "</td></tr>";
    }).join("");
    const criticosRows = (d.puntos_criticos || []).map(p => {
      const color = p.prioridad === "ALTA" ? "#8a1a1a" : p.prioridad === "MEDIA" ? "#7a4a00" : "#333";
      return "<tr><td>" + p.numero + "</td><td>" + p.descripcion + "</td><td>" + p.accion + "</td><td style='color:" + color + ";font-weight:bold'>" + p.prioridad + "</td></tr>";
    }).join("");
    const html = "<!DOCTYPE html><html><head><meta charset='UTF-8'><style>body{font-family:Arial,sans-serif;font-size:10px;color:#1a1a1a;margin:0;padding:20px}.header{border-bottom:3px solid #1a4a1a;padding-bottom:10px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:flex-end}.brand{font-size:18px;font-weight:bold;color:#1a4a1a}.brand-sub{font-size:9px;color:#555;margin-top:2px}.report-title{text-align:right;font-size:12px;font-weight:bold}.report-sub{font-size:8px;color:#555;margin-top:2px}.veredicto{background:#e8f5e8;border:1px solid #2a6a2a;padding:10px;display:flex;gap:16px;align-items:center;margin-bottom:16px}.puntuacion{font-size:36px;font-weight:bold;color:#1a4a1a;min-width:70px;text-align:center}.sec-title{font-size:8px;font-weight:bold;color:#2a6a2a;letter-spacing:2px;text-transform:uppercase;border-bottom:1px solid #ccddcc;padding-bottom:3px;margin-bottom:8px;margin-top:14px}table{width:100%;border-collapse:collapse;margin-bottom:4px}th{background:#1a4a1a;color:white;font-size:8px;padding:4px 6px;text-align:left}td{font-size:8px;padding:4px 6px;border-bottom:1px solid #ccddcc}tr:nth-child(even) td{background:#f0f7f0}.total-row td{font-weight:bold;background:#e8f5e8!important}.directiva{background:#e8f5e8;border-left:3px solid #1a4a1a;padding:8px;margin-top:10px;font-size:9px}.footer{border-top:1px solid #ccddcc;padding-top:6px;font-size:7px;color:#aaa;text-align:center;margin-top:20px}</style></head><body>"
      + "<div class='header'><div><div class='brand'>GRECO</div><div class='brand-sub'>Academia de Conductores · Salinas, Canelones, UY</div></div><div><div class='report-title'>INFORME EJECUTIVO QUINCENAL</div><div class='report-sub'>Período: " + d.periodo + " · Generado: " + dateStr + "</div></div></div>"
      + "<div class='veredicto'><div class='puntuacion'>" + d.puntuacion + "<span style='font-size:14px'>/100</span></div><div><div style='font-size:8px;font-weight:bold;color:#2a6a2a;letter-spacing:1px'>PUNTUACIÓN OPERATIVA</div><div style='font-size:10px;line-height:1.5'>" + d.diagnostico + "</div></div></div>"
      + "<div class='sec-title'>Estado de cartera de alumnos</div><table><thead><tr><th>ID</th><th>Alumno</th><th>Cls dadas</th><th>Cls rest.</th><th>Estado</th><th>Notas / Próximo evento</th></tr></thead><tbody>" + alumnosRows + "</tbody></table>"
      + "<div class='sec-title'>Resumen financiero del período</div><table><thead><tr><th>Concepto</th><th style='text-align:right'>Monto (UYU)</th></tr></thead><tbody>"
      + "<tr><td>Ingresos del período</td><td style='text-align:right'>$" + (m.ingresosMes||0).toLocaleString() + "</td></tr>"
      + "<tr><td>Egresos fijos (combustible, cochera, seguro, cuota auto, mantenimiento, BPS)</td><td style='text-align:right'>$" + ingresosFijos.toLocaleString() + "</td></tr>"
      + "<tr><td>Publicidad (Instagram / Facebook / WhatsApp)</td><td style='text-align:right'>$" + publicidad.toLocaleString() + "</td></tr>"
      + "<tr><td>DGI (3% de ingresos)</td><td style='text-align:right'>$" + dgi.toLocaleString() + "</td></tr>"
      + "<tr class='total-row'><td>SALDO NETO DEL PERÍODO</td><td style='text-align:right;color:" + saldoColor + "'>" + saldoStr + "</td></tr>"
      + "</tbody></table>"
      + "<div class='sec-title'>Cumplimiento de metas</div><p style='font-size:9px;color:#555;line-height:1.5'>" + (d.metas||"Sin metas formales cargadas aún.") + "</p>"
      + "<div class='sec-title'>Puntos críticos y directiva</div><table><thead><tr><th>#</th><th>Punto crítico</th><th>Acción requerida</th><th>Prioridad</th></tr></thead><tbody>" + criticosRows + "</tbody></table>"
      + "<div class='directiva'><strong>DIRECTIVA PRINCIPAL:</strong> " + d.directiva_principal + "</div>"
      + "<div class='footer'>GRECO Academia de Conductores · Salinas, Canelones, Uruguay · GRECO Command · " + dateStr + "</div>"
      + "</body></html>";
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "GRECO_Informe_" + dateStr.replace(/\//g, "-") + ".html";
    a.click();
    URL.revokeObjectURL(url);
  }


  function triggerAudit() {
    if (loading || !academyState) return;
    callBoss("Hacé una auditoría completa de la academia ahora mismo. Quiero el veredicto, los puntos críticos y la directiva.", false, academyState, messages);
  }

  function resetSystem() {
    if (!confirm("¿Reiniciar todo el sistema? Se pierden todos los datos cargados.")) return;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(CONV_KEY);
    const fresh = { ...defaultState };
    setAcademyState(fresh);
    setMessages([]);
    hasGreeted.current = false;
    setTimeout(() => { hasGreeted.current = false; callBoss("", true, fresh, []); }, 100);
  }

  if (!ready || !academyState) {
    return <div style={{ background: "#0d1a0d", color: "#2a6a2a", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", fontSize: "11px", letterSpacing: "4px" }}>INICIANDO...</div>;
  }

  const metrics = computeMetrics(academyState);
  const alumnosActivos = academyState.alumnos.filter((a) => a.estado === "activo");

  return (
    <div className="gc-root">
      <div className="gc-header">
        <div>
          <div className="gc-title">GRECO COMMAND</div>
          <div className="gc-subtitle">
            <span className={`gc-status-dot ${academyState.inicializado ? "" : "pending"}`} />
            {academyState.inicializado ? "SISTEMA OPERATIVO" : "CONFIGURACIÓN INICIAL"} · SALINAS, UY
          </div>
        </div>
        <div className="gc-header-actions">
          <button className="gc-btn gc-btn-panel" onClick={() => setShowMobilePanel(p => !p)}>PANEL</button>
          <button className="gc-btn gc-btn-report" onClick={generateReport} disabled={loading}>📄 INFORME</button>
          <button className="gc-btn gc-btn-audit" onClick={triggerAudit} disabled={loading}>▶ AUDITAR</button>
          <button className="gc-btn" onClick={resetSystem} disabled={loading}>RESET</button>
        </div>
      </div>

      {showMobilePanel && (
        <div className="gc-mobile-panel">
          <div className="gc-mobile-row">
            <div className="gc-mobile-metric">
              <div className="gc-metric-label">INGRESOS</div>
              <div className={`gc-metric-value ${metrics.ingresosMes > 0 ? "positive" : ""}`}>${metrics.ingresosMes.toLocaleString()}</div>
            </div>
            <div className="gc-mobile-metric">
              <div className="gc-metric-label">EGRESOS</div>
              <div className={`gc-metric-value ${metrics.egresosMes > 0 ? "warning" : ""}`}>${metrics.egresosMes.toLocaleString()}</div>
            </div>
            <div className="gc-mobile-metric">
              <div className="gc-metric-label">SALDO</div>
              <div className={`gc-metric-value ${metrics.saldoMes >= 0 ? "positive" : "negative"}`}>${metrics.saldoMes.toLocaleString()}</div>
            </div>
          </div>
          <div className="gc-mobile-row">
            <div className="gc-mobile-metric">
              <div className="gc-metric-label">ACTIVOS</div>
              <div className={`gc-metric-value ${metrics.alumnosActivos > 0 ? "positive" : ""}`}>{metrics.alumnosActivos}</div>
            </div>
            <div className="gc-mobile-metric">
              <div className="gc-metric-label">CLASES PEND.</div>
              <div className={`gc-metric-value ${metrics.clasesPendientes > 0 ? "warning" : ""}`}>{metrics.clasesPendientes}</div>
            </div>
            <div className="gc-mobile-metric">
              <div className="gc-metric-label">DEUDA</div>
              <div className={`gc-metric-value ${metrics.deudaPendiente > 0 ? "warning" : ""}`}>${metrics.deudaPendiente.toLocaleString()}</div>
            </div>
          </div>
          {alumnosActivos.length > 0 && (
            <div className="gc-mobile-alumnos">
              <div className="gc-sidebar-label">// alumnos activos</div>
              {alumnosActivos.map((a) => (
                <div key={a.id} className="gc-alumno-item">
                  {a.nombre}
                  <span>{a.clases_dadas || 0}/{a.clases_total || 0} cls · ${((a.precio || 0) - (a.pagado || 0)).toLocaleString()} pend.</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="gc-body">
        <div className="gc-sidebar">
          <div className="gc-sidebar-section">
            <div className="gc-sidebar-label">// este mes</div>
            <div className="gc-metric">
              <div className="gc-metric-label">INGRESOS</div>
              <div className={`gc-metric-value ${metrics.ingresosMes > 0 ? "positive" : ""}`}>${metrics.ingresosMes.toLocaleString()}</div>
            </div>
            <div className="gc-metric">
              <div className="gc-metric-label">EGRESOS</div>
              <div className={`gc-metric-value ${metrics.egresosMes > 0 ? "warning" : ""}`}>${metrics.egresosMes.toLocaleString()}</div>
            </div>
            <div className="gc-metric">
              <div className="gc-metric-label">SALDO</div>
              <div className={`gc-metric-value ${metrics.saldoMes >= 0 ? "positive" : "negative"}`}>${metrics.saldoMes.toLocaleString()}</div>
            </div>
          </div>

          <div className="gc-sidebar-section">
            <div className="gc-sidebar-label">// operación</div>
            <div className="gc-metric">
              <div className="gc-metric-label">ALUMNOS ACTIVOS</div>
              <div className={`gc-metric-value ${metrics.alumnosActivos > 0 ? "positive" : ""}`}>{metrics.alumnosActivos}</div>
            </div>
            <div className="gc-metric">
              <div className="gc-metric-label">CLASES PENDIENTES</div>
              <div className={`gc-metric-value ${metrics.clasesPendientes > 0 ? "warning" : ""}`}>{metrics.clasesPendientes}</div>
            </div>
            <div className="gc-metric">
              <div className="gc-metric-label">DEUDA A COBRAR</div>
              <div className={`gc-metric-value ${metrics.deudaPendiente > 0 ? "warning" : ""}`}>${metrics.deudaPendiente.toLocaleString()}</div>
            </div>
          </div>

          {alumnosActivos.length > 0 && (
            <div className="gc-sidebar-section">
              <div className="gc-sidebar-label">// alumnos activos</div>
              {alumnosActivos.map((a) => (
                <div key={a.id} className="gc-alumno-item">
                  {a.nombre}
                  <span>{a.clases_dadas || 0}/{a.clases_total || 0} cls · ${((a.precio || 0) - (a.pagado || 0)).toLocaleString()} pend.</span>
                </div>
              ))}
            </div>
          )}

          {academyState.metas.length > 0 && (
            <div className="gc-sidebar-section">
              <div className="gc-sidebar-label">// metas</div>
              {academyState.metas.map((meta) => (
                <div key={meta.id} className="gc-alumno-item">
                  {meta.descripcion}
                  <span>{meta.actual || 0} / {meta.target} {meta.unidad}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="gc-chat">
          <div className="gc-messages">
            {messages.length === 0 && !loading && (
              <div className="gc-empty">
                <div className="gc-big-title">GRECO</div>
                <div className="gc-init-text">CONECTANDO CON EL DIRECTOR...</div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`gc-msg ${msg.role === "assistant" ? "boss" : "user"}`}>
                <div className="gc-msg-header">{msg.role === "assistant" ? "▶ DIRECTOR" : "$ PABLO"}</div>
                <div className="gc-msg-bubble">{msg.content}</div>
                {msg.role === "assistant" && msg.modo && <div className="gc-msg-modo">// {msg.modo}</div>}
              </div>
            ))}

            {loading && (
              <div className="gc-msg boss">
                <div className="gc-msg-header">▶ DIRECTOR</div>
                <div className="gc-msg-bubble">
                  <div className="gc-loading">procesando <span className="gc-cursor" /></div>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          <div className="gc-input-area">
            <div className="gc-prompt-symbol">$</div>
            <textarea
              className="gc-textarea"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="respondé al director... (enter para enviar)"
              disabled={loading}
              rows={1}
            />
            <button className="gc-send" onClick={handleSend} disabled={loading || !input.trim()}>ENVIAR</button>
          </div>
        </div>
      </div>
    </div>
  );
}
