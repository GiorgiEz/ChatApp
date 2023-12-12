import React from "react";

const cancelButton = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
    </svg>
)

const leftArrow = (
    <svg className="w-12 h-12 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
    </svg>
)

const downArrow = (
    <svg
        className="h-8 rounded-full bg-blue-100 transform rotate-180
        transition-transform duration-300 ease-in-out opacity-20 hover:opacity-100"
        fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
    >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
    </svg>
)


export const Icons = {
    cancelButton: cancelButton,
    leftArrow: leftArrow,
    downArrow: downArrow
}