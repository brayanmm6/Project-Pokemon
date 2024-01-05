import { screen, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"
import { PokemonInfosRender } from "../../components/pokemon-infos";
import { BrowserRouter } from "react-router-dom";
import { LoadingContext } from "../../contexts/loading-context";
import { PokemonfilterContext } from "../../contexts/pokemon-filter";
import { CardsContext } from "../../contexts/cards-context";
import { SearchContext } from "../../contexts/search-context";
import { ListLimitContext } from "../../contexts/list-limit-context";
import { ErrorContext } from "../../contexts/error-context";
import { ThemeContext } from "../../contexts/theme-context";
import * as pokemonSearch from "../../js/services/pokemon-search"
import { act } from "react-dom/test-utils";
import { fakePokemonInfos } from "./cards.test";
import * as pokemonList from "../../js/services/pokemon-list"

describe("Component that should be rendered in the secound page.", () => {
    const pokemon = jest.spyOn(pokemonSearch, "pokemonSearch")
    const getPokemonInfos = jest.spyOn(pokemonList, "getPokemonInfos")
    const setLoading = jest.fn()
    const setFilter = jest.fn()
    const pokemonFilter = {filter: "default"}
    const setInfos = jest.fn()
    const cardSize = ""
    const setCardSize = jest.fn()
    const search = {data: "default"}
    const setSearch = jest.fn()
    const setLimit = jest.fn()
    const error = ""
    const theme = {state: "light"}
    const setCurrentPokemon = jest.fn()
    const setAbilities = jest.fn()
    const setPokemonAbilities = jest.fn()
    const setPokemonMoves = jest.fn()
    const setMoves = jest.fn()

    const renderPokemonInfos = (newPokemonInfos) => {
        const cardInfos = {data: newPokemonInfos}
        render(
            <BrowserRouter>
                <ThemeContext.Provider value={{theme}}>
                    <LoadingContext.Provider value={{ setLoading }}>
                        <PokemonfilterContext.Provider value={{ pokemonFilter, setFilter }}>
                            <CardsContext.Provider value={{ cardInfos, setInfos, cardSize, setCardSize }}>
                                <SearchContext.Provider value={{ search, setSearch }}>
                                    <ListLimitContext.Provider value={{ setLimit }}>
                                        <ErrorContext.Provider value={{ error }}>
                                            <PokemonInfosRender />
                                        </ErrorContext.Provider>
                                    </ListLimitContext.Provider>
                                </SearchContext.Provider>
                            </CardsContext.Provider>
                        </PokemonfilterContext.Provider>
                    </LoadingContext.Provider>
                </ThemeContext.Provider>
            </BrowserRouter>
        )
    }



    it("should render currectly.", async () => {
        pokemon.mockReturnValue(new Promise(resolve => {
            resolve(
                {
                    abilities: [
                        { ability: { name: "overgrow", url: "https://testing" } },
                        { ability: { name: "chlorophyll", url: "https://testing" } } 
                    ],
                    base_experience: 64,
                    height: 7,
                    id: 1,
                    moves: [{
                        move: { name: "razor-wind", url: "https://testing" }
                    },
                    {
                        move: { name: "swords-dance", url: "https://testing" }
                    }],
                    name: "bulbasaur",
                    sprites: {
                        other: {
                            ["official-artwork"] : {front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/…ster/sprites/pokemon/other/official-artwork/1.png'} 
                        }
                    },
                    stats: [
                        {
                            base_stat: 45,
                            stat: {name: "hp", url: "https://testing"}
                        },
                        {
                            base_stat: 49,
                            stat: {name: "attack", url: "https://testing"}  
                        } 
                    ],
                    types: [
                        {
                            slot: 1,
                            type: {name: "grass", url: "https://testing"} 
                        },
                        {
                            slot: 2,
                            type: {name: "poison", url: "https://testing"}
                        }
                    ],
                    weight: 69,  
                }
            )
        }))

        getPokemonInfos.mockReturnValue(new Promise(resolve => {
            resolve(fakePokemonInfos)
        }))

        await act(async () => {
            setCurrentPokemon(pokemon) 
            setPokemonAbilities(pokemon, setAbilities) 
            setPokemonMoves(pokemon, setMoves, setLoading)
            setCardSize({ size: "mini" })
            setSearch({ data: "default" })
        })
          
        renderPokemonInfos(await getPokemonInfos())
        
        const testee = screen.getByTestId("pokemon")
        await waitFor(() => expect(testee).not.toBeInTheDocument())
        await waitFor(() => expect(setCurrentPokemon).toHaveBeenCalled()) 
        
    }) 
}) 