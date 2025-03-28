package inventoryservice.service;


import inventoryservice.model.SeatInventory;
import inventoryservice.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    public int getAvailableSeats(String trainNumber, String date) {
        Optional<SeatInventory> inventory = inventoryRepository.findByTrainNumberAndDate(trainNumber, date);
        return inventory.map(SeatInventory::getAvailableSeats).orElse(0);
    }

    public void updateSeatAvailability(String trainNumber, String date, int bookedSeats) {
        SeatInventory inventory = inventoryRepository.findByTrainNumberAndDate(trainNumber, date)
                .orElseThrow(() -> new RuntimeException("No inventory found for this train and date"));

        if (inventory.getAvailableSeats() >= bookedSeats) {
            inventory.setAvailableSeats(inventory.getAvailableSeats() - bookedSeats);
            inventoryRepository.save(inventory);
        } else {
            throw new RuntimeException("Not enough seats available!");
        }
    }
}
