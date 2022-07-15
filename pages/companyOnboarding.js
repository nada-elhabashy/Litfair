import style from "../styles/pages/CompanyOnboard.module.scss";

import Link from "next/link";

import AuthContext from "../context/AuthContext";
import {   useContext ,useState } from "react";
import { useRouter } from "next/router";


const baseUrl = process.env.API_URL;


const CompanyOnboarding =()=>{

const [name, setName]= useState("");
const [phone_number, setPhone_number]= useState("");
const [company_size, setCompany_size]= useState("");
const [description, setDescription]= useState("");
const [error, setError]= useState("");

    const { auth } = useContext(AuthContext);
    const router = useRouter();

 const submit= async (e) => {
e.preventDefault();
if(!name || !phone_number || !company_size || !description)
{

    setError("Please Fill The Required Fields");
    return;
}
      setError("");
        const response = await fetch(baseUrl + "companies/profile/", {
            method: "PUT",
            
            headers: {
            
            "Content-Type": "application/json",
            Authorization: "Bearer" + " " + auth,
          },
          body: JSON.stringify({
            name,
            phone_number,
            company_size,
            description
            
          })
        })
        
 .then(async (response) => {
    if (response.ok) {
        setError("");
        router.replace("/registeredSuccessfully");}
    else
    {
        throw new Error("Network response was not ok.")
    }
 

      
    }).catch((e) => {
        setError("Request Failed");

      });
    }



    return(
        <>
        <div className={style.body}>
         <div className={style.box}>

            <div className={style.top}>
            Welcome To LitFair!
            </div>
            <form onSubmit={(e) => submit(e)}>
            <div className="">
               <label className={`label--global ${style.form}`}>Company Name</label>
                <input value={name} 
                onChange={(e) => {
                    setName(e.target.value);}}

                type="text" className="txt text--big"></input>


                <label className={`label--global ${style.form}`}>Mobile Number</label>
                <input
                value={phone_number} 
                onChange={(e) => {
                    setPhone_number(e.target.value);}}
                    
                type="text" className="txt text--big"></input>
               



                
              <label className={`label--global ${style.form}`}>Company size</label>
              <input
              value={company_size}
              onChange={(e) => {
                setCompany_size(e.target.value);}}
               type="text" className="txt text--big"></input>


    <label className={`label--global ${style.form}`}>Description</label>
              <input
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);}}
               type="text" className="txt text--big"></input>
          
           <div className="invalid">
              {error}
            </div>


            <button 
            type="submit"
             className={`btn--global btn--blue btn--big ${style.btn}`}
            >Save And Continue</button>
            </div>

            </form>
         </div>

         </div>
         
        </>
    )
}
export default CompanyOnboarding;