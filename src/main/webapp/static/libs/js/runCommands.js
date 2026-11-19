$(function() {
	"use strict";
	var client = new HttpClient();
	var currentPageNumber = 0
	var runCommandsUrl = FRONT_URL + "/cli-cut-through/node-detail?fromLimit=0&toLimit=" + DATA_LIMIT
    fetchTableData(runCommandsUrl, currentPageNumber, '#run_commands_previous', '#run_commands_next', '#run_commands_range')

	$('#tab-run-commands').click(function() {
		getCliCutThroughRings()
		getCliCutThrooughNodeName()
		document.getElementById("inline_msg_run_commands").innerHTML = "";
		document.getElementById("inline_msg_delete").innerHTML = "";
		fetchTableData(runCommandsUrl, currentPageNumber, '#run_commands_previous', '#run_commands_next', '#run_commands_range');
	});


	function getCliCutThroughRings() {
		var client = new HttpClient();
		client.get(FRONT_URL + '/cli-cut-through/rings', function(response) {
			response = JSON.parse(response)
			$('#ring_list').html('');
			for (var i = 0; i < response.length; i++)
				$('#ring_list').append($('<option>' + response[i] + '</option>'));
		});
	}

	function getCliCutThrooughNodeName() {
		var client = new HttpClient();
		client.get(FRONT_URL + '/cli-cut-through/node-names', function(response) {
			response = JSON.parse(response)
			$('#node_name_list').html('');
			for (var i = 0; i < response.length; i++)
				$('#node_name_list').append($('<option>' + response[i] + '</option>'));
		});
	}
	
	
	$('#search_run_commands').click(function() {
		autoRefreshRunCommands()
	});

	function autoRefreshRunCommands() {
		var ringId = document.getElementById("run_commands_ring_id").value;
		var nodeName = document.getElementById("run_commands_node_name").value;
		if (ringId != "" && nodeName != "") {
			var getNodeLoginDetailByNodeNameUrl = FRONT_URL + "/cli-cut-through/nodename=" + encodeURIComponent(nodeName.trim())
			fetchTableData(getNodeLoginDetailByNodeNameUrl, currentPageNumber, '#run_commands_previous', '#run_commands_next', '#run_commands_range');
		} else if (ringId != "" && nodeName == "") {
			var getNodeLoginDetailByRingIdUrl = FRONT_URL + "/cli-cut-through/ring=" + encodeURIComponent(ringId.trim())
			fetchTableData(getNodeLoginDetailByRingIdUrl, currentPageNumber, '#run_commands_previous', '#run_commands_next', '#run_commands_range');
		}
		else if (ringId == "" && nodeName != "") {
			var getNodeLoginDetailByNodeNameUrl = FRONT_URL + "/cli-cut-through/nodename=" + encodeURIComponent(nodeName.trim())
			fetchTableData(getNodeLoginDetailByNodeNameUrl, currentPageNumber, '#run_commands_previous', '#run_commands_next', '#run_commands_range');
		}
		else {
			fetchTableData(runCommandsUrl, currentPageNumber, '#run_commands_previous', '#run_commands_next', '#run_commands_range')
			return false;
		}

	}
	

	$('#run_commands_next').click(function() {
		var nextPageNumber = currentPageNumber + 1
		runCommandsUrl = runCommandsUrl.replace('=' + currentPageNumber + '&', '=' + nextPageNumber + '&')
		currentPageNumber = nextPageNumber
		fetchTableData(runCommandsUrl, currentPageNumber, '#run_commands_previous', '#run_commands_next', '#run_commands_range');
		return false;
	});

	$('#run_commands_previous').click(function() {
		var nextPageNumber = currentPageNumber - 1
		runCommandsUrl = runCommandsUrl.replace('=' + currentPageNumber + '&', '=' + nextPageNumber + '&')
		currentPageNumber = nextPageNumber
		fetchTableData(runCommandsUrl, currentPageNumber, '#run_commands_previous', '#run_commands_next', '#run_commands_range');
		return false;
	});




	function fetchTableData(url, pageNumber, previous, next, range) {
		client.get(url, function(response) {
			response = JSON.parse(response.replace(/\:null/gi, "\:\"\""))
			var nodeLoginDetailData = response.nodeLoginDetails
			console.log
			pageNumber == 0 ? $(previous).addClass('disabled') : $(previous).removeClass('disabled');
			nodeLoginDetailData.length < DATA_LIMIT ? $(next).addClass('disabled') : $(next).removeClass('disabled');
			if (nodeLoginDetailData.length > 0) {
				var fromData = pageNumber * DATA_LIMIT
				$(range).text((fromData + 1) + "-" + (fromData + nodeLoginDetailData.length))
			}
			else {
				$(range).text("-")
			}

			populateNodeLoginDetailTable(nodeLoginDetailData)
		});


	}

	function populateNodeLoginDetailTable(apiResponse) {
		var tbl = '';
		tbl += '<table class="table table-striped table-bordered second text-nowrap" >'
		tbl += '<thead>';
		tbl += '<tr style=" background-color: floralwhite;">';
		tbl += '<th><input type="checkbox" onclick="selectAllCheckBox(this)"/></th>';
		tbl += '<th>Status</th>';
	    tbl += '<th>Node Name</th>';
		tbl += '<th>Ring Id</th>';
        tbl += '<th>Loopback IP</th>';
        tbl += '<th>Output file</th>';
		tbl += '</tr>';
		tbl += '</tr>';
		tbl += '</thead>';
		tbl += '<tbody>';

		if (apiResponse.length == 0) {
			tbl += '<tr><td colspan="20"><p style="color:red">No data present.</p></td></tr>';
		} else {
			$.each(apiResponse, function(index, val) {
				var node_login_detail_id = val.nodeLoginDetailId;
				tbl += '<tr row_id="' + node_login_detail_id + '">';
				tbl += '<td><div col_name="">' + '<input type="checkbox" id="check" name="NodeCheck" value="' + node_login_detail_id + '">' + '</div></td>';
			    tbl += createValidationStatusRow(val.status);
                tbl += '<td><div>' + val.nodeName+ '</div></td>';
				tbl += '<td><div>' + val.ringId + '</div></td>';
				tbl += '<td><div>' + val.loopbackIp + '</div></td>';
				if (val.cmdOutputFile == null || val.cmdOutputFile == "") {
					tbl += '<td><div col_name="cmdOutputFile">' + "" + '</div></td>';
				}
				else {
					tbl += '<td><div col_name="cmdOutputFile"><a id="' + node_login_detail_id + '" href="#" onclick="downloadRunCommandsOutputfile(this)" style="color:blue;"><u>Download</u></a></div></td>';
				}
                tbl += '</tr>';
			});
		}
		tbl += '</tbody>';
		tbl += '</table>';

		$(document).find('.run_commands_table').html(tbl);
	}
	$('#refresh_run_commands').click(function() {
		autoRefreshRunCommands()
	});




	$('#run_commands').click(function() {
		var checked = 0
		var Checkboxes = document.getElementsByName('NodeCheck');
		for (var i = 0; i < Checkboxes.length; i++) {
			if (Checkboxes[i].checked) {
				checked++;
			}
		}
		if (checked > 0) {
			const pre_check_id = [];
			document.getElementById("inline_msg_run_commands").innerHTML = "";
			for (var markedcheckbox of Checkboxes) {
				if (markedcheckbox.checked == true)
					pre_check_id.push(markedcheckbox.value);
			}
		    var runCommandsRunUrl = FRONT_URL + '/cli-cut-through/execute-commands';
            var client = new XMLHttpRequest();
			var ItemJSON = JSON.stringify({ "ids": pre_check_id });
			client.open("POST", runCommandsRunUrl, true);
			client.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			client.send(ItemJSON);
			client.onreadystatechange = function() {
				if (client.readyState === 4 && client.status == "200") {
					autoRefreshRunCommands()
					document.getElementById("inline_msg_run_commands").innerHTML = "Execute Commands has been initiated";
					function hide() {
						document.getElementById("inline_msg_run_commands").innerHTML = "";
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


$('#delete_execute_commands').click(function() {
		var checked = 0;
		var Checkboxes = document.getElementsByName('NodeCheck');
		for (var i = 0; i < Checkboxes.length; i++) {
			if (Checkboxes[i].checked) {
				checked++;
			}
		}
		if (checked > 0) {
			document.getElementById("inline_msg_delete").innerHTML = "";
			const node_detail_id = [];
			for (var markedcheckbox of Checkboxes) {
				if (markedcheckbox.checked == true)
					node_detail_id.push(markedcheckbox.value);
			}
			var deleteRunCommandsUrl = FRONT_URL + "/cli-cut-through/node-detail";
			var payload = { "ids": node_detail_id };

			client.delete(deleteRunCommandsUrl, payload, function(response) {
				autoRefreshRunCommands()
				document.getElementById("inline_msg_delete").innerHTML = "Records deleted successfully";
				function hide() {
					document.getElementById("inline_msg_delete").innerHTML = "";
				}
				setTimeout(hide, 7000);
			});
		}
		else {
			alert("Please select aleast one checkbox");
		}
		return false;
	});

});

function downloadRunCommandsOutputfile(element) {
	var node_Login_detail_id = (element.id);
	window.location.href = FRONT_URL + "/cli-cut-through/output/download?id=" + node_Login_detail_id
}

function selectAllCheckBox(source) {
	var Checkboxes = document.getElementsByName('NodeCheck');
	for (var markedcheckbox of Checkboxes) {
		markedcheckbox.checked = source.checked;
	}
}

