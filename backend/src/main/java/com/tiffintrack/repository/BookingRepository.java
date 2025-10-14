package com.tiffintrack.repository;

import com.tiffintrack.entity.Booking;
import com.tiffintrack.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByCustomer(User customer);
    
    @Query("SELECT b FROM Booking b WHERE b.tiffin.vendor = :vendor")
    List<Booking> findByVendor(@Param("vendor") User vendor);
}