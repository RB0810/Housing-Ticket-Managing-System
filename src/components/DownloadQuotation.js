import React from 'react';
import supabase from '../config/supabaseClient';

const DownloadQuotation = ({ bucketName, ServiceRequestID }) => {
  const handleFileDownload = async () => {
    try {
      const { data: getPathData, error: getPathError } = await supabase
        .from('Service Request')
        .select('QuotationAttachmentPath')
        .eq('ServiceRequestID', ServiceRequestID);

      if (getPathError || !getPathData || getPathData.length === 0) {
        console.error('Error getting file path:', getPathError);
        return;
      }

      const filePath = getPathData[0].QuotationAttachmentPath;
      console.log(`download filepath is: ${filePath}`);
      
      const { data, error } = await supabase.storage
        .from(bucketName)
        .download(filePath);
      
      if (error) {
        console.error('Error downloading file:', error);
        return;
      }

      const blob = new Blob([data], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      const fileName = filePath.split('/').pop();
      link.download = fileName;
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div>
      <button onClick={handleFileDownload}>Download File</button>
    </div>
  );
};

export default DownloadQuotation;
