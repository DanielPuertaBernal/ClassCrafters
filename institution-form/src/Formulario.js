import React, { useState } from 'react';
import { validateForm } from './Validaciones';

// Datos simulados para los menús desplegables
const documentTypes = ['Tipo 1', 'Tipo 2', 'Tipo 3'];
const countries = {
  'País 1': {
    'Departamento 1': ['Ciudad 1', 'Ciudad 2'],
    'Departamento 2': ['Ciudad 3', 'Ciudad 4'],
  },
  'País 2': {
    'Departamento 3': ['Ciudad 5', 'Ciudad 6'],
    'Departamento 4': ['Ciudad 7', 'Ciudad 8'],
  },
};

const InstitutionForm = () => {
  const [documentType, setDocumentType] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [name, setName] = useState('');
  const [branches, setBranches] = useState([]);
  const [errors, setErrors] = useState({});

  const addBranch = () => {
    setBranches([...branches, { name: '', type: '', country: '', department: '', city: '', address: '', contactNumber: '', tutorials: [] }]);
  };

  const handleBlur = () => {
    const newErrors = validateForm(documentType, documentNumber, name, branches);
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(documentType, documentNumber, name, branches);
    if (Object.keys(newErrors).length === 0) {
      // Aquí se puede enviar el formulario a una API o procesarlo de otra manera
      console.log("Formulario válido, enviando datos...");
    } else {
      console.log("Formulario inválido, corrige los errores.");
      setErrors(newErrors);
    }
  };

  return (
    <div>
      <h1>Crear Institución</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tipo Documento</label>
          <select value={documentType} onChange={e => setDocumentType(e.target.value)} onBlur={handleBlur}>
            <option value="">Seleccione un tipo de documento</option>
            {documentTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.documentType && <p className="error">{errors.documentType}</p>}
        </div>
        <div>
          <label>Número Documento</label>
          <input type="text" value={documentNumber} onChange={e => setDocumentNumber(e.target.value)} onBlur={handleBlur} />
          {errors.documentNumber && <p className="error">{errors.documentNumber}</p>}
        </div>
        <div>
          <label>Nombre</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} onBlur={handleBlur} />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        
        <h2>Sucursales</h2>
        {branches.map((branch, index) => (
          <BranchForm key={index} branches={branches} setBranches={setBranches} branchIndex={index} countries={countries} errors={errors} handleBlur={handleBlur} />
        ))}
        <button type="button" onClick={addBranch}>Agregar Sucursal</button>
        
        <div>
          <button type="submit">Crear Institución</button>
        </div>
      </form>
    </div>
  );
};

const BranchForm = ({ branches, setBranches, branchIndex, countries, errors, handleBlur }) => {
  const branch = branches[branchIndex];

  const updateBranchField = (field, value) => {
    const newBranches = [...branches];
    newBranches[branchIndex][field] = value;
    setBranches(newBranches);
  };

  const updateTutorials = (tutorials) => {
    const newBranches = [...branches];
    newBranches[branchIndex].tutorials = tutorials;
    setBranches(newBranches);
  };

  return (
    <div className="branch-form">
      <div>
        <label>Nombre</label>
        <input type="text" value={branch.name} onChange={e => updateBranchField('name', e.target.value)} onBlur={handleBlur} />
        {errors[`branchName${branchIndex}`] && <p className="error">{errors[`branchName${branchIndex}`]}</p>}
      </div>
      <div>
        <label>Tipo de Sucursal</label>
        <select value={branch.type} onChange={e => updateBranchField('type', e.target.value)} onBlur={handleBlur}>
          <option value="">Seleccione un tipo</option>
          <option value="Principal">Principal</option>
          <option value="Auxiliar">Auxiliar</option>
        </select>
        {errors[`branchType${branchIndex}`] && <p className="error">{errors[`branchType${branchIndex}`]}</p>}
      </div>
      <LocationSelector branch={branch} updateBranchField={updateBranchField} countries={countries} errors={errors} branchIndex={branchIndex} handleBlur={handleBlur} />
      <div>
        <label>Dirección</label>
        <input type="text" value={branch.address} onChange={e => updateBranchField('address', e.target.value)} onBlur={handleBlur} />
        {errors[`branchAddress${branchIndex}`] && <p className="error">{errors[`branchAddress${branchIndex}`]}</p>}
      </div>
      <div>
        <label>Número de Contacto</label>
        <input type="text" value={branch.contactNumber} onChange={e => updateBranchField('contactNumber', e.target.value)} onBlur={handleBlur} />
        {errors[`branchContact${branchIndex}`] && <p className="error">{errors[`branchContact${branchIndex}`]}</p>}
      </div>
      
      <h3>Lugares de Tutoría</h3>
      <TutorialForm tutorials={branch.tutorials} setTutorials={updateTutorials} handleBlur={handleBlur} />
    </div>
  );
};

