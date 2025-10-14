package com.tiffintrack.service;

import com.tiffintrack.entity.Booking;
import com.tiffintrack.entity.User;
import com.tiffintrack.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {
    
    @Autowired
    private BookingRepository bookingRepository;
    
    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }
    
    public List<Booking> getBookingsByCustomer(User customer) {
        return bookingRepository.findByCustomer(customer);
    }
    
    public List<Booking> getBookingsByVendor(User vendor) {
        return bookingRepository.findByVendor(vendor);
    }
}