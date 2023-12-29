import { screen, render } from "@testing-library/react";
import { Card } from "../../components/card";
import "@testing-library/jest-dom"

describe("Card.", () => {
    it("Shlould render currectly.", () => {
        render(
            <Card />
        )

        const element = screen.getByTestId("card")

        expect(element).toBeInTheDocument()
    })
})
