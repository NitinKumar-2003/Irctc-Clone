package inventoryservice.service;



import inventoryservice.model.SeatInventory;
import inventoryservice.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class KafkaListenerService {

    @Autowired
    private InventoryRepository inventoryRepository;

    @KafkaListener(topics = "booking-events", groupId = "inventory-group")
    public void consumeBookingEvent(String message) {
        // Assume message format: "trainNumber:date:seatsBooked"
        String[] data = message.split(":");
        String trainNumber = data[0];
        String date = data[1];
        int bookedSeats = Integer.parseInt(data[2]);

        Optional<SeatInventory> inventoryOpt = inventoryRepository.findByTrainNumberAndDate(trainNumber, date);
        if (inventoryOpt.isPresent()) {
            SeatInventory inventory = inventoryOpt.get();
            if (inventory.getAvailableSeats() >= bookedSeats) {
                inventory.setAvailableSeats(inventory.getAvailableSeats() - bookedSeats);
                inventoryRepository.save(inventory);
                System.out.println("Updated inventory for Train: " + trainNumber);
            } else {
                System.out.println("Not enough seats available!");
            }
        } else {
            System.out.println("Inventory not found for Train: " + trainNumber);
        }
    }
}
