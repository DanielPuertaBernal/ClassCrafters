import React from 'react';
import './Calendario.css';

class Calendario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monitorias: [
        { materia: 'Matemáticas', horaInicio: '10:00', horaFin: '12:00' },
        { materia: 'Física', horaInicio: '14:00', horaFin: '16:00' },
        { materia: 'Química', horaInicio: '18:00', horaFin: '19:30' },
        // Agrega más monitorias según necesites
      ]
    };
  }

  render() {
    const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    const hours = Array.from({ length: 16 }, (_, i) => (i + 7).toString().padStart(2, '0'));

    return (
      <div className="calendario-container">
        <h1 className="titulo">Calendario de Monitorías</h1>
        <div className="calendario">
          <div className="horarios">
            {hours.map((hour, index) => (
              <div key={index} className="hora">{hour}:00</div>
            ))}
          </div>
          {daysOfWeek.map((day, index) => (
            <div key={index} className="dia-column">
              <div className="dia">{day}</div>
              <div className="horario-column">
                {hours.map((hour, index) => (
                  <div key={index} className="horario">
                    {this.state.monitorias.map((monitoria, i) => {
                      const horaInicio = parseInt(monitoria.horaInicio.split(':')[0]);
                      const horaFin = parseInt(monitoria.horaFin.split(':')[0]);
                      const rowSpan = horaFin - horaInicio;
                      const isWithinTimeRange = index + 7 >= horaInicio && index + 7 < horaFin;
                      return (
                        isWithinTimeRange && (
                          <div key={i} className="monitoria" style={{ gridRow: `${horaInicio + 1} / span ${rowSpan}` }} onClick={() => this.handleMonitoriaClick(monitoria)}>
                            <p className="materia">{monitoria.materia}</p>
                            <p className="horario">{monitoria.horaInicio} - {monitoria.horaFin}</p>
                          </div>
                        )
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  handleMonitoriaClick(monitoria) {
    alert(`Has seleccionado la monitoria de ${monitoria.materia} de ${monitoria.horaInicio} a ${monitoria.horaFin}`);
  }
}

export default Calendario;