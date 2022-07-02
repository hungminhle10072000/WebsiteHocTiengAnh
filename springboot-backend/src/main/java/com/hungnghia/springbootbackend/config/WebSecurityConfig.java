package com.hungnghia.springbootbackend.config;

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

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    private UserDetailsService jwtUserDetailsService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(jwtUserDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf().disable()
                .authorizeRequests().antMatchers("/authenticate", "/register", "/api/users/check-username-email", "/api/user-topic-vocas",
                        "/api/user-vocabulary/**", "/api/user-grammars", "/api/user-grammars/**", "/api/course/getAll",
                        "/api/course/edit/**", "/api/comment/getCommentByLessonId/**", "/api/comment/getCommentByVocabularyTopicId/**",
                        "/api/comment/getCommentByGrammarId/**", "/api/question/findQuestionByExerciseId/**",
                        "/api/resultdetail/addAnswers", "/api/result/findResultsByUserIdAndExerciseId", "/api/exercise/reset/**",
                        "/api/course/**", "/api/exercise", "/api/exercise/getAll", "/api/user-topic-vocas-new",
                        "/api/course/user-course-new"
                        , "/registerMobile", "/api/user-vocabulary/random/**","/api/user-vocabulary/write-score/**","/api/statistical/**"
                        ,"/api/statistical/**","/api/usersMobile","/api/usersMobile2", "/api/users/change-passWord-mobile", "/api/**"
//                        , "/api/users/change-passWord"
                ).permitAll().
                anyRequest().authenticated().and().
                exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }
}

