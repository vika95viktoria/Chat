import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.lang.Math.*;
import java.util.Random;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;


public class Client implements Runnable {

    public static int uniqueId(int min, int max) {
        Random rand = new Random();
        int randomNum =rand.nextInt((max - min) + 1) + min;

        return randomNum;

    }

    private List<JSONObject> history = new ArrayList<JSONObject>();
    private MessageExchange messageExchange = new MessageExchange();
    private String host;
    private Integer port;
    private String user;

    public Client(String host, Integer port,String user) {
        this.host = host;
        this.port = port;
        this.user = user;
    }


    public static void main(String[] args) {
        if (args.length != 3)
            System.out.println("Usage: java ChatClient host port");
        else {
            System.out.println("Connection to server...");
            String serverHost = args[0];
            Integer serverPort = Integer.parseInt(args[1]);
            String username=args[2];
            Client client = new Client(serverHost, serverPort,username);
            new Thread(client).start();
            System.out.println("Connected to server: " + serverHost + ":" + serverPort);
            System.out.println("Your name is: " + username);
            client.listen();
        }
    }

    private HttpURLConnection getHttpURLConnection() throws IOException {
        URL url = new URL("http://" + host + ":" + port + "/chat?token=" + messageExchange.getToken(history.size()));
        return (HttpURLConnection) url.openConnection();
    }

    public List<JSONObject> getMessages() {
        List<JSONObject> list = new ArrayList<JSONObject>();
        HttpURLConnection connection = null;
        try {
            connection = getHttpURLConnection();
            connection.connect();
            String response = messageExchange.inputStreamToString(connection.getInputStream());
            JSONObject jsonObject = messageExchange.getJSONObject(response);
            JSONArray jsonArray = (JSONArray) jsonObject.get("messages");
            for (Object o : jsonArray) {
                System.out.println( ((JSONObject)o).get("user") + " : " + ((JSONObject)o).get("message"));
                list.add((JSONObject)o);
            }

        } catch (IOException e) {
            System.err.println("ERROR: " + e.getMessage());
        } catch (ParseException e) {
            System.err.println("ERROR: " + e.getMessage());
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }

        return list;
    }


    public void sendMessage(String message) {
        HttpURLConnection connection = null;
        try {
            connection = getHttpURLConnection();
            connection.setDoOutput(true);
            connection.setRequestMethod("POST");
            DataOutputStream wr = new DataOutputStream(connection.getOutputStream());
            byte[] bytes = messageExchange.getClientSendMessageRequest(this.user,message,uniqueId(1,1000)).getBytes();
            wr.write(bytes, 0, bytes.length);
            wr.flush();
            wr.close();

            connection.getInputStream();

        } catch (IOException e) {
            System.err.println("ERROR: " + e.getMessage());
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
    }

    public void listen() {
        while (true) {
            List<JSONObject> list = getMessages();
            if (list.size() > 0) {
                history.addAll(list);

            }


            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                System.err.println("ERROR: " + e.getMessage());
            }
        }
    }

    @Override
    public void run() {
        Scanner scanner = new Scanner(System.in);

        while (true) {
            String message = scanner.nextLine();
            sendMessage(message);
        }
    }
}
