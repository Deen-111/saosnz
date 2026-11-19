<!doctype html>
<html lang="en">

<body>
	<div class="row">
		<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-12">
			<form>
				<span class="inline-msg" id="inline_msg_pre_check"></span> <span
					class="inline-msg" id="inline_msg_delete"></span>
				<div class="form-group">
					<div class="card z-depth-0 bordered">
						<div class="card-header bg-header">
							<h5 class="mb-0">
								Pre Check Validation <a href="#"
									class="btn border btn-xs bg-primary float-right"
									id="refresh_pre_check">Refresh Status</a>
							</h5>
						</div>
						<div class="card z-depth-0 bordered">
							<div class="card-header ">
								<form class="col-12">
									<div class="form-row">
										<input class="form-control col-sm-4 btn-xs"
											list="software_upgradation_ring_list" id="pre_check_ring_id"
											placeholder="Ring Id">
										<datalist id="software_upgradation_ring_list"></datalist>
										<input class="form-control col-sm-4 btn-xs"
											list="software_upgradation_node_list"
											id="pre_check_node_name" placeholder="Node Name">
										<datalist id="software_upgradation_node_list"></datalist>
										<a href="#" class="btn btn-primary btn-xs border col-sm-1"
											id="search_pre_check">Search</a> 
									</div>
								</form>
							</div>
							<div class="card-body scroll">
								<div class="table-responsive">
									<div class="panel panel-default">
										<div class="panel-body">
											<div class="pre_check_table"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="card-footer ">
							<a href="#" class="btn border btn-xs float-right bg-primary"
								id="pre_check_next"><i class="fas fa-angle-right"></i></a> <a
								href="#"
								class="btn border btn-xs float-right bg-primary disabled"
								id="pre_check_range">-</a> <a href="#"
								class="btn border btn-xs bg-primary float-left" id="pre_check">Pre
								Check Validation</a> <a href="#"
								class="btn border btn-xs float-right bg-primary"
								id="pre_check_previous"><i class="fas fa-angle-left"></i></a> 
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
	<!-- model box for pre check status-->
	<div class="modal fade" id="preCheckModal" tabindex="-2"
		aria-labelledby="preCheckModal" aria-hidden="true">
		<div class="modal-dialog modal-lg" style="margin: 9rem auto;">
			<div class="modal-content">
				<div class="bg-header"
					style="padding: 0.5rem 1.25rem 0.3rem 0.3rem;">
					<h5 class="mb-0">
						<span id="preCheckModalLabel"></span>

						<button type="button" class="close float-right"
							data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</h5>
				</div>
				<div class="card-body"
					style="padding: 0.5rem 1.25rem 0.3rem 0.3rem;">
					<div class="panel panel-default">
						<div class="panel-body">
							<div id="modal_body"></div>
							<div class="panel panel-default">
								<div class="panel-body">
									<div class="tableScroll">
										<div class="tableFixHead">
											<div class="pre_check_status_table"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script src="static/libs/js/preCheckValidation.js"></script>

</body>
</html>