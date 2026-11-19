$(function() {
	"use strict";
	var httpClient = new HttpClient();
	var headerData = ["Property Name", "Property Value"]
	var getPropertiesUrl = FRONT_URL + '/settings/user-properties';

	httpClient.get(getPropertiesUrl, function(apiResponse) {
		console.log('Response: ', apiResponse)
		if (apiResponse === null || apiResponse == "") {
			window.location = FRONT_URL + "/login.jsp?user-session=expired";
		} else {
			createTable(JSON.parse(apiResponse))
		}
	});

	function createTable(apiResponse) {
		var tbl = '';
		tbl += '<table class="table table-striped table-bordered second text-nowrap" >'
		tbl += '<thead>';
		tbl += '<tr style=" background-color: floralwhite;">';
		tbl += '<th>Property Name</th>';
		tbl += '<th>Property Value</th>';
		tbl += '<th>Edit</th>';
		tbl += '</tr>';
		tbl += '</thead>';
		tbl += '<tbody id="propertyTable">';

		$.each(apiResponse, function(index, property) {
			var propertyId = property.id;
			var propertyName = property.propertyName;
			var displayName = property.displayName;
			var propertyValue = property.propertyValue;
			console.log('Property Name: ' + propertyName);

			tbl += '<tr row_id="' + propertyId + '">';
			tbl += '<td style="width:30%"><div column_name="displayName">' + displayName + '</div></td>';
			tbl += '<td style="width:50%">';
			if (displayName.includes("Password")) 
				propertyValue = "********"
			tbl += '<span><div class="row_data" column_name="propertyValue">' + propertyValue + '</div></span>';
			tbl += '<span class="textBox"><input type="text" id="' + propertyId + '" size="70" value="' + propertyValue.trim() + '"></span>';
			tbl += '</td>';
			tbl += '<td style="width:20%">';
			tbl += '<div class="cursor"><span class="btn_edit"><i class="far">&#xf044;</i></span>';
			tbl += '<div class="cursor"><span class="btn_save"><i style="font-size:20px" class="far fa-save"></i> | </span>';
			tbl += '<span class="btn_cancel"><i style="font-size:20px" class="fas fa-window-close"></i></span>';
			tbl += '</td>';
			tbl += '</tr>';
		});

		tbl += '</tbody>';
		tbl += '</table>'

		$(document).find('.tbl_properties_data').html(tbl);
		$(document).find('.btn_save').hide();
		$(document).find('.btn_cancel').hide();
		$(document).find('.textBox').hide();

		$(document).off('click', '.btn_save').on('click', '.btn_edit', function(event) {
			event.preventDefault();
			var tbl_row = $(this).closest('tr');
			tbl_row.find('.btn_save').show();
			tbl_row.find('.btn_cancel').show();
			tbl_row.find('.textBox').show();
			tbl_row.find('.btn_edit').hide();
			tbl_row.find('.row_data').hide();
			//tbl_row.find('.row_data').attr('contenteditable', 'true').addClass('bg-edit')
			tbl_row.find('.row_data').each(function() {
				$(this).attr('original_entry', $(this).html());
			});
		});

		$(document).off('click', '.btn_save').on('click', '.btn_cancel', function(event) {
			event.preventDefault();
			var tbl_row = $(this).closest('tr');
			tbl_row.find('.btn_save').hide();
			tbl_row.find('.btn_cancel').hide();
			tbl_row.find('.textBox').hide();
			tbl_row.find('.btn_edit').show();
			tbl_row.find('.row_data').show();
			//tbl_row.find('.row_data').attr('contenteditable', 'false').removeClass('bg-edit')
			tbl_row.find('.row_data').each(function() {
				$(this).html($(this).attr('original_entry'));
			});
		});

		$(document).on('click', '.btn_save', function(event) {
			event.preventDefault();
			var tbl_row = $(this).closest('tr');
			var propertyId = tbl_row.attr('row_id');
			var propertyValueNew = document.getElementById(propertyId).value
			console.log(propertyValueNew)
			tbl_row.find('.btn_save').hide();
			tbl_row.find('.btn_cancel').hide();
			tbl_row.find('.textBox').hide();
			tbl_row.find('.btn_edit').show();
			tbl_row.find('.row_data').show();
			//tbl_row.find('.row_data').attr('contenteditable', 'false').removeClass('bg-edit')

			var propertyArray = {};
			tbl_row.find('.row_data').each(function() {
				var columnName = $(this).attr('column_name');
				var columnValue = propertyValueNew.trim();
				propertyArray[columnName] = columnValue;
			});

			$.extend(propertyArray, { id: propertyId });
			console.log(propertyArray)

			var updatePropertiesUrl = FRONT_URL + '/settings/user-properties'
			console.log(updatePropertiesUrl)
			var xmlHttpRequest = new XMLHttpRequest();
			xmlHttpRequest.open("PUT", updatePropertiesUrl, true);
			xmlHttpRequest.setRequestHeader('Content-Type', 'application/json');
			xmlHttpRequest.send(JSON.stringify(propertyArray));
			xmlHttpRequest.onload = function() {
				httpClient.get(getPropertiesUrl, function(apiResponse) {
					console.log('Response: ', apiResponse)
					if (apiResponse === null || apiResponse == "") {
						window.location = FRONT_URL + "/login.jsp?user-session=expired";
					} else {
						createTable(JSON.parse(apiResponse))
					}
				});
			};
		});
	}
});