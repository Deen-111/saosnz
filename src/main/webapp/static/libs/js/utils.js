var xhr = new XMLHttpRequest();

var HttpClient = function() {
	this.get = function(aUrl, aCallback) {
		var anHttpRequest = new XMLHttpRequest();
		anHttpRequest.onreadystatechange = function() {
			if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
				aCallback(anHttpRequest.responseText);
		}

		anHttpRequest.open("GET", aUrl, true);
		anHttpRequest.send(null);
	}
	this.post = function(aUrl, payload, aCallback) {
		$("#loader").show();
		xhr.open("POST", aUrl, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(JSON.stringify(payload));
		xhr.onload = function() {
			$("#loader").hide();
			if (xhr.status == 200)
				aCallback(xhr.responseText)
		};
	};

	this.put = function(aUrl, payload, aCallback) {
		$("#loader").show();
		xhr.open("PUT", aUrl, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(JSON.stringify(payload));
		xhr.onload = function() {
			$("#loader").hide();
			if (xhr.status == 200)
				aCallback(xhr.responseText)
		};
	};

	this.delete = function(aUrl, payload, aCallback) {
		var xhr = new XMLHttpRequest();
		$("#loader").show();
		xhr.open("DELETE", aUrl);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(JSON.stringify(payload));
		xhr.onload = function() {
			$("#loader").hide();
			if (xhr.status == 200)
				aCallback(xhr.responseText)
		};
	};
}


var btnContainer;


function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function getDataFromAPI(apiUrl) {
	$("#loader").show();
	var apiResponse
	$.get(apiUrl).then(
		response => {
			$("#loader").hide();
			console.log('Response: ', response)
			apiResponse = response
		},
		error => {
			$("#loader").hide();
			console.log("Error: ", error)
			// var errorDto = error.responseJSON

			if (error.status == 401) {
				window.location = FRONT_URL + "/login.jsp?user-session=expired";
			} else {
				window.location = FRONT_URL + "/error.jsp";
			}
		}
	);
	return apiResponse
}


function csvData2Array(csvData) {
	var lines = csvData.split('\n');
	console.log('Lines: ', lines);
	var csvDataArray = []
	var count = 0
	for (var line of lines) {
		if (count == 0) {
			count++;
			continue;
		}

		var dataArray = []
		if (line.length > 0) {
			for (var item of line.split(',')) {
				dataArray.push(item)
			}
			csvDataArray.push(dataArray)
		}
	}
	return csvDataArray
}


if (sessionStorage.getItem('loginUserName') == null) {
	var httpClient = new HttpClient();
	var getLoginUrl = FRONT_URL + '/settings/user-info';
	httpClient.get(getLoginUrl, function(apiResponse) {
		console.log(apiResponse)
		apiResponse = JSON.parse(apiResponse)
		sessionStorage.setItem('loginUserName', apiResponse.userName);
		sessionStorage.setItem('loginFirstName', apiResponse.firstName);
		sessionStorage.setItem('loginRole', apiResponse.role);
		const div = document.getElementById('userName');
		div.innerHTML = apiResponse.firstName;
		console.log("role" +apiResponse.firstName)
		if(apiResponse.role == "User"){
		document.getElementById("master-properties").style.display = "none";
		document.getElementById("user-management").style.display = "none";}
	});
} else {
	const div = document.getElementById('userName');
	div.innerHTML = (sessionStorage.getItem('loginFirstName'));
	console.log("role" +sessionStorage.getItem('loginRole'))
	if(sessionStorage.getItem('loginRole') == "User"){
	document.getElementById("master-properties").style.display = "none";
	document.getElementById("user-management").style.display = "none";
	}
}

$('#logout').click(function() {
	sessionStorage.removeItem("loginUserName");
	sessionStorage.removeItem("loginFirstName");
	window.location = FRONT_URL + "/logout";
});


var modal = document.getElementById("changePasswordModal");
var btn = document.getElementById("updatePassword");
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
	modal.style.display = "none";
	$("#form_id").trigger("reset");
	document.getElementById("inline_msg").innerHTML = "";
}

btn.onclick = function() {
	modal.style.display = "block";
}

window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
		$("#form_id").trigger("reset");
		document.getElementById("inline_msg").innerHTML = "";
	}
}

