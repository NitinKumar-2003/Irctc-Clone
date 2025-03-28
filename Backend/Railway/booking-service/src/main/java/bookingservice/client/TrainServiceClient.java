package bookingservice.client;



import bookingservice.dto.TrainAvailabilityResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "train-service", url = "http://localhost:8082") // Modify URL based on your setup
public interface TrainServiceClient {

    @GetMapping("/trains/{trainNumber}/availability")
    TrainAvailabilityResponse getSeatAvailability(@PathVariable String trainNumber);
}
