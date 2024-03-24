public class Mes {
	private Byte numeroMes;
	private Byte maximoNumeroDias;

	private Mes(Byte numeroMes, Byte maximoNumeroDias) {
		setNumeroMes(numeroMes);
		setMaximoNumeroDias(maximoNumeroDias);
	}

	public static Mes crear(Byte numeroMes, Byte maximoNumeroDias) {
		return new Mes(numeroMes, maximoNumeroDias);
	}

	private void setNumeroMes(Byte numeroMes) {
		this.numeroMes = numeroMes;
	}

	private void setMaximoNumeroDias(Byte maximoNumeroDias) {
		this.maximoNumeroDias = maximoNumeroDias;
	}

	public Byte getNumeroMes() {
		return numeroMes;
	}

	public Byte getMaximoNumeroDias() {
		return maximoNumeroDias;
	}

	public Byte getMaximoNumeroDiasAnioBisiesto() {
		return (getNumeroMes() == 2) ? (byte) (maximoNumeroDias + 1) : maximoNumeroDias;
	}
}