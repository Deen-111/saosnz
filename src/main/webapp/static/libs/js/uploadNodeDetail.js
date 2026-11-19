$(function() {
	var nodeDetailCsv
	var client = new HttpClient();
	var currentPageNumber = 0
	var saveNodeDetailUrl = FRONT_URL + "/upgradation/node-detail"
	var getNodeDetailUrl = FRONT_URL + "/upgradation/node-detail?fromLimit=0&toLimit=" + DATA_LIMIT


	function fetchNodeDetailDataFromCSV(csvData) {
		var lines = csvData.split('\n');
		var csvDataArray = []
		for (var line of lines.slice(1)) {
			var nodeDetailData = {}
			if (line.length > 0) {
				var lineItems = line.split(',').map(s => s.trim());
				nodeDetailData['circle'] = lineItems[0]
				nodeDetailData['ringId'] = lineItems[1]
				nodeDetailData['neId'] = lineItems[2]
				nodeDetailData['deviceType'] = lineItems[3]
				nodeDetailData['loopbackIp'] = lineItems[4]
				nodeDetailData['uploadStatus'] = 'Ready'
				csvDataArray.push(nodeDetailData)
			}
		}
		return csvDataArray
	}

	$(function() {
		var fileInput = document.getElementById("node_detail_file")
		var readFile = function() {
			var reader = new FileReader();
			reader.onload = function() {
				var fileData = reader.result
				nodeDetailCsv = fetchNodeDetailDataFromCSV(fileData)
				populateNodeDetailAddDataTable(nodeDetailCsv)
			};
			reader.readAsBinaryString(fileInput.files[0]);
		};
		fileInput.addEventListener('change', readFile);
	});

	$('#node_detail_upload').click(function() {
		if (nodeDetailCsv == null) {
			alert("No data to upload")
		}
		else {
			var xhr = new XMLHttpRequest();

			xhr.open("POST", saveNodeDetailUrl, true);
			$("#loader").show();
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.send(JSON.stringify(nodeDetailCsv));
			xhr.onreadystatechange = function() {
				if (this.status == 200) {
					var apiResponse = JSON.parse(this.responseText)
					populateNodeDetailAddDataTable(apiResponse.nodeDetail)
					nodeDetailCsv = null;
				}
			}
		}
	});

	function populateNodeDetailAddDataTable(apiResponse) {
		var tbl = '';
		tbl += '<table class="table table-striped table-bordered second text-nowrap" >'
		tbl += '<thead>';
		tbl += '<tr style=" background-color: floralwhite;">';
		tbl += '<th>Status</th>';
		tbl += '<th>Circle</th>';
		tbl += '<th>Ring Id</th>';
		tbl += '<th>Node Id</th>';
		tbl += '<th>Type Group</th>';
		tbl += '<th>Loopback IP</th>';
		tbl += '</tr>';
		tbl += '</thead>';
		tbl += '<tbody>';

		if (apiResponse.length == 0) {
			tbl += '<tr><td colspan="20"><p style="color:red">No data present.</p></td></tr>';
		} else {
			$.each(apiResponse, function(key, val) {
				var node_detail_id = val.nodeDetailId;
				tbl += '<tr row_id="' + node_detail_id + '">';
				if (val.uploadStatus.includes("success"))
				tbl += '<td><div style="color:#229954">' + val.uploadStatus + '</div></td>';
				else if (val.uploadStatus.includes("Ready"))
				tbl += '<td><div style="color:#5DADE2">' + val.uploadStatus + '</div></td>';
				else
			    tbl += '<td><div style="color:#EC7063">' + val.uploadStatus + '</div></td>';
				tbl += '<td><div>' + val.circle + '</div></td>';
				tbl += '<td><div>' + val.ringId + '</div></td>';
				tbl += '<td><div>' + val.neId + '</div></td>';
				tbl += '<td><div>' + val.deviceType + '</div></td>';
				tbl += '<td><div>' + val.loopbackIp + '</div></td>';
				tbl += '</td>';
				tbl += '</tr>';
			});
		}
		tbl += '</tbody>';
		tbl += '</table>';

		$(document).find('.node_detail_add_data_table').html(tbl);
	}

	$('#download_node_detail_template').click(function(e) {
		e.preventDefault();
		window.location.href = FRONT_URL + '/static/templates/NodeDetailTemplate.csv';
	});
	

});


