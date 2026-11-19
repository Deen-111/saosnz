$(function() {
	"use strict";
	var client = new HttpClient();
	var currentPageNumber = 0
	var softwareDownlaodUrl = FRONT_URL + "/upgradation/node-detail?state=download&fromLimit=0&toLimit=" + DATA_LIMIT

	fetchTableData(softwareDownlaodUrl, currentPageNumber, '#software_download_previous', '#software_download_next', '#software_download_range');
	
	$('#search_software_download').click(function() {
		autoRefreshSoftwareDownload()
	});

//	function autoRefreshSoftwareDownload() {
//		var ringId = document.getElementById("software_download_ring_id").value;
//		var nodeName = document.getElementById("software_download_node_name").value;
//		if (ringId != "" && nodeName != "") {
//			var getNodeNameDetailUrl = FRONT_URL + "/upgradation/node-detail/node-name=" + encodeURIComponent(nodeName.trim())+"?state=download"
//			fetchTableData(getNodeNameDetailUrl, currentPageNumber, '#software_download_previous', '#software_download_next', '#software_download_range');
//		} else if (ringId != "" && nodeName == "") {
//			var getRingIdDetailUrl = FRONT_URL + "/upgradation/node-detail/ring=" + encodeURIComponent(ringId.trim())+"?state=download"
//			fetchTableData(getRingIdDetailUrl, currentPageNumber, '#software_download_previous', '#software_download_next', '#software_download_range');
//		}
//		else if (ringId == "" && nodeName != "") {
//			var getNodeNameDetailUrl = FRONT_URL + "/upgradation/node-detail/node-name=" + encodeURIComponent(nodeName.trim())+"?state=download"
//			fetchTableData(getNodeNameDetailUrl, currentPageNumber, '#software_download_previous', '#software_download_next', '#software_download_range');
//		}
//		else {
//			fetchTableData(softwareDownlaodUrl, currentPageNumber, '#software_download_previous', '#software_download_next', '#software_download_range')
//			return false;
//		}
//
//	}
function autoRefreshSoftwareDownload() {
    var ringId = document.getElementById("software_download_ring_id").value.trim();
    var nodeName = document.getElementById("software_download_node_name").value.trim();

    if (nodeName != "" || ringId != "") {
        var url = FRONT_URL + "/upgradation/node-detail?state=download";

        if (nodeName != "") {
            url += "&nodeName=" + encodeURIComponent(nodeName);
        } else {
            url += "&ringId=" + encodeURIComponent(ringId);
        }

        fetchTableData(url,currentPageNumber,'#software_download_previous','#software_download_next','#software_download_range');
    } else {
        fetchTableData(softwareDownlaodUrl,currentPageNumber,'#software_download_previous','#software_download_next','#software_download_range');
        return false;
    }
}

	$('#tab-software-download').click(function() {
		document.getElementById("inline_msg_software_download").innerHTML = "";
		fetchTableData(softwareDownlaodUrl, currentPageNumber, '#software_download_previous', '#software_download_next', '#software_download_range');
	});

	$('#software_download_next').click(function() {
		var nextPageNumber = currentPageNumber + 1
		softwareDownlaodUrl = softwareDownlaodUrl.replace('=' + currentPageNumber + '&', '=' + nextPageNumber + '&')
		currentPageNumber = nextPageNumber
		fetchTableData(softwareDownlaodUrl, currentPageNumber, '#software_download_previous', '#software_download_next', '#software_download_range');
		return false;
	});

	$('#software_download_previous').click(function() {
		var nextPageNumber = currentPageNumber - 1
		softwareDownlaodUrl = softwareDownlaodUrl.replace('=' + currentPageNumber + '&', '=' + nextPageNumber + '&')
		currentPageNumber = nextPageNumber
		fetchTableData(softwareDownlaodUrl, currentPageNumber, '#software_download_previous', '#software_download_next', '#software_download_range');
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
		tbl += '<th><input type="checkbox" onclick="selectAllSoftwareDownload(this)"/></th>';
		tbl += '<th>Status</th>';
		tbl += '<th>Circle</th>';
		tbl += '<th>Ring Id</th>';
		tbl += '<th>Node Id</th>';
		tbl += '<th>Type Group</th>';
		tbl += '<th>Loopback IP</th>';
		tbl += '<th>Software Version</th>';
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
				tbl += '<td><div col_name="">' + '<input type="checkbox" id="check" name="CheckSoftwareDownload" value="' + node_detail_id + '">' + '</div></td>';
				tbl += createValidationStatusRow(val.downloadStatus);
				tbl += '<td><div>' + val.circle + '</div></td>';
				tbl += '<td><div>' + val.ringId + '</div></td>';
				tbl += '<td><div>' + val.neId + '</div></td>';
				tbl += '<td><div>' + val.deviceType + '</div></td>';
				tbl += '<td><div>' + val.loopbackIp + '</div></td>';
				tbl += '<td><div>' + val.softwareVersion + '</div></td>';
				tbl += '<td><div>' + val.downloadComment + '</div></td>';
				tbl += '</tr>';
			});
		}
		tbl += '</tbody>';
		tbl += '</table>';

		$(document).find('.software_download_table').html(tbl);
	}
	$('#refresh_software_download').click(function() {
		autoRefreshSoftwareDownload()
	});




	$('#download').click(function() {
		var checked = 0
		var Checkboxes = document.getElementsByName('CheckSoftwareDownload');
		for (var i = 0; i < Checkboxes.length; i++) {
			if (Checkboxes[i].checked) {
				checked++;
			}
		}

		if (checked > 0) {
			const upgradation_id = [];
			document.getElementById("inline_msg_software_download").innerHTML = "";
			for (var markedcheckbox of Checkboxes) {
				if (markedcheckbox.checked == true)
					upgradation_id.push(markedcheckbox.value);
			}
			var upgradationRunUrl = FRONT_URL + '/upgradation/execute?state=software-download';
			var client = new XMLHttpRequest();
			var ItemJSON = JSON.stringify({ "ids": upgradation_id });
			client.open("POST", upgradationRunUrl, true);
			client.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			client.send(ItemJSON);
			client.onreadystatechange = function() {
				if (client.readyState === 4 && client.status == "200") {
					autoRefreshSoftwareDownload()
					document.getElementById("inline_msg_software_download").innerHTML = "Software Download has been initiated";
					function hide() {
						document.getElementById("inline_msg_software_download").innerHTML = "";
					}
					setTimeout(hide, 7000);
					let intervalId = setInterval(autoRefreshSoftwareDownload, 300000)
					function clearAutoRefresh() {
						clearInterval(intervalId)
					}
					setTimeout(clearAutoRefresh, 2100000)
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

function selectAllSoftwareDownload(source) {
	var Checkboxes = document.getElementsByName('CheckSoftwareDownload');
	for (var markedcheckbox of Checkboxes) {
		markedcheckbox.checked = source.checked;
	}
}
