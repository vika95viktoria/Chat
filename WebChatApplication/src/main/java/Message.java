/**
 * Created by Администратор on 26.04.2015.
 */
public class Message {
    private String id;
    private String description;
    private String user;

    public Message(String id, String description, String user) {
        this.id = id;
        this.description= description;
        this.user = user;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String value) {
        this.id = value;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String value) {
        this.description = value;
    }

    public String getUser() {
        return this.user;
    }

    public void setUser(String value) {
        this.user = value;
    }

    public String toString() {
        return "{\"id\":\"" + this.id + "\",\"description\":\"" + this.description + "\",\"user\":\"" + this.user + "\"}";
    }
}
