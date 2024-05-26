import React, { useState } from 'react';

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
  
  const addBranch = () => {
    setBranches([...branches, { name: '', type: '', country: '', department: '', city: '', address: '', contactNumber: '', tutorials: [] }]);
  };

  return (
    <div>
      <h1>Crear Institución</h1>
      <form>
        <div>
          <label>Tipo Documento</label>
          <select value={documentType} onChange={e => setDocumentType(e.target.value)}>
            <option value="">Seleccione un tipo de documento</option>
            {documentTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Número Documento</label>
          <input type="text" value={documentNumber} onChange={e => setDocumentNumber(e.target.value)} />
        </div>
        <div>
          <label>Nombre</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </div>
        
        <h2>Sucursales</h2>
        {branches.map((branch, index) => (
          <BranchForm key={index} branch={branch} setBranches={setBranches} branchIndex={index} countries={countries} />
        ))}
        <button type="button" onClick={addBranch}>Agregar Sucursal</button>
        
        <div>
          <button type="submit">Crear Institución</button>
        </div>
      </form>
    </div>
  );
};

const BranchForm = ({ branch, setBranches, branchIndex, countries }) => {
  const updateBranchField = (field, value) => {
    const newBranches = [];
    newBranches[branchIndex][field] = value;
    setBranches(newBranches);
  };

  const updateTutorials = (tutorials) => {
    const newBranches = [];
    newBranches[branchIndex].tutorials = tutorials;
    setBranches(newBranches);
  };

  return (
    <div>
      <div>
        <label>Nombre</label>
        <input type="text" value={branch.name} onChange={e => updateBranchField('name', e.target.value)} />
      </div>
      <div>
        <label>Tipo de Sucursal</label>
        <select value={branch.type} onChange={e => updateBranchField('type', e.target.value)}>
          <option value="">Seleccione un tipo</option>
          <option value="Principal">Principal</option>
          <option value="Auxiliar">Auxiliar</option>
        </select>
      </div>
      <LocationSelector branch={branch} updateBranchField={updateBranchField} countries={countries} />
      <div>
        <label>Dirección</label>
        <input type="text" value={branch.address} onChange={e => updateBranchField('address', e.target.value)} />
      </div>
      <div>
        <label>Número de Contacto</label>
        <input type="text" value={branch.contactNumber} onChange={e => updateBranchField('contactNumber', e.target.value)} />
      </div>
      
      <h3>Lugares de Tutoría</h3>
      <TutorialForm tutorials={branch.tutorials} setTutorials={updateTutorials} />
    </div>
  );
};

const LocationSelector = ({ branch, updateBranchField, countries }) => {
  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);
  
  const handleCountryChange = (e) => {
    const country = e.target.value;
    updateBranchField('country', country);
    updateBranchField('department', '');
    updateBranchField('city', '');
    setDepartments(Object.keys(countries[country] || {}));
    setCities([]);
  };
  
  const handleDepartmentChange = (e) => {
    const department = e.target.value;
    updateBranchField('department', department);
    updateBranchField('city', '');
    setCities(countries[branch.country][department] || []);
  };

  return (
    <div>
      <div>
        <label>País</label>
        <select value={branch.country} onChange={handleCountryChange}>
          <option value="">Seleccione un país</option>
          {Object.keys(countries).map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Departamento</label>
        <select value={branch.department} onChange={handleDepartmentChange} disabled={!branch.country}>
          <option value="">Seleccione un departamento</option>
          {departments.map(department => (
            <option key={department} value={department}>{department}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Ciudad</label>
        <select value={branch.city} onChange={e => updateBranchField('city', e.target.value)} disabled={!branch.department}>
          <option value="">Seleccione una ciudad</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

const TutorialForm = ({ tutorials, setTutorials }) => {
  const addTutorial = () => {
    setTutorials([...tutorials, { name: '', room: '', studentCount: '' }]);
  };

  const updateTutorialField = (index, field, value) => {
    const newTutorials = [...tutorials];
    newTutorials[index][field] = value;
    setTutorials(newTutorials);
  };

  return (
    <div>
      {tutorials.map((tutorial, index) => (
        <div key={index}>
          <div>
            <label>Nombre</label>
            <input type="text" value={tutorial.name} onChange={e => updateTutorialField(index, 'name', e.target.value)} />
          </div>
          <div>
            <label>Salón</label>
            <input type="text" value={tutorial.room} onChange={e => updateTutorialField(index, 'room', e.target.value)} />
          </div>
          <div>
            <label>Cantidad de Estudiantes</label>
            <input type="number" value={tutorial.studentCount} onChange={e => updateTutorialField(index, 'studentCount', e.target.value)} />
          </div>
        </div>
      ))}
      <button type="button" onClick={addTutorial}>Agregar Lugar de Tutoría</button>
    </div>
  );
};

export default InstitutionForm;
