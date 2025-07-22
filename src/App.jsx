import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function App() {
  console.log("pdfMake loaded: ", pdfMake);
  return (
    <div className="App">
      <h1>pdfMake importado correctamente</h1>
    </div>
  );
}

export default App;
