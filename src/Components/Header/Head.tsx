import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Header = () => {
    let navigate = useNavigate()
    const [side, setSide] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        if (search !== '') {
            navigate(`/results?search_query=${search}`, { state: { q: search } })
        }
    }
    return (
        <>
            <form onSubmit={(e) => submit(e)}>
                <label htmlFor='search'></label>
                <input type='text' value={search} onChange={(e) => handleChange(e)} name='search' id='search' autoComplete='off' placeholder='Search'></input>
                <button></button>
            </form>
        </>
    )
}

export default Header