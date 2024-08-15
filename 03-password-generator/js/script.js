// DOM ELEMENTS
const lblPassword = document.getElementById("lblPassword");
const btnCopy = document.getElementById("btnCopy");
const lblCharLength = document.getElementById("lblCharLength");
const rangeCharLength = document.getElementById("rangeCharLength");
const chkUppercase = document.getElementById("chkUppercase");
const chkLowercase = document.getElementById("chkLowercase");
const chkNumbers = document.getElementById("chkNumbers");
const chkSymbols = document.getElementById("chkSymbols");
const lblStrength = document.getElementById("lblStrength");
const btnGenerate = document.getElementById("btnGenerate");

rangeCharLength.addEventListener("change", (e) => {
    lblCharLength.textContent = e.target.value;
});

btnGenerate.addEventListener("click", () => {
    // Input değerlerini al.
    const passwordLength = Number(rangeCharLength.value);
    const hasUppercase = chkUppercase.checked;
    const hasLowercase = chkLowercase.checked;
    const hasNumber = chkNumbers.checked;
    const hasSymbol = chkSymbols.checked;

    const passwordParams={
        passwordLength,
        hasUppercase,
        hasLowercase,
        hasNumber,
        hasSymbol
    };

    // Validation yap.
    const resValidation = validateInputs(passwordParams);
    if(!resValidation) return;

    // Şifre oluştur.
    const password = generatePassword(passwordParams);
    lblPassword.textContent = password;

    // Strength oluştur.
    const strengthPoint = getStrengthPoint(passwordParams);
    const strengthText = getStrengthText(strengthPoint);
    lblStrength.innerHTML = strengthText

});

btnCopy.addEventListener("click", () => {
    copyToClipboard(lblPassword.textContent);

});

const copyToClipboard = async (text) => {
//Browser Web API
try {
    await navigator.clipboard.writeText(text);

}catch(error){
   console.log(error);
}
}

// GET STRENGTH TEXT
const getStrengthText = (point) => {
    let strengthText = "";
    let strengthClass = "weak";

    // Kaç tane strength elemanı konulacak
    for(let i = 0; i < Math.round(point/10); i++){
        strengthText += "&#9929;"
    }

    // Strnegth rengi ne olacak
    if(point > 70){
        strengthClass = "strong";
    } else if(point > 30){
        strengthClass = "normal";
    }

    return `<span class=${strengthClass}>${strengthText}</span>`;

}

// GET STRENGTH POINT
const getStrengthPoint = (params) => {
    const point = (
        Number(params.hasUppercase) +
        Number(params.hasLowercase) +
        Number(params.hasNumber) +
        Number(params.hasSymbol) * 2
    ) * params.passwordLength;

    return point;
}

// GENERATE PASSWORD
const generatePassword= (params) => {
    const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWYZ";
	const lowerCaseLetters = "abcdefghijklmnopqrstuvwyz";
	const numbers = "0123456789";
	const symbols = "!@#$%^&*()_+=-{}[]|,.:;";

    let allChars = "";
    let password = "";

    if(params.hasUppercase){
        password += getRandomChar(upperCaseLetters);
        allChars += upperCaseLetters;
    }
    if(params.hasLowercase){
        password += getRandomChar(lowerCaseLetters);
        allChars += lowerCaseLetters;
    }
    if(params.hasNumber){
        password += getRandomChar(numbers);
        allChars += numbers;
    }
    if(params.hasSymbol){
        password += getRandomChar(symbols);
        allChars += symbols;
    }

    for(let i = password.length; i <params.passwordLength; i++ ){
        password += getRandomChar(allChars);
    }

    password = randomSort(password);

    return password;
}

// RANRDOM SORT 
const randomSort = (str) => {
    const randStr = str.split("").sort((a,b) => Math.random - 0.5).join("");
    return randStr;
}

// GET RANDOM CHAR
const getRandomChar = (char) => {
    // "ABCDEFGHIJKLMNOPQRSTUVWYZ" [0-26]

    const randomIndex = Math.floor(Math.random() * char.length);
    const character = char.charAt(randomIndex);

    return character

}

// VALIDATION
const validateInputs = (params) => {
    // Uzunluk validation
    if(params.passwordLength < 4){
        alert("Character length must be greater than 3");
        return false;
    }
    // Check validation
    if(
        !params.hasUppercase &&
        !params.hasLowercase &&
        !params.hasNumber &&
        !params.hasSymbol
    ){
        alert("Password must include at least a letter , a number or a symbol");
        return false;
    }
    return true;
}