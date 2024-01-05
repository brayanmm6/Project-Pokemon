import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom"
import CardsRender from "../../components/cards"
import { CardsContext } from "../../contexts/cards-context";
import { ListLimitContext } from "../../contexts/list-limit-context";
import { PokemonfilterContext } from "../../contexts/pokemon-filter";
import { SearchContext } from "../../contexts/search-context";
import { ThemeContext } from "../../contexts/theme-context";
import { LoadingContext } from "../../contexts/loading-context";
import { ErrorContext } from "../../contexts/error-context";
import { BrowserRouter } from "react-router-dom";
import * as pokemonList from "../../js/services/pokemon-list"

const fakePokemonInfos = [
    {
        name: "bulbasaur",
        id: 1,
        sprites: {
            other: {
                ["official-artwork"]: { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/…ster/sprites/pokemon/other/official-artwork/1.png' }
            }
        },
        types: [
            { type: { name: "grass", url: "https://testing" } },
            { type: { name: "poison", url: "https://testing" } }
        ]
    },
    {
        name: "ivysaur",
        id: 2,
        sprites: {
            other: {
                ["official-artwork"]: { front_default: null }
            },
            front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"
        }, 
        types: [
            { type: { name: "grass", url: "https://testing" } },
            { type: { name: "poison", url: "https://testing" } } 
        ]
    },
    {
        name: "bulbasaur",
        id: 1,
        sprites: {
            other: {
                ["official-artwork"]: { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/…ster/sprites/pokemon/other/official-artwork/1.png' }
            }
        },
        types: [
            { type: { name: "grass", url: "https://testing" } }, 
            { type: { name: "poison", url: "https://testing" } }
        ]
    }
    
]

describe("My Cards component tha render all Pokemon cards with the informations.", () => {
    const getPokemonInfos = jest.spyOn(pokemonList, "getPokemonInfos")

    const pokemonFilter = { filter: "default" }
    const search = { data: "default" }
    const setSearch = jest.fn() 
    const setLoading = jest.fn()
    const setInfos = jest.fn()
    const cardSize = "" 
    const listLimit = 1
    const theme = ""
    const setTheme = jest.fn()
    const setError = jest.fn()
    const setErrorMessage = jest.fn()

    const renderCards = (newData) => {
        const cardInfos = { data: newData } 
        render(
            <BrowserRouter>
                <ListLimitContext.Provider value={{ listLimit }}>
                    <PokemonfilterContext.Provider value={{ pokemonFilter }}>
                        <SearchContext.Provider value={{ search, setSearch }}>
                            <ThemeContext.Provider value={{ theme, setTheme }}>
                                <LoadingContext.Provider value={{ setLoading }}>
                                    <ErrorContext.Provider value={{ setError, setErrorMessage }}>
                                        <CardsContext.Provider value={{ cardInfos, setInfos, cardSize }}>
                                            <CardsRender />
                                        </CardsContext.Provider>
                                    </ErrorContext.Provider>
                                </LoadingContext.Provider>
                            </ThemeContext.Provider>
                        </SearchContext.Provider>
                    </PokemonfilterContext.Provider>
                </ListLimitContext.Provider>
            </BrowserRouter>
        )
    }

    it("Shuld render.", async () => {
        getPokemonInfos.mockReturnValue(new Promise(resolve => {
            resolve(fakePokemonInfos)
        }))

        renderCards(await getPokemonInfos())
        const a = screen.getByTestId("a")
        expect(a).toBeInTheDocument()   
    })
})

export { fakePokemonInfos } 