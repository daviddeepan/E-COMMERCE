import { React, useState, useEffect } from "react";
import {
	Link,
	useParams,
	useNavigate,
	useLocation,
	useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, removeFromCart } from "../action/cartAction";
import { ListGroup, Row, Col, Form, Button, Card } from "react-bootstrap";
import { login } from "../action/userAction";
import FormContainer from "../components/FormContainer";
import axios from "axios";

function LoginScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const history = useNavigate();
	const { search } = useLocation();
	const dispatch = useDispatch();

	const redirect = search ? Number(decodeURI(search.split("=")[1])) : 1;

	// const submitHandler = (e) => {
	// 	e.preventDefault();
	// 	dispatch(login(email, password));
	// 	console.log({ error });
	// };

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("/api/token/", {
				email: email,
				password: password,
			})
			.then((res) => {
				console.log(email);
				localStorage.setItem("access_token", res.data.access);
				localStorage.setItem("refresh_token", res.data.refresh);
				axios.defaults.headers["Authorization"] =
					"JWT " + localStorage.getItem("access_token");
				history("/");
			});
	};

	const userLogin = useSelector((state) => state.userLogin);
	const { error, userInfo, loading } = userLogin;

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	return (
		<FormContainer>
			<h1> Sign IN</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button type="submit" variant="primary">
					Sign In
				</Button>
			</Form>
			<Row className="py-3">
				<Col>
					{" "}
					Dont Have an account yet ?{" "}
					<Link
						to={
							redirect
								? `/register?redirect ={redirect}`
								: "/register"
						}
					>
						Register
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
}

export default LoginScreen;
