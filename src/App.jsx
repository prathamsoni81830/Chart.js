import {useState,useEffect} from 'react'
import './App.css'
import {CChart} from "@coreui/react-chartjs"

function App() {
  const[homeValue,setHomeValue] = useState(1000)
  const[downPayment,setDownPayment] = useState(0)
  const[loanAmount,setLoanAmount] = useState(0)
  const[interestRate,setInterestRate] = useState(2)
  const [tenure,setTenure] = useState(5)
  const[monthlyPayment,setMonthlyPayment]=useState(0)

  useEffect(()=>{
    const newDownPayment=Math.floor(homeValue*0.2);
   setDownPayment(newDownPayment)
   setLoanAmount(homeValue-newDownPayment);
  },[homeValue]); 

  useEffect(()=>{
    const interestPerMonth=interestRate/100/12;
    const totalLoanMonths=tenure*12;
    const EMI=
    (loanAmount*interestPerMonth*(1+interestPerMonth) ** totalLoanMonths)/((1+interestPerMonth)**totalLoanMonths-1)
       
    setMonthlyPayment(EMI) 
   },[loanAmount,interestRate,tenure]);

  return (
    <>
    
    <div className="header"><h2>Bank Of React</h2></div>

    <div style={{display:"flex", justifyContent:"space-between", margin:"25px"}}>
       

       
      <div className='input-bar'>

      <div className='input'> 
        <p>Home Value</p>
        <p style={{paddingBlock:"10px",fontSize:"26px"}}>${homeValue}</p>
        < input  style={{width:"600px"}} value={homeValue} onChange={(e) => setHomeValue(parseInt(e.currentTarget.value))} type='range' step="100" min="1000" max="10000"/>
        <div style={{display:"flex",justifyContent:"space-between",marginRight:"60px",opacity:"0.6"}}>
          <p>$1000</p>
          <p>$10000</p>
        </div>
      </div>

      <div className='input'> 
        <p>Down Payment</p>
        <p style={{paddingBlock:"10px",fontSize:"26px"}}>${homeValue-loanAmount}</p>
        <input  style={{width:"600px"}} onChange={(e) => {
           setDownPayment(parseInt(e.currentTarget.value))
           setLoanAmount(homeValue-parseInt(e.currentTarget.value))
        }
        } type='range' step="100" value={downPayment} min="0" max={homeValue}/>
        <div style={{display:"flex",justifyContent:"space-between",marginRight:"60px",opacity:"0.6"}}>
          <p>$0</p>
          <p>$7700</p>
        </div>
      </div>

      <div className='input'> 
        <p>Loan Amount</p>
        <p style={{paddingBlock:"10px",fontSize:"26px"}}>${homeValue-downPayment}</p>
        <input  style={{width:"600px"}} onChange={(e) => {
           setLoanAmount(parseInt(e.currentTarget.value))
          setDownPayment(homeValue-parseInt(e.currentTargetValue))
        } 
         }
          type='range' step="100" min="0" max={homeValue} value={loanAmount}/>
          <div style={{display:"flex",justifyContent:"space-between",marginRight:"60px",opacity:"0.6"}}>
          <p>$0</p>
          <p>$7700</p>
        </div>
      </div>

      <div className='input'> 
        <p>Interest Rate</p>
        <p style={{paddingBlock:"10px",fontSize:"26px"}}>%{interestRate}</p>
        <input  style={{width:"600px"}} onChange={(e) => setInterestRate(parseInt(e.currentTarget.value))} type='range' step="1" min="2" max="18"/>
        <div style={{display:"flex",justifyContent:"space-between",marginRight:"60px",opacity:"0.6"}}>
          <p>%2</p>
          <p>%18</p>
        </div>
      </div>

      <form>
<label  style={{width:"600px", height:"40px", fontSize:"20px"}} >Tenure:</label>

<select  style={{width:"600px", height:"40px", border:"2px solid blue"}}  id="cars" name="cars">
  <option value={5} onChange={(e) => setTenure((e.currentTarget.value))}>5 Years</option>
  <option value="10" onChange={(e) => setTenure((e.currentTarget.value))}>10 Years</option>
  <option onChange={(e) => setTenure((e.currentTarget.value))}>15 Years</option>
  <option onChange={(e) => setTenure((e.currentTarget.value))}>20 Years</option>
</select>
</form>

      </div>

     <div style={{width:"300px"}} className='lo-ji'>
      <p>Monthly Payment : $ {monthlyPayment}</p>
      <CChart
  type="pie"
  data={{
    labels: ['Principle', 'Interest'],
    datasets: [
      {
        backgroundColor: ['pink', 'skyblue'],
        data: [homeValue,monthlyPayment*tenure*12 - loanAmount],
      },
    ],
  }}
  options={{
    plugins: {
      legend: {
        labels: {
          color: "black",
        }
      }
    },
  }}
/>
     </div>

    </div>
    </>
  )
}

export default App
