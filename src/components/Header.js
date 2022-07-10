import React from "react";
import { Navbar, Container ,Button} from "react-bootstrap";
import logo from "../images/logo.png";
function Header() {
  return (
    <Navbar style={{border:"1px solid lightgray"}}>
      <Container>
        <Navbar.Brand href="/">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          <span style={{color:"#1F7CE0",fontWeight:'bold'}}>smallcase</span>
        </Navbar.Brand>
        <Button variant="light" style={{border:"1px solid #1F7CE0",color:"#1F7CE0"}}>Login</Button>{' '}
      </Container>
    </Navbar>
  );
}

export default Header;
