import React, { useEffect, useState } from 'react'
import {filterData,apiUrl} from './data'
import Navbar from './components/Navbar'
import Filter from './components/Filter'
import Cards from './components/Cards'
import Spinner from './components/Spinner'
import { toast } from 'react-toastify'

const App = () => {

  const [CardsData,setCardsData] = useState('');
  const [loading,setLoading] = useState(true);
  const [category,setCategory] = useState(filterData[0].title);

  const fetchData = async() => {

    setCardsData(true);

    try {
      const response = await fetch (apiUrl);
      const data = await response.json() ;

      setCardsData(data.data);
      console.log(data);  
    } catch (error) {
      toast.error("unable to fetch data!");
    }

    setLoading(false);
  }

  useEffect(
    ()=>{
      fetchData();
    }
  ,[])

  return (
    <div  className='min-h-screen flex flex-col'>
      <div>
        <Navbar></Navbar>
      </div>

      <div className='bg-bgDark2 min-h-screen'>
        <div >
          <Filter filterData={filterData} setCategory={setCategory} category={category}></Filter>
        </div>
        <div className='w-11/12 max-w-[1200px] mx-auto flex justify-center items-center min-h-[50vh]'>
          {
            loading ? (<Spinner></Spinner>) : (<Cards CardsData={CardsData} category={category}/>)
          }
        </div>
      </div>


    </div>
    
  )
}

export default App