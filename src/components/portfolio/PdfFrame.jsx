// Shows a PDF in the browser's own viewer, with its zoom and page controls.
// Phone and tablet browsers draw only the first page of a PDF inside an
// iframe, so those devices get PdfDocument (PDF.js) instead. iPadOS reports
// a desktop Mac user agent, so it is caught by its touch support.
import React from "react";

// PDF.js is large, so it loads only on phones and tablets
const PdfDocument = React.lazy(() => import("./PdfDocument"));

const isMobileDevice = () => {
  const ua = navigator.userAgent;
  return /iPhone|iPad|iPod|Android/i.test(ua) ||
    (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
};

const PdfFrame = ({ url, height, title = "PDF Viewer" }) =>
  isMobileDevice() ? (
    <React.Suspense fallback={null}>
      <PdfDocument url={url} height={height} />
    </React.Suspense>
  ) : (
    <iframe
      src={url}
      style={{ width: "100%", height, border: "none" }}
      title={title}
    />
  );

export default PdfFrame;
