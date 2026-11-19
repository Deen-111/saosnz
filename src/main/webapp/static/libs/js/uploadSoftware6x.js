$(function() {
	//var nodeDetailCsv
	var uploadSoftwareUrl = FRONT_URL + "/upgradation/upload-software?state=PN6X"



	$('#software6x_upload').click(function() {
		var fileInput=document.getElementById('upload_software6x_file');
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
					fileInput.value = null;
					}else{
					   alert("Error uploading file:" + xhr.statusText);
					}

				}

			};
			xhr.send(formData);
		}
	});
	});



