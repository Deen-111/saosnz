$(function() {
	"use strict";
	var httpClient = new HttpClient();
	var getUsersUrl = FRONT_URL + '/settings/user-management';
	fetchData(getUsersUrl);

	function fetchData(url) {
		httpClient.get(url, function(apiResponse) {
			console.log('Response: ', apiResponse)
			if (apiResponse === null || apiResponse == "") {
				window.location = FRONT_URL + "/login.jsp?user-session=expired";
			} else {
				createTable(JSON.parse(apiResponse))
			}
		});
	}

	function createTable(apiResponse) {
		var tbl = '';
		tbl += '<table class="table table-striped table-bordered second text-nowrap" >'
		tbl += '<thead>';
		tbl += '<tr style=" background-color: floralwhite;">';
		tbl += '<th>User Name</th>';
		tbl += '<th>First Name</th>';
		tbl += '<th>Last Name</th>';
		tbl += '<th>Email Address</th>';
		tbl += '<th>Role</th>';
		tbl += '<th>Status</th>';
		tbl += '<th>Edit</th>';
		tbl += '<th>Delete</th>';
		tbl += '</tr>';
		tbl += '</thead>';
		tbl += '<tbody id="isisInstanceTable">';

		$.each(apiResponse, function(index, val) {
			var userId = val.id;
			var roleId = "role" + userId;
			var statusId = "status" + userId;
			tbl += '<tr row_id="' + userId + '">';
			tbl += '<td style="width:10%"><div column_name="userName">' + val.userName + '</div></td>';
			tbl += '<td style="width:10%"><div column_name="firstName">' + val.firstName + '</div></td>';
			tbl += '<td style="width:10%"><div column_name="lastName">' + val.lastName + '</div></td>';
			tbl += '<td style="width:20%"><div class="row_data" column_name="email">' + val.email + '</div></td>';
			tbl += '<td style="width:20%">';
			tbl += '<span><div class="row_data1" > ' + val.role + '</div></span>';
			tbl += '<span class="dropbox"><label for="Role"></label><select name="role1" id="' + roleId + '" style="width: 120px;"><option value="Admin">Admin</option ><option value="User">User</option></select ></span>';
			tbl += '</td>';
			tbl += '<td style="width:20%">';
			tbl += '<span><div class="row_data1"> ' + val.status + '</div></span>';
			tbl += '<span class="dropbox"> <label for="Status"></label><select name="status" id="' + statusId + '" style="width: 80px;"><option value="Active">Active</option ><option value="Inactive">Inactive</option></select ></span>';
			tbl += '</td>';
			tbl += '<td style="width:80%">';
			tbl += '<span class="btn_edit"><i class="far">&#xf044;</i></a></span>';
			tbl += '<span class="btn_save"><i style="font-size:20px" class="far fa-save"></i></a> | </span>';
			tbl += '<span class="btn_cancel"><i style="font-size:20px" class="fas fa-window-close"></i></a></span>';
			tbl += '</td>';
			tbl += '<td style="width:30%">';
			tbl += '<span class="btn_deleteUser" ><i style="font-size:20px" class="fas fa-trash-alt"></i></a></span>';
			tbl += '</td>';
			tbl += '</tr>';
		});

		tbl += '</tbody>';
		tbl += '</table>'

		$(document).find('.tbl_usermanagement_data').html(tbl);
		$(document).find('.btn_save').hide();
		$(document).find('.btn_cancel').hide();
		$(document).find('.dropbox').hide();

		$(document).on('click', '.btn_edit', function(event) {
			event.preventDefault();
			var tbl_row = $(this).closest('tr');
			tbl_row.find('.btn_save').show();
			tbl_row.find('.btn_cancel').show();
			tbl_row.find('.dropbox').show();
			tbl_row.find('.row_data1').hide();
			tbl_row.find('.btn_edit').hide();
			tbl_row.find('.row_data').attr('contenteditable', 'true').addClass('bg-edit')
			tbl_row.find('.row_data').each(function() {
				$(this).attr('original_entry', $(this).html());
			});
			$(document).find('.btn_edit').hide();
			$(document).find('.btn_deleteUser').hide();

		});

		$(document).on('click', '.btn_cancel', function(event) {
			event.preventDefault();
			var tbl_row = $(this).closest('tr');
			tbl_row.find('.btn_save').hide();
			tbl_row.find('.btn_cancel').hide();
			tbl_row.find('.btn_edit').show();
			tbl_row.find('.dropbox').hide();
			tbl_row.find('.row_data1').show();
			tbl_row.find('.row_data').attr('contenteditable', 'false').removeClass('bg-edit')
			$(document).find('.btn_edit').show();
			$(document).find('.btn_deleteUser').show();
			tbl_row.find('.row_data').each(function() {
				$(this).html($(this).attr('original_entry'));
			});
			$(document).find('.btn_edit').show();
			$(document).find('.btn_deleteUser').show();
		});

		$(document).on('click', '.btn_save', function(event) {
			event.preventDefault();
			var tbl_row = $(this).closest('tr');
			var userId = tbl_row.attr('row_id');
			var roleId = "role" + userId;
			var statusId = "status" + userId;
			tbl_row.find('.btn_save').hide();
			tbl_row.find('.btn_cancel').hide();
			tbl_row.find('.btn_edit').show();
			tbl_row.find('.dropbox').hide();
			tbl_row.find('.row_data1').show();
			$(document).find('.btn_edit').show();
			$(document).find('.btn_deleteUser').show();
			tbl_row.find('.row_data').attr('contenteditable', 'false').removeClass('bg-edit')
			var userList = {};
			var selectRole = document.getElementById(roleId);
			var optionRole = selectRole.options[selectRole.selectedIndex];
			var selectStatus = document.getElementById(statusId);
			var optionStatus = selectStatus.options[selectStatus.selectedIndex];
			tbl_row.find('.row_data').each(function() {
				var columnName = $(this).attr('column_name');
				var columnValue = $(this).html();
				userList[columnName] = columnValue;
				if (optionRole.value)
					columnName = "role"
				columnValue = optionRole.value;

				userList[columnName] = columnValue;
				if (optionStatus.value)
					columnName = "status"
				columnValue = optionStatus.value;

				userList[columnName] = columnValue;
			});
			$.extend(userList, { id: userId });
			console.log(userList)
			var updateUserUrl = FRONT_URL + '/settings/user-management'
			console.log(updateUserUrl)
			var xmlHttpRequest = new XMLHttpRequest();
			xmlHttpRequest.open("PUT", updateUserUrl, true);
			xmlHttpRequest.setRequestHeader('Content-Type', 'application/json');
			xmlHttpRequest.send(JSON.stringify(userList));
			fetchData(getUsersUrl);
		});


	}


	$(document).on('click', '.btn_deleteUser', function(event) {
		if (confirm('Please confirm if you want to delete?')) {
			event.preventDefault();
			var tbl_row = $(this).closest('tr');
			var userId = tbl_row.attr('row_id');
			var deleteUserUrl = FRONT_URL + "/settings/user-management?id=" + userId;
			var xhr = new XMLHttpRequest();
			xhr.open("DELETE", deleteUserUrl);
			xhr.send();
			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4 && xhr.status == "200") {
					var msg = xhr.responseText;
					alert(msg);
					fetchData(getUsersUrl);
				}
			};

		}
	});
	$('#create_user').click(function() {
		createNewUserTable()
	});
	function createNewUserTable() {
		var tbl = '';
		tbl += '<table class="table table-striped table-bordered second text-nowrap" >'
		tbl += '<thead>';
		tbl += '<tr style=" background-color: floralwhite;">';
		tbl += '<th>User Name</th>';
		tbl += '<th>User Password</th>';
		tbl += '<th>First Name</th>';
		tbl += '<th>Last Name</th>';
		tbl += '<th>Email Address</th>';
		tbl += '<th>Role</th>';
		tbl += '</tr>';
		tbl += '</thead>';
		tbl += '<tbody id="createIsisInstanceTable">';

		tbl += '<td><input type="text" id="username" required> </td>';
		tbl += '<td><input type="text" id="userPwd" required> </td>';
		tbl += '<td><input type="text" id="firstName" required> </td>';
		tbl += '<td><input type="text" id="lastName" required> </td>';
		tbl += '<td><input type="text" id="email" required> </td>';
		tbl += '<td><label for="role"></label><select name="role" id="role" style="width: 80px;"><option value="Admin">Admin</option ><option value="User">User</option></select > </td > ';
		tbl += '</tbody>';
		tbl += '</table>'

		$(document).find('.tbl_create_user_data').html(tbl);


		$('#user_upload').click(function() {
			var select = document.getElementById('role');
			var option = select.options[select.selectedIndex];
			var userData = {};
			userData['userName'] = document.getElementById("username").value;
			userData['userPwd'] = document.getElementById("userPwd").value;
			userData['firstName'] = document.getElementById("firstName").value;
			userData['lastName'] = document.getElementById("lastName").value;
			userData['email'] = document.getElementById("email").value;
			userData['status'] = "Active";
			userData['role'] = option.value;

			if (userData['userName'] == "" || userData['userPwd'] == "" || userData['firstName'] == "" || userData['userEmail'] == "")
				alert("All Fields are mandatory");

			else {
				console.log(userData)
				var createUserUrl = FRONT_URL + '/settings/user-management'
				console.log(createUserUrl)
				var xmlHttpRequest = new XMLHttpRequest();
				xmlHttpRequest.open("POST", createUserUrl, true);
				xmlHttpRequest.setRequestHeader('Content-Type', 'application/json');
				xmlHttpRequest.send(JSON.stringify(userData));
				xmlHttpRequest.onreadystatechange = function() {
					if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status == "200") {
						var msg = xmlHttpRequest.responseText;
						alert(msg);
						fetchData(getUsersUrl);
					}
				}
			}
		});
	}


});
