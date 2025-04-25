const responseMessages = {
  };
  
  const buildResponse = ({ 
    message = null, 
    status = 200, 
    data = null,
    errorDetails = null 
  }) => {
    const response = {
      status,
      message: message ,
      data: data || null
    };
  
    // Solo agregar errorDetails si existe y el status es de error (400+)
    if (errorDetails && status >= 400) {
      response.data = {
        ...(data || {}),
        errorDetails: Array.isArray(errorDetails) 
          ? errorDetails 
          : [{ message: errorDetails }]
      };
    }
  
    return response;
  };
  
  // Función específica para errores de validación
  const buildValidationError = (errors) => {
    const details = errors?.map?.(err => ({
      campo: err.path || 'general',
      message: err.message || 'Error de validación',
      valor: err.value || null
    })) || [{ message: 'Error de validación no especificado' }];
  
    return buildResponse({
      status: 400,
      message: 'Error en la validación de datos',
      errorDetails: details
    });
  };
  
  module.exports = {
    buildResponse,
    buildValidationError
  };