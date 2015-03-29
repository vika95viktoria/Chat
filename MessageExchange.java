import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.*;
import java.util.List;


public class MessageExchange {

    private JSONParser jsonParser = new JSONParser();

    public String getToken(int index) {
        Integer number = index * 8 + 11;
        return "TN" + number + "EN";
    }

    public int getIndex(String token) {
        return (Integer.valueOf(token.substring(2, token.length() - 2)) - 11) / 8;
    }

    public String getServerResponse(List<JSONObject> messages) {
        /*JSONObject jsonObject = new JSONObject();
        jsonObject.put("messages", messages);
        jsonObject.put("token", getToken(messages.size()));
        return jsonObject.toJSONString();*/
      /*  JSONArray jsonArray = new JSONArray();
        for (int i = 0; i < messages.size(); i++){
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("message",messages.get(i));
            jsonObject.put("username",usernames.get(i));
            jsonObject.put("id",ids.get(i));
            jsonArray.add(jsonObject);
        }*/
        JSONObject obj = new JSONObject();
        obj.put("messages",messages);
        obj.put("token", getToken(messages.size()));
        return obj.toJSONString();
    }

    public String getClientSendMessageRequest(String user, String message, int id) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("message", message);
        jsonObject.put("user", user);
        jsonObject.put("id", id);
        return jsonObject.toJSONString();
    }

    public JSONObject getClientMessage(InputStream inputStream) throws ParseException {
        return  getJSONObject(inputStreamToString(inputStream));
    }

    public JSONObject getJSONObject(String json) throws ParseException {
        return (JSONObject) jsonParser.parse(json.trim());
    }

    public String inputStreamToString(InputStream in) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int length = 0;
        try {
            while ((length = in.read(buffer)) != -1) {
                baos.write(buffer, 0, length);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return new String(baos.toByteArray());
    }
}
