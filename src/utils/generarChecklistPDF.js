import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.default?.pdfMake?.vfs || pdfFonts.pdfMake.vfs;


export function generarChecklistPDF(data) {
    const { cliente, tecnico, fecha, respuestas, firma_base64 } = data;

    const blocks = {
        '1': 'SITUACIÓN DE PRUEBAS',
        '2': 'ALIMENTACIÓN DEL SISTEMA',
        '3': 'CENTRAL DE INTRUSIÓN',
        '4': 'TECLADOS',
        '5': 'DETECTORES',
        '6': 'COMUNICACIONES',
        '7': 'CCTV',
    };

    const content = [
        { text: 'Checklist de Seguridad', style: 'header' },
        { text: `Cliente: ${cliente}\nTécnico: ${tecnico}\nFecha: ${fecha}`, margin: [0, 10, 0, 20] },
    ];

    Object.keys(blocks).forEach(bloqueId => {
        content.push({ text: `${bloqueId} - ${blocks[bloqueId]}`, style: 'subheader' });
        const rows = respuestas
            .filter(r => r.bloque_id === bloqueId)
            .map(r => {
                return [
                    { text: r.pregunta_texto },
                    { text: r.respuesta.toUpperCase() },
                    { text: r.observaciones || '' },
                ];
            });

        if (rows.length) {
            content.push({
                style: 'tableExample',
                table: {
                    widths: ['*', 'auto', '*'],
                    body: [['Pregunta', 'Respuesta', 'Observaciones'], ...rows],
                },
            });
        }

        const fotosBloque = respuestas.filter(r => r.bloque_id === bloqueId && r.fotos && r.fotos.length);
        fotosBloque.forEach(r => {
            r.fotos.forEach(base64 => {
                content.push({ image: base64, width: 150, margin: [0, 5, 0, 10] });
            });
        });
    });

    content.push({ text: 'Firma del técnico:', margin: [0, 30, 0, 10] });
    if (firma_base64) {
        content.push({ image: firma_base64, width: 200 });
    }

    const docDefinition = {
        pageSize: 'A4',
        pageMargins: [40, 60, 40, 60],
        content,
        styles: {
            header: { fontSize: 18, bold: true, alignment: 'center', margin: [0, 0, 0, 10] },
            subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
            tableExample: { margin: [0, 5, 0, 15] },
        },
    };

    pdfMake.createPdf(docDefinition).download(`Checklist-${cliente}-${fecha}.pdf`);
}
