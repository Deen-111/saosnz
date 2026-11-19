$(function() {
	"use strict";
	var client = new HttpClient();
	var currentPageNumber = 0
	var preCheckUrl = FRONT_URL + "/upgradation/node-detail?state=pre-check&fromLimit=0&toLimit=" + DATA_LIMIT

	$('#tab-pre-check').click(function() {
		document.getElementById("inline_msg_pre_check").innerHTML = "";
		document.getElementById("inline_msg_delete").innerHTML = "";
		fetchTableData(preCheckUrl, currentPageNumber, '#pre_check_previous', '#pre_check_next', '#pre_check_range');
	});
	
	$('#search_pre_check').click(function() {
		autoRefreshPreCheck()
	});
	

function autoRefreshPreCheck() {
        var ringId = document.getElementById("pre_check_ring_id").value.trim();
        var nodeName = document.getElementById("pre_check_node_name").value.trim();

        if (nodeName != "" || ringId != "") {
            var url = FRONT_URL + "/upgradation/node-detail?state=pre-check";

            if (nodeName != "") {
                url += "&nodeName=" + encodeURIComponent(nodeName);
            } else {
                url += "&ringId=" + encodeURIComponent(ringId);
            }

            fetchTableData(url,currentPageNumber,'#pre_check_previous','#pre_check_next','#pre_check_range');
        } else {
            fetchTableData(preCheckUrl,currentPageNumber,'#pre_check_previous','#pre_check_next','#pre_check_range');
            return false;
        }
    }
	

	$('#pre_check_next').click(function() {
		var nextPageNumber = currentPageNumber + 1
		preCheckUrl = preCheckUrl.replace('=' + currentPageNumber + '&', '=' + nextPageNumber + '&')
		currentPageNumber = nextPageNumber
		fetchTableData(preCheckUrl, currentPageNumber, '#pre_check_previous', '#pre_check_next', '#pre_check_range');
		return false;
	});

	$('#pre_check_previous').click(function() {
		var nextPageNumber = currentPageNumber - 1
		preCheckUrl = preCheckUrl.replace('=' + currentPageNumber + '&', '=' + nextPageNumber + '&')
		currentPageNumber = nextPageNumber
		fetchTableData(preCheckUrl, currentPageNumber, '#pre_check_previous', '#pre_check_next', '#pre_check_range');
		return false;
	});




	function fetchTableData(url, pageNumber, previous, next, range) {
		client.get(url, function(response) {
			response = JSON.parse(response.replace(/\:null/gi, "\:\"\""))
			var nodeDetailData = response.nodeDetail
			pageNumber == 0 ? $(previous).addClass('disabled') : $(previous).removeClass('disabled');
			nodeDetailData.length < DATA_LIMIT ? $(next).addClass('disabled') : $(next).removeClass('disabled');
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
		tbl += '<th><input type="checkbox" onclick="selectAllCheckBox(this)"/></th>';
		tbl += '<th>Status</th>';
		tbl += '<th>Export</th>';
		tbl += '<th>Circle</th>';
		tbl += '<th>Ring Id</th>';
		tbl += '<th>Node Id</th>';
		tbl += '<th>Type Group</th>';
		tbl += '<th>Loopback IP</th>';
		tbl += '<th>Software Version</th>';
		tbl += '<th>Output file</th>';
		tbl += '<th>Comments</th>';
		tbl += '</tr>';
		tbl += '</tr>';
		tbl += '</thead>';
		tbl += '<tbody>';

		if (apiResponse.length == 0) {
			tbl += '<tr><td colspan="20"><p style="color:red">No data present.</p></td></tr>';
		} else {
			$.each(apiResponse, function(index, val) {
				var node_detail_id = val.nodeDetailId;
				tbl += '<tr row_id="' + node_detail_id + '">';
				tbl += '<td><div col_name="">' + '<input type="checkbox" id="check" name="NodeCheck" value="' + node_detail_id + '">' + '</div></td>';
				if (val.preCheckStatus == "FAILED") {
					tbl += '<td><div><a id="' + node_detail_id + "," + val.neId + ","+val.deviceType+'" href="#" onclick="preCheckStatus(this)" data-toggle="modal" data-target = "#preCheckModal" style="color:blue;">' + val.preCheckStatus + '</a></div></td>';
					tbl += '<td><div id="myImg"><a id="' + node_detail_id + "," + val.neId + ","+val.deviceType+'" href="#" onclick="exportPreCheckStatus(this)" style="color:blue;"><img width= 15 heigth = 10 class="bg" src=' + "static/images/download.jpg" + '></a></div></td>';
				}
				else {
					tbl += createValidationStatusRow(val.preCheckStatus);
					tbl += '<td><div>' + "" + '</div></td>';
				}
				tbl += '<td><div>' + val.circle + '</div></td>';
				tbl += '<td><div>' + val.ringId + '</div></td>';
				tbl += '<td><div>' + val.neId + '</div></td>';
				tbl += '<td><div>' + val.deviceType + '</div></td>';
				tbl += '<td><div>' + val.loopbackIp + '</div></td>';
				tbl += '<td><div>' + val.softwareVersion + '</div></td>';
				if (val.preCheckOutputFile == null || val.preCheckOutputFile == "") {
					tbl += '<td><div col_name="cmdOutputFile">' + "" + '</div></td>';
				}
				else {
					tbl += '<td><div col_name="cmdOutputFile"><a id="' + node_detail_id + '" href="#" onclick="downloadPreCheckOutputfile(this)" style="color:blue;"><u>Download</u></a></div></td>';
				}
				if (val.preCheckStatus == "FAILED") {
					tbl += '<td><div>' + val.errorCode + '</div></td>';
				}
				else
					tbl += '<td><div>' + "" + '</div></td>';
				tbl += '</tr>';
			});
		}
		tbl += '</tbody>';
		tbl += '</table>';

		$(document).find('.pre_check_table').html(tbl);
	}
	$('#refresh_pre_check').click(function() {
		autoRefreshPreCheck()
	});


	$('#pre_check').click(function() {
		var checked = 0
		var Checkboxes = document.getElementsByName('NodeCheck');
		for (var i = 0; i < Checkboxes.length; i++) {
			if (Checkboxes[i].checked) {
				checked++;
			}
		}
		if (checked > 0) {
			const pre_check_id = [];
			document.getElementById("inline_msg_pre_check").innerHTML = "";
			for (var markedcheckbox of Checkboxes) {
				if (markedcheckbox.checked == true)
					pre_check_id.push(markedcheckbox.value);
			}
			var preCheckRunUrl = FRONT_URL + '/upgradation/execute?state=pre-check';
			var client = new XMLHttpRequest();
			var ItemJSON = JSON.stringify({ "ids": pre_check_id });
			client.open("POST", preCheckRunUrl, true);
			client.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			client.send(ItemJSON);
			client.onreadystatechange = function() {
				if (client.readyState === 4 && client.status == "200") {
					autoRefreshPreCheck()
					document.getElementById("inline_msg_pre_check").innerHTML = "Pre Check has been initiated";
					function hide() {
						document.getElementById("inline_msg_pre_check").innerHTML = "";
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




function replaceCommasInCsvData(data) {
    return data.map(function(row) {
        return row.map(function(value) {
            return value == null ? "" : String(value).replace(/,/g, ';');
        });
    });
}

function exportPreCheckStatus(element){
	var data = [];
    var preCheckHeaderData=["Check","Status","Error Message"]
	data.push(preCheckHeaderData)
	var preCheckArray = (element.id).split(',')
	var node_detail_id = preCheckArray[0];
	var node_name = preCheckArray[1];
	var device_type = preCheckArray[2];
	document.getElementById('preCheckModalLabel').innerHTML = node_name;
	if(device_type.toLowerCase() == "pn10x"){
	    var getPreCheckStatusByIdUrl = FRONT_URL + "/upgradation/pre-check-validation?id=" + node_detail_id;
	    var client = new XMLHttpRequest();
	    client.open("GET", getPreCheckStatusByIdUrl, true);
		client.send();
		client.onreadystatechange = function() {
			if (client.readyState === 4 && client.status == "200") {
			var apiResponse= JSON.parse(client.response)
			var csvRow = ["ISIS", checkStatusForExport(apiResponse.isisNeighbour), apiResponse.isisNeighbour]
			data.push(csvRow);
			var csvRow = ["BGP Peers",checkStatusForExport(apiResponse.bgpPeer), apiResponse.bgpPeer]
			data.push(csvRow);
			var csvRow = ["IP Neighbourship",checkStatusForExport(apiResponse.ipNeighbour), apiResponse.ipNeighbour]
			data.push(csvRow);
			var csvRow = ["CPU State", checkStatusForExport(apiResponse.cpuState),apiResponse.cpuState]
			data.push(csvRow);
			var csvRow = ["Alarm Severity", checkStatusForExport(apiResponse.alarmSeverity),apiResponse.alarmSeverity]
			data.push(csvRow);
			var csvRow = ["VRF Status", checkStatusForExport(apiResponse.vrfInterface),apiResponse.vrfInterface]
			data.push(csvRow);
			var csvRow = ["SYSTEM Health", checkStatusForExport(apiResponse.systemHealth),apiResponse.systemHealth]
            data.push(csvRow);
            data = replaceCommasInCsvData(data);
			download_csv(data, node_name+"_prechecks.csv");
	}
		}
	}
	else{
		var getPreCheckStatusByIdUrl = FRONT_URL + "/upgradation/pre-check-6x-validation?id=" + node_detail_id;	
		 var client = new XMLHttpRequest();
		    client.open("GET", getPreCheckStatusByIdUrl, true);
			client.send();
			client.onreadystatechange = function() {
				if (client.readyState === 4 && client.status == "200") {
				var apiResponse= JSON.parse(client.response)
				var csvRow = ["LLDP", checkStatusForExport(apiResponse.lldp), apiResponse.lldp]
				data.push(csvRow);
				var csvRow = ["Ring Status", checkStatusForExport(apiResponse.ringStatus), apiResponse.ringStatus]
				data.push(csvRow);
				var csvRow = ["Bfd Session",checkStatusForExport(apiResponse.bfd),  apiResponse.bfd]
				data.push(csvRow);
				var csvRow = ["Health State", checkStatusForExport(apiResponse.healthState), apiResponse.healthState]
				data.push(csvRow);
				var csvRow = ["HOP Ip's DMAC",checkStatusForExport(apiResponse.dmac),  apiResponse.dmac]
				data.push(csvRow);
				var csvRow = ["Licence Key", checkStatusForExport(apiResponse.licenceKey), apiResponse.licenceKey]
				data.push(csvRow);
				var csvRow = ["Alarm Severity", checkStatusForExport(apiResponse.alarmSeverity), apiResponse.alarmSeverity]
				data.push(csvRow);
				var csvRow = ["Virtual Link Loss Induction",checkStatusForExport(apiResponse.vlli),  apiResponse.vlli]
				data.push(csvRow);
				var csvRow = ["Isis Neighbor", checkStatusForExport(apiResponse.isisNeighbor), apiResponse.isisNeighbor]
				data.push(csvRow);
				var csvRow = ["OSPF Neighbor", checkStatusForExport(apiResponse.ospf), apiResponse.ospf]
				data.push(csvRow);
				var csvRow = ["Lag Port", checkStatusForExport(apiResponse.lagPort), apiResponse.lagPort]
				data.push(csvRow);
				data = replaceCommasInCsvData(data);
				download_csv(data, node_name+"_prechecks.csv");
				}}
	}
    

}

function downloadPreCheckOutputfile(element) {
	var node_detail_id = (element.id);
	window.location.href = FRONT_URL + "/upgradation/download?state=pre-check&id=" + node_detail_id
}

function selectAllCheckBox(source) {
	var Checkboxes = document.getElementsByName('NodeCheck');
	for (var markedcheckbox of Checkboxes) {
		markedcheckbox.checked = source.checked;
	}
}
var modal_pre_check = document.getElementById("preCheckModal");

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
	modal_pre_check.style.display = "none";
}

window.onclick = function(event) {
	if (event.target == modal) {
		modal_pre_check.style.display = "none";
	}
}

function preCheckStatus(element) {
	var preCheckArray = (element.id).split(',')
	var node_detail_id = preCheckArray[0];
	var node_name = preCheckArray[1];
	var device_type = preCheckArray[2];
	document.getElementById('preCheckModalLabel').innerHTML = node_name;
	if(device_type.toLowerCase() == "pn10x"){
	    var getPreCheckStatusByIdUrl = FRONT_URL + "/upgradation/pre-check-validation?id=" + node_detail_id;
	    var client = new XMLHttpRequest();
		client.open("GET", getPreCheckStatusByIdUrl, true);
		client.send();
		client.onreadystatechange = function() {
			if (client.readyState === 4 && client.status == "200") {
				$("#modal_body")
				createPreCheckStatusTable(client.response);
			}
	}
	}
	else{
		var getPreCheckStatusByIdUrl = FRONT_URL + "/upgradation/pre-check-6x-validation?id=" + node_detail_id;	
		var client = new XMLHttpRequest();
		client.open("GET", getPreCheckStatusByIdUrl, true);
		client.send();
		client.onreadystatechange = function() {
			if (client.readyState === 4 && client.status == "200") {
				$("#modal_body")
				createPreCheck6xStatusTable(client.response);
			}
	}
	}
}

function createPreCheckStatusTable(apiResponse) {
	var tbl = '';
	tbl += '<table class="table table-striped table-bordered second text-nowrap" >'
	tbl += '<thead>';
	tbl += '<tr style=" background-color: floralwhite;">';
	tbl += '<th>Validation Check</th>';
	tbl += '<th>Validation Status</th>';
	tbl += '<th>Error Message</th>';
	tbl += '</tr>';
	tbl += '</thead>';
	tbl += '<tbody id="pre_check_status_table">';
	apiResponse = JSON.parse(apiResponse.replace(/\:null/gi, "\:\"\""))
	tbl += '<td ><div>' + "ISIS" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.isisNeighbour);
	tbl += createCheckErrorRow(apiResponse.isisNeighbour);
	tbl += '</tr>';
	tbl += '<td ><div>' + "BGP Peers" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.bgpPeer);
	tbl += createCheckErrorRow(apiResponse.bgpPeer);
	tbl += '</tr>';
	tbl += '<td ><div>' + "IP Neighbourship" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.ipNeighbour);
	tbl += createCheckErrorRow(apiResponse.ipNeighbour);
	tbl += '</tr>';
	tbl += '<td ><div>' + "CPU State" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.cpuState);
	tbl += createCheckErrorRow(apiResponse.cpuState);
	tbl += '</tr>';
	tbl += '<td ><div>' + "Alarm Severity" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.alarmSeverity);
	tbl += createCheckErrorRow(apiResponse.alarmSeverity);
	tbl += '</tr>';
	tbl += '<td ><div>' + "VRF Status" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.vrfInterface);
	tbl += createCheckErrorRow(apiResponse.vrfInterface);
	tbl += '</tr>';
	tbl += '<td ><div>' + "SYSTEM Health" + '</div></td>';
    tbl += createCheckStatusRow(apiResponse.systemHealth);
    tbl += createCheckErrorRow(apiResponse.systemHealth);
    tbl += '</tr>';
	tbl += '</tbody>';
	tbl += '</table>'
	$(document).find('.pre_check_status_table').html(tbl);

}
//function createPreCheckStatusTable(apiResponse) {
//    var tbl = '';
//
//    apiResponse = JSON.parse(
//        apiResponse.replace(/\:null/gi, "\:\"\"")
//    );
//
//    tbl += '<table class="table table-striped table-bordered second text-nowrap">';
//    tbl += '<thead>';
//    tbl += '<tr style="background-color: floralwhite;">';
//    tbl += '<th>Validation Check</th>';
//    tbl += '<th>Validation Status</th>';
//    tbl += '<th>Error Message</th>';
//    tbl += '</tr>';
//    tbl += '</thead>';
//    tbl += '<tbody id="pre_check_status_table">';
//
//    $.each(apiResponse, function(key, value) {
//        tbl += '<tr>';
//        tbl += '<td><div>' + key + '</div></td>';
//        tbl += createCheckStatusRow(value);
//        tbl += createCheckErrorRow(value);
//        tbl += '</tr>';
//    });
//
//    tbl += '</tbody>';
//    tbl += '</table>';
//
//    $(document).find('.pre_check_status_table').html(tbl);
//}

function createPreCheck6xStatusTable(apiResponse) {
	var tbl = '';
	tbl += '<table class="table table-striped table-bordered second text-nowrap" >'
	tbl += '<thead>';
	tbl += '<tr style=" background-color: floralwhite;">';
	tbl += '<th>Validation Check</th>';
	tbl += '<th>Validation Status</th>';
	tbl += '<th>Error Message</th>';
	tbl += '</tr>';
	tbl += '</thead>';
	tbl += '<tbody id="pre_check_status_table">';
	apiResponse = JSON.parse(apiResponse.replace(/\:null/gi, "\:\"\""))
	tbl += '<td ><div>' + "LLDP" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.lldp);
	tbl += createCheckErrorRow(apiResponse.lldp);
	tbl += '</tr>';
	tbl += '<td ><div>' + "Ring Status" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.ringStatus);
	tbl += createCheckErrorRow(apiResponse.ringStatus);
	tbl += '</tr>';
	tbl += '<td ><div>' + "Bfd Session" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.bfd);
	tbl += createCheckErrorRow(apiResponse.bfd);
	tbl += '</tr>';
	tbl += '<td ><div>' + "Health State" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.healthState);
	tbl += createCheckErrorRow(apiResponse.healthState);
	tbl += '</tr>';
	tbl += '<td ><div>' + "HOP Ip's DMAC" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.dmac);
	tbl += createCheckErrorRow(apiResponse.dmac);
	tbl += '</tr>';
	tbl += '<td ><div>' + "Licence Key" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.licenceKey);
	tbl += createCheckErrorRow(apiResponse.licenceKey);
	tbl += '</tr>';
	tbl += '<td ><div>' + "Alarm Severity" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.alarmSeverity);
	tbl += createCheckErrorRow(apiResponse.alarmSeverity);
	tbl += '</tr>';
	tbl += '<td ><div>' + "Virtual Link Loss Induction" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.vlli);
	tbl += createCheckErrorRow(apiResponse.vlli);
	tbl += '</tr>';
	tbl += '<td ><div>' + "Isis Neighbor" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.isisNeighbor);
	tbl += createCheckErrorRow(apiResponse.isisNeighbor);
	tbl += '</tr>';
	tbl += '<td ><div>' + "OSPF Neighbor" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.ospf);
	tbl += createCheckErrorRow(apiResponse.ospf);
	tbl += '</tr>';
	tbl += '<td ><div>' + "Lag Port" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.lagPort);
	tbl += createCheckErrorRow(apiResponse.lagPort);
	tbl += '</tr>';
	tbl += '</tbody>';
	tbl += '</table>'
	$(document).find('.pre_check_status_table').html(tbl);

}
//function createPreCheck6xStatusTable(apiResponse) {
//    var tbl = '';
//
//    apiResponse = JSON.parse(
//        apiResponse.replace(/\:null/gi, "\:\"\"")
//    );
//
//    tbl += '<table class="table table-striped table-bordered second text-nowrap">';
//    tbl += '<thead>';
//    tbl += '<tr style="background-color: floralwhite;">';
//    tbl += '<th>Validation Check</th>';
//    tbl += '<th>Validation Status</th>';
//    tbl += '<th>Error Message</th>';
//    tbl += '</tr>';
//    tbl += '</thead>';
//    tbl += '<tbody id="pre_check_status_table">';
//
//    $.each(apiResponse, function(key, value) {
//        tbl += '<tr>';
//        tbl += '<td><div>' + key + '</div></td>';
//        tbl += createCheckStatusRow(value);
//        tbl += createCheckErrorRow(value);
//        tbl += '</tr>';
//    });
//
//    tbl += '</tbody>';
//    tbl += '</table>';
//
//    $(document).find('.pre_check_status_table').html(tbl);
//}
