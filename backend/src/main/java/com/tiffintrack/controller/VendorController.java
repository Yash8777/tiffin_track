//package com.tiffintrack.controller;
//
//import com.tiffintrack.entity.Booking;
//import com.tiffintrack.entity.Tiffin;
//import com.tiffintrack.entity.User;
//import com.tiffintrack.service.BookingService;
//import com.tiffintrack.service.TiffinService;
//import com.tiffintrack.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.Optional;
//import java.util.stream.Collectors;
//
//@RestController
//@RequestMapping("/api/vendor")
//@CrossOrigin(origins = "*")
//public class VendorController {
//
//    @Autowired
//    private TiffinService tiffinService;
//
//    @Autowired
//    private BookingService bookingService;
//
//    @Autowired
//    private UserService userService;
//
//    private User getCurrentUser() {
//        String email = SecurityContextHolder.getContext().getAuthentication().getName();
//        return userService.findByEmail(email).orElse(null);
//    }
//
//    @PostMapping("/tiffins")
//    public ResponseEntity<?> addTiffin(@RequestBody TiffinRequest request) {
//        User vendor = getCurrentUser();
//        if (vendor == null) {
//            return ResponseEntity.badRequest().body("User not found");
//        }
//
//        Tiffin tiffin = new Tiffin();
//        tiffin.setVendor(vendor);
//        tiffin.setName(request.getName());
//        tiffin.setDescription(request.getDescription());
//        tiffin.setPhotoUrl(request.getPhotoUrl());
//        tiffin.setLocation(request.getLocation());
//        tiffin.setPrice(request.getPrice());
//        tiffin.setVegNonveg(Tiffin.VegNonVeg.valueOf(request.getVegNonveg()));
//        tiffin.setSubscriptionType(Tiffin.SubscriptionType.valueOf(request.getSubscriptionType()));
//        tiffin.setContactNumber(request.getContactNumber());
//        tiffin.setAvailability(request.getAvailability());
//
//        Tiffin savedTiffin = tiffinService.createTiffin(tiffin);
//        return ResponseEntity.ok(savedTiffin);
//    }
//
//    @GetMapping("/tiffins")
//    public ResponseEntity<List<Map<String, Object>>> getTiffins() {
//        User vendor = getCurrentUser();
//        if (vendor == null) {
//            return ResponseEntity.badRequest().build();
//        }
//
//        List<Tiffin> tiffins = tiffinService.getTiffinsByVendor(vendor);
//        List<Map<String, Object>> response = tiffins.stream().map(this::convertTiffinToMap).collect(Collectors.toList());
//        return ResponseEntity.ok(response);
//    }
//
//    @DeleteMapping("/tiffins/{id}")
//    public ResponseEntity<?> deleteTiffin(@PathVariable Long id) {
//        User vendor = getCurrentUser();
//        Optional<Tiffin> tiffin = tiffinService.getTiffinById(id);
//
//        if (tiffin.isPresent() && tiffin.get().getVendor().getId().equals(vendor.getId())) {
//            tiffinService.deleteTiffin(id);
//            return ResponseEntity.ok().build();
//        }
//
//        return ResponseEntity.badRequest().body("Tiffin not found or unauthorized");
//    }
//
//    @GetMapping("/bookings")
//    public ResponseEntity<List<Map<String, Object>>> getBookings() {
//        User vendor = getCurrentUser();
//        if (vendor == null) {
//            return ResponseEntity.badRequest().build();
//        }
//
//        List<Booking> bookings = bookingService.getBookingsByVendor(vendor);
//        List<Map<String, Object>> response = bookings.stream().map(this::convertBookingToMap).collect(Collectors.toList());
//        return ResponseEntity.ok(response);
//    }
//
//    private Map<String, Object> convertTiffinToMap(Tiffin tiffin) {
//        Map<String, Object> map = new HashMap<>();
//        map.put("id", tiffin.getId());
//        map.put("name", tiffin.getName());
//        map.put("description", tiffin.getDescription());
//        map.put("photoUrl", tiffin.getPhotoUrl());
//        map.put("location", tiffin.getLocation());
//        map.put("price", tiffin.getPrice());
//        map.put("vegNonveg", tiffin.getVegNonveg().toString());
//        map.put("subscriptionType", tiffin.getSubscriptionType().toString());
//        map.put("availability", tiffin.getAvailability());
//        map.put("contactNumber", tiffin.getContactNumber());
//        return map;
//    }
//
//    private Map<String, Object> convertBookingToMap(Booking booking) {
//        Map<String, Object> map = new HashMap<>();
//        map.put("id", booking.getId());
//        map.put("customerName", booking.getCustomer().getName());
//        map.put("tiffinName", booking.getTiffin().getName());
//        map.put("subscriptionPlan", booking.getSubscriptionPlan());
//        map.put("address", booking.getAddress());
//        map.put("contactNumber", booking.getContactNumber());
//        map.put("paymentStatus", booking.getPaymentStatus().toString());
//        map.put("freeTrial", booking.getFreeTrial());
//        return map;
//    }
//
//    public static class TiffinRequest {
//        private String name;
//        private String description;
//        private String photoUrl;
//        private String location;
//        private Double price;
//        private String vegNonveg;
//        private String subscriptionType;
//        private String contactNumber;
//        private Boolean availability;
//
//        // Getters and Setters
//        public String getName() { return name; }
//        public void setName(String name) { this.name = name; }
//        public String getDescription() { return description; }
//        public void setDescription(String description) { this.description = description; }
//        public String getPhotoUrl() { return photoUrl; }
//        public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }
//        public String getLocation() { return location; }
//        public void setLocation(String location) { this.location = location; }
//        public Double getPrice() { return price; }
//        public void setPrice(Double price) { this.price = price; }
//        public String getVegNonveg() { return vegNonveg; }
//        public void setVegNonveg(String vegNonveg) { this.vegNonveg = vegNonveg; }
//        public String getSubscriptionType() { return subscriptionType; }
//        public void setSubscriptionType(String subscriptionType) { this.subscriptionType = subscriptionType; }
//        public String getContactNumber() { return contactNumber; }
//        public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }
//        public Boolean getAvailability() { return availability; }
//        public void setAvailability(Boolean availability) { this.availability = availability; }
//    }
//}

