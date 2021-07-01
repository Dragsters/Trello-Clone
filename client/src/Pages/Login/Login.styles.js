import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
h1{
  text-align: center;
  color: #5E6C84;
  font-size: 16px;
  letter-spacing: -0.01em;
  line-height: 28px;
  margin-top: 10px;
  margin-bottom: 25px;
  }
  `;
export const Background = styled.div`
  background-color: #f9fafc;
  min-width: 100vh;
  min-height: 100vh;
`;
export const AccountForm = styled.div`
  /* display: flex; */
`;
export const CenterLayout = styled.div`
  margin: 0 auto;
  max-width: 400px;
  background-color: #ffffff;
  border-radius: 3px;
  padding: 25px 40px;
  box-shadow: rgb(0 0 0 / 10%) 0 0 10px;
`;
export const FormField = styled.input`
  width: 100%;
  font-size: 14px;
  background-color: #fafbfc;
  border: 2px solid #dfe1e6;
  margin: 0 0 1.2em;
  border-radius: 3px;
  height: 44px;
  transition: background-color 0.2s ease-in-out 0s,
    border-color 0.2s ease-in-out 0s;
  padding: 0.5em;
  box-sizing: border-box;
`;
