package com.tiffintrack.service;

import com.tiffintrack.entity.Tiffin;
import com.tiffintrack.entity.User;
import com.tiffintrack.repository.TiffinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TiffinService {
    
    @Autowired
    private TiffinRepository tiffinRepository;
    
    public Tiffin createTiffin(Tiffin tiffin) {
        return tiffinRepository.save(tiffin);
    }
    
    public List<Tiffin> getTiffinsByVendor(User vendor) {
        return tiffinRepository.findByVendor(vendor);
    }
    
    public List<Tiffin> getAllAvailableTiffins() {
        return tiffinRepository.findByAvailabilityTrue();
    }
    
    public Optional<Tiffin> getTiffinById(Long id) {
        return tiffinRepository.findById(id);
    }
    
    public Tiffin updateTiffin(Tiffin tiffin) {
        return tiffinRepository.save(tiffin);
    }
    
    public void deleteTiffin(Long id) {
        tiffinRepository.deleteById(id);
    }
}