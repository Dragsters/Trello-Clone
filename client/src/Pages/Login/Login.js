import React from "react";
import {
  Background,
  CenterLayout,
  AccountForm,
  GlobalStyle,
  FormField,
} from "./Login.styles";

export const Login = () => {
  return (
    <Background>
      <GlobalStyle />
      <CenterLayout>
        <AccountForm>
          <h1>Log in to Trello</h1>
          <form action="" method="post">
            <div>
              <FormField
                type="email"
                name="email"
                id=""
                placeholder="Enter email"
              />
            </div>
            <div>
              <FormField
                type="password"
                name="pwd"
                id=""
                placeholder="Enter password"
              />
            </div>
          </form>
        </AccountForm>
      </CenterLayout>
    </Background>
  );
};
