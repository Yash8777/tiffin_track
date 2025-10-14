

package com.tiffintrack.controller;

import com.tiffintrack.entity.Booking;
import com.tiffintrack.entity.Tiffin;
import com.tiffintrack.entity.User;
import com.tiffintrack.service.BookingService;
import com.tiffintrack.service.TiffinService;
import com.tiffintrack.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin(origins = "*")
public class CustomerController {

    @Autowired
    private TiffinService tiffinService;

    @Autowired
    private BookingService bookingService;

    @Autowired
    private UserService userService;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("Current authenticated email: " + email);
        return userService.findByEmail(email).orElse(null);
    }

    @GetMapping("/tiffins")
    public ResponseEntity<List<Map<String, Object>>> getAllTiffins() {
        List<Tiffin> tiffins = tiffinService.getAllAvailableTiffins();
        List<Map<String, Object>> response = tiffins.stream().map(this::convertTiffinToMap).collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/bookings")
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest request) {
        User customer = getCurrentUser();
        if (customer == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        Optional<Tiffin> tiffinOpt = tiffinService.getTiffinById(request.getTiffinId());
        if (!tiffinOpt.isPresent()) {
            return ResponseEntity.badRequest().body("Tiffin not found");
        }

        Booking booking = new Booking();
        booking.setTiffin(tiffinOpt.get());
        booking.setCustomer(customer);
        booking.setSubscriptionPlan(request.getSubscriptionPlan());
        booking.setAddress(request.getAddress());
        booking.setContactNumber(request.getContactNumber());
        booking.setFreeTrial(request.getFreeTrial());

        if (request.getFreeTrial()) {
            booking.setPaymentStatus(Booking.PaymentStatus.PAID);
        } else {
            booking.setPaymentStatus(Booking.PaymentStatus.PENDING);
        }

        Booking savedBooking = bookingService.createBooking(booking);
        return ResponseEntity.ok(savedBooking);
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<Map<String, Object>>> getBookings() {
        User customer = getCurrentUser();
        if (customer == null) {
            return ResponseEntity.badRequest().build();
        }

        List<Booking> bookings = bookingService.getBookingsByCustomer(customer);
        List<Map<String, Object>> response = bookings.stream().map(this::convertBookingToMap).collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    private Map<String, Object> convertTiffinToMap(Tiffin tiffin) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", tiffin.getId());
        map.put("name", tiffin.getName());
        map.put("description", tiffin.getDescription());
        map.put("photoUrl", tiffin.getPhotoUrl());
        map.put("location", tiffin.getLocation());
        map.put("price", tiffin.getPrice());
        map.put("vegNonveg", tiffin.getVegNonveg().toString());
        map.put("subscriptionType", tiffin.getSubscriptionType().toString());
        map.put("availability", tiffin.getAvailability());
        map.put("contactNumber", tiffin.getContactNumber());
        map.put("vendorName", tiffin.getVendor().getName());
        return map;
    }

    private Map<String, Object> convertBookingToMap(Booking booking) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", booking.getId());
        map.put("tiffinName", booking.getTiffin().getName());
        map.put("subscriptionPlan", booking.getSubscriptionPlan());
        map.put("address", booking.getAddress());
        map.put("paymentStatus", booking.getPaymentStatus().toString());
        map.put("freeTrial", booking.getFreeTrial());
        return map;
    }

    public static class BookingRequest {
        private Long tiffinId;
        private String subscriptionPlan;
        private String address;
        private String contactNumber;
        private Boolean freeTrial = false;

        // Getters and Setters
        public Long getTiffinId() { return tiffinId; }
        public void setTiffinId(Long tiffinId) { this.tiffinId = tiffinId; }
        public String getSubscriptionPlan() { return subscriptionPlan; }
        public void setSubscriptionPlan(String subscriptionPlan) { this.subscriptionPlan = subscriptionPlan; }
        public String getAddress() { return address; }
        public void setAddress(String address) { this.address = address; }
        public String getContactNumber() { return contactNumber; }
        public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }
        public Boolean getFreeTrial() { return freeTrial; }
        public void setFreeTrial(Boolean freeTrial) { this.freeTrial = freeTrial; }
    }
}
