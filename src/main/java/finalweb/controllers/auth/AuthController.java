package finalweb.controllers.auth;

import finalweb.database.Sessions;
import finalweb.database.SessionsR;
import finalweb.database.User;
import finalweb.database.UserR;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final PasswordEncoder passwordEncoder;
    private final UserR userR;
    private final SessionsR sessionsR;

    @PostMapping("/register")
    public RegisterRes register(@RequestBody RegisterReq req){
        User user = new User(null, req.getEmail(), "User", passwordEncoder.encode(req.getPassword()));
        userR.save(user);

        user = userR.findByEmail(req.getEmail()).orElseThrow();
        var uuid = UUID.randomUUID().toString();
        var session = new Sessions(user.getUser_id(), uuid, new Timestamp(System.currentTimeMillis()));
        sessionsR.save(session);

        return new RegisterRes(uuid);
    }

    @PostMapping("/login")
    public LoginRes login(@RequestBody LoginReq req) throws Exception{
        var user = userR.findByEmail(req.getEmail()).orElseThrow();

        if (passwordEncoder.matches(user.getPassword(), req.getPassword())){
            throw new SecurityException("wrong password");
        }

        var token = "";
        if (sessionsR.existsById(user.getUser_id())){
            var session = sessionsR.getById(user.getUser_id());

            session.setDatetime(new Timestamp(System.currentTimeMillis()));
            sessionsR.save(session);
            token = session.getToken();
        } else {
            var uuid = UUID.randomUUID().toString();
            var session = new Sessions(user.getUser_id(), uuid, new Timestamp(System.currentTimeMillis()));
            sessionsR.save(session);
            token = session.getToken();
        }
        return new LoginRes(token);
    }

}
