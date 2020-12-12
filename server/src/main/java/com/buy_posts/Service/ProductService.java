package com.buy_posts.Service;

import java.util.List;
import java.util.Optional;

import com.buy_posts.DTO.ProductDto;
import com.buy_posts.DTO.ProductsDto;
import com.buy_posts.Model.CategoryDao;
import com.buy_posts.Model.ProductDao;
import com.buy_posts.Model.ProductPhotoDao;
import com.buy_posts.Model.UserDao;
import com.buy_posts.Repository.CategoryRepository;
import com.buy_posts.Repository.ProductPhotoRepository;
import com.buy_posts.Repository.ProductRepository;
import com.buy_posts.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductPhotoRepository productPhotoRepository;

    @Autowired
    private UserRepository userRepository;

    public ProductsDto getProducts(int page, int size) {
        Pageable pageRequest = PageRequest.of(page, size);
        Page<ProductDao> productsPage = productRepository.findAll(pageRequest);
        List<ProductDao> productList = productsPage.getContent();
        long totalElements = productsPage.getTotalElements();
        int totalPages = productsPage.getTotalPages();

        return new ProductsDto(totalElements, totalPages, productList);
    }

    public List<ProductDao> getProductsAsc(int page, int size) {
        Pageable pageRequest = PageRequest.of(page, size);
        Page<ProductDao> productsPage = productRepository.findAllByOrderByIdDesc(pageRequest);
        return productsPage.getContent();
    }

    public List<ProductDao> getProducts(int page, int size, Long categoryId) {
        Pageable pageRequest = PageRequest.of(page, size);
        Page<ProductDao> productsPage = productRepository.findAllByCategoryId(pageRequest, categoryId);
        return productsPage.getContent();
    }

    public void addProduct(ProductDto productInfo,Integer userId) {
        String name = productInfo.getName();
        String longDescription = productInfo.getLong_description();
        String shortDescription = productInfo.getLong_description();
        double price = productInfo.getPrice();
        long categoryId = productInfo.getCategoryId();
        

        CategoryDao category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Invalid Category"));

        List<ProductPhotoDao> photos = productPhotoRepository.findAllByProductId(userId);

        
            
            UserDao user = userRepository.findById(userId).get();
            
        

        ProductDao newProduct = new ProductDao(name, longDescription, shortDescription,price, category, photos,user);
        productRepository.save(newProduct);
        
    }
    // public void addProductToBasket(Long productId, Long userId) {
    //     BasketProduct basketProduct = new BasketProduct(userId, productId);
    //     basketProductRepository.save(basketProduct);
    // }

    // public void deleteProductFromBasket(Long productId, Long userId) {
    //     BasketProduct basketProduct = basketProductRepository.findByUserIdAndProductId(userId, productId);
    //     basketProductRepository.delete(basketProduct);
    // }

    // public List<Product> getAllFromBasket(Long userId) {
    //     List<BasketProduct> allByUserId = basketProductRepository.findAllByUserId(userId);
    //     List<Long> list = allByUserId.stream().map(a -> a.getProductId()).collect(Collectors.toList());
    //     Iterable<Product> products = productRepository.findAllById(list);
    //     List<Product> result = new ArrayList<>();
    //     products.forEach(result::add);
    //     return result;
    // }
}
