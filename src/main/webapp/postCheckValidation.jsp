<!doctype html>
<html lang="en">

<body>

	<div class="row">
		<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-12">
			<form>
				<span class="inline-msg" id="inline_msg_post_check"></span>
				<div class="form-group">
					<div class="card z-depth-0 bordered">
						<div class="card-header bg-header">
							<h5 class="mb-0">
								Post Check Validation<a href="#"
									class="btn border btn-xs bg-primary float-right"
									id="refresh_post_check_data">Refresh Status</a>
							</h5>
						</div>
						<div class="card z-depth-0 bordered">
							<div class="card-header ">
								<form class="col-12">
									<div class="form-row">
										<input class="form-control col-sm-4 btn-xs"
											list="software_upgradation_ring_list" id="post_check_ring_id"
											placeholder="Ring Id">
										<datalist id="software_upgradation_ring_list"></datalist>
										<input class="form-control col-sm-4 btn-xs"
											list="software_upgradation_node_list" id="post_check_node_name"
											placeholder="Node Name">
										<datalist id="software_upgradation_node_list"></datalist>
										<a href="#" class="btn btn-primary btn-xs border col-sm-1"
											id="search_post_check">Search</a>
									</div>
								</form>
							</div>
							<div class="panel panel-default">
								<div class="panel-body">
									<div class="card-body scroll">
										<div class="table-responsive">
											<div class="post_check_table"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="card-footer ">
							<a href="#" class="btn border btn-xs float-right bg-primary"
								id="post_check_next"><i class="fas fa-angle-right"></i></a> <a
								href="#"
								class="btn border btn-xs float-right bg-primary disabled"
								id="post_check_range">-</a> <a href="#"
								class="btn border btn-xs float-right bg-primary"
								id="post_check_previous"><i class="fas fa-angle-left"></i></a> <a
								href="#" class="btn border btn-xs bg-primary float-left"
								id="post_check">Post Check Validation</a>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
	<!-- model box for post check status-->
	<div class="modal fade" id="postCheckModal" tabindex="-2"
		aria-labelledby="postCheckModal" aria-hidden="true">
		<div class="modal-dialog modal-lg" style="margin: 9rem auto;">
			<div class="modal-content">
				<div class="bg-header"
					style="padding: 0.5rem 1.25rem 0.3rem 0.3rem;">
					<h5 class="mb-0">
						<span id="postCheckModalLabel"></span>
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
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
											<div class="post_check_status_table"></div>
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
	<script src="static/libs/js/postCheckValidation.js"></script>
</body>
</html>