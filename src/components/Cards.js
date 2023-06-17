import React, { useState } from 'react'
import Card from './Card'

const Cards = (props) => {

    let CardsData = props.CardsData;
    let category = props.category;
    const [likedCourses , setLikedCourses] = useState([]);


    let allDataArray = [];
    
    const getCourses = ()=>{
        
        if (category !== "All") {

            Object.values(CardsData[category]).forEach(
                (course)=> {allDataArray.push(course)}
            )

        } else {
            Object.values(CardsData).forEach( (eachData)=>{
            Object.values(eachData).forEach((course)=>{
                allDataArray.push(course);
            }
            )
        }
        )
        }

        return allDataArray;
    }

  return (
    <div className='flex flex-wrap justify-center gap-4 mb-4'>
        {
            getCourses().map(
                (data) =>{
                    return <Card card={data} key={data.id} likedCourses={likedCourses} setLikedCourses={setLikedCourses} />
                }
            )
        }
    </div>
  )
}

export default Cards