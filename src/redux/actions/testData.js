// utils/mockMeasurementData.js
export const generateMockData = (source) => {
    const baseDate = new Date("2024-11-28T09:00:00");
    
    // Different sensor sets for each source
    const source1Sensors = [
      "Temperatura 2",
      "Frecuencia 4 Espejo",
      "Flujo 2",
      "Presion 2",
      "Direccion del Viento",
      "Reserva 10",
      "Frecuencia 1 Plataforma M12 Motor AMTP",
      "Posición objetivo espejo 5"
    ];
  
    const source2Sensors = [
      "Temperatura Torre",
      "Frecuencia Rotor",
      "Flujo Refrigerante",
      "Presion Aceite",
      "Velocidad del Viento",
      "Voltaje Bateria",
      "Corriente Generador",
      "Angulo Inclinación"
    ];
  
    const sensors = source === 1 ? source1Sensors : source2Sensors;
    const isSource1 = source === 1;
  
    return Array.from({ length: 12 }, (_, i) => {
      const date = new Date(baseDate);
      date.setMinutes(date.getMinutes() + i * 2);
      
      // Different value patterns for each source
      let measurement;
      if (isSource1) {
        // Source 1 pattern: mixed zeros and moderate values
        measurement = i % 3 === 0 ? 0 : Math.floor(Math.random() * 100);
        
        // Special cases for specific sensors
        if (sensors[i % sensors.length].includes('Temperatura')) {
          measurement = 20 + Math.floor(Math.random() * 15); // 20-35°C
        } else if (sensors[i % sensors.length].includes('Frecuencia')) {
          measurement = 48 + Math.floor(Math.random() * 5); // 48-53Hz
        }
      } else {
        // Source 2 pattern: higher values with no zeros
        measurement = 50 + Math.floor(Math.random() * 200);
        
        // Special cases for specific sensors
        if (sensors[i % sensors.length].includes('Temperatura')) {
          measurement = 30 + Math.floor(Math.random() * 20); // 30-50°C
        } else if (sensors[i % sensors.length].includes('Velocidad')) {
          measurement = 5 + Math.floor(Math.random() * 15); // 5-20 m/s
        } else if (sensors[i % sensors.length].includes('Voltaje')) {
          measurement = 220 + Math.floor(Math.random() * 40); // 220-260V
        }
      }
  
      return {
        timestamp: date.toISOString(),
        sensor: sensors[i % sensors.length],
        measurement: measurement,
        source: source
      };
    });
  };