//package com.tiffintrack.controller;
//
//import com.tiffintrack.entity.Booking;
//import com.tiffintrack.entity.Tiffin;
//import com.tiffintrack.entity.User;
//import com.tiffintrack.service.BookingService;
//import com.tiffintrack.service.TiffinService;
//import com.tiffintrack.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.nio.file.StandardCopyOption;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.Optional;
//import java.util.stream.Collectors;
//
//@RestController
//@RequestMapping("/api/vendor")
//@CrossOrigin(origins = "*")
//public class VendorController {
//
//    @Autowired
//    private TiffinService tiffinService;
//
//    @Autowired
//    private BookingService bookingService;
//
//    @Autowired
//    private UserService userService;
//
//    private User getCurrentUser() {
//        String email = SecurityContextHolder.getContext().getAuthentication().getName();
//        return userService.findByEmail(email).orElse(null);
//    }
//
//    @PostMapping("/tiffins")
//    public ResponseEntity<?> addTiffin(
//            @RequestParam("name") String name,
//            @RequestParam("description") String description,
//            @RequestParam("location") String location,
//            @RequestParam("price") Double price,
//            @RequestParam("vegNonveg") String vegNonveg,
//            @RequestParam("subscriptionType") String subscriptionType,
//            @RequestParam("contactNumber") String contactNumber,
//            @RequestParam("availability") Boolean availability,
//            @RequestParam("photo") MultipartFile photoFile) {
//
//        User vendor = getCurrentUser();
//        if (vendor == null) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Vendor not found. Please login.");
//        }
//
//        if (photoFile.isEmpty()) {
//            return ResponseEntity.badRequest().body("Photo file is required.");
//        }
//
//        String photoUrlForDb;
//        try {
//            // Define the directory to save images
//            String uploadDirectory = "src/main/resources/static/images/";
//            Path uploadPath = Paths.get(uploadDirectory);
//
//            // Create the directory if it doesn't exist
//            if (!Files.exists(uploadPath)) {
//                Files.createDirectories(uploadPath);
//            }
//
//            // Save the file to the directory
//            Path filePath = uploadPath.resolve(photoFile.getOriginalFilename());
//            Files.copy(photoFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
//
//            // Set the URL path to be saved in the database
//            photoUrlForDb = "/images/" + photoFile.getOriginalFilename();
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Could not save the image file: " + e.getMessage());
//        }
//
//        try {
//            Tiffin tiffin = new Tiffin();
//            tiffin.setVendor(vendor);
//            tiffin.setName(name);
//            tiffin.setDescription(description);
//            tiffin.setPhotoUrl(photoUrlForDb); // Save the file path in the database
//            tiffin.setLocation(location);
//            tiffin.setPrice(price);
//            tiffin.setVegNonveg(Tiffin.VegNonVeg.valueOf(vegNonveg.toUpperCase()));
//            tiffin.setSubscriptionType(Tiffin.SubscriptionType.valueOf(subscriptionType.toUpperCase()));
//            tiffin.setContactNumber(contactNumber);
//            tiffin.setAvailability(availability);
//
//            Tiffin savedTiffin = tiffinService.createTiffin(tiffin);
//            return ResponseEntity.ok(savedTiffin);
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.badRequest().body("Invalid value provided for VegNonVeg or SubscriptionType.");
//        }
//    }
//
//    @GetMapping("/tiffins")
//    public ResponseEntity<List<Map<String, Object>>> getTiffins() {
//        User vendor = getCurrentUser();
//        if (vendor == null) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
//
//        List<Tiffin> tiffins = tiffinService.getTiffinsByVendor(vendor);
//        List<Map<String, Object>> response = tiffins.stream().map(this::convertTiffinToMap).collect(Collectors.toList());
//        return ResponseEntity.ok(response);
//    }
//
//    @DeleteMapping("/tiffins/{id}")
//    public ResponseEntity<?> deleteTiffin(@PathVariable Long id) {
//        User vendor = getCurrentUser();
//        if (vendor == null) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
//
//        Optional<Tiffin> tiffin = tiffinService.getTiffinById(id);
//
//        if (tiffin.isPresent() && tiffin.get().getVendor().getId().equals(vendor.getId())) {
//            tiffinService.deleteTiffin(id);
//            return ResponseEntity.ok().build();
//        }
//
//        return ResponseEntity.badRequest().body("Tiffin not found or you are not authorized to delete it.");
//    }
//
//    @GetMapping("/bookings")
//    public ResponseEntity<List<Map<Object, Object>>> getBookings() {
//        User vendor = getCurrentUser();
//        if (vendor == null) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
//
//        List<Booking> bookings = bookingService.getBookingsByVendor(vendor);
//        List<Map<Object, Object>> response = bookings.stream().map(this::convertBookingToMap).collect(Collectors.toList());
//        return ResponseEntity.ok(response);
//    }
//
//    private Map<String, Object> convertTiffinToMap(Tiffin tiffin) {
//        Map<String, Object> map = new HashMap<>();
//        map.put("id", tiffin.getId());
//        map.put("name", tiffin.getName());
//        map.put("description", tiffin.getDescription());
//        map.put("photoUrl", tiffin.getPhotoUrl());
//        map.put("location", tiffin.getLocation());
//        map.put("price", tiffin.getPrice());
//        map.put("vegNonveg", tiffin.getVegNonveg().toString());
//        map.put("subscriptionType", tiffin.getSubscriptionType().toString());
//        map.put("availability", tiffin.getAvailability());
//        map.put("contactNumber", tiffin.getContactNumber());
//        return map;
//    }
//
//    private Map<Object, Object> convertBookingToMap(Booking booking) {
//        Map<Object, Object> map = new HashMap<>();
//        map.put("id", booking.getId());
//        map.put("customerName", booking.getCustomer().getName());
//        map.put("tiffinName", booking.getTiffin().getName());
//        map.put("subscriptionPlan", booking.getSubscriptionPlan());
//        map.put("address", booking.getAddress());
//        map.put("contactNumber", booking.getContactNumber());
//        map.put("paymentStatus", booking.getPaymentStatus().toString());
//        map.put("freeTrial", booking.getFreeTrial());
//        return map;
//    }
//}
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
@RequestMapping("/api/vendor")
@CrossOrigin(origins = "*")
public class VendorController {

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

