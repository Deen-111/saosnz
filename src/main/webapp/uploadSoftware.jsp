<!doctype html>
<html lang="en">

<head>
<meta charset="utf-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>Upload Software</title>
</head>

<body>
	<jsp:include page="header.jsp" />
	<div class="dashboard-wrapper">
		<div class="dashboard-finance">
			<div class="container-fluid dashboard-content">
				<div class="row" style="padding-top: 50px;">
					<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-12">
						<div class="tab-outline">
							<ul class="nav nav-tabs" role="tablist">
								<li class="nav-item"><a class="nav-link active"
									data-toggle="tab" href="#tab-pane-upload-software-10x"
									id="tab-upload-software-10x" role="tab" aria-controls="profile"
									aria-selected="false">Upload 10x Software</a></li>
								<li class="nav-item"><a class="nav-link"
									id="tab-upload-software-6x" data-toggle="tab"
									href="#tab-pane-upload-software-6x" role="tab"
									aria-controls="profile" aria-selected="false">Upload 6x
										Software</a></li>
							</ul>

							<div class="tab-content">
								<div class="tab-pane fade show active"
									id="tab-pane-upload-software-10x" role="tabpanel">
									<jsp:include page="uploadSoftware10x.jsp"></jsp:include>
								</div>
								<div class="tab-pane fade show" id="tab-pane-upload-software-6x"
									role="tabpanel">
									<jsp:include page="uploadSoftware6x.jsp"></jsp:include>
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="modal-busy" id="loader" style="display: none">
			<div class="center-busy" id="test-git">
				<img width="50" src="static/spinner/loading.gif" />
			</div>
		</div>
		<div class="footer">
			<jsp:include page="footer.jsp" />
		</div>
	</div>
</body>
</html>