import React, { useState } from 'react';
import supabase from "../config/supabaseClient";
// import Swal from 'sweetalert2'; 

const UploadQuotation = ({ bucketName, ServiceRequestID }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadFileToBucket = async () => {
    if (!selectedFile) {
      console.log('No file selected.');
      return;
    }

    const fileName = selectedFile.name;
    const fileExt = fileName.split('.').pop();
    const filePath = `${ServiceRequestID}.${fileExt}`;

    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, selectedFile, { cacheControl: '3600', upsert: true });

      if (error) {
        console.error('Error uploading file:', error);
        // Swal.fire({  // Display error alert
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: 'Something went wrong!'
        // });
        return { error };
      } else {
        console.log(`File path is: ${filePath}`);

        const { data: updateData, error: updateError } = await supabase
        .from('Service Request')
        .update({ QuotationAttachmentPath: filePath })
        .match({ ServiceRequestID: ServiceRequestID });

        if (updateError) {
          console.error('Error updating file path:', updateError);
          // Swal.fire({  // Display error alert
          //   icon: 'error',
          //   title: 'Oops...',
          //   text: 'Failed to update the file path in the database!'
          // });
          return { error: updateError };
        } else {
          console.log('File path updated successfully:', updateData);
          // Swal.fire({  // Display success alert
          //   icon: 'success',
          //   title: 'Uploaded',
          //   text: 'Your file has been uploaded and the file path is updated.'
          // });
          return { data: updateData };
        }
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      // Swal.fire({  // Display error alert
      //   icon: 'error',
      //   title: 'Oops...',
      //   text: 'Something went wrong!'
      // });
      return { error };
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} id='upload-quotation-input'/>
      <button onClick={uploadFileToBucket} id='upload-quotation-button'>Upload</button>
    </div>
  );
};

export default UploadQuotation;
