// BarcodeScanner.js
import React, { useEffect } from 'react';
import Quagga from 'quagga'; // Make sure Quagga is installed
import '../styles/BarcodeScanner.css'

const BarcodeScanner = ({ onDetected }) => {
  useEffect(() => {
    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: document.querySelector('#scanner-container'), // DOM element to show the camera view
        constraints: {
          facingMode: 'environment' // Use the rear camera
        }
      },
      decoder: {
        readers: ['code_128_reader', 'ean_reader'] // Add more types if needed
      }
    }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      Quagga.start();
    });

    Quagga.onDetected(result => {
      onDetected(result.codeResult.code);
    });

    return () => {
      Quagga.stop();
    };
  }, [onDetected]);

  return (
    <div id="scanner-container" className="scanner-container" />
  );
};

export default BarcodeScanner;
