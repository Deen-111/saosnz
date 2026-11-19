<!doctype html>
<html lang="en">

<head>
<!-- Required meta tags -->
<meta charset="utf-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>Zero Touch Provisioning</title>
</head>

<body>
	<jsp:include page="header.jsp" />

	<!-- ============================================================== -->
	<!-- wrapper  -->
	<!-- ============================================================== -->

	<div class="dashboard-wrapper">
		<div class="container-fluid dashboard-content">
			<!-- ============================================================== -->
			<!-- pageheader  -->
			<!-- ============================================================== -->
			<div class="row">
				<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
					<div class="page-header">
						<h3 class="mb-2">Ciena ZTP</h3>
						<p class="pageheader-text"></p>
					</div>
				</div>
			</div>
			<!-- ============================================================== -->
			<!-- end pageheader  -->
			<!-- ============================================================== -->

			<div class="row">
				<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-12">
					<div class="card z-depth-0 bordered">
						<div class="card-header bg-header">
							<h5 class="mb-0">User Properties</h5>
						</div>
						<div class="card-body">
							<div class="table-responsive">
								<div>
									<div class="panel panel-default">
										<div class="panel-body">
											<div class="tbl_properties_data"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="card-footer "></div>
					</div>

				</div>
			</div>
		</div>
		<!-- ============================================================== -->
		<!-- footer -->
		<!-- ============================================================== -->
		<div class="footer">
			<jsp:include page="footer.jsp" />
		</div>
		<!-- ============================================================== -->
		<!-- end footer -->
		<!-- ============================================================== -->
	</div>
	<!-- ============================================================== -->
	<!-- end wrapper  -->
	<!-- ============================================================== -->

	<script src="static/libs/js/userProperties.js"></script>
</body>
</html>