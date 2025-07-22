import { generarChecklistPDF } from './utils/generarChecklistPDF';
import './App.css';

function App() {
  const handleGenerate = () => {
    generarChecklistPDF({
      cliente: 'Cliente Demo',
      tecnico: 'Técnico Demo',
      fecha: '2025-07-20'
    });
  };

  return (
    <div className="App">
      <h1>Generador de PDF Checklist (pdf-lib)</h1>
      <button onClick={handleGenerate}>Generar PDF de prueba</button>
    </div>
  );
}

export default App;
