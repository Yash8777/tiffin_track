package com.tiffintrack.repository;

import com.tiffintrack.entity.Tiffin;
import com.tiffintrack.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TiffinRepository extends JpaRepository<Tiffin, Long> {
    List<Tiffin> findByVendor(User vendor);
    List<Tiffin> findByAvailabilityTrue();
}