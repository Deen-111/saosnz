<!doctype html>
<html lang="en">

<head>
<meta charset="utf-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>Upload Commands</title>
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
								<li class="nav-item"><a class="nav-link active" data-toggle="tab"
									href="#tab-pane-upload-commands" id="tab-upload-commands" role="tab"
									aria-controls="profile" aria-selected="false">Upload Commands</a></li>
								<li class="nav-item"><a class="nav-link"
									id="tab-upload-data" data-toggle="tab"
									href="#tab-pane-upload-data" role="tab"
									aria-controls="profile" aria-selected="false">Upload data</a></li>

								<li class="nav-item"><a class="nav-link"
                                    id="tab-run-commands" data-toggle="tab"
                                    href="#tab-pane-run-commands" role="tab"
                                    aria-controls="profile" aria-selected="false">Execute Commands</a></li>
                            </ul>

							<div class="tab-content">
								<div class="tab-pane fade show active" id="tab-pane-upload-commands"
									role="tabpanel">
									<jsp:include page="uploadCommands.jsp"></jsp:include>
								</div>
								<div class="tab-pane fade show" id="tab-pane-upload-data"
                                     role="tabpanel">
                                     <jsp:include page="uploadNodeLoginData.jsp"></jsp:include>
                                     </div>
                                 <div class="tab-pane fade show" id="tab-pane-run-commands"
                                       role="tabpanel">
                                       <jsp:include page="runCommands.jsp"></jsp:include>
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