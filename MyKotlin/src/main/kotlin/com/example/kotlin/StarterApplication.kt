package com.example.kotlin

import de.codecentric.boot.admin.server.config.EnableAdminServer
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
@EnableAdminServer
class StarterApplication

    fun main(args: Array<String>) {

        SpringApplication.run(StarterApplication::class.java, *args)
    }