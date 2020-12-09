package com.buy_posts.Repository;

import com.buy_posts.Model.ProductDao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ProductRepository extends PagingAndSortingRepository<ProductDao,Long>{

    Page<ProductDao> findAllByOrderByIdDesc(Pageable pageable);

    Page<ProductDao> findAllByCategoryId(Pageable pageable, Long categoryId);
}
