package com.buy_posts.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.buy_posts.DTO.ProductPhotoDto;
import com.buy_posts.Model.ProductDao;
import com.buy_posts.Model.ProductPhotoDao;
import com.buy_posts.Repository.ProductPhotoRepository;
import com.buy_posts.Repository.ProductRepository;
import com.buy_posts.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class ProductPhotoService {
    

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductPhotoRepository photoRepository;

    public ProductPhotoDao addPhotoToProduct(String path,ProductDao product){
        ProductPhotoDao photoDao = new ProductPhotoDao(path, product);

        return photoRepository.save(photoDao);
    }

    public List<ProductPhotoDao> getPhotos(long productId){
        return photoRepository.findAllByProductId(productId);
    }
}