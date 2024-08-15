const txtWeight = document.getElementById("txtWeight");
const txtHeight = document.getElementById("txtHeight");
const indicator = document.getElementById("indicator");
const indicatorLabel = document.getElementById("indicatorLabel");

function getBMI() {
	// input degerlerini al ve number a cevir
	const weight = Number(txtWeight.value);
	const height = Number(txtHeight.value);

	// degerleri kontrol et (validation)

	txtWeight.classList.remove("is-invalid");
	txtHeight.classList.remove("is-invalid");

	if (!weight || weight <= 0 || weight > 500) {
		txtWeight.classList.add("is-invalid");
		return;
	}

	if (!height || height <= 0 || height > 300) {
		txtHeight.classList.add("is-invalid");
		return;
	}

	// BMI degerini hesapla
	const bmi = weight / Math.pow(height / 100, 2);

	// Sonucu ekrana yazdır
    const leftPosition = bmi>50 ? 100 : bmi * 2;
    indicator.style.left = `${leftPosition}%` // indicator i hareket ettirir.
    indicatorLabel.textContent = leftPosition.toFixed(0); // label in icindeki degeri berlirler.

    // indicator label inin ok isaretinin saginda mi yoksa solunda mi olaagini belirler
    if(leftPosition>50){
        indicatorLabel.style.left = "-35px"
    }
    else{
        indicatorLabel.style.left = "20px"
    }



	console.log(bmi);
}
