import react.*
import react.dom.*

fun RBuilder.logo(height: Int = 100) {
    div("Logo") {
       attrs.jsStyle.height = height
        h1() {
            +"Not able to load svg text"
        }
    }
}
