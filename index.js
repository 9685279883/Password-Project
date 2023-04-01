const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allcheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = ' @#$!%^&*()_-{}[];.,"<>?/:` '



let password = ("");
let passwordLength = 10;
let checkCount = 1;
handleSlider();

//ste circle color grey


//password length set
function handleSlider (){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}



function setIndicatora(color){
    indicator.style.backgroundColor = color;
    //shadow
}

function getRndInteger(min,max){

   return Math.floor(Math.random() * (max - min)) + min;


}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123))
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91))
}

function generateSymbol(){
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicatora("#0f0");

    } else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength >= 6
    ){
        setIndicatora("#ff0");
    } else {
        setIndicatora("#f00");
    }

}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e){
        copyMsg.innerText = "failed";
    }

    copyMsg.classList.add("active");
    setTimeout(() => {
        copyMsg.classList.remove("active")
    },3000);

}

function shufflePassword(array){
    //fisher yates method

    for (let i = array.length -1; i>0; i--){
        const j = Math.floor(Math.random() * (i +1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange() {
    checkCount = 0;
    allcheckBox.forEach((checkbox) => {
        if(checkbox.checked)
        checkCount++;
    });
    //special condition
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}

allcheckBox.forEach((checkbox) => {
    checkbox.addEventListener('chenge', handleCheckBoxChange);
})

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value)
    copyContent();
} )

generateBtn.addEventListener('click', () => {

        //none of the checkbox are selected
        if(checkCount <=0) return;

        if(passwordLength < checkCount){
            passwordLength = checkCount;
            handleSlider();
        }
        //new password journey
        console.log("starting the journey");
        // remove old password
        password = "";
        // lets put the stuff mentioned by checkboxes
        // if (uppercaseCheck.cheked){
        //     password += generateUpperCase();
        // }
        // if (lowercaseCheck.cheked){
        //     password += generateLowerCase();
        // }
        // if (numbersCheck.cheked){
        //     password += generateRandomNumber();
        // }
        // if (symbolsCheck.cheked){
        //     password += generateSymbol();
        // }
let funcArr = [];

if(uppercaseCheck.checked)
funcArr.push(generateUpperCase);

if(lowercaseCheck.checked)
funcArr.push(generateLowerCase);

if(numbersCheck.checked)
funcArr.push(generateRandomNumber);

if(symbolsCheck.checked)
funcArr.push(generateSymbol);

//cimpulsory addition
for(let i=0; i<funcArr.length; i++){
    password += funcArr[i]();

}
console.log("compulsory addition done");

// remaining addition

for (let i=0; i<passwordLength-funcArr.length; i++){
    let randIdex = getRndInteger(0, funcArr.length);
    console.log("randIndex" + randIdex);
    password += funcArr[randIdex]();
}
console.log("Remaining addition done");

//shuffle the password

password = shufflePassword(Array.from(password));
console.log("Shuffling done");
//show in UI
passwordDisplay.value = password;
console.log("UI addition done");
//calculate strength
calcStrength();


});










