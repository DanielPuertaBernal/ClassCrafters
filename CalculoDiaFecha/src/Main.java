import java.time.LocalDate;
//import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.InputMismatchException;
import java.util.Scanner;

public class Main {
    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        int opc;

        do {
            try {
                System.out.println("Calculadora de fechas pasadas");
                System.out.println(" ");
                System.out.println("1. Ingresar la fecha y calcularla");
                System.out.println("2. Salir");
                System.out.println(" ");
                System.out.println("Digite una opcion: ");
                opc = scanner.nextInt();
                scanner.nextLine();

                switch (opc) {
                    case 1:
                        calcularFecha();
                        break;
                    case 2:
                        System.out.println("Finalizado");
                        break;
                    default:
                        System.out.println("Opcion invalida, digite nuevamente.");
                }
            } catch (InputMismatchException e) {
                System.out.println("Entrada no valida. Por favor, ingrese un numero.");
                scanner.nextLine();
                opc = 0;
            }
        } while (opc != 2);
    }

    private static void calcularFecha() {
        try {
            System.out.println("Ingrese la fecha del pasado en formato (dia/mes/año): ");
            String fechaString = scanner.nextLine();

            String[] partesFecha = fechaString.split("/");
            if (partesFecha.length != 3) {
                throw new IllegalArgumentException("Formato de fecha incorrecto.");
            }

            byte dia = Byte.parseByte(partesFecha[0]);
            byte mes = Byte.parseByte(partesFecha[1]);
            short anio = Short.parseShort(partesFecha[2]);

            // Obteniendo la fecha actual
            LocalDate fechaActual = LocalDate.now();

            // Creando la fecha del usuario
            LocalDate fechaUsuario = LocalDate.of(anio, mes, dia);

            // Verificar si la fecha ingresada es futura
            if (fechaUsuario.isAfter(fechaActual)) {
                throw new IllegalArgumentException("La fecha ingresada es futura.");
            }

            // Calculando la diferencia entre las fechas
            long diferencia = calcularDiferenciaFechas(fechaUsuario, fechaActual);

            // Mostrar el resultado en la unidad de tiempo seleccionada por el usuario
            mostrarResultado(diferencia);

        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }

    private static long calcularDiferenciaFechas(LocalDate fechaUsuario, LocalDate fechaActual) {
        // Calculando la diferencia en días entre las fechas
        return ChronoUnit.DAYS.between(fechaUsuario, fechaActual);
    }

    private static void mostrarResultado(long diferencia) {
        System.out.println("Seleccione la unidad de tiempo para mostrar el tiempo transcurrido:");
        System.out.println("1. Segundos");
        System.out.println("2. Minutos");
        System.out.println("3. Horas");
        System.out.println("4. Días");
        System.out.println("5. Semanas");
        System.out.println("6. Meses");
        System.out.println("7. Años");

        int opcion = scanner.nextInt();
        scanner.nextLine();

        switch (opcion) {
            case 1:
                System.out.println("Han pasado " + diferencia * 24 * 60 * 60 + " segundos.");
                break;
            case 2:
                System.out.println("Han pasado " + diferencia * 24 * 60 + " minutos.");
                break;
            case 3:
                System.out.println("Han pasado " + diferencia * 24 + " horas.");
                break;
            case 4:
                System.out.println("Han pasado " + diferencia + " días.");
                break;
            case 5:
                System.out.println("Han pasado " + diferencia / 7 + " semanas.");
                break;
            case 6:
                System.out.println("Han pasado " + diferencia / 30 + " meses."); // Suponiendo 30 días por mes
                break;
            case 7:
                System.out.println("Han pasado " + diferencia / 365 + " años."); // Suponiendo 365 días por año
                break;
            default:
                System.out.println("Opcion invalida.");
        }
    }
}
