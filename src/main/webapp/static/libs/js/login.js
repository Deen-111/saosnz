function checkCredentials() {
	var user = document.getElementById("userField").value;
	var pass = document.getElementById("passField").value;

	console.log("---LOGIN CONTROLLER----")
	var client = new HttpClient();

	client.get(FRONT_URL + '/user/getSessionData?user_name=' + user
		+ '&user_pwd=' + pass, function(response) {
			var name = user;
			localStorage.setItem("userName", name);
			var sessionObj = response;
			if (sessionObj === "invalid") {
				$("#invalidMessage").show();
				$("#expiredMessage").hide();
				$("#userField").val('');
				$("#passField").val('');
				/*				alert("Credentials are invalid.");
								window.location = FRONT_URL + "/login.jsp?session=invalid";*/
			} else {
				window.location = FRONT_URL + "/softwareUpgradation.jsp";
			}
		});
}

function changePassword() {
	document.getElementById("changePass").disabled = true;
	if (document.getElementById("passField2").hidden == true) {
		document.getElementById("passField2").hidden = false;
	}
	if (document.getElementById("passField3").hidden == true) {
		document.getElementById("passField3").hidden = false;
	}
	if (document.getElementById("updatePass").hidden == true) {
		document.getElementById("updatePass").hidden = false;
	}
}

function updatePassword() {
	var user = document.getElementById("userField").value;

	var Oldpassword = document.getElementById("passField").value;
	var password1 = document.getElementById("passField2").value;
	var password2 = document.getElementById("passField3").value;

	var client = new HttpClient();

	client.get(FRONT_URL + '/user/getOldPassword?user_name=' + user
		+ '&user_pwd=' + Oldpassword, function(response) {
			if (response == Oldpassword) {
				if (password1 == '')
					alert("Please enter Password");

				// If confirm password not entered 
				else if (password2 == '')
					alert("Please enter confirm password");

				// If Not same return False.     
				else if (password1 != password2) {
					alert("\nPassword did not match: Please try again...")
					return false;
				}

				// If same return True. 
				else {
					var updatePropUrl = FRONT_URL + '/user/updateOldPassword?user_name=' + user
						+ '&user_pwd=' + password2;
					updateTable(updatePropUrl);
					alert("New Password updated.Please Login again!");

					return true;
				}

			} else {
				alert("Wrong old password");
			}

		});

	// If password not entered 
	function updateTable(updatePropUrl) {
		var client = new XMLHttpRequest();
		var ItemJSON = '[  {"user_name": user_name, "user_pwd": user_pwd}]';
		client.open("PUT", updatePropUrl, true);
		client.send(ItemJSON);
	}

}

function checkEnter(e) {
	if (e.keyCode === 13) {
		document.getElementById("loginButton").click();
	}
}