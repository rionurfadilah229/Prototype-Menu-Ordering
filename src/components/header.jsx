import { Nav } from 'react-bootstrap';
import { FaUtensils, FaGlassWhiskey, FaCookie } from 'react-icons/fa';

function Header({ activeSection, onSectionChange }) {
  return (
    <header className="text-center mb-3">
      <h1 className="display-4 mb-4" style={{ 
        background: 'linear-gradient(45deg, #4f46e5,rgb(157, 255, 0))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 'bold'
      }}>
        Soto Jakarta Bang Madi
      </h1>
      <Nav 
        variant="pills" 
        className="justify-content-center custom-nav-pills"
        activeKey={activeSection}
        onSelect={onSectionChange}
      >
        <Nav.Item>
          <Nav.Link eventKey="food" className="d-flex align-items-center">
            <FaUtensils className="me-2" />
            Makanan
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="drinks" className="d-flex align-items-center">
            <FaGlassWhiskey className="me-2" />
            Minuman
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="sideDishes" className="d-flex align-items-center">
            <FaCookie className="me-2" />
            Cemilan
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </header>
  );
}

export default Header;