const  GenerateRandomName=()=>{ 
    let digits = '0123456789'; 
    let NUM = ''; 
    let len = digits.length 
    for (let i = 0; i < 4; i++) { 
        NUM += digits[Math.floor(Math.random() * len)]; 
    } 
     
    return NUM; 
}

module.exports= {
    GenerateRandomName
}
