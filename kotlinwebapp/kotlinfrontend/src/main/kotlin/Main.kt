//Main.kt

package com.personal.demo

import react.*
import logo
import react.dom.*

import org.w3c.dom.Element
import org.w3c.dom.HTMLInputElement
import org.w3c.dom.HTMLTextAreaElement
import org.w3c.dom.events.Event
import org.w3c.dom.get
import org.w3c.xhr.XMLHttpRequest
import ticker
import kotlin.browser.document
import kotlin.browser.window
import kotlin.js.Json

import kotlinext.js.*
import react.dom.*
import kotlin.browser.*

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

    requireAll(require.context("/", true, js("/\\.css$/")))

    render(document.getElementById("root")) {
        app()
    }
}
class App : RComponent<RProps, RState>() {
    override fun RBuilder.render() {
        div("App-header") {
            logo()
            h2("header-text") {
                +"Welcome to React with Kotlin"
            }
        }
        p("App-intro") {
            +"To get started, edit "
            code { +"app/App.kt" }
            +" and save to reload."
        }
        p("App-ticker") {
            ticker()
        }
    }
}

fun RBuilder.app() = child(App::class) {}

fun fetch(key: String): Unit {
    val url = "http://localhost:9090/v1/item/$key"
    val req = XMLHttpRequest()
    req.onloadend = fun(event: Event){
        val text = req.responseText
        println(text)
        val objArray  = JSON.parse<Json>(text)
        val textarea = document.getElementById("textarea_id") as HTMLTextAreaElement
        textarea.value = ""
        val message = objArray["value"]
        textarea.value += "$message\n"

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