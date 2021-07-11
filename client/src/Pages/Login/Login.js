import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthProvider";
import { Link } from "react-router-dom";
import { gapi } from "gapi-script";
import {
	Background,
	CenterLayout,
	AccountForm,
	GlobalStyle,
	FormFieldEmail,
	FormFieldPassword,
	Logo,
	FormFieldButton,
	OauthButton,
	ErrorText,
	FormBottomLinks,
} from "./Login.styles";

export const Login = () => {
	const { emailValidate } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [errorBool, setErrorBool] = useState(false);

	async function loginHandler(e, email, password) {
		e.preventDefault();
		const v = await emailValidate(email);
		if (!v) {
			setErrorBool(true);
		} else {
			console.log("sahi");
		}
	}

	const signIn = () => {
		const GoogleAuth = gapi.auth2.getAuthInstance();
		if (GoogleAuth.isSignedIn.get())
			handleSinginSuccess(GoogleAuth.currentUser.get())
		else
			GoogleAuth.signIn({ prompt: 'consent select_account' }).then(
				res => handleSinginSuccess(res),
				err => console.log(err));
	}

	const signOut = () => {
		// no need to make await
		fetch('http://localhost:5000/api/v1/auth/signout', { credentials: 'include' })
			.catch(err => console.log('unable to signout', err));
		const GoogleAuth = gapi.auth2.getAuthInstance();
		if (GoogleAuth.isSignedIn.get())
			GoogleAuth.signOut().then(res => console.log('signout ho gya'), err => console.log(err));
		else console.log('pehle se hi signout h');

	}
	const handleSinginSuccess = async (res) => {
		const basicProfile = res.getBasicProfile();
		const authResponse = res.getAuthResponse();
		res.googleId = basicProfile.getId();
		res.tokenObj = authResponse;
		res.tokenId = authResponse.id_token;
		res.accessToken = authResponse.access_token;
		res.profileObj = {
			googleId: basicProfile.getId(),
			imageUrl: basicProfile.getImageUrl(),
			email: basicProfile.getEmail(),
			name: basicProfile.getName(),
		}
		const userData = await fetch('http://localhost:5000/api/v1/auth/google', {
			method: "POST",
			body: JSON.stringify(res), credentials: 'include'
			, headers: { "Content-Type": "application/json", }
		});
		// TODO: save this data in authContext.
		const data = await userData.json();
		console.log(data);
	}
		;
	const onLoadFailure = () => {

	}

	useEffect(() => {
		const params = {
			clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
			scope: 'profile email',
			cookie_policy: 'single_host_origin'

		};
		gapi.load('auth2', () => {
			const GoogleAuth = gapi.auth2.getAuthInstance();
			if (!GoogleAuth) {
				gapi.auth2.init(params).then(
					(res) => {
						if (res.isSignedIn.get()) {
							// handleSinginSuccess(res.currentUser.get());
						};
					},
					(err) => {
						console.log(err);
						onLoadFailure(err);
					});

			} else {
				GoogleAuth.then(() => {
					if (GoogleAuth.isSignedIn.get()) {
						// handleSinginSuccess(GoogleAuth.currentUser.get());
					}
				}, (err) => { console.log(err) }
				);
			}
		});
	});


	return (
		<Background>
			<GlobalStyle />
			<Logo>Trello</Logo>
			<CenterLayout>
				<AccountForm>
					<h1>Log in to Trello</h1>
					<form onSubmit={(e) => loginHandler(e, email, password)}>
						<div>
							<FormFieldEmail
								type="text"
								required
								value={email}
								id=""
								placeholder="Enter email"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<ErrorText show={errorBool}>Enter a valid email !</ErrorText>
						<div className="password-container">
							<FormFieldPassword
								type={showPassword ? "text" : "password"}
								required
								value={password}
								id=""
								placeholder="Enter password"
								onChange={(e) => setPassword(e.target.value)}
							/>
							<div>
								{showPassword ? (
									<i
										className="fa fa-eye-slash"
										onClick={() => setShowPassword(false)}
									></i>
								) : (
									<i
										className="fa fa-eye"
										onClick={() => setShowPassword(true)}
									></i>
								)}
							</div>
						</div>
						<ErrorText>" "</ErrorText>

						<FormFieldButton type="submit" value="Log in" />
					</form>

					<div>
						<div className="login-method-seperator text-center">OR</div>
						<OauthButton onClick={signIn}>
							{" "}
							<span id="google-icon"></span> Continue with Google
						</OauthButton>
					</div>

					{/* -----------------
					this section is only for debugging  */}
					<div>
						<div className="login-method-seperator text-center">OR</div>
						<OauthButton onClick={signOut}>
							{" "}
							<span id="google-icon"></span> Signout from Google
						</OauthButton>
					</div>

					{/* -------------------- */}
					<FormBottomLinks>
						<div>
							<Link to="forgot-password"> Can't log in?</Link>
							<Link to="signup" className="bottom-link-two">
								{" "}
								Signup for an account
							</Link>
						</div>
					</FormBottomLinks>
				</AccountForm>
			</CenterLayout>
		</Background>
	);
};
