import axios from "axios";

axios.defaults.headers.post["Content-Type"] =
	"application/x-www-form-urlencoded";

export { axios };
