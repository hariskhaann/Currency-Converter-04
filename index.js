import inquirer from "inquirer";
//Currency converter API link
let apilink = "https://v6.exchangerate-api.com/v6/ff5ce52df0b77bb024605ad4/latest/PKR";
// Fetch Data
let fetchData = async (data) => {
    let fetchData = await fetch(data);
    let res = await fetchData.json();
    return res.conversion_rates;
};
let data = await fetchData(apilink);
// Object to aray 
let countries = Object.keys(data);
console.log(countries);
let firstCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "converting from",
    choices: countries,
});
let userMoney = await inquirer.prompt({
    type: "number",
    name: "rupees",
    message: `please enter the amount in ${firstCountry.name}:`
});
let secondCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "converting to",
    choices: countries,
});
// Conversion rate
let cnv = `https://v6.exchangerate-api.com/v6/ff5ce52df0b77bb024605ad4/pair/${firstCountry.name}/${secondCountry.name}`;
// fetching data from conversion rate
let cnvData = async (data) => {
    let cnvData = await fetch(data);
    let res = await cnvData.json();
    return res.conversion_rate;
};
let conversionRate = await cnvData(cnv);
let convertedRate = userMoney.rupees * conversionRate;
console.log(convertedRate);
