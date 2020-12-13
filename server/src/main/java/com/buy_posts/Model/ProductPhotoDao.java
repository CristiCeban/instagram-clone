package com.buy_posts.Model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity(name = "product_images")
@NoArgsConstructor
public class ProductPhotoDao {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "image_path")
    private String imagePath;

    
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "product_id")
    private ProductDao productId;

    public ProductPhotoDao(String imagePath,  ProductDao product) {
        this.imagePath = imagePath;
        
        this.productId = product;
    }

	

    
}
