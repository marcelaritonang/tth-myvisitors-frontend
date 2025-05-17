import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { LabContext } from '../contexts/LabContext'; // Import LabContext

const UploadLetter = ({ isOpen, onClose }) => {
  const [selectedLabs, setSelectedLabs] = useState([]);
  const [file, setFile] = useState(null); // Menyimpan file yang dipilih
  const [labOptions, setLabOptions] = useState([]); // Dynamic lab options
  const { addLabs } = useContext(LabContext); // Mengakses fungsi addLabs dari LabContext

  // Fetch lab options from the API
  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/room/');
        if (response.data.success) {
          setLabOptions(response.data.data); // Set the lab options with API data
        } else {
          console.error('Failed to fetch labs:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching labs:', error);
      }
    };

    fetchLabs();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile); // Menyimpan file ke state
    console.log('File uploaded:', uploadedFile);
  };

  const handleLabSelection = (labId) => {
    setSelectedLabs((prevSelectedLabs) =>
      prevSelectedLabs.includes(labId)
        ? prevSelectedLabs.filter((id) => id !== labId)
        : [...prevSelectedLabs, labId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman

    if (!file) {
      alert('Silakan pilih file sebelum submit.');
      return;
    }

    if (selectedLabs.length === 0) {
      alert('Silakan pilih minimal satu lab sebelum submit.');
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('file', file); // Add the file
    formData.append('roomId', JSON.stringify(selectedLabs)); // Add the list of room IDs as a JSON string

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');

      // Send POST request with form data
      const response = await axios.post('http://localhost:5000/access/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
      });

      console.log('Response:', response.data);
      if (response.data.success) {
        alert(`File "${file.name}" berhasil diunggah untuk lab: ${selectedLabs.join(', ')}`);
        addLabs(selectedLabs); // Update context or state if necessary
        onClose(); // Close the modal
      } else {
        alert(`Gagal mengunggah file: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Terjadi kesalahan saat mengunggah file.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg relative">
        <img
          src="/images/closebutton.png"
          alt="Close"
          className="w-6 h-6 absolute top-2 right-2 cursor-pointer"
          onClick={onClose}
        />
        <h1 className="text-2xl font-bold mb-4">Upload Surat Penunjukkan</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fileUpload" className="block text-gray-700 font-semibold mb-2">
              Upload File:
            </label>
            <input
              type="file"
              id="fileUpload"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Pilihan Akses Lab:</h2>
            {labOptions.length > 0 ? (
              labOptions.map((lab) => (
                <div key={lab.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`lab-${lab.id}`}
                    value={lab.id}
                    onChange={() => handleLabSelection(lab.id)}
                    className="form-checkbox h-5 w-5 text-gray-600"
                  />
                  <label htmlFor={`lab-${lab.id}`} className="ml-2 text-gray-700">{lab.name}</label>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Loading labs...</p>
            )}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white py-2 px-4 rounded shadow hover:bg-gray-500"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadLetter;