    @PostMapping("/tiffins")
    public ResponseEntity<?> addTiffin(@RequestBody TiffinRequest request) {
        System.out.println("Add tiffin request received: " + request.getName());

        User vendor = getCurrentUser();
        if (vendor == null) {
            System.out.println("Vendor not found");
            return ResponseEntity.badRequest().body("User not found");
        }

        System.out.println("Vendor found: " + vendor.getName() + " (" + vendor.getRole() + ")");

        Tiffin tiffin = new Tiffin();
        tiffin.setVendor(vendor);
        tiffin.setName(request.getName());
        tiffin.setDescription(request.getDescription());
        tiffin.setPhotoUrl(request.getPhotoUrl());
        tiffin.setLocation(request.getLocation());
        tiffin.setPrice(request.getPrice());
        tiffin.setVegNonveg(Tiffin.VegNonVeg.valueOf(request.getVegNonveg()));
        tiffin.setSubscriptionType(Tiffin.SubscriptionType.valueOf(request.getSubscriptionType()));
        tiffin.setContactNumber(request.getContactNumber());
        tiffin.setAvailability(request.getAvailability());

        try {
            Tiffin savedTiffin = tiffinService.createTiffin(tiffin);
            System.out.println("Tiffin saved successfully with ID: " + savedTiffin.getId());
            return ResponseEntity.ok(savedTiffin);
        } catch (Exception e) {
            System.out.println("Error saving tiffin: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error saving tiffin: " + e.getMessage());
        }
    }

