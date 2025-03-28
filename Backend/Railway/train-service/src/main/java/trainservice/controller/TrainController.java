package trainservice.controller;



import trainservice.service.TrainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;



import trainservice.dto.TrainStatusResponse;
import trainservice.service.TrainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TrainController {

    private final TrainService trainService;

    @Autowired
    public TrainController(TrainService trainService) {
        this.trainService = trainService;
    }

    @GetMapping("/train/{trainNumber}/status")
    public TrainStatusResponse getTrainStatus(@PathVariable String trainNumber, @RequestParam String departureDate) {
        try {
            return trainService.getTrainStatus(trainNumber, departureDate);
        } catch (Exception e) {
            e.printStackTrace();
            return new TrainStatusResponse();
        }
    }
}
