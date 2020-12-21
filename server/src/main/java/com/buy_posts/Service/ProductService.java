package com.buy_posts.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.buy_posts.DTO.ProductDto;
import com.buy_posts.DTO.ProductsDto;
import com.buy_posts.Model.CategoryDao;
import com.buy_posts.Model.LikedProduct;
import com.buy_posts.Model.PriceResponse;
import com.buy_posts.Model.ProductDao;
import com.buy_posts.Model.UserDao;
import com.buy_posts.Model.WishList;
import com.buy_posts.Repository.CategoryRepository;
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
    private WishListRepository wishListRepository;

    @Autowired
    private UserRepository userRepository;

    public ProductsDto getProducts(int page, int size,UserDao user) {
        Pageable pageRequest = PageRequest.of(page, size);
        Page<ProductDao> productsPage = productRepository.findAllByOrderByIdDesc(pageRequest);
        List<ProductDao> productList = productsPage.getContent();

        List<LikedProduct> likedProducts = getLikedList(productList,user);

        long totalElements = productsPage.getTotalElements();
        int totalPages = productsPage.getTotalPages();

        return new ProductsDto(totalElements, totalPages, likedProducts);
    }



    public ProductsDto getProducts(int page, int size, long categoryId,UserDao user) {
        Pageable pageRequest = PageRequest.of(page, size);
        Page<ProductDao> productsPage = productRepository.findAllByCategoryIdOrderByIdDesc(pageRequest, categoryId);

        List<ProductDao> productList = productsPage.getContent();

        List<LikedProduct> likedProducts = getLikedList(productList,user);

        long totalElements = productsPage.getTotalElements();
        int totalPages = productsPage.getTotalPages();

        return new ProductsDto(totalElements, totalPages, likedProducts);
    }

    public ProductDao addProduct(ProductDto productInfo,Integer userId) {
        String name = productInfo.getName();
        String longDescription = productInfo.getLong_description();
        String shortDescription = productInfo.getShort_description();
        double price = productInfo.getPrice();
        long categoryId = productInfo.getCategoryId();
        

        CategoryDao category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Invalid Category"));

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

    public ProductsDto getAllFromWishList(int page, int size,UserDao user) {

        Pageable wishPage = PageRequest.of(page, size);

        Page<WishList> allByUserId = wishListRepository.findAllByUserId(wishPage,user.getId());

        List<Long> list = allByUserId.stream().map(a -> a.getProductId()).collect(Collectors.toList());

        Iterable<ProductDao> products = productRepository.findAllById(list);

        List<ProductDao> result = new ArrayList<>();

        products.forEach(result::add);

        long totalElements = allByUserId.getTotalElements();
        int totalPages = allByUserId.getTotalPages();

        List<LikedProduct> likedProducts = getLikedList(result,user);

        return new ProductsDto(totalElements, totalPages, likedProducts);
        
    }

    public PriceResponse getMaxMinPrice(){
        ProductDao maxPrice = productRepository.findFirstByOrderByPriceDesc();
        ProductDao minPrice = productRepository.findFirstByOrderByPrice();

        return new PriceResponse(maxPrice.getPrice(),minPrice.getPrice());
    }


    public ProductsDto searchInCategoryProducts(UserDao user,Long categoryId, String searchTerm,
            Double price1, Double price2, int page, int size, Integer sort) {
        
        Sort sortOrder = Sort.by("price").ascending(); 
        Pageable sortedByPrice = PageRequest.of(page, size, sortOrder);
        
        if(sort == 0){
            sortedByPrice = PageRequest.of(page, size, Sort.by("price").descending());
        }

        Page<ProductDao> productsPage = productRepository.findAllByCategoryId(sortedByPrice,categoryId);

        if(searchTerm == null && price1 != null && price2 != null){
            productsPage = productRepository.findAllByCategoryIdAndPriceBetween(sortedByPrice, categoryId, price1, price2);
        }
        if (searchTerm != null && price1 == null && price2 == null) {
            productsPage = productRepository.findAllByCategoryIdAndNameContaining(sortedByPrice, categoryId,
                    searchTerm);
        } 
        if (searchTerm != null && price1 != null && price2 != null) {
             productsPage = productRepository.findAllByCategoryIdAndNameContainingAndPriceBetween(sortedByPrice,
                     categoryId, searchTerm, price1, price2);
        }
       
        List<ProductDao> productList = productsPage.getContent();

        List<LikedProduct> likedProducts = getLikedList(productList,user);

        long totalElements = productsPage.getTotalElements();
        int totalPages = productsPage.getTotalPages();

        return new ProductsDto(totalElements, totalPages, likedProducts);
    }

    public ProductsDto searchInProducts(UserDao user, String searchTerm,
            Double price1, Double price2, int page, int size, Integer sort) {
        
        Sort sortOrder = Sort.by("price").ascending(); 
        Pageable sortedByPrice = PageRequest.of(page, size,sortOrder);
        
        if(sort == 0){
            sortedByPrice = PageRequest.of(page, size, Sort.by("price").descending());
        }
        Page<ProductDao> productsPage = productRepository.findAll(sortedByPrice);
        if(searchTerm == null && price1 != null && price2 != null){
            productsPage = productRepository.findAllByPriceBetween(sortedByPrice,  price1, price2);
        }
        if (searchTerm != null && price1 == null && price2 == null) {
            productsPage = productRepository.findAllByNameContaining(sortedByPrice,
                    searchTerm);
        } 
        if (searchTerm != null && price1 != null && price2 != null) {
             productsPage = productRepository.findAllByNameContainingAndPriceBetween(sortedByPrice,
                      searchTerm, price1, price2);
        }
       
        List<ProductDao> productList = productsPage.getContent();

        List<LikedProduct> likedProducts = getLikedList(productList,user);

        long totalElements = productsPage.getTotalElements();
        int totalPages = productsPage.getTotalPages();

        return new ProductsDto(totalElements, totalPages, likedProducts);
    }

    private List<LikedProduct> getLikedList(List<ProductDao> list,UserDao user){
        List<LikedProduct> likedProducts = new ArrayList<>();

        for (ProductDao product : list) {
            boolean isLiked = wishListRepository.existsByUserIdAndProductId(user.getId(), product.getId());
            likedProducts.add(new LikedProduct(product,isLiked));
        }

        return likedProducts;
    }
}
