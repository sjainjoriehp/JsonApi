
const XLSX = require('xlsx');
const fs = require("fs");

const  GenerateRandomName=()=>{ 
    let digits = '0123456789'; 
    let NUM = ''; 
    let len = digits.length 
    for (let i = 0; i < 4; i++) { 
        NUM += digits[Math.floor(Math.random() * len)]; 
    } 
     
    return NUM; 
}


const TimeFormater = (time) =>{
    // const time = '2024-05-06T17:34:30.000+0000';
    const date = new Date(time);
    const isoTime = date.toISOString();
    const formattedTime = isoTime.slice(0, 10) + ', ' + isoTime.slice(11, 19);
    // console.log(formattedTime);
    return formattedTime;
}


const DOBFormat =(time) =>{
    // const time = '1961-04-21T05:00:00.000+0000';
    const date = new Date(time);
    const isoTime = date.toISOString();
    const dob = isoTime.slice(0, 10);
    // console.log(dob);
    return dob;
}

const ExcelDataEXtraction = (ExlURL,PolicyID,next) =>{
    var workbook = XLSX.readFile(ExlURL);
    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    // for replace a Object keys space.
    xlData = xlData.map(el => 
      Object.fromEntries(Object.entries(el).map(([key, value]) => ([
        key.replace(/\s+/g, ""),
        value
      ])))
    );
    const ExlDataFilter = xlData.filter((val)=>{  return val?.PolicyID===PolicyID});
    return ExlDataFilter;

}

const ProviderNPI_TaxID = async (PathNPI,NPI, next) => {
    try {
        var workbook = await XLSX.readFile(PathNPI);
        var sheet_name_list = workbook.SheetNames;
        var xlData = await XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        xlData = xlData.map(el => 
            Object.fromEntries(Object.entries(el).map(([key, value]) => ([
              key.replace(/\s+/g, ""),
              value
            ])))
          );
          const ExlDataFilter = xlData.filter((val)=>{  return val?.NPI==NPI});
          return ExlDataFilter;
    } catch (error) {
        console.error("Error reading Excel file:", error);
        return next(error);
    }
}


module.exports= {
    GenerateRandomName,
    TimeFormater,
    DOBFormat,
    ExcelDataEXtraction,
    ProviderNPI_TaxID
}
