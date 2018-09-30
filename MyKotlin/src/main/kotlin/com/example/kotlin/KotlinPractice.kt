package com.example.kotlin

fun main(args: Array<String>) {
    val practice = printSum(1, 2)

    println("1 + 2 = $practice")
    println("1 + 3 = ${sum(1, 3)}")

}

fun sum(a: Int, b: Int): Int = a + b // Return type is optional and if omitted compiler interprets the type

fun printSum(a: Int, b: Int): Unit {
    println("Sum of $a and $b is ${a + b}")
}