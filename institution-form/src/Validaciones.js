export const validateDocumentType = (documentType) => {
    return documentType ? '' : 'Tipo de documento es requerido';
  };
  
  export const validateDocumentNumber = (documentNumber) => {
    if (!documentNumber) return 'Número de documento es requerido';
    if (!/^\d+$/.test(documentNumber)) return 'Número de documento debe ser numérico';
    return '';
  };
  
  export const validateName = (name) => {
    return name ? '' : 'Nombre es requerido';
  };
  
  export const validateBranch = (branch, index) => {
    const errors = {};
    if (!branch.name) errors[`branchName${index}`] = 'Nombre de sucursal es requerido';
    if (!branch.type) errors[`branchType${index}`] = 'Tipo de sucursal es requerido';
    if (!branch.country) errors[`branchCountry${index}`] = 'País es requerido';
    if (!branch.department) errors[`branchDepartment${index}`] = 'Departamento es requerido';
    if (!branch.city) errors[`branchCity${index}`] = 'Ciudad es requerida';
    if (!branch.address) errors[`branchAddress${index}`] = 'Dirección es requerida';
    if (!branch.contactNumber) errors[`branchContact${index}`] = 'Número de contacto es requerido';
    if (!/^\d+$/.test(branch.contactNumber)) errors[`branchContact${index}`] = 'Número de contacto debe ser numérico';
    return errors;
  };
  
  export const validateForm = (documentType, documentNumber, name, branches) => {
    const errors = {};
    errors.documentType = validateDocumentType(documentType);
    errors.documentNumber = validateDocumentNumber(documentNumber);
    errors.name = validateName(name);
    branches.forEach((branch, index) => {
      const branchErrors = validateBranch(branch, index);
      Object.assign(errors, branchErrors);
    });
    return errors;
  };