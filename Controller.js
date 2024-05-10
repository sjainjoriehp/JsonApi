
const fs = require("fs");
const { GenerateRandomName } = require("./CustomFunction");
// const  JsonData = require("./input/input.json");
require("dotenv").config();
const path = require('path');

const OutputGeneratorByJson = async(req,res,next) =>{
try{
console.log("check contorller");
    
// check all files...


    // Read the contents of the uploaded file
    const filePath = req.file.path;
    const fileContents = require('fs').readFileSync(filePath, 'utf8');

    // Parse the JSON data
    const JsonData = JSON.parse(fileContents);
// console.log(jsonData);
let Professional_Physician_visit = [];
let ChildObj = {};
for (let i = 0; i <= JsonData?.plans[0]?.benefits?.length - 1; i++) {
  ChildObj.name = JsonData?.plans[0]?.benefits[i]?.name
    ? JsonData?.plans[0]?.benefits[i]?.name
    : "";
  ChildObj.type = JsonData?.plans[0]?.benefits[i]?.type
    ? JsonData?.plans[0]?.benefits[i]?.type
    : "";
  ChildObj.status = JsonData?.plans[0]?.benefits[i]?.status
    ? JsonData?.plans[0]?.benefits[i]?.status
    : "";
  ChildObj.statusCode = JsonData?.plans[0]?.benefits[i]?.statusCode
    ? JsonData?.plans[0]?.benefits[i]?.statusCode
    : "";
  ChildObj.amount_coPayment_inNetwork = JsonData?.plans[0]?.benefits[i]?.amounts
    ?.coPayment?.inNetwork
    ? JsonData?.plans[0]?.benefits[i]?.amounts?.coPayment?.inNetwork
    : "";
  ChildObj.amount_coInsurance_inNetwork = JsonData?.plans[0]?.benefits[i]
    ?.amounts?.coInsurance?.inNetwork
    ? JsonData?.plans[0]?.benefits[i]?.amounts?.coInsurance?.inNetwork
    : "";
  Professional_Physician_visit.push(ChildObj);
  ChildObj = {};
}

// Professional (Physician) Visit - Office
function generateTable(data) {
  let table = '<table style="color:red">';
  let counter = 1;
  Object.entries(data).map((val, index) => {
    Object.entries(val[1]).map((val, index) => {
      if (index == 0) {
        table += `<table><h4> ${counter}) ${val[1]}--</h4>
        ====================================`;
      }

      if (
        val[0] !== "amount_coPayment_inNetwork" ||
        val[0] !== "amount_coInsurance_inNetwork"
      ) {
        if (
          val[0] == "amount_coPayment_inNetwork" ||
          val[0] == "amount_coInsurance_inNetwork"
        ) {
          table += `<table><h4> ${val[0]}</h4>--------------------------`;
        } else {
          table += `<tr>
        <td>${val[0]}  : </td><td>${val[1]}</td>
        </tr>`;
        }
      }

      if (
        val[0] == "amount_coPayment_inNetwork" ||
        val[0] == "amount_coInsurance_inNetwork"
      ) {
        let CData = val[1][0];
        if (CData !== undefined) {
          Object.entries(CData)?.map((childVal, index) => {
            if (
              val[0] == "amount_coPayment_inNetwork" &&
              childVal[0] == "amount"
            ) {
              table += `<tr>
            <td>${childVal[0]}  : </td><td>$${childVal[1]}</td>
            </tr>`;
            } else if (
              val[0] == "amount_coInsurance_inNetwork" &&
              childVal[0] == "amount"
            ) {
              table += `<tr>
            <td>${childVal[0]}  : </td><td>${childVal[1]}%</td>
            </tr>`;
            } else {
              table += `<tr>
            <td>${childVal[0]}  : </td><td>${childVal[1]}</td>
            </tr>`;
            }

            return table;
          });
        } else {
          table += `<tr></tr>`;
        }
      }
      return table;
    }); //
    counter++;
    return (table += `</table>`);
  }); //parent map
  table += "</table></br>";
  return table;
}

let tblData = generateTable(Professional_Physician_visit);

const createCsvFile = (data, filename) => {
  fs.writeFileSync(filename, data);
};

let fileName = GenerateRandomName();
let fullFilePath = "public/output/output_"+fileName+".html";
// createCsvFile(tblData,"./output/output_"+fileName+".html" );
 await createCsvFile(tblData, fullFilePath);

 return res.sendFile(path.join(__dirname, fullFilePath));

} catch(err){
res.status(500).json({
status:500,
message:"internal server Error",
error:err
});
}
    
}

module.exports = {

    OutputGeneratorByJson
}