const LocationSelector = ({ branch, updateBranchField, countries, errors, branchIndex, handleBlur }) => {
  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);
  
  const handleCountryChange = (e) => {
    const country = e.target.value;
    updateBranchField('country', country);
    updateBranchField('department', '');
    updateBranchField('city', '');
    setDepartments(Object.keys(countries[country] || {}));
    setCities([]);
    handleBlur();
  };
  
  const handleDepartmentChange = (e) => {
    const department = e.target.value;
    updateBranchField('department', department);
    updateBranchField('city', '');
    setCities(countries[branch.country][department] || []);
    handleBlur();
  };

  return (
    <div className="location-selector">
      <div>
        <label>País</label>
        <select value={branch.country} onChange={handleCountryChange} onBlur={handleBlur}>
          <option value="">Seleccione un país</option>
          {Object.keys(countries).map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        {errors[`branchCountry${branchIndex}`] && <p className="error">{errors[`branchCountry${branchIndex}`]}</p>}
      </div>
      <div>
        <label>Departamento</label>
        <select value={branch.department} onChange={handleDepartmentChange} disabled={!branch.country} onBlur={handleBlur}>
          <option value="">Seleccione un departamento</option>
          {departments.map(department => (
            <option key={department} value={department}>{department}</option>
          ))}
        </select>
        {errors[`branchDepartment${branchIndex}`] && <p className="error">{errors[`branchDepartment${branchIndex}`]}</p>}
      </div>
      <div>
        <label>Ciudad</label>
        <select value={branch.city} onChange={e => updateBranchField('city', e.target.value)} disabled={!branch.department} onBlur={handleBlur}>
          <option value="">Seleccione una ciudad</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        {errors[`branchCity${branchIndex}`] && <p className="error">{errors[`branchCity${branchIndex}`]}</p>}
      </div>
    </div>
  );
};

const TutorialForm = ({ tutorials, setTutorials, handleBlur }) => {
  const addTutorial = () => {
    setTutorials([...tutorials, { name: '', room: '', studentCount: '' }]);
  };

  const updateTutorialField = (index, field, value) => {
    const newTutorials = [...tutorials];
    newTutorials[index][field] = value;
    setTutorials(newTutorials);
  };

  return (
    <div className="tutorial-form">
      {tutorials.map((tutorial, index) => (
        <div key={index}>
          <div>
            <label>Nombre</label>
            <input type="text" value={tutorial.name} onChange={e => updateTutorialField(index, 'name', e.target.value)} onBlur={handleBlur} />
          </div>
          <div>
            <label>Salón</label>
            <input type="text" value={tutorial.room} onChange={e => updateTutorialField(index, 'room', e.target.value)} onBlur={handleBlur} />
          </div>
          <div>
            <label>Cantidad de Estudiantes</label>
            <input type="number" value={tutorial.studentCount} onChange={e => updateTutorialField(index, 'studentCount', e.target.value)} onBlur={handleBlur} />
          </div>
        </div>
      ))}
      <button type="button" onClick={addTutorial}>Agregar Lugar de Tutoría</button>
    </div>
  );
};

export default InstitutionForm;
