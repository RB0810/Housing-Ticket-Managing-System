export default function QuotationUploader({ onFileChange }) {
  return (
    <div>
      <label>
        Attach PDF:
        <input type="file" accept=".pdf" onChange={onFileChange} />
      </label>
    </div>
  );
}
