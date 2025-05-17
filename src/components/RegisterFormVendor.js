import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/RegisterVendor.module.css';

const RegisterFormVendor = ({ onNext, formData, setFormData }) => {

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextClick = () => {
   const { name, email, password, confirmPassword, phoneNumber, company} = formData;

    // Cek jika ada field yang kosong
    if (!name || !email || !password || !confirmPassword || !phoneNumber || !company) {
      setError('Harap isi semua field sebelum melanjutkan.');
      return;
    }

    // Cek jika Phone Number bukan angka
    if (!Number.isInteger(Number(phoneNumber))) {
      setError('Nomor telepon harus berupa angka.');
      return;
    }

    // Cek jika password dan konfirmasi password tidak cocok
    if (password !== confirmPassword) {
      setError('Password dan Konfirmasi Password tidak cocok.');
      return;
    }

    setError('');
    onNext();
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.header}>
          <img src="/images/tth.png" alt="Logo tth Indonesia" className={styles.logo} />
          <img src="/images/telkom.png" alt="Logo Telkom " className={styles.logo2} />
        </div>
        <h1>Daftar Akun</h1>
        <p>Lengkapi data diri anda / Complete Your Personal Data</p>
        <form className={styles.form}>

          <label htmlFor="name" className={styles.label}>Nama Lengkap (Sesuai KTP) / Full Name (According to ID Card)</label>
          <input type="text" id="name" name="name" className={styles.input} value={formData.name} onChange={handleChange} />

          <label htmlFor="email" className={styles.label}>Email (Pribadi) / Email (Your Personal Mail)</label>
          <input type="email" id="email" name="email" className={styles.input} value={formData.email} onChange={handleChange} />

          <label htmlFor="company" className={styles.label}>Instansi Perusahaan / Instantion Company</label>
          <input type="text" id="company" name="company" className={styles.input} value={formData.company} onChange={handleChange} />

          <label htmlFor="password" className={styles.label}>Password</label>
          <input type="password" id="password" name="password" className={styles.input} value={formData.password} onChange={handleChange} />

          <label htmlFor="confirmPassword" className={styles.label}>Masukan Ulang Password / Re-enter Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" className={styles.input} value={formData.confirmPassword} onChange={handleChange} />

          <label htmlFor="phoneNumber" className={styles.label}>Nomor Telepon / Phone Number</label>
          <input type="number" id="phoneNumber" name="phoneNumber" className={styles.input} value={formData.phoneNumber} onChange={handleChange} />

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.buttons}>
            <button type="button" className={`${styles.button} ${styles.back}`} onClick={() => window.location.href = '/LoginVendor'}>Kembali / Back</button>
            <button type="button" className={`${styles.button} ${styles.next}`} onClick={handleNextClick}>Selanjutnya / Next</button>
          </div>
        </form>
        <p className={styles.loginLink}>Sudah Punya Akun?  <Link to="../vendor/login">Masuk</Link></p>
      </div>
    </div>
  );
};

export default RegisterFormVendor;