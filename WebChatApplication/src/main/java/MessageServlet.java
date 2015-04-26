/**
 * Created by Администратор on 26.04.2015.
 */

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.xpath.XPathExpressionException;

import org.apache.log4j.Logger;

import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.xml.sax.SAXException;

@WebServlet("/chat")
public class MessageServlet  extends HttpServlet  {

    private static final long serialVersionUID = 1L;
    private static Logger logger = Logger.getLogger(MessageServlet.class.getName());

    public MessageServlet() {
    }

    public void init() throws ServletException {
        try {
            this.loadHistory();
        } catch (IOException | ParserConfigurationException | TransformerException | SAXException var2 ){
            logger.error(var2);
        }

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        logger.info("doGet");
        String token = request.getParameter(TOKEN);
        logger.info("Token " + token);

        if (token != null && !"".equals(token)) {
            int index = getIndex(token);
            logger.info("Index " + index);
            String messages = formResponse(index);
            response.setContentType(ServletUtil.APPLICATION_JSON);
            PrintWriter out = response.getWriter();
            out.print(messages);
            out.flush();
        } else {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "'token' parameter needed");
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        logger.info("doPost");
        String data = ServletUtil.getMessageBody(request);
        logger.info(data);

        try {
            JSONObject e = MessageUtil.stringToJson(data);
            Message message= MessageUtil.jsonToMessage(e);
            MessageStorage.addMessage(message);
            XMLHistoryUtil.addData(message);
            response.setStatus(200);
        } catch (ParserConfigurationException | SAXException | TransformerException | ParseException var6) {
            logger.error(var6);
            response.sendError(400);
        }

    }

    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        logger.info("doPut");
        String data = ServletUtil.getMessageBody(request);
        logger.info(data);

        try {
            JSONObject e = MessageUtil.stringToJson(data);
            Message message = MessageUtil.jsonToMessage(e);
            String id = message.getId();
            Message messageToUpdate = MessageStorage.getMessageById(id);
            if(messageToUpdate != null) {
                messageToUpdate.setDescription(message.getDescription());
                messageToUpdate.setUser(message.getUser());
                XMLHistoryUtil.updateData(messageToUpdate);
                response.setStatus(200);
            } else {
                response.sendError(400, "Task does not exist");
            }
        } catch (ParserConfigurationException | SAXException | TransformerException | XPathExpressionException | ParseException var8) {
            logger.error(var8);
            response.sendError(400);
        }

    }

    private String formResponse(int index) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("messages", MessageStorage.getSubTasksByIndex(index));
        jsonObject.put("token", MessageUtil.getToken(MessageStorage.getSize()));
        return jsonObject.toJSONString();
    }

    private void loadHistory() throws SAXException, IOException, ParserConfigurationException, TransformerException {
        if(XMLHistoryUtil.doesStorageExist()) {
            MessageStorage.addAll(XMLHistoryUtil.getMessages());
        } else {
            XMLHistoryUtil.createStorage();
            this.addStubData();
        }

    }

    private void addStubData() throws ParserConfigurationException, TransformerException {
        Message[] stubTasks = new Message[]{new Message("1", "Create markup", "vika")};
        MessageStorage.addAll(stubTasks);
        Message[] var2 = stubTasks;
        int var3 = stubTasks.length;

        for(int var4 = 0; var4 < var3; ++var4) {
            Message message = var2[var4];

            try {
                XMLHistoryUtil.addData(message);
            } catch (SAXException | IOException | TransformerException | ParserConfigurationException var7) {
                logger.error(var7);
            }
        }

    }
