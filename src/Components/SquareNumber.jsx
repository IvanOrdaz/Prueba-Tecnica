import React, { useState, useEffect } from 'react';
import './SquareNumber.css';

const SquareNumber = () => {
    const [number, setNumber] = useState(null);
    const [squaredNumber, setSquaredNumber] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNumber();
    }, []);

    const Reload = () => {
        window.location.reload(true);
    }

    const fetchNumber = async () => {
        try {
            const response = await fetch('https://puxxbfkxxqqbjiogv3alfciuuy0dpgos.lambda-url.us-east-1.on.aws/');
            if (!response.ok) {
                throw new Error('Parece que hubo un problema al conectarse al servidor refresque la pagina para volver a intentar.');
            }
            const data = await response.text();
            const parsedData = JSON.parse(data);

            if (typeof parsedData.number !== 'number') {
                throw new Error('Hubo un error al recibir la información');
            }
            setNumber(parsedData.number);
            const finalNumber = parsedData.number * parsedData.number;
            setSquaredNumber(finalNumber);
        } catch (error) {
            setError(error.message);
        }
    };

    if (error) {
        return <div className='error'>
            <h4>Error al cargar la información: {error}</h4>
            <button onClick={Reload}>Volver a intentarlo</button>
        </div>;
    }

    return (
        <div>
            {number !== null && squaredNumber !== null ? (
                <div>
                    <p>Número proporcionado por la API: {number}</p>
                    <p>Cuadrado del número: {squaredNumber}</p>
                </div>
            ) : (
                <p>Cargando...</p>
            )}

            <button onClick={fetchNumber}>Probar un nuevo numero</button>
        </div>
    );
};

export default SquareNumber;