import React, { useState } from 'react';

const MetodoPagoContainer = ({ metodoPago, isActive, handleToggle }) => {


    const MedioPagoSVG = (metodoPago) => {
        switch (metodoPago) {
            case 'Debito':
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M2 8.5h12.5M6 16.5h2M10.5 16.5h4" stroke="#FF8A65" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22 14.03v2.08c0 3.51-.89 4.39-4.44 4.39H6.44C2.89 20.5 2 19.62 2 16.11V7.89c0-3.51.89-4.39 4.44-4.39h8.06M20 3.5v6l2-2M20 9.5l-2-2" stroke="#FF8A65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            break;
        }
    }


  return (
    <div className={`mb-6 content-bg-fff pd-25-35 metodo-pago-container ${isActive ? 'active' : ''}`}>
      <div className="row">
        <div className="flex" style={{ flex: "1 1 60%" }}>
          <div className="items-center text-base control-group d-flex">
            <label className="flex items-center tw-checkbox tw-danger metodo-pago-seleccion">
              <input className="border input-carro-aux" type="radio" name="medio-pago" value={metodoPago} />
              <div className="ml-3">{metodoPago}</div>
            </label>
          </div>
        </div>
        <div className="" style={{ flex: "1 1 40%" }}>
            {MedioPagoSVG(metodoPago.toLowerCase())}
        </div>
      </div>
    </div>
  );
};

export default MetodoPagoContainer;