import { Container } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './hero.css'

const Hero = () => {
    const navigate = useNavigate()

    const goToAddExpense = () => {
        navigate('/addexpence')
        // window.location.reload();
    }
  return (
    <div className='all'>
    <Container>
    <div className="hero-page">
    
    <div className="right-section">
    
    
    </div>
    <div className="left-section">
    <h2 style={{color: "#e8e3e3"}}>Hey .. Do you have any new transaction ?</h2>
       <button className='add-btn' onClick={goToAddExpense}>Add  Expenses</button>
    </div>
    </div>
    </Container>
    </div>
  )
}

export default Hero