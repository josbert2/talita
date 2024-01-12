export  function formatToPesosChilenos(numero) {
    const formatter = new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    });
  
    return formatter.format(numero);
} 