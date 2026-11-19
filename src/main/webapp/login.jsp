<!DOCTYPE html>
<html>

<head>
<title>Software Upgradation Login Page</title>
<link href="static/vendor/bootstrap/css/bootstrap3.min.css"
	rel="stylesheet" id="bootstrap-css">
<link href="static/vendor/bootstrap/css/pluck.css" rel="stylesheet"
	id="pluck-css">
<link rel="stylesheet"
	href="static/vendor/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet"
	href="static/vendor/fonts/fontawesome/css/fontawesome-all.css">
</head>

<body>
	<div class="container h-100">
		<div class="d-flex justify-content-center h-100">
			<div class="user_card">
				<div class="d-flex justify-content-center form_container">
					<form name='f' action="login" method='POST'>
						<div class='logoRed'>
							<img src="static/images/ciena.jpg" alt="Logo" width="240"
								height="70"> <!-- <img src="static/images/ztp-red-font-sm.PNG"
								alt="Logo" width="200" height="50"> -->
						</div>
						<%
						if (request.getParameter("error") != null || request.getParameter("logout") != null
								|| request.getParameter("invalid-session") != null) {
						%>

						<div class="form-group">
							<div class="custom-control custom-checkbox"
								style="padding-left: 0;">
								<%
								if (request.getParameter("error") != null) {
								%>
								<div style="color: red;">
									<h5>Invalid username and password.</h5>
								</div>
								<%
								}
								if (request.getParameter("logout") != null) {
								%>
								<div style="color: red;">
									<h5>You have been logged out.</h5>
								</div>
								<%
								}
								if (request.getParameter("invalid-session") != null) {
								%>
								<div style="color: red;">
									<h5>Current session expired.</h5>
								</div>
								<%
								}
								%>
							</div>
						</div>
						<%
						}
						%>

						<div class="input-group mb-3">
							<div class="input-group-append">
								<span class="input-group-text"><i class="fas fa-user"></i></span>
							</div>
							<input type="text" id="userField" name="username"
								class="form-control input_user" value="" placeholder="username"
								required autofocus>
						</div>
						<div class="input-group mb-2">
							<div class="input-group-append">
								<span class="input-group-text"><i class="fas fa-key"></i></span>
							</div>
							<input type="password" id="passField" name="password"
								class="form-control input_pass" value="" placeholder="password"
								required>
						</div>
						<br>
						<div class="d-flex justify-content-center mt-3 login_container">
							<input type="submit" name="submit" id="loginButton"
								class="btn login_btn" value="Login">
						</div>
					</form>
				</div>
				<div class="mt-4"></div>
			</div>
		</div>
	</div>

	<script src="static/vendor/jquery/jquery-3.3.1.min.js"></script>
	<script src="static/js/constants.js"></script>
	<script src="static/js/utils.js"></script>

</body>
</html>
