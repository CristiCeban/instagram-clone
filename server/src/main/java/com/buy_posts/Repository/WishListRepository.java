package com.buy_posts.Repository;

import java.util.List;

import com.buy_posts.Model.WishList;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WishListRepository extends CrudRepository<WishList,Long>{

    Page<WishList> findAllByUserId(Pageable pageable,Integer userId);

    WishList findByUserIdAndProductId(Integer userId, Long productId);

    boolean existsByUserIdAndProductId(Integer userId, long productId);
}
