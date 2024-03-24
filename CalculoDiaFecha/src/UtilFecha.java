import java.util.HashMap;
import java.util.Map;

public class UtilFecha {

	private static Map<Long, Mes> meses;

	static {
		meses = new HashMap<>();
		meses.put(1l, Mes.crear((byte) 1, (byte) 31));
		meses.put(2l, Mes.crear((byte) 2, (byte) 28));
		meses.put(3l, Mes.crear((byte) 3, (byte) 31));
		meses.put(4l, Mes.crear((byte) 4, (byte) 30));
		meses.put(5l, Mes.crear((byte) 5, (byte) 31));
		meses.put(6l, Mes.crear((byte) 6, (byte) 30));
		meses.put(7l, Mes.crear((byte) 7, (byte) 31));
		meses.put(8l, Mes.crear((byte) 8, (byte) 31));
		meses.put(9l, Mes.crear((byte) 9, (byte) 30));
		meses.put(10l, Mes.crear((byte) 10, (byte) 31));
		meses.put(11l, Mes.crear((byte) 11, (byte) 30));
		meses.put(12l, Mes.crear((byte) 12, (byte) 31));
	}

	private UtilFecha() {
		super();
	}

	public static boolean anioEsBisiesto(Long anio) {
		return anio % 4 == 0;
	}

	public static boolean mesEsValido(Long mes) {
		return mes >= 1 && mes <= 12;
	}

	public static boolean anioEsValido(Long anio) {
		return anio >= 1 && anio <= 3000;
	}

	public static boolean diaEsValido(Long dia, Long mes, Long anio) {

		if (dia < 1) {
			return false;
		} else if (anioEsBisiesto(anio)) {
			return meses.containsKey(mes) && dia <= meses.get(mes).getMaximoNumeroDiasAnioBisiesto();
		} else {
			return meses.containsKey(mes) && dia <= meses.get(mes).getMaximoNumeroDias();
		}
	}
}