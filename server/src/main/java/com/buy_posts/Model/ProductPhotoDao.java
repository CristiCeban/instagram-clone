package com.buy_posts.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity(name = "product-images")
@NoArgsConstructor
public class ProductPhotoDao {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "image-name")
    private String imagePath;

    @ManyToOne
    @JoinColumn(name = "product-id")
    private ProductDao product;
}
