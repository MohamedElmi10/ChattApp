
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Profile, Name, Avatar, Picture } from "./styles/StyledComponents";
import '@fortawesome/fontawesome-free/css/all.min.css'
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898;
 background-blend-mode: multiply,multiply;
 border-radius: 10px;
`;

const RealMessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

const RealMessageBubble = styled.div`
  background-color: #33C85A; 
  color: #000000;
  padding: 10px;
  max-width: 60%;
  word-wrap: break-word;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 10px 0 0;
  padding: 10px;
  position: relative;
  
`;
const FakeMessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
  border-radius: 10px;
`;

const FakeMessageBubble = styled.div`
  background-color: #E9E9EB;
  color: #000000;
  padding: 10px;
  max-width: 60%;
  word-wrap: break-word;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 0 0 10px;
`;
const UserName = styled.p`
width: 100%;

`
const UserProfile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;
const Chat = () => {
    const [username, setUsername] = useState("")
    const [avatar, setAvatar] = useState();
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");

    useEffect(() => {
        const storedUsername = sessionStorage.getItem("Username")
        let storedAvatar = sessionStorage.getItem("Avatar")
        console.log("Stored Avatar:", storedAvatar);
        console.log("Stored Username:", storedUsername);
        if (storedUsername) {
            setUsername(storedUsername)
        }
        if (storedAvatar) {
            setAvatar(storedAvatar)
        }
    }, [])
    const [fakeChat, setFakeChat] = useState([{
        "text": "Tja tja, hur mår du?",
        "avatar": "https://i.pravatar.cc/100?img=14",
        "username": "Johnny",
        "conversationId": null
    },
    {
        "text": "Hallå!! Svara då!!",
        "avatar": "https://i.pravatar.cc/100?img=14",
        "username": "Johnny",
        "conversationId": null
    },
    {
        "text": "Sover du eller?! 😴",
        "avatar": "https://i.pravatar.cc/100?img=14",
        "username": "Johnny",
        "conversationId": null
    }
    ]);

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (token) {
            fetch("https://chatify-api.up.railway.app/messages", {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setMessages(data || []);
                })
                .catch(error => {
                    console.error("Error fetching messages:", error);
                });
        }
    }, []);

    const deleteMessage = (msgID) => {
        const token = sessionStorage.getItem("token");

        if (token) {
            fetch(`https://chatify-api.up.railway.app/messages/${msgID}`, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        setMessages((prevMessages) =>
                            prevMessages.filter((msg) => msg.id !== msgID)
                        );
                        console.log("Message deleted:", msgID);
                    } else {
                        console.error("Failed to delete message:", msgID);
                    }
                })
                .catch((error) => {
                    console.error("Error deleting message:", error);
                });
        }
    };

    const combinedMessages = [...fakeChat, ...messages];
    const InputWithIcon = ({ messageInput, setMessageInput, handleSubmit }) => {
        return (
            <form onSubmit={handleSubmit}>
                <div style={{ position: 'relative', display: 'inline-block' }}>

                    <input
                        type="text"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="Message..."
                        style={{
                            flexGrow: 1,
                            padding: '10px',
                            minHeight: '40px',
                            boxSizing: 'border-box',
                            borderRadius: '5px',
                            border: '1px solid #ccc'
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            marginLeft: '10px',
                            padding: '10px 20px',
                            backgroundColor: '#33C85A',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Send </button>
                </div>
            </form>
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const token = sessionStorage.getItem("token");

        if (token) {
            fetch("https://chatify-api.up.railway.app/messages", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ text: messageInput })
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Message sent:", data);
                    setMessageInput(""); // Clear the input field after sending
                })
                .catch(error => {
                    console.error("Error sending message:", error);
                });
        }
    };

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


            <ChatContainer>
                {combinedMessages.map((message, index) => {

                    if (fakeChat.includes(message)) {
                        return (
                            <FakeMessageContainer key={index}>
                                <FakeMessageBubble>
                                    <UserProfile>
                                        <p>{message.username}</p>
                                        <img src={message.avatar} alt={message.username} style={{ width: '30px', marginRight: '10px' }} />
                                    </UserProfile>

                                    {message.text}
                                </FakeMessageBubble>
                            </FakeMessageContainer>
                        );
                    } else {
                        return (
                            <RealMessageContainer key={index}>
                                <RealMessageBubble>
                                    <UserProfile>
                                        <UserName>{username}</UserName>
                                        <img src={avatar} style={{ width: '30px', marginRight: '10px' }} />
                                    </UserProfile>
                                    {message.text}

                                </RealMessageBubble>
                                <button
                                    onClick={() => deleteMessage(message.id)}
                                    style={{
                                        marginTop: "10px",
                                        padding: "5px 10px",
                                        backgroundColor: "#FF5733",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Delete
                                </button>
                            </RealMessageContainer>
                        );
                    }
                })}
                <InputWithIcon
                    messageInput={messageInput}
                    setMessageInput={setMessageInput}
                    handleSubmit={handleSubmit}
                />

            </ChatContainer>
        </>
    );
};
export default Chat