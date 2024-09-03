
import styled from "styled-components";
import { useState, useEffect } from "react";
const Chat = () => {
    const [username, setUsername] = useState("")
    const [avatar, setAvatar] = useState();

    useEffect(() => {
        const storedUsername = sessionStorage.getItem("Username")
        const storedAvatar = sessionStorage.getItem("Avatar")
        console.log("Stored Avatar:", storedAvatar);
        if (storedUsername) {
            setUsername(storedUsername)
        }
        if (storedAvatar) {
            setAvatar(storedAvatar)
        }
    }, [])


    const Profile = styled.div`
  width:150px ;

  padding: 20px;
  background-color: #f7f5ec;
  text-align: center;
  overflow: hidden;
  position: absolute;
  top: 20px;
  left: 20px;
  border-radius: 20px; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
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



    return (
        <>

            <Profile>
                <Picture>
                    <Avatar
                        className="img-fluid"
                        src={avatar}
                        alt="Profile Picture"
                    />
                </Picture>
                <div className="pusernamerofile-content">
                    <Name>{username}</Name>

                </div>
            </Profile>

        </>
    )
}
export default Chat