    @GetMapping("/tiffins")
    public ResponseEntity<List<Map<String, Object>>> getTiffins() {
        User vendor = getCurrentUser();
        if (vendor == null) {
            return ResponseEntity.badRequest().build();
        }

        List<Tiffin> tiffins = tiffinService.getTiffinsByVendor(vendor);
        List<Map<String, Object>> response = tiffins.stream().map(this::convertTiffinToMap).collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/tiffins/{id}")
    public ResponseEntity<?> deleteTiffin(@PathVariable Long id) {
        User vendor = getCurrentUser();
        Optional<Tiffin> tiffin = tiffinService.getTiffinById(id);

        if (tiffin.isPresent() && tiffin.get().getVendor().getId().equals(vendor.getId())) {
            tiffinService.deleteTiffin(id);
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.badRequest().body("Tiffin not found or unauthorized");
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<Map<String, Object>>> getBookings() {
        User vendor = getCurrentUser();
        if (vendor == null) {
            return ResponseEntity.badRequest().build();
        }

        List<Booking> bookings = bookingService.getBookingsByVendor(vendor);
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
        return map;
    }

    private Map<String, Object> convertBookingToMap(Booking booking) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", booking.getId());
        map.put("customerName", booking.getCustomer().getName());
        map.put("tiffinName", booking.getTiffin().getName());
        map.put("subscriptionPlan", booking.getSubscriptionPlan());
        map.put("address", booking.getAddress());
        map.put("contactNumber", booking.getContactNumber());
        map.put("paymentStatus", booking.getPaymentStatus().toString());
        map.put("freeTrial", booking.getFreeTrial());
        return map;
    }

    public static class TiffinRequest {
        private String name;
        private String description;
        private String photoUrl;
        private String location;
        private Double price;
        private String vegNonveg;
        private String subscriptionType;
        private String contactNumber;
        private Boolean availability;

        // Getters and Setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getPhotoUrl() { return photoUrl; }
        public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }
        public String getLocation() { return location; }
        public void setLocation(String location) { this.location = location; }
        public Double getPrice() { return price; }
        public void setPrice(Double price) { this.price = price; }
        public String getVegNonveg() { return vegNonveg; }
        public void setVegNonveg(String vegNonveg) { this.vegNonveg = vegNonveg; }
        public String getSubscriptionType() { return subscriptionType; }
        public void setSubscriptionType(String subscriptionType) { this.subscriptionType = subscriptionType; }
        public String getContactNumber() { return contactNumber; }
        public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }
        public Boolean getAvailability() { return availability; }
        public void setAvailability(Boolean availability) { this.availability = availability; }
    }
}