$(function() {
	var uploadSoftwareUrl = FRONT_URL + "/upgradation/upload-software?state=PN10X"


	$('#software10x_upload').click(function() {
    		console.log("hello")
    		var fileInput=document.getElementById('upload_software10x_file');
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
    			      if (xhr.status === 200) {
    			    	$("#loader").hide();
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


