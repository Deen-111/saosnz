$(function() {
	"use strict";
	var client = new HttpClient();
	var currentPageNumber = 0
	var softwareInstallationUrl = FRONT_URL + "/upgradation/node-detail?state=installation&fromLimit=0&toLimit=" + DATA_LIMIT
	
	$('#tab-installation').click(function() {
		document.getElementById("inline_msg_software_installation").innerHTML = "";
		fetchTableData(softwareInstallationUrl, currentPageNumber, '#software_installation_previous', '#software_installation_next', '#software_installation_range');
	});

	$('#software_installation_next').click(function() {
		var nextPageNumber = currentPageNumber + 1
		softwareInstallationUrl = softwareInstallationUrl.replace('=' + currentPageNumber + '&', '=' + nextPageNumber + '&')
		currentPageNumber = nextPageNumber
		fetchTableData(softwareInstallationUrl, currentPageNumber, '#software_installation_previous', '#software_installation_next', '#software_installation_range');
		return false;
	});

	$('#software_installation_previous').click(function() {
		var nextPageNumber = currentPageNumber - 1
		softwareInstallationUrl = softwareInstallationUrl.replace('=' + currentPageNumber + '&', '=' + nextPageNumber + '&')
		currentPageNumber = nextPageNumber
		fetchTableData(softwareInstallationUrl, currentPageNumber, '#software_installation_previous', '#software_installation_next', '#software_installation_range');
		return false;
	});

	$('#search_software_installation').click(function() {
		autoRefreshSoftwareInstallation()
	});


function autoRefreshSoftwareInstallation() {
    var ringId = document.getElementById("software_installation_ring_id").value.trim();
    var nodeName = document.getElementById("software_installation_node_name").value.trim();

    if (nodeName != "" || ringId != "") {
        var url = FRONT_URL + "/upgradation/node-detail?state=installation";

        if (nodeName != "") {
            url += "&nodeName=" + encodeURIComponent(nodeName);
        } else {
            url += "&ringId=" + encodeURIComponent(ringId);
        }

        fetchTableData(url,currentPageNumber,'#software_installation_previous','#software_installation_next','#software_installation_range');
    } else {
        fetchTableData(softwareInstallationUrl,currentPageNumber,'#software_installation_previous','#software_installation_next','#software_installation_range');
        return false;
    }
}

	function fetchTableData(url, pageNumber, previous, next, range) {
		client.get(url, function(response) {
			response =	JSON.parse(response.replace(/\:null/gi, "\:\"\""))
			var nodeDetailData = response.nodeDetail
			pageNumber == 0 ? $(previous).addClass('disabled') : $(previous).removeClass('disabled');
			nodeDetailData.length<DATA_LIMIT ? $(next).addClass('disabled') : $(next).removeClass('disabled');
			if (nodeDetailData.length > 0) {
				var fromData = pageNumber * DATA_LIMIT
				$(range).text((fromData + 1) + "-" + (fromData + nodeDetailData.length))
			}
			else {
				$(range).text("-")
			}

			populateNodeDetailTable(nodeDetailData)
		});
	}

	function populateNodeDetailTable(apiResponse) {
		var tbl = '';
		tbl += '<table class="table table-striped table-bordered second text-nowrap" >'
		tbl += '<thead>';
		tbl += '<tr style=" background-color: floralwhite;">';
		tbl += '<th><input type="checkbox" onclick="selectAllSoftwareInstallation(this)"/></th>';
		tbl += '<th>Status</th>';
		tbl += '<th>Circle</th>';
		tbl += '<th>Ring Id</th>';
		tbl += '<th>Node Id</th>';
		tbl += '<th>Type Group</th>';
		tbl += '<th>Loopback IP</th>';
		tbl += '<th>Software Version</th>';
		tbl += '</tr>';
		tbl += '</thead>';
		tbl += '<tbody>';

		if (apiResponse.length == 0) {
			tbl += '<tr><td colspan="20"><p style="color:red">No data present.</p></td></tr>';
		} else {
			$.each(apiResponse, function(index, val) {
				var node_detail_id = val.nodeDetailId;
				tbl += '<tr row_id="' + node_detail_id + '">';
				tbl += '<td><div col_name="">' + '<input type="checkbox" id="check" name="CheckSoftwareInstallation" value="' + node_detail_id + '">' + '</div></td>';
				tbl += createValidationStatusRow(val.installationStatus);
				tbl += '<td><div>' + val.circle + '</div></td>';
				tbl += '<td><div>' + val.ringId + '</div></td>';
				tbl += '<td><div>' + val.neId + '</div></td>';
				tbl += '<td><div>' + val.deviceType + '</div></td>';
				tbl += '<td><div>' + val.loopbackIp + '</div></td>';
				tbl += '<td><div>' + val.softwareVersion + '</div></td>';
				tbl += '</tr>';
			});
		}
		tbl += '</tbody>';
		tbl += '</table>';

		$(document).find('.software_installation_table').html(tbl);
	}
	$('#refresh_software_installation').click(function() {
		autoRefreshSoftwareInstallation()
	});

	
	$('#software-installation').click(function() {
		var checked = 0
		var Checkboxes = document.getElementsByName('CheckSoftwareInstallation');
		for (var i = 0; i < Checkboxes.length; i++) {
			if (Checkboxes[i].checked) {
				checked++;
			}
		}

		if (checked > 0) {
			const upgradation_id = [];
			document.getElementById("inline_msg_software_installation").innerHTML = "";
			for (var markedcheckbox of Checkboxes) {
				if (markedcheckbox.checked == true)
					upgradation_id.push(markedcheckbox.value);
			}
			var upgradationRunUrl = FRONT_URL + '/upgradation/execute?state=software-installation';
			var client = new XMLHttpRequest();
			var ItemJSON = JSON.stringify({ "ids": upgradation_id });
			client.open("POST", upgradationRunUrl, true);
			client.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			client.send(ItemJSON);
			client.onreadystatechange = function() {
				if (client.readyState === 4 && client.status == "200") {
					autoRefreshSoftwareInstallation()
					document.getElementById("inline_msg_software_installation").innerHTML = "Software Installation has been initiated";
					function hide() {
						document.getElementById("inline_msg_software_installation").innerHTML = "";
					}
					setTimeout(hide, 7000);
				}
			}
			return false;
		}
		else {
			alert("Please select aleast one checkbox")
			return false;
		}
	});
});

function selectAllSoftwareInstallation(source) {
	var Checkboxes = document.getElementsByName('CheckSoftwareInstallation');
	for (var markedcheckbox of Checkboxes) {
		markedcheckbox.checked = source.checked;
	}
}
