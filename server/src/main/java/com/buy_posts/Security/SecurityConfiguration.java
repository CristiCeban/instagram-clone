package com.buy_posts.Security;

import java.util.Arrays;

import com.buy_posts.Configuration.JwtAuthenticationEntryPoint;
import com.buy_posts.Configuration.JwtRequestFilter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter{

    @Autowired
	private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

	@Autowired
	private UserDetailsService jwtUserDetailsService;

	@Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		// configure AuthenticationManager so that it knows from where to load
		// user for matching credentials
		// Use BCryptPasswordEncoder
		auth.userDetailsService(jwtUserDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http
            .cors().and().csrf().disable()
            .authorizeRequests()
            .antMatchers("/").permitAll()
            .antMatchers("/products/**").permitAll()
            .antMatchers("/admin/**").hasRole("ADMIN")
            .antMatchers("/api/**").permitAll()
            .anyRequest().authenticated()
            .and()
            .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint)
            .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS);


            http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
            // .and()
            // .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            // .antMatchers(HttpMethod.GET,"/all").permitAll()
            // .antMatchers(HttpMethod.POST,"/add-user").permitAll()
            // .and()
            // .formLogin()
            //     .defaultSuccessUrl("/", true)
            //     .loginPage("/login").permitAll()
            //     .and()
            //     .logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout")).logoutSuccessUrl("/login");


    }

    // @Bean
	// @Override
	// public UserDetailsService userDetailsService() {
	// 	UserDetails user =
	// 		 User.withDefaultPasswordEncoder()
	// 			.username("user")
	// 			.password("password")
	// 			.roles("USER")
	// 			.build();

	// 	return new InMemoryUserDetailsManager(user);
    // }


    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

//     @Bean
// CorsConfigurationSource corsConfigurationSource() {
//     CorsConfiguration configuration = new CorsConfiguration();
//     configuration.setAllowedOrigins(Arrays.asList("*"));
//     configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH"));
//     configuration.setAllowCredentials(true);
//     //the below three lines will add the relevant CORS response headers
//     configuration.addAllowedOrigin("*");
//     configuration.addAllowedHeader("*");
//     configuration.addAllowedMethod("*");
//     configuration.addAllowedOriginPattern();
//     UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//     source.registerCorsConfiguration("/**", configuration);
//     return source;
// }

// @Bean
// public CorsFilter corsFilter() {
//     UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//     CorsConfiguration config = new CorsConfiguration();
//     config.setAllowedOrigins(Arrays.asList("*"));
//     config.setAllowCredentials(true);
//     config.addAllowedOrigin("*");
//     config.addAllowedHeader("*");
//     config.addAllowedMethod("OPTIONS");
//     config.addAllowedMethod("GET");
//     config.addAllowedMethod("POST");
//     config.addAllowedMethod("PUT");
//     config.addAllowedMethod("DELETE");
//     source.registerCorsConfiguration("/**", config);
//     return new CorsFilter(source);
// }

}
