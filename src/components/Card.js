import React from 'react'
import {FcLike,FcLikePlaceholder} from 'react-icons/fc'
import { toast } from 'react-toastify'


const Card = (props) => {

  let card = props.card;
  let likedCourses = props.likedCourses;
  let setLikedCourses = props.setLikedCourses;

  function likeClickHandler(){

    if(likedCourses.includes(card.id)){
      setLikedCourses( (prev)=>
        prev.filter( (cid) => (cid !== card.id) )
      )

      toast.warning("liked removed");
    }

    else{
      if(likedCourses.length === 0){
        setLikedCourses([card.id]);
        toast.success("Liked successfully");

      }
      else{
        setLikedCourses([...likedCourses,card.id]);
        toast.success("Liked successfully");
      }
    }
  }

  

  return (
    <div className='w-[300px] bg-bgDark bg-opacity-80 rounded-md overflow-hidden'>
        <div className='relative'>
            <img src={card.image.url} className='w-full min-h-[168px] object-cover'></img>

            <div className='w-[40px] h-[40px] bg-white rounded-full absolute right-2 bottom-[-10%] grid place-content-center'>
              
                <button onClick={likeClickHandler}>{
                  likedCourses.includes(card.id) ? (<FcLike fontSize="1.75rem"></FcLike>) : (<FcLikePlaceholder fontSize="1.75rem"></FcLikePlaceholder>)
                }</button>
            
            </div>
        </div>

        <div className='p-4'>
            <p className='text-white font -semibold text-lg leading-6'>{card.title}</p>

            <p className='mt2 text-white'>
              {
                (card.description.length > 100 ) ? 
                (`${card.description.substring(0,100)}...`) :
                (card.description)
              }
            </p>
        </div>
    </div>
  )
}

export default Card