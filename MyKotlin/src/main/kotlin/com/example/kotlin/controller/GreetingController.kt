package com.example.kotlin.controller

import com.example.kotlin.data.GreetingData
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.concurrent.atomic.AtomicLong

@RestController
class GreetingController {

    val counter = AtomicLong()

    @GetMapping("/greeting")
    fun greeting(@RequestParam(value= "name", defaultValue = "World!") name: String)
            = GreetingData(counter.incrementAndGet(), "Hello, $name")
}
