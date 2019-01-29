package com.personal.demo

fun mergeSort(list:List<Int>) :List<Int> {
    if(list.size <= 1) {
        return list
    }
    var mid = list.size / 2
    var leftList = list.subList(0, mid)
    var rightList = list.subList(mid, list.size)
    return merge(mergeSort(leftList), mergeSort(rightList))
}

fun merge(leftList:List<Int>, rightList:List<Int>): List<Int> {
    var leftIndex = 0
    var rightIndex = 0
    var newList: MutableList<Int> = mutableListOf()

    while(leftIndex < leftList.count() && rightIndex < rightList.count()) {
        if(leftList[leftIndex] < rightList[rightIndex]) {
            newList.add(leftList[leftIndex])
            leftIndex++
        } else {
            newList.add(rightList[rightIndex])
            rightIndex++
        }
    }

    while(leftIndex < leftList.size) {
        newList.add(leftList[leftIndex])
        leftIndex++
    }

    while(rightIndex < rightList.size) {
        newList.add(rightList[rightIndex])
        rightIndex++
    }
    return newList
}