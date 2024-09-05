
import styled from "styled-components";
const Card = styled.div`

    width: 330px;
    min-height: 490px;
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
    margin-top: 8px;
    
 
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
const Profile = styled.div`
width:150px ;

padding: 10px;
background-color: #f7f5ec;
text-align: center;
overflow: hidden;
position: absolute;
top: 5px;
left: 20px;
border-radius: 20px; 
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
margin-bottom: 30px;
`;

const Picture = styled.div`
display: inline-block;
height: 100px;
width: 100px;
margin-bottom: 15px; 
position: relative;

&::before {
  content: "";
  width: 100%;
  height: 0;
  border-radius: 50%;
  background-color: #1369ce;
  position: absolute;
  bottom: 130%; 
  right: 0;
  left: 0;
  opacity: 0.9;
  transform: scale(3);
  transition: all 0.3s linear 0s;
}

&:hover::before {
  height: 100%;
}

&::after {
  content: "";
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #1369ce;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
`;

const Avatar = styled.img`
width: 100%;
height: auto;
border-radius: 50%;
transform: scale(1);
transition: all 0.9s ease 0s;

&:hover {
  box-shadow: 0 0 0 14px #f7f5ec;
  transform: scale(0.7);
}
`;

const Name = styled.h3`
font-size: 18px;
color: #333;
margin: 0;
`;




export { Profile, Name, Avatar, Picture, Card, Header, Label, FormGroup, Input, Button, Hr, SignUp } 