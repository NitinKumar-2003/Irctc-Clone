import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import Search from '../../components/search/Search'
import Expertise from '../../components/expertise/Expertise'
import IntroSection from '../../components/introSection/IntroSection'
import SearchUsingTrie from '../../components/search/SearchUsingTrie'
import ResultTickets from '../../components/ticketdetail/ResultTickets'
import { useLocation } from 'react-router-dom'

function Home() {
  
  const location = useLocation();

  console.log(location?.state?.trains);
  return (
      <Layout>
        <IntroSection/>
        <Search />
        <ResultTickets trains={location?.state?.trains}/>
        <Expertise/>
      </Layout>
  )
}

export default Home