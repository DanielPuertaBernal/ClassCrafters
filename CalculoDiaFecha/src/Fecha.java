public class Fecha {

	private Byte dia;
	private Byte mes;
	private Short anio;

	private Fecha(Byte dia, Byte mes, Short anio) {
		setAnio(anio);
		setMes(mes);
		setDia(dia);
	}

	public static Fecha crear(Byte dia, Byte mes, Short anio) {
		return new Fecha(dia, mes, anio);
	}

	private void setDia(Byte dia) {

		if (!UtilFecha.diaEsValido(dia.longValue(), mes.longValue(), anio.longValue())) {
			throw new RuntimeException("El día " + dia + " no es válido para el mes " + mes + " y para el año " + anio);
		}

		this.dia = dia;
	}

	private void setMes(Byte mes) {

		if (!UtilFecha.mesEsValido(mes.longValue())) {
			throw new RuntimeException("El mes debe estar entre 1 y 12");
		}

		this.mes = mes;
	}

	private void setAnio(Short anio) {

		if (!UtilFecha.anioEsValido(anio.longValue())) {
			throw new RuntimeException("El año debe estar entre 1 y 3000");
		}

		this.anio = anio;
	}

	public Byte getDia() {
		return dia;
	}

	public Byte getMes() {
		return mes;
	}

	public Short getAnio() {
		return anio;
	}
}