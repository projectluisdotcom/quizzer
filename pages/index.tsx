import type { NextPage } from 'next'
import Head from 'next/head'

import Game from '../components/Game'

const Home: NextPage = () => {
  return (
    <div className=''>
      <Head>
        <title>Quizzer</title>
        <meta name="description" content="Quizzer app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='p-4'>
        <h1 className='text-3xl font-bold text-center'>Quizzer</h1>
        <Game />
      </main>
    </div>
  )
}

export default Home
