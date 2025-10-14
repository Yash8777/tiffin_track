package com.tiffintrack.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "tiffin_id", nullable = false)
    private Tiffin tiffin;
    
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;
    
    @Column(name = "subscription_plan", nullable = false)
    private String subscriptionPlan;
    
    @Column(columnDefinition = "TEXT", nullable = false)
    private String address;
    
    @Column(name = "contact_number", nullable = false)
    private String contactNumber;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false)
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;
    
    @Column(name = "free_trial", nullable = false)
    private Boolean freeTrial = false;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    public enum PaymentStatus {
        PENDING, PAID
    }
    
    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Tiffin getTiffin() {
        return tiffin;
    }
    
    public void setTiffin(Tiffin tiffin) {
        this.tiffin = tiffin;
    }
    
    public User getCustomer() {
        return customer;
    }
    
    public void setCustomer(User customer) {
        this.customer = customer;
    }
    
    public String getSubscriptionPlan() {
        return subscriptionPlan;
    }
    
    public void setSubscriptionPlan(String subscriptionPlan) {
        this.subscriptionPlan = subscriptionPlan;
    }
    
    public String getAddress() {
        return address;
    }
    
    public void setAddress(String address) {
        this.address = address;
    }
    
    public String getContactNumber() {
        return contactNumber;
    }
    
    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }
    
    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }
    
    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
    
    public Boolean getFreeTrial() {
        return freeTrial;
    }
    
    public void setFreeTrial(Boolean freeTrial) {
        this.freeTrial = freeTrial;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}