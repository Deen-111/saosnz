<!doctype html>
<html lang="en">

<body>
	<div class="row">
		<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-12">
			<form>
				<span class="inline-msg" id="inline_msg_node_detail"></span> <span
					class="inline-msg" id="inline_msg_delete"></span>
				<div class="form-group">
					<div class="card z-depth-0 bordered">
						<div class="card-header bg-header">
							<h5 class="mb-0">
								Node Detail
							</h5>
						</div>
						<div class="card z-depth-0 bordered">
							<div class="card-header ">
								<form class="col-12">
									<div class="form-row">
										<input class="form-control col-sm-4 btn-xs"
											list="software_upgradation_ring_list" id="node_detail_ring_id"
											placeholder="Ring Id">
										<datalist id="software_upgradation_ring_list"></datalist>
										<input class="form-control col-sm-4 btn-xs"
											list="software_upgradation_node_list"
											id="node_detail_node_name" placeholder="Node Name">
										<datalist id="software_upgradation_node_list"></datalist>
										<a href="#" class="btn btn-primary btn-xs border col-sm-1"
											id="search_node_detail">Search</a> <a href="#"
											class="btn btn-primary btn-xs border col-sm-1"
											id="export_node_detail">Export</a>
									</div>
								</form>
							</div>
							<div class="card-body scroll">
								<div class="table-responsive">
									<div class="panel panel-default">
										<div class="panel-body">
											<div class="node_detial_table"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="card-footer ">
							<a href="#" class="btn border btn-xs float-right bg-primary"
								id="node_detail_next"><i class="fas fa-angle-right"></i></a> <a
								href="#"
								class="btn border btn-xs float-right bg-primary disabled"
								id="node_detail_range">-</a> <a href="#"
								class="btn border btn-xs float-right bg-primary"
								id="node_detail_previous"><i class="fas fa-angle-left"></i></a> <a
								href="#" class="btn border btn-xs bg-primary float-left"
								id="delete_node_detail">Delete</a>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
	<div class="modal-busy" id="loader" style="display: none">
			<div class="center-busy" id="test-git">
				<img width="50" src="static/spinner/processing.gif" />
			</div>
	</div>
	<script src="static/libs/js/nodeDetail.js"></script>

</body>
</html>