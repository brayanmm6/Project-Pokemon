import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import { Menu } from "../../components/menu";
import { ThemeContext } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { SliderButton } from "../../components/buttons/slider-button";
import { ThemeProvider } from "../../contexts/theme-context";

describe("Menu with theme button and logo", () => {

    const theme = { state: "" }
    const setTheme = jest.fn()

    const renderMenu = () => {
        render(
            <BrowserRouter>
                <ThemeProvider value={{ theme, setTheme }}>
                    <Menu />
                </ThemeProvider>
            </BrowserRouter> 
        )
    }

    it("Shoud render Logo image currectly.", () => {
        renderMenu()
        const logo = screen.getByRole("img")
        expect(logo).toBeInTheDocument()
    })

    it("Should render currectly", () => {
        renderMenu()
        const themeToggler = screen.getByTestId("theme-toggler")
        expect(themeToggler).toBeInTheDocument()
    })

    it("dispara setTheme", () => {
        renderMenu()
        const themeToggler = screen.getByTestId("theme-toggler")
        fireEvent.click(themeToggler) 
    })

}) 