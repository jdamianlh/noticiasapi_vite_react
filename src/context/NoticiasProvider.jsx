import { useState, useEffect, createContext } from "react";

const NoticiasContext = createContext()

const NoticiasProvider = ({children}) => {

    const [categoria, setCategoria] = useState('general')
    const [noticias, setNoticias] = useState([])
    const [totalNoticias, setTotalNoticias] = useState(0)
    const [pagina, setPagina] = useState(1)

    useEffect(()=>{
        const consultarAPI = async () =>{

            const appId = import.meta.env.VITE_API_KEY

            const url = `https://newsapi.org/v2/top-headlines?country=mx&category=${categoria}&apiKey=${appId}`

            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            const {articles, totalResults} = resultado

            setTotalNoticias(totalResults)
            setNoticias(articles)
            setPagina(1)

        }
        consultarAPI()
    }, [categoria])

    useEffect(()=>{
        const consultarAPI = async () =>{

            const appId = import.meta.env.VITE_API_KEY

            const url = `https://newsapi.org/v2/top-headlines?country=mx&page=${pagina}&category=${categoria}&apiKey=${appId}`

            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            const {articles, totalResults} = resultado

            setTotalNoticias(totalResults)
            setNoticias(articles)

        }
        consultarAPI()
    }, [pagina])

    const handleChangeCategoria = e => {
        setCategoria(e.target.value)
    }

    const handleChangePagina = (e,valor) => {
        setPagina(valor)
    }

    return(
        <NoticiasContext.Provider
            value={{
                categoria,
                handleChangeCategoria,
                noticias,
                totalNoticias,
                handleChangePagina,
                pagina
            }}
        >
            {children}
        </NoticiasContext.Provider>
    )
}

export {
    NoticiasProvider
}

export default NoticiasContext