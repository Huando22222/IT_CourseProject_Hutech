import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import "./Header.css";
import { Link } from "react-router-dom";
import { useState,useContext } from 'react';
import { MyContext } from '../context/MyContext';

import LoginModal from '../action/LoginModal';
function Header(){

    const userContainer = {
        marginLeft: "20px",
        MarginRight: "20px",
    };

    const userIMG = {
        width: '40px',
        height: '40px',
    };

    const { searchValue, setSearchValue ,user} = useContext(MyContext);
    const handleSearch = (event) => {
        event.preventDefault();
        console.log(searchValue);
    };

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Image src="https://cdn-icons-png.flaticon.com/512/1233/1233265.png" style={userIMG}  />
                    <Navbar.Brand as={Link} to="/">Bách hóa không xanh</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        
                        <Nav.Link >
                            <Link
                            to="/market"
                            >
                                Ra chợ nào
                            </Link>
                        </Nav.Link>
                        <Nav.Link >
                            <Link
                            to="/purchased"
                            >
                                {user && user.admin === "true" ? <div>Quản lý</div> : <div>Đã mua</div>}
                            </Link>
                        </Nav.Link>
                        <NavDropdown title="Link" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">
                            Something else here
                        </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#" disabled>
                        Link
                        </Nav.Link>
                    </Nav>
                    <Form className="d-flex" onSubmit={handleSearch}>
                        <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <Button variant="outline-success" type="submit">
                            Search
                        </Button>
                    </Form>

                    <div style={userContainer}>
                        
                        

                        {user ? (
                            
                            <div>
                                <LoginModal/>
                                {user.pic ? (
                                    <Image src={user.pic} style={userIMG} roundedCircle />
                                ):(
                                    <Image src="./user/undefineUser.png" style={userIMG} roundedCircle />
                                )
                                }
                                <ButtonGroup bg="info">

                                    <DropdownButton as={ButtonGroup} title={user.fullname} id="bg-nested-dropdown"  className="dropdown-menu-start">
                                        <Dropdown.Item eventKey="1">cập nhật thông tin</Dropdown.Item>

                                        <Dropdown.Item eventKey="2">
                                            <LoginModal/>
                                        </Dropdown.Item>

                                    </DropdownButton>
                                </ButtonGroup>
                            </div>
                        ):(
                            <div>
                                <LoginModal/>
                                <Image src="./user/undefineUser.png" style={userIMG} roundedCircle />
                                <ButtonGroup bg="info">
                                    <DropdownButton as={ButtonGroup} title="Đăng nhập" id="bg-nested-dropdown">
                                        <Dropdown.Item as="div" eventKey="1">
                                            <LoginModal/>
                                        </Dropdown.Item>

                                        <Dropdown.Item eventKey="2">cập nhật thông tin</Dropdown.Item>
                                    </DropdownButton>
                                </ButtonGroup>
                            </div>
                        )}
                        {/*  */}
                    </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;