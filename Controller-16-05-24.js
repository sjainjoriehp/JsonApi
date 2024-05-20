
const fs = require("fs");
const pdf = require('html-pdf');
const { GenerateRandomName,TimeFormater,DOBFormat} = require("./CustomFunction");
// const  JsonData = require("./input/input.json");
require("dotenv").config();
const path = require('path');

const options = {
  format: 'A4',
  orientation: 'portrait',
  border: '10mm'
};

const OutputGeneratorByJson = async(req,res,next) =>{
try{
    
// console.log(req?.body?.file_name);
    // Read the contents of the uploaded file
    const filePath = req.file.path;
    const fileContents = require('fs').readFileSync(filePath, 'utf8');

    // Parse the JSON data
    const JsonData = JSON.parse(fileContents);
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

    //==================================================

    // coPayment/inNetwork
  ChildObj.amount_coPayment_inNetwork = (JsonData?.plans[0]?.benefits[i]?.amounts
    ?.coPayment?.inNetwork !==undefined)? JsonData?.plans[0]?.benefits[i]?.amounts?.coPayment?.inNetwork
    : [];
    // coInsurance/inNetwork
  ChildObj.amount_coInsurance_inNetwork = (JsonData?.plans[0]?.benefits[i]?.amounts?.coInsurance?.inNetwork !==undefined) ? JsonData?.plans[0]?.benefits[i]?.amounts?.coInsurance?.inNetwork
    : [];

    // outOfPocket/inNetwork
    ChildObj.amount_outOfPocket_inNetwork = (JsonData?.plans[0]?.benefits[i]?.amounts?.outOfPocket?.inNetwork !==undefined) ? 
    JsonData?.plans[0]?.benefits[i]?.amounts?.outOfPocket?.inNetwork: [];

    // deductibles/inNetwork
    ChildObj.amount_deductibles_inNetwork = (JsonData?.plans[0]?.benefits[i]?.amounts?.deductibles?.inNetwork !==undefined) ?  JsonData?.plans[0]?.benefits[i]?.amounts?.deductibles?.inNetwork:[];                     

    // ===============Push into a main obj==================
  Professional_Physician_visit.push(ChildObj);
  ChildObj = {};
}

// Professional (Physician) Visit - Office
function generateTable(data) {
  // console.log("data",data); return false;
  let DateAndTime = TimeFormater(JsonData?.createdDate);
  let DOB = DOBFormat(JsonData?.patient?.birthDate);
  let Requesting_provider_name = '';
  if(JsonData?.requestingProvider?.firstName !==undefined) {
    Requesting_provider_name += `${JsonData?.requestingProvider?.firstName}, `;
  }
  if(JsonData?.requestingProvider?.lastName !==undefined) {
    Requesting_provider_name += `${JsonData?.requestingProvider?.lastName}`;
  }

let Plan_effective_date = (JsonData?.plans[0]?.coverageStartDate !==undefined)  ? TimeFormater(JsonData?.plans[0]?.coverageStartDate) : '';
let term_date  = (JsonData?.plans[0]?.coverageEndDate !==undefined)  ? TimeFormater(JsonData?.plans[0]?.coverageEndDate) : '';
 let premium_paid_end_date=(JsonData?.plans[0]?.premiumPaidToEndDate !==undefined) ?  TimeFormater(JsonData?.plans[0]?.premiumPaidToEndDate)  : '';

let table = '<table>';

  table += `<table>
  <tr><td style="font-weight:bold">Eligibility status</td> <td>&nbsp : &nbsp;</td> <td>${JsonData?.plans[0]?.status}</td></tr>
  <tr><td style="font-weight:bold" >Payer</td> <td>&nbsp : &nbsp;</td> <td>${JsonData?.payer?.name}</td></tr>
   <tr><td style="font-weight:bold">DOS</td> <td>&nbsp : &nbsp;</td>  <td>  </td></tr>
   <tr><td style="font-weight:bold" >VERIFICATION TYPE</td> <td>&nbsp : &nbsp;</td> <td>Subscriber Verification</td></tr>
   <tr> <td style="font-weight:bold" >Transaction ID</td> <td>&nbsp : &nbsp;</td> <td>${JsonData?.id}</td> </tr>
   <tr> <td style="font-weight:bold" >Transaction Time</td> <td>&nbsp : &nbsp;</td> <td>${DateAndTime}</td> </tr>
   <tr><td style="font-weight:bold">Customer ID</td> <td>&nbsp : &nbsp;</td> <td>${JsonData?.customerId}</td></tr>
   <tr> <td style="font-weight:bold">Requesting Provider NPI</td> <td>&nbsp : &nbsp;</td> <td>${JsonData?.requestingProvider?.npi}</td> </tr>
   <tr> <td style="font-weight:bold" >Primary Care Provider NPI</td> <td>&nbsp : &nbsp;</td> <td> </td> </tr>
   </table>`;
 
   //SUBSCRIBER INFORMATION
   
   table += `<table>==============================================================
   <h3 style="font-weight:bold; padding-top:0px;" >SUBSCRIBER INFORMATION</h3>
   ============================================================== `;
   
   table += `<table>
   <tr><td style="font-weight:bold">Name</td> <td>&nbsp : &nbsp;</td> <td>${(JsonData?.patient?.firstName !==undefined) ? JsonData?.patient?.firstName:''}  ${(JsonData?.patient?.lastName !==undefined) ? JsonData?.patient?.lastName :''}</td></tr> 
   <tr><td style="font-weight:bold">Address</td> <td>&nbsp : &nbsp;</td> <td>${(JsonData?.patient?.address?.line1 !==undefined) ? JsonData?.patient?.address?.line1 : ''} </td></tr> 
   <tr><td style="font-weight:bold">City-State-Zip</td> <td>&nbsp : &nbsp;</td> <td>${(JsonData?.patient?.address?.city !==undefined) ? JsonData?.patient?.address?.city :''}, ${(JsonData?.patient?.address?.state !==undefined) ? JsonData?.patient?.address?.state :''}, ${(JsonData?.patient?.address?.zipCode) ? JsonData?.patient?.address?.zipCode : ''}</td></tr>
   <tr><td style="font-weight:bold">Gender</td> <td>&nbsp : &nbsp;</td> <td>${(JsonData?.patient?.gender !==undefined) ? JsonData?.patient?.gender : ''}</td></tr>
   <tr><td style="font-weight:bold">Date Of Birth</td> <td>&nbsp : &nbsp;</td> <td>${DOB}</td></tr> 
   <tr><td style="font-weight:bold">Last Name</td> <td>&nbsp : &nbsp;</td> <td>${(JsonData?.patient?.lastName !==undefined) ? JsonData?.patient?.lastName :''}</td></tr> 
   <tr><td style="font-weight:bold">First Name</td> <td>&nbsp : &nbsp;</td> <td>${(JsonData?.patient?.firstName !==undefined) ? JsonData?.patient?.firstName : ''}</td></tr> 
   <tr><td style="font-weight:bold">Member ID</td> <td>&nbsp : &nbsp;</td> <td>${(JsonData?.subscriber?.memberId !==undefined) ?JsonData?.subscriber?.memberId:'' }</td></tr> 
   <tr><td style="font-weight:bold">Group Number</td> <td>&nbsp : &nbsp;</td> <td>${(JsonData?.plans[0]?.groupNumber !==undefined) ? JsonData?.plans[0]?.groupNumber :''}</td></tr>
   <tr><td style="font-weight:bold">Premium Paid End Date</td> <td>&nbsp : &nbsp;</td> <td> ${premium_paid_end_date}</td></tr>
   <tr><td style="font-weight:bold">Plan Effective Date</td> <td>&nbsp : &nbsp;</td> <td> ${Plan_effective_date} </td></tr> 
   <tr><td style="font-weight:bold">Term Date</td> <td>&nbsp : &nbsp;</td> <td>  </td> ${term_date}</tr> 
   <tr><td style="font-weight:bold">Relation to Subscriber</td> <td>&nbsp : &nbsp;</td> <td>${(JsonData?.patient?.subscriberRelationship !==undefined) ? JsonData?.patient?.subscriberRelationship : ''}</td></tr>
   <tr><td style="font-weight:bold">Requesting Provider Name</td> <td>&nbsp : &nbsp;</td> <td>${Requesting_provider_name}</td></tr> 
   <tr><td style="font-weight:bold">Primary Care Provider Name</td> <td>&nbsp : &nbsp;</td> <td>${(JsonData?.plans[0]?.primaryCareProvider?.firstName !==undefined) ? JsonData?.plans[0]?.primaryCareProvider?.firstName+"," : ''} ${(JsonData?.plans[0]?.primaryCareProvider?.lastName !==undefined) ? JsonData?.plans[0]?.primaryCareProvider?.lastName :''} </td></tr> 
</table>
   `;
   table += `<table>==============================================================`;
  //  ELIGIBILITY BENEFITS
  table += `<table>==============================================================
   <h3 style="font-weight:bold; padding-top:0px;" >ELIGIBILITY BENEFITS</h3>
   ==============================================================`;

  //  table += `<table>
  //  <tr><td style="font-weight:bold">Co-Payment</td> <td>&nbsp : &nbsp;</td> <td>  </td></tr> 
  //  <tr><td style="font-weight:bold">Co-Insurance</td> <td>&nbsp : &nbsp;</td> <td>  </td></tr> 

  //  </table>`;



  let counter = 1;
  Object.entries(data).map((val, index) => {
    // console.log(val[1]);
    Object.entries(val[1]).map((val, index) => {
      if (index == 0) {
        table += `<table><h3>${val[1]}</h3>
        ==============================================================`;
      }

      if (val[0] !== "amount_coPayment_inNetwork" || val[0] !== "amount_coInsurance_inNetwork" || val[0] !== "amount_outOfPocket_inNetwork" || val[0] !== "amount_deductibles_inNetwork" ) {
        if (val[0] == "amount_coPayment_inNetwork" || val[0] == "amount_coInsurance_inNetwork"  || val[0] == "amount_outOfPocket_inNetwork" || val[0] == "amount_deductibles_inNetwork" ) {
           
          //Modify the keys for  subheading
             let key = val[0].split("_").join(' ');
             
        //   (val[1].length>0) ? table += `<table><h4> ${key}
        //  </h4>-----------------------------------------------------------------------------------------`: 'NA'; 

       table += `<table><h4> ${key}
        </h4>-----------------------------------------------------------------------------------------`; 

        } else {
          table += `<tr>
        <td>${val[0]}</td></td> <td>&nbsp : &nbsp;</td> <td>${val[1]}</td>
        </tr>`;
        }
      }

      if (val[0] == "amount_coPayment_inNetwork" || val[0] == "amount_coInsurance_inNetwork" || val[0] == "amount_outOfPocket_inNetwork"  | val[0] == "amount_deductibles_inNetwork" ) {
        let CData = val[1][0];
        // console.log("check,",CData);
        if (CData !== undefined) {
          
          Object.entries(CData)?.map((childVal, index) => {

            //  condition for amount_coPayment_inNetwork
            if (
              val[0] == "amount_coPayment_inNetwork" &&
              childVal[0] == "amount"
            ) {
              table += `<tr>
            <td>${childVal[0]}</td> <td>&nbsp : &nbsp;</td> </td><td>$${childVal[1]}</td>
            </tr>`;
            }

            //  condition for amount_coInsurance_inNetwork
             else if (
              val[0] == "amount_coInsurance_inNetwork" &&
              childVal[0] == "amount"
            ) {
              table += `<tr><td>${childVal[0]}</td></td> <td>&nbsp : &nbsp;</td> <td>${childVal[1]}%</td></tr>`;
            } 
            
            //  condition for amount_outOfPocket_inNetwork
            else if(
              val[0] == "amount_outOfPocket_inNetwork" &&
              childVal[0] == "amount"
            ) {
              table += `<tr><td>${childVal[0]}</td></td> <td>&nbsp : &nbsp;</td> <td>$${childVal[1]}</td></tr>`;
            }

            //  condition for amount_deductibles_inNetwork
            else if(
              val[0] == "amount_deductibles_inNetwork" &&
              childVal[0] == "amount"
            ) {
              table += `<tr><td>${childVal[0]}</td> <td>&nbsp : &nbsp;</td> </td><td>$${childVal[1]}</td></tr>`;
            }
            // else block
            else {
              table += `<tr><td>${childVal[0]}</td></td> <td>&nbsp : &nbsp;</td> <td>${childVal[1]}</td>
            </tr></br>`;
            }
            return table;
          });
        } else {
          table += `<table><tr>NA</tr></table>`;
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

// let fileName = GenerateRandomName();
let fileName = req?.body?.file_name;
// req?.body?.file_name
let fullFilePath = "public/output/output_"+fileName+".pdf"; //dynamic path
// let fullFilePath = "public/output/output.pdf";
// createCsvFile(tblData,"./output/output_"+fileName+".html" );

//  await createCsvFile(tblData, fullFilePath);

const pdfRes = pdf.create(tblData, options).toFile(fullFilePath, (err, res) => {
  if (err) {
    console.error(err);
  } 
  // return  res;
});

// return res.sendFile(path.join(__dirname, fullFilePath));
return res.status(200).json({
  status:200,
  file:path.join(__dirname, fullFilePath),
  message:"file generated successfully"

});


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