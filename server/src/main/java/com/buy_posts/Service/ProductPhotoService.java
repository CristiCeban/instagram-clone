package com.buy_posts.Service;

import java.util.List;

import com.buy_posts.Model.ProductPhotoDao;
import com.buy_posts.Repository.ProductPhotoRepository;
import com.buy_posts.Repository.ProductRepository;
import com.buy_posts.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;

public class ProductPhotoService {
    

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductPhotoRepository photoRepository;

    public void addPhotosToProduct(List<ProductPhotoDao> photos,long id){

    }
}
