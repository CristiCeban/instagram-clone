package com.buy_posts.Model;

import java.util.List;
import java.util.Optional;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
@Entity(name = "products")
public class ProductDao {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long Id;

    private String name;
    
    @Column(name = "long_description" , length = 1024)
    private String longDescription;
    
    @Column(name = "short_description" , length = 1024)
    private String shortDescription;


    private Double price;

    @OneToOne
    @JoinColumn(name = "categoryId",referencedColumnName = "id")
    private CategoryDao category;

    @OneToMany(mappedBy = "productId",cascade = CascadeType.ALL)
    private List<ProductPhotoDao> photos;
    //Photos



    @ManyToOne
    @JoinColumn(name = "userId")
    @NonNull
    private UserDao userId;
    //userId

    public ProductDao(String name, String longDescription, String shortDescription, Double price, CategoryDao category,
            List<ProductPhotoDao> photos, UserDao user) {
        this.name = name;
        this.longDescription = longDescription;
        this.shortDescription = shortDescription;
        this.price = price;
        this.category = category;
        this.photos = photos;
        this.userId = user;
    }

    

}
