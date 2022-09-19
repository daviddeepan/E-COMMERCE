import axios from "axios";

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: "USER_LOGIN_REQUEST",
		});

		const config = {
			headers: {
				"Content-type": "application/json",
			},
		};
		const { data } = await axios({
			method: "post",
			url: "/api/token/",
			auth: { email: email, password: password },
			headers: { "Content-Type": "application/json" },
		})

		console.log(data);
		dispatch({
			type: "USER_LOGIN_SUCCESS",
			payload: data,
		});

		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: "USER_LOGIN_FAIL",
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail
					: error.message,
		});
	}
};
