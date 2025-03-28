package bookingservice.dto;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingRequest {
    private String trainNumber;
    private String classType;
    private int numberOfSeats;
    private String userEmail;
}
