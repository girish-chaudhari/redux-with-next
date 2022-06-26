import { useEffect, useMemo, useState } from "react"


const useInfinteLoading = (options, targetRef) => {
    const [isVisible, setIsVisible] = useState<Boolean>(false)
    const [loading, setLoading] = useState(false)

    const callbackFunction = entries => {
        const [entry] = entries //const entry = entry[0]
        setIsVisible(true)
    }
    const optMemo = useMemo(() => {
        return options
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction, optMemo);
        const currentTarget = targetRef.current;
        if (currentTarget) observer.observe(currentTarget)

        return () => {
            if (currentTarget) observer.unobserve(currentTarget)
        }
    }, [targetRef, optMemo])

    return isVisible
}

export default useInfinteLoading