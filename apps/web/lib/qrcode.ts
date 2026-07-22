import qrcode from "qrcode-generator";

/**
 * Generates a Data URL for a QR code representing the given text.
 * @param text The string to encode in the QR code (typically a URL).
 * @param cellSize Size of each module/pixel in the QR code.
 * @param margin Margin size around the QR code.
 */
export function generateQRCodeDataUrl(text: string, cellSize = 4, margin = 0): string {
  try {
    // Type 0 (auto-detect version), Error Correction Level 'M' (medium)
    const qr = qrcode(0, "M");
    qr.addData(text);
    qr.make();
    // Generate image tag data URI
    return qr.createDataURL(cellSize, margin);
  } catch (error) {
    console.error("Failed to generate QR Code:", error);
    return "";
  }
}
