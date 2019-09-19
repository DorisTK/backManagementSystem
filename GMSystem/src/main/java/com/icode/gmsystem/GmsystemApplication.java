package com.icode.gmsystem;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.icode.gmsystem.mappers")
public class GmsystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(GmsystemApplication.class, args);
    }

}
