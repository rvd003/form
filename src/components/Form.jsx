import { useEffect, useState } from "react"
import styled from "styled-components"

const Div = styled.div`
 border :1px solid black;
  margin: 4%;
  padding : 0.5% ;
  dispaly : flex; 
  background-color: #F9F3DF;
`
const Formbox = styled.div`
 border :1px solid black;
  margin: 4%;
  padding : 2%;
  width : 200px;
  background-color: #CDF2CA;
 
`

const Otherbox = styled.div`
 border :1px solid black;
  margin: 4%;
  padding : 2%;
  width : 400px;
  height : 400px;
  background-color: #FFC898;
  overflow: scroll;
  position : absolute;
  top: 10%;
  left: 50%;
`
const Mainshow = styled.div`
 border :3px solid black;
 font-weight : 700;
  margin: 4%;
  padding : 2%;
  display : flex;
  justify-content: space-between;

 & >div:nth-child(1){
     font-size : 32px
 }
& > div{
    padding-left : 30px ;
    padding-right : 30px 
}
`
const StoryBox = styled.div`
 border :1px solid black;
 text-align: center;
 width : 800px;
 margin-left : 20%;
 padding : 2%;
 background-color: #FED1EF;


`


export const Form =()=>{
const [formdata,setFormdata] = useState({})
const [show,setShow ] = useState([])
const [detail, setDetail] = useState([])
  useEffect(()=>{
      getRecepi()
  },[])
    const handleChange =(e)=>{
        // console.log(e.target.value,e.target.name)
         const {value ,name} = e.target

      setFormdata({...formdata , [name] : value})  

    }

    // const handleSubmit = (e)=>{
    //      e.preventDefault() 
    //      console.log(formdata)
    //      console.log("show",[...show, formdata])
    //      setShow([...show, formdata])
    // }

    const addRecepi =(e)=>{
        e.preventDefault()
        fetch("http://localhost:8080/show",{
            method: "POST",
            body: JSON.stringify(formdata),
            headers:{
                "content-type":"application/json"
            },
        }).then(()=>{
            getRecepi()
           
        })
    } 
  
     const getRecepi=()=>{
         fetch("http://localhost:8080/show").then((d)=>d.json()).then((res)=>{
             console.log("res", res)
             setShow(res)
            })
     }
const handleDetail=(singleitem)=>{
      console.log(singleitem)
      setDetail([...detail,singleitem])
}

const handleSort =()=>{
    fetch("http://localhost:8080/show?_sort=title&_order=asc").then((d)=>d.json()).then((res)=>{
        console.log(res)
        setShow(res)
       })
}
const handleFilter =()=>{
    fetch("http://localhost:8080/show?id=7").then((d)=>d.json()).then((res)=>{
        console.log(res)
        setShow(res)
       })
}
    return(
        <>
        <Div >
                 
             <Formbox >
                 <h1>ADD RECEPI</h1>
                <form  onSubmit={addRecepi}>
                    <label >title: </label>
                    <input name="title" type="text"  placeholder="Enter recepi name" onChange={handleChange}/>
                    <br/>
                    <br/>
                    <label > ingredients: </label>
                    <input name="ingredients" type="text" placeholder="Enter ingredients " onChange={handleChange} />
                    <br/>
                    <br/>
                    <label >time to cook: </label>
                    <input name="time_to_cook" type="text" placeholder="Enter time " onChange={handleChange}/>
                    <br/>
                    <br/>
                    <label >image URL: </label>
                    <input name="image" type="text" placeholder="Enter image "  onChange={handleChange}/>
                    <br/>
                    <br/>
                    <label >instructions: </label>
                    <input name="instructions"  type="text" placeholder="Enter instructions " onChange={handleChange}/>
                    <br/>
                    <br/>
                    <input  type="submit"  onChange={handleChange}/>
                </form>
        </Formbox>
               <br/>
               <br/>
               <br/>
            <Otherbox>
                    <button onClick={handleSort}>Sort</button>
                    <button onClick={handleFilter}>Filter </button>
                    {show.map((el)=>(
                  <Mainshow onClick={()=>handleDetail(el)}>
                          
                         <div> {el.title}</div>
                         <div>{el.time_to_cook}</div>
                  </Mainshow>
                  

                    ))}
            </Otherbox>   
              
         </Div>  

    <StoryBox >
          {detail.map((el)=>
          <div>
              <h2>{el.title}</h2>
             
              <img src={el.image} alt="img" />

              <h5>Time required : {el.time_to_cook}</h5>

              <h3>Ingredients  required : </h3>
              <p>{el.ingredients}  </p>

              <h3>Instructions :</h3>
              <p>{el.instructions}</p>
          </div>
          
          )}
    </StoryBox>
        </>

    )
}