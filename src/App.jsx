import { useRef } from 'react';
import { generarChecklistPDF } from './utils/generarChecklistPDF';
import './App.css';

function App() {
  const canvasRef = useRef(null);

  const handleGenerate = () => {
    const canvas = canvasRef.current;
    const signature = canvas.toDataURL();
    generarChecklistPDF({
      cliente: 'Cliente Real',
      tecnico: 'Técnico Real',
      fecha: '2025-07-20',
      respuestas: [
        { pregunta: '¿Se ha informado a la CRA sobre el inicio de las pruebas?', respuesta: 'Sí' },
        { pregunta: '¿Se ha obtenido el registro de las incidencias del sistema de los últimos 15 días?', respuesta: 'No' },
      ],
      firma_base64: signature
    });
  };

  return (
    <div className="App">
      <h1>Generador de PDF Checklist (pdf-lib)</h1>
      <canvas ref={canvasRef} width="300" height="150" style={{ border: '1px solid #000' }}></canvas>
      <button onClick={handleGenerate}>Generar PDF</button>
    </div>
  );
}

export default App;
