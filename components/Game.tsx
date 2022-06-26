import { useEffect, useRef, useState } from 'react'
import q from '../core/quizzes.json'
import shuffle from '../core/shuffle'

type Game = {
    quiz: string
    solution: string
}

const Quiz = () => {
    const [error, setError] = useState(0)
    const [roundAnswered, setRoundAnswered] = useState<string[]>([])
    const [alreadyAnswered, setAlreadyAnswered] = useState<string[]>([])
    const [quizzes, setQuizzes] = useState<Game[]>([])
    const [index, setIndex] = useState(0)
    const [question, setQuestion] = useState<Game | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const next = () => {
        if(index + 1 === quizzes.length) {
            reset()
            return
        }
        const nextIndex = index + 1
        setIndex(nextIndex)
        setQuestion(quizzes[nextIndex])
        setRoundAnswered([])
    }

    const reset = () => {
        setIndex(0)
        setError(0)
        setRoundAnswered([])
        setAlreadyAnswered([])
        const nextQuizzes = shuffle(q.data)
        setQuestion(nextQuizzes[0])
        setQuizzes(nextQuizzes)
    }

    const check = (event: any) => {
        const text = event.target.innerText
        if(text.toLowerCase() === question!.solution.toLowerCase()) {
            setAlreadyAnswered([...alreadyAnswered, text])
            next()
            return
        }
        setRoundAnswered([...roundAnswered, text])
        setError(error + 1)
    }

    useEffect(() => {
        reset()
    }, [inputRef])

    if(!question) return <div>Loading...</div>

    return <>
        <div className='border rounded'>
            <div className='text-2xl'>Status {index}/{quizzes.length} - Errors {error}</div>
            <div className='text-2xl'>{question.quiz}</div>
            <div>
                {quizzes.map(x => <button disabled={![...alreadyAnswered, ...roundAnswered].findIndex(y => y === x.solution)} key={x.solution} type='button' onClick={e => check(e) } className='bg-blue-500 p-2 rounded shadow-2xl disabled:bg-red-200'>{x.solution}</button> )}
            </div>
            <div>
                <button type='button' onClick={_ => reset()} className='bg-gray-200 p-2 rounded shadow-2xl'>Reset</button>
            </div>
        </div>
    </>
}

export default Quiz