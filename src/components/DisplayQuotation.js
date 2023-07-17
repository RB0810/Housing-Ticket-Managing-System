import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
import { Document, Page, pdfjs } from 'react-pdf';
import "../styles/DisplayQuotation.css"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const DisplayQuotation = ({ ServiceRequestID }) => {
  const [quotationPath, setQuotationPath] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchQuotationPath = async () => {
      const { data, error } = await supabase
        .from('Service Request')
        .select('QuotationAttachmentPath')
        .eq('ServiceRequestID', ServiceRequestID);

      if (error || !data || data.length === 0) {
        console.error('Error fetching quotation path:', error);
      } else {
        const filePath = data[0].QuotationAttachmentPath;
        if (filePath) {
          setQuotationPath(filePath);
          if(filePath.endsWith('.pdf')) {
            const { data: fileData, error: fileError } = await supabase
              .storage
              .from('quotation')  
              .download(filePath);

            if(fileError || !fileData) {
              console.error('Error downloading file:', fileError);
            } else {
              const url = URL.createObjectURL(fileData);
              setFile(url);
            }
          }
        }
      }
    };

    if (ServiceRequestID) {
      fetchQuotationPath();
    }
  }, [ServiceRequestID]);

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
