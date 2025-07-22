import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function generarChecklistPDF(data) {
    const { cliente, tecnico, fecha } = data;
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 Size in points

    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    page.drawText('Checklist de Seguridad', {
        x: 50,
        y: height - 50,
        size: 20,
        font,
        color: rgb(0, 0, 0)
    });

    page.drawText(`Cliente: ${cliente}`, { x: 50, y: height - 100, size: 12, font });
    page.drawText(`Técnico: ${tecnico}`, { x: 50, y: height - 120, size: 12, font });
    page.drawText(`Fecha: ${fecha}`, { x: 50, y: height - 140, size: 12, font });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Checklist-${cliente}-${fecha}.pdf`;
    link.click();
}
