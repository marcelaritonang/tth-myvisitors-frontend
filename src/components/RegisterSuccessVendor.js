import React from 'react';

const RegisterSuccess = ({ onFinish }) => {
    const handleNextClick = () => {
        onFinish();
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/images/backgroundregistervendor.png')" }}>
        <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Berhasil Membuat Akun</h1>
          <h2 className="text-xl font-semibold mb-4">Silahkan LOGIN</h2>
          <button onClick={handleNextClick} className="bg-red-400 text-white py-2 px-4 rounded hover:bg-gray-600">Masuk / Login</button>
        </div>
      </div>
    )

}

export default RegisterSuccess;