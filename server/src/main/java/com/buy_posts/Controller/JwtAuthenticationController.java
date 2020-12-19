package com.buy_posts.Controller;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.buy_posts.Configuration.JwtTokenUtil;
import com.buy_posts.DTO.UserDto;
import com.buy_posts.Model.JwtRequest;
import com.buy_posts.Model.JwtResponse;
import com.buy_posts.Model.LikedProduct;
import com.buy_posts.Model.ProductDao;
import com.buy_posts.Model.ProfileResponse;
import com.buy_posts.Model.UserDao;
import com.buy_posts.Repository.ProductRepository;
import com.buy_posts.Repository.UserRepository;
import com.buy_posts.Repository.WishListRepository;
import com.buy_posts.Service.JwtUserDetailsService;
import com.buy_posts.Service.ProductPhotoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping(path = "/api")
public class JwtAuthenticationController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private JwtUserDetailsService userDetailsService;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private ProductController productController;

	@Autowired
	private WishListRepository wishListRepository;

	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity<?> generateAuthenticationToken(@RequestBody JwtRequest authenticationRequest)
			throws Exception {

		authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

		final String token = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new JwtResponse(token));
	}

	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<?> saveUser(@RequestBody UserDto user) throws Exception {
		userDetailsService.save(user);
		final UserDetails userdetails = new User(user.getEmail(), user.getPassword(), new ArrayList<>());
		final String token = jwtTokenUtil.generateToken(userdetails);
		return ResponseEntity.ok(new JwtResponse(token));
	}

	private void authenticate(String username, String password) throws Exception {
		Objects.requireNonNull(username);
		Objects.requireNonNull(password);
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}

	@GetMapping(value = "/me")
	private ProfileResponse getProf(Authentication authenticate) {
		String username = authenticate.getName();
		UserDao user = userRepository.findByEmail(username);

		List<ProductDao> userProducts = productRepository.findAllByUserId(user);
		
		List<LikedProduct> likedProducts = new ArrayList<>();

        for (ProductDao product : userProducts) {
            boolean isLiked = wishListRepository.existsByUserIdAndProductId(user.getId(), product.getId());
            likedProducts.add(new LikedProduct(product,isLiked));
        }

		return new ProfileResponse(user, likedProducts);

	}

	@GetMapping(value = "/profile/{id}")
	private ProfileResponse getProf(@PathVariable("id") Integer id) {
		UserDao user = userRepository.findById(id).orElseThrow();

		List<ProductDao> userProducts = productRepository.findAllByUserId(user);

		List<LikedProduct> likedProducts = new ArrayList<>();

        for (ProductDao product : userProducts) {
            boolean isLiked = wishListRepository.existsByUserIdAndProductId(user.getId(), product.getId());
            likedProducts.add(new LikedProduct(product,isLiked));
        }

		return new ProfileResponse(user, likedProducts);
	}

	@PostMapping(value = "/me/update")
	private void updateProf(Authentication authentication,
			@RequestParam(required = false, name = "imagePath") MultipartFile fotka,
			@RequestParam(required = false, name = "name") String name,@RequestParam(required = false, name = "phone") String phone,@RequestParam(required = false, name = "username") String username) throws IOException {
		String profUsername = authentication.getName();
		UserDao user = userRepository.findByEmail(profUsername);
		UserDto updatedUser = new UserDto();
		System.out.println("S-a intrat");
		if (fotka != null) {
			String imagePath = productController.saveImage(fotka);
			updatedUser.setImagePath(imagePath);
			System.out.println("Saved");
		}
		if(name != null){
			updatedUser.setName(name);
		}
		if (phone != null) {
			updatedUser.setPhone(phone);
		}
		if (username != null) {
			updatedUser.setUsername(username);;
		}
		userDetailsService.updateProf(user, updatedUser);
	}
 }
