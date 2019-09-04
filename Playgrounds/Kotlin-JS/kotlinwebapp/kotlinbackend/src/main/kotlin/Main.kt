//Main.kt

package com.personal.demo

import io.ktor.application.*
import io.ktor.features.*
import io.ktor.gson.*
import io.ktor.http.*
import io.ktor.response.*
import io.ktor.routing.*
import java.text.*
import java.time.*

data class Model(val name: String, val items: List<Item>, val date: LocalDate = LocalDate.of(2018, 4, 13))
data class Item(val key: String, val value: String)

val model = Model("root", listOf(Item("A", "Apache"), Item("B", "Bing")))

fun Application.main() {
    install(DefaultHeaders)
    install(Compression)
    install(CallLogging)
    install(ContentNegotiation) {
        gson {
            setDateFormat(DateFormat.LONG)
            setPrettyPrinting()
        }
    }
    routing {
        get("/v1") {
            call.respond(model)
        }
        get("/v1/item/{key}") {
            val item = model.items.firstOrNull { it.key == call.parameters["key"] }
            if (item == null)
                call.respond(HttpStatusCode.NotFound)
            else
                call.respond(item)
        }
        get("/sort/{type}/{size}") {
            val sortType = call.parameters["type"]
            val listSize = call.parameters["size"]!!.toInt()

            val randomList: MutableList<Int> = mutableListOf()
            for(i in 1 until listSize) randomList.add((1 until listSize).random())
            when(sortType) {
                "merge" -> {
                    call.respond(mergeSort(randomList))
                }
                else -> {
                    call.respond(HttpStatusCode.NotFound)
                }
            }
        }
    }
}