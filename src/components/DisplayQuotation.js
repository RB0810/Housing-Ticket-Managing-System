import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import supabase from '../config/supabaseClient';
import '../styles/DisplayQuotation.css'
import { useState, useEffect } from "react";
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

const DisplayQuotation = ({ ServiceRequestID }) => {
    const [quotationPath, setQuotationPath] = useState(null);
    const [pdfFile, setPDFFile] = useState(null)

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
                if (filePath && filePath.endsWith('.pdf')) {
                    setQuotationPath(filePath);
                }
            }
        };
    
        if (ServiceRequestID) {
            fetchQuotationPath();
        }
    }, [ServiceRequestID]);

    useEffect(() => {
        const downloadAndSetPDF = async () => {
            if (quotationPath) {
                const { data: fileData, error: fileError } = await supabase
                .storage
                .from('quotation')
                .download(quotationPath);

                if (fileError || !fileData) {
                    console.error('Error downloading file:', fileError);
                } else {
                    const url = URL.createObjectURL(fileData);
                    setPDFFile(url);
                }
            }
        };

        downloadAndSetPDF();
    }, [quotationPath]);

    const newplugin = defaultLayoutPlugin()

    return (
        <div className='pdf-container'>
            <div className='pdf-container2'>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.8.162/build/pdf.worker.min.js">
                    {pdfFile && <>
                        <Viewer fileUrl={pdfFile} plugins={[newplugin]}/>
                    </>}
                    {!pdfFile && <>No PDF</>} 
                </Worker>
            </div>
        </div>
    )
}

export default DisplayQuotation;
