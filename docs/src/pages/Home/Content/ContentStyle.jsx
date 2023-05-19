import { Form } from "antd";
import styled from "styled-components";

export const FormItem = styled(Form.Item)`
  width: 100%;
`;
export const H11 = styled.h1`
          position: absolute;
          background-color: #1677ffc8;
          color: white;
          left: 70%;
          top: 40%;
          padding: 20px;
          border-radius: 6;
          width: 400px;
          text-align: right;
          transform: translate(-50%, -50%);
          transition: 0.5s ease-in-out;
          :hover {
              background-color: #ffffffc8;
              color: #1677ff;
              transition: 0.5s ease-in-out;
          }
`;
export const H12 = styled.h1`
          position: absolute;
          background-color: #ffffffc8;
          color: #1677ff;
          left: 60%;
          top: 60%;
          padding: 20px;
          border-radius: 10;
          width: 400px;
          text-align: right;
          transform: translate(-50%, -50%);
          transition: 0.5s ease-in-out;
          :hover {
              background-color: #1677ffc8;
              color: #ffffff;
              transition: 0.5s ease-in-out;
          }
`;
