import { createContext } from 'react'

interface AppContext {
    pageToGoBackTo: string | null
    setPageToGoBackTo: React.Dispatch<string | null>
}

export const AppContext = createContext<AppContext>({
    pageToGoBackTo: null,
    setPageToGoBackTo: () => {},
})
