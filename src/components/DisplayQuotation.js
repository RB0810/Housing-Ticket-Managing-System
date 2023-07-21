import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "../styles/DisplayQuotation.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const DisplayQuotation = ({ quotationPath, file }) => {
  return (
    <div>
      {quotationPath ? (
        <div>
          <p>Quotation Attachment Path: {quotationPath}</p>
          <div className="pdf-container">
            {file && (
              <div className="pdf-viewer">
                <Document file={file}>
                  <Page pageNumber={1} />
                </Document>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>No quotation path found.</p>
      )}
    </div>
  );
};

export default DisplayQuotation;
