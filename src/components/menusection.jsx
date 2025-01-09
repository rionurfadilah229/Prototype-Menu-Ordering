import { Card, Button, Col } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

function MenuSection({ title, items, onAddToCart }) {
  return (
    <div className="mb-4">
      <h2 className="h3 mb-4 text-primary">{title}</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {items.map((item) => (
          <Col key={item.id}>
            <Card className="h-100 menu-card">
              <div className="card-img-wrapper">
                <Card.Img variant="top" src={item.image} alt={item.name} />
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title className="h5 mb-3">{item.name}</Card.Title>
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="price-tag">Rp{item.price.toLocaleString(2)}</span>
                    <Button 
                      variant="outline-primary"
                      className="rounded-circle add-btn"
                      onClick={() => onAddToCart(item)}
                    >
                      <FaPlus />
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </div>
    </div>
  );
}

export default MenuSection;