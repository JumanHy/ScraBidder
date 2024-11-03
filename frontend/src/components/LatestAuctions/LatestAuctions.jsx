import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import React from 'react';
import { Image } from 'react-bootstrap';
import scrapImage from '/src/assets/images/scrap.png';
import logo1 from '/src/assets/images/logo1.png';
import logo2 from '/src/assets/images/logo2.png';
import FlipCountdown from '@rumess/react-flip-countdown';
import { FaArrowRight } from 'react-icons/fa';

function LatestAuctions() {
   

  return (
    <>
        <div 
      className="d-flex flex-column align-items-center pt-4 pb-4"
      style={
        {
            backgroundColor:"#F0F8FF",
            color:"#333333",
            letterSpacing:1
        }
      }
      >
        <h2 className="pb-5">Latest Auctions</h2>

        
        <div className='container'>
            <div className='row justify-content-center'>

                {/*Card 1*/ }
                <div className='col-12 col-sm-6 col-md-4 mb-4'>
               
           <div 
            className="d-flex shadow flex-column align-items-center"

            >
            <Image 
                src={scrapImage} fluid alt="Scrap"
                style={{
                    width: '100%',
                    maxHeight: 200,
                }}
            />
            <h4 className='pt-3' style={{color:"#003A70",textAlign:"center"}}>10 tons of stainless steel scrap</h4>
            <h6 className='pt-3' style={{color:"#B87333",textAlign:"center"}}>ends after</h6>

            
                
                <FlipCountdown
                        endAt={'2024-11-11 23:55:55'}
                        size='small'
                        titlePosition='top'
                        hideYear
                        hideMonth
                        dayTitle='days'
                        hourTitle='hours'
                        minuteTitle='mnts'
                        secondTitle='scnds'
                        cardStyles={{
                            backgroundColor: '#B87333', // Customize card background color
                            borderRadius: '8px', // Rounded corners for the cards
                            color: '#FFFFFF', // Text color inside the card
                            padding: '10px', // Padding inside the cards
                        }}
                        />
       
            <h6 className='pt-3' style={{color:"#B87333",textAlign:"center"}}>Starting Bid : $500</h6>

            <button className='bid-button mt-2 mb-3 border-0 rounded-5 w-50 pb-2 pt-2'
                style={
                    {
                        backgroundColor:'#B87333',
                        color:'white',
                        textAlign:"center",
                        letterSpacing:3,
                    }
                } 
            >
                <a >Bid Now</a>
            </button>
        
            
           </div>

                </div>

                

                {/*Card 2*/ }
                <div className='col-12 col-sm-6 col-md-4 mb-4'>
               
           <div 
            className="d-flex shadow flex-column align-items-center"

            >
            <Image 
                src={scrapImage} fluid alt="Scrap"
                style={{
                    width: '100%',
                    maxHeight: 200,
                }}
            />
            <h4 className='pt-3' style={{color:"#003A70",textAlign:"center"}}>10 tons of stainless steel scrap</h4>
            <h6 className='pt-3' style={{color:"#B87333",textAlign:"center"}}>ends after</h6>

            
                
                <FlipCountdown
                        endAt={'2024-11-11 23:55:55'}
                        size='small'
                        titlePosition='top'
                        hideYear
                        hideMonth
                        dayTitle='days'
                        hourTitle='hours'
                        minuteTitle='mnts'
                        secondTitle='scnds'
                        cardStyles={{
                            backgroundColor: '#B87333', // Customize card background color
                            borderRadius: '8px', // Rounded corners for the cards
                            color: '#FFFFFF', // Text color inside the card
                            padding: '10px', // Padding inside the cards
                        }}
                        />
       
            <h6 className='pt-3' style={{color:"#B87333",textAlign:"center"}}>Starting Bid : $500</h6>

            <button className='bid-button mt-2 mb-3 border-0 rounded-5 w-50 pb-2 pt-2'
                style={
                    {
                        backgroundColor:'#B87333',
                        color:'white',
                        textAlign:"center",
                        letterSpacing:3,
                    }
                } 
            >
                <a >Bid Now</a>
            </button>
        
            
           </div>

                </div>


                {/*Card 3*/ }
                <div className='col-12 col-sm-6 col-md-4 mb-4'>
               
               <div 
                className="d-flex shadow flex-column align-items-center"
    
                >
                <Image 
                    src={scrapImage} fluid alt="Scrap"
                    style={{
                        width: '100%',
                        maxHeight: 200,
                    }}
                />
                <h4 className='pt-3' style={{color:"#003A70",textAlign:"center"}}>10 tons of stainless steel scrap</h4>
                <h6 className='pt-3' style={{color:"#B87333",textAlign:"center"}}>ends after</h6>
    
                
                    
                    <FlipCountdown
                            endAt={'2024-11-11 23:55:55'}
                            size='small'
                            titlePosition='top'
                            hideYear
                            hideMonth
                            dayTitle='days'
                            hourTitle='hours'
                            minuteTitle='mnts'
                            secondTitle='scnds'
                            cardStyles={{
                                backgroundColor: '#B87333', // Customize card background color
                                borderRadius: '8px', // Rounded corners for the cards
                                color: '#FFFFFF', // Text color inside the card
                                padding: '10px', // Padding inside the cards
                            }}
                            />
           
                <h6 className='pt-3' style={{color:"#B87333",textAlign:"center"}}>Starting Bid : $500</h6>
    
                <button className='bid-button mt-2 mb-3 border-0 rounded-5 w-50 pb-2 pt-2'
                    style={
                        {
                            backgroundColor:'#B87333',
                            color:'white',
                            textAlign:"center",
                            letterSpacing:3,
                        }
                    } 
                >
                    <a >Bid Now</a>
                </button>
            
                
               </div>
    
                    </div>


            </div>
            
        </div>



       
        <div >
        <button className='bid-button mt-5 mb-3 border-0 rounded-5 pb-2 pt-2'
                style={
                    {
                        backgroundColor:'#B87333',
                        color:'white',
                        letterSpacing:3,
                        width:250
                    }
                } 
            >
                <a >Explore More </a><FaArrowRight />
            </button>
        </div>
                
        

      </div>
                {/* our partners section*/ }
      <div className="d-flex flex-column align-items-center pt-4 pb-4"
        style={
            {
                backgroundColor:'#E6E6E6',
                color:'#003A70',
                letterSpacing:5
            }
        }
        >
            <h2 className="pb-5">Our Partners</h2>

            <div className='container'>

                <div className='row justify-content-center'>
                    <div className='col-6 col-md-3 col-sm-2 pb-5'>
                    <Image 
                src={logo1} fluid alt="logo"
                style={
                    {
                        width:150,
                        height:150,
                        borderRadius:100
                    }
                }
            />
                    </div>

                    <div className='col-6 col-md-3 col-sm-2 pb-5'>
                    <Image 
                src={logo2} fluid alt="logo"
                style={
                    {
                        width:150,
                        height:150,
                        border:'1px solid',
                        borderRadius:100
                    }
                }
            />
                    </div>

                    <div className='col-6 col-md-3 col-sm-2 pb-5'>
                    <Image 
                src={logo1} fluid alt="logo"
                style={
                    {
                        width:150,
                        height:150,
                        borderRadius:100
                    }
                }
            />
                    </div>

                    <div className='col-6 col-md-3 col-sm-2 pb-5'>
                    <Image 
                src={logo2} fluid alt="logo"
                style={
                    {
                        width:150,
                        height:150,
                        border:'1px solid',
                        borderRadius:100
                    }
                }
            />
                    </div>

                </div>

            </div>

        </div> 

    </>
  );
}
export default LatestAuctions;