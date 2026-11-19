<!doctype html>
<html lang="en">

<head>
<meta charset="utf-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">
<!-- Bootstrap CSS -->
<link rel="stylesheet"
	href="static/vendor/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="static/vendor/fonts/circular-std/style.css">
<link rel="stylesheet" href="static/libs/css/style.css">
<link rel="stylesheet"
	href="static/vendor/fonts/fontawesome/css/fontawesome-all.css">
<title>SOAS</title>
</head>

<style>
.vl {
	border-left: 1px solid white;
	height: 55px;
}
</style>

<body>
	<!-- ============================================================== -->
	<!-- main wrapper -->
	<!-- ============================================================== -->
	<div class="dashboard-header">
		<nav class="navbar navbar-expand-lg bg-header fixed-top">
			<a class="navbar-brand text-light" href="https://www.ciena.com/">
				<img src="static/images/ciena-logo-red-and-white.PNG" alt="image"
				width="100" height="40">
			</a>
			<!-- <div class="vl"></div> -->
			<!-- 	<a class="navbar-brand text-light" href="ztpData.jsp"> <img
				src="static/images/ztp-white-font-lg.PNG" alt="image" width="200"
				height="40">
			</a> -->

			<div class="collapse navbar-collapse " id="navbarSupportedContent">
				<ul class="navbar-nav ml-auto navbar-right-top">
					<li class="nav-item"></li>
					<li class="nav-item dropdown nav-user"><a
						class="nav-link nav-user-img" href="#"
						id="navbarDropdownMenuLink2" data-toggle="dropdown"
						aria-haspopup="true" aria-expanded="false"> <img
							src="static/images/user3.gif" alt=""
							class="user-avatar-md rounded-circle">
					</a>
						<div class="dropdown-menu dropdown-menu-right nav-user-dropdown"
							aria-labelledby="navbarDropdownMenuLink2">
							<div class="nav-user-info">
								<div class="mb-0 text-white nav-user-name" id="userName"></div>
								<!-- 	<h5 class="mb-0 text-white nav-user-name">user</h5>  -->
								<!-- 	<span class="status"></span><span class="ml-2">Available</span> - -->
							</div>
							<a class="dropdown-item" href="#" id="updatePassword"
								onclick="updatePassword(this)" data-toggle="modal"
								data-target="#changePasswordModal"><i
								class="fa fa-lock mr-2"></i> Change Password</a> <a
								class="dropdown-item" href="#" id="logout"><i
								class="fas fa-power-off mr-2"></i>Logout</a>
						</div></li>
				</ul>
			</div>
		</nav>
	</div>
	<!-- ============================================================== -->
	<!-- end navbar -->
	<!-- ============================================================== -->
	<!-- ============================================================== -->
	<!-- left sidebar -->
	<!-- ============================================================== -->

	<div class="nav-left-sidebar sidebar-dark">
		<div class="menu-list">
			<nav class="navbar navbar-expand-lg navbar-light">
				<a class="d-xl-none d-lg-none" href="#">Dashboard</a>
				<button class="navbar-toggler" type="button" data-toggle="collapse"
					data-target="#navbarNav" aria-controls="navbarNav"
					aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav flex-column">
						<li class="nav-item "><a class="nav-link active"
							href="software-upgradation" aria-expanded="false"
							data-target="#submenu-5" aria-controls="submenu-5"><i
								class="fa fa-fw fa-calendar-plus"></i>Software Upgradation<span
								class="badge badge-success">6</span></a></li>

						<li class="nav-item "><a class="nav-link active"
                             href="upload-software" aria-expanded="false"
                               data-target="#submenu-5" aria-controls="submenu-5"><i
                                class="fa fa-fw fa-calendar-plus"></i>Upload Software<span
                                class="badge badge-success">6</span></a></li>

                        <li class="nav-item "><a class="nav-link active"
                             href="cli-cut-through" aria-expanded="false"
                                data-target="#submenu-5" aria-controls="submenu-5"><i
                                 class="fa fa-fw fa-calendar-plus"></i>Cli Cut Through<span
                                 class="badge badge-success">6</span></a></li>

							<li class="nav-item "><a class="nav-link active" href="#"
							data-toggle="collapse" aria-expanded="false"
							data-target="#submenu-5" aria-controls="submenu-5"><i
								class="fas fa-cogs"></i>Settings <span
								class="badge badge-success">6</span></a>
							<div id="submenu-5" class="collapse submenu" style="">
								<ul class="nav flex-column">
									<!-- <li class="nav-item" id= "master-properties"><a class="nav-link" href="master-properties">Master Properties</a></li> -->
									<li class="nav-item"><a class="nav-link"
										href="user-properties">User Properties</a></li>
									<li class="nav-item" id="user-management"><a
										class="nav-link" href="user-management">User Management</a></li>
								</ul>
							</div></li>

					</ul>
				</div>
			</nav>
		</div>
	</div>
	<div class="modal fade" id="changePasswordModal" tabindex="-2"
		aria-labelledby="changePasswordModalLabel" aria-hidden="true">
		<div class="modal-dialog" style="margin: 9rem auto;">
			<div class="modal-content">
				<div class="bg-header"
					style="padding: 0.5rem 1.25rem 0.3rem 0.3rem;">
					<h5 class="mb-0" id="changePasswordModalLabel">
						Change Password
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
							<form id="form_id">
								<br> <span class="inline-msg" id="inline_msg_password"></span>
								<div class="input-group mb-2">
									<div class="input-group-append">
										<span class="input-group-text"><i class="fas fa-key"></i></span>
									</div>
									<input type="password" id="newPassword" name="new-password"
										class="form-control input_pass" onfocus="this.value=''"
										value="" placeholder="New Password" required>
								</div>
								<div class="input-group mb-2">
									<div class="input-group-append">
										<span class="input-group-text"><i class="fas fa-key"></i></span>
									</div>
									<input type="password" id="reenterPassword"
										name="reenterpassword" class="form-control input_pass"
										onfocus="this.value=''" value=""
										placeholder="Confirm Password" required>
								</div>
								<div class="d-flex justify-content-center mt-3 login_container">
									<input type="button" name="updateButton" id="updateButton"
										onclick="updatePassword()" class="btn update_btn"
										value="Change Password">
								</div>
							</form>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>

	<script src="static/vendor/jquery/jquery-3.3.1.min.js"></script>
	<script src="static/vendor/bootstrap/js/bootstrap.bundle.js"></script>
	<script src="static/vendor/slimscroll/jquery.slimscroll.js"></script>
	<script src="static/vendor/gauge/gauge.min.js"></script>

	<!-- Custom JS -->
	<script src="static/libs/js/constants.js"></script>
	<script src="static/libs/js/utils.js"></script>


</body>
</html>