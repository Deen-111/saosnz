$(function() {
	var client = new HttpClient();
	var uploadSoftwareUrl = FRONT_URL + "/cli-cut-through/upload-commands"
	var getCommandsUrl = FRONT_URL + "/cli-cut-through/commands"
	fetchCommands(getCommandsUrl)
	
	$('#tab-upload-commands').click(function() {
		fetchCommands(getCommandsUrl)
	});
	

	$('#commands_upload').click(function() {
    		console.log("hello")
    		var fileInput=document.getElementById('upload_Commands_file');
    		var file = fileInput.files[0];

    		if(!file){
    		   alert("No file to upload");
    		}else{
    		    var xhr=new XMLHttpRequest();
    		    var formData = new FormData();
    		    formData.append("file", file);

    			xhr.open("POST", uploadSoftwareUrl, true);
    			$("#loader").show();

    			xhr.onreadystatechange = function() {
    			  if (xhr.readyState=== XMLHttpRequest.DONE){
    			     $("#loader").hide();
    			      if (xhr.status === 200) {
    					alert("File uploaded successfully");
    					fetchCommands(getCommandsUrl)
    					fileInput.value = null;
    					}else{
    					   alert("Error uploading file:" + xhr.statusText);
    					}

    				}

    			};
    			xhr.send(formData);
    		}
    		fetchCommands(getCommandsUrl)
    	});
	
	
	
	function fetchCommands(url) {
		client.get(url, function(response) {
			response =	JSON.parse(response.replace(/\:null/gi, "\:\"\""))
			console.log(response)
			populateCommandTable(response)
		});
	}
	
	function populateCommandTable(apiResponse) {
		var tbl = '';
		tbl += '<table class="table table-striped table-bordered second text-nowrap" >'
		tbl += '<thead>';
		tbl += '<tr style=" background-color: floralwhite;">';
		//tbl += '<th>S.No</th>';
		tbl += '<th>Commands</th>';
		tbl += '</tr>';
		tbl += '</thead>';
		tbl += '<tbody>';

		if (apiResponse.length == 0) {
			tbl += '<tr><td colspan="20"><p style="color:red">No data present.</p></td></tr>';
		} else {
			$.each(apiResponse, function(index, value) {
				//var s_no = index+1;
				//tbl += '<td><div>' + s_no + '</div></td>';
				tbl += '<td><div>' + value + '</div></td>';
				tbl += '</td>';
				tbl += '</tr>';
			});
		}
		tbl += '</tbody>';
		tbl += '</table>';

		$(document).find('.cli_commands').html(tbl);
	}



});




