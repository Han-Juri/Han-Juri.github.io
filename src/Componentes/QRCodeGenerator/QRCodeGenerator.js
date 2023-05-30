import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import './QRCodeGenerator.css'

const QRCodeGenerator = () => {
  const [qrValue, setQRValue] = useState('');
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let progressTimeout;
    let qrTimeout;

    const generateQRCode = () => {
      const randomValue = Math.random().toString(36).substring(2); // Generar una cadena aleatoria única para el código QR
      setQRValue(randomValue);
      setProgress(100);

      progressTimeout = setTimeout(() => {
        let currentProgress = 100;
        const progressInterval = setInterval(() => {
          currentProgress -= 1;
          setProgress(currentProgress);
        }, 100); // Actualizar la barra de progreso cada 100 milisegundos

        setTimeout(() => {
          clearInterval(progressInterval);
        }, 10000); // Detener la actualización de la barra de progreso después de 10 segundos
      }, 0);

      qrTimeout = setTimeout(generateQRCode, 10000); // Generar un nuevo código QR después de 10 segundos
    };

    generateQRCode(); // Generar el primer código QR inmediatamente

    return () => {
      clearTimeout(progressTimeout);
      clearTimeout(qrTimeout);
    }; // Limpiar los timeouts cuando el componente se desmonte
  }, []);

  return (
    <div className='QRContainer'>
      <div><QRCode value={qrValue} size={200} /></div>
      <div className="progress-bar" style={{ width: `${progress}%`, height: '10px', backgroundColor: 'aqua' }}></div>
      <div><h2>Codigo QR</h2></div>
      <div><p>Mini proyecto de código QR para seguir practicando React JS</p></div>
    </div>
  );
};

export default QRCodeGenerator;