// Draws a PDF with PDF.js for phones and tablets (see PdfFrame.jsx), in a
// grey frame with a toolbar like a browser's own PDF viewer. Only pages near
// the visible area are drawn, because some PDFs here have hundreds of pages.
import React, { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const PAGE_GAP = 8;  // px between pages
const ZOOM_LEVELS = [1, 1.5, 2, 3];

const LazyPage = ({ pageNumber, width, ratio, scrollBox, onFirstPage }) => {
  const slot = useRef(null);
  const [near, setNear] = useState(pageNumber <= 2);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { root: scrollBox.current, rootMargin: "1500px 0px" }
    );
    observer.observe(slot.current);
    return () => observer.disconnect();
  }, [scrollBox]);

  return (
    <div
      ref={slot}
      style={{ width, height: width * ratio, marginBottom: PAGE_GAP }}
    >
      {near && (
        <Page
          pageNumber={pageNumber}
          width={width}
          onLoadSuccess={pageNumber === 1 ? onFirstPage : undefined}
        />
      )}
    </div>
  );
};

const PdfDocument = ({ url, height }) => {
  const scrollBox = useRef(null);
  const [width, setWidth] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [ratio, setRatio] = useState(Math.SQRT2);  // A-series until page 1 loads
  const [zoomIndex, setZoomIndex] = useState(0);
  const zoom = ZOOM_LEVELS[zoomIndex];

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) =>
      setWidth(Math.floor(entry.contentRect.width))
    );
    observer.observe(scrollBox.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pdf-viewer" style={{ height }}>
      <div className="pdf-toolbar">
        <span>{numPages > 0 && `${numPages} pages`}</span>
        <button
          onClick={() => setZoomIndex(zoomIndex - 1)}
          disabled={zoomIndex === 0}
          aria-label="Zoom out"
        >
          −
        </button>
        <span>{zoom * 100}%</span>
        <button
          onClick={() => setZoomIndex(zoomIndex + 1)}
          disabled={zoomIndex === ZOOM_LEVELS.length - 1}
          aria-label="Zoom in"
        >
          +
        </button>
        <a href={url} target="_blank" rel="noopener noreferrer">Open ↗</a>
      </div>
      <div ref={scrollBox} className="pdf-document">
        <Document
          file={url}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={<p className="pdf-document-note">Loading PDF…</p>}
          error={
            <p className="pdf-document-note">
              The PDF could not be shown here. <a href={url}>Open it directly.</a>
            </p>
          }
        >
          {width > 0 &&
            Array.from({ length: numPages }, (_, i) => (
              <LazyPage
                key={i}
                pageNumber={i + 1}
                width={width * zoom}
                ratio={ratio}
                scrollBox={scrollBox}
                onFirstPage={(page) =>
                  setRatio(page.originalHeight / page.originalWidth)
                }
              />
            ))}
        </Document>
      </div>
    </div>
  );
};

export default PdfDocument;
