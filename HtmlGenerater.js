function generateTable(JsonData,ExcelData) {
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
      ChildObj.amount_coPayment_inNetwork =
        JsonData?.plans[0]?.benefits[i]?.amounts?.coPayment?.inNetwork !==
        undefined
          ? JsonData?.plans[0]?.benefits[i]?.amounts?.coPayment?.inNetwork
          : [];
      // coInsurance/inNetwork
      ChildObj.amount_coInsurance_inNetwork =
        JsonData?.plans[0]?.benefits[i]?.amounts?.coInsurance?.inNetwork !==
        undefined
          ? JsonData?.plans[0]?.benefits[i]?.amounts?.coInsurance?.inNetwork
          : [];

      // outOfPocket/inNetwork
      ChildObj.amount_outOfPocket_inNetwork =
        JsonData?.plans[0]?.benefits[i]?.amounts?.outOfPocket?.inNetwork !==
        undefined
          ? JsonData?.plans[0]?.benefits[i]?.amounts?.outOfPocket?.inNetwork
          : [];

      // deductibles/inNetwork
      ChildObj.amount_deductibles_inNetwork =
        JsonData?.plans[0]?.benefits[i]?.amounts?.deductibles?.inNetwork !==
        undefined
          ? JsonData?.plans[0]?.benefits[i]?.amounts?.deductibles?.inNetwork
          : [];

      // ===============Push into a main obj==================
      Professional_Physician_visit.push(ChildObj);
      ChildObj = {};
    }


    let DateAndTime = TimeFormater(JsonData?.createdDate);
    let DOB = DOBFormat(JsonData?.patient?.birthDate);
    let Requesting_provider_name = "";
    if (JsonData?.requestingProvider?.firstName !== undefined) {
      Requesting_provider_name += `${JsonData?.requestingProvider?.firstName}, `;
    }
    if (JsonData?.requestingProvider?.lastName !== undefined) {
      Requesting_provider_name += `${JsonData?.requestingProvider?.lastName}`;
    }

    let Plan_effective_date =
      JsonData?.plans[0]?.coverageStartDate !== undefined
        ? TimeFormater(JsonData?.plans[0]?.coverageStartDate)
        : "";
    let term_date =
      JsonData?.plans[0]?.coverageEndDate !== undefined
        ? TimeFormater(JsonData?.plans[0]?.coverageEndDate)
        : "";
    let premium_paid_end_date =
      JsonData?.plans[0]?.premiumPaidToEndDate !== undefined
        ? TimeFormater(JsonData?.plans[0]?.premiumPaidToEndDate)
        : "";

    let table = "";
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
 <tr><td style="font-weight:bold">Name</td> <td>&nbsp : &nbsp;</td> <td>${
   JsonData?.patient?.firstName !== undefined
     ? JsonData?.patient?.firstName
     : ""
 }  ${
      JsonData?.patient?.lastName !== undefined
        ? JsonData?.patient?.lastName
        : ""
    }</td></tr> 
 <tr><td style="font-weight:bold">Address</td> <td>&nbsp : &nbsp;</td> <td>${
   JsonData?.patient?.address?.line1 !== undefined
     ? JsonData?.patient?.address?.line1
     : ""
 } </td></tr> 
 <tr><td style="font-weight:bold">City-State-Zip</td> <td>&nbsp : &nbsp;</td> <td>${
   JsonData?.patient?.address?.city !== undefined
     ? JsonData?.patient?.address?.city
     : ""
 }, ${
      JsonData?.patient?.address?.state !== undefined
        ? JsonData?.patient?.address?.state
        : ""
    }, ${
      JsonData?.patient?.address?.zipCode
        ? JsonData?.patient?.address?.zipCode
        : ""
    }</td></tr>
 <tr><td style="font-weight:bold">Gender</td> <td>&nbsp : &nbsp;</td> <td>${
   JsonData?.patient?.gender !== undefined ? JsonData?.patient?.gender : ""
 }</td></tr>
 <tr><td style="font-weight:bold">Date Of Birth</td> <td>&nbsp : &nbsp;</td> <td>${DOB}</td></tr> 
 <tr><td style="font-weight:bold">Last Name</td> <td>&nbsp : &nbsp;</td> <td>${
   JsonData?.patient?.lastName !== undefined
     ? JsonData?.patient?.lastName
     : ""
 }</td></tr> 
 <tr><td style="font-weight:bold">First Name</td> <td>&nbsp : &nbsp;</td> <td>${
   JsonData?.patient?.firstName !== undefined
     ? JsonData?.patient?.firstName
     : ""
 }</td></tr> 
 <tr><td style="font-weight:bold">Member ID</td> <td>&nbsp : &nbsp;</td> <td>${
   JsonData?.subscriber?.memberId !== undefined
     ? JsonData?.subscriber?.memberId
     : ""
 }</td></tr> 
 <tr><td style="font-weight:bold">Group Number</td> <td>&nbsp : &nbsp;</td> <td>${
   JsonData?.plans[0]?.groupNumber !== undefined
     ? JsonData?.plans[0]?.groupNumber
     : ""
 }</td></tr>
 <tr><td style="font-weight:bold">Premium Paid End Date</td> <td>&nbsp : &nbsp;</td> <td> ${premium_paid_end_date}</td></tr>
 <tr><td style="font-weight:bold">Plan Effective Date</td> <td>&nbsp : &nbsp;</td> <td> ${Plan_effective_date} </td></tr> 
 <tr><td style="font-weight:bold">Term Date</td> <td>&nbsp : &nbsp;</td> <td> ${term_date}</td> </tr> 
 <tr><td style="font-weight:bold">Relation to Subscriber</td> <td>&nbsp : &nbsp;</td> <td>${
   JsonData?.patient?.subscriberRelationship !== undefined
     ? JsonData?.patient?.subscriberRelationship
     : ""
 }</td></tr>
 <tr><td style="font-weight:bold">Requesting Provider Name</td> <td>&nbsp : &nbsp;</td> <td>${Requesting_provider_name}</td></tr> 
 <tr><td style="font-weight:bold">Primary Care Provider Name</td> <td>&nbsp : &nbsp;</td> <td>${
   JsonData?.plans[0]?.primaryCareProvider?.firstName !== undefined
     ? JsonData?.plans[0]?.primaryCareProvider?.firstName + ","
     : ""
 } ${
      JsonData?.plans[0]?.primaryCareProvider?.lastName !== undefined
        ? JsonData?.plans[0]?.primaryCareProvider?.lastName
        : ""
    } </td></tr>
 `;
    table += `<table>==============================================================`;
    //  ELIGIBILITY BENEFITS
    table += `<table>==============================================================
 <h3 style="font-weight:bold; padding-top:0px;" >ELIGIBILITY BENEFITS</h3>
 ==============================================================`;
    table += `<table>
 <tr><td style="font-weight:bold">Co-Payment</td> <td>&nbsp : &nbsp;</td><td>${
   ExcelData[0]?.CoPayment !== undefined ? ExcelData[0]?.CoPayment : "NA"
 }</td></tr> 
 <tr><td style="font-weight:bold">Co-Insurance</td> <td>&nbsp : &nbsp;</td> <td>${
   ExcelData[0]?.CoInsurance !== undefined ? ExcelData[0]?.CoInsurance : "NA"
 }</td></tr> 
 <tr><td style="font-weight:bold">Deductible Individual</td> <td>&nbsp : &nbsp;</td><td>${
   ExcelData[0]?.DeductibleIndividual !== undefined
     ? ExcelData[0]?.DeductibleIndividual
     : "NA"
 }</td></tr> 
 <tr><td style="font-weight:bold">Deductible Individual Met</td> <td>&nbsp : &nbsp;</td><td>${
   ExcelData[0]?.DeductibleIndividualMet !== undefined
     ? ExcelData[0]?.DeductibleIndividualMet
     : "NA"
 }</td></tr>
 <tr><td style="font-weight:bold">Deductible Individual Remaining</td> <td>&nbsp : &nbsp;</td><td>${
   ExcelData[0]?.DeductibleIndividualRemaining !== undefined
     ? ExcelData[0]?.DeductibleIndividualRemaining
     : "NA"
 }</td></tr> 
 <tr><td style="font-weight:bold">Deductible Family</td> <td>&nbsp : &nbsp;</td> <td>${
   ExcelData[0]?.DeductibleFamily !== undefined
     ? ExcelData[0]?.DeductibleFamily
     : "NA"
 }</td></tr> 
 <tr><td style="font-weight:bold">Deductible Family Met</td> <td>&nbsp : &nbsp;</td> <td>${
   ExcelData[0]?.DeductibleFamilyMet !== undefined
     ? ExcelData[0]?.DeductibleFamilyMet
     : "NA"
 }</td></tr> 
 <tr><td style="font-weight:bold">Deductible Family Remaining</td> <td>&nbsp : &nbsp;</td> <td>${
   ExcelData[0]?.DeductibleFamilyRemaining !== undefined
     ? ExcelData[0]?.DeductibleFamilyRemaining
     : "NA"
 }</td></tr> 
 <tr><td style="font-weight:bold">Out Of Pocket Individual</td> <td>&nbsp : &nbsp;</td> <td>${
   ExcelData[0]?.OutOfPocketIndividual !== undefined
     ? ExcelData[0]?.OutOfPocketIndividual
     : "NA"
 }</td></tr>
 <tr><td style="font-weight:bold">Out Of Pocket Individual Met</td> <td>&nbsp : &nbsp;</td> <td>${
   ExcelData[0]?.OutOfPocketIndividualMet !== undefined
     ? ExcelData[0]?.OutOfPocketIndividualMet
     : "NA"
 }</td></tr>
 <tr><td style="font-weight:bold">Out Of Pocket Individual Remaining</td> <td>&nbsp : &nbsp;</td> <td>${
   ExcelData[0]?.OutOfPocketIndividualRemaining !== undefined
     ? ExcelData[0]?.OutOfPocketIndividualRemaining
     : "NA"
 }</td></tr> 
 <tr><td style="font-weight:bold">Out Of Pocket Family</td> <td>&nbsp : &nbsp;</td> <td>${
   ExcelData[0]?.OutOfPocketFamily !== undefined
     ? ExcelData[0]?.OutOfPocketFamily
     : "NA"
 }</td></tr> 
 <tr><td style="font-weight:bold">Out Of Pocket Family Met</td> <td>&nbsp : &nbsp;</td> <td>${
   ExcelData[0]?.OutOfPocketFamilyMet !== undefined
     ? ExcelData[0]?.OutOfPocketFamilyMet
     : "NA"
 }</td></tr>
 <tr><td style="font-weight:bold">Out Of Pocket Family Remaining</td> <td>&nbsp : &nbsp;</td> <td>${
   ExcelData[0]?.OutOfPocketFamilyRemaining !== undefined
     ? ExcelData[0]?.OutOfPocketFamilyRemaining
     : "NA"
 }</td></tr>
 `;

    table += `<table>==============================================================`;
    let counter = 1;
    Object.entries(data).map((val, index) => {
      // console.log(val[1]);
      Object.entries(val[1]).map((val, index) => {
        if (index == 0) {
          table += `<table><h3>${val[1]}</h3>
      ==============================================================`;
        }
        if (
          val[0] !== "amount_coPayment_inNetwork" ||
          val[0] !== "amount_coInsurance_inNetwork" ||
          val[0] !== "amount_outOfPocket_inNetwork" ||
          val[0] !== "amount_deductibles_inNetwork"
        ) {
          if (
            val[0] == "amount_coPayment_inNetwork" ||
            val[0] == "amount_coInsurance_inNetwork" ||
            val[0] == "amount_outOfPocket_inNetwork" ||
            val[0] == "amount_deductibles_inNetwork"
          ) {
            //Modify the keys for  subheading
            let keyArr = val[0].split("_");
            keyArr.splice(0, 1);
            //  console.log(keyArr.join(" "));
            //   (val[1].length>0) ? table += `<table><h4> ${key}
            //  </h4>-----------------------------------------------------------------------------------------`: 'NA';

            table += `<table><h4> ${keyArr.join("  ")}
      </h4>-----------------------------------------------------------------------------------------`;
          } else {
            table += `<tr>
      <td>${val[0]}</td> <td>&nbsp : &nbsp;</td> <td>${val[1]}</td>
      </tr>`;
          }
        }

        if (
          val[0] == "amount_coPayment_inNetwork" ||
          val[0] == "amount_coInsurance_inNetwork" ||
          (val[0] == "amount_outOfPocket_inNetwork") |
            (val[0] == "amount_deductibles_inNetwork")
        ) {
          let CData = val[1][0];
          // console.log("check,",CData);
          if (CData !== undefined) {
            Object.entries(CData)?.map((childVal, index) => {
              //  condition for amount_coPayment_inNetwork
              if (
                (val[0] == "amount_coPayment_inNetwork" &&
                  childVal[0] == "amount") ||
                (val[0] == "amount_coPayment_inNetwork" &&
                  childVal[0] == "total")
              ) {
                table += `<tr>
          <td>${childVal[0]}</td> <td>&nbsp : &nbsp;</td> <td>$${childVal[1]}</td>
          </tr>`;
              }

              //  condition for amount_coInsurance_inNetwork
              else if (
                val[0] == "amount_coInsurance_inNetwork" &&
                childVal[0] == "amount"
              ) {
                table += `<tr><td>${childVal[0]}</td> <td>&nbsp : &nbsp;</td> <td>${childVal[1]}%</td></tr>`;
              }

              //  condition for amount_outOfPocket_inNetwork
              else if (
                (val[0] == "amount_outOfPocket_inNetwork" &&
                  childVal[0] == "amount") ||
                (val[0] == "amount_outOfPocket_inNetwork" &&
                  childVal[0] == "total")
              ) {
                table += `<tr><td>${childVal[0]}</td> <td>&nbsp : &nbsp;</td> <td>$${childVal[1]}</td></tr>`;
              }

              //  condition for amount_deductibles_inNetwork
              else if (
                (val[0] == "amount_deductibles_inNetwork" &&
                  childVal[0] == "amount") ||
                (val[0] == "amount_deductibles_inNetwork" &&
                  childVal[0] == "total")
              ) {
                table += `<tr><td>${childVal[0]}</td> <td>&nbsp : &nbsp;</td> <td>$${childVal[1]}</td></tr>`;
              }
              // else block
              else {
                table += `<tr><td>${childVal[0]}</td><td>&nbsp : &nbsp;</td> <td>${childVal[1]}</td>
          </tr>`;
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
    console.log(table);
    return table;
  }

  module.exports = {
    generateTable
  }