import React, { useState } from "react";
import { createContext } from "react";

import run from "../component/GeminiApi/gemini";

export const Context = createContext();




let ContextProvider = (props)=>{


const [input,setInput] = useState("");
const [resultData,setResultData] = useState("");
const [recentPrompt,setRecentPrompt] = useState("");
const [prevPrompt,setPrevPrompt] = useState([]);
const [showResult,setShowResult] = useState(false);
const [loading,setLoading] = useState(false);


const delayPara=(index,nextWord)=>{
setTimeout(function(){
setResultData(prev=>prev+nextWord);
},75*index)
}


const onSent= async(prompt)=>{
    setResultData("")
    setLoading(true)
    setShowResult(true)
    let response;
    if(prompt !== undefined){
        response = await run(prompt);
        setRecentPrompt(prompt)
    }else{
        setPrevPrompt(prev=>[...prev,input])
        setRecentPrompt(input)
        response = await run(input)
    }
    
    let responseArray = response.split("**")
    let newResponse ="";
    for (let i = 0; i < responseArray.length; i++){
        if (i === 0 || i%2 !== 1){
            newResponse += responseArray[i];
        }
        else{
            newResponse += "<b>" + responseArray[i]+"</b>"
        }
    }
    let newResponse2=newResponse.split("*").join("</br>");
    let newResponseArray=newResponse2.split(" ");
    for(let i=0; i<newResponseArray.length; i++){
    const nextWord=newResponseArray[i];
    delayPara(i,nextWord+" ")
}
    setLoading(false)
    setInput("")
}




    let contextValue={ 
        input,
        setInput,
        resultData,
        setResultData,
        recentPrompt,
        setRecentPrompt,
        prevPrompt,
        setPrevPrompt,
        showResult,
        setShowResult,
        loading,
        setLoading,
        onSent
    };

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )

}
export default ContextProvider


// import React, { useState } from "react";
// import { createContext } from "react";
// import run from "../component/GeminiApi/gemini";

// export const Context = createContext();

// const ContextProvider = (props) => {
//   const [input, setInput] = useState("");
//   const [resultData, setResultData] = useState("");
//   const [recentPrompt, setRecentPrompt] = useState("");
//   const [prevPrompt, setPrevPrompt] = useState([]);
//   const [showResult, setShowResult] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const delayPara = (index, nextWord) => {
//     setTimeout(() => {
//       setResultData((prev) => prev + nextWord);
//     }, 75 * index);
//   };

//   const onSent = async (prompt) => {
//     try {
//       setResultData("");
//       setLoading(true);
//       setShowResult(true);
      
//       let response;
//       const currentPrompt = prompt !== undefined ? prompt : input;

//       if (currentPrompt) {
//         response = await run(currentPrompt);
//         if (prompt === undefined) {
//           setPrevPrompt((prev) => [...prev, input]);
//           setInput(""); // Clear the input after sending
//         }
//         setRecentPrompt(currentPrompt);
//       }

//       const responseArray = response.split("**");
//       let newResponse = responseArray
//         .map((item, i) => (i % 2 !== 1 ? item : `<b>${item}</b>`))
//         .join("");
//       const newResponse2 = newResponse.split("*").join("<br/>");
//       const newResponseArray = newResponse2.split(" ");

//       newResponseArray.forEach((word, i) => {
//         delayPara(i, `${word} `);
//       });
//     } catch (error) {
//       console.error("Error sending prompt:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const contextValue = {
//     input,
//     setInput,
//     resultData,
//     setResultData,
//     recentPrompt,
//     setRecentPrompt,
//     prevPrompt,
//     setPrevPrompt,
//     showResult,
//     setShowResult,
//     loading,
//     setLoading,
//     onSent,
//   };

//   return (
//     <Context.Provider value={contextValue}>
//       {props.children}
//     </Context.Provider>
//   );
// };

// export default ContextProvider;
