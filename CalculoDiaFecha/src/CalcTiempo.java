import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

public class CalcTiempo {

    private CalcTiempo() {
    }

    public static void tiempo(LocalDate fechaUsuario, LocalDate fechaActual) {
        LocalDateTime fechaUsuarioInicio = fechaUsuario.atStartOfDay();
        LocalDateTime fechaActualInicio = fechaActual.atStartOfDay();

        long añosTranscurridos = ChronoUnit.YEARS.between(fechaUsuario, fechaActual);
        fechaUsuarioInicio = fechaUsuarioInicio.plusYears(añosTranscurridos);

        long mesesTranscurridos = ChronoUnit.MONTHS.between(fechaUsuarioInicio.toLocalDate(), fechaActual);
        fechaUsuarioInicio = fechaUsuarioInicio.plusMonths(mesesTranscurridos);

        long semanasTranscurridas = ChronoUnit.WEEKS.between(fechaUsuarioInicio.toLocalDate(), fechaActual);
        fechaUsuarioInicio = fechaUsuarioInicio.plusWeeks(semanasTranscurridas);

        long díasTranscurridos = ChronoUnit.DAYS.between(fechaUsuarioInicio.toLocalDate(), fechaActual);
        fechaUsuarioInicio = fechaUsuarioInicio.plusDays(díasTranscurridos);

        long horasTranscurridas = ChronoUnit.HOURS.between(fechaUsuarioInicio, fechaActualInicio);
        fechaUsuarioInicio = fechaUsuarioInicio.plusHours(horasTranscurridas);

        long minutosTranscurridos = ChronoUnit.MINUTES.between(fechaUsuarioInicio, fechaActualInicio);
        fechaUsuarioInicio = fechaUsuarioInicio.plusMinutes(minutosTranscurridos);

        long segundosTranscurridos = ChronoUnit.SECONDS.between(fechaUsuarioInicio, fechaActualInicio);

        String mensaje = String.format("Tiempo transcurrido de la fecha actual:\n%d años,\n%d meses,\n%d semanas,\n%d días,\n%d horas,\n%d minutos,\n%d segundos.", añosTranscurridos, mesesTranscurridos, semanasTranscurridas, díasTranscurridos, horasTranscurridas, minutosTranscurridos, segundosTranscurridos);

        System.out.println(mensaje);
    }
}
