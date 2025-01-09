import { Button, ListGroup, Card } from 'react-bootstrap';
import { FaTrash, FaShoppingCart, FaMinus, FaPlus } from 'react-icons/fa';

const Cart = ({ items, onRemoveItem, onConfirmOrder, onUpdateQuantity }) => {
  const total = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  return (
    <Card className="cart-sidebar sticky-md-top">
      <Card.Header className="bg-gradient-primary text-white">
        <div className="d-flex align-items-center">
          <FaShoppingCart className="me-1" />
          <h3 className="h5 mb-0">Pesanan Anda</h3>
        </div>
      </Card.Header>
      <Card.Body>
        {items.length === 0 ? (
          <p className="text-muted text-center my-4">Belum Ada Pesanan</p>
        ) : (
          <ListGroup variant="flush" className="mb-3">
            {items.map((item) => (
              <ListGroup.Item key={item.id} className="py-3">
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <h6 className="mb-0">{item.name}</h6>
                    <small className="text-gradient">Rp {item.price.toLocaleString()}</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.id, Math.max(0, (item.quantity || 1) - 1))}
                    >
                      <FaMinus size={12} />
                    </Button>
                    <span className="mx-2">{item.quantity || 1}</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                    >
                      <FaPlus size={12} />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="ms-2"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <FaTrash size={12} />
                    </Button>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        
        <div className="border-top pt-3 mb-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h4 className="h5 mb-0">Total:</h4>
            <h4 className="h5 mb-0 text-gradient">Rp {total.toLocaleString()}</h4>
          </div>
        </div>
        
        <Button 
  size="lg"
  className="w-100 custom-green-blue pulse-button"
  onClick={onConfirmOrder}
  disabled={items.length === 0}
>
  Pesan
</Button>
      </Card.Body>
    </Card>
  );
}

export default Cart;