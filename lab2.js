
function switchParagraphs() {
	let paragraph1 = document.getElementById('paragraph1');
	let paragraph1Content = document.getElementById('paragraph1').innerHTML;
	let paragraph2 = document.getElementById('paragraph2');
	let paragraph2Content = document.getElementById('paragraph2').innerHTML;

	paragraph1.innerHTML = paragraph2Content;
	paragraph2.innerHTML = paragraph1Content;

	return true;

}

function circleArea() {
	let radius = document.getElementById('radius').value;
	let output = document.getElementById('paragraph3');

	if(isNaN(radius)) {
		alert("Inсorrect input.");
		return false;
	} else if (radius <= 0) {
		alert("Incorrect input. Radius has to be a positive number.");
		return false;
	} else {
		let area = radius * radius * Math.PI;
		output.innerHTML = area;
		return true;
	}

}

function minDigit() {
	let inputNum = parseInt(document.getElementById('inputNum').value);
	if (isNaN(inputNum)) {
		alert("Incorrect input.");
		return false;
	} else if (Number.isInteger(inputNum)) {
		let absNum = Math.abs(inputNum);
		let stringNum = absNum.toString();
		let lengthNum = stringNum.length;
		let minDigit = 9;

		for (var i = 0; i < lengthNum; i += 1) {
			if ((absNum % 10) < minDigit) {
				minDigit = absNum % 10;
			}
			absNum = (absNum - (absNum % 10))/10;
		}

		setCookie("inputNum", inputNum, 1);
		setCookie("minDigit", minDigit, 1);

		alert("Smallest digit of " + inputNum + " is " + minDigit + ".");
		return true;
	}
}

function setCookie (cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	let expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires +";path=/";
	console.log(cname + "=" + cvalue + ";" + expires +";path=/");
	//console.log("The cookie " + cname + "  created")
}

function someCookieStorageCheck(cname) {
	var name = cname + "="
	if (document.cookie.split(';').filter((item) => item.trim().startsWith(name)).length) {
    console.log("The cookie " + cname + "  exists")
		return true;
  }
	return false;
}

function cookieStorageCheck() {
	if (someCookieStorageCheck("minDigit") && someCookieStorageCheck("inputNum")) {
		let confirm = window.confirm("Previous smallest digit of " + getCookie("inputNum") + " is " + getCookie("minDigit") + ". Delete this value?");
			if (confirm == true) {
				deleteCookie("minDigit");
				deleteCookie("inputNum");
			} else {
				alert("The page will be updated");
				oldInput = getCookie("inputNum");
				document.getElementById("inputNum").value = oldInput;
				deleteCookie("minDigit");
				deleteCookie("inputNum");
			}
	}

	if (someCookieStorageCheck("colored")) {
		oldColor = getCookie("colored");
		document.getElementById("textColor").value = oldColor;
		changeColor();
		deleteCookie("colored");
	}
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function deleteCookie(cname) {
    if(getCookie(cname)) {
        document.cookie = cname + "=" +
            ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
		return true;
}

function changeColor(){
	//console.log("select");
	colored = document.getElementById("textColor").value;
	var selectedText = document.getElementById("coloredText");//.select();
	selectedText.style.color = colored;
	setCookie("colored", colored, 1);
}

function selectHTML() {
    try {
        if (window.ActiveXObject) {
            var c = document.selection.createRange();
            return c.htmlText;
        }

        var nNd = document.createElement("span");
        var w = getSelection().getRangeAt(0);
        w.surroundContents(nNd);
        return nNd.innerHTML;
    } catch (e) {
        if (window.ActiveXObject) {
            return document.selection.createRange();
        } else {
            return getSelection();
        }
    }
}

let tableCount = 0;


let table = document.createElement("table");
let tbody = document.createElement("tbody");
let row = document.createElement("tr");
let cell = document.createElement("th");

function generateTable() {
	if (tableCount == 0) {
		table.appendChild(tbody);
		tbody.appendChild(row);
		row.appendChild(cell);
		document.getElementById("paragraph2").appendChild(table);
	} else if (tableCount % 2 == 0) {
		var createdTable = document.getElementsByTagName("table");
		var rows = createdTable[0].getElementsByTagName("tr");
		var firstRow = rows[0];
		var secondRow = rows[1];
		var cellsFirst = firstRow.getElementsByTagName("tr");
		var cellsSecond = secondRow.childNodes.length;
		var newCell = document.createElement("th");

		if (tableCount > 1) {
			while (secondRow.childNodes.length > 0) {
			//for (i=0; i < secondRow.childNodes.length; i++) {
				firstRow.appendChild(secondRow.childNodes[0]);
				console.log("odd align");
			}
			firstRow.appendChild(newCell);
		}
 } else if (tableCount % 2 == 1) {
	 var createdTable = document.getElementsByTagName("table");
	 var rows = createdTable[0].getElementsByTagName("tr");
	 var newRow = document.createElement("tr");
	 if (tableCount < 2) {
		 tbody.appendChild(newRow);
	 }
	 var firstRow = rows[0];
	 var secondRow = rows[1];
	 var cellsFirst = firstRow.getElementsByTagName("tr");
	 var cellsSecond = secondRow.getElementsByTagName("tr");
	 var newCell = document.createElement("th");
	 secondRow.appendChild(newCell);
	 if (tableCount > 1) {
		 while (firstRow.childNodes.length > secondRow.childNodes.length) {
		 //for (i=0; i < (firstRow.childNodes.length / 2); i++) {
			 secondRow.appendChild(firstRow.childNodes[0]);
			 console.log("even align");
		 }
	 }
 }
 tableCount++;
}
