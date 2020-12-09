package com.buy_posts.Model;

import java.util.List;

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

@Data
@NoArgsConstructor
@Entity(name = "products")
public class ProductDao {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long Id;

    private String name;
    
    @Column(name = "description" , length = 1024)
    private String description;


    private Double price;

    @OneToOne
    @JoinColumn(name = "categoryId",referencedColumnName = "id")
    private CategoryDao category;

    @OneToMany(mappedBy = "product")
    private List<ProductPhotoDao> photos;
    //Photos


    @ManyToOne
    @JoinColumn(name = "userId")
    private UserDao userDao;
    //userId

}
