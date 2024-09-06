const MessageInput = ({ messageInput, setMessageInput, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit} >
            <div style={{ position: 'relative', display: 'inline-block' }}>

                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => {
                        console.log("Input value:", e.target.value);
                        setMessageInput(e.target.value)
                    }}
                    placeholder="Message..."
                    id="messageInput"
                    name="messageInput"
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
export default MessageInput