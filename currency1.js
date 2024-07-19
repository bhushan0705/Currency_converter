const fromAmountElement = document.querySelector(".amount");
const convertedAmountElement = document.querySelector(".convertedAmount");
const fromCurrencyElement = document.querySelector(".fromCurrency");
const toCurrencyElement = document.querySelector(".toCurrency");
const resultElement = document.querySelector(".result");
resultElement.textContent="Loading..";



const countries = [
    { code: "USD", name: "United States Dollar" },
    { code: "INR", name: "Indian Rupee" }
];

countries.forEach(country => {
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');

    option1.value= option2.value = country.code;
    option1.textContent = option2.textContent =`${country.code} (${country.name})`;

    fromCurrencyElement.appendChild(option1);
    toCurrencyElement.appendChild(option2);

    fromCurrencyElement.value="USD";
    toCurrencyElement.value="INR";

});


// api

const getExchangeRate=async()=>{
    const amount=parseFloat(fromAmountElement.value);
    const fromCurrency=fromCurrencyElement.value;
    const toCurrency=toCurrencyElement.value;

    // ---fetching data from api
    try {
    const respone=await fetch(`https://v6.exchangerate-api.com/v6/49c828e5e1087fede6e36eaf/latest/${fromCurrency}`);
    const data=await respone.json();
    
    const conversionRate=data.conversion_rates[toCurrency];
    const convertedAmount=[amount*conversionRate]

    if(typeof conversionRate==="undefined"){
        resultElement.textContent="Select avilable country.."
    }
    else{
        convertedAmountElement.value=convertedAmount;
        resultElement.textContent=`${amount} ${fromCurrency}=${convertedAmount} ${toCurrency}`;
    };
}
catch (error) {
    converterContainer.innerHTML=`<h2>Error while fetching exchange rates!!</h2>`
}
};

// when user amount
fromAmountElement.addEventListener('input',getExchangeRate);


// when user change currency
fromAmountElement.addEventListener('change',getExchangeRate)
toCurrencyElement.addEventListener('change',getExchangeRate)
window.addEventListener('load',getExchangeRate)
