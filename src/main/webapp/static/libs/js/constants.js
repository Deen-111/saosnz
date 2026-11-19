let ENV = 'PROD'

var FRONT_URL = ''

if (ENV == 'PROD') {
	var FRONT_URL = "https://10.140.120.15:8443/saos";
}

else if (ENV == 'CIENALAB') {
	var FRONT_URL = "http://haxv-rakarn-1:8081/saos";
}

else if (ENV == 'LOCAL') {
	var FRONT_URL = "http://localhost:9099/saos";
}
else if (ENV == 'ONELAB') {
	var FRONT_URL = "http://10.140.63.9:8080/saos";
}
var DATA_LIMIT = 50
var MAX_DATA_LIMIT = 10000