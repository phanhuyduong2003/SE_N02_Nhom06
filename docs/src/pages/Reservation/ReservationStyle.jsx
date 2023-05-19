import styled from "styled-components";

export const Container = styled.div`
display: flex;
flex-wrap: wrap;
/* justify-content: space-between; */
padding: 0 90px;
`;
export const Card = styled.div`
background-color: #1677ff;
color: white;
border-radius: 5px;
border: 1px solid #1677ff;
width: fit-content;
height: fit-content;
padding: 10px;
margin: 10px;
cursor: pointer;
transition: 0.5s;
:hover {
background-color: white;
color: #1677ff;
border: 1px solid #1677ff;
border-radius: 5px;
transition: 0.5s ease-in-out;
}
`;
