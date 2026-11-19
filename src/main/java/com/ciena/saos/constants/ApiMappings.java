package com.ciena.saos.constants;

public class ApiMappings {
	// Web Controller Mappings
	public static final String INDEX_URL = "/";
	public static final String LOGIN_URL = "/login";
	public static final String ACCESS_DENIED_URL = "/access-denied";
	public static final String SOFTWARE_UPGRADATION_URL = "/software-upgradation";
	public static final String UPLOAD_SOFTWARE_URL= "/upload-software";
	public static final String CLI_CUTTHROUGH_URL= "/cli-cut-through";

	public static final String VALIDATION_REQUESTS_URL = "/validation-requests";
	public static final String PROPERTIES_URL = "/properties";
	public static final String MASTER_PROPERTIES_URL = "/master-properties";
	public static final String USER_PROPERTIES_URL = "/user-properties";
	public static final String APPLICATION_PROPERTIES_URL = "/application-properties";

	// Controller Level Mappings
	public static final String USER_URL = "/user";
	public static final String SETTINGS_URL = "/settings";
	public static final String UPGRADATION_URL = "/upgradation";
	public static final String CLI_CUT_THROUGH_URL = "/cli-cut-through";
	
	//Common for all controllers
	public static final String RINGS = "/rings";
	public static final String NODE_NAMES = "/node-names";
	public static final String DETAILS_BY_NODE_NAME = "/nodename={nodeName:.+}";
	public static final String DETAILS_BY_RING_ID = "/ring={ringId:.+}";

	// Software Upgradation Controller
	public static final String NODE_DETAILS = "/node-detail";
	public static final String NODE_DETAILS_RINGS = "/node-detail/rings";
	public static final String NODE_DETAILS_NODE_NAMES = "/node-detail/node-names";
	public static final String NODE_DETAIL_BY_RING_ID = "/node-detail/ring={ringId:.+}";
	public static final String NODE_DETAIL_BY_NODE_NAME = "/node-detail/node-name={nodeName:.+}";
	public static final String DELETE_NODE_DETAILS = "/node-detail/delete";
	public static final String DOWNLOAD_OUTPUT_FILE = "/download";
	public static final String PRE_CHECK_VALIDATIONS = "/pre-check-validation";
	public static final String PRE_CHECK_6x_VALIDATIONS = "/pre-check-6x-validation";
	public static final String POST_CHECK_VALIDATIONS = "/post-check-validation";
	public static final String POST_CHECK_6x_VALIDATIONS = "/post-check-6x-validation";
	public static final String EXECUTE_UPGRADATION = "/execute";
	public static final String SOFTWARE_VERSIONS = "/software-version";
	
	
	// CLI_CUT_THROUGH Controller
	public static final String UPLOAD_COMMANDS="/upload-commands";
	public static final String LOGIN_DETAILS = "/node-detail"; 
	public static final String EXECUTE_COMMANDS = "/execute-commands";
	public static final String DOWNLOAD_COMMANDS_OUTPUT_FILE = "/output/download";
	public static final String DELETE_EXECUTE_COMMANDS = "/execute-commands/delete";
	public static final String CLI_COMMANDS_DATA = "/commands";


	// User Management Controller
	public static final String USER_MANAGEMENT_URL = "/user-management";
	public static final String UPDATE_PASSWORD_URL = "/update-password";
	public static final String USER_INFO_URL = "/user-info";
}
