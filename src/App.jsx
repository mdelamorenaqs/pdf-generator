import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function App() {
  return (
    <div className="App">
      <h1>PDFMake está correctamente importado</h1>
    </div>
  );
}

export default App;
