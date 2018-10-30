//Main.kt

package com.personal.demo

import org.w3c.dom.Element
import org.w3c.dom.HTMLInputElement
import org.w3c.dom.HTMLTextAreaElement
import org.w3c.dom.events.Event
import org.w3c.dom.get
import org.w3c.xhr.XMLHttpRequest
import kotlin.browser.document
import kotlin.browser.window
import kotlin.js.Json

external fun require(module: String): dynamic

fun main(args: Array<String>) {
    window.onload = {
        fetch("A")
        //Example of how to add stylesheets dynamically
        //add stylesheet if we have any
        val head = document.getElementsByTagName("head")
        head[0]?.appendChild(createStylesheetLink("test.css"))
        //bind elements
        val input = document.getElementById("count_id") as HTMLInputElement
        val button = document.getElementById("button_id")
        //bind click listener on button
        button?.addEventListener("click", fun(event: Event) {
            fetch(input.value)
        })
    }
}

fun fetch(key: String): Unit {
    val url = "http://localhost:8080/v1/item/$key"
    val req = XMLHttpRequest()
    req.onloadend = fun(event: Event){
        val text = req.responseText
        println(text)
        val objArray  = JSON.parse<Array<Json>>(text)
        val textarea = document.getElementById("textarea_id") as HTMLTextAreaElement
        textarea.value = ""
        objArray.forEach {
            val message = it["message"]
            textarea.value += "$message\n"
        }
    }
    req.open("GET", url, true)
    req.send()
}

fun createStylesheetLink(filePath: String): Element {
    val style = document.createElement("link")
    style.setAttribute("rel", "stylesheet")
    style.setAttribute("href", filePath)
    return style
}

external fun alert(message: Any?): Unit