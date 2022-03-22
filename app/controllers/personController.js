import { Person } from "../db/models/person.js";
import { config } from "../config.js";
import jsonwebtoken from "jsonwebtoken";

class PersonControllerClass {
  async register(req, res) {
    const { email, password } = req.body;
    const user = new Person({
      email,
      password,
    });
    try {
      await user.save();
      res.json({ message: "Person has been created" });
    } catch (e) {
      res.status(422).json({ errors: e });
    }
  }
  async login(req, res) {
    let user;
    try {
      if (req.body.email) {
        user = await Person.findOne({ email: req.body.email });
      }
      if (!user) {
        return res.status(401).json({ errors: { user: "User not found" } });
      }
      const isValidPassword = user.comparePassword(req.body.password);
      if (!isValidPassword) {
        return res.json({ errors: { password: "Credentials are not valid" } });
      }
      const token = jsonwebtoken.sign(
        {
          email: user.email,
          borrowedBooks: user.borrowedBooks,
          id: user._id,
        },
        config.jwt,
        {
          expiresIn: "20m",
        },
        { algorithm: "HS512" }
      );

      res.header("auth-token", token).json({ token: token });
    } catch (e) {
      return res.json({ errors: "Invalid data" });
    }
  }
}
export const PersonController = new PersonControllerClass();
