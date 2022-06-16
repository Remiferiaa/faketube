import { useState, useEffect } from 'react'


const useWindowSize = () => {
    const [screen, setScreen] = useState<number>(0)

    useEffect(() => {
        function resize() {
            setScreen(window.innerWidth)
        }

        window.addEventListener("resize", resize);

        resize();

        return () => window.removeEventListener("resize", resize);
    }, [])

    return {screen}
}

export default useWindowSize