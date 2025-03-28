package trainservice.service;


import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;


import trainservice.dto.TrainStatusResponse;
import org.springframework.stereotype.Service;



@Service
public class TrainService {

    private static final String API_KEY = "9638050c4emsh0f36b8a96986ffep10a50ajsn4b861ceec023";
    private static final String API_HOST = "indian-railway-irctc.p.rapidapi.com";
    private static final String API_URL = "https://indian-railway-irctc.p.rapidapi.com/api/trains/v1/train/status";

    public TrainStatusResponse getTrainStatus(String trainNumber, String departureDate) throws Exception {
        // Prepare the HTTP request
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(API_URL + "?departure_date=" + departureDate + "&train_number=" + trainNumber))
                .header("x-rapidapi-key", API_KEY)
                .header("x-rapidapi-host", API_HOST)
                .header("x-rapid-api", "rapid-api-database")
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();

        // Send the request and get the response
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());


    }
}



