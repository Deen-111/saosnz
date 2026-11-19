$(function() {
	"use strict";
	var client = new HttpClient();
	var currentPageNumber = 0
	var postCheckUrl = FRONT_URL + "/upgradation/node-detail?state=post-check&fromLimit=0&toLimit=" + DATA_LIMIT

	
	$('#tab-post-check').click(function() {
		document.getElementById("inline_msg_post_check").innerHTML = "";
		fetchTableData(postCheckUrl, currentPageNumber, '#post_check_previous', '#post_check_next', '#post_check_range');
	});

	$('#post_check_next').click(function() {
		var nextPageNumber = currentPageNumber + 1
		postCheckUrl = postCheckUrl.replace('=' + currentPageNumber + '&', '=' + nextPageNumber + '&')
		currentPageNumber = nextPageNumber
		fetchTableData(postCheckUrl, currentPageNumber, '#post_check_previous', '#post_check_next', '#post_check_range');
		return false;
	});

	$('#post_check_previous').click(function() {
		var nextPageNumber = currentPageNumber - 1
		postCheckUrl = postCheckUrl.replace('=' + currentPageNumber + '&', '=' + nextPageNumber + '&')
		currentPageNumber = nextPageNumber
		fetchTableData(postCheckUrl, currentPageNumber, '#post_check_previous', '#post_check_next', '#post_check_range');
		return false;
	});

	$('#search_post_check').click(function() {
		autoRefreshPostCheck()
	});


function autoRefreshPostCheck() {
    var ringId = document.getElementById("post_check_ring_id").value.trim();
    var nodeName = document.getElementById("post_check_node_name").value.trim();

    if (nodeName != "" || ringId != "") {
        var url = FRONT_URL + "/upgradation/node-detail?state=post-check";

        if (nodeName != "") {
            url += "&nodeName=" + encodeURIComponent(nodeName);
        } else {
            url += "&ringId=" + encodeURIComponent(ringId);
        }

        fetchTableData(
            url,
            currentPageNumber,
            '#post_check_previous',
            '#post_check_next',
            '#post_check_range'
        );
    } else {
        fetchTableData(
            postCheckUrl,
            currentPageNumber,
            '#post_check_previous',
            '#post_check_next',
            '#post_check_range'
        );
        return false;
    }
}

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
		tbl += '<th><input type="checkbox" onclick="selectAllPostCheck(this)"/></th>';
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
		tbl += '</thead>';
		tbl += '<tbody>';

		if (apiResponse.length == 0) {
			tbl += '<tr><td colspan="20"><p style="color:red">No data present.</p></td></tr>';
		} else {
			$.each(apiResponse, function(index, val) {
				var node_detail_id = val.nodeDetailId;
				tbl += '<tr row_id="' + node_detail_id + '">';
				tbl += '<td><div col_name="">' + '<input type="checkbox" id="check" name="CheckPostCheck" value="' + node_detail_id + '">' + '</div></td>';
				if (val.postCheckStatus == "FAILED") {
					tbl += '<td><div><a id="' + node_detail_id + "," + val.neId + ","+ val.deviceType +'" href="#" onclick="postCheckStatus(this)" data-toggle="modal" data-target = "#postCheckModal" style="color:blue;">' + val.postCheckStatus + '</a></div></td>';
					tbl += '<td><div><a id="' + node_detail_id + "," + val.neId + ","+val.deviceType+'" href="#" onclick="exportPostCheckStatus(this)" style="color:blue;"><img width= 15 heigth = 10 class="bg" src=' + "static/images/download.jpg" + '> </a></div></td>';
				}
				else {
					tbl += createValidationStatusRow(val.postCheckStatus);
					tbl += '<td><div>' + ""+ '</div></td>'
				}
				tbl += '<td><div>' + val.circle + '</div></td>';
				tbl += '<td><div>' + val.ringId + '</div></td>';
				tbl += '<td><div>' + val.neId + '</div></td>';
				tbl += '<td><div>' + val.deviceType + '</div></td>';
				tbl += '<td><div>' + val.loopbackIp + '</div></td>';
				tbl += '<td><div>' + val.softwareVersion + '</div></td>';
				if (val.postCheckOutputFile == null || val.postCheckOutputFile == "") {
					tbl += '<td><div col_name="cmdOutputFile">' + "" + '</div></td>';
				}
				else {
					tbl += '<td><div col_name="cmdOutputFile"><a id="' + node_detail_id + '" href="#" onclick="downloadPostCheckCmdOutputfile(this)" style="color:blue;"><u>Download</u></a></div></td>';
				}
				tbl += '<td><div>' + val.errorCode + '</div></td>';
				tbl += '</tr>';
			});
		}
		tbl += '</tbody>';
		tbl += '</table>';

		$(document).find('.post_check_table').html(tbl);
	}
	$('#refresh_post_check_data').click(function() {
		autoRefreshPostCheck()
	});



	$('#post_check').click(function() {
		var checked = 0
		var Checkboxes = document.getElementsByName('CheckPostCheck');
		for (var i = 0; i < Checkboxes.length; i++) {
			if (Checkboxes[i].checked) {
				checked++;
			}
		}

		if (checked > 0) {
			const post_check_id = [];
			document.getElementById("inline_msg_post_check").innerHTML = "";
			for (var markedcheckbox of Checkboxes) {
				if (markedcheckbox.checked == true)
					post_check_id.push(markedcheckbox.value);
			}
			var postCheckRunUrl = FRONT_URL + '/upgradation/execute?state=post-check';
			var client = new XMLHttpRequest();
			var ItemJSON = JSON.stringify({ "ids": post_check_id });
			client.open("POST", postCheckRunUrl, true);
			client.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			client.send(ItemJSON);
			client.onreadystatechange = function() {
				if (client.readyState === 4 && client.status == "200") {
					autoRefreshPostCheck()
					document.getElementById("inline_msg_post_check").innerHTML = "Post Check has been initiated";
					function hide() {
						document.getElementById("inline_msg_post_check").innerHTML = "";
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


function exportPostCheckStatus(element){
	var data = [];
    var preCheckHeaderData=["Check","Status","Error Message"]
	data.push(preCheckHeaderData)
	var preCheckArray = (element.id).split(',')
	var node_detail_id = preCheckArray[0];
	var node_name = preCheckArray[1];
	var device_type = preCheckArray[2];
	if(device_type.toLowerCase() == "pn10x"){
		var getPostCheckStatusByIdUrl = FRONT_URL + "/upgradation/post-check-validation?id=" + node_detail_id;
	    var client = new XMLHttpRequest();
	    client.open("GET", getPostCheckStatusByIdUrl, true);
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
			var csvRow = ["Logical Ports",checkStatusForExport(apiResponse.logicalPort), apiResponse.logicalPort]
			data.push(csvRow);
			var csvRow = ["Pseudowire",checkStatusForExport(apiResponse.pseudowire), apiResponse.pseudowire]
			data.push(csvRow);
			var csvRow = ["Throughput", checkStatusForExport(apiResponse.ettpThroughput),apiResponse.ettpThroughput]
			data.push(csvRow);
			var csvRow = ["LLDP", checkStatusForExport(apiResponse.lldpNeighbor),apiResponse.lldpNeighbor]
			data.push(csvRow);
			var csvRow = ["VRF Count", checkStatusForExport(apiResponse.vrf),apiResponse.vrf]
			data.push(csvRow);
			var csvRow = ["VRF Status", checkStatusForExport(apiResponse.vrfInterface),apiResponse.vrfInterface]
			data.push(csvRow);
			var csvRow = ["MAC", checkStatusForExport(apiResponse.mac), apiResponse.mac]
			data.push(csvRow);
			var csvRow = ["System Health", checkStatusForExport(apiResponse.systemHealth),apiResponse.systemHealth]
            data.push(csvRow);
			download_csv(data, node_name+"_postchecks.csv");
	}
		}
	}
	else{
		var getPostCheckStatusByIdUrl = FRONT_URL + "/upgradation/post-check-6x-validation?id=" + node_detail_id;
		 var client = new XMLHttpRequest();
		    client.open("GET", getPostCheckStatusByIdUrl, true);
			client.send();
			client.onreadystatechange = function() {
				if (client.readyState === 4 && client.status == "200") {
				var apiResponse= JSON.parse(client.response)
				var csvRow = ["Port", checkStatusForExport(apiResponse.port), apiResponse.port]
				data.push(csvRow);
				var csvRow = ["BFD Session", checkStatusForExport(apiResponse.bfd), apiResponse.bfd]
				data.push(csvRow);
				var csvRow = ["Pseudowire",checkStatusForExport(apiResponse.pseudowire),  apiResponse.pseudowire]
				data.push(csvRow);
				var csvRow = ["Health State", checkStatusForExport(apiResponse.healthState), apiResponse.healthState]
				data.push(csvRow);
				var csvRow = ["Alarm Severity",checkStatusForExport(apiResponse.alarmSeverity),  apiResponse.alarmSeverity]
				data.push(csvRow);
				var csvRow = ["Port Throughput", checkStatusForExport(apiResponse.portThroughput), apiResponse.portThroughput]
				data.push(csvRow);
				var csvRow = ["Interface Ip", checkStatusForExport(apiResponse.interfaceIp), apiResponse.interfaceIp]
				data.push(csvRow);
				var csvRow = ["Virtual Link Loss Induction",checkStatusForExport(apiResponse.vlli),  apiResponse.vlli]
				data.push(csvRow);
				var csvRow = ["Isis Neighbor", checkStatusForExport(apiResponse.isisNeighbor), apiResponse.isisNeighbor]
				data.push(csvRow);
				var csvRow = ["OSPF Neighbor", checkStatusForExport(apiResponse.ospf), apiResponse.ospf]
				data.push(csvRow);
				var csvRow = ["MAC", checkStatusForExport(apiResponse.mac), apiResponse.mac]
				data.push(csvRow);
				download_csv(data, node_name+"_postchecks.csv");
				}}
	}


}

function downloadPostCheckCmdOutputfile(element) {
	var node_detail_id = (element.id);
	window.location.href = FRONT_URL + "/upgradation/download?state=post-check&id=" + node_detail_id
}

function selectAllPostCheck(source) {
	var Checkboxes = document.getElementsByName('CheckPostCheck');
	for (var markedcheckbox of Checkboxes) {
		markedcheckbox.checked = source.checked;
	}
}
var modal_post_check = document.getElementById("postCheckModal");

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
	modal_post_check.style.display = "none";
}

window.onclick = function(event) {
	if (event.target == modal) {
		modal_post_check.style.display = "none";
	}
}

function postCheckStatus(element) {
	var migrationArray = (element.id).split(',')
	var node_detail_id = migrationArray[0];
	var node_name = migrationArray[1];
	var device_type = migrationArray[2];
	document.getElementById('postCheckModalLabel').innerHTML = node_name;
	if(device_type.toLowerCase() == "pn10x"){
	var getPostCheckStatusByIdUrl = FRONT_URL + "/upgradation/post-check-validation?id=" + node_detail_id;
	var client = new XMLHttpRequest();
	client.open("GET", getPostCheckStatusByIdUrl, true);
	client.send();
	client.onreadystatechange = function() {
		if (client.readyState === 4 && client.status == "200") {
			$("#modal_body")
			createPostCheckStatusTable(client.response);
		}
	}
	}
	else{
	var getPostCheckStatusByIdUrl = FRONT_URL + "/upgradation/post-check-6x-validation?id=" + node_detail_id;	
	var client = new XMLHttpRequest();
	client.open("GET", getPostCheckStatusByIdUrl, true);
	client.send();
	client.onreadystatechange = function() {
		if (client.readyState === 4 && client.status == "200") {
			$("#modal_body")
			createPostCheck6xStatusTable(client.response);
		}
}
}
}

function createPostCheckStatusTable(apiResponse) {
	var tbl = '';
	tbl += '<table class="table table-striped table-bordered second text-nowrap" >'
	tbl += '<thead>';
	tbl += '<tr style=" background-color: floralwhite;">';
	tbl += '<th>Validation Check</th>';
	tbl += '<th>Validation Status</th>';
	tbl += '<th>Error Message</th>';
	tbl += '</tr>';
	tbl += '</thead>';
	tbl += '<tbody id="post_check_status_table">';
	apiResponse = JSON.parse(apiResponse.replace(/\:null/gi, "\:\"\""))
	tbl += '<td ><div>' + "ISIS" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.isisNeighbour);
	tbl += createCheckErrorRow(apiResponse.isisNeighbour);
	tbl += '</tr>';
	tbl += '<td ><div>' + "BGP Peers" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.bgpPeer);
	tbl += createCheckErrorRow(apiResponse.bgpPeer);
	tbl += '</tr>';
	tbl += '<td ><div>' + "IP Neighborship" + '</div></td>';
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
	tbl += '<td ><div>' + "Logical Ports" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.logicalPort);
	tbl += createCheckErrorRow(apiResponse.logicalPort);
	tbl += '</tr>';
	tbl += '<td ><div>' + "Pseudowire" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.pseudowire);
	tbl += createCheckErrorRow(apiResponse.pseudowire);
	tbl += '</tr>';
	tbl += '<td ><div>' + "Throughput" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.ettpThroughput);
	tbl += createCheckErrorRow(apiResponse.ettpThroughput);
	tbl += '</tr>';
	tbl += '<td ><div>' + "LLDP" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.lldpNeighbour);
	tbl += createCheckErrorRow(apiResponse.lldpNeighbour);
	tbl += '</tr>';
	tbl += '<td ><div>' + "VRF Count" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.vrf);
	tbl += createCheckErrorRow(apiResponse.vrf);
	tbl += '</tr>';
	tbl += '<td ><div>' + "VRF Status" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.vrfInterface);
	tbl += createCheckErrorRow(apiResponse.vrfInterface);
	tbl += '</tr>';
	tbl += '<td ><div>' + "MAC" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.mac);
	tbl += createCheckErrorRow(apiResponse.mac);
	tbl += '</tr>';
	tbl += '<td ><div>' + "System Health" + '</div></td>';
    tbl += createCheckStatusRow(apiResponse.systemHealth);
    tbl += createCheckErrorRow(apiResponse.systemHealth);
    tbl += '</tr>';
	tbl += '</tbody>';
	tbl += '</table>'
	$(document).find('.post_check_status_table').html(tbl);

}