function updatePassword() {
	var newPassword = document.getElementById("newPassword").value;
	var reenterNewPassword = document.getElementById("reenterPassword").value;
	if (newPassword !== reenterNewPassword) {
		document.getElementById("inline_msg_password").innerHTML = "Password and Confirm Password don't match.";
	} else {
		let userPwd = newPassword;
		console.log(userPwd)
		var updateUserUrl = API_URL + '/settings/update-password?userPwd=' + userPwd
		console.log(updateUserUrl)
		var xmlHttpRequest = new XMLHttpRequest();
		xmlHttpRequest.open("PUT", updateUserUrl, true);
		xmlHttpRequest.send();
		document.getElementById("inline_msg_password").innerHTML = "Password Updated Successfully";
		window.location.replace(FRONT_URL + "/logout")
		sessionStorage.removeItem("loginUser");
	}
	function hide() {
		document.getElementById("inline_msg_password").innerHTML = "";
	}
	setTimeout(hide, 7000);
}

function setValue(value) {
	if ((value).includes("False"))
		return '<div style="color:red">' + "Fail" + '</div>';
	else
		return '<div style="color:green">' + "Pass" + '</div>';
}

function createUploadStatusRow(status, uploadStatus) {
	if (status == "Free" || status == "Ready")
		return '<td><div style="color:green">' + uploadStatus + '</div></td>';
	else if (status == "new")
		return '<td><div style="color:blue">' + uploadStatus + '</div></td>';
	else
		return '<td><div style="color:#EC7063">' + uploadStatus + '</div></td>';
}

function colorEnrollmentData(value) {
	if ((value).includes("Failed"))
		return '<div style="color:#EC7063">' + value + '</div>';
	else if ((value).includes("Success"))
		return '<div style="color:Green">' + value + '</div>';
	else if ((value).includes("Not Initiated"))
		return '<div style="color:#F4D03F">' + value + '</div>';
	else
		return '<div>' + value + '</div>';
}

function createValidationStatusRow(status) {
	if (status == "SUCCESS")
		return '<td><div style="color:#229954">' + capitalizeFirstLetter(status) + '</div></td>';
	else if (status == "FAILED")
		return '<td><div style="color:#EC7063">' + capitalizeFirstLetter(status) + '</div></td>';
	else if (status == "IN-PROGRESS")
		return '<td><div style="color:#3498DB">' + capitalizeFirstLetter(status) + '</div></td>';
	else
		return '<td><div style="color:#F5B041">' + "NOT INITIATED" + '</div></td>';
}

function createCheckStatusRow(value) {
	if (value == "Success") {
		return '<td><div style="color:#229954">' + "Passed" + '</div></td>'
	}
	else {
		return '<td><div style="color:#EC7063">' + "Failed" + '</div></td>';
	}
}

function checkStatusForExport(value) {
	if (value == "Success") {
		return "Passed"
	}
	else {
		return "Failed";
	}
}

function createCheckErrorRow(value) {
	if (value == "Success") {
		return '<td><div">' + "" + '</div></td>'
	}
	else {
		return '<td><div>' + value + '</div></td>';
	}
}
getSoftwareUpgradationRings()
getSoftwareUpgradationNodeName()

function getSoftwareUpgradationRings() {
	var client = new HttpClient();
	client.get(FRONT_URL + '/upgradation/node-detail/rings', function(response) {
		response = JSON.parse(response)
		$('#software_upgradation_ring_list').html('');
		for (var i = 0; i < response.length; i++)
			$('#software_upgradation_ring_list').append($('<option>' + response[i] + '</option>'));
	});
}

function getSoftwareUpgradationNodeName() {
	var client = new HttpClient();
	client.get(FRONT_URL + '/upgradation/node-detail/node-names', function(response) {
		response = JSON.parse(response)
		$('#software_upgradation_node_list').html('');
		for (var i = 0; i < response.length; i++)
			$('#software_upgradation_node_list').append($('<option>' + response[i] + '</option>'));
	});
}


function download_csv(data, fileName) {
	var csv = '';

	for (let i = 0; i < data.length; i++) {
		var p = Object.keys(data[i])

		for (let j = 0; j < p.length; j++) {
			// console.log(data[i][p[j]]);
			var single_cell = data[i][p[j]];
			csv = csv + single_cell + ","
		}
		csv = csv + "\n"
	}

	console.log('Data to file: ' + csv);
	var hiddenElement = document.createElement('a');
	hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
	hiddenElement.target = '_blank';
	hiddenElement.download = fileName;
	hiddenElement.click();
}