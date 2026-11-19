<!doctype html>
<html lang="en">

<head>
<meta charset="utf-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>Software Upgradation</title>
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
								<li class="nav-item"><a class="nav-link" data-toggle="tab"
									href="#tab-pane-upload-data" id="tab-upload-data" role="tab"
									aria-controls="profile" aria-selected="false">Upload Data</a></li>
								<li class="nav-item"><a class="nav-link"
									id="tab-node-detail" data-toggle="tab"
									href="#tab-pane-node-detail" role="tab"
									aria-controls="profile" aria-selected="false">Node Detail</a></li>
								<li class="nav-item" id="sd"><a class="nav-link active"
									id="tab-software-download" data-toggle="tab"
									href="#tab-pane-software-download" role="tab"
									aria-controls="profile" aria-selected="false">Software
										Download</a></li>
								<li class="nav-item" id="precheck"><a class="nav-link" id="tab-pre-check"
									data-toggle="tab" href="#tab-pane-pre-check" role="tab"
									aria-controls="profile" aria-selected="false">Pre Check
										Validation</a></li>
								<li class="nav-item" id="installation"><a class="nav-link"
									id="tab-installation" data-toggle="tab"
									href="#tab-pane-installation" role="tab"
									aria-controls="profile" aria-selected="false">Software
										Installation</a></li>
								<li class="nav-item" id="postcheck"><a class="nav-link"
									id="tab-post-check" data-toggle="tab"
									href="#tab-pane-post-check" role="tab" aria-controls="profile"
									aria-selected="false"> Post Check Validation</a></li>
							</ul>

							<div class="tab-content">
								<div class="tab-pane fade show" id="tab-pane-upload-data"
									role="tabpanel">
									<jsp:include page="uploadNodeDetail.jsp"></jsp:include>
								</div>
								<div class="tab-pane fade show" id="tab-pane-node-detail"
									role="tabpanel">
									<jsp:include page="nodeDetail.jsp"></jsp:include>
								</div>
								<div class="tab-pane fade show active"
									id="tab-pane-software-download" role="tabpanel">
									<jsp:include page="softwareDownload.jsp"></jsp:include>
								</div>
								<div class="tab-pane fade show" id="tab-pane-pre-check"
									role="tabpanel">
									<jsp:include page="preCheckValidation.jsp"></jsp:include>
								</div>

								<div class="tab-pane fade show" id="tab-pane-installation"
									role="tabpanel">
									<jsp:include page="softwareInstallation.jsp"></jsp:include>
								</div>
								<div class="tab-pane fade show" id="tab-pane-post-check"
									role="tabpanel">
									<jsp:include page="postCheckValidation.jsp"></jsp:include>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="footer">
			<jsp:include page="footer.jsp" />
		</div>
	</div>
</body>
</html>