function createPostCheck6xStatusTable(apiResponse) {
	var tbl = '';
	tbl += '<table class="table table-striped table-bordered second text-nowrap" >'
	tbl += '<thead>';
	tbl += '<tr style=" background-color: floralwhite;">';
	tbl += '<th>Validation Check</th>';
	tbl += '<th>Validation Status</th>';
	tbl += '<th>Error Message</th>';
	tbl += '</tr>';
	tbl += '</thead>';
	tbl += '<tbody id="post_check_status_table">';
	apiResponse = JSON.parse(apiResponse.replace(/\:null/gi, "\:\"\""))
	tbl += '<td ><div>' + "Port" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.port);
	tbl += createCheckErrorRow(apiResponse.port);
	tbl += '</tr>';
	tbl += '<td ><div>' + "BFD Session" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.bfd);
	tbl += createCheckErrorRow(apiResponse.bfd);
	tbl += '</tr>';
	tbl += '<td ><div>' + "Pseudowire" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.pseudowire);
	tbl += createCheckErrorRow(apiResponse.pseudowire);
	tbl += '</tr>';
	tbl += '<td ><div>' + "Health State" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.healthState);
	tbl += createCheckErrorRow(apiResponse.healthState);
	tbl += '</tr>';
	tbl += '<td ><div>' + "Alarm Severity" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.alarmSeverity);
	tbl += createCheckErrorRow(apiResponse.alarmSeverity);
	tbl += '</tr>';
	tbl += '<td ><div>' + "Port Throughput" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.portThroughput);
	tbl += createCheckErrorRow(apiResponse.portThroughput);
	tbl += '</tr>';
	tbl += '<td ><div>' + "Interface Ip" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.interfaceIp);
	tbl += createCheckErrorRow(apiResponse.interfaceIp);
	tbl += '</tr>';
	tbl += '<td ><div>' + "Vlli" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.vlli);
	tbl += createCheckErrorRow(apiResponse.vlli);
	tbl += '</tr>';
	tbl += '<td ><div>' + "ISIS Neighbor" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.isisNeighbor);
	tbl += createCheckErrorRow(apiResponse.isisNeighbor);
	tbl += '</tr>';
	tbl += '<td ><div>' + "OSPF" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.ospf);
	tbl += createCheckErrorRow(apiResponse.ospf);
	tbl += '</tr>';
	tbl += '<td ><div>' + "MAC" + '</div></td>';
	tbl += createCheckStatusRow(apiResponse.mac);
	tbl += createCheckErrorRow(apiResponse.mac);
	tbl += '</tr>';
	tbl += '</tbody>';
	tbl += '</table>'
	$(document).find('.post_check_status_table').html(tbl);

}

