import React from 'react'
import '../css/cards.css'

const Cards = (props) => {
  return (
    <>
        <div className="card">
            <img src={props.img} alt="food-thumbnail" className='thumbnail' />
            <div className="project-info">
              <h1 className='project-name'>{props.txt}</h1>
              <p className="project-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi praesentium laboriosam odio, harum officiis asperiores corporis magni blanditiis ut ducimus dolores mollitia odit quae ullam, autem quis magnam obcaecati quisquam?
              </p>
            </div>
        </div>
    </>
  )
}

export default Cards