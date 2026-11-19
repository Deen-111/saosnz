<!doctype html>
<html lang="en">

<body>
	<div class="row">
		<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-12">
			<form>
				<span class="inline-msg" id="inline_msg_software_download"></span>
				<div class="form-group">
					<div class="card z-depth-0 bordered">
						<div class="card-header bg-header">
							<h5 class="mb-0">
								Software Download <a href="#"
									class="btn border btn-xs bg-primary float-right"
									id="refresh_software_download">Refresh Status</a>
							</h5>
						</div>
						<div class="card z-depth-0 bordered">
							<div class="card-header ">
								<form class="col-12">
									<div class="form-row">
										<input class="form-control col-sm-4 btn-xs"
											list="software_upgradation_ring_list"
											id="software_download_ring_id" placeholder="Ring Id">
										<datalist id="software_upgradation_ring_list"></datalist>
										<input class="form-control col-sm-4 btn-xs"
											list="software_upgradation_node_list"
											id="software_download_node_name" placeholder="Node Name">
										<datalist id="software_upgradation_node_list"></datalist>
										<a href="#" class="btn btn-primary btn-xs border col-sm-1"
											id="search_software_download">Search</a>
									
									</div>
								</form>
							</div>
							<div class="card-body scroll">
								<div class="table-responsive">
									<div class="panel panel-default">
										<div class="panel-body">
											<div class="software_download_table"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="card-footer ">
							<a href="#" class="btn border btn-xs float-right bg-primary"
								id="software_download_next"><i class="fas fa-angle-right"></i></a>
							<a href="#"
								class="btn border btn-xs float-right bg-primary disabled"
								id="software_download_range">-</a> <a href="#"
								class="btn border btn-xs float-right bg-primary"
								id="software_download_previous"><i class="fas fa-angle-left"></i></a>
							<a href="#" class="btn border btn-xs bg-primary float-left"
								id="download">Software Download</a>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
	<script src="static/libs/js/softwareDownload.js"></script>

</body>
</html>