$(function() {
	"use strict";
	var client = new HttpClient();
	var currentPageNumber = 0
	var nodeDetailUrl = FRONT_URL + "/upgradation/node-detail?fromLimit=0&toLimit=" + DATA_LIMIT
	var softwareVersions10x
	var softwareVersions6x
	
	$('#tab-node-detail').click(function() {
		getSoftwareVersionsFor10x()
		getSoftwareVersionsFor6x()
		fetchTableData(nodeDetailUrl, currentPageNumber, '#node_detail_previous', '#node_detail_next', '#node_detail_range');
		getSoftwareUpgradationRings()
		getSoftwareUpgradationNodeName()
		document.getElementById("inline_msg_node_detail").innerHTML = "";
		document.getElementById("inline_msg_delete").innerHTML = "";
		
	});


	function getSoftwareVersionsFor10x() {
		var client = new HttpClient();
		client.get(FRONT_URL + '/upgradation/software-version?typeGroup=PN10x', function(response) {
			softwareVersions10x = JSON.parse(response)
			console.log("Software Versions 10x"+response)
		});
	}
	
	function getSoftwareVersionsFor6x() {
		var client = new HttpClient();
		client.get(FRONT_URL + '/upgradation/software-version?typeGroup=PN6x', function(response) {
			softwareVersions6x = JSON.parse(response)
			console.log("Software Versions 6x"+response)
		});
	}

	
	$('#search_node_detail').click(function() {
		autoRefreshNodeDetail()
	});
	

$('#export_node_detail').click(function() {
    var get_node_detail_url;
    var ringId = document.getElementById("node_detail_ring_id").value.trim();
    var nodeName = document.getElementById("node_detail_node_name").value.trim();

    if (nodeName != "" || ringId != "") {
        get_node_detail_url = FRONT_URL + "/upgradation/node-detail?state=node-detail";

        if (nodeName != "") {
            get_node_detail_url += "&nodeName=" + encodeURIComponent(nodeName);
        } else {
            get_node_detail_url += "&ringId=" + encodeURIComponent(ringId);
        }
    } else {
        get_node_detail_url = nodeDetailUrl;
    }

    console.log("get_node_detail_url :" + get_node_detail_url);

    var data = [];
    var nodeDetailHeaderData = [
        "Circle",
        "Ring Id",
        "NeId",
        "Type Group",
        "Loopback Ip",
        "Software Version"
    ];

    data.push(nodeDetailHeaderData);

    client.get(get_node_detail_url, function(response) {
        var output = JSON.parse(response).nodeDetail;

        for (var item of output) {
            console.log(item);

            var csvRow = [
                item.circle,
                item.ringId,
                item.neId,
                item.deviceType,
                item.loopbackIp,
                item.softwareVersion
            ];

            data.push(csvRow);
        }

        download_csv(data, "Node_Detail_Data.csv");
    });

    return false;
});
		

function autoRefreshNodeDetail() {
    var ringId = document.getElementById("node_detail_ring_id").value.trim();
    var nodeName = document.getElementById("node_detail_node_name").value.trim();

    if (nodeName != "" || ringId != "") {
        var url = FRONT_URL + "/upgradation/node-detail?state=node-detail";

        if (nodeName != "") {
            url += "&nodeName=" + encodeURIComponent(nodeName);
        } else {
            url += "&ringId=" + encodeURIComponent(ringId);
        }

        fetchTableData(url,currentPageNumber,'#node_detail_previous','#node_detail_next','#node_detail_range');
    } else {
        fetchTableData(nodeDetailUrl,currentPageNumber,'#node_detail_previous','#node_detail_next','#node_detail_range');
        return false;
    }
}
	

	$('#node_detail_next').click(function() {
		var nextPageNumber = currentPageNumber + 1
		nodeDetailUrl = nodeDetailUrl.replace('=' + currentPageNumber + '&', '=' + nextPageNumber + '&')
		currentPageNumber = nextPageNumber
		fetchTableData(nodeDetailUrl, currentPageNumber, '#node_detail_previous', '#node_detail_next', '#node_detail_range');
		return false;
	});

	$('#node_detail_previous').click(function() {
		var nextPageNumber = currentPageNumber - 1
		nodeDetailUrl = nodeDetailUrl.replace('=' + currentPageNumber + '&', '=' + nextPageNumber + '&')
		currentPageNumber = nextPageNumber
		fetchTableData(nodeDetailUrl, currentPageNumber, '#node_detail_previous', '#node_detail_next', '#node_detail_range');
		return false;
	});




	function fetchTableData(url, pageNumber, previous, next, range) {
		$("#loader").show();
		client.get(url, function(response) {
			response = JSON.parse(response.replace(/\:null/gi, "\:\"\""))
			$("#loader").hide();
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
		tbl += '<th>Circle</th>';
		tbl += '<th>Ring Id</th>';
		tbl += '<th>Node Id</th>';
		tbl += '<th>Type Group</th>';
		tbl += '<th>Loopback IP</th>';
		tbl += '<th>Software Version</th>';
		tbl += '<th>Edit</th>';
		tbl += '</tr>';
		tbl += '</tr>';
		tbl += '</thead>';
		tbl += '<tbody>';

		if (apiResponse.length == 0) {
			tbl += '<tr><td colspan="20"><p style="color:red">No data present.</p></td></tr>';
		} else {
			$.each(apiResponse, function(index, val) {
				var node_detail_id = val.nodeDetailId;
				var softwareId = "software" + node_detail_id;
				tbl += '<tr row_id="' + node_detail_id + '">';
				tbl += '<td><div col_name="">' + '<input type="checkbox" id="check" name="NodeCheck" value="' + node_detail_id + '">' + '</div></td>';
				tbl += '<td><div>' + val.circle + '</div></td>';
				tbl += '<td><div>' + val.ringId + '</div></td>';
				tbl += '<td><div>' + val.neId + '</div></td>';
				tbl += '<td><div>' + val.deviceType + '</div></td>';
				tbl += '<td><div>' + val.loopbackIp + '</div></td>';
				tbl += '<td style="width:20%">';
				tbl += '<span><div class="row_data1" > ' + val.softwareVersion + '</div></span>';
				tbl += '<span class="dropbox"><select name="softwareversion" id="' + softwareId + '" style="width: 120px;">';
				if (((val.deviceType).toLowerCase())=="pn10x")	 {
					for (var i = 0; i < softwareVersions10x.length; i++) {
					    tbl += '<option value="' + softwareVersions10x[i] + '">' + softwareVersions10x[i] + '</option>';
					}}
				else{
					for (var i = 0; i < softwareVersions6x.length; i++) {
					    tbl += '<option value="' + softwareVersions6x[i] + '">' + softwareVersions6x[i] + '</option>';
					}}

				tbl += '</select></span>';
				tbl += '</td>';
				tbl += '</td>';
				tbl += '<td style="width:80%">';
				tbl += '<span class="btn_edit"><i class="far">&#xf044;</i></a></span>';
				tbl += '<span class="btn_save"><i style="font-size:20px" class="far fa-save"></i></a> | </span>';
				tbl += '<span class="btn_cancel"><i style="font-size:20px" class="fas fa-window-close"></i></a></span>';
				tbl += '</td>';
				tbl += '</tr>';
			});
		}
		tbl += '</tbody>';
		tbl += '</table>';

		$(document).find('.node_detial_table').html(tbl);
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
		});

		$(document).on('click', '.btn_save', function(event) {
			event.preventDefault();
			var tbl_row = $(this).closest('tr');
			var nodeDetailId = tbl_row.attr('row_id');
			var softwareId = "software"+nodeDetailId
			tbl_row.find('.btn_save').hide();
			tbl_row.find('.btn_cancel').hide();
			tbl_row.find('.btn_edit').show();
			tbl_row.find('.dropbox').hide();
			tbl_row.find('.row_data1').show();
			$(document).find('.btn_edit').show();
			tbl_row.find('.row_data1').attr('contenteditable', 'false').removeClass('bg-edit')
			var softwareList = {};
			var selectSoftware = document.getElementById(softwareId);
			var optionSoftware = selectSoftware.options[selectSoftware.selectedIndex];
			tbl_row.find('.row_data1').each(function() {
				if (optionSoftware.value)
					var columnName = "softwareVersion"
				var columnValue = optionSoftware.value;
				softwareList[columnName] = columnValue;
			});
			
			$.extend(softwareList, { id: nodeDetailId });
			console.log(softwareList)
			var updateSoftwareUrl = FRONT_URL + '/upgradation/software-version'
			var xmlHttpRequest = new XMLHttpRequest();
			xmlHttpRequest.open("PUT", updateSoftwareUrl, true);
			xmlHttpRequest.setRequestHeader('Content-Type', 'application/json');
			xmlHttpRequest.send(JSON.stringify(softwareList));
			setTimeout(autoRefreshNodeDetail ,500);
		});
	}


	$('#delete_node_detail').click(function() {
		var checked = 0
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
			var deleteNodeDetailUrl = FRONT_URL + "/upgradation/node-detail/delete"
			var payload = { "ids": node_detail_id };

			client.delete(deleteNodeDetailUrl, payload, function(response) {
				autoRefreshNodeDetail()
				document.getElementById("inline_msg_delete").innerHTML = "Records deleted successfully";
				function hide() {
					document.getElementById("inline_msg_delete").innerHTML = "";
				}
				setTimeout(hide, 7000);
			});
		}
		else {
			alert("Please select aleast one checkbox")
		}
		return false;
	});
	


});



