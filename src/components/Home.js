import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/home.module.css';

function Home() {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleVendorLogin = () => {
    navigate('/vendor/login'); // Navigate to /vendor/login
  };

  const handleVisitorLogin = () => {
    navigate('/visitor/login'); // Navigate to /visitor/login
  };

  return (
    <div className={styles.body}>
      <div className={styles.landingPage}>
        <div className={styles.overlapGroupWrapper}>
          <div className={styles.overlapGroup}>
            
            <div className={styles.rectangle}></div>
            <img className={styles.img} src="/images/logotthmyvisitorputih.png" alt="Logo" />
            <img className={styles.motif} src="/images/motif2.png" alt="Motif" />
            <img className={styles.doodle} src="/images/doodle.png" alt="Doodle" />

            <div className={styles.textWrapper}>W</div>
            <div className={styles.textWrapper2}>e</div>
            <div className={styles.textWrapper3}>l</div>
            <div className={styles.textWrapper4}>c</div>
            <div className={styles.textWrapper5}>o</div>
            <div className={styles.textWrapper6}>m</div>
            <div className={styles.textWrapper7}>e</div>
            <div className={styles.textWrapper8}>!</div>
            
            <div className={styles.textWrapper9}>Telkom Test House</div>
            <div className={styles.textWrapper10}>Visitor Reservation</div>

            <div className={styles.loginButtons}>
              <button className={styles.buttonVendor} onClick={handleVendorLogin}>
                <div>
                  <div>
                      Masuk sebagai Vendor
                  </div>
                  <div>
                    <span className={styles.subTextButton}>Sign as Vendor</span>
                  </div>
                </div>
              </button>
              <button className={styles.buttonVisitor} onClick={handleVisitorLogin}>
                <div>
                  <div>
                    Masuk sebagai Visitor
                  </div>
                  <div>
                    <span className={styles.subTextButton}>Sign as Visitor</span>
                  </div>
                </div>
              </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
