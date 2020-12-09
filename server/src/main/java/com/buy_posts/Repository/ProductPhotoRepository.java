package com.buy_posts.Repository;

import java.util.List;

import com.buy_posts.Model.ProductPhotoDao;

import org.springframework.data.repository.CrudRepository;

public interface ProductPhotoRepository extends CrudRepository<ProductPhotoDao,Long> {
    
    
    List<ProductPhotoDao> findProductPhotosById(long id);



}
