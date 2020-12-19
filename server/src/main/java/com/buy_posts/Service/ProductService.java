package com.buy_posts.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.buy_posts.DTO.ProductDto;
import com.buy_posts.DTO.ProductsDto;
import com.buy_posts.Model.CategoryDao;
import com.buy_posts.Model.LikedProduct;
import com.buy_posts.Model.ProductDao;
import com.buy_posts.Model.ProductPhotoDao;
import com.buy_posts.Model.UserDao;
import com.buy_posts.Model.WishList;
import com.buy_posts.Repository.CategoryRepository;
import com.buy_posts.Repository.ProductPhotoRepository;
import com.buy_posts.Repository.ProductRepository;
import com.buy_posts.Repository.UserRepository;
import com.buy_posts.Repository.WishListRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductPhotoRepository productPhotoRepository;

    @Autowired
    private WishListRepository wishListRepository;

    @Autowired
    private UserRepository userRepository;

    public ProductsDto getProducts(int page, int size,UserDao user) {
        Pageable pageRequest = PageRequest.of(page, size);
        Page<ProductDao> productsPage = productRepository.findAllByOrderByIdDesc(pageRequest);
        List<ProductDao> productList = productsPage.getContent();

        List<LikedProduct> likedProducts = new ArrayList<>();

        for (ProductDao product : productList) {
            boolean isLiked = wishListRepository.existsByUserIdAndProductId(user.getId(), product.getId());
            likedProducts.add(new LikedProduct(product,isLiked));
        }

        long totalElements = productsPage.getTotalElements();
        int totalPages = productsPage.getTotalPages();

        return new ProductsDto(totalElements, totalPages, likedProducts);
    }

    public List<ProductDao> getProductsAsc(int page, int size) {
        Pageable pageRequest = PageRequest.of(page, size);
        Page<ProductDao> productsPage = productRepository.findAllByOrderByIdDesc(pageRequest);
        return productsPage.getContent();
    }

    public List<ProductDao> getProducts(int page, int size, long categoryId) {
        Pageable pageRequest = PageRequest.of(page, size);
        Page<ProductDao> productsPage = productRepository.findAllByCategoryId(pageRequest, categoryId);
        return productsPage.getContent();
    }

    public ProductDao addProduct(ProductDto productInfo,Integer userId) {
        String name = productInfo.getName();
        String longDescription = productInfo.getLong_description();
        String shortDescription = productInfo.getShort_description();
        double price = productInfo.getPrice();
        long categoryId = productInfo.getCategoryId();
        

        CategoryDao category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Invalid Category"));

        // List<ProductPhotoDao> photos = productPhotoRepository.findAllByProductId(userId);
        UserDao user = userRepository.findById(userId).get();

        ProductDao newProduct = new ProductDao(name, longDescription, shortDescription,price, category,user);
        return productRepository.save(newProduct);
        
    }

    public LikedProduct getProduct(long id,UserDao user){
        ProductDao product = productRepository.findById(id).orElseThrow();
        boolean isLiked = wishListRepository.existsByUserIdAndProductId(user.getId(), product.getId());
        return new LikedProduct(product, isLiked);
    }

    
    public ProductDao getProduct(long id){
        return productRepository.findById(id).orElseThrow();
    }

    public void deleteProduct(long id){
        ProductDao product = getProduct(id);
        productRepository.delete(product);
    }

    
    public void addProductToWishList(Long productId, Integer userId) {
        WishList wishList = new WishList(userId, productId);
        wishListRepository.save(wishList);
    }

    public void deleteProductFromWishList(Long productId, Integer userId) {
        WishList wishedProduct = wishListRepository.findByUserIdAndProductId(userId, productId);
        wishListRepository.delete(wishedProduct);
    }

    public List<ProductDao> getAllFromWishList(Integer userId) {
        List<WishList> allByUserId = wishListRepository.findAllByUserId(userId);
        List<Long> list = allByUserId.stream().map(a -> a.getProductId()).collect(Collectors.toList());
        Iterable<ProductDao> products = productRepository.findAllById(list);
        List<ProductDao> result = new ArrayList<>();
        products.forEach(result::add);
        return result;
    }

    // public boolean isLikedByUser(UserDao user,ProductDao product){
    //     if(wishListRepository.existsByUserIdAndProductId(user.getId(), product.getId())){
    //         return true;
    //     }
    //     return false;
    // }


    public ProductsDto searchInCategoryProducts(UserDao user,Long categoryId, String searchTerm,
            Double price1, Double price2, int page, int size, String sort) {
        
        Pageable sortedByPrice = PageRequest.of(page, size, Sort.by("price"));
        
        if(sort == "desc"){
            sortedByPrice = PageRequest.of(page, size, Sort.by("price").descending());
        }
        Page<ProductDao> productsPage = productRepository.findAll(sortedByPrice);
        if(searchTerm == null && price1 != null && price2 != null){
            productsPage = productRepository.findAllByCategoryIdAndPriceBetween(sortedByPrice, categoryId, price1, price2);
        }
        if (searchTerm != null && price1 == null && price2 == null) {
            productsPage = productRepository.findAllByCategoryIdAndNameLike(sortedByPrice, categoryId, searchTerm);
        } 
        if (searchTerm != null && price1 != null && price2 != null) {
             productsPage = productRepository.findAllByCategoryIdAndNameLikeAndPriceBetween(sortedByPrice,categoryId, searchTerm, price1, price2);
        }
       
        List<ProductDao> productList = productsPage.getContent();

        List<LikedProduct> likedProducts = new ArrayList<>();

        for (ProductDao product : productList) {
            boolean isLiked = wishListRepository.existsByUserIdAndProductId(user.getId(), product.getId());
            likedProducts.add(new LikedProduct(product,isLiked));
        }

        long totalElements = productsPage.getTotalElements();
        int totalPages = productsPage.getTotalPages();

        return new ProductsDto(totalElements, totalPages, likedProducts);
    }
}
