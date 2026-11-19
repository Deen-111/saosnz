<!doctype html>
<html lang="en">

<head>
<meta charset="utf-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>Upload Commands</title>
</head>

<body>
	<div class="row">
		<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-12" >
			<div class="tab-outline">
				<form>
					<div class="form-group">
						<div class="card z-depth-0 bordered" style="max-height: 2000px">
							<div class="card-header bg-header">
								<h5 class="mb-0">
									<input type="file" class="btn-xs float-left" accept=".txt"
										id="upload_Commands_file" name="software_file">
								</h5>
							</div>
							<div class="card z-depth-0 bordered">
								<div class="panel panel-default">
									<div class="panel-body">
										<div class="card-body scroll">
											<div class="table-responsive">
												<div class="cli_commands"></div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div class="card-footer ">
								<a class="btn border btn-xs bg-primary float-left"
									id="commands_upload">Upload Commands</a>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	<script src="static/libs/js/uploadCommands.js"></script>
</body>
</html>