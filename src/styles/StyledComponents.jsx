
import styled from "styled-components";
const Card = styled.div`

    width: 330px;
    height: 490px;
    background-color: #000000;
    cursor: pointer;
    border-radius: 10px;
    box-shadow: 0 0 12px 4px rgba(0,0,0,0.4);
    overflow: hidden;
    padding: 26px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 5px;
    transition: all 0.5s ease-in-out;
    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 0 50px 4px rgba(0,0,0,0.6);
        filter: brightness(1.1);
    }
    `;
const Header = styled.p`
    font-weight: 700;
    line-height: 68px;
    font-size: 40px;
    color: #F2F3F4;
`

const Label = styled.label`
    font-size: 20px;
    font-weight: 500;
    color: #ffff;
    margin-bottom: 8px;
    width: 50%;
    
 
`
const FormGroup = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    gap:10px;
    margin-bottom: 15px;
`
const Input = styled.input`
  padding: 8px;
  font-size: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width:100%;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;
const Hr = styled.hr`

    height: 0.1rem;
    margin: 20px 0;
    background-color: #ffffff;
`;
const SignUp = styled.button`
    margin-top: -30px;
      padding: 10px 20px;
  font-size: 16px;
  background-color: #63a7e6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`

//chat styles


export { Card, Header, Label, FormGroup, Input, Button, Hr, SignUp } 