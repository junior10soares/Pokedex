import { Container, Grid } from "@mui/material"
import Navbar from "../components/NavBar"
import PokemonCard from "../components/Pokemon"
import { useEffect, useState } from "react"
import axios from "axios"

export const Home = () => {

    const [pokemons, setPokemons] = useState([])

    const getPokemons = () => {
        var endpoints = []
        for (var i = 1; i < 50; i++) {
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`)
        }
        axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res))
    }

    useEffect(() => {
        getPokemons()
    }, [])

    const pokemonFilter = (name) => {
        if (name === "") {
            getPokemons()
        }
        var filteredPokemons = []
        for (var i in pokemons) {
            if (pokemons[i].data.name.includes(name)) {
                filteredPokemons.push(pokemons[i])
            }
        }
        setPokemons(filteredPokemons)
    }

    return (
        <div>
            <Navbar pokemonFilter={pokemonFilter} />
            <Container maxWidth="false">
                <Grid container spacing={3}>
                    {pokemons.map((pokemon, key) => (
                        <Grid item xs={12} md={4} sm={6} lg={2} key={key}>
                            <PokemonCard name={pokemon.data.name} image={pokemon.data.sprites.front_default} types={pokemon.data.types} />
                        </Grid>
                    ))}
                </Grid>
            </Container>

        </div>
    )
}