
class Message {
    private String id;
    private String message;
    private String user;

    public Message(String id, String message, String user) {
        this.id = id;
        this.message = message;
        this.user = user;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String value) {
        this.id = value;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String value) {
        this.message = value;
    }

    public String getUser() {
        return this.user;
    }

    public void setUser(String value) {
        this.user = value;
    }

    public String toString() {
        return "{\"id\":\"" + this.id + "\",\"message\":\"" + this.message + "\",\"user\":\"" + this.user + "\"}";
    }
}