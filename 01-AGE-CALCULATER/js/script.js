function calculateAge() {
	// 1- Uygulamada kullanilan elementleri sec ve degiskene ata
	const txtDay = document.getElementById("txtDay");
	const txtMonth = document.getElementById("txtMonth");
	const txtYear = document.getElementById("txtYear");

	const lblYears = document.getElementById("lblYears");
	const lblMonths = document.getElementById("lblMonths");
	const lblDays = document.getElementById("lblDays");

	const currentDateTime = new Date();

	// 2- inputlarin degerlerini al ve degiskene ata
	const day = parseInt(txtDay.value);
	const month = parseInt(txtMonth.value);
	const year = parseInt(txtYear.value);

	// falsy values: false, null, empty, undefined, 0, NaN

	// 3- input degerlerini kontrol et (validation)

	if (!day || day < 1 || day > 31) {
		alert("Invalid day");
		return;
	}

	if (!month || month < 1 || month > 12) {
		alert("Invalid month");
		return;
	}

	const currentYear = currentDateTime.getFullYear();
	const currentMonth = currentDateTime.getMonth() + 1; // zero based
	const currentDay = currentDateTime.getDate();

	if (!year || year < currentYear - 150 || year > currentYear) {
		alert("Invalid year");
		return;
	}

	// 4- hesapla

	// 06-08-2024
	// 03-06-2000
	// ---------------
	//  3  2   24

	// 36-19-2023
	// 15-10-2000
	// ---------------
	//  21  9   23

	let ageYears = currentYear - year;
	let ageMonths = currentMonth - month;
	let ageDays = currentDay - day;

	if (ageDays < 0) {
		ageDays += 30; // ageDays = ageDays + 30
		ageMonths--; // ageMonths=agemonths-1
	}

    if (ageMonths < 0) {
		ageMonths += 12; 
		ageYears--; 
	}


	// 5- sonucu ekrana yaz
	lblYears.innerHTML = ageYears;
	lblMonths.innerHTML = ageMonths;
	lblDays.innerHTML = ageDays;
}