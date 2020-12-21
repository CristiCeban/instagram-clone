package com.buy_posts.Controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.buy_posts.DTO.ProductDto;
import com.buy_posts.DTO.ProductsDto;
import com.buy_posts.Model.LikedProduct;
import com.buy_posts.Model.PriceResponse;
import com.buy_posts.Model.ProductDao;
import com.buy_posts.Model.ProductPhotoDao;
import com.buy_posts.Model.UserDao;
import com.buy_posts.Repository.UserRepository;
import com.buy_posts.Service.JwtUserDetailsService;
import com.buy_posts.Service.ProductPhotoService;
import com.buy_posts.Service.ProductService;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.multipart.MultipartFile;

import net.bytebuddy.utility.RandomString;

@RestController
@RequestMapping(path = "/api/products")
public class ProductController {
    @Autowired
    private ProductService productService;


    @Autowired
    private ProductPhotoService photoService;

    @Autowired
    private JwtUserDetailsService userService;

    @PostMapping(value = "/add")
    public ResponseEntity<String> addProduct(@RequestParam("files") MultipartFile[] photos, Authentication authenticate,
            String name, String long_description, String short_description, String price, String categoryId)
            throws IOException {

        

        UserDao user = userService.currentUser(authenticate);

        Integer userId = user.getId();

        List<String> fileNames = new ArrayList<>();

        double priceParsed = Double.parseDouble(price);

        long categoryParsed = Long.parseLong(categoryId);

        ProductDto prod = new ProductDto(name, long_description, short_description, priceParsed, categoryParsed);

        Arrays.asList(photos).stream().forEach(file -> {
            try {
                fileNames.add(saveImage(file));
            } catch (IOException e) {
                e.printStackTrace();
            }

        });



        ProductDao product = productService.addProduct(prod, userId);

        List<ProductPhotoDao> productPhotos = new ArrayList<>();

        for (String string : fileNames) {
            productPhotos.add(photoService.addPhotoToProduct(string, product));
        }

       

        return ResponseEntity.ok("Product added");

    }

    @GetMapping(value = "/delete/{id}")
    public void deleteProduct(@PathVariable("id") Long id) {
        productService.deleteProduct(id);
    }

    @GetMapping(value = "{id}")
    public LikedProduct getProduct(@PathVariable("id") Long id, Authentication authentication) {
        
        UserDao user = userService.currentUser(authentication);

        return productService.getProduct(id, user);
    }

    @GetMapping(value = "/category")
    public ProductsDto getProductsByCategory(@RequestParam("page") int page, @RequestParam("size") int size,
            @RequestParam("categoryId") Long categoryId,Authentication authentication) {

        UserDao user = userService.currentUser(authentication);

        return productService.getProducts(page, size, categoryId,user);
    }

    @GetMapping(value = "/category/search")
    public ProductsDto getProductsCategoryAndSearch(@RequestParam("page") int page,
                                                    @RequestParam("size") int size,
                                                    @RequestParam("sort") Integer sort,
                                                    Authentication authentication,
                                                    @RequestParam(required = false, name = "search") String search,
                                                    @RequestParam(required = false, name = "priceStart") Double priceStart,
                                                    @RequestParam(required = false, name = "priceEnd") Double priceEnd,
                                                    @RequestParam("categoryId") Long categoryId)
    {
        
        UserDao user = userService.currentUser(authentication);

        return productService.searchInCategoryProducts(user, categoryId, search, priceStart, priceEnd, page, size, sort);
    }
   
    @GetMapping(path = "/search")
    public ProductsDto getProductsAndSearch(@RequestParam("page") int page,
                                                    @RequestParam("size") int size,
                                                    @RequestParam("sort") Integer sort,
                                                    Authentication authentication,
                                                    @RequestParam(required = false, name = "search") String search,
                                                    @RequestParam(required = false, name = "priceStart") Double priceStart,
                                                    @RequestParam(required = false, name = "priceEnd") Double priceEnd
    )
    {
        UserDao user = userService.currentUser(authentication);

        return productService.searchInProducts(user, search, priceStart, priceEnd, page, size, sort);
    }

    @GetMapping
    public ProductsDto getProducts(@RequestParam("page") int page, @RequestParam("size") int size,
            Authentication authentication) {

        UserDao user = userService.currentUser(authentication);

        return productService.getProducts(page, size, user);
    }

    /**
     * Add product to wish list.
     *
     * @param productId given product Id.
     * @param userId    current user Id.
     */
    @PostMapping(path = "/wish")
    public void addProductToWishList(@RequestParam("productId") Long productId, Authentication authentication) {
        
        UserDao user = userService.currentUser(authentication);

        Integer userId = user.getId();

        productService.addProductToWishList(productId, userId);
    }

    /**
     * @param userId list owner Id.
     * @return List of {@link ProductDao}'s from list.
     */
    @GetMapping(path = "/wish")
    public ProductsDto getAllFromWishList(Authentication authentication,@RequestParam("page") int page, @RequestParam("size") int size) {
        
        UserDao user = userService.currentUser(authentication);
        
        return productService.getAllFromWishList(page,size,user);
    }



    @GetMapping(value = "/wish/delete/{id}")
    public void deleteProductFromBasket(@PathVariable("id") Long productId, Authentication authentication) {

        UserDao user = userService.currentUser(authentication);

        Integer userId = user.getId();

        productService.deleteProductFromWishList(productId, userId);
    }

    

    public String saveImage(@RequestParam("files") MultipartFile img) throws IOException {
        Path path = Paths.get("products");
        if (!Files.exists(path)) {
            Files.createDirectory(path);
        }

        String randomString = RandomString.make(10);
        String sessionId = RequestContextHolder.currentRequestAttributes().getSessionId();
        String hex = DigestUtils.sha256Hex(sessionId);
        String extension = img.getOriginalFilename().split("\\.")[1];
        String filename = "products/" + randomString + hex + "." + extension;
        File upl = new File(filename);
        upl.createNewFile();
        FileOutputStream os = new FileOutputStream(upl);
        os.write(img.getBytes());
        os.close();

        return filename;
    }


    @GetMapping(value = "/price")
    public PriceResponse getPrice(){
        return productService.getMaxMinPrice();
    }
}
